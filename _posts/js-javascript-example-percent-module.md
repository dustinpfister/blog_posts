---
title: A percent module javaScript example
date: 2020-11-25 11:25:00
tags: [js]
layout: post
categories: js
id: 749
updated: 2020-11-25 15:10:31
version: 1.5
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
    var api = function (n, d, methodKey, args) {
        n = n === undefined ? 0 : n;
        d = d === undefined ? 100 : d;
        methodKey = methodKey === undefined ? 'basePer' : methodKey;
        args = args === undefined ? [] : args;
        return api[methodKey].apply(null, [n, d].concat(args));
    };
    // CLAMP
    var clamp = function (per) {
        if (per > 1) {
            return 1;
        }
        if (per < 0) {
            return 0;
        }
        return per;
    };
    // BASICS
    // base percent function
    api.basePer = function (n, d) {
        return clamp(n / d);
    };
    // 'bias' percent function
    api.bias = function (n, d) {
        var per = api.basePer(n, d);
        return clamp(1 - Math.abs(per - 0.5) / 0.5);
    };
    // MATH.LOG
    // 'log1' percent method that uses Math.log
    api.log1 = function (n, d) {
        var per = api.basePer(n, d);
        return clamp(Math.log(1 + per) / Math.log(2));
    };
    // 'log2' percent method that uses Math.log with a range between a base and max per
    api.log2 = function (n, d, basePer, maxPer) {
        basePer = basePer === undefined ? 0.25 : basePer;
        maxPer = maxPer === undefined ? 0.75 : maxPer;
        var logPer = api.log1(n, d),
        range = maxPer - basePer,
        per = basePer + range * logPer;
        return clamp(per);
    };
    // 'log3' percent method that takes a value a that has an interesting effect on the curve
    api.log3 = function (n, d, a, basePer, maxPer) {
        basePer = basePer === undefined ? 0.10 : basePer;
        maxPer = maxPer === undefined ? 1 : maxPer;
        a = a === undefined ? 12 : a;
        var per = api.basePer(n, d),
        per2 = clamp(Math.log(1 + per) / Math.log(a - (a - 2) * per)),
        range = maxPer - basePer;
        return clamp( basePer + range * per2 );
    };
    // MATH.COS AND MATH.SIN
    // Trig helper method
    var trig = function (n, d, method, waves, radianOffset, invert) {
        method = method === undefined ? 'cos' : method;
        waves = waves === undefined ? 1 : waves;
        radianOffset = radianOffset === undefined ? 0 : radianOffset;
        invert = invert === undefined ? false : true;
        var per = api.basePer(n, d),
        a = Math.PI * 2 * per / (1 / waves) + radianOffset,
        cos = (Math[method](a) * 0.5 + 0.5);
        return invert ? cos : 1 - cos;
    };
    // cos, and sin method
    api.cos = function (n, d, waves, radianOffset, invert) {
        return trig(n, d, 'cos', waves, radianOffset, invert);
    };
    api.sin = function (n, d, waves, radianOffset, invert) {
        return trig(n, d, 'sin', waves, radianOffset, invert);
    };
    api.waves = function (n, d, waves, radianOffset, invert, method) {
        waves = waves === undefined ? 5 : waves;
        return trig(n, d, method, waves, radianOffset, invert);
    };
    // return public API
    return api;
}
    ());
```

## 2 - canvas example

So there are many use case examples for a module such as this, but maybe it would be best to start with a canvas example. This way I can see visually what the deal is with these different percent methods.

```js
(function () {
 
    var createPerGraph = function (sx, sy, w, h, perMethod) {
        var d = 40,
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
 
        ctx.fillStyle = '#303030';
        ctx.lineWidth = 2;
        ctx.fillRect(graph.x, graph.y, graph.w, graph.h);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(graph.x, graph.y, graph.w, graph.h);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        graph.points.forEach(function (point) {
            if (point.n === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();
    };
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 640;
    canvas.height = 480;
    ctx.translate(0.5, 0.5);
 
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    // create and draw some graphs
    var gSize = 120,
    graphs = {};
    ['basePer', 'bias', 'log1', 'log2'].forEach(function(perName, i){
        graphs[perName] = createPerGraph(10 + (gSize + 10) * i, 10, gSize, gSize, Percent[perName]);
        drawGraph(ctx, graphs[perName]);
    });
    ['log3', 'cos', 'sin', 'waves'].forEach(function(perName, i){
        graphs[perName] = createPerGraph(10 + (gSize + 10) * i, 10 + gSize + 10, gSize, gSize, Percent[perName]);
        drawGraph(ctx, graphs[perName]);
    });
 
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

## 3 - Conclusion

So there is a lot more to create and write about when it comes to these kinds of methods, and also how they can be used as a way to create other modules. In time I might expand this post when  I come up with more percent methods as well as ways to go about using them. For now I just wanted to start something n at least and start a post on this topic.