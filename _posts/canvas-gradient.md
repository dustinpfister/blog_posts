---
title: Canvas Gradient basic example and more
date: 2020-02-05 15:11:00
tags: [canvas]
categories: canvas
layout: post
id: 606
updated: 2020-02-13 20:48:16
version: 1.7
---

A [Canvas Gradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) can be created in html 5 canvas with two constructors of interest which are [create Linear Gradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient), and [create Radial Gradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient). Once a Gradient object is created it is possible to add color stops to it, once done it can be used as a fill or stroke style in a 2d drawing context using [gradient color](https://en.wikipedia.org/wiki/Color_gradient).

<!-- more -->

## 1 - Canvas Gradient basic example with the Create Linear Gradient method

It might be best to start out with a linear gradient so in this section I will be doing just that. I start out making a canvas element, and getting a drawing context just like any other canvas example. Once I have a drawing context to work with I can call the create linear gradient method of the drawing context. When I do so I will want to pass a starting point and end point of the gradient.

After calling the create linear gradient method I will end up getting a gradient object as a product that is returned bu calling the method. I can then call the add color stop method of that gradient object to set the colors for the gradient. Once that is done I can then use the gradient as a style for setting the fill and stroke colors.

```js
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// Create a linear gradient
var sp = { // start point
    x: 50,
    y: 50
},
ep = { // end point
    x: canvas.width - 50,
    y: canvas.height - 50
},
gradient = ctx.createLinearGradient(sp.x, sp.y, ep.x, ep.y);
 
// Add color stops
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'orange');
gradient.addColorStop(0.4, 'yellow');
gradient.addColorStop(0.6, 'blue');
gradient.addColorStop(0.8, 'cyan');
gradient.addColorStop(1, 'lime');
 
// use the gradient as a style
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

## 2 - radian canvas gradient

On top of a simple linear gradient another option is to have a radial gradient. This gradient constructor takes six arguments which are two sets for x y and radian values for two circles that are used to make the gradient. Aside from that it can be used in more or less the same way as a linear gradient when it comes to adding color stops, and using it as a style.

```js
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var x1 = 120,
y1 = 120,
r1 = 25,
x2 = 80,
y2 = 80,
r2 = 100;
gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
 
// Add color stops
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1, 'blue');
 
// use the gradient as a style
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```