---
title: Canvas grid example view and model
date: 2019-11-07 17:33:00
tags: [canvas]
layout: post
id: 558
updated: 2019-11-07 17:39:05
version: 1.2
---

Time for yet another canvas example, this time I am thinking just a basic [canvas grid](https://medium.com/@xon5/flexible-canvas-grid-without-blurred-lines-907fcadf5bfc) example. A grid is something that will come up all the time when it comes to all kinds of canvas projects, mainly games, but other projects as well. When it comes to grids there is drawing them, and then there is having a model of sorts that contains the values of the grid. In this example I will be starting out with a very simple Grid class example, and a single drawing method that just draws the grid lines of an instance of that grid class.

<!-- more -->

## 1 - Canvas grid basic example

```js
// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset || 5;
    this.yOffset = opt.yOffset || 5;
    this.cellSize = opt.cellSize || 32;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
};
```

```
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

    // draw grid lines method
    var drawGridLines = function (ctx, grid) {
        var x,
        y,
        cx = 0,
        cy = 0;
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
    var grid = new Grid();
    drawGridLines(ctx, grid);
}
    ());
```