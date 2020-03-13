---
title: Canvas angle get the shortest direction between two angles
date: 2020-03-12 16:17:00
tags: [canvas]
layout: post
categories: canvas
id: 626
updated: 2020-03-13 06:56:03
version: 1.2
---

When working out canvas projects there might be a need to find the direction in which to go when given two angles. That is there is a current angle, and a target angle I which to get to, and I want to start stepping the current angle by a delta value that will get the current angle to the target angle.

<!-- more -->

## 1 - Get angle direction method canvas example


## 1.1 - The get direction method

```js
var getDir = (function () {
    // modulo
    var mod = function (x, m) {
        return (x % m + m) % m;
    };
    // normalize an angle to half radians
    var normalizeHalf = function (n) {
        var c = Math.PI * 2,
        h = c / 2;
        return mod(n + h, c) - h;
    };
    // public get dir method
    return function (a, b) {
        var z = a - b;
        if (a === b) {
            return 0;
        }
        if (normalizeHalf(z) < 0) {
            return 1;
        } else {
            return -1;
        }
    };
}
    ());
```

## 1.2 - A draw module

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.circlePoint = function (ctx, canvas, angle, radius) {
    ctx.beginPath();
    var x = Math.cos(angle) * radius + canvas.width / 2;
    var y = Math.sin(angle) * radius + canvas.height / 2;
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
};
 
draw.circle = function (ctx, canvas, state) {
    ctx.fillStyle = 'blue';
    draw.circlePoint(ctx, canvas, state.target, 50);
    ctx.fillStyle = 'green';
    draw.circlePoint(ctx, canvas, state.current, 50);
};
 
draw.debug = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.fillText(state.current, 20, 20);
};
```

## 1.1 - Main.js and index.html files

```js
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var state = {
    current: 0,
    delta: Math.PI / 180 * 5,
    target: Math.PI / 80 * 200,
    tickLast: new Date(),
    tickRate: 100
};
 
var update = function (state) {
    var now = new Date(),
    t = now - state.tickLast;
    if (t >= state.tickRate) {
        var dir = getDir(state.current, state.target);
        state.current += state.delta * dir;
        state.tickLast = new Date();
    }
};
 
var loop = function () {
    requestAnimationFrame(loop);
    update(state);
    draw.back(ctx, canvas);
    draw.circle(ctx, canvas, state);
    draw.debug(ctx, state);
};
 
loop();
```

```js
<html>
    <head>
        <title>canvas angle</title>
    </head>
    <body>
        <canvas id="mycanvas" width="320" height="240"></canvas>
        <script src="get_dir.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```