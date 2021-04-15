---
title: Math random method in javaScript
date: 2020-04-21 18:19:00
tags: [js]
layout: post
categories: js
id: 649
updated: 2021-04-15 13:37:20
version: 1.27
---

Starting out with the [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) method in javaScript is simple enough, you just call it and you get a random number between 0 and 1. From there it is all about what you do with that value when it comes to doing something random. With that said there is maybe a bit more that just calling the method then when it comes to rounding, getting a range, and the nature of the distribution when using the method largely by itself. So lets take a look at a few examples of the Math random method in javaScript from simple to not so simple.

<!-- more -->

## 1 - A Basic Math random example

So the basic deal is to just call the math random method, when doing so you will get a number between 0 and 1. That is all there is to it if that is all that is needed. So a basic starting example of the Math.random method might involve just calling th method, and then logic the value to the javaScript console.

```js
var n = Math.random();
console.log(n); // random number between 0 and 1
```

The random number can then be multiplied, and used in all kinds of different expressions to get desired random ranges. So from this post forward it is just working out the expressions that are needed to work with this kind of method.

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

## 4 - The Math random method and Distribution

Now for a word or two on distribution when using the Math round method. Now the math random method will give pseudo random numbers, however it will distribute in a way that is kind of not so random. That is that the numbers will be kind of evenly distributed when using it, unless you do something more to change that. So in this section I will be going over concerns over distribution and the use of the math random method in the javaScript Math object.

### 4.1 - Random Distribution scatter plot example

A good way to understand what is going on with this would be to create something that looks like a [scatter plot](https://en.wikipedia.org/wiki/Scatter_plot) of sorts. If I use the Math random method to generate a bunch of random points by just multiplying width by a Math random call for x, and height by a Math.random call then the points will be random, but in a very evenly distributed kind of way.


So say I have a dist.js file like this.

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

And I make use of it in an html file like this.

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

The result is random points, but they are distributed in very different ways. By using Math log in conjunction with math random to work out the points that results in a very different distribution of values for the points, many more of the points are concentrated to the lower sides of the area so they are not so evenly distributed.

## 5 - Conclusion

So that is it for now when it comes to random numbers and javaScript. In the event that I get some more time, or that I find something more to write about when it comes to the Math.random method, and other things surrounding random numbers in general I will expand this post a bit more.