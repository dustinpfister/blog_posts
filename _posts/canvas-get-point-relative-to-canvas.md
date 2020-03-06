---
title: Get a point relative to a canvas element rather than window in client side javaScript
date: 2020-03-04 09:41:00
tags: [canvas]
categories: canvas
layout: post
id: 621
updated: 2020-03-06 08:38:11
version: 1.5
---

When starting any kind of canvas project I want to get a [canvas point](https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/) that is relative to the canvas element rather than the window object.


<!-- more -->

## 1 - The canvas point basics

The basic idea with getting the canvas relative point is to use the get bounding client rect method of the canvas element of interest, and then use that to adjust any values in an event object that are window relative. one way to do so is to use the target property of an event object that was fired from an event hander that is attached to the canvas element. At which point the get bounding client rect method can be called off the reference to the canvas element, and then that can be used to adjust the client x and y values of an event object.

So you might end up working out something like this.

```js
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top,
        bx: bx
    };
};
```

Such a method might work out okay for mouse events, but what about supporting touch also?

## 2 - support touch and mouse events

So now that we have the basic idea covered there is the idea of a more robust solution that will work with touch events on top of just mouse events. The event objects of touch events of course are a little different then that of mouse events because of the possibility of multi touch. There is a changed touched array in the event object that contains an array of one or more objects for each finger on the touch surface. If I do not care about multi touch, and just want to make a single method that will work with both mouse and touch events then I will just want to get the first object in that array.

```html
<html>
    <head>
        <title>canvas get point relative to canvas</title>
    </head>
    <body>
        <canvas 
            id="the-canvas" 
            width="320" height="240"
            style="position:absolute;left:100px;top:100px"
        ></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
 
var drawBackground = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
var drawPos = function (ctx, pos) {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
    ctx.stroke();
};
 
var pointerHandler = function (e) {
    var pos = getCanvasRelative(e);
    drawPos(ctx, pos);
};
 
drawBackground(ctx);
canvas.addEventListener('mousemove', pointerHandler);
canvas.addEventListener('touchmove', pointerHandler);
        </script>
    </body>
</html>
```