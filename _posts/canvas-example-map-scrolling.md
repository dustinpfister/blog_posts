---
title: A Basic canvas map scrolling example
date: 2020-01-08 15:58:00
tags: [canvas]
categories: canvas
layout: post
id: 589
updated: 2021-03-10 16:04:08
version: 1.32
---

Time now for another one of my [canvas examples](/2020/03/23/canvas-example/), this time I think I will make a basic example of a scrolling map of tiles or cells as they some times may be called. This is something that will come into play for many any and all projects that involve a large 2d grid. Many strategy and rpg style games come to mind, but that of course is not even the tip of the iceberg with this.

So this will be a not so basic, basic getting started canvas example of a canvas map, and moving around such a map. So it might not be the best solution for large maps, as I have not put a lot of time into this to improve performance. It is not to hard to at least be aware of a concern of sorts though as the size of a map grows. The larger the map, the more cells there are, and as such the more there is to loop over when it comes to updating state and rendering. However in any case I will not be getting into that sort of thing in depth here as I would like to keep this example as simple as possible.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/map-scrolling/0.0.0/pkg.js"></script>

## 1 - The map module

So lets start out with the map module, I tired to make this module a little more functional rather that just making it a class. Not all the methods are pure functions as some of them will return references to objects within a gird object, but that is still the direction I started going with this module.

So it is used my calling a methods that will create a grid object, and then that grid object can be passed to many other methods in the module that will return various useful values.

### 1.1 - The start of the module and parse grid properties

I start off the module with just an object literal, all the methods are public so this kind of pattern will work for now. I then start off with a method that can be used to parse options for other methods that will be used to create a grid object.

```js
var g = {};
 
// CREATE A GRID OBJECT
 
// parse grid properties
g.parseGridProps = function (grid) {
    var a = {};
    a.width = grid.width || 64;
    a.height = grid.height || 16;
    a.cellSize = grid.cellSize || 32;
    a.xOffset = grid.xOffset === undefined ? 0 : grid.xOffset;
    a.yOffset = grid.yOffset === undefined ? 0 : grid.yOffset;
    a.bufferSize = grid.bufferSize === undefined ? 32 : grid.bufferSize;
    a.selectedCellIndex = grid.selectedCellIndex || -1;
    a.cells = [];
    return a;
};
```

This method might be berry off as a private helper method inside an IIFE module pattern. However I hate getting caught up in these issues, at this time I just want to get the general idea of this module together and move on.

### 1.2 - Create grid object methods

I then have methods that I use to create a grid object. I have one create grid object method that works by passing just width and hight values as arguments, that acts as a kind of wrapper method for another that actually creates the grid object.

``` 
// make and return a new grid object by just passing width and height values
g.createGridObject = function (w, h) {
    var a = g.parseGridProps({
            width: w,
            height: h
        });
    return g.createClearCellGrid(a);
};
 
// create a new grid object with blank cells by passing a given grid Object
g.createClearCellGrid = function (grid) {
    var a = g.parseGridProps(grid);
    // create clean cells
    var i = 0,
    x,
    y,
    len = a.width * a.height;
    while (i < len) {
        a.cells.push({
            i: i,
            x: i % a.width,
            y: Math.floor(i / a.width),
            type: 0, // type index (0 = sand , 1-5 = grass, 6-10 = wood),
            worth: 0
        });
        i += 1;
    }
    return a;
};
```

### 1.3 - Set bounds

I made one methods that can be used to set bounds for a grid object. This works by returning a set of new offset values only that can then be used to update a grid objects offset values outside of the module without mutating the given grid object.

```js
// BOUNDS
 
// return a set of clamped offset values for the given grid
g.clampedOffsets = function (grid, canvas) {
    canvas = canvas || {
        width: 320,
        height: 120
    };
    var w = grid.width * grid.cellSize,
    h = grid.height * grid.cellSize,
    bufferSize = grid.bufferSize,
    xMin = bufferSize,
    yMin = bufferSize,
    xMax = (w - canvas.width + bufferSize) * -1,
    yMax = (h - canvas.height + bufferSize) * -1,
    x = grid.xOffset,
    y = grid.yOffset;
    // rules
    x = x > xMin ? xMin : x;
    y = y > yMin ? yMin : y;
    x = x < xMax ? xMax : x;
    y = y < yMax ? yMax : y;
    // return offset values
    return {
        xOffset: x,
        yOffset: y
    };
};
```

### 1.4 - Get cell helpers

I then have a number of helpers that can be used to get a cell in the grid, or some other relevant value such as a grid position value from a canvas pixel position.

```
// GET CELL
 
// get a cell from the given cell position
g.get = function (grid, x, y) {
    if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
        return {};
    }
    return grid.cells[y * grid.width + x];
};
 
// get a cell position by way of a point on a canvas
g.getCellPositionFromCanvasPoint = function (grid, x, y) {
    return {
        x: Math.floor((x - grid.xOffset) / grid.cellSize),
        y: Math.floor((y - grid.yOffset) / grid.cellSize)
    };
};
 
// get a cell position by way of a point on a canvas
g.getCellFromCanvasPoint = function (grid, x, y) {
    var pos = g.getCellPositionFromCanvasPoint(grid, x, y);
    return g.get(grid, pos.x, pos.y);
};
```

### 1.5 - Movement

I made a get pointer movement deltas methods that will return a set of deltas that can be used to update offsets. This works by passing a grid object, along with a canvas, and an x and y pointer position.

```js 
// MAP MOVEMENT
 
// get a set of deltas
g.getPointerMovementDeltas = function (grid, canvas, px, py) {
    var cx = canvas.width / 2,
    cy = canvas.height / 2,
    a = Math.atan2(py - cy, px - cx),
    d = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2)),
    per,
    dMax = canvas.height / 2,
    delta
    d = d >= dMax ? dMax : d;
    per = d / dMax;
    delta = (0.5 + per * 2.5) * -1;
    return {
        x: Math.cos(a) * delta,
        y: Math.sin(a) * delta
    };
};
```

## 2 - The draw map method

The draw.js file for this canvas example consists of just a single draw method that I used to draw the current state of the map cells from a grid object to the given canvas. Nothing fancy for now for this canvas example at least, I just need to draw the cells of the grid and that is it.

```js
var drawMap = function (grid, ctx, canvas) {
    var colors = ['yellow', 'green'],
    cellSize = grid.cellSize || 10,
    x,
    y,
    xOffset = grid.xOffset,
    yOffset = grid.yOffset;
    grid.cells.forEach(function (cell) {
        ctx.fillStyle = colors[cell.type] || 'white';
        x = cell.x * cellSize + xOffset;
        y = cell.y * cellSize + yOffset;
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(x, y, cellSize, cellSize);
    });
 
    if (grid.selectedCellIndex > -1) {
        ctx.strokeStyle = 'red';
        var cell = grid.cells[grid.selectedCellIndex],
        x = cell.x * cellSize + xOffset,
        y = cell.y * cellSize + yOffset;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(x, y, cellSize, cellSize);
    }
};
```

In a more complex solution for this sort of thing I would break things down into sections to help improve performance when it comes to larger maps. However as long as I keep the map size small actually then this kind of solution should work okay.

## 3 - A utils module

I have been updating all of my canvas examples to make use of a single standard create canvas method to help me have some kind of standard when it comes to creating packages for my site here. This utility module is where I have place my usual create canvas method, along with my standard get canvas relative method. When it comes to other canvas examples I might have many other functions here that I might want to take with me to other projects, or share across more than one modules in a single project. However for this example there is not so much to write about that stands out from other canvas examples.

```js
var utils = {};
 
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

## 4 - The main.js file, and index.html

Now for the main javaScript file that makes use of the map module, and my draw method that will render the map object to the canvas. In this mainjs file I create the canvas element, and inject it into a container element that I have in my html.

I create a grid object with the create grid object method of my grid module that I covered earlier, and set the offset values for that object. I then update the offset values in the main app loop of this main.js file by delta values for x and y.

```js
// CANVAS
var canvasObj = utils.createCanvas({
   width: 320,
   height: 240
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
// scale
var ratio = window.devicePixelRatio || 1;
 
// CREATE GRID
var grid = g.createGridObject(12, 8);
grid.xOffset = 0;
grid.yOffset = 0;
 
var mousedown = false,
gridDelta = {
    x: 0,
    y: 0
};
 
// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    grid.xOffset += gridDelta.x * ratio;
    grid.yOffset += gridDelta.y * ratio;
 
    var offsets = g.clampedOffsets(grid, canvas, ratio);
    grid.xOffset = offsets.xOffset;
    grid.yOffset = offsets.yOffset;
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw map
    drawMap(grid, ctx, canvas, ratio);
    // draw ver
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px arial';
    ctx.fillText('v' + grid.ver, 5, canvas.height - 15);
};
loop();
 
// EVENTS
canvas.addEventListener('mousedown', function (e) {
    var pos = utils.getCanvasRelative(e);
    e.preventDefault();
    mousedown = true;
    var cell = g.getCellFromCanvasPoint(grid, pos.x / ratio, pos.y / ratio);
    if (cell.i === grid.selectedCellIndex) {
        grid.selectedCellIndex = -1;
    } else {
        if (cell.i >= 0) {
            grid.selectedCellIndex = cell.i;
        }
    }
});
canvas.addEventListener('mouseup', function (e) {
    e.preventDefault();
    mousedown = false;
    gridDelta.x = 0;
    gridDelta.y = 0;
});
canvas.addEventListener('mousemove', function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = (e.clientX - bx.left) * ratio,
    y = (e.clientY - bx.top) * ratio,
    deltas = g.getPointerMovementDeltas(grid, canvas, x, y);
    if (mousedown) {
        gridDelta.x = deltas.x;
        gridDelta.y = deltas.y;
    }
});
```

Then I just need to pull everything together with just a little html. I will want at least a container area for the canvas element to be injected into, and then script tag links to all the fies that I have work out for this project.

```html
<html>
    <head>
        <title>canvas example map scrolling</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/map.js"></script>
        <script src="./lib/draw_map.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So when I have this canvas example up and running in my web browser I have a grid that I can scroll around with by clicking and dragging. The basic idea is very much there, but this is still not really a done deal when it comes to just this sort of thing alone when it comes to making a project that would make use of something like this. There is the means by which I scroll around for one thing where I might want to add additional ways to go about moving the may around. There is also making a better system that might work well with larger maps that would work by6 breaking things down into map sections and so forth. Never the less the basic idea that I had in mind for the sake of this canvas example post is there for what it is worth.

## 5 - Conclusion

So hopefully this canvas example helps with some of the basics of making a large map however there is much more work to be done when it comes to making a project that involves a much larger map. There will come a time when working on a project with a large map that something will have to be done to break things down with respect to how to go about rendering the map to the canvas as well as how to go about updating the contents of the map.

There are a number of other canvas examples that I have made thus far that involve scrolling around on a map, it is just that this is one example where the focus is just on this one little aspect of canvas powered game design. Other canvas examples that I have made that involve a scrolling map include my [idle map game](/2020/01/13/canvas-example-game-map-idle) that I started.