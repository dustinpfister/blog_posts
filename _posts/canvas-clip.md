---
title: The canvas clip method masks and layering
date: 2019-10-08 19:44:00
tags: [canvas]
layout: post
id: 542
categories: canvas
updated: 2020-05-19 11:45:50
version: 1.16
---

The [canvas clip method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip) can be used to set a clipping area for a canvas element. This clipping area is a way to set an area in the canvas where everything that is draw from that point forward will only render to areas inside the define clipping area. As a result this will result in a mask or template like effect, and can be used with other canvas context methods, and laying to achieve all kinds of effects with canvas elements and javaScript code.

So the canvas clip method can be used as a replacement of, or in addition to other options such as canvas layering to achieve various effects where clipping might be called for. There are other methods that can be used in conjunction with the canvas clip method to do things that can be done with laying but with just one canvas via the use of the canvas clip method. However if all else fails there is always just having a collection of canvas elements, something that should be done in most cases anyway when it comes to working on a serious long term canvas project. Still this is a post on the canvas clip method not laying, so I will be sticking to that here for the most part.

The canvas clip method is used in a similar way to that of the fill and stroke methods when it comes to working with paths. That is a path can be used as a way to define the clip area, and then the canvas clip method is what can be used to set that clip area in the same way that a path would be filled and stroked. This method can also be used with the [canvas save and restore methods](/2019/08/14/canvas-save/), and layering of canvas elements as an over all way of creating all kinds of interesting effects with canvas elements. So with that said lets take a look at some examples of clipping and canvas.

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

## 3 - Canvas clip, fill rect, and clear rect

Keeping in mind what it is that the canvas clip method does it is possible to use it in conjunction with the create rect method on top of the fill rect method. That is I can use the fill rect method to fill the canvas with a solid color, then define a path and clip it. After filling the canvas and setting a clip area, I can the use the clear rect method to set the clipped area back to transparent. The result is then a filled canvas with a transparent area inside the clip area.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// fill rect
ctx.fillStyle = 'black;'
ctx.fillRect(0,0, canvas.width, canvas.height);
 
// set a clip area
ctx.beginPath();
ctx.moveTo(canvas.width / 2, canvas.height / 2);
ctx.lineTo(50,50);
ctx.lineTo(canvas.width - 50, 50);
ctx.clip();
 
// clear rect
ctx.clearRect(0,0, canvas.width,canvas.height);
```

I could then draw a linear gradient over the transparent area for a flashlight like effect. However there is still the questing of drawing other objects in the scene. One way would be to have another canvas element below this element that has other display objects that can be seen in the clip area.

## 4 - Conclsuion

So the canvas clip method is great for defining clip areas, and it can help to achieve all kinds of neat effects with canvas when it comes to setting special areas in the can to draw to. However it is of course  just part of the tool box, the canvas clip method is not really a replacement for canvas laying, and creating sprite sheets.