---
title: Canvas input keyboard events and input in general
date: 2020-02-20 21:31:00
tags: [canvas]
layout: post
id: 617
categories: canvas
updated: 2020-03-10 07:25:43
version: 1.15
---

When working out a javaScript project [canvas keyboard events](https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms/Desktop_with_mouse_and_keyboard) might sometimes need to be used with mouse and touch events when working out a user interface. Of course these days touch and mouse events should always be used first and foremost when working out an interface, however keyboard support would still be nice for some projects.

Keyboard events in client side javaScript involve attaching event handlers to the window object, because these kinds of events have to do with key presses in general, and not just touch events that have to do with just a canvas element. 

There are two main events of interest the keydown and keyup events, the names of which should speak for themselves. I often use the key down event to set a boolean value to true, and then the key up to set it back to false, then use those boolean values to change things in an update loop. Another approach would be to make something that is more event driven with or without an update loop.

There is also using keyboard events in conjunction with rather than a replacement for touch events, and working out a general system for capturing use input. So lets look at some examples of canvas keyboard events, and input in general with canvas and javaScript.

<!-- more -->


## 1 - The basics of Canvas keyboard events

The basic idea of canvas and keyboard events is that one or more event listeners should be attached to the window object using something like the add event listener method of the window object. When doing so I use the key down or key up event types, and attach a handler method where I define some logic as to what to do when such an event occurs. In this section I will be going over a few basic examples that should work out okay as starting points for canvas and keyboard events.

### 1.1 - canvas keyboard example with key up and key down events 

So here I have a basic copy and past example where the html and javaScript are all wrapped up together. The result of this is a canvas example where the keydown property of a very basic state object is displayed in the center of the canvas. When any key is pressed the value of the keydown state property is set true and the canvas is redrawn. When any key is released the value of the keydown state object property is set back to false, and the canvas is redrawn yet again.

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

### 1.2 - The keyCode and key properties of a keyboard event object

In the body of the event handler as with just about any other event hander the first argument given is an event object. This event object has many properties that are the same as with any other event object in client side javaScript, however there are some properties that are unique to keyboard events.

## 2 -  Multi key canvas keyboard input

To get going with multi key input with client side javaScript I just need to have an array of boolean variables for each key. I can then have an event handler that will set the boolean value for a key to true if it is a key down event, and false if it is a key up event.

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