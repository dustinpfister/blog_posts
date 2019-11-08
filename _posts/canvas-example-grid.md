---
title: Canvas grid example view and model
date: 2019-11-07 17:33:00
tags: [canvas]
categories: canvas
layout: post
id: 558
updated: 2019-11-08 10:21:44
version: 1.5
---

Time for yet another canvas example, this time I am thinking just a basic [canvas grid](https://medium.com/@xon5/flexible-canvas-grid-without-blurred-lines-907fcadf5bfc) example. A grid is something that will come up all the time when it comes to all kinds of canvas projects, mainly games, but other projects as well. When it comes to grids there is drawing them, and then there is having a model of sorts that contains the values of the grid. In this example I will be starting out with a very simple Grid class example, and a single drawing method that just draws the grid lines of an instance of that grid class.

<!-- more -->

## 1 - Canvas grid basic example with draw grid lines method and basic Grid constructor

So in this section I will start out with a very basic Grid Constructor that will serve as a way to pull away the data state of the Grid away from the logic that is used to render that grid. In addition I will just have one draw method that will render the grid lines of the Grid. All other canvas examples in this post will just be improvements, additions, or just simply changes to this basic Canvas Grid example.

### 1.1 - The html file

```html
<html>
    <head>
        <title>canvas grid</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="main.js"></script>
    </body>
</html>
```

### 1.2 - The Grid constructor in main.js

```js
// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
};
```

### 1.3 - The Draw Grid Lines Method

```js
// draw grid lines method
var drawGridLines = function (ctx, grid, style) {
    var x,
    y,
    cx = 0,
    cy = 0;
    ctx.strokeStyle = style || 'red';
    while (cy < grid.cellHeight + 1) {
        y = cy * grid.cellSize + grid.yOffset + 0.5;
        x = grid.xOffset + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        x = grid.xOffset + grid.cellSize * grid.cellWidth + 0.5;
        ctx.lineTo(x, y);
        ctx.stroke();
        cy += 1;
    }
    while (cx < grid.cellWidth + 1) {
        y = grid.yOffset + 0.5;
        x = cx * grid.cellSize + grid.xOffset + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        y = grid.yOffset + grid.cellSize * grid.cellHeight + 0.5;
        ctx.lineTo(x, y);
        ctx.stroke();
        cx += 1;
    }
};
```

### 1.4 - Setup

```js
// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;
 
    // creating a grid instance
    var grid = new Grid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        });
 
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    // draw grid lines
    drawGridLines(ctx, grid, 'orange');
}
    ());
```

## 2 - An attempt at a draw grid axis method

```js
// Draw a grid Axis
var drawGridAxis = function (ctx, grid, axis, style) {
    axis = axis || 'y';
    var otherAxis = axis === 'y' ? 'x' : 'y',
    ca = 0,
    caOffset = grid[axis + 'Offset'],
    oaOffset = grid[otherAxis + 'Offset'],
    caLen = grid['cell' + (axis === 'y' ? 'Height' : 'Width')],
    oaLen = grid['cell' + (axis === 'y' ? 'Width' : 'Height')],
    a1,
    a2;
    ctx.strokeStyle = style || 'green';
    while (ca < caLen + 1) {
        a1 = ca * grid.cellSize + caOffset + 0.5;
        a2 = oaOffset + 0.5;
        ctx.beginPath();
        if (axis === 'y') {
            ctx.moveTo(a2, a1);
        } else {
            ctx.moveTo(a1, a2)
        }
        a2 = oaOffset + grid.cellSize * oaLen + 0.5;
        if (axis === 'y') {
            ctx.lineTo(a2, a1);
        } else {
            ctx.lineTo(a1, a2)
        }
        ctx.stroke();
        ca += 1;
    }
};
 
// Now by drawGridLines method just calls 
// drawGridLines twice
var drawGridLines = function(ctx, grid, style){
    drawGridAxis(ctx, grid, 'y', style);
    drawGridAxis(ctx, grid, 'x', style);
};
```

## 3 - Draw Canvas Grid Cells method and first Grid Constructor Prototype method

### 3.1 - The Canvas Grid Constructor

```js
// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    // set cells for the grid
    this.setCells();
};
 
// set cell objects for each cell in the grid
Grid.prototype.setCells = function (forCell) {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.cellWidth * this.cellHeight;
    forCell = forCell || function () {};
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.cellWidth),
            x: ci % this.cellWidth
        };
        forCell(cellObj);
        this.cells.push(cellObj);
        ci += 1;
    }
};
```

### 3.2 - The Draw Canvas Grid Cell Lines method

```js
// draw Cell Lines
var drawCellLines = function (ctx, grid, style) {
    var ci = 0,
    cell,
    cLen = grid.cells.length;
    ctx.strokeStyle = style || 'red';
    while (ci < cLen) {
        cell = grid.cells[ci];
        ctx.strokeRect(
            cell.x * grid.cellSize + grid.xOffset + 0.5,
            cell.y * grid.cellSize + grid.yOffset + 0.5,
            grid.cellSize, grid.cellSize)
        ci += 1;
    }
};
```