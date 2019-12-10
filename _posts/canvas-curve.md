---
title: Canvas Curve basics
date: 2019-12-09 15:20:00
tags: [canvas]
layout: post
id: 577
categories: canvas
updated: 2019-12-10 09:13:21
version: 1.1
---

So in canvas curves are a topic that one will just get into at one point or another. There are 2d drawing api methods such as the canvas arc method and well as some others that can be used to draw more complex curves. However these methods do not help when it comes to pulling the state of something away from the process of rendering such a state. 

When it comes to really getting into curves, and starting to have a deep understand and appreciation for drawing curves in canvas, I feel as though I need to do something that involves making methods that create point collections.

<!-- more -->

## 1 - Canvas Curves and what to know before hand

So then in this post I will be going over all kinds of methods that have to do with creating an array of points. This array of points is then what is drawn to the canvas. This is necessary if I want to really get into the math behind canvas curve methods like the canvas arc method, and other such drawing api methods for drawing curves.

So then in order to use these methods you will need a way to draw these points to a canvas. This draw points methd will be all that is used to draw to the canvas in these examples, otherwise everything is just a way to create an array of numbers that are points in a 2d grid system.

### 1.1 - Have a draw points method to draw curves and lines in general from an array of points

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