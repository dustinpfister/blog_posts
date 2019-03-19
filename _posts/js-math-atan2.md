---
title: atan2 javaScript native Math method examples.
date: 2019-03-19 17:29:00
tags: [js]
layout: post
categories: js
id: 404
updated: 2019-03-19 18:20:55
version: 1.1
---

The native [Math.atan2 method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2) is a [2 argument arctangent method](https://en.wikipedia.org/wiki/Atan2) in the javaScript [Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). The method comes in handy when I wan to find the angle from one point to another in a Cartesian coordinate grid.

<!-- more -->

## 1 - atan2

## 2 - atan2 canvas example

```html
<html>
    <head>
        <title>atan2</title>
    </head>
    <body>
        <canvas id="gamearea"></canvas>
        <script src="atan2-1.js"></script>
    </body>
</html>
```

```js
// SETUP CANVAS
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
var state = {
    toPoint: {
        x: canvas.width / 2 + 50,
        y: canvas.height / 2 + 50
    },
    fromPoint: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    a: 0,
    findAngle: function () {
        this.a = Math.atan2(this.toPoint.y - this.fromPoint.y, this.toPoint.x - this.fromPoint.x);
    }
};
 
// UPADTE
var update = function () {
 
    state.findAngle();
 
};
 
// DRAW
var drawPoint = function (point, style) {
    style = style || 'red';
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
};
 
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    drawPoint(state.fromPoint, 'white');
    drawPoint(state.toPoint, 'red');
 
    // draw line from state.fromPoint tp state.toPoint
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(state.fromPoint.x, state.fromPoint.y);
    ctx.lineTo(
        state.fromPoint.x + Math.cos(state.a) * 50,
        state.fromPoint.y + Math.sin(state.a) * 50)
    ctx.stroke();
};
 
// INPUT
canvas.addEventListener('mousemove', function (e) {
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;
 
    state.toPoint.x = x;
    state.toPoint.y = y;
 
});
canvas.addEventListener('mousedown', function (e) {
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;
 
    state.fromPoint.x = x;
    state.fromPoint.y = y;
 
});
 
// LOOP
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};
 
loop();
```
