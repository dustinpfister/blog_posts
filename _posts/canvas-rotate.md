---
title: The canvas rotate method tips tricks and related topics
date: 2019-11-05 12:58:00
tags: [canvas]
layout: post
categories: canvas
id: 556
updated: 2020-02-07 09:50:53
version: 1.19
---

The [canvas rotate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate) method can be useful for doing quick on the fly rotations, but doing so will cost some overhead compared to having sprite sheets where the rotations have been worked out before hand. 

Still if I just want to quickly rotate something in canvas there is the rotate method in the 2d drawing context, so lets look at some examples of this as well as related topics such as the canvas translate method, save and restore, and many others.

<!-- more -->

## 1 - A Basic canvas rotate example

So lets start off with a basic example of the canvas rotate method just to get the basics of this worked out.  Here I have the external basic.js file, in which I start out by getting a reference to the canvas element I have in my html file, and the 2d drawing context of that element just as with any other canvas project. 

I then worked out a simple draw method that just strokes a box to the canvas, so that I have something to draw when I rotate the canvas. When I call draw box method I pass a reference to the context, and an additional object that passes the dimensions of the box I want to draw. By default It will place the box centered around the top left corner of the canvas, and this is intentional when it comes to using the canvas translate method along with the canvas rotate method as that is where I want to draw actually.

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

I then paint a black background for the whole canvas followed by using the drawBox method by itself so I have something to compare to. After that I use the save method to store the current state of the drawing context, so that I can make changes to the translation and rotating of the canvas and then restore back to normal. After I save the state of the context I then translate the canvas to the point that I want the center of the box to be, and then use the canvas rotate method to rotate the canvas by passing a radian value that I want to rotate by. Once That is done I can then restore the context, and that is it I have preformed a rotation with the canvas rotate method.
So now that I jave the javaScript for this basic canvas rotate example together lets take a quick look at the html. Here I am using a hard coded canvas tag in my HTML file, and am using a single script tag to link to an external javaScript file where I will have javaScript code of this basic canvas rotate example outlined above.

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

So that is the basic typical idea at least when it comes to using the rotate method. I have something I want to draw, I save the context, and then translate to the point I want to draw at, where I then rotate the canvas. I then have to account for the size of what it is that I want to draw, subtracting half the width and height from the position that I then draw at. Once done I then restore the context back to normal so that I can then draw other things with the previous canvas context state.

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

This example results in a box that is rotating around the center point that I translated to, but the point that is at the center of the box ventures away from that point of translation. It can be fun to play around with these things a little, but for the most part I just need to keep things centered at the translate point.

## 3 - Making a before hand rendered sprite sheet with the canvas rotate method

using the canvas rotate method can eat up a lot of background resources in order to preform the rotation. If it is just one or two sprites in a project it is not a big deal, but if there are a lot of them the loss in frame rate can add up. One way to address this word be to use a pre rendered sprite sheet. This can be loaded as an external image file that was created separately, or it can be another canvas element, where all the possible rotations have been preformed once.

### 3.1 - The draw methods

Here I have the draw methods worked out. I have a draw box method that will just draw a given box object that will be used in my make sprite sheet method later. Also once I have my sprite sheet I have a draw method that can be passed that sprite sheet object and render a given cell index from that sheet.

```js
// Draw methods
var drawBackground = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
var drawBox = function (ctx, bx) {
    ctx.lineWidth = bx.lineWidth || 3;
    ctx.strokeStyle = bx.strokeColor || 'white';
    ctx.fillStyle = bx.fillColor || 'green';
    ctx.beginPath();
    ctx.rect(bx.x - bx.w / 4, bx.y - bx.h / 4, bx.w / 2, bx.h / 2);
    ctx.moveTo(bx.x, bx.y);
    ctx.lineTo(bx.x + bx.w / 2.25, bx.y);
    ctx.fill();
    ctx.stroke();
};
 
var drawSheetCell = function (ctx, sheet, cellIndex, dx, dy) {
    var cs = sheet.cellSize,
    sx = sheet.cellSize * cellIndex,
    sy = 0;
    ctx.drawImage(sheet.canvas, sx, sy, cs, cs, dx, dy, cs, cs);
};
```

### 3.2 - The make box sheet method

```js
// make a sprite sheet
var makeBoxSheet = function (cellSize, cellCount) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    cellSize = cellSize || 32;
    cellCount = cellCount || 16;
    canvas.width = cellSize * cellCount;
    canvas.height = cellSize;
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var i = 0,
    len = cellCount;
    while (i < len) {
        ctx.save();
        ctx.translate(cellSize / 2 + cellSize * i, cellSize / 2);
        ctx.rotate(Math.PI * 2 * (i / len));
        drawBox(ctx, {
            x: 0,
            y: 0,
            w: cellSize,
            h: cellSize
        });
        ctx.restore();
        i += 1;
    }
    return {
        cellSize: cellSize,
        cellCount: cellCount,
        canvas: canvas,
        ctx: ctx
    };
};
```

### 3.3 - Lets see it in action

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
 
var sheet = makeBoxSheet(32, 64),
cellIndex = 0,
x = canvas.width / 2 - 16,
y = canvas.height / 2 - 16;
 
var loop = function () {
    requestAnimationFrame(loop);
    drawBackground(ctx, canvas);
    drawSheetCell(ctx, sheet, cellIndex, x, y);
    cellIndex += 1;
    cellIndex %= sheet.cellCount;
};
loop();
```

## 4 - Conclusion

The canvas rotate method works okay for on the fly rotations, but it might not always be a good idea to rely on it all the time for all projects. It can cost a fair amount of system resources to preform a rotation, and if you have a lot of display objects all at once on the canvas it can really slow things down on clients that do not have a great deal of CPU overhead to work with.

So a better solution sometimes might be to create a sprite sheet with all the rotations preformed before hand and then use that as a way to change the rotation of display objects. Other solutions that might involve collections of points might be just as expensive if not more expensive depending on the number of points.