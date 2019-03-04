---
title: canvas lines
date: 2019-03-03 17:17:00
tags: [js, canvas]
layout: post
categories: canvas
id: 395
updated: 2019-03-03 20:03:36
version: 1.4
---

When learning how to work with the [javaScript canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) 2d drawing context for the first time the subject of drawing lines is one thing that should be well understood before moving on to more complex canvas related subjects. In this post I will be quickly covering many of the basics about drawing lines with canvas and javaScript, including the [lineTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) and [moveTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo) methods.

<!-- more -->

## 1 - Canvas line

To make a canvas line I first need to gain a reference to a canvas element, and get a reference to the 2d drawing context as well. I can then set the stroke style and begin a line by calling the beginPath method. Once I have called begin path I can then use the moveTo method to move to a certain point, and then the lineTo method to create a line from the moveTo point to the lineTo point. Once done I can call the stroke method to draw the line.

```html
<html>
    <head>
        <title>canvas line</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),ctx;
canvas.width = 30;
canvas.height = 30;
ctx = canvas.getContext('2d');
ctx.strokeStyle = '#ff0000';
ctx.beginPath();
ctx.moveTo(10,10);
ctx.lineTo(20,20);
ctx.stroke();
        </script>
    </body>
</html>
```