---
title: Canvas Game examples
date: 2019-03-18 19:40:00
tags: [js, canvas]
layout: post
categories: canvas
id: 403
updated: 2019-03-19 11:26:33
version: 1.4
---

In this post I will be writing about a few simple canvas game examples. There is of course a lot to cover when it comes to getting started with canvas games and javaScript, but this post should help with many of the basics and more.

<!-- more -->

## 1 - Canvas games basics

So in order to get started with canvas it would be a good idea to learn a thing or two about javaScript to begin with if you have not done so before hand. I will not be covering the basics of javaScript development here, there will be some simple copy and past examples, but you need to know the basics of how to get them working.

## 2 - Canvas game one - simple moving box example

In this example I have worked out just a simple moving box example. Many Games might start out with this kind of structure that just involves moving a box around a screen. So it would be a good idea to start of with something just very simple like this if you are new to canvas game development.

```js
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
 
// a simple state
var ship = {
    x: 144,
    y: 104,
    a: 0,
    pps: 64,
    lastTick: new Date()
};
 
var mod = function (x, m) {
    return (x % m + m) % m;
};
 
// an update loop for the state
var update = function () {
 
    var secs = (new Date() - ship.lastTick) / 1000;
    ship.lastTick = new Date();
 
    var dx = Math.cos(ship.a) * ship.pps * secs;
    var dy = Math.sin(ship.a) * ship.pps * secs;
 
    ship.x += dx;
    ship.y += dy;
 
    ship.x = mod(ship.x, canvas.width - 32);
    ship.y = mod(ship.y, canvas.height - 32);
 
};
 
// draw method
var draw = function () {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw ship
    ctx.fillStyle = 'red';
    ctx.fillRect(ship.x, ship.y, 32, 32);
};
 
canvas.addEventListener('mousedown', function (e) {
 
    var bx = e.target.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
 
    // using Math.atan2 to set ship angle
    ship.a = Math.atan2(y - canvas.width / 2, x - canvas.height / 2);
 
});
 
// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};
 
loop();
```