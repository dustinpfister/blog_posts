---
title: Canvas layers the basics and more
date: 2019-07-01 14:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 496
updated: 2019-07-01 14:19:00
version: 1.1
---

In html 5 canvas there might come a time in which canvas layers should be used. This can be helpful when there is a lot going on in the project and it is not necessary to repaint everything on the same frame tick.

<!-- more -->

## 1 - canvas layer basic example

```html
<html>
    <head>
        <title>canvas layer example</title>
    </head>
    <body>
        <div style="position:absolute;left:50px;top:50px;">
            <canvas id="canvas_back" width="320" height="240" style="position:absolute;"></canvas>
            <canvas id="canvas_front" width="320" height="240" style="position:absolute;"></canvas>
        </div>
        <script>
// get canvas elements and drawing content for each
var canvas_back = document.getElementById('canvas_back'),
canvas_front = document.getElementById('canvas_front'),
ctx_back = canvas_back.getContext('2d'),
ctx_front = canvas_front.getContext('2d');
// some draw methods
var drawBackground = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
var drawCircle = function (ctx, canvas, circle) {
    ctx.strokeStyle = 'red';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.stroke();

};
// draw background once
drawBackground(ctx_back, canvas_back)
// draw circle on each frame tick
var x = 0,
y = 30
    var loop = function () {
    requestAnimationFrame(loop);
    drawCircle(ctx_front, canvas_front, {
        x: x,
        y: y,
        radius: 15
    });
    x += 5;
    x %= canvas_front.width;
};
loop();

        </script>
    </body>
</html>
```
