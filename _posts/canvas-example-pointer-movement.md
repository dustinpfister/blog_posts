---
title: Pointer map movement logic canvas example
date: 2020-01-26 16:53:00
tags: [canvas]
categories: canvas
layout: post
id: 596
updated: 2021-03-06 12:44:41
version: 1.30
---

In this [canvas example](/2020/03/23/canvas-example/) I will be working out some logic that has to do with moving what could be a map by way of a pointer such as a mouse. So this example will not really be a game, animation, or anything to that effect, but it will be just a simple demo that makes use of a single module that can be used as a user interface type thing. Many canvas examples, mainly games will require some way to pan around a game map of sorts, so some kind of logic such as what I am going over here would need to be used to do so.

I will not be going over how to create a grid or map like state, I have wrote many posts on those subjects before this one. Instead I will just be writing about a module that I put together that just has to do with maintaining the state of an object that would be used to update a map position. So this canvas example will be fairly simple, and striped down, but that is the idea as I am just working out one little thing in this example rather than making a full blown canvas project.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pointer-movement/0.1.0/pkg.js"></script>

## 1 - The pointer movement module for the canvas example

In this canvas example I have a point that is treated as a map offset position, and then a state that is used to update that map position point. This state object has properties like angle, and delta that are used to find the direction, and rate of change for each update cycle or frame tick. 

In addition to the properties of this Pointer Movement state object there will also be a need to have some methods to work with updating the state of the Pointer Movement object, as well as working with other related tasks. Tasks such as updating a Point with the Pointer Movement state, and working out events. I could make this a Class, but I prefer to not bother writing Classes that much these days. Instead I made this module in a way in which there is a method that is called to return a new Pointer Movement state, and then that state is passed to the other public methods.

There are also a few helper methods that are used internally in this module, along with the public methods that are returned and used outside of the module. The private methods are just used in this module as far as this canvas example is concerned, but if I where to continue working on this project chances are they would be pulled into a public module as well. In any case I still like to follow the IIFE pattern in module design when working out my own javaScript modules in native javaScript.

### 1.1 - The start of the module and the distance formula

I start off the module with the beginning part of an IIFE, and then have a distance formula as one of the helpers. This helper method will be used later on in the method that I use to update the values of a Pointer Movement state.

```js
var PM = (function () {
 
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
```

### 1.2 - Get a canvas relative position

Here I have another helper method that I needed for this module used in my pointer movement canvas example. I use it in my methods that are used in event handers to get the canvas relative position of a mouse click, or a touch event.

```js 
    // get canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect();
        return {
            x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
            y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
            bx: bx
        };
    };
```

This kind of method will work okay for this canvas example at least because I am not interested in doing anything with multitouch in this example. If you would like to read up more on this subject I have a [post in which I get into the issue of getting a canvas relative pointer position](/2020/03/04/canvas-get-point-relative-to-canvas/) in detail.

### 1.3 - The start of the public api, and the create new Pointer Movement state object

Now for the public methods, for this module there is no main function so I just created an object literal for the public API. the first method that I made for this public API for the Pointer Movement module is a method that can be used to create a new Pointer Movement state.

```js
    var api = {};
 
    // new Pointer Movement State Object
    api.newPM = function (opt) {
        opt = opt || {};
        return {
            ver: '0.0.0',
            down: false,
            angle: 0,
            dist: 0,
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

### 1.4 - Update a Pointer Movement state

I then need a method that I can used to update a Pointer Movement state that has a mutated current point. This method is used as a way to update the properties of the Pointer Movement state object, but not to mutate an object that the PM state object will be used to mutate, that is the responsibility of another method.

```js
    // update the pm based on startPoint, and currentPoint
    api.updatePM = function (pm) {
        pm.dist = 0;
        pm.PPS = 0;
        pm.angle = 0;
        if (pm.cp.x >= 0 && pm.cp.y >= 0) {
            pm.dist = distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        }
        if (pm.down && pm.dist >= 5) {
            var per = pm.dist / 64;
            per = per > 1 ? 1 : per;
            per = per < 0 ? 0 : per;
            pm.PPS = per * pm.maxPPS;
            pm.angle = Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x);
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
        var pos = getCanvasRelative(e);
        pm.down = true;
        pm.sp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer action moves
    api.onPointerMove = function (pm, e) {
        var pos = getCanvasRelative(e);
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer actions ends
    api.onPointerEnd = function (pm, e) {
        var pos = getCanvasRelative(e);
        pm.down = false;
        pm.sp = {
            x: -1,
            y: -1
        };
        pm.cp = {
            x: -1,
            y: -1
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
var draw = {};
 
draw.background = function (pm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
```

### 2.2 - Just draw some grid lines draw method

I then want a draw method that just draws some grid lines on the canvas. In a real project I would have draw methods that render the current state of a map module. However getting into that would be a whole other post. For now I just need a draw method where I pass a point that is being mutated by my Point Movement state that is used to draw grid lines.

```js
draw.PTGridlines = function (pt, ctx, canvas) {
    var cellX = -1,
    cellY = -1,
    x,
    y;
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    while (cellX < 11) {
        x = cellX * 32 - pt.x % 32;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        cellX += 1;
    }
    while (cellY < 8) {
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

This draw method helps to give a visual idea of what is going on with the Pointer Movement state.

```js
// draw a navigation circle when moving the map
draw.navCircle = function (pm, ctx, canvas) {
    if (pm.down) {
        var cx = pm.sp.x,
        cy = pm.sp.y,
        x,
        y,
        min = 64,
        per = 0,
        a = pm.angle;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        // draw circle
        ctx.beginPath();
        ctx.arc(cx, cy, min / 2, 0, Math.PI * 2);
        ctx.stroke();
        // draw direction line
        x = Math.cos(a) * min + cx;
        y = Math.sin(a) * min + cy;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        // draw PPS circle
        per = pm.PPS / pm.maxPPS;
        x = Math.cos(a) * min * per + cx;
        y = Math.sin(a) * min * per + cy;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
};

```

### 2.4 - Draw debug info

Another method that I use to just see the current state of some values of interest as I would on this canvas example.

```js
draw.debugInfo = function (pm, pt, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.fillText('pos: ' + Math.floor(pt.x) + ', ' + Math.floor(pt.y), 10, 10);
    ctx.fillText('PPS: ' + pm.PPS.toFixed(2) + '/' + pm.maxPPS, 10, 20);
};
 
draw.ver = function (ctx, pm) {
    ctx.fillStyle = 'white';
    ctx.font = '10px courier';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('v' + pm.ver, 5, canvas.height - 15);
};
```

## 3 - The Main.js, and index.html files and getting the project up and running

Now to wrap everything together with a main.js file and some html. In this example I am using the Pointer Movement module to create an object that I will be using with the other public methods of the Pointer Movement module. For now it is just an example that will use the PM object to move a point that is then used to draw grid lines in a way that shows that there is movement. In a real project that make use of this I would be working with a real map module of some kind, but that would pull attention away from what I am just focusing on in this post here.

### 3.1 - main.js

Here I have the main.js file where I create and append a canvas element that will be used for this canvas example. I then create a new Pointer Movement state, and a point that will be used for what would be a map offset value. I then have a main app loop where I am calling my methods that are used to update the Pointer Movement state, and the point that is used for drawing grid lines. I then also have some event handers work out as well.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var pm = PM.newPM({
        maxPPS: 256
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
    PM.updatePM(pm);
 
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

### 3.2 - index.html

I then have an html file that pulls all of this together.

```js
<html>
    <head>
        <title>canvas example pointer movement</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="pm.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 4 - Conclusion

When this canvas Example is up and running I have grid lines drawn to the canvas. When I click and hold on the canvas the navigation circle shows up, at which point as I move the mouse pointer the state changes and so to does the state of the point object. The gird lines move in a way that is consistent with what I would expect.

So this is just a basic way of going about moving around a map that is consistent with how many games work where you click and drag from a center point and then the vector that is created as a result of movement from that point is used to create delta values that update x and y.
