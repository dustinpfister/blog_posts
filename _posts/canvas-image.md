---
title: Canvas image basics with ctx.drawImage
date: 2019-03-08 19:32:00
tags: [js, canvas]
layout: post
categories: canvas
id: 398
updated: 2019-03-13 16:37:24
version: 1.5
---

When it comes to canvas and images most of the time that means knowing a thing or two about how to use the [drawImage 2d context method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage). There are other ways of creating and working with images in canvas as well though, so lets take a looks at some canvas image basics.

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

## 3 - Canvas images and scaling

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

## 4 - Canvas images and sprite sheets

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