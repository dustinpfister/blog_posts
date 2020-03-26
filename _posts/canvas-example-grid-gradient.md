---
title: Canvas example of a gradient grid
date: 2020-03-26 18:46:00
tags: [canvas]
categories: canvas
layout: post
id: 636
updated: 2020-03-26 18:52:08
version: 1.1
---

When working with a canvas there are ways to quickly paint a gradient to the canvas but todays [canvas example](/2020/03/23/canvas-example/) is about making something a little more fun and interesting. It involves braking the canvas down into a grid, and then having a bunch of objects that are used to set color channel values for each grid cell resulting in a cool color gradient effect.

<!-- more -->


## 1 - utils

```js
// UTILS
var u = {};
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// Math mod and angle methods from
// https://github.com/infusion/Angles.js/blob/master/angles.js
u.mod = function mod(x, m) {
    return (x % m + m) % m;
};
```

## 2 - grid

```js
// GRID
var Grid = function (opt) {
    opt = opt || {};
 
    this.gridWidth = opt.gridWidth || 7;
    this.gridHeight = opt.gridHeight || 6;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    this.cells = [];
    this.resetCells();
    this.lt = new Date();
 
    // setup objects
    this.objs = [];
    var i = 9,
    rand,
    r,
    g,
    b;
    while (i--) {
        rand = Math.random() * 0.75 + 0.25;
        r = rand;
        g = 0;
        b = 0;
        if (u.mod(i, 2) === 0) {
            r = 0;
            g = 0;
            b = rand;
        }
        if (u.mod(i, 3) === 0) {
            r = 0;
            g = rand;
            b = 0;
        }
        this.objs.push({
            x: this.gridWidth * Math.random(),
            y: this.gridHeight * Math.random(),
            radius: 7,
            power: [r, g, b],
            cps: 4,
            heading: Math.PI * 2 * Math.random()
        });
    }
 
    this.update();
};
 
// setup reset cells
Grid.prototype.resetCells = function () {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.gridWidth * this.gridHeight;
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.gridWidth),
            x: ci % this.gridWidth,
            color: [0, 0, 0, 1]
        };
        this.cells.push(cellObj);
        ci += 1;
    }
};
 
Grid.prototype.capCellColors = function () {
    this.cells.forEach(function (cell) {
        var c = cell.color;
        c[0] = Math.floor(c[0] > 255 ? 255 : c[0]);
    });
}
 
var upCellColor = function (grid, cell, obj, x, y) {
    d = u.distance(cell.x, cell.y, x, y);
    if (d <= obj.radius) {
        var per = 1 - d / obj.radius;
        var c = cell.color;
        c[0] += Math.floor(255 * per * obj.power[0]);
        c[1] += Math.floor(255 * per * obj.power[1]);
        c[2] += Math.floor(255 * per * obj.power[2]);
    }
 
};
 
Grid.prototype.update = function () {
 
    var grid = this,
    now = new Date(),
    t = now - grid.lt,
    secs = t / 1000;
 
    // reset
    grid.resetCells();
    // increase color channel values for objects
    grid.objs.forEach(function (obj) {
        obj.x += Math.cos(obj.heading) * obj.cps * secs;
        obj.y += Math.sin(obj.heading) * obj.cps * secs;
        obj.x = u.mod(obj.x, grid.gridWidth);
        obj.y = u.mod(obj.y, grid.gridHeight);
        grid.cells.forEach(function (cell) {
 
            upCellColor(grid, cell, obj, obj.x - grid.gridWidth, obj.y);
            upCellColor(grid, cell, obj, obj.x + grid.gridWidth, obj.y);
            upCellColor(grid, cell, obj, obj.x, obj.y - grid.gridHeight);
            upCellColor(grid, cell, obj, obj.x, obj.y + grid.gridHeight);
            upCellColor(grid, cell, obj, obj.x - grid.gridWidth, obj.y - grid.gridHeight);
            upCellColor(grid, cell, obj, obj.x + grid.gridWidth, obj.y + grid.gridHeight);
            upCellColor(grid, cell, obj, obj.x - grid.gridWidth, obj.y + grid.gridHeight);
            upCellColor(grid, cell, obj, obj.x + grid.gridWidth, obj.y - grid.gridHeight);
 
            upCellColor(grid, cell, obj, obj.x, obj.y);
        });
    });
    grid.capCellColors();
 
    grid.lt = now;
 
};
```

## 3 - Draw

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// draw Cells
draw.cells = function (ctx, grid) {
    var ci = 0,
    cell,
    c,
    cLen = grid.cells.length;
    ctx.lineWidth = 3;
    while (ci < cLen) {
        cell = grid.cells[ci];
        c = cell.color;
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ')';
        ctx.beginPath();
        ctx.rect(
            cell.x * grid.cellWidth,
            cell.y * grid.cellHeight,
            grid.cellWidth, grid.cellHeight);
        //ctx.stroke();
        ctx.fill();
        ci += 1;
    }
};
```

## 4 - Main

```js
 
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var grid = new Grid({
        cellWidth: canvas.width / 30,
        cellHeight: canvas.height / 20,
        gridWidth: 30,
        gridHeight: 20
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    grid.update();
    draw.back(ctx, canvas);
    draw.cells(ctx, grid);
 
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas grid gradient</title>
    </head>
    <body>
        <canvas id="thecanvas"></canvas>
        <script src="utils.js"></script>
        <script src="grid.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```