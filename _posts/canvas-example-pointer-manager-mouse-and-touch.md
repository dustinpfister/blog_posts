---
title: pointer manager mouse and touch canvas example
date: 2020-01-29 20:03:00
tags: [canvas]
categories: canvas
layout: post
id: 599
updated: 2020-01-29 20:13:54
version: 1.1
---

This is a canvas example that makes use of what I am calling a pointer manager. Maybe there are other names for such a thing but until I am aware of a better name that is what I am going to call it. Anyway say you want to make a canvas project that will work well with both mouse and touch events. So in other words you do not want to do anything with muti touch on touch devices, and you want all events for both mouse and touch events to be mapped to certain events that are the same. However in order to do so a bit of parsing, adjusting values, and other things need to be preformed before calling some uniform handers that are to be called for both mouse and touch events.
So thins will be a quick post on such a project that does what I just described so lets take a look.

<!-- more -->

## 1 - The pointer manager module for this canvas example


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