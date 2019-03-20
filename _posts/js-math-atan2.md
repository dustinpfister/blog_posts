---
title: atan2 javaScript native Math method examples.
date: 2019-03-19 17:29:00
tags: [js]
layout: post
categories: js
id: 404
updated: 2019-03-20 11:06:37
version: 1.4
---

The native [Math.atan2 method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2) is a [2 argument arctangent method](https://en.wikipedia.org/wiki/Atan2) in the javaScript [Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). The method comes in handy when I wan to find the angle from one point to another in a Cartesian coordinate grid.

<!-- more -->

## 1 - atan2

The Math.atan2 method in javaScript is strange in the sense that the y argument is what is passed to the method first, followed by x. Aside from that when passed an y and x value the method will return an angle to that point relative the origin. It is then just a matter of offsetting things to get the desired angle between any two points.

### 1.1 - atan2 basic example

So the Math.atan2 method is used by giving two arguments the first of which is a y cornet followed by x. What is then returned by the method is a value between negative and positive PI, which is the angle to the given point from the origin.

So for a basic example if I where to give Math.atan2 a point that is any one to one ratio between x and y that should give me a 45 degree angle. That should at least be the case if zero degrees faces right, and I start to approach positive PI as the angle to a point moves to the left side of the screen. In other words a clockwise increase in the value of the angle.

```js

var a = Math.atan2(83,83);
 
console.log(a / Math.PI * 180); // 45
 
a = Math.atan2(83,0);
 
console.log(a / Math.PI * 180); // 90
```

The above example seems to correlate with that understanding of the angles returned by atan2. The point (x=83 y=83) is of course at a 45 degree angle from right side of the screen heading clock wise from the right side to the left side. In addition the point at (x=0,y=83) is at the bottom of the screen so it would be at 90 degrees.

So that being said the Math.atan2 method can be used as a way to find an angle from the origin to the point given via its two arguments. It is also possible to find the angle to any two points by just simply offsetting or normalizing one of the points.

## 2 - atan2 and two points

```js
var p1 = {
    x: 50,
    y: 50
},
p2 = {
    x: 75,
    y: 100
};
 
var a = Math.atan2(p1.y - p2.y, p1.x - p2.x) + Math.PI;
 
console.log(a / Math.PI * 180); // 63.43
```

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
