---
title: Canvas drag and drop examples
date: 2020-03-10 18:21:00
tags: [canvas]
layout: post
categories: canvas
id: 624
updated: 2020-05-21 11:53:52
version: 1.23
---

In canvas [drag and drop](https://konvajs.org/docs/drag_and_drop/Drag_and_Drop.html) actions are part of many projects when working out a user interface for a project. There are ways of dragging whole elements when it comes to client side javaScript in general, but in this post I will be writing about dragging a display object in the canvas which is a little different from that as it just deals with canvas elements alone.

The process of making a canvas drag of sorts might involve first getting a canvas relative point in a pointer event such as mouse down or a touch start event when it comes to touch events. Then the nest step might be to use that to find out if a display object was clicked or not with some kind of collision detection method such as bounding box. If an object has been clicked then I could set a boolean value for that display object to true that would then used in the logic of a pointer move event. In the body of the pointer move event I would then set the position of the display object to the canvas relative point that is obtained within the event object of the move event. Finally there will be a pointer end event that just sets the boolean back to false leaving the dragged display object at its new location.

There is more to it then just start though, there are other talking points when it comes to snapping things to a grid or not, and creating user defined events for certain things that are a result of drag and drop. However the basics of getting started with canvas drag and drop is not so hard, and if things get to intense there is always just going with a framework such as [phaser that has all this worked out well and much more](/2017/10/24/phaser-inputhandler-draggable/). However in this post I am going to be witting about doing this sort of things and related topics with just plain old vanilla javaScript and canvas elements.

<!-- more -->

## 1 - Basic canvas drag example

So in this section I will be going over just a basic canvas drag example. This will just be a canvas example where at the center of the canvas there will be a circle, and the circle can just be clicked and dragged around the canvas, thats it nothing special. The example will involve the use of a method that I worked out for another canvas post of mine that has to do with getting a canvas relative point from and event object, and also the distance formula that will be used for collision detection.

### 1.1 - The get canvas relative method and distance formula

So at the start of my basic.js file I have my get canvas relative method that is used to get a canvas relative position from an event object. This variant of the method seems to work okay for both mouse and touch events just fine for this project at least sense I am not interested in supporting multi touch. I will not be getting into this method in detail here as I have wrote a post on this subject before hand.

```js
// get canvas relative and distance methods
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

In addition  to the get canvas relative method I also have the distance formula that will work fine as a collision detection method for this example at least sense it is a circle that I am dealing with. Now that we have that out of the way we can continue to the event handlers.

### 1.2 - Event handers

So now that I have my get canvas relative method and my distance method I can now put together my event handers. these methods will be called and passed a state object when doing so that will then be accessed by the internal event hander that is returned when using add event listener. More on that later.

```js
// Event handlers
var pointerDown = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (distance(pos.x, pos.y, state.x, state.y) <= state.r) {
            state.down = true;
        }
    };
};
var pointerMove = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (state.down) {
            state.x = pos.x;
            state.y = pos.y;
            draw(ctx, canvas, state);
        }
    };
};
var pointerUp = function (state) {
    return function (e) {
        state.down = false;
    };
};
```

### 1.3 - The draw method

I will just need a single draw method that will be used to paint a sold background to the canvas followed by the circle. This method will be called each time the circle moves as well as one time initially and then end of the code.

```js
// draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
    ctx.fill();
};
```

### 1.4 - set up the canvas, state object, and attach events

Now to get a reference to the canvas element, create the state object, and attach the event handlers. I get a reference to the canvas element, and also get a reference to the 2d drawing context as well as set the width and height.

I create the state object with just a single object literal, and then pass it for each call of my pointer handler methods when attaching events to the canvas. I then also call my draw method for the first time, but all additional calls will be made my events rather than an event loop.

```js
// set up canvas
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// the state object
var state = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    down: false
};
 
// attach for mouse and touch
canvas.addEventListener('mousedown', pointerDown(state));
canvas.addEventListener('mousemove', pointerMove(state));
canvas.addEventListener('mouseup', pointerUp(state));
canvas.addEventListener('touchstart', pointerDown(state));
canvas.addEventListener('touchmove', pointerMove(state));
canvas.addEventListener('touchend', pointerUp(state));
 
// starting draw
draw(ctx, canvas, state);
```

Once this is all up and running the result is what I would expect. A single circle at the center of the center of the canvas, and I can then click and drag the circle to any location on the canvas. There is still a bit more to click in drag with canvas though such as snapping things into place.

## 2 - canvas drag and drop example

Now for a canvas drag and drop example where dropping a display object is a certain area does something. For the sake of this example dropping a circle into an area will just change the color, but depending on the project dropping a display object can do all sorts of things. However for now it will result in just a change of color when it comes to how this example is rendered in canvas.

So this example might still not be anything too interesting, however it will start to become a bit of a major project compared to the previous examples. So this time the code will be broken down into several modules to helper keep things a little more neat and tidy.

### 2.1 - The Utils.js file

In the basic canvas drag example I just had to methods for getting a canvas relative position and the distance formula at the top of my single main.js file. For this example I pulled those methods into an external utils.js file that will serve as a general utility library for this example.

```js
var utils = {};
// get canvas relative and distance methods
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 2.2 - The game.js file to create a game model object

I then have a game.js file that I use to create an object that is a model of this canvas drag and drop example. In other worlds it is an object that holds he current state of display objects and other values of interest, but does not contain code that is used to render the state of that object to the canvas.

```js
var gameMod = (function () {
 
    var snapToGrid = function (cir) {
        cir.x = Math.floor(cir.x / 32) * 32 + 16;
        cir.y = Math.floor(cir.y / 32) * 32 + 16;
    };
 
    // create a pool of circles
    var createCircles = function () {
        var circles = [],
        i = 10,
        x,
        y;
        while (i--) {
            x = i % 3;
            y = Math.floor(i / 3);
            circles.push({
                i: i,
                type: 'cir',
                x: 16 + x * 32,
                y: 16 + y * 32,
                homeX: 16 + x * 32,
                homeY: 16 + y * 32,
                radius: 16,
                socketed: false
            });
        }
        return circles;
    };
 
    var createBoxPool = function () {
        return [{
                i: 0,
                type: 'bx',
                x: 32 * 6,
                y: 32 * 3,
                w: 32,
                h: 32,
                socket: null
            }
        ];
    };
 
    // create state main method
    var api = function () {
        return {
            circles: createCircles(),
            boxes: createBoxPool()
        };
    };
 
    // get something that might be at the given
    // game area position
    api.get = function (game, x, y, type, skip) {
        type = type === undefined ? 'any' : type;
        // is there a circle there?
        if (type === 'any' || type === 'cir') {
            var i = game.circles.length,
            cir;
            while (i--) {
                cir = game.circles[i];
                if (skip) {
                    if (cir === skip) {
                        continue;
                    }
 
                }
                if (utils.distance(cir.x, cir.y, x, y) <= cir.radius) {
                    return cir;
                }
            }
        }
        // box?
        if (type === 'any' || type === 'bx') {
            var i = game.boxes.length,
            bx;
            while (i--) {
                bx = game.boxes[i];
                if (utils.distance(bx.x + 16, bx.y + 16, x, y) <= 16) {
                    return bx;
                }
            }
        }
        // nothing there
        return false;
    };
 
    // attach events for the game object and canvas
    api.attach = function (game, canvas) {
        var grab = false;
        // Event handlers
        var pointerDown = function (game) {
            return function (e) {
                var pos = utils.getCanvasRelative(e),
                obj = gameMod.get(game, pos.x, pos.y);
                if (obj) {
                    grab = obj.type === 'cir' ? obj : false;
                    if (grab) {
                        grab.homeX = grab.x;
                        grab.homeY = grab.y;
                    }
                }
            };
        };
        var pointerMove = function (game) {
            return function (e) {
                var pos = utils.getCanvasRelative(e);
                if (grab) {
                    grab.x = pos.x;
                    grab.y = pos.y;
                }
            };
        };
        var pointerUp = function (game) {
            return function (e) {
                if (grab) {
                    snapToGrid(grab);
                }
                var bx = api.get(game, grab.x, grab.y, 'bx');
                if (bx) {
                    // socket the cir to the bx
                    if (bx.socket == null) {
                        grab.socketed = bx;
                        bx.socket = grab;
                    } else {
                        // send home if cir is socked all ready
                        grab.x = grab.homeX;
                        grab.y = grab.homeY;
                    }
                } else {
                    // release from socket
                    if (grab.socketed) {
                        grab.socketed.socket = null;
                        grab.socketed = false;
                    }
                    // send home if other cir
                    var cir = api.get(game, grab.x, grab.y, 'cir', grab);
                    if (cir) {
                        grab.x = grab.homeX;
                        grab.y = grab.homeY;
                    }
                }
                grab = false;
            };
        };
        // attach for mouse and touch
        canvas.addEventListener('mousedown', pointerDown(game));
        canvas.addEventListener('mousemove', pointerMove(game));
        canvas.addEventListener('mouseup', pointerUp(game));
        canvas.addEventListener('touchstart', pointerDown(game));
        canvas.addEventListener('touchmove', pointerMove(game));
        canvas.addEventListener('touchend', pointerUp(game));
    }
 
    return api;
 
}
    ());
```

### 2.3 - draw.js

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.circles = function (ctx, game) {
    var i = game.circles.length,
    cir;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    while (i--) {
        cir = game.circles[i];
        ctx.fillStyle = cir.socketed ? 'blue' : 'green';
        ctx.beginPath();
        ctx.arc(cir.x, cir.y, cir.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
};
 
draw.boxes = function (ctx, game) {
    var i = game.boxes.length,
    bx;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    while (i--) {
        bx = game.boxes[i];
        ctx.beginPath();
        ctx.rect(bx.x, bx.y, bx.w, bx.h);
        ctx.fill();
        ctx.stroke();
    }
};
```

### 2.4 - main.js and index.html

```js
// set up canvas
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var game = gameMod();
 
gameMod.attach(game, canvas);
 
draw.back(ctx, canvas);
draw.circles(ctx, game);
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.boxes(ctx, game);
    draw.circles(ctx, game);
};
loop();
```

```html
<html>
    <head>
        <title>canvas drag and drop</title>
    </head>
    <body>
        <canvas id="mycanvas" width="320" height="240"></canvas>
        <script src="utils.js"></script>
        <script src="game.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 3 - Conclusion

There is much more to this subject then what I have covered thus far when it comes to dragging and dropping with canvas elements. If I get around to it hopefully I will expand this more with additional examples that can sever as additional exercises with drawing display objects and canvas in general.