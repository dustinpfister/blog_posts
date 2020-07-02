---
title: Canvas scale as in DOM element scale and the scale 2d context method
date: 2019-03-06 20:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 397
updated: 2020-07-02 10:39:43
version: 1.32
---

There is the [canvas scale](https://devlog.disco.zone/2016/07/22/canvas-scaling/) in the sense of how much the canvas element is scaled relative to its actual native size. There is also the [scale context method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale) as well when it comes to scaling objects within the canvas. 

So in canvas a scale could mean a few things as there is the actual canvas matrix size, then the size that the canvas is scale up or down to just like that of an image. There is also scaling an object up and down within the canvas matrix also, so the subject can get a little confusing to say the least. Still in this post I will be writing about all things canvas scale related and hopefully it will help with some of the confusion.

<!-- more -->

## 1 - Canvas scale

Canvas scale can refer to a number of things. In this post I will be trying to address just about everything that has to do with scaling and the html 5 canvas element that can be used to draw graphics with javaScript code. In this post I assume that you have at least some background with canvas and javaScript, but are scratching you head when it comes to scaling with canvas.

## 2 - Scale a canvas with in line or external CSS

Lets start with the basics here when it comes to scaling and canvas. When it comes to creating a canvas to begin with there is the actual native pixel size of the canvas, and then there is a scaled size that can be set via CSS values.
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

In this section I will be going over a simple points library that I put together that is a bunch of methods for working with an array of points. 

Of course there is a scale method that accepts an array of points, and then a value that will be used to scale up those points as well as translate the points to a point of interest in the canvas matrix. However there is also a point normalization methods also that will create and array of points where each point value is a value between -0.5 and 0.5 which can be thought of as the smallest possible scale of an array of points.

So if I have an array of points I can normalize them fist, and then scale up that normalized array of points to the desired scale.

### 6.1 - The Points lib

So for starters lets go over the points library. the nature of the library is just a bunch of pure function style methods that accept and array of points and do things with that array of points that does not involve mutating the original array of points that was given in place.

It starts off with a scale function that takes an array of points and then just scales them all up by a scale value that is given as a second argument and then also translates with delta values also. However what if I have an array of points that is not normalized first? In other words not in the form of an array of values between 1 and 0, or -0.5 and 0.5. That makes scaling a little difficult, so it would be nice to have a method that does that first.

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
```

So in order to normalize I first need to get the max and min range values of each axis of the array of points so that I can then use that data to normalize an array of points. To do this I made two methods one of which will split an array of points into to arrays where each array is all the x values and then the other is all the y values. One I have that I can just use the Math.min and Math.max methods with the Function.apply prototype method to get my object of ranges for the points.


```
// split an single dimension array of pints
// into an array of arrays of axis values
p.toAxisArrays = function (points) {
    var axisArrays = [[], []],
    i = 0,
    len = points.length;
    while (i < len) {
        axisArrays[0].push(points[i]);
        axisArrays[1].push(points[i + 1]);
        i += 2;
    }
    return axisArrays;
};
// get ranges
p.getRanges = function (points) {
    var axis = p.toAxisArrays(points);
    return {
        min: [
            Math.min.apply(null, axis[0]),
            Math.min.apply(null, axis[1])
        ],
        max: [
            Math.max.apply(null, axis[0]),
            Math.max.apply(null, axis[1])
        ]
    }
};
```


Once I have my get ranges method I can use that method in my normalize method when it comes to getting the ranges. Once I have the ranges I can get the delta values that I need to add or subtract for each source point in the array that will be given. I can also use these ranges to get the width and height of the points relative to that range.

The delta values and width and height can then be applied to each point in the array to create the new array or normalized points. By default I made it so the range of points is from -0.5 to 0.5, but I can also set a boolean for one of the varies to make it the 0 to 1 range also.

```js
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
```

Then also finally have a draw method that accepts an array of points, and also a canvas context reference to draw an array of points to the canvas. I can also set the stroke and fill style and choose to not close the points when it comes to the additional arguments. There are many other ways I could go about writing this method, but for the sake of this post it will work okay.

```js
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

So now that I have my points library together I can link to it from an HTML file and use it in an example that involves scaling normalized points in canvas.

### 6.2 - The points lib in action

Now to test out my points library. TO do so I just link to it with a script tag and, and then work out my example in-line with another script tag. Once again I just get a reference to a canvas tag, and then use my normalize and scale methods to set the desired scale for the points. I then just paint a background, and use the draw method ti draw the array of points to the canvas. Works just as expected.

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

This results in a square at the center of the canvas element that is 128 pixels on each size that was created from an array of points that would have been a 32 by 32 square at the upper left corner of the canvas. As I play around with the source points, and scale arguments the methods seem to work as expected.

So when it comes to canvas and scale there are a lot of topics that branch off from that, there is just scaling the canvas as in the size of it in the browser, and then there is scaling something up or down in the canvas matrix when it comes to working with logical pixels when it comes to what was covered in this section.

There is of course much more that could be added to this points library such as a method that could be used to rotate the array of points around a fixed point, as well as just about everything else that comes to mind when it comes to working out a real library that like this that has a robust set of methods. However that would be getting off topic with the theme of this post on canvas scale.

## 7 - Conclusion

So it would seem that the subject of canvas scale is not so simple as there is a great deal that branches off from the subject. There is increasing the actual logic pixel size, canvas matrix size, or native size if you prefer which is one way of scaling the canvas. Then there is leaving the canvas matrix size the same, and scaling up that matrix by chaining the logic pixel size. The there is of course scaling objects within the canvas when it comes to using all the arguments of the draw image method, and point normalization.

Everything I mentioned there is a mouth full, sure. Also to make matters worse I still thing that I have managed to do this subject justice. Learning these things takes time, but that is the whole reason why I started getting into canvas, javaScript, and programing in general. There is always something more to learn