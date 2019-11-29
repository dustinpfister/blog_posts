---
title: Canvas move objects by Pixels per second 
date: 2019-11-08 15:33:00
tags: [canvas]
categories: canvas
layout: post
id: 559
updated: 2019-11-29 16:02:15
version: 1.13
---

With [canvas moving display objects](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball) is one of the first things I started to get up to speed with. However years later I am now aware with many different ways to go about moving a display object in a canvas project. 

In my earliest projects I would just step the position of an object by delta values on each frame tick, and maybe that is still not such a bad way of doing so with some projects. However now I know that it is better to go by a pixels per second value and multiply that by the amount of time that has elapsed sense the last update of a state when it comes to certain projects that need to move in real time ( mainly games ). 

In addition there are other ways of moving objects that center around a current index or frame value relative to a set number of max frames. This kind of way of moving display objects in canvas can be though of as a very functional way of going about moving objects. Methods can be authored where I pass a frame index, and max frame value, and what is returned is an animation state that will always be the same for the same values that are passed to the method. In other words an animation methods that is in line with the rules of what is often called a pure function.

<!-- more -->

## 1 - A very basic Canvas Movement example

In this section I will be starting off with a very basic canvas movement example. If you have at least some experience with canvas chances are you might all ready be moving display object around this way.

### 1.2 - The HTML file

I start this project off with an HTML file with a canvas element, and a single script tag linking to the external javaScript file that will contain all the javaScript for this canvas movement example.

```html
<html>
    <head>
        <title>canvas move</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

### 1.2 - The javaScript file where I am just stepping an object on each tick

Here I have the actual javaScript of the example. I just have a simple object that serves as a display object of sorts. This object has just an x, y width, and height properties and that is it. This is often what I would put together when I was first starting out with canvas many years ago now. This kind of example might still work okay with very simple examples, but as a canvas project grows this might eventually result in some problems depending on the nature of the project.

```js
// get canvas, context, and set width + height
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
// just a basic display object
var obj = {
    x: 0,
    y: canvas.height / 2 - 16,
    w: 32,
    h: 32
};
// draw the scene
var draw = function (ctx, obj) {
    // draw background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw the object
    ctx.fillStyle = 'white';
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fill();
};
// app loop
var loop = function () {
    requestAnimationFrame(loop);
    // just stepping the object
    obj.x += 4;
    obj.x %= canvas.width-32;
    // draw object
    draw(ctx, obj);
};
// start loop
loop();
```

So this might not be perfect, but it might still serve as a good starting point. Also in some situations I might still take an approach that is not to different from this actually, depending of course on the kind of project that I am developing of course. If the project is some kind of real time game or simulation this kind of canvas movement can present problems with frame rate, but if it is a project where I just want to create a collection of frames it might still work okay in some cases.

## 2 - Canvas move objects by pixels per second basic example

In this section I will be going over a simple example of moving an object in canvas by a pixel per second rate. This is for the most part one of the best, if not the best ways to go about moving an object in canvas. It might not always be necessary though with some canvas projects, for example when working out any kind of deterministic animation rather than a game or simulation of some kind.

The basic idea is to just have a value that represents the number of pixels to move the object every second. On each frame tick find out how much time has elapses sense the last frame tick as a second value, then just move that object by multiplying the amount of time by that per pixel per second value.

### 2.1 - The javaScript file

So here I have the javaScript file that will create the object as well as update it by a pixel per second value. I get a reference to the canvas element and the drawing context as with any other canvas project. I then wrote my update method that will be used to update a state object on each frame tick, followed by a draw method for the state object, and a main app loop.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// update a state
var updateState = function (state) {
    var now = new Date(),
    time = now - state.lt;
    state.x += time / 1000 * state.pps;
    state.x %= state.canvas.width;
    state.lt = now;
};
 
// draw a state
var draw = function (st) {
    var ctx = st.ctx,
    canvas = st.canvas;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(state.x, state.y, 16, 0, Math.PI * 2);
    ctx.fill();
};
 
// the state
var state = {
    canvas: canvas,
    ctx: ctx,
    x: 160,
    y: 120,
    pps: 128,
    lt: new Date()
};
 
// app loop
var loop = function () {
    requestAnimationFrame(loop);
    updateState(state);
    draw(state);
};
loop();
```

This results in a circle just moving across the canvas, but should do so in a consistent way across different devices, and browsers.

## 3 - canvas movement by way of frame over maxFrame

I have come to find that I enjoy creating movement in a canvas project by way of thinking in terms of everything moving in relation to a frame index value relative to a max frame value. This way the movement of an object can be set by way of an expression that will change from one state to another, or loop back around again, based on the relationship between frame index and total frames.

```js
// point movement function
var pointMovement = function (frame, maxFrame, canvas) {
    let sx = -32,
    mx = canvas.width + 64;
    return {
        x: sx + mx * (frame / maxFrame),
        y: canvas.height / 2 - 16,
        r: 16
    };
};
```


```js
// draw a state
var draw = function (pt, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
    ctx.fill();
};

 
// loop frames unrestricted
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
var pt, frame = 0,
maxFrame = 100;
var loop = function () {
    requestAnimationFrame(loop);
    draw(pointMovement(frame, maxFrame, canvas), ctx, canvas);
    frame += 1;
    frame %= maxFrame;
};
loop();
```