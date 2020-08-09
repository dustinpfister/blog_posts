---
title: Canvas example percent values and Math log
date: 2020-08-08 19:54:00
tags: [canvas]
layout: post
categories: canvas
id: 692
updated: 2020-08-09 09:41:12
version: 1.2
---

I have been busy with things lately so this weeks [canvas example](/2020/03/23/canvas-example/) is going to be a simple one that has to do with percent values that are linear and making them not so linear.

<!-- more -->

## 1 - 

```
var utils = {};
utils.logPer = function (per, a, b) {
    a = a === undefined ? 2 : a;
    b = b === undefined ? a : b;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + a - 2) + per) / Math.log(b);
};
utils.createLogPerPoints = function (a, b, sx, sy, w, h, len) {
    var points = [],
    i = 0,
    x,
    y,
    per;
    while (i < len) {
        per = i / len;
        x = sx + w / (len - 1) * i;
        y = sy + h - utils.logPer(per, a, b) * h;
        points.push({
            x: x,
            y: y
        });
        i += 1;
    }
    return points;
};
```

## 2 - 

```js
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.box = function (ctx, box) {
    ctx.fillStyle = 'grey';
    ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.strokeStyle = 'red';
};
draw.points = function (ctx, points) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    var i = 1;
    while (i < points.length) {
        ctx.lineTo(points[i].x, points[i].y);
        i += 1;
    }
    ctx.stroke();
};
draw.info = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('a: ' + state.a.toFixed(2), 10, 10);
};
```

## 3 - main

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var state = {
    a: 2,
    b: 10,
    maxHigh: 5,
    bias: 0,
    per: 0,
    i: 0,
    box: {
        x: 60,
        y: 20,
        w: 200,
        h: 200
    }
};
var loop = function () {
 
    var points = utils.createLogPerPoints(state.a, state.b, state.box.x, state.box.y, state.box.w, state.box.h, 100);
 
    requestAnimationFrame(loop);
 
    draw.back(ctx, canvas);
    draw.box(ctx, state.box);
 
    draw.points(ctx, points);
    draw.info(ctx, state);
 
    state.i += 1;
    state.i %= 1000;
    state.per = state.i / 1000;
    state.bias = 1 - Math.abs(0.5 - state.per) / 0.5;
    state.a = 2 + 3 * state.bias;
    state.b = state.a;
};
 
loop();
```