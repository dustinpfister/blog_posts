---
title: Pointer map movement logic canvas example
date: 2020-01-26 16:53:00
tags: [canvas]
categories: canvas
layout: post
id: 596
updated: 2021-03-06 15:34:18
version: 1.42
---

In this [canvas example](/2020/03/23/canvas-example/) I will be working out some logic that has to do with moving what could be a map by way of a pointer such as a mouse. So this example will not really be a game, animation, or anything to that effect, but it will be just a simple demo that makes use of a single module that can be used as a user interface type thing. Many canvas examples, mainly games will require some way to pan around a game map of sorts, so some kind of logic such as what I am going over here would need to be used to do so.

I will not be going over how to create a grid or map like state, I have wrote many posts on those subjects before this one. Instead I will just be writing about a module that I put together that just has to do with maintaining the state of an object that would be used to update a map position. So this canvas example will be fairly simple, and striped down, but that is the idea as I am just working out one little thing in this example rather than making a full blown canvas project.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pointer-movement/0.1.0/pkg.js"></script>

## 1 - The pointer movement module for the canvas example

In this canvas example I have a point that is treated as a map offset position, and then a pointer movement module state object \(pm\) that is used to update that map position point. This pm object has properties like angle, and distance that are used to find the direction, and rate of change for each update cycle or frame tick. This object can then be applied to another object such as a map offset position, or any kind of object that I would want to control with this kind of interface.

In addition to the properties of this Pointer Movement state object there will also be a need to have some methods to work with updating the state of the Pointer Movement object, as well as working with other related tasks. Tasks such as updating a Point with the Pointer Movement state, and working out events. I could make this a Class, but I prefer to not bother writing Classes that much these days. Instead I made this module in a way in which there is a method that is called to return a new Pointer Movement state, and then that state is passed to the other public methods.

There are also a few helper methods that are used internally in this module, along with the public methods that are returned and used outside of the module. The private methods are just used in this module as far as this canvas example is concerned, but if I where to continue working on this project chances are they would be pulled into a public module as well. In any case I still like to follow the IIFE pattern in module design when working out my own javaScript modules in native javaScript.

### 1.1 - The start of the public api, and the create new Pointer Movement state object

For this module there is no main function, so I just created an object literal for the public API. The first method that I made for this public API for the Pointer Movement module is a method that can be used to create a new Pointer Movement state object \(pm\). When calling the method I can pass a number of options to set values like this min and max distance, and max pixels per second value to use when updating the position of an object with this.

```js
var PM = (function () {
 
    var api = {};
 
    // new Pointer Movement State Object
    api.create = function (opt) {
        opt = opt || {};
        return {
            ver: '0.1.0',
            down: false,
            angle: 0,
            dist: 0,
            distMin: opt.distMin === undefined ? 16 : opt.distMin,
            distMax: opt.distMax || 64,
            per:0,
            PPS: 0,
            maxPPS: opt.maxPPS === undefined ? 128 : opt.maxPPS,
            sp: { // start point
                x: -1,
                y: -1
            },
            cp: { // current point
                x: -1,
                y: -1
            }
        };
    };
```

So then in a project where I would use this module this is the method I would use to create a pm state object. I can then pass that pm state object as an argument when it comes to using the additional methods in this module.

### 1.4 - Update a Pointer Movement state

I then need a method that I can used to update a Pointer Movement state that has a mutated current point. This method is used as a way to update the properties of the Pointer Movement state object, but not to mutate an object that the PM state object will be used to mutate, that is the responsibility of another method.

```js
    // update the pm based on startPoint, and currentPoint
    api.update = function (pm) {
        pm.dist = 0;
        pm.PPS = 0;
        pm.angle = 0;
        // set pm.dist
        pm.dist = utils.distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        // set pps and angle if dist is greater than min and pointer is down
        if (pm.down && pm.dist >= pm.distMin) {
            pm.per = (pm.dist - pm.distMin) / pm.distMax;
            pm.per = pm.per > 1 ? 1 : pm.per;
            pm.per = pm.per < 0 ? 0 : pm.per;
            pm.PPS = pm.per * pm.maxPPS;
            pm.angle = utils.mod(Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x), Math.PI * 2);
        }
    };
```

### 1.5 - Step a point by the current state of the Pointer Movement state

This method is what I can use to update a point with a Pointer Movement State object. I just pass the Point Movement object as the first argument, and then the point I want to mutate with the method. A third argument can then be used to pass an amount of time that has passed in seconds.

```js
    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt, secs) {
        secs = secs === undefined ? 1 : secs;
        pt.x += Math.cos(pm.angle) * pm.PPS * secs;
        pt.y += Math.sin(pm.angle) * pm.PPS * secs;
    };
```

### 1.5 - Event methods, and the end of the module

I then worked out some additional methods that can be used when attaching event handers in the main javaScript project that makes used of this module.

```js
    // when a pointer action starts
    api.onPointerStart = function (pm, e) {
        var pos = utils.getCanvasRelative(e);
        pm.down = true;
        pm.sp = {
            x: pos.x,
            y: pos.y
        };
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer action moves
    api.onPointerMove = function (pm, e) {
        var pos = utils.getCanvasRelative(e);
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer actions ends
    api.onPointerEnd = function (pm, e) {
        var pos = utils.getCanvasRelative(e);
        pm.down = false;
        pm.sp = {
            x: 0,
            y: 0
        };
        pm.cp = {
            x: 0,
            y: 0
        };
    };
 
    return api;
 
}
    ());
```

## 2 - The draw module

So now that I have my Pointer Movement module worked out I will want to produce some draw methods that can be used to draw the current state of this Pointer Movement object, as well as other things that have to do with this canvas example.

### 2.1 - The start of the module, and a draw background method

This draw javaScript file is just an object literal with a bunch of draw methods attached that need to have a drawing context passed as the first argument. The first draw method that I worked out is to just draw a plain black background when passed the drawing context and canvas.

```js
var draw = (function(){
 
    var api = {};
 
    api.background = function (pm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
```

### 2.2 - Just draw some grid lines draw method

I then want a draw method that just draws some grid lines on the canvas. In a real project I would have draw methods that render the current state of a map module. However getting into that would be a whole other post. For now I just need a draw method where I pass a point that is being mutated by my Point Movement state that is used to draw grid lines.

```js
    api.PTGridlines = function (pt, ctx, canvas) {
        var cellX = -1,
        cellY = -1,
        x,
        y;
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        while (cellX < 26) {
            x = cellX * 32 - pt.x % 32;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            cellX += 1;
        }
        while (cellY < 20) {
            y = cellY * 32 - pt.y % 32;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
            cellY += 1;
        }
    };
```

### 2.3 - Draw the navigation circle for the Pointer Movement state

This draw method helps to give a visual idea of what is going on with the Pointer Movement state. The draw nav method itself is fairly small but makes use of a few helper methods for drawing various parts of the interface. I broken things down into the base circle that is drawn, then a line that is drawn as well as another circle that is drawn on the line to show the current setting for speed as well as another helper to draw some basic into for the nav circle.

```js
    var draw_pm_circle = function(pm, ctx){
            ctx.beginPath();
            ctx.arc(pm.sp.x, pm.sp.y, pm.distMax / 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
    };
    var draw_pm_dir_line = function(pm, ctx){
            var x = Math.cos(pm.angle) * pm.distMax + pm.sp.x,
            y = Math.sin(pm.angle) * pm.distMax + pm.sp.y;
            ctx.beginPath();
            ctx.moveTo(pm.sp.x, pm.sp.y);
            ctx.lineTo(x, y);
            ctx.stroke();
    };
    var draw_pm_pps_circle = function(pm, ctx){
             // draw PPS circle
            var per = pm.PPS / pm.maxPPS,
            x = Math.cos(pm.angle) * pm.distMax * per + pm.sp.x;
            y = Math.sin(pm.angle) * pm.distMax * per + pm.sp.y;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.stroke();
    };
    var draw_pm_info = function(pm, ctx){
        var x = pm.sp.x + pm.distMax * 0.6,
        y = pm.sp.y + 10;
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillText('PPS: ' + Math.round(pm.PPS) + ' / ' + pm.maxPPS + ' ('+Math.round(pm.per*100)+'%)', x, y);
        ctx.fillText('A: ' + utils.radianToScale(pm.angle).toFixed(2), x, y + 12);
    };
    // draw a navigation circle when moving the map
    api.navCircle = function (pm, ctx, canvas) {
        if (pm.down) {
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'rgba(0,255,0,0.4)';
            ctx.lineWidth = 3;
            draw_pm_circle(pm, ctx);
            if(pm.PPS > 0){
                draw_pm_dir_line(pm, ctx);
                draw_pm_pps_circle(pm, ctx);
                draw_pm_info(pm, ctx);
            }
        }
    };
```

### 2.4 - Draw debug info

Another method that I use to just see the current state of some values of interest as I would on this canvas example is my draw debug into method. For now it is more or less just the map offset position that is the only value of interest outside of the pm object that I would like to keep an eye on. There is also the grid lines that should give some visual clue that my pm object is working the way that I want it to though.

```js
    api.debugInfo = function (pm, pt, ctx, canvas) {
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '20px arial';
        ctx.fillText('pos: ' + Math.floor(pt.x) + ', ' + Math.floor(pt.y), 10, 10);
        //ctx.fillText('PPS: ' + pm.PPS.toFixed(2) + '/' + pm.maxPPS, 10, 20);
    };
    api.ver = function (ctx, pm) {
        ctx.fillStyle = 'white';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('v' + pm.ver, 5, canvas.height - 15);
    };
 
    return api;
 
}());
```

I also have a simple draw ver method that will just draw the current version number of the pm object. This is something that I like to do with all of my canvas examples now so I know what the deal is when it comes to editing this post and all my other posts on canvas.

At the end of the draw module I then return the public api so the public methods can then be used in the main app loop of the example, or any state machine method that I might use this in when it comes to other canvas examples.

## 3 - The utils library

As I work on my canvas examples I have found that I should have a place to park methods that I will be using in more than one place within a project, and also that I might take with me to other canvas examples. I do not have a standard library for all my canvas examples but what I have been doing is having a utils lib that will change a little from one example to another.

For this example I am using my usual distance  formula in the pm module to get the distance between the start point and the current point in the canvas. I am also using the mathematical modulo method for the angle from the start point to the current point. I then have another function here that helps me with formating a radian to degrees when it comes to drawing info for the pm object.

I also have my create canvas method that I am making a single standard method for all canvas examples, this helps me to create and return a canvas element that has all the standard properties set just the way that I like it. I also have my typical get canvas relative method that helps me to get a point relative to the canvas rather than then window object of a web browser. This get canvas relative method is also fairly standard for all canvas examples that make use of pointer events with a mouse or touch screen.

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
utils.radianToScale = function(radian, scale){
    scale = scale === undefined ? 360 : scale;
    return radian / (Math.PI * 2) * scale;
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
// get canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

## 4 - The Main.js, and index.html files and getting the project up and running

Now to wrap everything together with a main.js file and some html. In this example I am using the Pointer Movement module to create an object that I will be using with the other public methods of the Pointer Movement module. For now it is just an example that will use the PM object to move a point that is then used to draw grid lines in a way that shows that there is movement. In a real project that make use of this I would be working with a real map module of some kind, but that would pull attention away from what I am just focusing on in this post here.

### 4.1 - main.js

Here I have the main.js file where I create and append a canvas element that will be used for this canvas example. I then create a new Pointer Movement state, and a point that will be used for what would be a map offset value. I then have a main app loop where I am calling my methods that are used to update the Pointer Movement state, and the point that is used for drawing grid lines. I then also have some event handers work out as well.

```js
var canvasObj = utils.createCanvas({ width: 640, height: 480}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
var pm = PM.create({
        distMin: 32,
        distMax: 128,
        maxPPS: 512
    });
 
// a point
var pt = {
    x: 0,
    y: 0
};
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    PM.update(pm);
 
    PM.stepPointByPM(pm, pt, secs);
 
    draw.background(pm, ctx, canvas);
    draw.PTGridlines(pt, ctx, canvas);
    draw.navCircle(pm, ctx, canvas);
    draw.debugInfo(pm, pt, ctx, canvas);
    draw.ver(ctx, pm);
    lt = now;
};
loop();
 
canvas.addEventListener('mousedown', function (e) {
    PM.onPointerStart(pm, e);
});
canvas.addEventListener('mousemove', function (e) {
    PM.onPointerMove(pm, e);
});
canvas.addEventListener('mouseup', function (e) {
    PM.onPointerEnd(pm, e);
});
canvas.addEventListener('touchstart', function (e) {
    PM.onPointerStart(pm, e);
});
canvas.addEventListener('touchmove', function (e) {
    PM.onPointerMove(pm, e);
});
canvas.addEventListener('touchend', function (e) {
    PM.onPointerEnd(pm, e);
});
```

### 4.2 - index.html

I then have an html file that pulls all of this together. In the body of the html or wherever I place this I am going to want to have a single div with an id of canvas app. This is what is used by my create canvas utility method as a mount point for the canvas element that is creates. I then just need to link to all the javaScript files if I am going to use the project this way. WHen it comes to builds they need to be built in the order in which the script tags are to make sure that I do not run into errors.

```js
<html>
    <head>
        <title>canvas example pointer movement</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/pm.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="./main.js"></script>
    </body>
</html>
```

## 5 - Conclusion

When this canvas Example is up and running I have grid lines drawn to the canvas. When I click and hold on the canvas the navigation circle shows up, at which point as I move the mouse pointer the state changes and so to does the state of the point object. The gird lines move in a way that is consistent with what I would expect.

So this is just a basic way of going about moving around a map that is consistent with how many games work where you click and drag from a center point and then the vector that is created as a result of movement from that point is used to create delta values that update x and y.
