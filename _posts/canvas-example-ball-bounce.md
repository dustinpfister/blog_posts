---
title: A Canvas example of bouncing balls
date: 2020-01-14 19:58:00
tags: [canvas]
categories: canvas
layout: post
id: 592
updated: 2020-01-15 18:44:12
version: 1.4
---

The subject of bouncing a ball around a canvas is a typical canvas example for most beginners. However even it you have been at it with canvas and javaScript for a while, this is one topic I find myself coming back to now and then.

In this post I will be going over some code that I put together for a basic bouncing ball canvas example. I will not be covering every little detail when it comes to this kind of example when it comes to advanced things pertaining to physics. However the canvas example will be about bouncing balls of of the edges of the canvas.

<!-- more -->


## 1 - The ball module

So lets start out with the ball module for this canvas example.

```js

var b = {};
 
b.createBallObject = function (opt) {
    var ball = {};
    opt = opt || {};
    ball.x = opt.x === undefined ? 0 : opt.x;
    ball.y = opt.y === undefined ? 0 : opt.y;
    ball.r = opt.r === undefined ? 5 : opt.r;
    ball.h = opt.h === undefined ? 0 : opt.h;
    ball.d = opt.d === undefined ? 0 : opt.d;
    return ball;
};
 
b.createBallCollection = function (opt) {
    var noop = function (ball, i) {
        ball.x = ball.r + ball.r * 3 * i;
        ball.y = ball.r;
    },
    i,
    ball,
    balls;
    opt = opt || {};
    opt.r = opt.r === undefined ? 5 : opt.r;
    opt.h = opt.h === undefined ? 5 : opt.h;
    opt.count = opt.count === undefined ? 4 : opt.count;
    opt.forBall = opt.forBall === undefined ? noop : opt.forBall;
 
    i = 0;
    balls = [];
    while (i < opt.count) {
        ball = b.createBallObject({
                r: opt.r,
                h: opt.h,
                d: opt.d,
            });
        opt.forBall(ball, i, opt);
        balls.push(ball);
        i += 1;
    }
    return balls;
};
 
b.moveBallObject = function (ball, canvas) {
    canvas = canvas || {
        width: 320,
        height: 240
    };
    // move
    ball.x += Math.cos(ball.h) * ball.d;
    ball.y += Math.sin(ball.h) * ball.d;
    // boundaries
    if (ball.y >= canvas.height - ball.r) {
        ball.y = canvas.height - ball.r;
        ball.h = ball.h * -1;
    }
    if (ball.y <= ball.r) {
        ball.y = ball.r;
        ball.h = ball.h * -1;
    }
    if (ball.x >= canvas.width - ball.r) {
        ball.x = canvas.width - ball.r;
        ball.h = (ball.h + Math.PI) * -1
    }
    if (ball.x <= ball.r) {
        ball.x = ball.r;
        ball.h = (ball.h + Math.PI) * -1;
    }
};
```

## 2 - The draw methods

```js
// draw a ball object
var drawBallObject = function (ball, ctx) {
    var x,
    y;
    // draw ball
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // draw heading line
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    x = Math.cos(ball.h) * ball.r * 2 + ball.x;
    y = Math.sin(ball.h) * ball.r * 2 + ball.y;
    ctx.lineTo(x, y);
    ctx.stroke();
};
 
// draw ball collection
var drawBallCollection = function (balls, ctx) {
    balls.forEach(function (ball) {
        drawBallObject(ball, ctx);
    });
};
```

## 3 - The rest of the canvas example

```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
 
ctx.translate(0.5, 0.5);
 
// create ball collection
var balls = b.createBallCollection({
        count: 4,
        r: 20,
        d: 1,
        forBall: function (ball, i, opt) {
            var space = 3.5;
            ball.x = canvas.width / 2 - ball.r * space * opt.count / 2 + ball.r * (space / 2) + ball.r * i * space;
            ball.y = canvas.height / 2;
            ball.h = Math.PI * 2 / opt.count * i + Math.PI * 0.25;
            //ball.h = Math.PI * 2 * Math.random();
        }
    });
 
var loop = function () {
    var i
    requestAnimationFrame(loop);
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw balls
    drawBallCollection(balls, ctx);
    // move all
    i = 0;
    while (i < balls.length) {
        b.moveBallObject(balls[i], canvas);
        i += 1;
    }
};
 
loop();
```