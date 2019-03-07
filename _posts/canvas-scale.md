---
title: Canvas scale
date: 2019-03-06 20:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 397
updated: 2019-03-07 18:52:29
version: 1.1
---

There is the canvas scale in the sense of how much the canvas element is scaled relative to its actual native size. There is also the scale context method as well. In this post I will be writing about all things canvas scale related.

<!-- more -->

## 1 - Canvas scale

## 2 - Scale a canvas with CSS

```html
<html>
    <head>
        <title>canvas scale</title>
        <!-- the values in css will set the scaled size of the canvas-->
        <style>
#the-canvas{
width: 640px;
height:480px;
}
        </style>
    </head>
    <body>
        <!-- The values here will set the native size of the canvas-->
        <canvas id="the-canvas" width="32" height="24"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'green';
ctx.lineWidth = 5;
ctx.strokeRect(11, 7, 10, 10);
        </script>
    </body>
</html>
```

## 3 - Scale a canvas with the style api

```html
<html>
    <head>
        <title>canvas scale</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// sets the actual native size of the canvas
canvas.width = 320;
canvas.height = 240;
 
// Scales the canvas
canvas.style.width = '640px';
canvas.style.height = '480px';
 
var rect = [60,20,200,200];
ctx.strokeStyle = 'green';
ctx.lineWidth = 7;
ctx.strokeRect.apply(ctx, rect);
 
ctx.strokeStyle='black';
ctx.lineWidth = 1;
ctx.strokeRect.apply(ctx, rect);
 
        </script>
    </body>
</html>
```