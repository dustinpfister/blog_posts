---
title: The canvas clip method
date: 2019-10-08 19:44:00
tags: [canvas]
layout: post
id: 542
categories: canvas
updated: 2019-10-09 12:38:19
version: 1.2
---

The [canvas clip method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip) can be used to set a clipping area for a canvas. This is an area of the canvas that will be drawn to where everything outside of the clip area will not actually be drawn to the canvas. So in other words it is a way to go about making a mask of sorts for a canvas. The canvas clip method is used in a similar way to that of the fill and stroke methods, as it can be used with a path. That is a path can be used as a way to define the clip area and then the canvas clip method is what can be used to set that clip area. This method can also be used with the save and restore methods and layering.

<!-- more -->

## 1 - basic canvas clip method

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
 
ctx.beginPath();
ctx.arc(160, 120, 50, 0, Math.PI * 2);
ctx.clip();
 
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, canvas.width, canvas.height);
 
        </script>
    </body>
</html>
```
