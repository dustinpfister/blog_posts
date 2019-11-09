---
title: Canvas get image data method and related topics
date: 2019-06-23 11:55:00
tags: [js, canvas]
layout: post
categories: canvas
id: 486
updated: 2019-11-09 11:21:50
version: 1.7
---

So when it comes to working with canvas there is the [get image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) method that can be used to get image data from a canvas. In addition there is also the [put image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData) method as well that can be used to put that data into a canvas, and there is also the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData) constructor that can be used to create an instance of image data from scratch. These methods give a way to have total pixel by pixel control over the creation and editing of images in canvas which is something that might be desired now and then. Doing so might be expensive in terms of system resources, but if it has to happen these methods are there to help with this sort of thing so lets look at some examples.

<!-- more -->

## 1 - Get image data basic example

So a basic example of using the get image data method might involve just a hard coded HTML canvas element and a link to an external javaScript file via a string tag that will contain some javaScript that will make used of the get image data method. SO with that said the starting HTML of such a canvas get image data example might look something like this:

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

In the basic.js javaScript file I just get the canvas and the 2d drawing context and use the 2d drawing context to draw a little something to the canvas. I can then use the get image data method to get a image data for a section of that canvas. I just need to call ctx.getImageData and pass the x and y position and width and height that I want.

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

What is returned is an instance of the ImageData constructor.

## 2 - put image data example

So once I have an instance of ImageData I can then do something with that data, but then I might want to draw that data back to a canvas element. So this is where the put image data method comes into play.

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

I might want to just create an instance of ImageData by itself without having to use the get image data method to do so.

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