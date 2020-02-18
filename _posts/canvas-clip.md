---
title: The canvas clip method
date: 2019-10-08 19:44:00
tags: [canvas]
layout: post
id: 542
categories: canvas
updated: 2020-02-17 19:11:52
version: 1.9
---

The [canvas clip method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip) can be used to set a clipping area for a canvas element. This is an area of the canvas that will be drawn to where everything outside of the clip area will not actually be drawn to the canvas. So in other words it is a way to go about making a mask of sorts when drawing the the canvas element. 

The canvas clip method is used in a similar way to that of the fill and stroke methods when it comes to working with paths. That is a path can be used as a way to define the clip area, and then the canvas clip method is what can be used to set that clip area in the same way that a path would be filled and stroked. This method can also be used with the [canvas save and restore methods](/2019/08/14/canvas-save/), and layering of canvas elements as an over all way of creating all kinds of interesting effects with canvas elements.

<!-- more -->

## 1 - A basic canvas clip method example

For starters a basic example of the canvas clip method is in order. For this here is an example that just involves creating a path and then using the canvas clip method to set the clipped area for the canvas context. Once the clipped area is set I then just fill the whole area of the canvas, but only the clipped area is what is changed.

```html
<html>
    <head>
        <title>canvas clip</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// start a path and clip
ctx.beginPath();
ctx.arc(160, 120, 50, 0, Math.PI * 2);
ctx.clip();
// draw in the cliped area
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, canvas.width, canvas.height);
        </script>
    </body>
</html>
```

So this is just a fancy way of drawing a filled circle with the canvas arc method, only the canvas clip and fill rect methods are used. Still this demonstrates the basic idea, a path is used to define a clipping area and then the canvas clip method is used to set that area. Once the area is set then anything that is drawn will only be rendered in the clipped area.

## 2 - Inverting the clip area

You would think it would be easy to just invert the clipping area, but it would seem that inverting a clipping area is not as easy as just setting a boolean value. There are of course ways of getting a desired effect when it comes to layering, in other words working with more than one canvas element. There is also a 2d context property called [Global Composite Operation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) that can be used to set composing operations other than the default source-over mode when it comes to setting what areas of the canvas to draw to.

In any case in this section I will be going over ways to go about having an inverted clipping area in canvas.

### 2.1 - Global Composite Operation and source-over, source-atop, and destination-over

In this example I am using the Global Composite Operation property to set the composite operation from source-over to source-atop, and then destination-over. I do not have much experience working with these, but so far it would seem that these are the three basic composite operations of interest when it comes to having an inverted clipping area in a single canvas without getting into layering many canvas elements.

The source-over composite operation is the default mode for the Global Composite Operation property in this operation new content is always just drawn over existing content and transparent areas. However there are other operations that just draw to areas where there is content (such as source-atop), or only to areas where there is only transparent area (such as destination-over).

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var drawMask = function () {
    // set default composite source-over 
    // clear the clear canvas and draw a mask
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, 50);
    ctx.fillRect(50, 50, 100, canvas.height);
    ctx.fillRect(0, 200, canvas.width, canvas.height);
};
 
var drawToMask = function () {
    var i = 100,x,y,r;
    // set to source-atop to draw to canvas content only
    // ( just the mask ) transparent areas are not effected
    ctx.globalCompositeOperation = 'source-atop';
    while (i--) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        r = 15 + 60 * Math.random();
        ctx.fillStyle = '#' + Math.floor(16000000 * Math.random()).toString(16);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
};
 
var drawToClear = function(){
    // set to destination-over, only the remaining 
    // transparent areas are rendered to
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
drawMask();
drawToMask();
drawToClear();
```

It might be a complicated way to go about having an inverted clipping region, but it seems to work okay.