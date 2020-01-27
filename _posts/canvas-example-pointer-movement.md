---
title: Pointer map movement logic canvas example
date: 2020-01-26 16:53:00
tags: [canvas]
categories: canvas
layout: post
id: 596
updated: 2020-01-27 04:56:20
version: 1.2
---

In this canvas example I will be working out some logic that has to do with moving what could be a map by way of a pointer such as a mouse. Many canvas examples, mainly games will require some way to pan around a game map of sorts, so some kind of logic such as what I am going over here would need to be used to do so.
<!-- more -->

## 1 - The pointer movement module

```js
var PM = (function () {
 
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
 
    // get canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        return {
            x: x,
            y: y,
            bx: bx
        };
    };
 
    var api = {};
 
    // new Pointer Movement State Object
    api.newPM = function () {
        return {
            down: false,
            angle: 0,
            dist: 0,
            delta: 0,
            sp: { // start point
                x: -1,
                y: -1
            },
            cp: { // current point
                x: -1,
                y: -1
            }
        };
    };
 
    // update the pm based on startPoint, and currentPoint
    api.updatePM = function (pm) {
        pm.dist = 0;
        pm.delta = 0;
        pm.angle = 0;
        if (pm.cp.x >= 0 && pm.cp.y >= 0) {
            pm.dist = distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        }
        if (pm.down && pm.dist >= 5) {
            var per = pm.dist / 64;
            per = per > 1 ? 1 : per;
            per = per < 0 ? 0 : per;
            pm.delta = per * 3;
            pm.angle = Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x);
        }
    };
 
    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt) {
        pt.x += Math.cos(pm.angle) * pm.delta;
        pt.y += Math.sin(pm.angle) * pm.delta;
    };
 
    // when a pointer action starts
    api.onPointerStart = function (pm, e) {
        var pos = getCanvasRelative(e);
        pm.down = true;
        pm.sp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer action moves
    api.onPointerMove = function (pm, e) {
        var pos = getCanvasRelative(e);
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer actions ends
    api.onPointerEnd = function (pm, e) {
        var pos = getCanvasRelative(e);
        pm.down = false;
        pm.sp = {
            x: -1,
            y: -1
        };
        pm.cp = {
            x: -1,
            y: -1
        };
    };
 
    return api;
 
}
    ());
```

## 2 - The draw module

```js
var draw = {};
 
draw.background = function (pm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
draw.PTGridlines = function (pt, ctx, canvas) {
    var cellX = -1,
    cellY = -1,
    x,
    y;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    while (cellX < 11) {
        x = cellX * 32 - pt.x % 32;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        cellX += 1;
    }
    while (cellY < 8) {
        y = cellY * 32 - pt.y % 32;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        cellY += 1;
    }
};
 
// draw a navigation circle when moving the map
draw.navCircle = function (pm, ctx, canvas) {
    if (pm.down) {
        var cx = pm.sp.x,
        cy = pm.sp.y,
        x,
        y,
        min = 64,
        per = 0,
        a = pm.angle;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        // draw circle
        ctx.beginPath();
        ctx.arc(cx, cy, min / 2, 0, Math.PI * 2);
        ctx.stroke();
        // draw direction line
        x = Math.cos(a) * min + cx;
        y = Math.sin(a) * min + cy;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        // draw delta circle
        per = pm.delta / 3;
        x = Math.cos(a) * min * per + cx;
        y = Math.sin(a) * min * per + cy;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
};
 
draw.debugInfo = function (pm, pt, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.fillText(pt.x + ', ' + pt.y, 10, 10);
}
```

## 3 - Main.js

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var pm = PM.newPM();
// a point
var pt = {
    x: 0,
    y: 0
};
 
var loop = function () {
    requestAnimationFrame(loop);
    PM.updatePM(pm);
    PM.stepPointByPM(pm, pt);
    draw.background(pm, ctx, canvas);
    draw.navCircle(pm, ctx, canvas);
    draw.debugInfo(pm, pt, ctx, canvas);
    draw.PTGridlines(pt, ctx, canvas);
};
loop();
 
canvas.addEventListener('mousedown', function (e) {
PM.onPointerStart(pm, e);
});
canvas.addEventListener('mousemove', function (e) {
PM.onPointerMove(pm, e);
});
canvas.addEventListener('mouseup', function (e) {
PM.onPointerEnd(pm, e);
});
```