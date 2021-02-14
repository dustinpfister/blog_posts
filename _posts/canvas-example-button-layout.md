---
title: Button Layout Canvas Example
date: 2020-02-03 15:11:00
tags: [canvas]
categories: canvas
layout: post
id: 604
updated: 2021-02-14 17:45:54
version: 1.24
---

When I am starting out with a canvas project there is often a need to have some kind of system in place for creating a simple user interface [html canvas buttons](https://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas/24384882) that consists of just a bunch of buttons. These buttons can end up preforming all kinds of actions when clicked, and it sometimes might be nessecry to create a fairly complex module for them. You would think that this would be a simple task when it comes to canvas, but things in canvas are not like things are with html outside of the canvas element where one can just add an input element.

Sure an input element and an event handler for it will work just fine in a pinch, but what if I want display objects rendered in the canvas to be what the button is for buttons? Doing so is more or less the same thing as creating display objects in general, it is just that we are creating a special kind of display object that is a user interface button. So in this [canvas example](/2020/03/23/canvas-example/) post, I will be going over a basic button layout solution for a canvas project.

This button layout will working okay when it comes to certain projects, however in others I might want to do additional things to make it so that the buttons move in and out of the canvas. There is a fine line between a user interface button and a display object that is used to represent an enemy or play object in a game for example. In some projects I guess the only difference might be how a button is skinned compared to other display objects and what happens when you click or touch one.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/basic-idle-game/0.1.0/pkg.js"></script>

## 1 - The utils lib of this canvas buttons layout example

In order to have a functioning button rendered in the canvas element as a display object, I am going to need a way to detect if an area has been clicked or not. So I will need a utility library of sorts that has at least a bounding box hit detection method as one of its methods. I will also want to have a method that will process a mouse or touch event so that it returns a canvas relative rather than window relative position of a click or touch event.

In addition to some basic methods for hit detection and working with event objects, I will also have a method in here that can be used to create a button layout object. This object will contain the current state of all buttons, and what is to happen when one of them is clicked.

### 1.1 - The start of the lib, get canvas relative, and bounding box

To work with buttons that are actually display objects in a canvas element rather than html elements positioned over a canvas, I am going to need to get canvas relative mouse and or touch positions as well as a means of collision or hit detection.

So at the start of my custom trailered utility library for this canvas button layout example I have a mathematical modulo method. I will not be getting into the details about this method here as i have touched base on it all ready in a later post of mine. However I will say that it is just another way of preforming a modulo operation on top of what is built into javaScript itself.

 I also have a method that will return a canvas relative position from a mouse or touch event. The canvas relative position can then be used in conjunction with another method that has to do with bounding box collision detection inside yet another method in this utility library that will be used to find out if a button is clicked or not.

```js
var u = {};
 
u.mod = function (x, m) {
    return (x % m + m) % m;
};
 
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

So now that I have covered a few usual suspects for many of the custom utility library for my canvas examples, it is now time to move on to the next, and last method in this library. this final method in the library is what is used to create a button layout for a project.

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

For now I made it just part of the general utility library, but if I keep working on this project it will likely be pulled into its own module. Anyway now that I have this make button method worked out I should have a way to draw the current state of a button layout object, and get together a basic demo of this to help confirm that it is working. So lets look at a draw module that I made for this canvas example, and move on to a little demo code that will make used of all of this.

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
 
draw.circle = function (ctx, canvas, state) {
    var r = state.i / state.iMax * (Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(state.cx, state.cy, state.radius, r - 1.57, r + 1.57);
    ctx.fill();
    ctx.stroke();
};
 
draw.info = function (ctx, canvas, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px arial';
    ctx.fillText('i= ' + state.i + '/' + state.iMax, 10, 10);
};
 
draw.ver = function (ctx, canvas, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px arial';
    ctx.fillText('v' + state.ver, 5, canvas.height - 15);
};
 
```

## 3 - The main.js file

So now for just a quick example where I am testing out this utility library method that will create a simple button layout. Here in the main.js file of this example I create and inject the actually canvas element into a container element as I do in just about every other canvas example that I have made thus far for this site. I then have references to the canvas element, as well as the drawing context to which I pass to my draw module when it comes to rendering in a main app loop.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
 
var state = {
    ver: '0.0.0',
    i: 0,
    iMax: 16,
    cx: canvas.width / 2,
    cy: canvas.height / 2,
    radius: 32
};
 
var wrapIndex = function (state) {
    state.i = u.mod(state.i, state.iMax);
};
 
// create button layout
var blObj = u.mkButtonLayout({
        attachTo: canvas,
        buttons: [{
                x: canvas.width / 2 - 48,
                y: 180,
                w: 32,
                h: 32,
                label: 'i+',
                onAction: function (pos, opt, button, e) {
                    state.i += 1;
                    wrapIndex(state);
                }
            }, {
                x: canvas.height / 2 + 48,
                y: 180,
                w: 32,
                h: 32,
                label: 'i-',
                onAction: function (pos, opt, button, e) {
                    state.i -= 1;
                    wrapIndex(state);
                }
            }
        ]
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.buttonLayout(ctx, blObj);
    draw.circle(ctx, canvas, state);
    draw.info(ctx, canvas, state);
    draw.ver(ctx, canvas, state);
};
loop();
 
```

## 4 - Conclusion

So the basic idea that I had in mind for this project is working, but there is much more to do when it comes to this. There is of course having more than one instance of a button layout object that will change depending on an application state. In addition there is maybe adding more features that have to do with the movement of button objects in and out of the canvas as menus change. I might get around to expanding this post and project when it comes to all of that, but yet again maybe that is all a matter for another post.