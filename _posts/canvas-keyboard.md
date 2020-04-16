---
title: Canvas input keyboard events and input in general
date: 2020-02-20 21:31:00
tags: [canvas]
layout: post
id: 617
categories: canvas
updated: 2020-04-16 11:23:02
version: 1.20
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

Very basic and crude, and there is a lot more that needs to be done until I have something that can be called an actual project of some kind. However the basic idea of having something happen when a key is pressed, and something else when it is released is there. This can also be thought of as an event driven kind of example, where user interaction is the only driving force for change of the application state, however getting into the more would be off topic.

Now that we have the basic idea of keydown and keyup events out of the way lest take a look at some of the properties of interest in the event object of a keyboard event.

### 1.2 - The keyCode and key properties of a keyboard event object

In the body of the event handler as with just about any other event hander the first argument given is an event object. This event object has many properties that are the same as with any other event object in client side javaScript, however there are some properties that are unique to keyboard events. The main properties of interest with keyboard events might be the key and keyCode properties.

Here I have some javaScript that is not all that also just displayed the current values of a state object in a canvas element. However now I am not just displaying if the key is down or up, but also the current key that was pressed.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
var draw = function(ctx, canvas, state){
   ctx.fillStyle = 'black';
   ctx.fillRect(0,0,canvas.width, canvas.height);
   ctx.fillStyle = 'white';
   ctx.textBaseline = 'middle';
   ctx.textAlign = 'center';
   ctx.font = '20px courier';
   ctx.fillText(state.key + '(' +state.code + ')', canvas.width/ 2, canvas.height/2);
};
var state = {
    keydown: false,
    code: -1,
    key: ''
};
var keyDown = function(e){
   state.keydown = true;
   state.code = e.keyCode;
   state.key = e.key;
   draw(ctx, canvas, state);
};
var keyUp = function(e){
   state.keydown = false;
   state.code = -1;
   state.key = '';
   draw(ctx, canvas, state);
};
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
draw(ctx, canvas, state);
```

## 2 -  Multi key canvas keyboard input

One way to get going with multi key input with client side javaScript I just need to have an array of boolean variables for each key. I can then have an event handler that will set the boolean value for a key to true if it is a key down event, and false if it is a key up event. This array of boolean values could then be used to update the state of an object in different ways depending on the combination of keys pressed.

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

## 3 - Starting a comprehensive keyboard, mouse and touch control module

In many projects I might want to use some kind of javaScript module or framework that abstracts away all of this stuff when it comes to keyboard events, as well as mouse and touch events. Many popular game and front end frameworks do just that of course. However the appeal of using vanilla javaScript is to have control, over well, control. So with that said in this section I will be going over a module that is the beginnings of a module that handles input in general from keys, and pointer events and presets it as a standard object containing a key code array, and a single pointer position object.

### 3.1 - Control.js

```js
var controlMod = (function () {
 
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect();
        return {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
    };
 
    var createInputState = function (canvas, win) {
        var input = {
            canvas: canvas,
            win: win,
            pointerDown: false,
            keys: {},
            pos: {
                x: null,
                y: null
            },
            keys: []
        };
        return input;
    };
 
    // handers
    var handlers = {
        pointerStart: function (pos, input, e) {
            input.pointerDown = true;
            input.pos.x = pos.x;
            input.pos.y = pos.y;
        },
        pointerMove: function (pos, input, e) {
            // update pos only if pointer is down
            if (input.pointerDown) {
                input.pos.x = pos.x;
                input.pos.y = pos.y;
            }
        },
        pointerEnd: function (pos, input, e) {
            input.pointerDown = false;
            input.pos.x = null;
            input.pos.y = null;
        }
    };
 
    // set an event handler for the given input state, DOMType, and type in handlers
    var setPointerHandler = function (input, DOMType, type) {
        console.log(input.canvas);
        input.canvas.addEventListener(DOMType, function (e) {
            var pos = getCanvasRelative(e);
            e.preventDefault();
            handlers[type](pos, input, e);
        });
    };
 
    var setKeyHandler = function (input, DOMType) {
        input.win.addEventListener(DOMType, function (e) {
            input.keys[e.keyCode] = e.type === 'keydown';
        });
    };
 
    return function (canvas, win) {
        var input = createInputState(canvas, win || window);
        // mouse
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mousemove', 'pointerMove');
        setPointerHandler(input, 'mouseup', 'pointerEnd');
 
        // touch
        setPointerHandler(input, 'touchstart', 'pointerStart');
        setPointerHandler(input, 'touchmove', 'pointerMove');
        setPointerHandler(input, 'touchend', 'pointerEnd');
 
        // keyboard
        setKeyHandler(input, 'keydown');
        setKeyHandler(input, 'keyup');
        return input;
    };
 
}
    ());
```

### 3.2 - trying this out with draw.js, main.js and some html

```js
// Draw
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.debugInput = function (ctx, input) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('input.pointerDown: ' + input.pointerDown, 10, 10);
    ctx.fillText('input.pos: ' + input.pos.x + ',' + input.pos.y, 10, 20);
    ctx.fillText('input.keys[87] (w): ' + input.keys[87], 10, 40);
    ctx.fillText('input.keys[65] (a): ' + input.keys[65], 10, 50);
    ctx.fillText('input.keys[83] (s): ' + input.keys[83], 10, 60);
    ctx.fillText('input.keys[68] (d): ' + input.keys[68], 10, 70);
};
```

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var input = controlMod(canvas);
 
var loop = function () {
 
    requestAnimationFrame(loop);
 
    draw.back(ctx, canvas);
    draw.debugInput(ctx, input);
 
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas keyboard</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="./lib/control.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="./main.js"></script>
    </body>
</html>
```

## 4 - Conclusion

Although pointer events are what I should always start out with some projects just work better with keyboard input, or some kind of game pad input.