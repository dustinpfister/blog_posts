---
title: Canvas move objects by Pixels per second 
date: 2019-11-08 15:33:00
tags: [canvas]
categories: canvas
layout: post
id: 559
updated: 2019-11-08 17:48:22
version: 1.2
---

With canvas moving objects is one of the first things I started to get up to speed with. However years later I am not aware with many different ways to go about moving a display object in a canvas project. In my earliest projects I would just step the position of an object by delta values on each frame tick, but now I know that it is better to go by a pixels per second value and multiply that by the amount of time that has elapsed sense the last update of a state.

<!-- more -->

## 1 - canvas move objects by pixels per second basic example

In this section I will be going over a simple example of moving an object in canvas by a pixel per second rate. This is for the most part one of the best, if not the best ways to go about moving an object in canvas. It might not always be necessary though with some canvas projects, for example when working out any kind of deterministic animation rather than a game or simulation of some kind.

The basic idea is to just have a value that represents the number of pixels to move the object every second. On each frame tick find out how much time has elapses sense the last frame tick as a second value, then just move that object by multiplying the amount of time by that per pixel per second value.

### 1.1 - The HTML file

```html
<html>
    <head>
        <title>canvas arc</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="pps.js"></script>
    </body>
</html>
```

### 1.2 - The javaScript file

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// update a state
var updateState = function (state) {
    var now = new Date(),
    time = now - state.lt;
    state.x += time / 1000 * state.pps;
    state.x %= state.canvas.width;
    state.lt = now;
};
 
// draw a state
var draw = function (st) {
    var ctx = st.ctx,
    canvas = st.canvas;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(state.x, state.y, 16, 0, Math.PI * 2);
    ctx.fill();
};
 
// the state
var state = {
    canvas: canvas,
    ctx: ctx,
    x: 160,
    y: 120,
    pps: 128,
    lt: new Date()
};
 
// app loop
var loop = function () {
    requestAnimationFrame(loop);
    updateState(state);
    draw(state);
};
loop();
```