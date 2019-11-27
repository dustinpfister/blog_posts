---
title: Pop The Lock Canvas Example Game Clone
date: 2019-11-26 21:22:00
tags: [js, canvas]
layout: post
categories: canvas
id: 571
updated: 2019-11-26 21:30:18
version: 1.2
---

A long time ago I played a game called [pop the lock on android](https://play.google.com/store/apps/details?id=com.sm.popTheLock&hl=en_US). It was a very simple game that just involved a circle moving along the path of another circle and once it gets close to a target you need to tap the screen or else you loose. So todays canvas example will be a game that is a clone of this to some extent, but a little different.

<!-- more -->

## 1 - The Pop the Lock state and methods

```js
// STATE
var ptl = {
    sec_current: 0,
    sec_target: 4,
    sec_total: 100,
    sec_margin: 4,
    tick_dir: -1,
    tick_rate: 30,
    tick_last: new Date(),
    inRange: false,
    score: 0,
    // wrap a sec value
    wrapSec: function (sec) {
        if (sec > this.sec_total) {
            sec %= this.sec_total;
        }
        if (sec < 0) {
            sec = this.sec_total - (this.sec_total + Math.abs(sec)) % this.sec_total;
        }
        return sec;
    },
    // get in range boolean
    getInRange: function () {
        return this.sec_current >= this.sec_target - this.sec_margin && this.sec_current <= this.sec_target + this.sec_margin;
    },
    // user clicked to touched the canvas
    click: function (e) {
        ptl.score += ptl.inRange ? 1 : -1;
        if (ptl.inRange) {
            ptl.tick_dir = ptl.tick_dir === 1 ? -1 : 1;
            ptl.randomTarget();
        }
    },
    randomTarget: function () {
        this.sec_target = Math.floor(Math.random() * (this.sec_total - this.sec_margin * 2)) + this.sec_margin;
    },
    // tick
    tick: function () {
        var time = new Date() - this.tick_last,
        ticks = time / this.tick_rate;
        this.sec_current += ticks * this.tick_dir;
        this.sec_current = this.wrapSec(this.sec_current);
        this.inRange = this.getInRange();
        this.tick_last = new Date();
    }
};
```

## 2 - The draw method

```js
// DRAW
var drawPTL = function (ptl, ctx, canvas) {
 
    var r,
    x,
    y;
 
    // background
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    // draw base circle
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.stroke();
 
    // draw target range
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100,
        ptl.wrapSec(ptl.sec_target - ptl.sec_margin) / ptl.sec_total * Math.PI * 2,
        ptl.wrapSec(ptl.sec_target + ptl.sec_margin) / ptl.sec_total * Math.PI * 2);
    ctx.stroke();
 
    // draw current
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    r = ptl.sec_current / ptl.sec_total * Math.PI * 2;
    x = Math.cos(r) * 100 + canvas.width / 2;
    y = Math.sin(r) * 100 + canvas.height / 2;
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();
 
    // score
    ctx.fillStyle = ptl.score > 0 ? 'green' : 'red';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '25px arial';
    ctx.fillText(ptl.score, canvas.width / 2, canvas.height / 2);
 
    // info
    ctx.fillStyle = 'yellow';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.globalAlpha = 0.35;
    ctx.font = '10px arial';
    ctx.fillText('sec_current ' + ptl.sec_current.toFixed(2), 10, 10);
    ctx.fillText('inrange ' + ptl.inRange, 10, 20);
};
```

## 3 - The canvas and loop

```js
// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;
 
    canvas.addEventListener('click', ptl.click);
 
    ptl.randomTarget();
 
    var loop = function () {
        requestAnimationFrame(loop);
        ptl.tick();
        drawPTL(ptl, ctx, canvas);
    };
    loop();
 
}
    ());
```