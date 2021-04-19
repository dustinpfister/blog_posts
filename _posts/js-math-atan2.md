---
title: Math atan2 javaScript native Math object method use case examples.
date: 2019-03-19 17:29:00
tags: [js]
layout: post
categories: js
id: 404
updated: 2021-04-19 14:25:53
version: 1.27
---

The native [Math.atan2 method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2) is a [2 argument arctangent method](https://en.wikipedia.org/wiki/Atan2) in the javaScript [Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). The method comes in handy when I want to find the angle from one point to another in a Cartesian coordinate grid, and is then a method that would likely be used once or twice when making a library that works with angles. As of this writing I have [made a library that is my take on this kind of angle library](/2021/04/16/js-javascript-example-angles-module/) that might also be worth checking out then.

So one example of the use of the Math.atan2 is something that will come into play a lot when working out some logic for a wide range of different types of games where I am working out some kind of script where I want to find out an angle to an enemy so I know which way to rotate to, or visa versa when it comes to developing some kind of AI Script. However simply put if you have two points in a grid, and you want to know the angle from one point to the other, then the Math.atan2 method is what I would want to use to do so. So it goes without saying there are many possible applications for the atan2 method in javaSript so lets get started looking at some basic examples of Math atan2 in action, and maybe get to some additional not so basic examples while we are at it.

<!-- more -->

## 1 - Math atan2 in javaScript

The Math.atan2 method in javaScript is strange in the sense that the y argument is what is passed to the method first, followed by x after breaking a common convention where x is often what is passed first when using any method that accepts x and y axis values. Anyway aside from that when passed a y and x value the method will return an angle to that point relative to the origin or a point of 0 for both y an x. So then it is just a matter of offsetting or normalizing things to get the desired angle between any two points in a 2d grid system. This of course is the most common use example of Math atan2 in javaScript, at least speaking from my experience with it so far.

There are a few things that a developer should be aware of in addition to the nature of the arguments passed in relation to an origin. There is also the nature of the value that is returned which is a value between PI and negative PI which is different from the results that other methods might return but this to is not to hard to convert. So lets look at some examples of the math atan2 method to help address some of these concerns.

### 1.1 - atan2 basic example

So the Math.atan2 method is used by giving two arguments the first of which is a y coordinate followed by x. What is then returned by the method is a value between negative and positive PI, which is the angle to the given point from the origin.

So for a basic example if I where to give Math.atan2 a point that is any one to one ratio between x and y that should give me a 45 degree angle. That should at least be the case if zero degrees faces right, and I start to approach positive PI as the angle to a point moves to the left side of the screen. In other words a clockwise increase in the value of the angle.

```js

var a = Math.atan2(83,83);
 
console.log(a / Math.PI * 180); // 45
 
a = Math.atan2(83,0);
 
console.log(a / Math.PI * 180); // 90
```

The above example seems to correlate with that understanding of the angles returned by atan2. The point (x=83 y=83) is of course at a 45 degree angle from right side of the screen heading clock wise from the right side to the left side. In addition the point at (x=0,y=83) is at the bottom of the screen so it would be at 90 degrees.

So that being said the Math.atan2 method can be used as a way to find an angle from the origin to the point given via its two arguments. It is also possible to find the angle to any two points by just simply offsetting or normalizing the points of concern so that everything is relative to an object of concern to another object of concern rather than the upper left corner of an element or the window.

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

The math atan2 method could be used as part of an expression that can then be pulled into a method. That method can then be part of a framework, or just simply a single stand alone method that can be used to get the angel between two points. So in this example I am going to go with a single stand alone method that will help get the angles that I want between two points. 
Here I have a find angle method that will take up to five arguments, the first two arguments is the point that I want an angle from that point to anther, and the next two points are the x and y values for the other point. If for some reason I want the angle from the other point I can just flip argument the arguments. So say I have a point at 50 50 and another at 75 50, by passing the point at 50 50 first I end up getting an angle of 0, however if I pass the point at 75 50 first that will of course given 180.

In addition to the arguments that are used to get the angle I also added a scale argument that will default to 360. In some cases I might want to change that to some other value such as Math.PI \* 2, or any other value that reflects the scale of the circumference of a circle.

```js
var p1 = { x: 50,y: 50 }, p2 = { x: 75, y: 50 };
// a findAngle method that takes four arguments and returns and angle in degrees
var findAngle = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? 360 : scale;
    var radian = Math.atan2(y1 - y2, x1 - x2) + Math.PI;
    return (radian / (Math.PI * 2) * scale ) % scale;
};
var a = findAngle(p1.x, p1.y, p2.x, p2.y),
b = findAngle(p2.x, p2.y, p1.x, p1.y);
console.log(a, b); // 0 180
```

The nature of the expression can be tweaked depending on the project. When making a framework around this method I might want to make cretin changes such as making it so the method only takes three arguments which would be the case if I just directly pass the point objects rather than breaking things down for each axis. However for the most part I would say this is a pretty decent method that I would just copy and past into projects, as the basic idea would likely not change much with this when it comes to making a method like this.

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

## 3 - Making a utility module with a math.atan2 powered find angle method, as well as many other helpful methods

So having a find angle method that makes use of the Math.atan2 method to find the angle between two points is one thing. However when it comes to having a utility module that will truly be helpful in a project I would want a few more methods on top of that. Just getting an angle between two points is often just one value of interest after all, there is also the shortest angular distance from a current heading value, to that angle that will result in a unit facing that other point, and the direction to move that is that shortest angular distance. There is also plain old distance between two points, and a hold bunch of other values that I am sure will come up and I start to make a project.

So here I have a more comprehensive utility library that has a getAngleTo method that makes use of Math.atan2, but also has methods that get other relevant metrics that come up in many game projects. So it contains many other the other usual suspects such as a distance formula, as well as an getAngleDistnace formula that will return the shortest angular distance from one angle to another. I also have a getShorestAngleDirection method also to find out not just the shortest angular distance, but also if movement should happen in a clock wise or counter clock wise direction to get to a target angle.

```js
var utils = {};
 
// get distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
 
utils.normalizeHalf = function (n, scale) {
    scale = scale === undefined ? 360 : scale;
    var h = scale / 2;
    return utils.mod(n + h, scale) - h;
};
 
utils.getAngleTo = function (unit, target, scale) {
    scale = scale === undefined ? 360 : scale;
    var radian = Math.atan2(unit.y - target.y, unit.x - target.x) + Math.PI;
    return (radian / (Math.PI * 2) * scale) % scale;
};
 
utils.getAngleDistance = function (a, b, scale) {
    scale = scale === undefined ? 360 : scale;
    var h = scale / 2;
    var diff = utils.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - scale;
    }
    return Math.abs(diff);
};
 
utils.getShortestAngleDirection = function (from, to, scale) {
    var z = from - to;
    if (from === to) {
        return 0;
    } else if (utils.normalizeHalf(z, scale) < 0) {
        return 1; // clockWise
    } else {
        return -1; // Counter clock wise
    }
};
 
utils.getTargetMetrics = function (unit, target, scale) {
    scale = scale === undefined ? 360 : scale;
    var angleToEnemy = utils.getAngleTo(player, enemy, scale);
    return {
        unit: unit,
        target: target,
        angleToEnemey: angleToEnemy,
        angleFromEnemy: utils.getAngleTo(enemy, player, scale),
        distanceToEnemey: utils.distance(player.x, player.y, enemy.x, enemy.y),
        angleDistToEnemy: utils.getAngleDistance(player.heading, angleToEnemy, scale),
        dirToEnemy: utils.getShortestAngleDirection(player.heading, angleToEnemy, scale)
    };
};
 
// a player object
var player = {
    x: 0,
    y: 0,
    heading: 20
};
 
var enemy = {
    x: 45,
    y: 45,
    heading: 0
};
 
var metrics = utils.getTargetMetrics(player, enemy, 360);
console.log(metrics);
 
/*
{
    unit: {
        x: 0,
        y: 0,
        heading: 20
    },
    target: {
        x: 45,
        y: 45,
        heading: 0
    },
    angleToEnemey: 45,
    angleFromEnemy: 225,
    distanceToEnemey: 63.63961030678928,
    angleDistToEnemy: 25,
    dirToEnemy: 1
}
*/
```

So Math.atan2 is more or less useful for getting an angle between two points, however it is not a golden hammer for everything that has to do with angles. In my experience thus far a small collection of methods such as this will help me with most situations that I have run into thus far when it comes to working out various problems that have to do with getting an unknown angle.

Much of the code here is borrowed from [angles.js](https://github.com/infusion/Angles.js/), this is a library that is sure worth checking out it as has many useful methods like these.

## 4 - Conclusion

The Math atan2 method is just one tool in the toolbox when it comes to working out logic that has to do with angles. It is by no means the only method that comes to mind, and many additional methods are not built into javaScript itself. I do not see that as a problem tough as I can not say that it is required to have every method that I can thing of when t comes to working with angels built into javaScipt itself, at least some of this stuff should be added into the mix via libraries.

