---
title: The canvas translate method
date: 2019-10-09 19:43:00
tags: [canvas]
layout: post
id: 543
categories: canvas
updated: 2019-10-10 17:09:51
version: 1.3
---

The [canvas translate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) method can be used to add a translation transformation the the current canvas matrix. This is so that when something is drawn to a certain point within the canvas using the canvas drawing methods it is actually drawn relative to the translated point, rather that the usual top left corner of the canvas.

<!-- more -->

## 1 - Canvas translate basic example

```html
<html>
    <head>
        <title>canvas translate</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// drawing rect at 0,0 in the canvas
ctx.fillStyle = 'blue';
ctx.fillRect(0,0,32,32);
 
// translating canvas to 16,16
ctx.translate(16,16);
ctx.fillStyle = 'red';
ctx.globalAlpha = 0.5;
// now drawing a rect at 0,0 is actually at 16,16
ctx.fillRect(0,0,32,32);
```