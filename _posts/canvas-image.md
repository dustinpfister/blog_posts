---
title: Canvas image basics with ctx.drawImage
date: 2019-03-08 19:32:00
tags: [js, canvas]
layout: post
categories: canvas
id: 398
updated: 2019-11-17 10:30:52
version: 1.20
---

When it comes to canvas and images most of the time that means knowing a thing or two about how to use the [drawImage 2d context method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) that can be used to render all or part of an image that has been loaded before hand. However that is just it, the image needs to be loaded first, this alone can complicate matters when it comes to making a vanilla javaScript canvas project. As I now need to think about how to go about loading images, before continuing into another state of the project where it is safe to go ahead and use those external assets that must be loaded first.

So I find working with external assets a little bit of a hassle, unless I use a framework to make quick work of loading image assets I end up spending a lot of time working on making a loader, and other aspects of a canvas framework of sorts rather than working on what makes my project truly original. So with that said there are other ways of creating and working with images in canvas as well, some of which do not need an external resource loaded first.

Still sometimes I just want or need to work with extremal sprite sheets, and other image assets, so in this post I will be going over the use of the draw image method and other canvas image related topics.

<!-- more -->

## 1 - Canvas image must know basics

This is a post on the HTML canvas element, and using images with a such canvas elements. This is not a getting started post with canvas, let alone javaScript in general. If you are new to javaScript and canvas you might want to start out elsewhere.

In canvas there is the drawImage method that is used to draw an image onto a canvas. With the drawImage method an external image, a Data URL, or another canvas element can be used as a source as passed as the first argument to this method. Additional arguments can then be used to define a source position and size, as well as a destination position and size when it comes to drawing to the canvas with this source image.

There is also ways to create an image from a canvas, that is create images with just context drawing methods using no external assets at all which I often seem to prefer for starters at least in most projects. As I mentioned another canvas element can be used as a source for the draw image method, so canvas elements can be used as a way to create sprite sheets with javaScript and then that other canvas can then be used as a resource in place of an external image.


## 2 - Canvas drawImage method basic example

Here I have a basic example of the drawImage method. To use the draw image method with an external image that external image must be loaded first. To do so I start out by creating a new Image Object instance with the [Image constructor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image). Once I have that I can attach an on load event that should fire when the image is done loading, at which point it is safe to draw the image to the canvas. I then set an src attribute to the location of the image, the very instant that I do that the image will start to load.

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

In this example I am giving the drawImage method just three arguments in this case the whole image will be drawn at the given location set by the following two arguments after the image is given. However the drawImage method can be given up to nine arguments in total. So lets look at some more advanced examples of drawImage.

## 3 - Canvas images and scaling with the drawImage method

The drawImage method can be given five arguments in total out of a maximum of nine. Just like the simple three argument example in the first argument is a reference to the image, or other supported resource such as a canvas . In addition just like before the second two arguments set the location that the image is to be drawn at in the canvas as well. However now an additional two arguments can be used to scale the image when it is drawn to the canvas.

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

Doing this eats up a little overhead, it is best to keep your assets native, but on the fly scaling can be preformed this way. Finally there is using all the arguments of the draw image method to not just set variables for the process of drawing the image, but getting an area from the source image also.

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

In this example the four arguments given after the image are not the values that have to do with the location and size when drawing to the canvas, but the same values when pulling image data from the source image. So this is useful when working with a spite sheet where there is a collection of frames in a static image format.

## 5 - Using another canvas and an image source for drawImage

Another canvas element can be used in place of an image element for the first argument of the drawImage method. To do this I just need to create an extra canvas element by one way or another, and the extra canvas element does not need to be appended to the html at all.

Say I want to work out a sprite sheet with canvas and javaScript that might take a lot of overhead to create. I could draw to the sheet canvas once, and then reference it in my other main canvas when it comes to drawing from it. This can be used with other techniques like layering to help make canvas projects run smoother.

```html
<html>
    <head>
        <title>canvas image</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script>
// sheet
var sheet = document.createElement('canvas'),
ctxSheet = sheet.getContext('2d');
sheet.width = 32 * 16;
sheet.height = 32;
var drawPlayerSheet = function (ctx, canvas, cells) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i = 0,
    r,
    x,
    y;
    cells = cells || 30;
    ctx.save();
    ctx.lineWidth = 3;
    while (i < cells) {
        r = Math.PI * 2 * (i / cells),
        x = Math.cos(r) * 16 + 16,
        y = Math.sin(r) * 16 + 16;
        ctx.beginPath();
        ctx.arc(16, 16, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(16, 16);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.translate(32, 0);
        i += 1;
    }
    ctx.restore();
};
drawPlayerSheet(ctxSheet, sheet, 16);
 
// using the sheet with
// the main canvas
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
var cellIndex = 0,
x = 160,
y = 120;
var loop = function () {
    requestAnimationFrame(loop);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-16, -16);
    // using the other 'sheet' canvas as an image source
    ctx.drawImage(sheet, 32 * cellIndex, 0, 32, 32, x, y, 32, 32);
    ctx.restore();
    cellIndex += 1;
    cellIndex %= 16;

};
loop();
        </script>
    </body>
</html>
```