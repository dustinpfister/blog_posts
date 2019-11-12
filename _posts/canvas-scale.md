---
title: Canvas scale as in DOM element scale and the scale 2d context method
date: 2019-03-06 20:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 397
updated: 2019-11-12 18:38:45
version: 1.19
---

There is the [canvas scale](https://devlog.disco.zone/2016/07/22/canvas-scaling/) in the sense of how much the canvas element is scaled relative to its actual native size. There is also the [scale context method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale) as well when it comes to scaling objects within the canvas. 

So in canvas a scale could mean a few things as there is the actual canvas matrix size, then the size that the canvas is scale up or down to just like that of an image. There is also scaling an object up and down within the canvas matrix also, so the subject can get a little confusing to say the least. Still in this post I will be writing about all things canvas scale related and hopefully it will help with some of the confusion.

<!-- more -->

## 1 - Canvas scale

Canvas scale can refer to a number of things. In this post I will be trying to address just about everything that has to do with scaling and the html 5 canvas element that can be used to draw graphics with javaScript code. In this post I assume that you have at least some background with canvas and javaScript, but are scratching you head when it comes to scaling with canvas.

## 2 - Scale a canvas with in line or external CSS

Lets start with the basics here whe it comes to scaling and canvas. When it comes to creating a canvas to begin with there is the actual native pixel size of the canvas, and then there is a scaled size that can be set via CSS values.
The native width can be set by hard coded attributes or with a reference to the canvas element with javaScript. The css scale of that native image can be set with the css width and height style rules. The css can be in-line css with the style attribute, in a style tag, or linked to in an external css file.

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

So then in this example I am creating a canvas with a native size of only 32 by 24, and then scaling it up to a size of 640 by 480 with css. The important thing to remember here is that that is the matrix size of the canvas and then the scaled up or down pixel size of the canvas. Use the canvas element with and height properties to set the size of the matrix, and then css can be used to scale that canvas just like that of an Image.

## 3 - Set canvas scale with canvas.style.width and canvas.style.height

It is possible to set the native size as well as the scaled size of the canvas with javaScript rather than with hard coded html and css. This can be done by getting a reference to the canvas element by one way or another and then using the width and height properties of that canvas element reference to set the native size. In addition the style api can be used to set the same CSS values with javaScript.

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

So with a reference to a canvas element the width and height attributes will set the actual native size, but if you want to scale the canvas element then that should be done via the style api of the canvas element reference. 

However there are a lot more things to cover when it comes to scaling things in a canvas with javaScript. What I have covered hear is just what can also be done on the section where I was just writing about what can be done with just CSS and HTML by itself. There is getting into logical pixels, physical pixels, normalizing points and then scaling theme up from there smallest possible form. So lets look at some more examples of the topic of canvas scale.

## 4 - The canvas scale 2d context method

There is also the scale method that can be used with via the 2d drawing context. This method is used to transform the until scale of the pixels of a canvas. So what is drawn to the canvas after the method is called will be smaller or bigger depending on the scale set with the canvas scale method, even if the values given to the method that is drawing is the same.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// sets the actual native size of the canvas
canvas.width = 40;
canvas.height = 40;
 
// Scales the canvas via in-line css
canvas.style.width = '100px';
canvas.style.height = '100px';
 
ctx.fillStyle='grey';
ctx.fillRect(0,0,canvas.width,canvas.height)
 
// red rect is 1/4 the size of the canvas
ctx.strokeStyle = 'red';
ctx.strokeRect(0, 0, 20, 20);
 
// adds a scaling transformation
ctx.scale(.5,.5);
ctx.fillStyle = 'black';
// black rect is 1/16 the size of the canvas
ctx.fillRect(0, 0, 20, 20);
console.log(canvas)
```

In this example the first rectangle drawn is one fourth the size of the canvas as expected, but the next black rectangle is one sixteenth the size of the canvas because of the unit scale that was set. This method can be used in conjunction with the canvas save and restore methods to change the unit scale, and then restore it back.

### 4.1 - Using ctx.scale to flip things

An interesting thing happens when passing negative values for the unit scale for the canvas scale method, doing so can be used to flip things.

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

## 5 - Canvas scale with another canvas and the drawImage 2d context method

Another thing to be aware of when it comes to scaling things with canvas is that you can use the drawImage 2d context method to draw one canvas to another canvas. The drawImage method can accept up to nine arguments that can be used to set the position and size of a source image in the canvas as well as additional arguments to set the destination position and the scaled size.

```js
var scaledDraw = function(opt){
   var fromCanvas = document.createElement('canvas'),
   ctx = fromCanvas.getContext('2d');
   fromCanvas.width = opt.w;
   fromCanvas.height = opt.h;
   opt.draw(ctx);
   opt.toCanvas.getContext('2d').drawImage(fromCanvas,opt.sx,opt.sy,opt.sw,opt.sh,opt.dx,opt.dy,opt.dw,opt.dh);
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
 
scaledDraw({
  toCanvas: canvas,
  draw: function(ctx){
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,40,40);
    ctx.fillStyle = 'green';
    ctx.fillRect(40,0,40,40);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,40,40,40);
  },
  w: 80, h: 80,
  sx:20,sy:20,sw:40,sh:40,
  dx:20,dy:20,dw:280,dh:200
});
```

In this example I made a quick scaledDraw method that creates a new canvas and then draws to it with a given draw method. It then draws to a canvas that I give it via a toCanvas property.

## 6 - Scaling and translating normalized arrays of points


### 6.1 - The Points lib

```js
var p = {};
 
// scale points
p.scale = function (points, scale, dx, dy) {
    if (!points) {
        return [];
    }
    scale = scale == undefined ? 1 : scale;
    dx = dx == undefined ? 0 : dx;
    dy = dy == undefined ? 0 : dy;
    var i = 0,
    len = points.length,
    scaledPoints = [];
    while (i < len) {
        scaledPoints.push(
            points[i] * scale + dx,
            points[i + 1] * scale + dy);
        i += 2;
    }
    return scaledPoints;
};
 
// get ranges
p.getRanges = function (points) {
    var min = [Infinity, Infinity],
    max = [-Infinity, -Infinity],
    i = 0,
    len = points.length;
    while (i < len) {
        var x = points[i],
        y = points[i + 1];
        min[0] = x < min[0] ? x : min[0];
        min[1] = y < min[1] ? y : min[1];
        max[0] = x > max[0] ? x : max[0];
        max[1] = y > max[1] ? y : max[1];
        i += 2;
    }
    return {
        min: min,
        max: max
    };
};
 
// normalize points
p.normalize = function (points, center) {
    if (!points) {
        return [];
    }
    center = center === undefined ? true : center;
    var ranges = p.getRanges(points),
    dx = ranges.min[0] > 0 ? -ranges.min[0] : Math.abs(ranges.min[0]),
    dy = ranges.min[1] > 0 ? -ranges.min[1] : Math.abs(ranges.min[1]),
    w = Math.abs(ranges.max[0] - ranges.min[0]),
    h = Math.abs(ranges.max[1] - ranges.min[1]),
    normals = [],
    i = 0,
    len = points.length,
    ajustAxis = center ? -0.5 : 0;
 
    while (i < len) {
        normals.push(
            (points[i] + dx) / w + ajustAxis,
            (points[i + 1] + dy) / h + ajustAxis);
        i += 2
    }
    return normals;
};
 
// draw to a canvas context
p.draw = function (points, ctx, strokeStyle, fillStyle, lineWidth, close) {
    ctx.save();
    ctx.strokeStyle = strokeStyle || 'black';
    ctx.fillStyle = fillStyle || 'white';
    ctx.lineWidth = lineWidth || 3;
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1])
        i += 2;
    }
    if (close === undefined ? true : close) {
        ctx.closePath();
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};
```

### 6.2 - The points lib in action

```html
<html>
    <head>
        <title>canvas scale normalize points</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="lib_points.js"></script>
        <script>
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// source, normalized, and scaled points
var points_source = [0, 0, 32, 0, 32, 32, 0, 32],
points_normalized = p.normalize(points_source, true),
points_scaled = p.scale(points_normalized, 128, canvas.width / 2, canvas.height/ 2);
 
// clear and draw
ctx.fillStyle = 'red';
ctx.fillRect(0,0,canvas.width,canvas.height);
p.draw(points_scaled, ctx)
 
console.log( points_source.join(',') );
// 0,0,32,0,32,32,0,32
console.log( points_normalized.join(',') );
// -0.5,-0.5,0.5,-0.5,0.5,0.5,-0.5,0.5
console.log( points_scaled.join(',') );
// 96,56,224,56,224,184,96,184
 
        </script>
    </body>
</html>
```