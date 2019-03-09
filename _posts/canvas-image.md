---
title: Canvas image basics with ctx.drawImage
date: 2019-03-08 19:32:00
tags: [js, canvas]
layout: post
categories: canvas
id: 398
updated: 2019-03-08 19:33:33
version: 1.1
---

When it comes to canvas and images most of the time that means knowing a thing or two about how to use the drawImage 2d context method. There are other ways of creating and working with images in canvas as well though, so lets take a looks at some canvas image basics.

<!-- more -->

## 1 - Canvas image


## 2 - canvas drawImage method basic example

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