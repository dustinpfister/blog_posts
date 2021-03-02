---
title: Drawing a canvas star with javaScript
date: 2020-02-12 15:17:00
tags: [canvas]
layout: post
categories: canvas
id: 611
updated: 2021-03-02 16:59:48
version: 1.34
---

Time for yet another [canvas example](/2020/03/23/canvas-example/) this time I think I will do a quick example of [drawing a star using javaScript and canvas](https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5). There are many ways of doing so with a canvas HTML element, many solutions that I see involve making a draw method that will draw a star directly to the canvas. Although these kinds of solutions work I think a better way of doing so is to create a method that will create an array of points, and then have a draw method that will just render that array of points to the canvas. That way the process of drawing a star is just a matter of working out logic that will create an array of points that are to be rendered in a connect the dots type fashion. By doing so I am also pulling the state of these points away from logic that is used to render the state of such points.

There is also taking a moment to just have a little fun with canvas and stars for once. Canvas elements are a part of front end javaScript that are a great example of fun, and creative rather than dull and boring javaScript. With that said in this example I think I will also be touching base on a wide range of other topics that come up when create a canvas project from the ground up, such as object pools, moving an object by way of system time rather than stepping on each loop, and more. There is a lot that can be done when it comes to getting creative with this kind of thing, so this post should be a little fun for once.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/star/0.0.0/pkg.js"></script>

## 1 - The star module

First off there is the module that I worked out that creates arrays of points that when drawn in order end up drawing stars. There is more than one method provided by this module to create these point arrays, and some internal helper methods to parse options and get a point when given a radian, and radius from a given origin.

One method that creates an array of points that makes up a star I called just simply create1. This method works by having not one but to radius from a center point. There is one set of points at one radius, and another set of points at another radius, and both sets of points are spaced out between each other half way. When the array of points is drawn the line will be drawn from a point at one radius to the next point at the other radius, thus forming a star like shape that way.

The other method that I worked out is called just create2, this method creates an array of points by way of having a single set of points at a single given radius, the oder in which points are added to the array is just set by a point skip argument that defaults to 2.

```js
var starMod = (function () {
 
    // get a point with a given radian, radius, and origin point
    var getPoint = function (radian, radius, ox, oy) {
        return {
            x: Math.cos(radian) * radius + ox,
            y: Math.sin(radian) * radius + oy
        };
    };
 
    // parse options
    var parseOptions = function (opt) {
        opt = opt || {};
        opt.pointCount = opt.pointCount || 5;
        opt.radius = opt.radius === undefined ? 50 : opt.radius;
        opt.radiusInner = opt.radiusInner === undefined ? 25 : opt.radiusInner;
        opt.radianAjust = opt.radianAjust === undefined ? 0 : opt.radianAjust;
        opt.ox = opt.ox || 0;
        opt.oy = opt.oy || 0;
        opt.pointSkip = opt.pointSkip || 2;
        return opt;
    };
 
    // public API
    return {
        // create a star points array by pointCount, and inner and outer radius
        create1: function (opt) {
            opt = parseOptions(opt);
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / opt.pointCount,
            points = [];
            while (i < opt.pointCount) {
                pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                pt = getPoint(rd * i + rd / 2 + opt.radianAjust, opt.radiusInner, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        },
        // create a star by point count radius and point skip
        create2: function (opt) {
            opt = parseOptions(opt);
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / opt.pointCount * opt.pointSkip,
            points = [];
            while (i < opt.pointCount) {
                pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        }
    }
 
}
    ());
```

## 2 - The utils module

As with many other canvas examples I have a general utility module, this is where I park methods that I will likely be using across two or more modules, or might use in other canvas examples. I do not just use a single utils.js module for all canvas examples that is something that will change a little from one example to another depending on what I will be doing in the example.

In this canvas example of stars I have a distance and mathematical modulo methods that I will be using in my pool library for this example. I could get into detail about these methods here, but simply put the distance formula is just so I can get a distance between two points, and the mathematical modulo is just another way of doing what the built in javaScript modulo operator does.

Just like all my other canvas examples I also have my usual create canvas method that I am now using in all of them more or less as a way to just keep everything in line with a certain standard. Simply put any basic thing that I want to do to any canvas element I place in this simple copy and paste method that I can take with me to any other canvas example.

```js
var utils = {};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
// create a canvas
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
```

## 3 - The pool module

Here I have an object pool module which is just a fixed collection of objects that I use over an over again. I made another module in my [canvas example on object pools](/2020/07/20/canvas-example-object-pool/) where I get into this topic a little deeper, but for this canvas example I made my own custom cut solution for this very example, rather than something that might be a little more reusable that I worked out in that post.

This module has two main public functions one to create a pool state object, and the other to update such an object by a given number of seconds. It is in the body of update method that I create a pool of points for a display object in the pool, and the create methods is where I create this pool of objects and call the update method for the first time. The update method will then be called outside of this in a main app loop function in the main javaScript file of the example that I will be getting to later.

```js
var pool = (function(){
 
    var api = {};
 
    var colors = ['blue', 'red', 'white', 'green', 'lime', 'orange']
    var setColor = function(state, obj){
        obj.color = colors[Math.floor(Math.random() * colors.length)];
    };
 
    var setAlpha = function(state, obj){
        obj.alpha = 1 - obj.d / state.maxDist;
    };
 
    var setDistance = function(state, obj){
        var cx = state.canvas.width / 2,
        cy = state.canvas.height / 2;
        obj.d = utils.distance(obj.x, obj.y, cx, cy);
    };
 
    // appy bounds
    var bounds = function(state, obj){
        var cx = state.canvas.width / 2,
        cy = state.canvas.height / 2;
        if(obj.d > state.maxDist){
            var a = Math.atan(cy - obj.y, cx - obj.x);
            obj.x = cx + Math.cos(a) * ( state.maxDist - 10 );
            obj.y = cy + Math.sin(a) * ( state.maxDist - 10 );
            //obj.d = utils.distance(obj.x, obj.y, cx, cy);
            setDistance(state, obj);
        }
    };
 
    api.update = function (state, secs) {
        var i = state.pool.length,
        cx = state.canvas.width / 2,
        cy = state.canvas.height / 2,
        obj;
        while (i--) {
            obj = state.pool[i];
            // move by heading and pps
            obj.x += Math.cos(obj.heading) * obj.pps * secs;
            obj.y += Math.sin(obj.heading) * obj.pps * secs;
            setDistance(state, obj); // set distance
            bounds(state, obj);      // do a bounds check
            setAlpha(state, obj);     // set the alpha value
            obj.facing += obj.facingDelta * secs;
            obj.facing = utils.mod(obj.facing, Math.PI * 2);
            obj.points = starMod.create1({
                pointCount: obj.pointCount,
                radius: obj.r1,
                radiusInner: obj.r2,
                radianAjust: obj.heading
            });
        }
    };
 
    api.createState = function (opt) {
        opt = opt || {};
        var state = {
            ver: '0.0.0',
            maxDist: opt.maxDist || 50,
            canvas: opt.canvas,
            pool: []
        };
        var i = 0, star,
        len = opt.count || 10;
        while (i < len) {
            star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                pointCount: 5 + Math.round(5 * Math.random()),
                r1: 30 + Math.round(20 * Math.random()),
                r2: 10 + Math.round(10 * Math.random()),
                heading: Math.PI * 2 * Math.random(),
                facing: 0,
                facingDelta: -1 + 2 * Math.random(),
                pps: 16 + 64 * Math.random(),
                alpha: 1,
                color: 'blue',
                points: []
            };
            setColor(state, star);
            state.pool.push(star);
            pool.update(state, 0);
            i += 1;
        }
        return state;
    };
 
    return api;
 
}());

```

## 4 - The draw module

I then have some draw methods that I worked out that I made as part of an additional module following just th simple object literal pattern. One is to just draw a plain black background, and another is to draw an array of points.

```js
var draw = (function(){
    var radianToDegree = function(radian){
        return Math.floor(radian / (Math.PI * 2) * 360);
    };
    // draw direction helper
    var strokeDirHelper = function(ctx, obj, dir, radiusBegin, radiusEnd){
        radiusBegin = radiusBegin === undefined ? obj.r2 : radiusBegin;
        radiusEnd = radiusEnd === undefined ? obj.r1 : radiusEnd;
        ctx.beginPath();
        ctx.moveTo(
            obj.x + Math.cos(dir) * radiusBegin, 
            obj.y + Math.sin(dir) * radiusBegin);
        ctx.lineTo(
            obj.x + Math.cos(dir) * radiusEnd,
            obj.y + Math.sin(dir) * radiusEnd);
        ctx.stroke();
    };
    // draw star info
    var drawStarInfo = function(ctx, obj){
        ctx.fillStyle = 'rgba(128,128,128,0.2)';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('pos: ' + Math.floor(obj.x) + ', ' + Math.floor(obj.y), obj.x + 10, obj.y + 10);
        ctx.fillText('pps: ' + Math.floor(obj.pps), obj.x + 10, obj.y + 20);
        ctx.fillText('heading: ' + radianToDegree(obj.heading), obj.x + 10, obj.y + 30);
        ctx.fillText('facing: ' + radianToDegree(obj.facing), obj.x + 10, obj.y + 40);
    };
    // start public api
    var api = {};
    // draw background
    api.background = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // draw a star
    api.star = function(ctx, obj){
        ctx.fillStyle = obj.color || 'green';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.globalAlpha = obj.alpha;
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);
        api.points(ctx, obj.points, 0, 0);
        ctx.restore();
        // draw dir lines for heading and facing
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        strokeDirHelper(ctx, obj, obj.heading, obj.r1 * 0.5, obj.r1);
        strokeDirHelper(ctx, obj, obj.facing, 0, obj.r1 * 0.5);
        ctx.globalAlpha = 1;
        drawStarInfo(ctx, obj);
    };
    // draw points
    api.points = function (ctx, points, cx, cy) {
        cx = cx === undefined ? 0 : cx;
        cy = cy === undefined ? 0 : cy;
        ctx.save();
        ctx.translate(cx, cy);
        var i = 2,
        len = points.length;
        ctx.beginPath();
        ctx.moveTo(points[0], points[1]);
        while (i < len) {
            ctx.lineTo(points[i], points[i + 1])
            i += 2;
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    };
    api.ver = function(ctx, state){
        ctx.fillStyle = 'white';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
    };
    // return public api
    return api;
}());

```

## 5 - The Main.js file

Here in the main.js file of my star canvas example I am making use of all of the modules that I have covered to make a finished canvas project of sorts that looks kind of cool.

At the top of the file I am using the utils create canvas element to create a canvas element with all the various properties of the canvas set up just the way that I like it. When doing so I can also set the actual display width of the canvas, but not the scaled size of the canvas, that I like to do with CSS.

I then use my pool module to create a new main state object with a few properties that I have set with some hard coded settings, and I pass a reference to the canvas element while I am at it. AFter that I have my main app loop in which I am drawing the current state of the main pool state object, and calling the update method of the pool module to update that state.

```js
var canvasObj = utils.createCanvas({
    width: 640,
    height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
var state = pool.createState({
    count: 15,
    maxDist: 250,
    canvas: canvas
}),
lt = new Date();
 
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    state.pool.forEach(function(obj){
        draw.star(ctx, obj);
    });
    draw.ver(ctx, state);
    pool.update(state, secs);
    lt = now;
};
loop();
```

When this is up and running I get a bunch of stars moving around the canvas with all kinds of different properties for the number of points a star has as well as the color, facing direction, heading direction, and so forth. There are all kinds of additional things that come to mind with this so theer

## 6 - Conclusion

So this canvas example of a star module worked out pretty well, it was a nice little exercise at making stars for use in a canvas element. There is more than one method for making them both of which have to do with Math.cos and Math.sin that are used to find out points around a given origin point.

In this post I also touched basic on a number of other topics also, such as separating a module from a view by having the star module septate from the model that is used to draw the array of points to the canvas. With that said I hope that you picked up one or two  ore interesting things when it comes to canvas, and javaScriopt in general that can be applied to your own projects in the future.