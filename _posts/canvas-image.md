---
title: Canvas image basics with ctx.drawImage
date: 2019-03-08 19:32:00
tags: [js, canvas]
layout: post
categories: canvas
id: 398
updated: 2019-11-08 11:48:58
version: 1.10
---

When it comes to canvas and images most of the time that means knowing a thing or two about how to use the [drawImage 2d context method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) that can be used to render all or part of an image that has been loaded. However that is just it the image needs to be loaded first, this alone can complicate matters when it comes to making a vanilla javaScript canvas project. There are other ways of creating and working with images in canvas as well though, some of which do not need an external resource loaded first, so lets take a looks at some canvas image basics.

<!-- more -->

## 1 - Canvas image

There is the drawImage method that is used to draw an image onto a canvas. This can be an external image, or another canvas element as well. There is also ways to create an image from a canvas, and create images with just context drawing methods using no external assets at all. 


## 2 - canvas drawImage method basic example

Here I have a basic example of the drawImage method. To use the draw image method with an external image that external image must be loaded first.

```html
<html>
    <head>
        <title>canvas image</title>
    </head>
    <body>
        <canvas id="the-canvas" width="128" height="128"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// create an instance of image
var img = new Image();
// what to do when the image is loaded
img.addEventListener('load', function(){
    // draw an image
    ctx.drawImage(img,32,32);
});
// when src is set the download will begin
img.src='./pic.png';
        </script>
    </body>
</html>
```

In this example I am giving the drawImage method just three arguments in this case the whole image will be drawn at the given location set by the following two arguments after the image is given. However the drawImage method can be given up to nine arguments in total. SO lets look at some more examples of drawImage.

## 3 - Canvas images and scaling

The drawImage method can be given five arguments in total, just like the simple three argument example the first is a reference to the image that is to be drawn to the canvas. In addition just like before the second two arguments set the location that the image is to be drawn at in the canvas as well. However now an additional two arguments can be used to scale the image when it is drawn to the canvas as well.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// create an instance of image
var img = new Image();
// what to do when the image is loaded
img.addEventListener('load', function(){
    // destination x and y
    var dx = 0,dy = 0,
    // destination width and height
    dw = 64,dh = 64;
    // draw an image
    ctx.drawImage(img,dx,dy,dw,dh);
});
// when src is set the download will begin
img.src='./pic.png';
```

Doing this eats up a little overhead, it is best to keep your assets native, but on the fly scaling can be preformed.

## 4 - Canvas images and sprite sheets

So there is then the most complicated use case example of the drawImage method that can be used to set the source location and size in the image to be drawn, as well as the destination values when it comes to the location and scale in the canvas as well. 

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// create an instance of image
var img = new Image();
// what to do when the image is loaded
img.addEventListener('load', function(){
 
    // image source x and y
    var sx = 32, sy =0,
 
    // image source width and height
    sw = 32, sh = 32,
 
    // destination x and y
    dx = 0,dy = 0,
    // destination width and height
    dw = 64,dh = 64;
 
    // draw the image
    ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
});
// when src is set the download will begin
img.src='./pic-sheet.png';
```

In this example the four arguments given after the image are not the values that have to do with the location and size when drawing to the canvas, but the same values when pulling image data from the source image. So this is useful when working with a spitesheet where there is a collection of frames in a static image format.