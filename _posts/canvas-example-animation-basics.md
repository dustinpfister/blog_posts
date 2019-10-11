---
title: Canvas examples on animation basics and beyond
date: 2019-10-10 17:03:00
tags: [canvas]
layout: post
id: 544
categories: canvas
updated: 2019-10-11 08:27:02
version: 1.5
---

So this is another post on [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), and for this post it will be about some basics with animations using canvas. Making animations with canvas can be a fun, and rewarding experience and is definitely and example of the fun side of javaScript. In addition in some situations animations can also be helpful as well as a way to express data, or show how something works. There are many canvas frameworks out there, but for now I will be sticking to just plain old native client side javaScript by itself here.

<!-- more -->

## 1 - A basic Canvas example of animation

So lets start off with a basic canvas example of an animation that is just that of a ball moving from side to side in the canvas. To do this I just need to have a canvas element, and then gain a reference to that canvas element. Once I have my canvas element reference I can then use the get context method of the canvas reference to get the 2d drawing context of that canvas element.
However I am also going to need more than just the canvas element reference and the drawing context, on top of that I am going to want to have at least a few variables that have to do with the current state of the animation. Because I am just moving a ball from one side of the canvas to the other and back again I am not going to need much, but I will need at least one variable for the current x position to say the least. There are all ready many different ways this kind of animation could be written with javaScript and canvas so lets look at some options.

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