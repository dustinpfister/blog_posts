---
title: Canvas Game examples
date: 2019-03-18 19:40:00
tags: [js, canvas]
layout: post
categories: canvas
id: 403
updated: 2019-03-19 12:19:52
version: 1.6
---

In this post I will be writing about a few simple canvas game examples. There is of course a lot to cover when it comes to getting started with canvas games and javaScript, but this post should help with many of the basics and more.

<!-- more -->

## 1 - Canvas games basics

So in order to get started with canvas it would be a good idea to learn a thing or two about javaScript to begin with if you have not done so before hand. I will not be covering the basics of javaScript development here, there will be some simple copy and past examples, but you need to know the basics of how to get them working.

## 2 - Canvas game one - Simple moving box example

In this example I have worked out just a simple moving box example. Many Games might start out with this kind of structure that just involves moving a box around a screen. So it would be a good idea to start of with something just very simple like this if you are new to canvas game development. We all need to start somewhere when it comes to this sort of thing, so lets get this one out of the way.

### 2.1 - The html for the Canvas Game

For the html I will keep things very simple. The main area of concern is that I just have a canvas element, and a script tag that will link to my external javaScript file. It is also possible to create and inject canvas elements of course, and there is a great deal more to write about when it comes to making this valid html 5 markup. However for the sake of keeping this example fairly simple, I will not be getting into that for this example at least.

```html
<html>
    <head>
        <title>canvas game</title>
    </head>
    <body>
        <canvas id="gamearea"></canvas>
        <script src="game1.js"></script>
    </body>
</html>
```

### 2.2 - The game1.js file for the Canvas Game

```js
// get the canvas and context
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
 
// set native size of the canvas
canvas.width = 320;
canvas.height = 240;
 
// a simple state that is just a single object
// that will be the moving box
var bx = {
    // x, y, and angle
    x: 144,
    y: 104,
    a: 0,
 
    // pixels per second
    pps: 64,
    lastTick: new Date()
};
 
// mathematical modulo
var mod = function (x, m) {
    return (x % m + m) % m;
};
 
// an update loop for the state
var update = function () {
    // number of seconds sense last tick
    var secs = (new Date() - bx.lastTick) / 1000;
    // reset last tick to current time
    bx.lastTick = new Date();
    // step x and y
    bx.x += Math.cos(bx.a) * bx.pps * secs;
    bx.y += Math.sin(bx.a) * bx.pps * secs;
    // wrap x and y
    bx.x = mod(bx.x, canvas.width - 32);
    bx.y = mod(bx.y, canvas.height - 32);
};
 
// draw method
var draw = function () {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw bx
    ctx.fillStyle = 'red';
    ctx.fillRect(bx.x, bx.y, 32, 32);
};
 
// attach single event handler
canvas.addEventListener('mousedown', function (e) {
    // get bounding client rect
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;
    // using Math.atan2 to set bx angle
    bx.a = Math.atan2(y - canvas.width / 2, x - canvas.height / 2);
});
 
// main app loop
var loop = function () {
    // use RAF over setTimeout
    requestAnimationFrame(loop);
    // update, and draw
    update();
    draw();
};
 
loop();
```