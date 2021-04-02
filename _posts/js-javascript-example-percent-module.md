---
title: A percent module javaScript example
date: 2020-11-25 11:25:00
tags: [js]
layout: post
categories: js
id: 749
updated: 2021-04-02 13:21:22
version: 1.15
---

I think it might be a good idea to work out some more basic [javaScript examples](/2021/04/02/js-javascript-example/) that might lead to useful modules that I might use in an actual project or two. One thing that seems to come up a lot for me when working on projects is dealing with what I would often call a [percent value](https://thisinterestsme.com/calculate-percent-javascript/), or a value that can often be expressed as a percent value. That is having a method that will return a number between 0 and 100, or between 0 and 1 which could be multiplied by 100 or any other number for that matter.

There is having a simple percent method that will take two arguments one would be a [numerator](https://simple.wikipedia.org/wiki/Numerator) and another a [denominator](https://simple.wikipedia.org/wiki/Denominator) and the returned result will be a number between 0 and 1. So this can be thought of as a kind of [normalization](https://en.wikipedia.org/wiki/Normalization_%28statistics%29) in the sense that any two set of numbers will be a value between 0 and 1 so that they can be compared to each other. However there are all kinds of ways that one could go about making such a function other than just divining the numerator over the denominator.

There could also be some additional code that has to do with clamping or wrapping when this go out of range, but a basic example of this kind of method is not to hard. Still just a basic example of this kind of method will just give numbers that will go up in a very linear or straight line kind of way. So there is a wide range of other kinds of methods such as this that could give percent values that follow a curve, or some other kind of pattern.

These kinds of methods come into play when  it comes to writing logic that has to do with animations, but have a wide rang of other uses such as when creating an experience point system for example.

<!-- more -->


## 1 - The per.js module as it stands thus far

First off there is the percent module as it currently stands at this point I started off the module with a bunch of percent methods that each work in a slightly different way. One is just a basic base percent method that will just give the numerator over the denominator, and in addition there is just some basic code to clamp values when they go out of range.

Another percent method I have come to call just bias, this will give a number that will start off at zero, but once a given numerator is one half that of the value of the denominator one will be returned. Once the numerator value goes over one half that of the denominator the returned value will start to go back to zero again. This method and the percent method are the two basic ideas that come to mind when it comes to making these kinds of methods. However for this module I wanted to create a number of new ones that will give all kinds of different results based off of Math.log, and the trig methods.

There is a basic log methods that will give results that are consistent with a logarithmic curve, and then a few more methods that use other expressions that work with Math.log. I also have a number of trigonometry methods that use Math.cos and Math.son.

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

There are even more ways that I cold make these kinds of methods of course but I think all the basic ones I would want are there. The log3 method that i made might be the best function yet to aim me in making an experience point system, but I might want to add many more methods when it comes to that use case example. Other uses might eb to make animations and so forth and when it comes to that there is also plenty of room for creativity, and originality.

So This module looks good for what it is worth, however in order to really know if it gives be what I want or not I will need to work out some quick examples that make use of it. There are a number of things that I could do with these methods, but maybe the best thing to do for starters is to make a canvas example that will draw graphs with these methods to get a great visual idea of what I am working with before moving on to using this in a real project of some kind.

## 2 - canvas example

So there are many use case examples for a module such as this, but maybe it would be best to start with a canvas example. This way I can see visually what the deal is with these different percent methods by creating a graph object with each method and displaying each graph in the canvas element.

The main method of interest when it comes to creating a main object model of sorts is the createPerGraph method. This method takes in some value for the position and size of the graph, but also a percent method to use as an argument. In to body of the method I am using a fixed value for a denominator to use for each call of the given percent method. I then create a point for the graph for each numerator from zero up to the set denominator by using the current numerator with the set denominator to get a percent value with the given percent function.  I then use the returned percent value in an expression with the given values for position and height to set a y value for a point where the x value is just stepped by another expression that will always be the same for any percent method. he result is a collection of points that will help to give a visual idea of the kinds of values that each of these percent methods return and why they might be useful in some situations.

I then have a draw graph method that will just draw the points of a given graph object created with my createPerGraph method and a give 2d canvas drawing context. The rest of the javaScripr code is just creating the canvas element and injecting it into a div element that I have in some hard coded html, and making use of the create percent graph and draw graph methods.

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

So now I just need a little HTML to link to the per.js module, and the javaScript I worked out for this canvas example that makes use of it that I placed in a file called main.js. I also have the container element that will contain the canvas element that will be generated in the main.js file.

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

The end result here is then a bunch of graphs that show how the percent values given can effect something. Using just the plain base percent method will result in a straight line from the bottom left corner to the top right corner of a graph when used this way. However other percent methods will result in all kinds of different lines, and as such might be better choices depending on the kind of project that I would want to use one of these methods, or create an expression based of of what I have worked out with them.

## 3 - Conclusion

So there is a lot more to create and write about when it comes to these kinds of methods, and also how they can be used as a way to create other modules. In time I might expand this post when  I come up with more percent methods as well as ways to go about using them. For now I just wanted to start something n at least and start a post on this topic.