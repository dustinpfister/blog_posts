---
title: Canvas image basics with ctx.drawImage
date: 2019-03-08 19:32:00
tags: [js, canvas]
layout: post
categories: canvas
id: 398
updated: 2019-03-08 19:38:43
version: 1.3
---

When it comes to canvas and images most of the time that means knowing a thing or two about how to use the drawImage 2d context method. There are other ways of creating and working with images in canvas as well though, so lets take a looks at some canvas image basics.

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