---
title: Canvas get image data method and related topics
date: 2019-06-23 11:55:00
tags: [js, canvas]
layout: post
categories: canvas
id: 486
updated: 2019-06-23 16:27:31
version: 1.1
---

So when it comes to working with canvas there is the [get image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) method that can be used to get image data from a canvas. In addition there is also the [put image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData) method as well that can be used to put that data into a canvas, and there is also the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData) constructor that can be used to create an instance of image data from scratch.

<!-- more -->

## 1 - Get image data basic example

```html
<html>
    <head>
        <title>canvas get image data</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 32, 32);
ctx.strokeStyle = 'green';
ctx.globalAlpha = 1;
ctx.lineWidth = 1;
ctx.strokeRect(1, 1, 3, 3);
var imgData = ctx.getImageData(1, 1, 3, 3);
var i = 0;
while (i < imgData.data.length) {
    console.log(imgData.data.slice(i, i + 4));
    i += 4;
}
```

## 2 - put image data example

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 32, 32);
ctx.strokeStyle = 'green';
ctx.globalAlpha = 1;
ctx.lineWidth = 1;
ctx.strokeRect(3, 3, 5, 5);
var imgData = ctx.getImageData(3, 3, 5, 5);
imgData.data.forEach(function (v, i,data) {
    data[i] = v === 0 ? 0 : 255;
});
ctx.putImageData(imgData,3,3);
```

## 3 - ImageData constructor example

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 32, 32);
// single yellow pixel
var data = new Uint8ClampedArray([ 255,255,0,255]);
var img = new ImageData( data,1,1)
ctx.putImageData( img, 1,1);
```