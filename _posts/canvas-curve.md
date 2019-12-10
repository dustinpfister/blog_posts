---
title: Canvas Curve basics
date: 2019-12-09 15:20:00
tags: [canvas]
layout: post
id: 577
categories: canvas
updated: 2019-12-10 09:33:29
version: 1.5
---

So in canvas curves are a topic that one will just get into at one point or another. There are 2d drawing api methods such as the canvas arc method and well as some others that can be used to draw more complex curves. However these methods do not help when it comes to pulling the state of something away from the process of rendering such a state. 

When it comes to really getting into curves, and starting to have a deep understand and appreciation for drawing curves in canvas, I feel as though I need to do something that involves making methods that create point collections.

<!-- more -->

## 1 - Canvas Curves and what to know before hand

So then in this post I will be going over all kinds of methods that have to do with creating an array of points. This array of points is then what is drawn to the canvas. This is necessary if I want to really get into the math behind canvas curve methods like the canvas arc method, and other such drawing api methods for drawing curves.

So then in order to use these methods you will need a way to draw these points to a canvas. This draw points method will be all that is used to draw to the canvas in these examples, otherwise everything is just a way to create an array of numbers that are points in a 2d grid system.

### 1.1 - Have a draw points method to draw curves and lines in general from an array of points

Many canvas frameworks will have a method that will draw an array of points to a canvas. If you want to just use native javaScript by itself you might just use a basic method like this.

```js
var drawPoints = function (ctx, points, close) {
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1]);
        i += 2;
    }
    if(close){ctx.closePath();}
    ctx.stroke();
};
```

In these examples I have this method alone in a separate javaScript file.

### 1.2 - Angles lib

I also also using a simple library that I put together to help with working with angles. What I have worked out so far here is based on [angles.js](https://github.com/infusion/Angles.js).

```js
var angle = {
    scale: Math.PI * 2
};
angle.mod = function (x, m) {
    return (x % m + m) % m;
};
angle.dist = function (a, b) {
    var m = angle.scale,
    h = m / 2,
    // normalize full
    diff = angle.mod(a - b, m);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};
```

## 2 - Canvas arc curve example

So in this example I will be going over a canvas curve example that is just a more complex way of using the canvas arc method. The Math.cos, and Math.sin methods can be used to create an array of points around a center point from a given radius.

### 2.1 - The Points arc method

So Here I have the points Arc method that I have placed in its own javaScript file and will link to in the html that makes use of this alone with my other assets. I made it so that this method works in a similar way to the canvas arc method, by giving a center x and y value, alone with a radius, start and end radians, and a counter clockwise boolean. On top of that there is one additional argument that sets the number of points in the arc.

The major difference from the canvas arc method of the 2d drawing api is that this method returns an array of points that can then be passed to my draw points method. In addition this method gives me a better degree of control as I can set the number of points in the arc, which is just one of many reasons why it is often better to take this kind of approach rather than just using the drawing methods in the 2d drawing context.

```js
var pointsArc = function (cx, cy, radius, start, end, counterClock, pointCount) {
    cx = cx === undefined ? 0 : cx;
    cy = cy === undefined ? 0 : cy;
    radius = radius === undefined ? 50 : radius;
    start = start === undefined ? 0 : start;
    end = end === undefined ? Math.PI * 2 : end;
    counterClock = counterClock === undefined ? false : counterClock;
    pointCount = pointCount === undefined ? 50 : pointCount;
    var rad,
    points = [],
    d = angle.dist(start, end),
    a = counterClock ? Math.PI * 2 - d : d,
    radDelta = a / (pointCount-1) * (counterClock ? -1: 1),
    i = 0,
    x,
    y;
    while (i < pointCount) {
        rad = start + radDelta * i;
        x = Math.cos(rad) * radius + cx;
        y = Math.sin(rad) * radius + cy;
        points.push(x, y);
        i += 1;
    }
    return points;
};
```

So now that we have that together lets make use of this method in an example in which I am also linking to my draw points method and angles.js library.

### 2.2 - The HTML

```html
<html>
    <head>
        <title>canvas arc</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="draw-points.js"></script>
        <script src="angles.js"></script>
        <script src="points-arc.js"></script>
        <script>
 
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// use points arc and draw points to draw a circle the hard way
var points = pointsArc(160, 120, 100, 0, Math.PI * 2, true, 75);
ctx.strokeStyle = 'green';
drawPoints(ctx, points, false);
 
        </script>
    </body>
</html>
```