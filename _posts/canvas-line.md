---
title: Canvas lines the basics and much more
date: 2019-03-03 17:17:00
tags: [js, canvas]
layout: post
categories: canvas
id: 395
updated: 2020-03-10 12:30:57
version: 1.35
---

When learning how to work with the [javaScript canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) 2d drawing context for the first time the subject of drawing lines is one thing that should be well understood before moving on to more complex canvas related subjects. In this post I will be quickly covering many of the basics about drawing lines with canvas and javaScript, including the [lineTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) and [moveTo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo) methods of course for starters.

I see lots of code on the web that has to do with drawing canvas lines by way of working out the logic for the line, and drawing at the same time. Maybe this is not always such a bad thing, but for the most part I seem to like working out an array of points, and then just have a generic draw points method. There is always more than one way of doing the same thing, but in nay case lets get into drawing lines with canvas and client side javaScript.

<!-- more -->

## 1 - Canvas line basics

This is a post on drawing lines with html 5 canvas for drawing graphics with javaScript. I assume that you have at least some background with html, css and javaScript to begin with. If not this is not the place to get started with any of those subjects. This post is also not necessary a starting point for [getting started with canvas](/2017/05/17/canvas-getting-started/) as well, but I will keep some of the first examples simple copy and past canvas line examples. If you are a more advanced javaScript developer that has a good command of the basics, then you might want to skip to the next section.

In this section I will be starting out with the very basics of drawing lines with canvas and javaScript. The basic process is to start a path with the begin path method, then use the move to method to move to a point in the canvas matrix. After that call the line to method one or more times to define all the points in the line from the start point. Once the path is done the close path method can be called to close the path, or not to leave it open. At this time  the stroke and fill methods can be used to actually draw the line with the current style values of the drawing context.

If you are still a little confused maybe it is best to learn by doing. Take a look at some of these examples, copy and past them in, and play around with things.

### 1.1 - Canvas line hello world example

To make a canvas line I first need to gain a reference to a canvas element, and get a reference to the 2d drawing context after doing so I can now call the various methods that are used to draw lines with canvas. There is generating an injecting a canvas element, but for this example I will be getting a reference to a hard coded canvas element with the get method by id method. 

So one way to get started with canvas lines would be to set the stroke style and begin a line by calling the begin path method. Once I have called begin path I can then use the move to method to move to a certain point in the canvas matrix. Then once I am at a good starting point I can use the line to method to create a line from the move to point to the line to point. Once done I can call the stroke method to draw the line.

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

So there we have a good getting started with canvas lines example. However of course there is much more to it than then when it comes to getting into many aspects of geometry, and writing all kinds of methods for drawing shapes and deterministic style animations. Also there are still a few other things to cover when it just comes to the basics so lets look at some more examples.

### 1.2 - The moveTo method

The moveTo method can be used to create a new sub path at the given point in the 2d drawing context. It can be thought of as a way to pick up a pen and place it down at a given location on a piece of paper, rather than dragging a pen across a piece of paper as in the case of the lineTo method.

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

### 1.3 - canvas line width

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

### 1.4 - Stroke and fill canvas lines

The stroke method can be used in conjunction with the fill method to both stroke and fill a shape that was drawn with the moveTo and lineTo methods. This should often be used in conjunction with the close path method to ensure that the shape is always close to the starting point of the line.

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

The order in which the fill and stroke methods is called does matter, but it can effect the z order in which these actions take place. In other words if you want a stroke to happen on top of a fill then be sure to call the stroke method after the fill method is called like in the above example.

## 2 - Complex Paths with canvas lines

When it comes to drawing any kind of complex path it gets to the point where I would want to work out a way to create and draw a collection of points. When things start to get intense there are many canvas libraries that help to abstract things away, but in this section I will be covering some basics of this without the use of a library.

### 2.1 - Making a drawPoints function

The first thing I would do is work out a function that will draw a standard collection of points. This standard collection of points could be a collection of objects each with an x, and y property if you prefer. However in this section I will be working with a simple linear array of number primitives which is a more efficient solution of course.

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

There might be a need for more than one draw points function, or to hack over something like this to add additional features such as to close the line or not, to fill or not and so forth. Still many draw points functions work in a similar fashion, give it a context and an array of points and it will draw the points for me as a line.

So now that I have a draw points function the real fun can begin when it comes to writing all kinds of methods that can be used to create an array of points that will be passed to this method.

### 2.2 - Create Polygon Points for a canvas line

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

So for this I just call the method, pass a center x and center y value, and then a radius and number of sides. I then have my points that form a polygon, just pass it to the draw points method with a context. As I increase the number of sides I will of course approach a circle, but this is not really a replacement for the [canvas arc](/2019/03/05/canvas-arc/) method,

### 2.3 - An exponential curve example

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

## 3 - canvas lines an animation

So now that we have the basics of drawing lines worked out, and we also touched based on the importance of separating the state of a line from the rendering of a line, lets start doing some fun stuff with animation. I will not be getting into the depth of animation and canvas here, but I will touch base on frame by frame style animation and using request animation frame to make a canvas app loop.

### 3.1 - A canvas draw module with out draw points method

```js
var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.points = function (ctx, points, close) {
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1]);
        i += 2;
    }
    if (close) {
        ctx.closePath();
    }
    ctx.stroke();
};
```

### 3.2 - The basic.js file that contains out canvas line animation

```js
var canvas = document.getElementById('the-canvas'), ctx;
canvas.width = 320;
canvas.height = 240;
ctx = canvas.getContext('2d');
 
var state = {
    frame: 0,
    maxFrame: 100,
    lastFrame: new Date(),
    FPS: 30,
    points: []
};
 
var initPoints = function (state, canvas) {
    var i = 0,
    len = state.maxFrame,
    x,
    y,
    points = state.points = [];
    while (i < len) {
        x = canvas.width / (state.maxFrame - 1) * i;
        y = canvas.height / 2 - 50 + 100 * Math.random();
        points.push(x, y);
        i += 1;
    }
 
};
 
var update = function (state) {
    var now = new Date(),
    t = now - state.lastFrame,
    frames = Math.floor(t / 1000 * state.FPS);
    if (frames >= 1) {
        state.frame += frames;
        state.frame %= state.maxFrame;
        state.lastFrame = now;
    }
};
 
initPoints(state, canvas);
var loop = function () {
    requestAnimationFrame(loop);
    update(state);
    draw.back(ctx, canvas);
    ctx.strokeStyle = 'red';
    var i = Math.floor(state.maxFrame * (state.frame / state.maxFrame)) + 1;
    draw.points(ctx, state.points.slice(0, i * 2), false);
 
};
loop();
```

## 4 - Conclusion

Of course I have not covered everything when it comes to drawing lines with canvas. I could go on and on about everything that comes to mind about methods that are used to create arrays of points and then draw lines between them. I would never cover everything with that, the power of imagination has not bounds with that.