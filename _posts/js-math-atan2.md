---
title: Math atan2 javaScript native Math object method use case examples.
date: 2019-03-19 17:29:00
tags: [js]
layout: post
categories: js
id: 404
updated: 2019-11-15 19:35:10
version: 1.13
---

The native [Math.atan2 method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2) is a [2 argument arctangent method](https://en.wikipedia.org/wiki/Atan2) in the javaScript [Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). The method comes in handy when I want to find the angle from one point to another in a Cartesian coordinate grid. 

So Math.atan2 is something that will come into play a lot when working out some logic for a wide range of different types of games where I am working out some kind of script where I want to find out an angle to an enemy so I know which way to rotate to.

<!-- more -->

## 1 - Math atan2 in javaScript

The Math.atan2 method in javaScript is strange in the sense that the y argument is what is passed to the method first, followed by x. Aside from that when passed an y and x value the method will return an angle to that point relative to the origin or a point of 0 for both y an x. So then it is just a matter of offsetting things to get the desired angle between any two points in a 2d grid system. This of course is the most common use example of Math atan2 in javaScript, at least speaking from my experience with it so far.

There are a few things that a developer should be aware of in addition to the nature of the arguments passed in relation to an origin. There is also the nature of the value that is returned which is a value between PI and negative PI which is different from the results that other methods might return. So lets look at some examples of the math atan2 method to help address some of these concerns.

### 1.1 - atan2 basic example

So the Math.atan2 method is used by giving two arguments the first of which is a y cornet followed by x. What is then returned by the method is a value between negative and positive PI, which is the angle to the given point from the origin.

So for a basic example if I where to give Math.atan2 a point that is any one to one ratio between x and y that should give me a 45 degree angle. That should at least be the case if zero degrees faces right, and I start to approach positive PI as the angle to a point moves to the left side of the screen. In other words a clockwise increase in the value of the angle.

```js

var a = Math.atan2(83,83);
 
console.log(a / Math.PI * 180); // 45
 
a = Math.atan2(83,0);
 
console.log(a / Math.PI * 180); // 90
```

The above example seems to correlate with that understanding of the angles returned by atan2. The point (x=83 y=83) is of course at a 45 degree angle from right side of the screen heading clock wise from the right side to the left side. In addition the point at (x=0,y=83) is at the bottom of the screen so it would be at 90 degrees.

So that being said the Math.atan2 method can be used as a way to find an angle from the origin to the point given via its two arguments. It is also possible to find the angle to any two points by just simply offsetting or normalizing one of the points.

## 2 - atan2 and two points

Using math.atan2 to find the angle between two points is just a matter of offsetting the points. This can be done by subtracting the values of one point from another in most cases so a code example like the following seems to work okay.

```js
var p1 = {
    x: 50,
    y: 50
},
p2 = {
    x: 75,
    y: 100
};
 
var a = Math.atan2(p1.y - p2.y, p1.x - p2.x) + Math.PI;
 
console.log(a / Math.PI * 180); // 63.43
```

Keep in mind that the y value needs to be given first. In addition the method always gives an angle relative to 0 0 so getting the angle between two points is just a matter of using one point to adjust the other to that point and this is one way to go about doing just that.

### 2.1 - Making a custom find angle method that uses Math atan2

The math atan2 method could be used as part of an expression that can then be pulled into a method. That method can then be part of a framework, or just simply a single stand alone method.

```js
// a findAngle method that takes four arguments and returns and angle in degrees
var findAngle = function (x1, y1, x2, y2) {
    return ( Math.atan2(y1 - y2, x1 - x2) + Math.PI )  / Math.PI * 180;
};
var a = findAngle(p1.x, p1.y, p2.x, p2.y);
console.log(a); // 63.43
```

The nature of the expression can be tweaked depending on the project. The example I worked out here returns a value in depress, but in other projects I might want radians, or some other kind of value.

## 2 - atan2 canvas example

Now for an actual use case example of math atan2 using canvas. In this example I create a circle that will change position based on mouse movement, and another circle that is at a set position. The circle at the set position can be changed by way of a mouse down event, and at any moment a line is drawn from the set circle to the circle that can be moved by a mouse move event.

This example makes use of canvas, event handlers, and many other aspects of front end javaScript that I will not be getting into detail in this post.

So here is some html for the example where I am creating a hard coded canvas element, and a script tag that will link to my external javaScript file that will contain the rest of my code.

```html
<html>
    <head>
        <title>atan2</title>
    </head>
    <body>
        <canvas id="gamearea"></canvas>
        <script src="atan2-1.js"></script>
    </body>
</html>
```

Here I have that external javaScript file.

```js
// SETUP CANVAS
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
var state = {
    toPoint: {
        x: canvas.width / 2 + 50,
        y: canvas.height / 2 + 50
    },
    fromPoint: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    a: 0,
    findAngle: function () {
        this.a = Math.atan2(this.toPoint.y - this.fromPoint.y, this.toPoint.x - this.fromPoint.x);
    }
};
 
// UPADTE
var update = function () {
 
    state.findAngle();
 
};
 
// DRAW
var drawPoint = function (point, style) {
    style = style || 'red';
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
};
 
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    drawPoint(state.fromPoint, 'white');
    drawPoint(state.toPoint, 'red');
 
    // draw line from state.fromPoint tp state.toPoint
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(state.fromPoint.x, state.fromPoint.y);
    ctx.lineTo(
        state.fromPoint.x + Math.cos(state.a) * 50,
        state.fromPoint.y + Math.sin(state.a) * 50)
    ctx.stroke();
};
 
// INPUT
canvas.addEventListener('mousemove', function (e) {
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;
 
    state.toPoint.x = x;
    state.toPoint.y = y;
 
});
canvas.addEventListener('mousedown', function (e) {
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;
 
    state.fromPoint.x = x;
    state.fromPoint.y = y;
 
});
 
// LOOP
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};
 
loop();
```

This is a nice visual way of confirming that the math atan2 method in javaScript works as expected when one knows how to adjust for it. I have worked out many projects in which I use atan2 in games to find the direction in which I want and enemy to fire for example when working out an AI script. If I get around to it many I will expand this post in the future to help outline some additional interesting use case examples of atan2.