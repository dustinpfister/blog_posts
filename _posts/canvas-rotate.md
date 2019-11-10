---
title: The canvas rotate method tips tricks and related topics
date: 2019-11-05 12:58:00
tags: [canvas]
layout: post
categories: canvas
id: 556
updated: 2019-11-10 13:31:55
version: 1.11
---

The [canvas rotate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate) method can be useful for doing quick on the fly rotations, but doing so will cost some overhead compared to having sprite sheets where the rotations have been worked out before hand. Still if I just want to quickly rotate something in canvas there is the rotate method in the 2d drawing context, so lets look at some examples of this as well as related topics such as the canvas translate method and save and restore.

<!-- more -->

## 1 - A Basic canvas rotate example

So lets start off with a basic example of the canvas rotate method. Here I am using a hard coded canvas tag in my HTML file, and am using a single script tag to like to an external javaScript file where I will have javaScript code of this basic canvas rotate example.

```html
<html>
    <head>
        <title>canvas rotate</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

Here I have the external basic.js file, in which I start out by getting a reference to the canvas element and the 2d drawing content of that element just as with any other canvas project. 

I then worked out a simple draw method that just strokes a rectangle to the canvas. When I call this method I pass a reference to the context, and an additional object that passes the dimensions of the box I want to draw. By default It will place the box centered around the top left corner of the canvas, and this is intentional when it comes to using the canvas translate method along with the canvas rotate method.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// a basic draw box method
var drawBox = function (ctx, bx) {
    bx = bx || {};
    bx.x = bx.x === undefined ? 0 : bx.x;
    bx.y = bx.y === undefined ? 0 : bx.y;
    bx.w = bx.w === undefined ? 32 : bx.w;
    bx.h = bx.h === undefined ? 32 : bx.h;
    ctx.lineWidth = 3;
    ctx.strokeStyle = bx.color || 'green';
    ctx.strokeRect(bx.x - bx.w / 2, bx.y - bx.h / 2, bx.w, bx.h);
};
// paint a background
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// just drawing a box at the center
drawBox(ctx, {
    x: 160,
    y: 120,
    w: 32,
    h: 32,
    color: 'red'
});
// using the canvas rotate method
// to draw a box at the same location
// but rotated at 45 degrees
ctx.save();
ctx.translate(160, 120);
ctx.rotate(Math.PI / 180 * 45);
drawBox(ctx, {
    w: 32,
    h: 32
});
ctx.restore();
```

I then paint a black background for the whole canvas followed by using the drawBox method by itself. After that I use the save method to store the state of the context, translate the canvas to the point that I want the center of the box to be, and then use the canvas rotate method to rotate the canvas.

## 2 - Rotation point and render point example

In this section I will be going over a canvas rotate example that involves changing the point at which an object rotates. 

Just about all canvas rotate examples involve saving the context, translating to a point in the canvas matrix, and rotating the canvas around that point that the canvas was translated to. At that point the object is then rendered at a point that is a negative value that is half the width and height of the object. However it does not always have to be that way, there are in effect two points of interest here, the point that I am translating to, and another point that is relative to that point.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
canvas.width = 320;
canvas.height = 240;
 
var obj = {
    x: 160,
    y: 120,
    w: 64,
    h: 64,
    rotation: {
        x: 0,
        y: 0,
        r: 0
    },
    fillStyle: 'red'
};
 
var drawPoint = function (ctx, x, y, style, strokeStyle) {
    ctx.lineWidth = 3;
    ctx.fillStyle = style || 'white';
    ctx.strokeStyle = strokeStyle || '#4a4a4a';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
};
 
var drawObj = function (ctx, obj) {
    ctx.fillStyle = obj.fillStyle || 'white';
    ctx.save();
    ctx.translate(obj.x, obj.y);
    ctx.rotate(obj.rotation.r);
    ctx.fillRect(-obj.w / 2 + obj.rotation.x, -obj.h / 2 + obj.rotation.y, obj.w, obj.h);
    drawPoint(ctx, 0, 0, 'green');
    drawPoint(ctx, obj.rotation.x, obj.rotation.y, 'blue');
    ctx.restore();
};
 
var frame = 0, maxFrame = 100;
var loop = function () {
    requestAnimationFrame(loop);
 
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    drawObj(ctx, obj);
 
    var per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    obj.rotation.r = Math.PI * 2 * per;
    obj.rotation.x = -16 * bias
    frame += 1;
    frame %= maxFrame;
 
};

loop();
```

## 3 - Conclusion

The canvas rotate method works okay for on the fly rotations, but it might not always be a good idea to rely on it all the time for all projects. It can cost a fair amount of system resources to preform a rotation, and if you have a lot of display objects all at once on the canvas it can really slow things down on clients that do not a great deal of CPU overhead to work with.

So a better solution sometimes might be to create a sprite sheet with all the rotations preformed before hand and then use that as a way to change the rotation of display objects. Other solutions that might involve collections of points might be just as expensive if not more expensive depending on the number of points.