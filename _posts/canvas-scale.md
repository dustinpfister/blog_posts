---
title: Canvas scale
date: 2019-03-06 20:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 397
updated: 2019-03-08 18:59:41
version: 1.9
---

There is the canvas scale in the sense of how much the canvas element is scaled relative to its actual native size. There is also the [scale context method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale) as well when it comes to scaling object within the canvas. In this post I will be writing about all things canvas scale related.

<!-- more -->

## 1 - Canvas scale

Canvas scale can refer to a number of things. In this post I will be trying to address just about everything that has to do with scaling and the html 5 canvas element that can be used to draw graphics with javaScript code. In this post I assume that you have at least some background with canvas and javaScript, but are scratching you head when it comes to scaling with canvas.

## 2 - Scale a canvas with CSS

Lets start with the basics here. When it comes to creating a canvas to begin with there is the actual native pixel size of the canvas, and then there is a scaled size that can be set via CSS values.

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

So then in this example I am creating a canvas with a native size of only 32 by 24, and then scaling it up to a size of 640 by 480.

## 3 - Scale a canvas with the style api

It is possible to set the native size as well as the scaled size of the canvas with javaScript rather than with hard coded html and css. This can be done by getting a reference to the canvas element by one way or another and then using the width and height properties of that element reference to set the native size. In addition the style api can be used to set the scale canvas size as well.

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

## 4 - The scale 2d context method

There is also the scale method that can be used with via the 2d drawing context. This method is used to transform the until scale of the pixels of a canvas.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// sets the actual native size of the canvas
canvas.width = 64;
canvas.height = 48;
 
// Scales the canvas via in-line css
canvas.style.width = '640px';
canvas.style.height = '480px';
 
// adds a scaling transformation
ctx.scale(.5,.5);
ctx.fillStyle = 'black';
ctx.fillRect(5, 5, 16, 16);
 
ctx.scale(2,2);
ctx.strokeStyle = 'red';
ctx.strokeRect(5, 5, 16, 16);
```

### 4.1 - Using ctx.scale to flip things

Negative values can be used to flip things.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
canvas.width = 640;
canvas.height= 480;
 
ctx.scale(1, -1);
ctx.font = '20px serif';
ctx.textBaseline = 'top';
ctx.fillText('foobar', 0, -20);
```