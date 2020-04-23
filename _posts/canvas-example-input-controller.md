---
title: An input controller canvas example
date: 2020-04-17 18:15:00
tags: [canvas]
layout: post
categories: canvas
id: 647
updated: 2020-04-23 11:28:37
version: 1.12
---

Todays [canvas example](/2020/03/23/canvas-example/) post is on something that I started working on that can be though of as an input controller. This input controller would help with abstracting mouse, touch, and keyboard events into a single input state object that I can pull values from within a loop, or attach events to.

The motivation for this is that when making a canvas project I want to make use of input from an array of sources, and a quick and simple process for this would be nice as I find myself wasting time writing the same code over and over again for this part of the process of making a project. 

Most frameworks such as phaser will have an input controller, or input hander of sorts that can be used to quickly get up and running with user input. However when it comes to making a canvas project from the ground up I will need to make my own solution for this sort of thing, along with my own state machine, and so forth. So this post will be on my input controller canvas example that makes use of mouse, touch, and keyboard input and will be my own vanilla javaScript solution for this kind of thing.

<!-- more -->

## 1 - The controller module With mouse, touch, and keyboard support

So first off lets go over the control.js module that I worked out for this. The control.js module will create just one global variable that contains two public methods, one for creating an input object, and then another that is just a convenience methods for attaching events.


### 1.1 - The start of the module, isMouse, and getCanvasRelativeArray

In the module everything is wrapped up into an [IIFE or Immediately Invoked Function Expression](/2020/02/04/js-iife/) where the public API is what will be returned by the function expression and thus be the value of the global variable.

At the top of the expression I have my isMouse helper method that will just return true if the given event object is a mouse event, after that there is a more complex method that will return an array of point objects from an event object where each object contains canvas relative rather than window relative x and y values.

```js
var controlMod = (function () {
 
    // is mouse helper
    var isMouse = function (e) {
        return (e.type === 'mousedown' || e.type === 'mouseup' || e.type == 'mousemove');
    }
 
    // get am array of point objects relative to the canvas
    // rather than the window object
    var getCanvasRelativeArray = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        arr = [];
        // mouse event
        if (isMouse(e)) {
            return [{
                    x: e.clientX - bx.left,
                    y: e.clientY - bx.top,
                    bx: bx,
                    e: e,
                    touch: {}
                }
            ];
        }
        // touch
        var i = 0,
        touch;
        while (i < e.targetTouches.length) {
            touch = e.targetTouches[i];
            arr.push({
                x: touch.clientX - bx.left,
                y: touch.clientY - bx.top,
                touch: touch,
                e: e,
                bx: bx
            });
            i += 1;
        }
        return arr;
    };
```

### 1.2 - Fill helper and create input state object

I then have a fill array helper, and a helper that will be used to create the input object.

```js
    // fill an array
    var fill = function (count, val) {
        return Array.apply(0, {
            length: count
        }).map(function () {
            return val
        })
    };
 
    var createInputState = function (canvas, win) {
        var input = {
            canvas: canvas,
            win: win,
            pointerDown: false,
            keys: {},
            pos: [],
            keys: fill(255, false),
            userHanders: {
                pointerStart: [],
                pointerMove: [],
                pointerEnd: [],
                keydown: [],
                keyup: []
            }
        };
        return input;
    };
```

### 1.3 - call user handlers helper, and the handlers object

I have a helper that is used to call all user defined event handers in the input object that is used in all the private handers that are attached to dome events such as the canvas and window object.

```
    var callUserHanders = function (input, type, a, e) {
        input.userHanders[type].forEach(function (userHandler) {
            userHandler.call(input, a, input, e);
        });
    };
 
    // handers
    var handlers = {
        pointerStart: function (pos, input, e) {
            input.pointerDown = true;
            input.pos = pos;
            callUserHanders(input, 'pointerStart', pos, e);
        },
        pointerMove: function (pos, input, e) {
            // update pos only if pointer is down
            if (input.pointerDown) {
                input.pos = pos;
            }
            callUserHanders(input, 'pointerMove', pos, e);
        },
        pointerEnd: function (pos, input, e) {
            if (isMouse(e)) {
                input.pointerDown = false;
                input.pos = [];
            } else {
                if (e.targetTouches.length === 0) {
                    input.pointerDown = false;
                    input.pos = [];
                } else {
                    input.pos = pos;
                }
            }
            callUserHanders(input, 'pointerEnd', pos, e);
        }
    };
```

### 1.4 - Set handers

Here are the methods that actually attach the handers to the dom elements they are used in the public api method.

```js
    // set an event handler for the given input state, DOMType, and type in handlers
    var setPointerHandler = function (input, DOMType, type) {
        console.log(input.canvas);
        input.canvas.addEventListener(DOMType, function (e) {
            var pos = getCanvasRelativeArray(e);
            e.preventDefault();
            handlers[type](pos, input, e);
        });
    };
 
    // set a key handler
    var setKeyHandler = function (input, DOMType) {
        input.win.addEventListener(DOMType, function (e) {
            input.keys[e.keyCode] = e.type === 'keydown';
            callUserHanders(input, DOMType, input.keys, e);
        });
    };
```

### 1.5 - The Public API

Now for the public API that consists of a single function with one static method attached.

```js
    var api = function (canvas, win) {
        var input = createInputState(canvas, win || window);
        // mouse
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mousemove', 'pointerMove');
        setPointerHandler(input, 'mouseup', 'pointerEnd');
        // touch
        setPointerHandler(input, 'touchstart', 'pointerStart');
        setPointerHandler(input, 'touchmove', 'pointerMove');
        setPointerHandler(input, 'touchend', 'pointerEnd');
        // keyboard
        setKeyHandler(input, 'keydown');
        setKeyHandler(input, 'keyup');
        return input;
    };
 
    // add a hander
    api.add = function (input, type, hander) {
        input.userHanders[type].push(hander);
    };
 
    return api;
 
}
    ());
```

## 2 - Simple demo

So now for a simple demo to test out if this mouse works as expected.

### 2.1 - The html of the demo

In th html file of the demo I link to the control.js file of course, and then a draw.js, and main.js file that I will be getting to in this section.

```html
<html>
    <head>
        <title>canvas keyboard</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="./lib/control.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="./main.js"></script>
    </body>
</html>
```

### 2.2 - The draw.js file

Here I have a draw.js file for this demo of the control module. For now I just need method to draw a background to a canvas, and to draw current debug info for the state of an input object.

```js
// Draw
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.debugInput = function (ctx, input) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('input.pointerDown: ' + input.pointerDown, 10, 10);
 
    // draw pos points
    var posPoints = input.pos.map(function (pos) {
            return pos.x + ',' + pos.y;
        }).join(' | ');
    ctx.fillText('input.pos: ' + posPoints, 10, 20);
 
    ctx.fillText('input.keys[87] (w): ' + input.keys[87], 10, 40);
    ctx.fillText('input.keys[65] (a): ' + input.keys[65], 10, 50);
    ctx.fillText('input.keys[83] (s): ' + input.keys[83], 10, 60);
    ctx.fillText('input.keys[68] (d): ' + input.keys[68], 10, 70);
};
```

### 2.3 - The main.js file

Now for the main.js file where I get references to the canvas element that I have in the html, create an input state for that canvas, attach some events, and draw the status in a loop.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var input = controlMod(canvas);
 
// can add events
controlMod.add(input, 'pointerStart', function (pos, input, e) {
    console.log('pointer event staretd: ');
    console.log(pos);
});
 
controlMod.add(input, 'keydown', function (keys, input, e) {
    console.log('key down:');
    console.log('keys[65]: ' + keys[65]);
});
 
// can pull in a loop
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.debugInput(ctx, input);
};
 
loop();
```

When this module is up and running so far things seem to work as i would expect. When I click the canvas I have just a single pos object in the input.pos array, when I touch the surface of my touch screen I get an array of pos objects. The events, and everything with keyboard keys seems to work as I would want it to also.