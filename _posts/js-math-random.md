---
title: Math random method in javaScript
date: 2020-04-21 18:19:00
tags: [js]
layout: post
categories: js
id: 649
updated: 2020-04-21 18:35:44
version: 1.20
---

Starting out with the [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) method in javaScript is simple enough, you just call it and you get a random number between 0 and 1. From there it is all about what you do with that value when it comes to doing something random. With that said there is maybe a bit more that just calling the method then when it comes to rounding, getting a range, and the nature of the distribution when using the method largely by itself. So lets take a look at a few examples of the Math random method in javaScript from simple to not so simple.

<!-- more -->

## 1 - A Basic Math random example

So the basic deal is to just call the math random method, when doing so you will get a number between 0 and 1.

```js
var n = Math.random();
console.log(n); // random number between 0 and 1
```

## 2 - Range and Math random

Getting a range involves a simple expression where you start with the low end of the range and then add by a random number that  is the result of Math.random multiplied by the result of the high end of the range with the low end deducted.

In other words something like this.

```js

var randomRange = function (low, high) {
    low = low === undefined ? 0 : low;
    high = high === undefined ? 1 : high;
    var range = high - low;
    return low + range * Math.random();
};

var n = randomRange(-5, 5);
console.log(n); // between -5 and 5
```

## 3 - Rounding random numbers

When it comes to rounding and random numbers you want to be careful. Make sure that you are using the Math floor or math ceil methods rather than just the math round method. That is unless you want the result of what happens when you use the math round method to be what happens. 

You see if you multiply the result of a Math random call by a number such as six, and use the Math round method to round the result the range will be from and including 0 to and including 6 which is a range of 7 possible values where you might only want 6. So you will want to multiply by 5 rather than 6, or use the math floor or ceil methods rather than the math round method.

```js
console.log( Math.round(0.01) ); // 0
console.log( Math.ceil(0.01) ); // 1
console.log( Math.floor(0.01) ); // 0
 
console.log( Math.round(0.5) ); // 1
console.log( Math.ceil(0.5) ); // 1
console.log( Math.floor(0.5) ); // 0
 
console.log( Math.round(0.99) ); // 1
console.log( Math.ceil(0.99) ); // 1
console.log( Math.floor(0.99) ); // 0
 
console.log('******');
console.log( Math.round(Math.random() * 6) ); // 0 - 6 (range of 7!)
console.log( Math.ceil(Math.random() * 6) ); // 1 - 6 (range of 6)
console.log( Math.floor(Math.random() * 6) ); // 0 - 5 (range of 6)
```

## 4 - Distribution

```js
var dist = (function () {
    var api = function (count, w, h, method) {
        count = count === undefined ? 100 : count;
        w = w === undefined ? 320 : w;
        h = h === undefined ? 240 : h;
        method = method || api.methodOne;
        var points = [],
        i = count;
        while (i--) {
            points.push(method(i, w, h));
        }
        return points;
    };
    api.methodOne = function (i, w, h) {
        return {
            x: Math.floor(Math.random() * w),
            y: Math.floor(Math.random() * h)
        };
    };
    api.methodTwo = function (i, w, h) {
        return {
            x: Math.pow(2, Math.log(w) / Math.log(2) * Math.random()),
            y: Math.pow(2, Math.log(h) / Math.log(2) * Math.random())
        };
    };
    return api;
}
    ());
```

```html
<html>
    <head>
        <title>Math random</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="dist.js"></script>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
points1 = dist(1000, 150, 200, dist.methodOne);
points2 = dist(1000, 150, 200, dist.methodTwo);
 
var drawPoints = function (points, ctx, fill, sx, sy) {
    ctx.fillStyle = fill || 'green';
    sx = sx === undefined ? 0 : sx;
    sy = sy === undefined ? 0 : sy;
    points.forEach(function (pt) {
        ctx.beginPath();
        ctx.arc(sx + pt.x, sy + pt.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
};
 
drawPoints(points1, ctx, 'red');
drawPoints(points2, ctx, 'green', 150);
 
        </script>
    </body>
</html>
```