---
title: Kaboom game clone for the Atari 2600 canvas example 
date: 2020-04-10 19:49:00
tags: [canvas]
layout: post
categories: canvas
id: 644
updated: 2020-04-11 20:05:17
version: 1.1
---

TIme for yet another one of my [canvas example](/2020/03/23/canvas-example/) posts.


<!-- more -->

## 1 - utils

```js
var utils = {}
// bounding box
utils.bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};
 
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        w: 1,
        h: 1,
        bx: bx
    };
};
```

## 2 - The kaboom module

## 3 - draw

## 4 - main
