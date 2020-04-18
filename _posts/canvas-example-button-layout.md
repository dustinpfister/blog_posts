---
title: Button Layout Canvas Example
date: 2020-02-03 15:11:00
tags: [canvas]
categories: canvas
layout: post
id: 604
updated: 2020-04-18 10:56:49
version: 1.16
---

When I am starting out with a canvas project there is often a need to have some kind of system in place for creating a simple user interface [html canvas buttons](https://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas/24384882) that is just a bunch of buttons that preform all kinds of actions when clicked. You would think that this would be a simple task when it comes to canvas, but things in canvas are not like things are with html outside of the canvas element where one can just add an input element.

Sure an input element and an event handler for it will work just fine in a pinch, but what if I want display objects rendered in the canvas to be what the button is for buttons? Doing so is more or less the same thing as creating display objects in general, it is just that we are creating a special kind of display object that is a user interface button. So in this [canvas example](/2020/03/23/canvas-example/) post, I will be going over a basic button layout solution for a canvas project.

<!-- more -->

## 1 - The utils lib of this canvas buttons layout example

In order to have a functioning button rendered in the canvas element as a display object, I am going to need a way to detect if an area has been clicked or not. So I will need a utility library of sorts that has at least a bounding box hit detection method as one of its methods. I will also want to have a method that will process a mouse or touch event so that it returns a canvas relative rather than window relative position of a click or touch event.

In addition to some basic methods for hit detection and working with event objects, I will also have a method in here that can be used to create a button layout object. This object will contain the current state of all buttons, and what is to happen when one of them is clicked.

### 1.1 - The start of the lib, get canvas relative, and bounding box

To work with buttons that are actually display objects in a canvas element rather than html elements positioned over a canvas, I am going to need to get canvas relative mouse and or touch positions as well as a means of collision or hit detection.

So at the start of my custom trailered utility library for this canvas button example I have a method that will return a canvas relative position fro a mouse or touch event. The canvas relative position can then be used in conjunction with another method that has to do with bounding box collision detection inside yet another method that will be used to find out if a button is clicked or not.

```js
var u = {};
 
u.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};
 
u.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
```

These two methods are usual suspects when it comes to making any kind of project centered custom tailer utility framework. However now that I have these to work with it is now time to get into a method that will be kind of the main show of this canvas example.

### 1.2 - The make canvas button layout method

So here I have my make button layout method that can be used to make a button layout object of sorts. The object that this method helps create contains an array of button objects. Each button object has properties such as and x and y position as well as a width and height. The properties of the button object can be used in conjunction with the processes pointer event positions to find out if a button has been clicked or not.

In the event that a button is clicked then an on action function that is also a property of a button object will be called. This on action method can contain custom logic that is to be fired when a button is clicked that has to do with the nature of the project in which this is used.

```js
u.mkButtonLayout = function (opt) {
    var blObj = {};
    opt = opt || {};
    blObj.buttons = opt.buttons || [];
    blObj.attachTo = opt.attachTo || window;
    blObj.handler = function (e) {
        var pos = u.getCanvasRelative(e),
        i = opt.buttons.length,
        b;
        e.preventDefault();
        while (i--) {
            b = opt.buttons[i];
            if (u.boundingBox(pos.x, pos.y, 1, 1, b.x, b.y, b.w, b.h)) {
                if (b.onAction) {
                    b.onAction.call({
                        opt: opt,
                        pos: pos,
                        button: b,
                        e: e
                    }, pos, opt, b, e);
                }
                break;
            }
        }
    };
    blObj.attachTo.addEventListener('click', blObj.handler);
    return blObj;
};
```

So now that I have this worked out I should have a way to draw the current state of a button layout object, and get together a basic demo of this to help confirm that it is working.

## 2 -  The draw module

For this canvas example I will of course have a draw module that will contain methods that can be used to draw to a canvas element. For this example I just have a draw background method and a method to draw the current state of a button layout object that I can create with mu utility library.

```js
var draw = {};
 
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.buttonLayout = function (ctx, blObj) {
    var i = blObj.buttons.length,
    b;
    while (i--) {
        b = blObj.buttons[i];
        ctx.fillStyle = 'red';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(b.label || '', b.x + b.w / 2, b.y + b.h / 2);
    }
};
```

## 3 - Now for a basic example of a canvas button layout in action

Now to pull everything together with html and a main.js file that will work as a basic example of this canvas button layout example in action. To keep things very basic I will just be creating an example that creates a button that is used to step a variable by one on each click.

```html
<html>
    <head>
        <title>canvas example button layout</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="utils.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
 
var count = 0;
 
// create button layout
var blObj = u.mkButtonLayout({
        attachTo: canvas,
        buttons: [{
                x: 16,
                y: 100,
                w: 64,
                h: 32,
                label: 'Step 0',
                onAction: function (pos, opt, button, e) {
                    count += 1;
                    console.log(button);
                    button.label = 'Step ' + count;
                }
            }
        ]
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.buttonLayout(ctx, blObj);
};
loop();
```

## 4 - Conclusion

So the basic idea that I had in mind for this project is working, but there is much more to do when it comes to this. There is of course having more than one instance of a button layout object that will change depending on an application state. In addition there is maybe adding more features that have to do with the movement of button objects in and out of the canvas as menus change. I might get around to expanding this post and project when it comes to all of that, but yet again maybe that is all a matter for another post.