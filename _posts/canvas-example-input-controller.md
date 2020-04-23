---
title: An input controller canvas example
date: 2020-04-17 18:15:00
tags: [canvas]
layout: post
categories: canvas
id: 647
updated: 2020-04-23 10:47:18
version: 1.3
---

Todays [canvas example](/2020/03/23/canvas-example/) post is on something that I started working on that can be though of as an input controller. This input controller would help with abstracting mouse, touch, and keyboard events into a single input state object that I can pull values from within a loop, or attach events to.

The motivation for this is that when making a canvas project I want to make use of input from an array of sources, and a quick and simple process for this would be nice as I find myself wasting time writing the same code over and over again for this part of the process of making a project. 

Most frameworks such as phaser will have an input controller, or input hander of sorts that can be used to quickly get up and running with user input. However when it comes to making a canvas project from the ground up I will need to make my own solution for this sort of thing, along with my own state machine, and so forth. So this post will be on my input controller canvas example that makes use of mouse, touch, and keyboard input and will be my own vanilla javaScript solution for this kind of thing.

<!-- more -->

## 1 - The controller module

So first off lets go over the control.js module that I worked out for this.

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
                pointerEnd: []
            }
        };
        return input;
    };
 
    // handers
    var handlers = {
        pointerStart: function (pos, input, e) {
            input.pointerDown = true;
            input.pos = pos;
            input.userHanders.pointerStart.forEach(function (userHandler) {
                userHandler.call(input, pos, input, e);
            });
        },
        pointerMove: function (pos, input, e) {
            // update pos only if pointer is down
            if (input.pointerDown) {
                input.pos = pos;
            }
            input.userHanders.pointerMove.forEach(function (userHandler) {
                userHandler.call(input, pos, input, e);
            });
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
            input.userHanders.pointerEnd.forEach(function (userHandler) {
                userHandler.call(input, pos, input, e);
            });
        }
    };
 
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
        });
    };
 
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