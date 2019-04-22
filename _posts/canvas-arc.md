---
title: Canvas arc examples
date: 2019-03-05 18:37:00
tags: [js, canvas]
layout: post
categories: canvas
id: 396
updated: 2019-04-22 08:51:21
version: 1.9
---

When making a canvas project with the html 5 canvas element and javaScript there is a [built in method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc) for the 2d drawing context that can be used to draw arcs and circles. This is of course one of the basic shapes that can be used to get some basic things worked out with a javaScript project that will involve the use of canvas as a way to draw graphics to the browser window. In this post I will be covering what there is to be aware if when it comes to canvas arcs in javaScript.

<!-- more -->

## 1 - Canvas arc basics

The arc method can be used when drawing a line by using the beginPath method at which point the arc method can be used in conjunction with other method like moveTo lineTo and so forth to help draw shapes such as but not limited to a circle. The canvas arc method takes up to six arguments. The first two arguments given to the arc method set the center x and center y values of the arc. The third argument is the radius of the arc, and then the next two arguments after that is the beginning and ending angle in radians. The last optional argument is used to set clockwise of counter clockwise direction of the arc.

```html
<html>
    <head>
        <title>canvas arc</title>
    </head>
    <body>
        <canvas id="the-canvas" width="30" height="30"></canvas>
        <script>
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// create arc
ctx.beginPath();
ctx.arc(15,15,10,0,1);
 
// set stroke and fill style
ctx.strokeStyle = 'red';
 
// stroke
ctx.stroke();
        </script>
    </body>
</html>
```



## 2 - Drawing a full canvas arc circle

To draw a full circle with the canvas arc method just set radian values from zero to Math.Pi * 2. This is a much quicker option to taking the time to write a polygon method to draw a circle, although writing that kind of method would give a greater deal of control over the various factors when it comes to daring a circle in canvas.

```js
ctx.beginPath();

// a full circle is from 0 to 6.28... radians
var startRadian = 0,
endRadian = Math.PI * 2,
cx = 15,
cy = 15,
radius = 10;
ctx.arc(cx,cy,radius,startRadian,endRadian);
 
// set stroke and fill style
ctx.strokeStyle = 'red';
ctx.fillStyle='black';
 
// fill, and stroke
ctx.fill();
ctx.stroke();
```

This works fine in most cases when I just want to quickly draw a circle. However there might be a desire in some cases to set other values such as the number of points in the arc and so forth. In that case I might need to take the time to write my own method for drawing an arc, or fine something else.

## 3 - Using a custom method for drawing a canvas arc circle

It is fun to write these kind of methods now and then to gain a better degree of control over how the arc, or circle is drawn. Many canvas libraries have a polygon method built in, but with plain vanilla js it is not to hard to start to get together some methods for drawing a polygon with a set number or points.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
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
 
var createPolygonPoints = function(cx,cy,r,s){
    var i = 0,points=[];
    while(i < s){
        a = Math.PI * 2 * (i/s);
        x = Math.cos(a) * r + cx;
        y = Math.sin(a) * r + cy;
       points.push(x,y);
     i += 1;
   }
    return points;
}
 
var pointCount = 50,
radius = 10;
drawPoints(ctx, createPolygonPoints(15,15,radius,pointCount), true);
```

This method can only be used to draw a circle, rather than say a half circle as I have choses to omit arguments for a start and end radian, and direction. It is true that writing a clone of the canvas arc method would not to be to hard, but doing so would not make sense, unless there are some additional features to add, such as being able to set the number of sides in the canvas arc.