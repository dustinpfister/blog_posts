---
title: Canvas angle get the shortest direction between two angles
date: 2020-03-12 16:17:00
tags: [canvas]
layout: post
categories: canvas
id: 626
updated: 2020-05-27 12:09:59
version: 1.18
---

When working out [canvas projects](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) there might be a need to find the direction in which to go when given two angles. That is there is a current angle, and a target angle that I wish to get to from the current angle. With that said I often find myself in a situation in which I want to start stepping the current angle by a delta value that will get the current angle to the target angle. 

There are many projects out on the open Internet that help with this, one such project is [angle.js](https://github.com/infusion/Angles.js/). The angle.js project has a whole bunch of methods that help with tasks that involve angles naturally. In that project there are methods that help with the task of getting the shortest direction and many other topics that have to do with angles. However in this post I will be going over some quick copy and past solutions for finding the quickest direction to a target angle from a starting angle one of which is based off of a method in angles.js.

<!-- more -->

## 1 - Get angle direction method canvas example

This section is on a canvas example that will make use of a get direction method that will be used to step the current angle or a state object to a target angle.

## 1.1 - The get direction method

Here is the get direction method that I worked out with much code borrowed from angles.js. It uses methods form angle.js such as the mathematical module method, half normalize method, and the shortest direction method. I just hacked over things a little so that I have just one method that will return 0, 1, or -1 depending on the values of the radians that i give as the arguments to it.

```js
var getDir = (function () {
    // modulo
    var mod = function (x, m) {
        return (x % m + m) % m;
    };
    // normalize an angle to half radians
    var normalizeHalf = function (n) {
        var c = Math.PI * 2,
        h = c / 2;
        return mod(n + h, c) - h;
    };
    // public get dir method
    return function (a, b) {
        var z = a - b;
        if (a === b) {
            return 0;
        }
        if (normalizeHalf(z) < 0) {
            return 1;
        } else {
            return -1;
        }
    };
}
    ());
```

## 1.2 - A draw module

For this example I have a draw.js file that is used to draw the background, debug info, and circles that reflect the state of my current and target angles. For this module I am just going with the plain old object literal module pattern as everything that I am using thus far can be public. There is the circle point method that is intended to be used as a way to draw a circle along the circumference of a circle, as well as the plain old draw circle method that uses this method internally when drawing the current state of a given state object for this example.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.circlePoint = function (ctx, canvas, angle, radius) {
    ctx.beginPath();
    var x = Math.cos(angle) * radius + canvas.width / 2;
    var y = Math.sin(angle) * radius + canvas.height / 2;
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
};
 
draw.circle = function (ctx, canvas, state) {
    ctx.fillStyle = 'blue';
    draw.circlePoint(ctx, canvas, state.target, 50);
    ctx.fillStyle = 'green';
    draw.circlePoint(ctx, canvas, state.current, 50);
};
 
draw.debug = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.fillText(state.current, 20, 20);
};
```

## 1.1 - Main.js and index.html files

Now for the main.js file, and index.html file that pulls all this together. Here I get a reference to a canvas element that I will be using for rendering, and create a simple state object that contains a current and target angle.

```js
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var state = {
    current: 0,
    delta: Math.PI / 180 * 5,
    target: Math.PI / 80 * 200,
    tickLast: new Date(),
    tickRate: 100
};
 
var update = function (state) {
    var now = new Date(),
    t = now - state.tickLast;
    if (t >= state.tickRate) {
        var dir = getDir(state.current, state.target);
        state.current += state.delta * dir;
        state.tickLast = new Date();
    }
};
 
var loop = function () {
    requestAnimationFrame(loop);
    update(state);
    draw.back(ctx, canvas);
    draw.circle(ctx, canvas, state);
    draw.debug(ctx, state);
};
 
loop();
```

And now for the HTML file where I am linking to everything.

```js
<html>
    <head>
        <title>canvas angle</title>
    </head>
    <body>
        <canvas id="mycanvas" width="320" height="240"></canvas>
        <script src="get_dir.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

The result of all of this up and running is that the current angle steps to the target angle as I want. However there is one little problem, when it gets to the target angle it keeps stepping back and forth each frame tick after that. This is because I never really have a situation in which the current angle equals the target angle, so it is always stepping one way or the other by a static angle delta.

There is more than one way to go about resolving that problem, such as having a dynamic, rather than static angle delta, and have logic where the delta will end uo being zero if the difference in angular distance between the current and target angle is at or below a certain low point. 

Another solution that comes to mind is to not think in terms of radians, but degrees, or any set number of divisions or slots around the circumference of a circle. Such a solution would involve the use of mathematic modulo to find the closest number of degrees, slots, index values, or whatever you prefer to call them from one point to the other. In other words a solution in which I am not thinking in terms of angles, but something like index values in an array.

## 2 -Thinking in terms of index values, rather than radians, and a more robust find dir method

So because of the problem that I ran into with the current position trashing back and forth there are two general ideas that come to mind to resolve that. One is to have a dynamic angle delta value, and the other is to think in terms of diving the circumference of a circle into a set number of degrees, slots, or index values like that of an array, and step by one index value at a time. In this section I will be going over some quick javaScript that is the latter rather than the former.

```js
var findDir = (function () {
    var mod = function (x, m) {
        return (x % m + m) % m;
    };
    return function (indexMax, indexCurrent, indexTarget) {
        var z = indexCurrent - indexTarget,
        h = indexMax / 2;
        if (indexCurrent === indexTarget) {
            return 0;
        }
        if (mod(z + h, indexMax) - h < 0) {
            return 1;
        } else {
            return -1;
        }
    };
}
    ());
 
// works with arrays
var arr = [0, 1, 2, 3, 4],
len = arr.length;
console.log(findDir(len, 1, 4)); // -1
console.log(findDir(len, 4, 0)); // 1
console.log(findDir(len, 2, 2)); // 0
 
// works with an object of index/degree/number values
var state = {
    iMax: 32,
    iCurrent: 16,
    iTarget: 3
};
console.log(findDir(state.iMax, state.iCurrent, state.iTarget)); // -1
 
// index/degree/number values that can be converted to radians
console.log( Math.PI * 2 / state.iMax * state.iCurrent ); // 3.14159...
```

## 3 - Conclusion

So finding direction is one of those kinds of rabbit hole situations where I can end up wasting a whole day working out a solution for something that should just be part of some kind of framework or abstraction. With that said there is just using angles.js, however I often find myself making my own custom utility library based off of methods from that. There are many methods in angles.js that I might not use in a project so it makes sense to create a new custom fix utility library for just the project that I am working on.