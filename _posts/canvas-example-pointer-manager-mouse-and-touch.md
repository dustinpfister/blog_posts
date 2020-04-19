---
title: Pointer manager mouse and touch canvas example
date: 2020-01-29 20:03:00
tags: [canvas]
categories: canvas
layout: post
id: 599
updated: 2020-04-19 07:16:15
version: 1.12
---

This is a [canvas example](/2020/03/23/canvas-example/) that makes use of what I am calling a pointer manager. Maybe there are other names for such a thing but until I am aware of a better name that is what I am going to call it. This pointer manager of sorts will be something that is used just for pointer objects in general that is the result of input from a mouse, touchscreen, or any other means that can be used to create such objects. It is not however a comprehensive input controller that takes input from any additional input such as a keyboard, game pad. However what I work out here might be part of what might considered a full comprehensive input controller.

Many popular frameworks such as phaser will come with an input controller, when it comes to using such  framework it is just a means of becoming familiar with how to go about using that input controller. However in this post I will be writing about a vanilla javaScript solution for this. Still when it comes to working out a real project it might be best to use a well development and supported framework such as what is worked out for [PIXI when it comes to an interaction manager](https://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html).

Anyway say you want to make a canvas project that will work well with both mouse and touch events. So in other words you do not want to do anything with muti touch on touch devices, and you want all events for both mouse and touch events to be mapped to certain events that are the same. However in order to do so a bit of parsing, adjusting values, and other things need to be preformed before calling some uniform handers that are to be called for both mouse and touch events.
So thins will be a quick post on such a project that does what I just described so lets take a look.

<!-- more -->

## 1 - The pointer manager module for this canvas example

So lets start out with the module that will create the pointer manager of sorts. This module is a few helper methods and a single public method returned from within an IIFE module pattern. The public function is just called and passes s state machine object that I will be getting to with a demo later in this post.

### 1.1 - The start of the module and the get canvas relative helper.

So at the top of the module I have a get canvas relative helper. This method will return a canvas relative position from an event object that is passed from within an event hander that receives such an event object from its call back.

```js
var PMMT = (function () {
 
    // get canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect();
        var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
        return {
            x: x,
            y: y,
            bx: bx
        };
    };
```

### 1.2 - The out of canvas, and the get pointer helpers.

I then have an out of canvas helper that will return true of the given canvas relative position is out of bounds for the canvas of the state object. I also have a helper that will return a pointer object from the current state of a state machine of it has one or false if it does not.

```js
    // out of canvas
    var outOfCanvas = function (sm, pos) {
        return pos.x < 0 || pos.x >= sm.canvas.width || pos.y < 0 || pos.y >= sm.canvas.height;
    };
 
    // get a pointer object if the state has one else return false
    var getPointer = function (sm) {
        var stateObj = sm[sm.currentState] || {};
        if (stateObj.pointer) {
            return stateObj.pointer;
        }
        return false;
    };
```

### 1.3 - The attach pointer event helper

Here I have The attach pointer event helper method that will be called in the main public method to attach dome events for handlers that will call the current corresponding state pointer methods if they are there.

```js
    // attach pointer events
    var attachPointerEvent = function (sm, domType, smType) {
        // attach a hander of the given domType to the canvas
        sm.canvas.addEventListener(domType, function (e) {
            // get position and state
            var pos = getCanvasRelative(e),
            pointer = getPointer(sm),
            hander,
            endHander;
            // prevent default
            e.preventDefault();
            // if we have a point object
            if (pointer) {
                handler = pointer[smType];
                // if we have a hander
                if (handler) {
                    // do not fire handler if we go out of bounds
                    // but trigger and end for the current state if
                    // if is there
                    if (outOfCanvas(sm, pos)) {
                        endHandler = pointer.end;
                        if (endHandler) {
                            endHandler(pos, sm, e);
                        }
                    } else {
                        // if we are in bounds just fire the hander
                        handler(pos, sm, e);
                    }
                }
            }
        });
    };
```

### 1.4 - The public method

Now for the public method, what this is called from outside the module all I have to do is pass my state object, and dom events will be attached to the canvas of the state object.

```js
    // single attachment method for a state manager
    return function (sm) {
        // mouse events
        attachPointerEvent(sm, 'mousedown', 'start');
        attachPointerEvent(sm, 'mousemove', 'move');
        attachPointerEvent(sm, 'mouseup', 'end');
        attachPointerEvent(sm, 'mouseout', 'end');
        // touch events
        attachPointerEvent(sm, 'touchstart', 'start');
        attachPointerEvent(sm, 'touchmove', 'move');
        attachPointerEvent(sm, 'touchend', 'end');
        attachPointerEvent(sm, 'touchcancel', 'end');
 
    };
 
}
    ());
```

## 2 - Lets see it in action with a demo

So now for a quick demo to see if this works as it should when given a simple state object that will work with it. This is an example that just results in a circle drawn at the center of the canvas, and both mouse and touch events can be used to move it around. 

So lets start out with the html I just have a div element and then script tags linking to my pointer manager first, and then the main.js file that will follow.

```html
<html>
    <head>
        <title>canvas example pointer manager mouse and pointer</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="pointer-manager-mouse-touch.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

Here is the main.js file.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var sm = {
    currentState: 'init',
    canvas: canvas,
    ctx: ctx,
    model: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    init: {
        tick: function (model, sm) {
            PMMT(sm);
            sm.currentState = 'demo';
        }
    },
    demo: {
        tick: function (model, sm) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.arc(model.x, model.y, 5, 0, Math.PI * 2);
            ctx.stroke();
        },
        pointer: {
            start: function (pos, sm, e) {
                sm.model.down = true;
            },
            move: function (pos, sm, e) {
                var m = sm.model;
                if (m.down) {
                    m.x = pos.x;
                    m.y = pos.y;
                }
            },
            end: function () {
                var m = sm.model;
                m.down = false;
                m.x = canvas.width / 2,
                m.y = canvas.height / 2
            }
        }
    }
};
 
var loop = function () {
    requestAnimationFrame(loop);
    sm[sm.currentState].tick(sm.model, sm);
};
loop();
```

When this demo is up and running it works as expected. I can use the mouse to click and hold on the canvas and then drag the circle around the canvas, once I release the mouse button the circle returns to the center of the canvas. The same can be done with touch events, and in any case if I leave the canvas it triggers an end event also. This results in a uniform behavior regardless if I am using a mouse, or touch screen as a pointer device.