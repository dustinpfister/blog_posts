---
title: Canvas layers the basics and more
date: 2019-07-01 14:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 496
updated: 2019-07-07 14:33:12
version: 1.5
---

In html 5 canvas there might come a time in which [canvas layers](https://stackoverflow.com/questions/3008635/html5-canvas-element-multiple-layers) should be used. This can be helpful when there is a lot going on in the project and it is not necessary to repaint everything on the same frame tick. There are many was to go about increasing the efficiency of a canvas project, but layering might be a good starting point. Take a moment to think about what is going on in your project, are there things that are being redrawn on each frame tick that do not need to be redrawn each time? If so then take a moment to look into layering.

<!-- more -->

## 1 - canvas layer basic example

So the basic idea of canvas layers is that you just have a collection of canvas elements. A canvas element that is created and added to a container element first will have a lower z index value then canvas elements added after. anything that should have a lower z index value such as a background can be drawn to a canvas that is behind another canvas the draws something that updates on every frame tick. In some situations this can help to improves frame rate, as it allows for a situation in which what is being updated is only that what changes.

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

## 2 - Conclusion

That is it for canvas layering now, if I get some spare time, or work on a vanilla js canvas project I will likely update this post with some more examples. In any case thanks for reading, and have fun with canvas.