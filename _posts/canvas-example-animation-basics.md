---
title: Canvas examples on animation basics and beyond
date: 2019-10-10 17:03:00
tags: [canvas]
layout: post
id: 544
categories: canvas
updated: 2019-10-11 08:19:27
version: 1.4
---

So this is another post on [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), and for this post it will be about some basics with animations using canvas. Making animations with canvas can be a fun, and rewarding experience and is definitely and example of the fun side of javaScript. In addition in some situations animations can also be helpful as well as a way to express data, or show how something works. There are many canvas frameworks out there, but for now I will be sticking to just plain old native client side javaScript by itself here.

<!-- more -->

## 1 - A basic Canvas example of animation

```html
<html>
    <head>
        <title>canvas example animation basics</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas and context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// some kind of state for the animation
var state = {
    frame: 0,
    maxFrame: 100,
    point: {}
};
// update or forFrame method
var forFrame = function (s, canvas) {
    var per = s.frame / s.maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    s.point.x = canvas.width * bias;
    s.point.y = canvas.height / 2;
    s.frame += 1;
    s.frame %= s.maxFrame
};
// draw method the canvas
var draw = function (s, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(s.point.x, s.point.y, 10, 0, Math.PI * 2);
    ctx.fill();
};
// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    forFrame(state, canvas);
    draw(state, ctx, canvas);
};
loop();
        </script>
    </body>
</html>
```