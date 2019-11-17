---
title: Making and playing with a simple 2d Box class
tags: [js, canvas]
id: 28
categories: canvas
date: 2017-07-24 12:35:47
version: 1.9
updated: 2019-11-17 12:56:44
---

The concept of a simple 2d Box class is something that I keep coming back to when it comes to playing around with html 5 canvas. In any canvas project I typically do want to make at least a few [classes that are closely related to canvas](https://dev.to/washingtonsteven/playing-with-canvas-and-es6-classes). That is something involving a constructor function that creates an instance of an object that has at least the basic properties of a 2d box or rectangle. Then  in addition a few methods that act on those properties in the prototype object of that constructor.

For example if I am making a game I will want some kind of enemy class, but I would also want some kind of base class that the class inherits from as well that is shared by all classes that are a display object of sorts in such a game. So a box class would make a good starting base class for all kinds of display objects in a game beyond that of just enemies. The player ship, power ups, and shots coming from player and enemy ships would all inherit from this box class.

Also because a lot of applications have to do with manipulation of simple 2d areas on a screen, as such having a solid understanding of this aspect of 2d geometry is important. Taking the time to make a box class strikes me as something that is a good example of an exercise of sorts that can often progress into an interesting project of some kind. It has helped me gain a better understand of 2d geometry, and also the nature of a class.

<!-- more -->

## 1 - The basic Canvas Rect or Box class if you prefer

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

### 1.2 - The Basic Box class demo

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
        draw();
    };
    loop();
}
    ());
```

## 6 - Where to go from here.

It's all about the project that I have in mind. Thats what will determine what kind of additional properties and methods I will be adding to the class. With some projects I will need to add sprites, or write methods that will allow for more advanced movement. Whatever the project may be, coming back to the simple old box class is often a good starting point.
