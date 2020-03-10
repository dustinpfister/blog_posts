---
title: Canvas drag and drop examples
date: 2020-03-10 18:21:00
tags: [canvas]
layout: post
categories: canvas
id: 624
updated: 2020-03-10 19:13:09
version: 1.4
---

In [canvas drag](https://konvajs.org/docs/drag_and_drop/Drag_and_Drop.html) and drop actions are part of many projects when working out a user interface.


<!-- more -->

## 1 - Basic canvas drag example

So in this section I will be going over just a basic canvas drag example. This will just be a canvas example where at the center of the canvas will be a circle, and the circle can just be clicked and dragged around the canvas.

### 1.1 - The get canvas relative method and distance formula

In this example I will be using mouse and touch events so I will want to use a method I worked out that helps with getting the canvas relative position of a mouse or touch events from and event object. I will also want a distance formula to help me find out if I clicked the circle or not when working out my event handers.

```js
// get canvas relative and distance methods
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.2 - Event handers

```js
// Event handlers
var pointerDown = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (distance(pos.x, pos.y, state.x, state.y) <= state.r) {
            state.down = true;
        }
    };
};
var pointerMove = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (state.down) {
            state.x = pos.x;
            state.y = pos.y;
            draw(ctx, canvas, state);
        }
    };
};
var pointerUp = function (state) {
    return function (e) {
        state.down = false;
    };
};
```

### 1.3 - The draw method

```js
// draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
    ctx.fill();
};
```

### 1.4 - set up the canvas, state object, and attach events

```js
// set up canvas
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// the state object
var state = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    down: false
};
 
// attach for mouse and touch
canvas.addEventListener('mousedown', pointerDown(state));
canvas.addEventListener('mousemove', pointerMove(state));
canvas.addEventListener('mouseup', pointerUp(state));
canvas.addEventListener('touchstart', pointerDown(state));
canvas.addEventListener('touchmove', pointerMove(state));
canvas.addEventListener('touchend', pointerUp(state));
 
// starting draw
draw(ctx, canvas, state);
```