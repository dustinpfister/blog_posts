---
title: A percent module javaScript example
date: 2020-11-25 11:25:00
tags: [js]
layout: post
categories: js
id: 749
updated: 2020-11-25 11:43:13
version: 1.2
---

I think it might be a good idea to work out some more basic javaScript examples that might lead to useful modules that I might use in an actual project or two. One thing that seems to come up a lot for me when working on projects is dealing with what I would often call a percent value, or a value that can often be expressed as a percent value. That is having a method that will return a number between 0 and 100, or between 0 and 1 which could be multiplied by 100 or any other number for that matter.

There is having a simple percent method that will take two arguments one would be a numerator and another a denominator and the returned result will be a number between 0 and 1. There could also be some additional code that has to do with clamping or wrapping when this go out of range, but a basic example of this kind of method is not to hard. Still just a basic example of this kind of method will just give numbers that will go up in a very linear or straight line kind of way. So there is a wide range of other kinds of methods such as this that could give percent values that follow a curve, or some other kind of pattern.

These kinds of methods come into play when  it comes to writing logic that has to do with animations, but have a wide rang of other uses such as when creating an experience point system for example.

<!-- more -->


## 1 - The per.js module as it stands thus far

First off there is the percent module as it currently stands at this point I started off the module with three percent methods. One is just a basic base percent method that will just give the numerator over the denominator, and in addition there is just some basic code to clamp values when they go out of range.

Another percent method I have come to call just bias, this will give a number that will start off at zero, but once a given numerator is one half that of the value of the denominator one will be returned. Once the numerator value goes over one half that of the denominator the returned value will start to go back to zero again.

I also have another percent method that will give a log style percent value.

```js

var Percent = (function () {
 
    // main api function
    var api = function(n, d, methodKey, args){
        n = n === undefined ? 0 : n;
        d = d === undefined ? 100 : d;
        methodKey = methodKey === undefined ? 'basePer' : methodKey;
        args = args === undefined ? [] : args;
        return api[methodKey].apply(null, [n,d].concat(args));
    };
 
    // base percent function
    api.basePer = function(n, d){
        if(n >= d){
            return 1;
        }
        if(n < 0){
            return 0;
        }
        return n / d;
    };
 
    // 'bias' percent function
    api.bias = function(n, d){
        var per = api.basePer(n, d);
        return 1 - Math.abs(per - 0.5) / 0.5;
    };
 
    api.log1 = function(n, d){
        var per = api.basePer(n, d);
        return Math.log(1 + per) / Math.log(2);
    };
 
    return api;
}
    ());
```

## 2 - canvas example

```js
(function () {
 
    var createPerGraph = function (sx, sy, w, h, perMethod) {
        var d = 10,
        points = [],
        n = 0;
        while (n <= d) {
            points.push({
                n: n,
                x: Math.floor(sx + w / d * n),
                y: Math.floor(sy + h - h * perMethod(n, d))
            });
            n += 1;
        }
        return {
            points: points,
            x: sx,
            y: sy,
            w: w,
            h: h,
            d: d
        };
    };
 
    var drawGraph = function (ctx, graph) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(graph.x, graph.y, graph.w, graph.h);
        ctx.beginPath();
        graph.points.forEach(function (point) {
            if (point.n === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.strokeStyle = 'red';
        ctx.stroke();
    };
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
 
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    var basePerGraph = createPerGraph(32, 10, 100, 100, Percent.basePer);
    var biasPerGraph = createPerGraph(150, 10, 100, 100, Percent.bias);
    var log1Graph = createPerGraph(32, 120, 100, 100, Percent.log1);
 
    drawGraph(ctx, basePerGraph);
    drawGraph(ctx, biasPerGraph);
    drawGraph(ctx, log1Graph);
 
}
    ());
```

```html
<html>
    <head>
        <title>percent</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./per.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

