---
title: Canvas Rect or Box class design, movement and other relevant logic
tags: [js, canvas]
id: 28
categories: canvas
date: 2017-07-24 12:35:47
version: 1.19
updated: 2020-04-15 10:24:12
---

The concept of a simple 2d Box class is something that I keep coming back to when it comes to playing around with html 5 canvas. In any canvas project I typically do want to make at least a few [classes that are closely related to canvas](https://dev.to/washingtonsteven/playing-with-canvas-and-es6-classes). That is something involving a constructor function that creates an instance of an object that has at least the basic properties of a 2d box or rectangle. Then  in addition a few methods that act on those properties in the prototype object of that constructor.

For example if I am making a game I will want some kind of enemy class, but I would also want some kind of base class that the class inherits from as well that is shared by all classes that are a display object of sorts in such a game. So a box class would make a good starting base class for all kinds of display objects in a game beyond that of just enemies. The player ship, power ups, and shots coming from player and enemy ships would all inherit from this box class.

Also because a lot of applications have to do with manipulation of simple 2d areas on a screen, as such having a solid understanding of this aspect of 2d geometry is important. Taking the time to make a box class strikes me as something that is a good example of an exercise of sorts that can often progress into an interesting project of some kind. It has helped me gain a better understand of 2d geometry, and also the nature of a class.

<!-- more -->

## 1 - The basic javascript box, Canvas Rect, or Box class if you prefer

At a minimum a box class should have an x,y,w, and h properties that define the size, and position of the box. A more advanced Box class may have additional properties that have to do with rotation, and current delta values, but for this section I will be keeping it simple. In addition to the basic values that define a box it should also have a just one method that has to do with the manipulation of the box state position.

### 1.1 - The Box Class

So for a starting canvas box class I am just making a constructor method that creates a Box Class instance that is just the basic properties. Just the current x and y position of the box area, as well as width and height. In addition to this there is just one move method that just steps the box instance by passing some delta values.

```js
var Box = function (op) {
    op = op === undefined ? {} : op;
    // current position
    this.x = op.x === undefined ? 50 : op.x;
    this.y = op.y === undefined ? 50 : op.y;
    // with and height
    this.w = op.w === undefined ? 32 : op.w;
    this.h = op.h === undefined ? 32 : op.h;
};

// move the box
Box.prototype.move = function (dx, dy) {
    dx = dx === undefined ? 0 : dx;
    dy = dy === undefined ? 0 : dy;
    this.x += dx;
    this.y += dy;
};
```

Nothing much to write about here, but in this section I am just starting out with a basic version of a canvas rect class. Right off the bat the move method of mine here might not be the best way to go about moving a box, rect, or display object if you prefer in a canvas project. For This simple example section it will work okay, but it might be best to move by a pixels per second value.

Also there is moving a box by passing an angle and a distance rather than delta values for x, and y. So even when it comes to just moving a box there is a great deal more to cover.

### 1.2 - The Basic Box class demo

So Here I have a demo that makes use of this Basic Box class. I am just creating and injecting a canvas element, and then setting up a basic draw method to render the basic scene here that will be just a single box moving across the canvas.

```js
(function () {
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 240;
    document.body.appendChild(canvas);
 
    // the single draw function
    var draw = function () {
        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw the current state of the Box class instance to the context
        ctx.fillStyle = bx.fillColor;
        ctx.strokeStyle = bx.strokeColor;
        ctx.lineWidth = 3;
        ctx.fillRect(bx.x + 0.5, bx.y + 0.5, bx.w, bx.h);
        ctx.strokeRect(bx.x + 0.5, bx.y + 0.5, bx.w, bx.h);
    };
 
    // make a new instance of my box class
    var bx = new Box({
        y: canvas.height / 2 - 64,
        w: 128,
        h: 128
    });
 
    // the loop
    var loop = function () {
        requestAnimationFrame(loop);
        // use my move method
        bx.move(1, 0);
        // some basic rules for the box
        if (bx.x >= canvas.width) {
            bx.x = bx.x % canvas.width - bx.w;
        }
        draw(ctx);
    };
    loop();
}
    ());
```

So then this demo works as expected A white box just moves from the left of the screen to the right and then loops around back to the beginning.

So far so good, but when it comes to making a real canvas rect class I will of course want a whole lot more methods that have to do with finding out things like distance between the box, and another box. I might also want to have it so that the x and y point of the class instance refers to the center of the box rather than the upper left corner, and also do some things with rotation and collision detection.

There are all kinds of additional features that come to mind, also even when it comes to the single feature so far I might want to handle that a different way, so lets look at a more advanced example of this class now, with better movement, and some additional features.

## 2 - A functional approach to a javaScript Box object

AlthougnI do still find myself making and using javaScript classes I have found that I often do like taking a more functional programing approach to things like this also. Getting into functional programing in depth here would be off topic, however this section will make use of some of the aspects of a functional programing style. Mainly not mutating a given object in place, but returning a new one my making a shallow clone of a box instead of doing that.

### 2.1 - A box.js file example of a functional javaScript Box module

So my box.js file for this section is just a basic IIFE that contains a private clone method that I use to make a shallow clone of a box object. For this I am using the JSON trick to do so, it is a crude yet effective way to clone an object that should work on most modern platforms that will work okay for this kind of object.

The module returns a public API to a Box global variable, these are of course the public methods that will be used outside of the module to create, and move aa box Object.

```js
var Box = (function () {
 
    var clone = function (bx) {
        return JSON.parse(JSON.stringify(bx));
    };
 
    var api = {};
 
    api.create = function (opt) {
        opt = opt || {};
        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h
        };
    };
 
    api.moveByHeading = function (bx, heading, delta) {
        heading = heading === undefined ? 0 : heading;
        delta = delta === undefined ? 1 : delta;
        var nbx = clone(bx);
        nbx.x = nbx.x + nbx.w / 2 + Math.cos(heading) * delta;
        nbx.y = nbx.y + nbx.h / 2 + Math.sin(heading) * delta;
        return nbx;
    };
 
    return api;
 
}
    ());
```

### 2.2 - The draw.js module

I will then have a separate draw.js file as yet another way of breaking things down and making the whole project more organized. For now it might not make that much of a difference will this section at least, but as a project grows doing these kinds of things become more important to keep this net and easy to follow I think.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// draw a box
draw.box = function (ctx, bx, fill, stroke) {
    ctx.fillStyle = fill || '#ffffff';
    ctx.strokeStyle = stroke || '#000000';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};
```

### 2.3 - A simple example of a functional approach to a javaScript Box


```html
<html>
    <head>
        <title>canvas box functional style</title>
    </head>
    <body>
        <canvas id="the-canvas" width="640" height="480"></canvas>
        <script src="box.js"></script>
        <script src="draw.js"></script>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
bx = Box.create({
        x: 100,
        y: 80
    }),
bx2 = Box.moveByHeading(bx, Math.PI / 180 * 45, 100);
draw.back(ctx, canvas);
draw.box(ctx, bx);
draw.box(ctx, bx2);
        </script>
    </body>
</html>
```

## 3 - Where to go from here.

It's all about the project that I have in mind. Thats what will determine what kind of additional properties and methods I will be adding to the class. With some projects I will need to add sprites, or write methods that will allow for more advanced movement. Whatever the project may be, coming back to the simple old box class is often a good starting point.
