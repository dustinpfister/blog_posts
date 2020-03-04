---
title: Get a point relative to a canvas element rather than window in client side javaScript
date: 2020-03-04 09:41:00
tags: [canvas]
categories: canvas
layout: post
id: 621
updated: 2020-03-04 09:45:16
version: 1.1
---

When starting any kind of canvas project I want to get a canvas point that is relative to the canvas element rather than the window object.


<!-- more -->

## 1 - The canvas point basics

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

## 2 - support touch and mouse events

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