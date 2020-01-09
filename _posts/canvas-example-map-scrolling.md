---
title: A Basic canvas map scrolling example
date: 2020-01-08 15:58:00
tags: [canvas]
categories: canvas
layout: post
id: 589
updated: 2020-01-08 19:46:20
version: 1.4
---

Time now for another one of my [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), this time I think I will make a basic example of a scrolling map. This is something that will come into play for many projects that are some kind of game that involves a large world map of cells or tiles.

<!-- more -->

## 1 - The map module


### 1.1 - The start of the module and parse grid properties

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

### 1.2 - Create grid object methods

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

## 3 - The main.js file

```js
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 120;
 
// CREATE GRID
var grid = g.createGridObject(16, 8);
grid.xOffset = canvas.width / 2 - grid.width * grid.cellSize / 2;
grid.yOffset = 0;
 
var mousedown = false,
gridDelta = {
    x: 0,
    y: 0
};
 
// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    grid.xOffset += gridDelta.x;
    grid.yOffset += gridDelta.y;
    var offsets = g.clampedOffsets(grid, canvas);
    grid.xOffset = offsets.xOffset;
    grid.yOffset = offsets.yOffset;
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw map
    drawMap(grid, ctx, canvas);
};
loop();
 
// EVENTS
canvas.addEventListener('mousedown', function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
    e.preventDefault();
    mousedown = true;
    var cell = g.getCellFromCanvasPoint(grid, x, y);
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
    x = e.clientX - bx.left,
    y = e.clientY - bx.top,
    deltas = g.getPointerMovementDeltas(grid, canvas, x, y);
    if (mousedown) {
        gridDelta.x = deltas.x;
        gridDelta.y = deltas.y;
    }
});
```