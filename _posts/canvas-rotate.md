---
title: The canvas rotate method tips tricks and related topics
date: 2019-11-05 12:58:00
tags: [canvas]
layout: post
categories: canvas
id: 556
updated: 2019-11-05 13:12:41
version: 1.3
---

The canvas rotate method can be useful for doing quick on the fly rotations, but doing so will cost some overhead compared to having sprite sheets where the rotations have been worked out before hand. Still if I just want to quickly rotate something in canvas there is the rotate method in the 2d drawing context, so lets look at some examples of this as well as related topics such as the canvas translate method and save and restore.

<!-- more -->

## 1 - A Basic canvas rotate example

So lets start off with a basic example of the canvas rotate method.

```html
<html>
    <head>
        <title>canvas rotate</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// a basic draw box method
var drawBox = function (ctx, bx) {
    bx = bx || {};
    bx.x = bx.x === undefined ? 0 : bx.x;
    bx.y = bx.y === undefined ? 0 : bx.y;
    bx.w = bx.w === undefined ? 32 : bx.w;
    bx.h = bx.h === undefined ? 32 : bx.h;
    ctx.lineWidth = 3;
    ctx.strokeStyle = bx.color || 'green';
    ctx.strokeRect(bx.x - bx.w / 2, bx.y - bx.h / 2, bx.w, bx.h);
};
// paint a packground
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// just drawing a box at the center
drawBox(ctx, {
    x: 160,
    y: 120,
    w: 32,
    h: 32,
    color: 'red'
});
// using the canvas rotate method
// to draw a box at the same location
// but rotated at 45 degrees
ctx.save();
ctx.translate(160, 120);
ctx.rotate(Math.PI / 180 * 45);
drawBox(ctx, {
    w: 32,
    h: 32
});
ctx.restore();
```