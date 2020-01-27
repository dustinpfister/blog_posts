---
title: Pointer map movement logic canvas example
date: 2020-01-26 16:53:00
tags: [canvas]
categories: canvas
layout: post
id: 596
updated: 2020-01-27 05:54:18
version: 1.17
---

In this [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) I will be working out some logic that has to do with moving what could be a map by way of a pointer such as a mouse. Many canvas examples, mainly games will require some way to pan around a game map of sorts, so some kind of logic such as what I am going over here would need to be used to do so.

I will not be going over how to create a grid or map like state, I have wrote many posts on those subjects earlier. Instead I will just be writing about a module that I put together that just has to do with maintaining the state of an object that would be used to update a map position.

<!-- more -->

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

Here I have another helper method that I needed for this module used in my pointer movement canvas example. I use it in my methods that are used in event handers to get the canvas relative position of a mouse click.

```js 
    // get canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        return {
            x: x,
            y: y,
            bx: bx
        };
    };
```

### 1.3 - The start of the public api, and the create new Pointer Movement state object

Now for the public methods, for this module there is no main function so I just created an object literal for the public API. the first method that I made for this public API for the Pointer Movement module is a method that can be used to create a new Pointer Movement state.

```js
    var api = {};
 
    // new Pointer Movement State Object
    api.newPM = function () {
        return {
            down: false,
            angle: 0,
            dist: 0,
            delta: 0,
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

I then need a method that I can used to update a Pointer Movement state that has a mutated current point.

```js
    // update the pm based on startPoint, and currentPoint
    api.updatePM = function (pm) {
        pm.dist = 0;
        pm.delta = 0;
        pm.angle = 0;
        if (pm.cp.x >= 0 && pm.cp.y >= 0) {
            pm.dist = distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        }
        if (pm.down && pm.dist >= 5) {
            var per = pm.dist / 64;
            per = per > 1 ? 1 : per;
            per = per < 0 ? 0 : per;
            pm.delta = per * 3;
            pm.angle = Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x);
        }
    };
```

### 1.5 - Step a point by the current state of the Pointer Movement state

This method is what I can use to update a point with a Pointer Movement State object.

```js
    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt) {
        pt.x += Math.cos(pm.angle) * pm.delta;
        pt.y += Math.sin(pm.angle) * pm.delta;
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
    ctx.strokeStyle = 'white';
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
        // draw delta circle
        per = pm.delta / 3;
        x = Math.cos(a) * min * per + cx;
        y = Math.sin(a) * min * per + cy;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
};
```

### 2.4 - Draw debug info

```js
draw.debugInfo = function (pm, pt, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.fillText(pt.x + ', ' + pt.y, 10, 10);
}
```

## 3 - The Main.js, and index.html files and getting the project up and running

### 3.1 - main.js

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var pm = PM.newPM();
// a point
var pt = {
    x: 0,
    y: 0
};
 
var loop = function () {
    requestAnimationFrame(loop);
    PM.updatePM(pm);
    PM.stepPointByPM(pm, pt);
    draw.background(pm, ctx, canvas);
    draw.navCircle(pm, ctx, canvas);
    draw.debugInfo(pm, pt, ctx, canvas);
    draw.PTGridlines(pt, ctx, canvas);
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
```

### 3.2 - index.html

```js
<html>
    <head>
        <title>canvas example pointer movement</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="pm.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 4 - Conclusion

