---
title: Random Walk Stochastic process example
date: 2021-03-05 10:02:00
tags: [statistics]
layout: post
categories: statistics
id: 817
updated: 2021-03-05 13:47:39
version: 1.11
---

This will be yet another [Stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) example when it comes to working out some basic and maybe sometime not so basic examples of such a process in [statistics](https://en.wikipedia.org/wiki/Statistics), this time on a random walk which is an easy typical getting started type example.

The process of making this kind of random process is simple enough, it will typically include a module what will be used to create a grid, another to create a collection of objects in the grid, and a walk method that will be used to get delta values for an object. However maybe the main method to write about when it comes to this kind of project, and the central topic of the post would be the walk method. When it comes to having an object at a given point in a grid there is taking the next step in one of several directions, there is taking a completely random direction, and then there is taking the same direction over and over again.

<!-- more -->

## 1 - Working out a walk method

The first step here is to work out a simple walk method. This is a method where each time I call it, the method will return a set od delta values for x and y that will move an object in a grid in one of up to 8 possible directions. The default walk method will be built in and return a random number in the set of numbers of \[0,2,4,6\] which will mean right, down, left, and up. When calling the walk method I can give and object that is the object that is to move, along with another walk method, and a custom set of directions other than the built in default.

```js
var walk = (function(){
    // default dir movement array
    // [0,1,2,3,4,5,6,7] => 8 dir movement
    // [0,2,4,6];        => 4 dir movement
    // [6];              => always go up
    var default_dirs = [0,2,4,6];
    // built in walk methods
    var walkMethods = {
        // random dir
        rnd: function(obj, dirs){
            return dirs[Math.floor(Math.random() * dirs.length)];
        },
        // use a heading prop of an object, or default to 0
        useHeading: function(obj, dirs){
            return dirs[obj.heading] || 0;
        }
    };
    // Public API
    var api = function(obj, method, dirs){
        obj = obj || {x: 0, y: 0};
        dirs = dirs === undefined ? default_dirs : dirs;
        // call step method and get a d num (0-7)
        var d = method === undefined ? walkMethods.rnd(obj, dirs): method(obj, dirs);
        // convert to radian
        var radian = Math.PI * 2 / 8 * d;
        // use Sin And Cos to return delta values for x and y
        return {
            x: Math.round(Math.cos(radian)),
            y: Math.round(Math.sin(radian))
        };
    };
    // make walk methods public
    api.wm = walkMethods;
    // return public API
    return api;
}());
 
// random deltas
console.log(walk());
// always 4 ( { x: -1, y: 0 } )
console.log( walk({x:0, y:0, heading:1}, walk.wm.useHeading, [0, 4]) );
```

## 2 - A canvas example of this

Now that I have a walk method worked out I am going to want to create some additional modules, and scripts around it to ake use of it. I could make some kind of command line example of it using nodejs, but I generally like to make canvas examples first and foremost with this sort of thing.

### 2.1 - The Utils module for this canvas example

When I make a canvas example, or any kind of major javaScript project really, I like to have a general utility library. This is a place where I will place methods that I might use across more than one module in a project, and also methods that I might result across projects also.

```js
var utils = {};
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

### 2.2 - A Grid module

In this random process project I will want to have something that holds the state of a grid. This is the kind of module that I keep remaking over and over again, but never seem to get just right. So once Again I made this grid module from the ground up just for this example.

```js
var grid  = (function(){
    // create cells helper
    var createCells = function(grid){
        var cells = [];
        var i = 0,
        obj,
        len = grid.w * grid.h;
        while(i < len){
            obj = {
                i : i,
                X : utils.mod(i, grid.w),
                Y : Math.floor(i / grid.w)
            };
            obj.x = grid.xOffset + obj.X * grid.cellSize;
            obj.y = grid.yOffset + obj.Y * grid.cellSize;
            cells.push(obj);
            i += 1;
        }
        return cells;
    };
    var api = {};
    api.create = function(opt){
        opt = opt || {};
        var grid = {
            w : opt.w || 5,
            h : opt.h || 5,
            xOffset: opt.xOffset || 80,
            yOffset: opt.yOffset || 80,
            cellSize: opt.cellSize || 32,
            cells: []
        };
        grid.cells = createCells(grid);
        return grid;
    };
    // return public api
    return api;
}());
```

### 2.3 - The pool module

I am going to want to at least start something that will serve as a object pool module for this example. I wrote a post on this topic in general with my [canvas example post on object pools](/2020/07/20/canvas-example-object-pool/) where I got into this topic in detail. The general idea is to create a collection of objects just once, and then just reuse those object over and over again rather than creating and removing objects as needed. For this example I am just going to want at least one, but as many as a few objects for the sake of resting out my walk method.

```js
var poolMod = (function(){
    var api = {};
    api.create = function(opt){
        opt = opt || {};
        var obj = {
            x: opt.sx || 0,
            y: opt.sy || 0
        };
        var pool = {
            objects: [obj]
        };
        return pool;
    };
    // return public api
    return api;
}());
```

### 2.4 - The Walk module now

Now to hack over the walk module a little to add some features that I might want with this canvas example.

```js
var walk = (function(){
    // default dir movement array
    // [0,1,2,3,4,5,6,7] => 8 dir movement
    // [0,2,4,6];        => 4 dir movement
    // [6];              => always go up
    var default_dirs = [0,2,4,6];
    // clamp deltas
    var clampDelta = function(obj, delta, grid){
        delta.x = obj.x + delta.x < 0 ? 0: delta.x;
        delta.x = obj.x + delta.x >= grid.w ? 0: delta.x;
        delta.y = obj.y + delta.y < 0 ? 0: delta.y;
        delta.y = obj.y + delta.y >= grid.h ? 0: delta.y;
        return delta;
    };
    // built in walk methods
    var walkMethods = {
        // random dir
        rnd: function(obj, grid, pool, dirs){
            return dirs[Math.floor(Math.random() * dirs.length)];
        },
        // use a heading prop of an object, or default to 0
        useHeading: function(obj, grid, pool, dirs){
            return dirs[obj.heading] || 0;
        }
    };
    // Public API
    var api = function(obj, grid, pool, method, dirs){
        obj = obj || {x: 0, y: 0};
        grid = grid || {};
        pool = pool || {};
        dirs = dirs === undefined ? default_dirs : dirs;
        // call step method and get a d num (0-7)
        var d = method === undefined ? walkMethods.rnd(obj, grid, pool, dirs): method(obj, grid, pool, dirs);
        // convert to radian
        var radian = Math.PI * 2 / 8 * d;
        // use Sin And Cos to return delta values for x and y
        var delta = {
            x: Math.round(Math.cos(radian)),
            y: Math.round(Math.sin(radian))
        };
        // clamp deltas that will move an object out of a grid
        delta = clampDelta(obj, delta, grid);
        return delta;
    };
    // make walk methods public
    api.wm = walkMethods;
    // public dirs
    api.dirs = {
        four: default_dirs,
        eight: [0,1,2,3,4,5,6,7]
    };
    // return public API
    return api;
}());
```

### 2.5 - The draw module to render to a canvae element

This is a canvas example so I will want a module that will be used to render data in a main state object, to the canvas so I know what is going on. For now I have a draw background method, along with methods to draw the current state of the grid, and the pool of display objects that will be over the grid that are subject to called of the walk method in the min javaScript file of this example.

```js
var draw = (function(){
    var api = {};
    // draw background
    api.background = function(ctx, state, style){
        var canvas = state.canvasObj.canvas;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0,0, canvas.width, canvas.height);
    };
    // draw grid
    api.grid = function(ctx, state){
        var grid = state.grid;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'orange';
        grid.cells.forEach(function(cell){
            ctx.beginPath();
            ctx.rect(cell.x, cell.y, grid.cellSize, grid.cellSize);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        });
    };
    // draw pool
    api.pool = function(ctx, state){
        var pool = state.pool,
        grid = state.grid;
        ctx.save();
        ctx.translate(grid.xOffset, grid.yOffset);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'red';
        pool.objects.forEach(function(obj){
            var x = obj.x * grid.cellSize,
            y = obj.y * grid.cellSize;
            ctx.beginPath();
            ctx.rect(x, y, grid.cellSize, grid.cellSize);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        });
        ctx.restore();
    };
    // return public api
    return api;
}());
```

### 2.6 - The Main.js javaScript file

So then I have a utility library, a grid library, an object pool library, the walk method of course,and  a draw module to render things to a canvas. Now I just need a little more javaScript that will make use of all of this to create a main state object, and update that state in a main app loop method that will use the walk method, and draw current status of the pool and grid to the canvas element.

```js
(function(){
    // main app state
    var state = {
        canvasObj : utils.createCanvas({
            width: 640,
            height: 480
        }),
        grid: grid.create({
            w: 7,
            h: 7,
            xOffset: 320 - 64 * 3.5,
            yOffset: 240 - 64 * 3.5,
            cellSize: 64
        }),
        pool: poolMod.create({
            sx: 3,
            sy: 3
        })
    };
    // app loop
    var loop = function(){
        // walk object(s)
        var obj = state.pool.objects[0];
        var delta = walk(obj, state.grid, state.pool, walk.wm.rnd, walk.dirs.eight);
        obj.x += delta.x;
        obj.y += delta.y;
        // draw
        var ctx = state.canvasObj.ctx;
        draw.background(ctx, state);
        draw.grid(ctx, state);
        draw.pool(ctx, state);
    };
    loop();
    // click canvas to call loop
    state.canvasObj.canvas.addEventListener('click', function(e){
        loop();
    });
}());
```

## 3 - Conclusion

This was a fun little project, and there is still a lot more that could be done when it comes to making the canvas example that I made a little more involved. However I have so many other projects that are in need of some attention from me, and this is just one of so many others. Still what I worked out here should maybe turn into a canvas example of mine, I have made a few projects that make use of a grid and they have objects in them that move around on top of or as part of that grid. So this sort of thing can carry over into other projects.

