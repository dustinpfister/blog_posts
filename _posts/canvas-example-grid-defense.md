---
title: A grid defense game canvas example
date: 2019-11-27 14:07:00
tags: [js, canvas]
layout: post
categories: canvas
id: 572
updated: 2019-11-27 14:13:54
version: 1.1
---

Time for another canvas example post to help me keep on track with the reasons why I started getting into javaScript to begin with, which is doing things that are fun, or at least interesting.

<!-- more -->


## 1 - A grid.js module to use with the grid defense canvas example

```js
// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    this.cells = [];
    // set cells for the grid
    this.setCells(opt.forCell);
};
// return a cell by index or x y cell position
Grid.prototype.getCell = function (ix, y) {
    var cell;
    if (arguments.length === 1) {
        cell = this.cells[ix];
    }
    if (arguments.length === 2 && ix >= 0 && ix < this.cellWidth) {
        cell = this.cells[y * this.cellWidth + ix];
    }
    return cell ? cell : false;
};
// return the cell at the given canvas relative x and y pixel position
// or false if out of range
Grid.prototype.getCellFromPoint = function (x, y) {
    var insideX = x >= this.xOffset && x <= this.xOffset + this.cellSize * this.cellWidth,
    insideY = y >= this.yOffset && y <= this.yOffset + this.cellSize * this.cellHeight;
    if (insideX && insideY) {
        return this.getCell(
            Math.floor((x - this.xOffset) / this.cellSize),
            Math.floor((y - this.yOffset) / this.cellSize));
    }
    return false;
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

## 2 - grid unit module

```js
// ENEMY OBJECT CLASS
var Enemy = function (opt) {
    this.board = opt.board || new UnitGrid();
    this.cell = opt.cell || {};
    this.ticksPerMove = 8;
    this.ticks = 0;
};
// update and enemy
Enemy.prototype.update = function (ticks) 
    this.ticks += ticks;
    // move to next
    if (this.ticks >= this.ticksPerMove) {
        var target = this.board.getCell(Math.floor(this.cell.x - 1), this.cell.y);
        if (target) {
            if (!target.enemy) {
                this.cell.enemy = false;
                target.enemy = this;
                this.cell = target;
            }
        } else {
            this.board.hits += 1;
            this.cell.enemy = false;
        }
        this.ticks = 0;
    }
};
// UNIT GRID CLASS
var UnitGrid = function (opt) {
    opt = opt || {};
    // same base properties
    Object.assign(this, new Grid(opt));
    this.maxEnemies = opt.maxEnemies || 5;
    this.tickRate = opt.tickRate === undefined ? 1000 / 4 : opt.tickRate;
    this.enemyCount = 0;
    this.lastTick = new Date();
    this.hits = 0; // times hit by an enemy
    this.kills = 0; // number of kills of enemies
};
UnitGrid.prototype = Object.create(new Grid());
// spawn a new enemy
UnitGrid.prototype.spawn = function () {
    if (this.enemyCount < this.maxEnemies) {
        var y = 0,
        len = this.cellHeight,
        options = [],
        cell;
        while (y < len) {
            cell = this.getCell(this.cellWidth - 1, y);
            if (!cell.enemy) {
                options.push(cell);
            }
            y += 1;
        }
        if (options.length > 0) {
            cell = options[Math.floor(Math.random() * options.length)];
            cell.enemy = new Enemy({
                    board: this,
                    cell: cell
                });
        }
    }
};
// update board
UnitGrid.prototype.update = function () {
    var i = 0,
    now = new Date(),
    t = now - this.lastTick,
    ticks = t / this.tickRate,
    len = this.cells.length,
    cell;
    // update cells if ticks >= 1
    if (ticks >= 1) {
        this.enemyCount = 0;
        while (i < len) {
            cell = this.cells[i];
            if (cell.enemy) {
                this.enemyCount += 1;
                cell.enemy.update(ticks);
            }
            i += 1;
        }
        this.spawn();
        this.lastTick = now;
    }
};
```

## 3 - draw

```js
// draw Cell Lines
var draw = {
    gridLineStyle: 'white',
    enemyFillStyle: 'red',
    textFill: 'yellow'
};
// clear the canvas
draw.cls = function (ctx, canvas) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw grid lines and enemies
draw.gridCellLines = function (grid, ctx) {
    var ci = 0,
    x,
    y,
    cell,
    cLen = grid.cells.length;
    while (ci < cLen) {
        cell = grid.cells[ci];
        x = cell.x * grid.cellSize + grid.xOffset + 0.5;
        y = cell.y * grid.cellSize + grid.yOffset + 0.5;
        ctx.strokeStyle = draw.gridLineStyle;
        ctx.strokeRect(x, y, grid.cellSize, grid.cellSize);
        if (cell.enemy) {
            ctx.fillStyle = draw.enemyFillStyle;
            ctx.fillRect(x, y, grid.cellSize, grid.cellSize);
        }
        ci += 1;
    }
};
// draw display
draw.disp = function (state, ctx) {
    var grid = state.grid;
    ctx.fillStyle = draw.textFill;
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('hits: ' + grid.hits + '; kills: ' + grid.kills, 10, 10);
};
```

## 4 - Main

```js
// SETUP CANVAS
(function () {
    var state = {
        grid: new UnitGrid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        })
    };
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;
    // single event handler
    canvas.addEventListener('click', function (e) {
        var bx = e.target.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        var cell = state.grid.getCellFromPoint(x, y);
        if (cell.enemy) {
            state.grid.kills += 1;
            cell.enemy = false;
        }
    });
    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        // update
        state.grid.update();
        // draw
        draw.cls(ctx, canvas);
        draw.gridCellLines(state.grid, ctx);
        draw.disp(state, ctx);
    };
    loop();
}
    ());
```