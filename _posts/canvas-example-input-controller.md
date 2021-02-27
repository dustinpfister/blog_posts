---
title: An input controller canvas example
date: 2020-04-17 18:15:00
tags: [canvas]
layout: post
categories: canvas
id: 647
updated: 2021-02-27 11:22:43
version: 1.31
---

Todays [canvas example](/2020/03/23/canvas-example/) post is on something that I started working on that can be though of as an input controller for various [input devices](https://en.wikipedia.org/wiki/Input_device) that might be on a range of client systems. This input controller would help with abstracting mouse, touch, and keyboard events into a single input state object that I can pull values from within a loop, or attach events to. At times it seems that doing something like this is necessary because of all kinds of problems that come up with trying to get control of something to work nice with a range of options for doing so.

The motivation for this is that when making a canvas project I want to make use of input from an array of sources, and a quick and simple process for this would be nice as I find myself wasting time writing the same code over and over again for this part of the process of making a project. 

Most [frameworks such as phaser will have an input controller](https://phaser.io/docs/2.6.2/Phaser.Input.html), or input hander of sorts that can be used to quickly get up and running with user input. However when it comes to making a canvas project from the ground up I will need to make my own solution for this sort of thing, along with my own state machine, and so forth when it comes to making my own framework. So this post will be on my input controller canvas example that makes use of mouse, touch, and keyboard input and will be my own vanilla javaScript solution for this kind of thing. In the process of doing so I might also manage to make various utility methods that help with the process of creating a more comprehensive way to dealing with input.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/input-controller/0.0.0/pkg.js"></script>

### 1 - The utility lib

Here I have the utils library for this canvas example of an input controller. This library often contains methods that I might use across many canvas examples, but might also change from one canvas example to the next.

In this utils.js file for this canvas example I have a isMouse method that will just return true if the given event object is a mouse event, after that there is a more complex method that will return an array of point objects from an event object where each object contains canvas relative rather than window relative x and y values.

For this canvas example I did not go with my usual get canvas relative method, but worked out a get canvas relative array method that will allow for me to do things with multi touch. When it comes to touch events I went with using the [targetTouches](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/targetTouches) [touch list](https://developer.mozilla.org/en-US/docs/Web/API/TouchList) property of the [touch event object](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) rather than the other options. The reason why is because I have found that the targetTouches touch list array contains the touch objects that I want for making this abstraction. In other examples I might want to use changedTouches or the touches properties in place of this, but not here.

```js
var utils = {};
 
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
 
utils.isMouse = function (e) {;
    return e.type.substr(0,5) === 'mouse';
};
 
utils.getCanvasRelativeArray = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos,
    arr = [];
    // mouse event
    if (utils.isMouse(e)) {
        pos = {
            x: e.clientX - bx.left,
            y: e.clientY - bx.top,
            bx: bx,
            e: e,
            touch: {}
        };
        // ajust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        return [
            pos
        ];
    }
    // touch
    var i = 0,
    touch;
    while (i < e.targetTouches.length) {
        touch = e.targetTouches[i];
        pos = {
            x: touch.clientX - bx.left,
            y: touch.clientY - bx.top,
            touch: touch,
            e: e,
            bx: bx
        };
        // ajust for native canvas matrix size
        pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
        pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
        arr.push(pos);
        i += 1;
    }
    return arr;
};
```

## 1 - The controller module With mouse, touch, and keyboard support

So first off lets go over the control.js module that I worked out for this. The control.js module will create just one global variable that contains and object with two public methods, one for creating an input object, and then another that is just a convenience methods for attaching events. I might get around to expanding this example more when and if I get additional time as I am sure many features are still missing. I have come to fine that what I really truly need to add to something like this will pop up as I start to use it with some projects.

### 1.1 - The start of the module

In the module everything is wrapped up into an [IIFE or Immediately Invoked Function Expression](/2020/02/04/js-iife/) where the public API is what will be returned by the function expression and thus be the value of the global variable.

I then have a fill array helper, and a helper that will be used to create the input object that the main public method will return. The fill method is just a pony fill for Array.fill, the only reason why it is here is because I would like to push IE support as far back as IE9 although I have not tested this to work on that.

```js
var controlMod = (function () {
 
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
            ver: '0.0.0',
            canvas: canvas,
            win: win,
            pointerDown: false,
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

I then have a create input state object helper that will be used to create and return a main input state object for this module. The input state object contains references to the canvas, and the window object that was given when it is called. This method is not called directly, but inside the body of the public API method that is returned later on in this module. The pointer down property will be set to true when a mouse button is down, or when a touch surface is being pressed. The keys array will contain boolean values for each key code from 0 to 255. I also then have a user handlers prop that can be used to set handlers for for each built in pointer event.

### 1.2 - call user handlers helper, and the handlers object

I have a helper that is used to call all user defined event handlers in the input object that is used in all the private handers that are attached to dom events such as the canvas and window object. I then also have a handlers object that contains functions that are called for mouse or touch events. The idea here is to create a single pointer event that can be the result of mouse, touch, or some other action that has to do with automation or using the keyboard to emulate pointer movement.

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
            if (utils.isMouse(e)) {
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
            var pos = utils.getCanvasRelativeArray(e);
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

The main function is used to create an input state object. When called the input object is created with the private create input state method that I went over earlier, and as such the given canvas and window object are pases to that method here. The input state object that is created is then what is returned, but not before handers are attached to it. I do so by calling the other private methods that I went over for each event that I want handers attached for, in this module I want mouse, touch, and keyboard support.

```js
    var api = function (canvas, win) {
        var input = createInputState(canvas, win || window);
        // mouse
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mousemove', 'pointerMove');
        setPointerHandler(input, 'mouseup', 'pointerEnd');
        setPointerHandler(input, 'mouseout', 'pointerEnd');
        // touch
        setPointerHandler(input, 'touchstart', 'pointerStart');
        setPointerHandler(input, 'touchmove', 'pointerMove');
        setPointerHandler(input, 'touchend', 'pointerEnd');
        setPointerHandler(input, 'touchcancel', 'pointerEnd');
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

So now for a simple demo to test out if this control module works as expected. In this section I will just be going over a very basic example that just draws the current status of the input object to the canvas on each tick. In addition I will be testing out the event handers for event driven input rather that pulling the object also by just logging to the javaScript console.

### 2.1 - The html of the demo

In th html file of the demo I link to the control.js file of course, and then a draw.js, and main.js file that I will be getting to in this section.

```html
<html>
    <head>
        <title>canvas keyboard</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
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
    ctx.font = '20px arial';
    ctx.fillText('input.pointerDown: ' + input.pointerDown, 10, 20);

    // draw pos points
    var posPoints = input.pos.map(function (pos) {
            return pos.x + ',' + pos.y;
        }).join(' | ');
    ctx.fillText('input.pos: ' + posPoints, 10, 40);

    ctx.fillText('input.keys[87] (w): ' + input.keys[87], 10, 60);
    ctx.fillText('input.keys[65] (a): ' + input.keys[65], 10, 80);
    ctx.fillText('input.keys[83] (s): ' + input.keys[83], 10, 100);
    ctx.fillText('input.keys[68] (d): ' + input.keys[68], 10, 120);
};
draw.ver = function(ctx, input){
    var canvas = input.canvas;
    // draw ver
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('v' + input.ver, 5, canvas.height - 15);
}
```

### 2.3 - The main.js file

Now for the main.js file where I get references to the canvas element that I have in the html, create an input state for that canvas, attach some events, and draw the status in a loop.

```js
var canvasObj = utils.createCanvas({
   width: 640,
   height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
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
    draw.ver(ctx, input);
};
 
loop();
```

When this module is up and running so far things seem to work as i would expect. When I click the canvas I have just a single pos object in the input.pos array, when I touch the surface of my touch screen I get an array of pos objects. The events, and everything with keyboard keys seems to work as I would want it to also.

## 3 - Conclusion

Depending on the nature of the project I would want to hack over this a little, add things to it, or remove code or change code that will not be used Depending on the nature of the project.

Working out these things takes time and doing so often leads to me spending more time making things like this rather than making an actual project. However the whole point of doing something like this is to have something that is custom cut to the project, if I want to save time maybe it would be best to not bother with something like this at all and just use a framework.

If I get to it I might expand this post with some simple games examples to further test out if this control module works okay or not. For now I am still torn between just using a framework like phaser, and doing this kind of thing. I like the idea of writing everything from the ground up, but this is time consuming.