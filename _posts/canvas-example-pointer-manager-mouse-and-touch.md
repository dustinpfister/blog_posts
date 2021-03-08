---
title: Pointer manager mouse and touch canvas example
date: 2020-01-29 20:03:00
tags: [canvas]
categories: canvas
layout: post
id: 599
updated: 2021-03-08 10:04:22
version: 1.27
---

This is a [canvas example](/2020/03/23/canvas-example/) that makes use of what I am calling a pointer manager. Maybe there are other names for such a thing but until I am aware of a better name that is what I am going to call it. This pointer manager of sorts will be something that is used just for pointer objects in general that is the result of input from a mouse, touchscreen, or any other means that can be used to create such objects. It is not however a comprehensive input controller that takes input from any additional input such as a keyboard, game pad, and so forth.  I have another [canvas example that aims to be everything when it comes to input](/2020/04/17/canvas-example-input-controller/) that I wrote a post on, so that post might be worth checking out also. However what I work out here might be part of what might considered a full comprehensive input controller that would handle all things input related.

Many popular frameworks such as [phaser will come with an input controller](/2017/10/19/phaser-input-pointers/), when it comes to using such a framework it is just a means of becoming familiar with how to go about using that input controller. However in this post I will be writing about a vanilla javaScript solution for this topic when it comes to web development. Still when it comes to working out a real project it might be best to use a well development and supported framework such as what is worked out for [PIXI when it comes to an interaction manager](https://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html). However if you do what to take the time to make your own abstraction for this, then maybe what is written here will be a helpful starting point for you.

Anyway say you want to make a canvas project that will work well with both mouse and touch events. So in other words you do not want to do anything with multi touch on touch devices, or even if you do bother with an array of touch objects that is something that you want to have off to the side sort of speak. It is still a good idea to want all events for both mouse and touch events to be mapped to certain events that are the same. However in order to do so a bit of parsing, adjusting values, and other things need to be preformed before calling some uniform handers that are to be called for both mouse and touch events. 

So this will be a post on such a project that does what I just described, if you want to have multi touch support then it is still important to make additional functionality to support other means of control. Things might be different when it comes to making a mobile app, but this is a web application you are making after all. When I look at my site statistics most of my visitors are on desktop, but I still want things to work well on both desktop and mobile.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pointer-manager-mouse-and-touch/0.0.1/pkg.js"></script>

## 1 - The pointer manager module for this canvas example

So lets start out with the module that will create the pointer manager of sorts. This module is a few helper methods and a single public method returned from within an IIFE module pattern. The public function is just called and when doing so I pass a state machine object that I will be getting to with a demo later in this post. However for now I think that I can just say that the state machine object has a reference to a canvas element in it. It is then this canvas element to which I would like to attach some event handlers.

### 1.1 - The out of canvas, and the get pointer helpers.

At the top of the PMMT module I then have an out of canvas helper that will return true of the given canvas relative position is out of bounds for the canvas of the state object. I also have a helper that will return a pointer object from the current state of a state machine if the current state object has a pointer object else the function will return false if it does not. This will make more sense once I get to the main.js file where I have the current code for the main state machine object.

```js
var PMMT = (function () {
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

### 1.2 - The attach pointer event helper

Here I have The attach pointer event helper method that will be called in the main public method of this pointer module. This helper function is then to attach dome events for handlers that will call the current corresponding state pointer methods if they are there. When doing so a position object will be passed as a first argument, followed by a reference to the state machine, and finally the event object. The position object will be relative to the canvas element rather than the window object thanks to the use of a method in my utility library for this example that I will be getting to in a later section.

```js
    // attach pointer events
    var attachPointerEvent = function (sm, domType, smType) {
        // attach a hander of the given domType to the canvas
        sm.canvas.addEventListener(domType, function (e) {
            // get position and state
            var pos = utils.getCanvasRelative(e),
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

### 1.3 - The public method

Now for the public method, what this is called from outside the module all I have to do is pass my state object, and dom events will be attached to the canvas of the state object. This is then what I will be using in my main.js file to attach event handlers for the state machine. Once I do so it is then how I go about creating and adding states when it comes to adding additional logic as to what to do when it comes to working wih pointer events.

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

## 2 - The utils library

In this example I am making use of my usual get canvas relative helper method. This method will return a canvas relative position from an event object that is passed from within an event hander that receives such an event object from its call back.

```js
var utils = {};
// create a canvas
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
// get canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

I have a [post in which I get into the topic of getting a canvas relative point in general](/2020/03/04/canvas-get-point-relative-to-canvas/). For the sake of this project a solution like this works okay because I do not want or need to support multi-touch. If i did want to support multi-touch then I would still use a solution not all that different from this one only it would return an array of pointer objects.

## 3 - The draw module

This is a canvas example after all, so just like all the other canvas examples I like to have a draw module where I park all the methods that I will be using to draw to a canvas element. Like all the draw modules I of course have the usual draw background method, and I have also made the draw ver method standard when it comes to these canvas examples as well.

When it comes to the nature of this example I am then just going to want to have a draw method that will render the current location a pointer object.

```js
var draw = (function(){
    var api = {};
    // draw background
    api.background = function(ctx, canvas, sm){
        ctx.fillStyle = sm.backgroundStyle || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var img = sm.backgroundImage;
        if(img){
            ctx.drawImage(sm.backgroundImage, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        }
    };
    // draw a pointer object
    api.pointerObj = function(ctx, canvas, pt){
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw version number
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = '#0a0a0a';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillText('v' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
```

## 4 - Lets see it in action with a demo

So now for a quick demo to see if this works as it should when given a simple state object that will work with it. This is an example that just results in a circle drawn at the center of the canvas, and both mouse and touch events can be used to move it around. 

So lets start out with the html I just have a div element and then script tags linking to my pointer manager first, and then the main.js file that will follow.

```html
<html>
    <head>
        <title>canvas example pointer manager mouse and pointer</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/pointer.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

Here is the main.js file.

```js
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
// state machine object
var sm = {
    ver: '0.0.1',
    currentState: 'init',
    canvas: canvas,
    ctx: ctx,
    backgroundStyle:'gray',
    model: {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 10
    },
    init: {
        tick: function (model, sm) {
            PMMT(sm);
            sm.currentState = 'demo';
        }
    },
    demo: {
        tick: function (model, sm) {
            draw.background(sm.ctx, sm.canvas, sm);
            draw.pointerObj(sm.ctx, sm.canvas, sm.model);
            draw.ver(sm.ctx, sm.canvas, sm);
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
// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    sm[sm.currentState].tick(sm.model, sm);
};
loop();
```

When this demo is up and running it works as expected. I can use the mouse to click and hold on the canvas and then drag the circle around the canvas, once I release the mouse button the circle returns to the center of the canvas. The same can be done with touch events, and in any case if I leave the canvas it triggers an end event also. This results in a uniform behavior regardless if I am using a mouse, or touch screen as a pointer device.

## 5 - Conclusion

So this is all just part of what might one day become a full canvas framework if I ever get to it. I am not sure if I can recommend taking the time to work out your own canvas framework rather than just using something that is out there. Sure there are advantages for doing so, and that is of course why I am taking the time to work out these examples. However I am paying a price for doing so as i find myself spending ore time making projects like this, and less time making actually games, animations, and productivity applications.