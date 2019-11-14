---
title: Canvas lines the basics and much more
date: 2019-03-03 17:17:00
tags: [js, canvas]
layout: post
categories: canvas
id: 395
updated: 2019-11-14 18:26:43
version: 1.22
---

When learning how to work with the [javaScript canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) 2d drawing context for the first time the subject of drawing lines is one thing that should be well understood before moving on to more complex canvas related subjects. In this post I will be quickly covering many of the basics about drawing lines with canvas and javaScript, including the [lineTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) and [moveTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo) methods of course for starters.

<!-- more -->

## 1 - Canvas line basics

This is a post on drawing lines with html 5 canvas for drawing graphics with javaScript. I assume that you have at least some background with html, css and javaScript to begin with. If not this is not the place to get started with any of those subjects. This post is also not necessary a starting point for [getting started with canvas](/2017/05/17/canvas-getting-started/) as well, but I will keep some of the first examples simple copy and past canvas line examples.

Draing lines in canvas involves getting a reference to the 2d

## 2 - Canvas line hello world example

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

## 3 - The moveTo method

The moveTo method can be used to create a new sub path at the given point in the 2d drawing context. It can be though of as a way to pick up a pen and place it down at a given location on a piece of paper, rather than dragging a pen across a piece of paper as in the case of the lineTo method.

```js
var canvas = document.getElementById('the-canvas'),ctx;
canvas.width = 30;
canvas.height = 30;
ctx = canvas.getContext('2d');
 
ctx.strokeStyle = '#ff0000';
ctx.beginPath();
ctx.moveTo(10,10);
ctx.lineTo(10,20);
 
ctx.moveTo(20,10);
ctx.lineTo(20,20);
 
ctx.stroke();
```

## 4 - canvas line width

There is the lineWidth property that can be used to set the width of a line in terms of the pixel thickness. I tend to think in terms of odd numbers when setting the thickness of a line so that there is a one pixel width line surrounded by and even thickness on each side.

```js
var canvas = document.getElementById('the-canvas'),ctx;
canvas.width = 30;
canvas.height = 30;
ctx = canvas.getContext('2d');
 
// line width of 3
ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.lineWidth = 3;
ctx.moveTo(0,0);
ctx.lineTo(29,29);
ctx.stroke();
 
// line width of 1 on top
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
ctx.moveTo(0,0);
ctx.lineTo(29,29);
ctx.stroke();
 
// scale canvas
canvas.style.width = '320px';
canvas.style.height = '320px';
```

## 5 - Stroke and fill canvas lines

The stroke method can be used in conjunction with the fill method to both stroke and fill a shape that was drawn with the moveTo and lineTo methods.

```js
var canvas = document.getElementById('the-canvas'),ctx;
canvas.width = 30;
canvas.height = 30;
ctx = canvas.getContext('2d');
 
ctx.beginPath();
ctx.moveTo(10,20);
ctx.lineTo(20,20);
ctx.lineTo(15,10);
ctx.closePath()
 
ctx.lineWidth = 3;
ctx.fillStyle = 'black';
ctx.strokeStyle='red'
ctx.fill();
ctx.stroke();
```

The order in which the fill and stroke methods is call does matter and can effect the z order in which these actions take place. In other words if you want a stroke to happen on top of a fill then be sure to call the stroke method after the fill method is call like in the above example.

## 6 - Complex Paths with canvas lines

When it comes to drawing any kind of complex path it gets to the point where I would want to work out a ways to create and draw a collection of points. When things start to get intense there are many canvas libraries that help to abstract things away, but in this section I will be covering some basics of this without the use of a library.

### 6.1 - Making a drawPoints function

The first thing I would do is work out a function that will draw a standard collection of points. This standard collection of points could be a collection of objects each with an x, and y property. However in this section I will be working with a simple linear array of number primitives.

```js
// draw a polygon for the given context
var drawPoints = function (ctx, points,close) {
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1]);
        i += 2;
    }
    if(close){ctx.closePath();}
    ctx.stroke();

};
drawPoints(ctx,[15,15,15,5,25,5,25,20,5,30],true);
```

There might be a need for more than one draw points function, or to hack over something like this to add additional features such as to close the line or not, to fill or not and so forth. Still many draw points functions work in a similar fashion, give it a context and an array of points and it will draw it for me.

So now that I have a draw points function the real fun can begin when it comes to writing all kinds of methods that can be used to create an array of points.

### 6.2 - Create Polygon Points for a canvas line

Now that I have a draw points function worked out I can start creating all kinds of functions that create a collection of points that can then be given to the draw points function. A simple one that comes to mind is one that can be used to draw polygons for example.

```js
var createPolygonPoints = function(cx,cy,r,s){
    var i = 0,points=[],a,x,y;
    while(i < s){
        a = Math.PI * 2 * (i/s);
        x = Math.cos(a) * r + cx;
        y = Math.sin(a) * r + cy;
       points.push(x,y);
     i += 1;
   }
    return points;
}
 
drawPoints(ctx,createPolygonPoints(15,15,5,4),true);
```

### 6.3 - An exponential curve example

For another example of a method that can be used as a way to create an array of points used to create a canvas line here is an exponential curve example.

```js
var createExpCurvePoints = function (base, ptCount, width) {
    var points = [],
    i = 0,
    x,
    y;
    while (i < ptCount) {
        x = i * (width / ptCount);
        y = Math.pow(base, i);
        points.push(x, y);
        i += 2;
    }
    return points;
};
 
drawPoints(ctx, createExpCurvePoints(1.4, 12, 30))
```

It is fun to start to explore all the different possibilities when it comes to writing these kinds of methods. In any case the basic idea is the same create a collection of x and y values that will be passed to a draw function.