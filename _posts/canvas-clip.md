---
title: The canvas clip method
date: 2019-10-08 19:44:00
tags: [canvas]
layout: post
id: 542
categories: canvas
updated: 2019-11-10 09:58:00
version: 1.4
---

The [canvas clip method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip) can be used to set a clipping area for a canvas. This is an area of the canvas that will be drawn to where everything outside of the clip area will not actually be drawn to the canvas. So in other words it is a way to go about making a mask of sorts for a canvas. 

The canvas clip method is used in a similar way to that of the fill and stroke methods when it comes to working with paths. That is a path can be used as a way to define the clip area and then the canvas clip method is what can be used to set that clip area. This method can also be used with the save and restore methods and layering of canvas elements as an over all way of creating all kinds of effects with canvas elements.

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
