---
title: Button Layout Canvas Example
date: 2020-02-03 15:11:00
tags: [canvas]
categories: canvas
layout: post
id: 604
updated: 2020-02-03 19:05:30
version: 1.6
---

When I am starting out with a canvas project there is often a need to have some kind of system in place for creating a simple user interface [html canvas buttons](https://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas/24384882) that is just a bunch of buttons that preform all kinds of actions when clicked. You would think that this would be a simple task when it comes to canvas, but things are not like with html outside of the canvas element where one can just add an input element.

Sure an input element and an event handler for it will work just fine in a pinch, but what if I want display objects rendered in the canvas to be what the button is? So in this canvas example post, I will be going over a basic button layout solution for a canvas project.

<!-- more -->

## 1 - The utils lib of this canvas buttons layout example

In order to have a functioning button rendered in the canvas element as a display object, I am going to need a way to detect if an area has been clicked or not. So I will need a utility library of sorts that has at least a bounding box hit detection method as one of its methods. I will also want to have a method that will process a mouse or touch event so that it returns a canvas relative rather than window relative position of a click or touch event.

In addition to some basic methods for hit detection and working with event objects, I will also have a method in here that can be used to create a button layout object. This object will contain the current state of all buttons, and what is to happen when one of them is clicked.

```js
var u = {};
 
u.getCanvasRelative = function (e) {
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
 
u.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
 
u.mkButtonLayout = function (opt) {
    var blObj = {};
    opt = opt || {};
    blObj.buttons = opt.buttons || [];
    blObj.attachTo = opt.attachTo || window;
    blObj.handler = function (e) {
        var pos = u.getCanvasRelative(e),
        i = opt.buttons.length,
        b;
        e.preventDefault();
        while (i--) {
            b = opt.buttons[i];
            if (u.boundingBox(pos.x, pos.y, 1, 1, b.x, b.y, b.w, b.h)) {
                if (b.onAction) {
                    b.onAction.call({
                        opt: opt,
                        pos: pos,
                        button: b,
                        e: e
                    }, pos, opt, b, e);
                }
                break;
            }
        }
    };
    blObj.attachTo.addEventListener('click', blObj.handler);
    return blObj;
};
```

## 2 -  The draw module

For this canvas example I will of course have a draw module that will contain methods that can be used to draw to a canvas element. For this example I just have a draw background method and a method to draw the current state of a button layout object that I can create with mu utility library.

```js
var draw = {};
 
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.buttonLayout = function (ctx, blObj) {
    var i = blObj.buttons.length,
    b;
    while (i--) {
        b = blObj.buttons[i];
        ctx.fillStyle = 'red';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(b.label || '', b.x + b.w / 2, b.y + b.h / 2);
    }
};
```

## 3 - Now for a basic example of a canvas button in action

Now to pull everything topographer with html and a main.js file that will work as a basic example of this in action.

```html
<html>
    <head>
        <title>canvas example button layout</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="utils.js"></script>
        <script src="draw.js"></script>
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
 
var count = 0;
 
// create button layout
var blObj = u.mkButtonLayout({
        attachTo: canvas,
        buttons: [{
                x: 16,
                y: 100,
                w: 64,
                h: 32,
                label: 'Step 0',
                onAction: function (pos, opt, button, e) {
                    count += 1;
                    console.log(button);
                    button.label = 'Step ' + count;
                }
            }
        ]
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.buttonLayout(ctx, blObj);
};
loop();
```