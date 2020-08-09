---
title: Canvas example percent values and Math log
date: 2020-08-08 19:54:00
tags: [canvas]
layout: post
categories: canvas
id: 692
updated: 2020-08-09 09:37:56
version: 1.1
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