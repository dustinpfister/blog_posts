---
title: Canvas get image data method and related topics
date: 2019-06-23 11:55:00
tags: [js, canvas]
layout: post
categories: canvas
id: 486
updated: 2020-08-02 09:51:03
version: 1.24
---

So when it comes to working with canvas there is the [get image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) method that can be used to get image data from the current and area in the state of a canvas matrix in the from of an [ImageData]([ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData)) class instance that has an unit8Clamped array in a [data property](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data) that is the raw data for each color channel of each pixel in an area of interest. In addition there is also the [put image data](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData) method also that is the inversion of that method that can be used to put that data back into a canvas. 

In addition to the canvas 2d context methods for getting and putting image data there is the ImageData constructor that caan be used to directly create an imageData instance. So then the ImageData Constructor function can be used to create an instance of image data from scratch using just javaScript code, and some other data source to create image data. This image data that is then generated purely from javaScript code can the be used with the put image data context method as an alternative from getting data from a canvas source first.

These getImageData, putImagedata, methods along with the ImageData constructor give a way to have total pixel by pixel control over the creation, and editing of images in canvas which is something that might be desired now and then with certain projects where doing so might be called for. Doing so might be expensive in terms of system resources, but if it has to happen these methods are there to help with this sort of thing. So with that said lets look at some examples of the get image data method in canvas and some related stuff to working with image data in general with canvas and javaScript while we are at it.

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

The ImageData instances data property is an instance of a [Unit8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) that is just a single dimensional or linear array. Because of this the image data from each pixel is in the form of a repeating RGBA order where the first element is a byte value for the red channel of the first pixel, the second element is the green channel, then the blue channel, and finally the alpha channel of the first pixel in the upper left corner.

## 2 - Put image data example

So once I have an instance of ImageData I can then do something with that data, but then I might want to draw that data back to a canvas element once I am done doing so. Placing image data back down onto the canvas is of course where the put image data method comes into play. I just need to call the method off of the instance of the 2d drawing context, and then pass the image data object as the first argument followed by an x and y position where I want to drawing of the data to start.

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

So now that I have covered the basics of how to get image data from a drawing context, and how to place image data back down onto it. There is now the subject of how to go about creating image data by some other means, such as generating it with some javaScript code.

## 3 - ImageData constructor example

I might want to just create an instance of ImageData by itself without having to use the get image data method to do so first. In this case I just need to use the ImageData constructor and pass a Unit8ClampedArray as the first argument followed by a width and height value.

```html
<canvas id="the-canvas"></canvas>
<script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5,0.5);

canvas.width = 8;
canvas.height = 8;
canvas.style.imageRendering = 'pixelated';
canvas.style.width = '160px';
canvas.style.height = '160px';

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 8, 8);
// single yellow pixel
var data = new Uint8ClampedArray([ 255,255,0,255]);
var img = new ImageData( data,1,1)
ctx.putImageData( img, 1,1);
</script>
```

I can then use the put image data method to place this instance down onto the canvas. So then this constructor along with the put image data method can be used to create a canvas powered [pset qBasic](https://chortle.ccsu.edu/QBasic/chapter05/bc05_3.html) style type method for example. I can also use it as a way to create a sprite sheet by way of some external JSON data rather than external image files, and so forth.

## 4 - Conclusion

So the get image data method is a built in way to get image data from a canvas element. In addition the image data object standard is a nice way to go about creating image data from scratch also. In any case the put image data method can also be used to draw image data back down onto a canvas element.

There are many applications that come to mind when it comes to using these methods such as filters, creating images from data, and clever ways to go about hiding data within images when it comes to [Steganography](https://en.wikipedia.org/wiki/Steganography) just to name a few ideas when it comes to where to go from here with this.