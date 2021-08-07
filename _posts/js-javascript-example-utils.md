---
title: JavaScript general utility module example
date: 2021-08-06 11:09:00
tags: [js]
layout: post
categories: js
id: 923
updated: 2021-08-07 15:27:37
version: 1.22
---

When I start a new project I often want to have a generic dumping ground for usual suspect type methods, in other words a kind of lodash like module only with methods that I am actually going to use in the project. Many methods that I might park in this kind of module might utility end up in some other module that has to do with something more specific such as working with angles, or creating and working with canvas elements, however when first starting out I just need a place to put them. So in todays post I will be going over a general utility module and the kind of methods that I might place in such a module that will serve as yet another one o my [javascript example](/2021/04/02/js-javascript-example/) type posts.

<!-- more -->

## 1 - The utils module

In this section I will then be going over a few usual suspect methods that I end up with in a generic utility module. It is important to stress that this is an example, and not the example, as the nature of this kind of module will differ fro one project to then next. For example in my [canvas example on a beach invasion type game prototype](/2020/04/24/canvas-example-game-beach/) I have the xp system as a stand alone method in the utils module of that example. This is one example of something that might start out in a module such as this, but should really maybe be in its own stand alone [experience point system module](/2020/04/27/js-javascript-example-exp-system/) actually.

### 1.1 - Start of the module and noop

When I make this kind of module often it is just one massive collection of public methods, so the [module pattern](/2019/03/12/js-javascript-module/) of just a simple object literal works more often than not. In some cases I might switch to a pattern that involves an [IIFE](/2020/02/04/js-iife/) or some other kind of option when it comes to this sort of thing, but that is often what I reserve for other kinds of specific modules that will contain at least a few private helper functions and objects that I do not need or want to make public.

One method that I might have in a utils module is just a simple noop function, or no operation function. This is just a function that does nothing actually, which may seem odd, but never the less it is something that I often used when it comes to setting a default value for a call back option for example.

```js
var utils = {};
// no operation ref
utils.noop = function(){};
```

### 1.2 - A distance formula

Another usual suspect that I might have in a module like this is a distance formula. In many of the projects that I make his is just a basic must have tool.

```js
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.3 - Bounding box collision detection

The distance formula can be used as a kind of collision detection, but only for a circle like area rather than a box like area. So another useful method to have in a generic utility module is a bounding box collision detection module.

```js
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
```

### 1.4 - Mathematical Modulo

The [built in JavaScript modulo operator may fall short](/2017/09/02/js-whats-wrong-with-modulo/), and not work as one might expect now and then in some situations. It is not that there is something wrong with it, it is just that the operator follows a different convention compared to other programing environments. So I often might want to have a module that provides an alternative convention, such as mathematical modulo on top of what is built into javaScript. Often this is the kind of convention I would prefer to use in most cases oddly enough so this is also often a kind of must have method in most projects.

```js
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
```

### 1.5 - Create a create canvas element method

I often like to make canvas projects so it is a good idea to have a method that will create and return a new canvas element with all the options set up just the way that I like it. There are many little details when it comes to canvas elements such as making it so that a context menu will not show up when the canvas is right clicked, adjusting the translation of the matrix and so forth.

```js
// create a canvas element
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
```

Using a method such as this is no replacement for a full blown canvas module of some kind though of course. There are many other little details surrounding canvas elements such as the topic of layering, and not always appending a canvas to a container that come to mind. Still this is a step in the right direction compared to starting over from the ground up each time I start a new project.

### 1.6 - Get a canvas relative position method

Another method that I might have in a general utilities module would be a method that I can use to adjust pointer positions.

```js
// get a canvas relative position that is adjusted for scale
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};
```

### 1.7 - Create a canvas pointer handler

This is a method that will create and return a single handler that will work with a range of events given a single event object.

```js
// create and return a canvas pointer event handler
utils.canvasPointerEventHandler = function (state, events) {
    return function (e) {
        var pos = utils.getCanvasRelative(e),
        handler = null;
        e.preventDefault();
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            handler = events['pointerStart'];
        }
        if (e.type === 'mousemove' || e.type === 'touchmove') {
            handler = events['pointerMove'];
        }
        if (e.type === 'mouseup' || e.type === 'touchend') {
            handler = events['pointerEnd'];
        }
        if (handler) {
            handler.call(e, e, pos, state);
        }
    };
};
```

### 1.8 - Attach pointer handlers for a canvas element

```js
// attach canvas pointer events
utils.canvasPointerEvents = function (canvas, state, events) {
    var handler = utils.canvasPointerEventHandler(state, events),
    options = {
        passive: false
    }
    canvas.addEventListener('mousedown', handler, options);
    canvas.addEventListener('mousemove', handler, options);
    canvas.addEventListener('mouseup', handler, options);
    canvas.addEventListener('touchstart', handler, options);
    canvas.addEventListener('touchmove', handler, options);
    canvas.addEventListener('touchend', handler, options);
};
```

## 2 - Demos of the utils module

### 2.1 - distance example

```html
<html>
    <head>
        <title>javaScript example utils</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="../lib/utils.js"></script>
        <script>
// using the utils.createCanvas method to create a canvasObj
// with a canvas, and ctx ref
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx,
circle = {
  x: 160,
  y: 120,
  r: 64,
  colorIndex: 1,
  colors: ['red', 'green', 'blue']
};
// draw method
var draw = function(){
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // the circle
    ctx.fillStyle = circle.colors[circle.colorIndex];
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fill();
};
// attaching an event
canvas.addEventListener('click', function(e){
   // using the utils.getCanvasRelative method to get the position of the click
   var pos = utils.getCanvasRelative(e);
   // using utils.distance to get the distance between the click position and the center if the circle
   var d = utils.distance(circle.x, circle.y, pos.x, pos.y);
   // if distance is less than or equal to circle radius step color index
   if(d <= circle.r){
      circle.colorIndex -= 1;
      // using utils.mod to wrap color index value
      circle.colorIndex = utils.mod(circle.colorIndex, circle.colors.length);
   }
   draw();
});
draw();
        </script>
    </body>
</html>
```

### 2.2 - pointer events example

```html
<html>
    <head>
        <title>javaScript example utils</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="../lib/utils.js"></script>
        <script>
var state = {
    pointerDown: false,
    canvasObj: utils.createCanvas(),
    circle: {
        x: 160,
        y: 120,
        r: 64,
        active: false,
        colorIndex: 1,
        colors: ['yellow', 'green', 'blue']
    }
};
/*
var canvas = state.canvasObj.canvas,
ctx = state.canvasObj.ctx,
circle = state.circle;
*/

// draw method
var draw = function(){
    var ctx = state.canvasObj.ctx,
    canvas = state.canvasObj.canvas,
    circle = state.circle;
    // solid black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // the circle
    ctx.fillStyle = circle.colors[circle.colorIndex];
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fill();
};
var events = {
    pointerStart: function(e, pos, state){
       var d = utils.distance(state.circle.x, state.circle.y, pos.x, pos.y);
       state.pointerDown = true;
       // if distance is less than or equal to circle radius step color index
       if(d <= state.circle.r){
           state.circle.active = true;
        }
        draw();
    },
    pointerMove: function(e, pos, state){
        if(state.pointerDown && state.circle.active === true){
            state.circle.x = pos.x;
            state.circle.y = pos.y;
        }
        draw();
    },
    pointerEnd: function(e, pos, state){
        state.pointerDown = false;
        state.circle.active = false;
    }
}
utils.canvasPointerEvents(state.canvasObj.canvas, state, events);
draw();
        </script>
    </body>
</html>
```

## 3 - Conclusion

This is not the end all solution for this kind of module of course, in practice this kind of module will change from one project to another. Also the idea here is to just have a temporary dumping ground for methods that should ultimately be placed in a module that is not so generic. For example that canvas methods in this utils module might end up in a whole other module that has to do with creating and working with one or more canvas elements, and not much of anything else. This distance, and bounding box methods might end up being static methods in a module that is some kind of display object pool module maybe. However often I still end up with a few odd ball methods that I just do not know where to go with, so I place them in a module like this.