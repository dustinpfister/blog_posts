---
title: Canvas arc method examples and Math sin cos in html 5 2d canvas
date: 2019-03-05 18:37:00
tags: [js, canvas]
layout: post
categories: canvas
id: 396
updated: 2019-07-30 13:17:36
version: 1.39
---

When making a canvas project with the html 5 canvas element and javaScript there is a [built in method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc) for the 2d drawing context that can be used to draw arcs and circles. This is of course one of the basic shapes that can be used to get some basic things worked out with a javaScript project that will involve the use of canvas as a way to draw graphics to the browser window. In this post I will be covering what there is to be aware if when it comes to canvas arcs in javaScript.

<!-- more -->

## 1 - Canvas arc example starting with the basics

The arc method can be used when drawing a line in canvas by using the beginPath method at which point the arc method can be used in conjunction with other methods like moveTo lineTo and so forth to help draw shapes such as but not limited to a circle. In order to use the canvas arc method it is important to have at least some background with javaScript and canvas in general. This is not a getting started post with these subjects, but a post on the canvas arc method in the 2d canvas drawing content.

### 1.1 - Know a thing or two about radians

The arguments that that canvas arc takes for the start and stop angles should be in [radians](https://en.wikipedia.org/wiki/Radian) and not [degrees](https://en.wikipedia.org/wiki/Degree_(angle). The concept of a radian is thinking of angles in terms of the value of pi times two rather than 360 degrees. If you prefer to think in depress you will still want to know how to convert from degrees to radians as well as the inversion of that.

To convert a degree value to a radian value to be used with the canvas arc method just divide the degree value by 180 and then multiply that value by Math.PI to get the equivalent value in radians.
```js
var rad = Math.PI / 4,
// radians to degrees
deg = 180 / Math.PI * rad;
console.log(deg); // 45
 
deg = 90;
// degrees to radians
rad = deg / 180 * Math.PI;
console.log(rad); // 1.57...
```

Radians come up a lot when it comes to anything having to do with angles in javaScript and not just with the canvas arc method. there are other methods of interest such as Math.sin, Math.cos, and Math.atan2 just to name a few. It would seem that radians are the preferred way to go about working with angles in javaScript so take a moment to become familiar with them if you have not done so before hand.

### 1.2 - Using the canvas arc method

The canvas arc method takes up to six arguments. The first two arguments given to the arc method set the center x and center y values of the arc. The third argument is the radius of the arc, and then the next two arguments after that is the beginning and ending angle in radians. The last optional argument is used to set clockwise of counter clockwise direction of the arc.

```html
<html>
    <head>
        <title>canvas arc</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// create a canvas arc
// begin by calling ctx.beginPath
ctx.beginPath();
var x = 150,
y = 120,
radius = 100,
radianStart = 0,
radianEnd = Math.PI / 2,
clockwise = true;
 
// calling canvas src with all arguments
ctx.arc(x,y,radius,radianStart,radianEnd, clockwise);
 
// set stroke and fill style
ctx.strokeStyle = 'red';
ctx.fillStyle='black';
// fill, and stroke
ctx.fill();
ctx.stroke();
        </script>
    </body>
</html>
```

The canvas arc method can be used in conjunction with other line methods such as ctx.lineTo, more on that later. There is also the ctx.stroke, and ctx.fill methods and setting the style of lines and fills as well that you should be familiar with as well, but I do not want to get to far of base when it comes to drawing in general with canvas.

## 1.3 - There is also Math.cos, and Math.sin that can be used to draw arcs

So the canvas arc method will come in handy for most situations when it comes to drawing arcs, and circles in canvas. It is a nice native built in way to draw arcs in the 2d canvas drawing api, a task that does come up often when making a canvas project. However there is also using the Math.cos and Math.sin methods in combination with canvas methods like moveTo, lineTo, in place of the native canvas arc method. If for some reason you want better control over the drawing of arc like curves in canvas, and feel compelled to write your own solution for drawing arcs, or something to that effect, you might want to play around with those methods a little as well.

```html
<html>
    <head>
        <title>canvas arc</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
// some values
i = 0,
maxI = 50,
cx = 160,
cy = 120,
radius = 50,
radian, x, y;
// draw
ctx.beginPath();
while (i < maxI) {
    radian = Math.PI / 2 * (i / maxI);
    x = Math.cos(radian) * radius + cx;
    y = Math.sin(radian) * radius + cy;
    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
    i += 1;
}
ctx.stroke();
        </script>
    </body>
</html>
```

The core javaScript Math sin and cos methods can be used to not just draw arcs, but also to position things in an arc like pattern as well. So the methods also come in handy when it comes to drawing and moving objects in arc like patterns when it comes to working out animations. More on that later in this post.

So now that you know the basics of the canvas arc method, as well as other options for drawing arcs in canvas. Lets look at some more canvas code examples that have to do with this subject.

## 2 - Drawing a full canvas arc circle

To draw a full circle with the canvas arc method just set radian values from zero to Math.Pi \* 2, apart from the usual values that set the center point an radius. The angular direction of the arc is of little consequence as long as the proper values for the starting and ending radian are set of course.

This is a much quicker option to taking the time to write a polygon method to draw a circle, although writing that kind of method would give a greater deal of control over various other factors such as the number of sides that will compose the so called circle when it comes to daring a circle in canvas.

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

## 3 - Drawing a canvas arc clockwise and counter clockwise

The sixth argument that can be passed to the canvas arc method is used to set clockwise or counter clockwise direction of the drawing of the canvas arc. The default value for this argument is false for a counter clockwise direction resulting in a clockwise direction from the starting radian to the ending radian value. This can be used in conjunction with proper values for the start and end radian values to do things like drawing a shape that looks like an eaten watermelon slice for example.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

ctx.strokeStyle = 'red';
ctx.beginPath();
ctx.arc(150,150,100,Math.PI,0,true);
ctx.arc(150,150,50,0,Math.PI,false);
ctx.closePath();
ctx.stroke();
```

More than one instance of the canvas arc method can be used, and the canvas arc method can be used in conjunction with other line methods such as lineTo and close path as a way to draw shapes.

## 4 - Drawing chords and just plain arcs

Drawing both [chords](https://en.wikipedia.org/wiki/Chord_(geometry) and just plain arcs can be achieved with the canvas arc method by just simply including or excluding the closePath context method. The close path method will draw the final line back to the starting point, while not calling it will not do that of course.

```js
// get canvas can 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// create Chord
ctx.beginPath();
ctx.arc(160, 120, 100, 0, Math.PI / 2);
ctx.closePath();
ctx.stroke();
```

## 5 - Wrapping the canvas arc method

Another topic that comes to mind is the idea of wrapping the canvas arc method in a function and then setting some hard coded defaults for the method so that I can have control over defaults and set them to values other than what is the browser default. This can sometimes make sense not just with the canvas arc method, but many native methods in general when working with a javaScript project. For example the forEach method in lodash works a little differently from the native forEach array prototype method as it can be used with objects in general rather than just arrays, and a value of false can be returned to break out of the loop.

For example in just about all use case examples of the canvas arc method I am using the method to draw a circle. So why not make a method where there are some defaults for arguments that make the starting radian value zero, and the ending radian value the value of pi times two. This way I do not have to do so each time I call the canvas arc method, and if I need to I can still pass different values for the starting and ending radian.

```js
// wrapping canvas arc
var arc = function (opt) {
    opt = opt || {};
    // use given ctx, or attempt to get a global one
    opt.ctx = opt.ctx || ctx;
    opt.cx = opt.cx === undefined ? 0 : opt.cx;
    opt.cy = opt.cy === undefined ? 0 : opt.cy;
    opt.radius = opt.radius === undefined ? 50 : opt.radius;
    opt.radStart = opt.radStart === undefined ? 0 : opt.radStart;
    opt.radEnd = opt.radEnd === undefined ? Math.PI * 2 : opt.radEnd;
    ctx.arc(opt.cx, opt.cy, opt.radius, opt.radStart, opt.radEnd);
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

// now I can just call arc
ctx.strokeStyle='red';
ctx.beginPath();
arc();
ctx.stroke();
 
// or give just the values I want to give,
// if the hard coded values I set for myself work fine
ctx.beginPath();
arc({
  cx: canvas.width / 2,
  cy: canvas.height / 2,
});
ctx.stroke();
```

The general point is that just because there is a native method that does not mean that is what must always be what is used in a project. If I can still rationalize a reason to write my own method to do something natively, or in this case wrap a native method so that I can have control over default values and more, I might very well just do that.

## 6 - Using a custom method for drawing a canvas arc circle

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

## 7 - Time to have some fun with canvas arc by making animations

So I think it games without saying that canvas is one of the more fun an interesting aspects of programing with javaScript. Canvas can be used to make html 5 games, and interesting animations that can be a whole world of fun. In this section I will be going over some simple canvas animation examples that make use of the canvas arc method.

These animation examples make use of the requestAnimationFrame method as a way of creating a render loop for canvas that is often the standard method for doing so with canvas projects. I often like to make animations that are deterministic in nature so that they can potentially be turned into perfectly looping gifs or webm videos. In other words there are a fixed number of frames and I am just working out the logic that is to be applied for each frame with javaScript. This differs from other styles of animation that involve generating a new frame on each tick that will not necessarily be deterministic. I would like to get into the subject deeper, but I do not want to get to far off topic from the canvas arc method in this post.

### 7.1 - The canvas arc method in an animation

In this canvas animation example I am updating two variables that have to do with changing the starting and ending radian values when calling the canvas arc method in a draw method that is called on each frame tick.

The basic structure of a canvas animation or any kind of canvas project will likely include at least some kind of state that is updated on each frame tick, and a method that draws that state to the canvas. There are other ways of course that involve clumping everything together, developers do have all kinds of different coding styles when it comes to making a project after all. However I think it is a good idea to make at least some kind if effort to break things down when I start to get into something that is a little advanced.

```html
<html>
    <head>
        <title>canvas arc animation</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// state
var frame = 0,
maxFrame = 50,
startRad,
endRad;
 
// update
var update = function(){
   // do something cool with the start and end radians
   var per = frame / maxFrame,
   bias = Math.abs(per - 0.5) / 0.5;
   startRad = Math.PI * 2 * per;
   endRad = startRad + 1 + 2 * bias;
   // step frame
   frame += 1;
   frame = frame % maxFrame;
 
};
 
// draw
var draw = function(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(160, 120, 50, startRad, endRad);
    ctx.stroke();
};
 
// loop
var loop = function(){
    requestAnimationFrame(loop);
    update();
    draw();
 
};
loop();
 
        </script>
    </body>
</html>
```

### 7.2 - Uisng Math.cos and Math.sin to create an arc like movement in canvas

In this post I also touched base on the Math.sin and Math.cos methods in core javaScript that can be used to create an arc as well in canvas. When it comes to making something move in an arc like pattern in canvas such as an array of box like objects that can be rendered using the fillRect method cos and sin can be used to move such objects in an arc like pattern.

```html
<html>
    <head>
        <title>canvas arc animation</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// state
var frame = 0,
maxFrame = 100,
bxCount = 5,
radPos,
bx;
// init
var init = function () {
    var i = 0;
    bx = [];
    while (i < bxCount) {
        bx.push({
            x: 0,
            y: 0,
            w: 32,
            h: 32
        });
        i += 1;
    }
};
// update
var update = function () {
    // do something cool with the start and end radians
    var per = frame / maxFrame,
    bias = Math.abs(per - 0.5) / 0.5;
    // update radPos
    radPos = Math.PI * 2 * per;
    // update boxes
    bx.forEach((b, i) => {
        var rOff = Math.PI * 2 / bx.length * i,
        radius = 25 + 50 * bias;
        var x = Math.cos(radPos + rOff) * radius + 160 - b.w / 2,
        y = Math.sin(radPos + rOff) * radius + 120 - b.h / 2;
        b.x = x;
        b.y = y;
    });
    // step frame
    frame += 1;
    frame = frame % maxFrame;
};
// draw
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bx.forEach((bx, i) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(bx.x, bx.y, 32, 32);
    });
};
// loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};
init();
loop();
        </script>
    </body>
</html>
```

## 8 - Conclusion

The canvas arc method is just one of many methods in the canvas 2d drawing context of course, however it is one that seems to come up often. Canvas is a lot of fun of course, and it can also be very helpful as well when it comes to working out basic graphics with javaScript code. 

There is also much more that can be done with canvas once you have a decent grasp on how to work with it when it comes to native javaScript by itself of course, but also when it comes to working with certain popular libraries in addition to plain old javaScript by itself. For example in [threejs a canvas element](/2018/04/17/threejs-canvas-texture/) can be used as a way to create a texture that can be used to skill faces on solid geometry objects.

I hope that you have gained something of value from reading this post on the canvas arc method, there is much more to write about when it comes to just canvas let alone javaScript in general so it looks like I have my work cut out for me.