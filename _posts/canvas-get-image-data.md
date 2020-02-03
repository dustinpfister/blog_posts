---
title: Canvas get image data method and related topics
date: 2019-06-23 11:55:00
tags: [js, canvas]
layout: post
categories: canvas
id: 486
updated: 2020-02-03 11:46:55
version: 1.15
---

So when it comes to working with canvas there is the [get image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) method that can be used to get image data from the current state of a canvas elements drawing context. In addition there is also the [put image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData) method also that is the inversion of that method that can be used to put that data into a canvas. In addition there is also the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData) constructor that can be used to create an instance of image data from scratch using just javaScript code and some other data source to create image data. 

These methods give a way to have total pixel by pixel control over the creation and editing of images in canvas which is something that might be desired now and then. Doing so might be expensive in terms of system resources, but if it has to happen these methods are there to help with this sort of thing so lets look at some examples of the get image data method in canvas and some related stuff while we are at it.

<!-- more -->

## 1 - Get image data basic example

So a basic example of using the get image data method might involve just a hard coded HTML canvas element, and a link to an external javaScript file via a string tag. The javaScript content of that external javaScript file will contain some javaScript that will make used of the get image data method. So with that said the starting HTML of such a canvas get image data example might look something like this:

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

Now that we have that out of the way lets look at the basic.js file.

In the basic.js javaScript file I just get a reference to the canvas element, and the 2d drawing context by way of the canvas get context method. Next I just use the 2d drawing context to draw a little something to the canvas so that I have something to get with the get image data method. I can then use the canvas get image data method to get the image data for a section of that canvas that contains what it is that I have drawn to it. I just need to call ctx.getImageData and pass the x and y position of the upper left corner of the desired section, and then the width and height of the section of the canvas matrix that I want as the last two arguments.

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

What is returned is an instance of the ImageData constructor that can be used directly to create image data. An instance of this constructor has three public properties a data property that contains the actual image data, along with a width and height property of the section that was grabbed from the canvas. That is about it though when it comes to getting data at least, there are no public methods for the class actually. However there is of course making some depending on what it is that I want or need to do with that data naturally.

### 1.1 - The imageData.data array

The ImageData instances data property is an instance of a [Unit8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) that is just a single dimensional or linear array. Because of this the image data fro each pixel is in the form of a repeating RGBA order where the first element is a byte value for the red channel of the first pixel, the second element is the green channel, then the blue channel and finally the alpha channel of the first pixel in the upper left corner.

## 2 - Put image data example

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

I might want to just create an instance of ImageData by itself without having to use the get image data method to do so first. In this case I just need to use the ImageData constructor and pass a Unit8ClampedArray as the first argument followed by a width and height value.

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

I can then use the put image data method to place this instance down onto the canvas.