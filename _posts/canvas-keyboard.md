---
title: Canvas input keyboard events and input in general
date: 2020-02-20 21:31:00
tags: [canvas]
layout: post
id: 617
categories: canvas
updated: 2020-02-24 09:27:53
version: 1.5
---

When it comes to [canvas keyboard events](https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms/Desktop_with_mouse_and_keyboard) might sometimes need to be used with mouse and touch events. Of course these days touch and mouse events should always be used first and foremost when working out an interface, however keyboard support would still be nice for some projects.

Keyboard events in client side javaScript involve attaching event handlers to the window object, because these kinds of events have to do with key presses in general, and not just touch events that have to do with juts a canvas element. There are two main events of interest the keydown and keyup events, the names of which should speak for themselves. I often use the key down event to set a boolean value to true, and then the key up to set it back to false, then use those boolean values to change things in an update loop, or make this event driven.

<!-- more -->


## 1 - The basics of Canvas keyboard events

```html
<html>
    <head>
        <title>canvas keyboard</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
var draw = function(ctx, canvas, state){
   ctx.fillStyle = 'black';
   ctx.fillRect(0,0,canvas.width, canvas.height);
   ctx.fillStyle = 'white';
   ctx.textBaseline = 'middle';
   ctx.textAlign = 'center';
   ctx.font = '60px courier';
   ctx.fillText(state.keydown, canvas.width/ 2, canvas.height/2);
};
var state = {
    keydown: false
};
var keyDown = function(e){
   state.keydown = true;
   draw(ctx, canvas, state);
};
var keyUp = function(e){
   state.keydown = false;
   draw(ctx, canvas, state);
};
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
draw(ctx, canvas, state);
        </script>
    </body>
</html>
```

## 2 - 

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// Draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillText('dir: ' + state.dir, 20, 20);
    ctx.fillText('dir: ' + state.dir, 20, 20);
};
 
var state = {
    keys: {},
    dir: 0,
    maxDir: 8
};
// modulo that works okay with negative numbers
var mod = function (a, b) {
    if (a < 0) {
        return b - Math.abs(a) % b;
    }
    return a % b;
};
// set direction
var setDir = function () {
    if (state.keys.a) {
        state.dir -= 1;
    }
    if (state.keys.d) {
        state.dir += 1;
    }
};
// key handler
var keyHandler = function (e) {
    // toggle a boolean for the key
    state.keys[e.key] = e.type === 'keyup' ? false : true;
    setDir();
    draw(ctx, canvas, state);
};
// attach event handler
window.addEventListener('keydown', keyHandler);
window.addEventListener('keyup', keyHandler);
draw(ctx, canvas, state);
```