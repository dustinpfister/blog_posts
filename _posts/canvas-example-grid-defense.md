---
title: A grid defense game canvas example
date: 2019-11-27 14:07:00
tags: [js, canvas]
layout: post
categories: canvas
id: 572
updated: 2020-05-25 15:49:28
version: 1.21
---

Time for another [canvas example](/2020/03/23/canvas-example/) post to help me keep on track with the reasons why I started getting into javaScript to begin with, which is doing things that are fun, or at least interesting with canvas and javaScript. In goes without saying that canvas can be used in the creation and maintenance of more practical projects, but that is not what this example will be for sure. This canvas example will be of a very simple defense game that involves the use of a grid like the one I worked out in my other [canvas example](/2019/11/07/canvas-example-grid/) post on grids. It will also make used of an additional class that builds on top of a Grid class.

This will not be a tower defense game, or any such game that will involve path detection, as it will be the kind of simple defense game that involves units just moving from one side of the screen to another. Even with this style of game I will be keeping things as simple as possible to make it so this post does not go on forever.

There is of course diving into the more complex ideas that I have for canvas examples, but many of them are the kind of projects that might end up taking months or even years to develop. This idea is not one of those at all, and these kinds of projects are not necessary inferior to the more involved ideas for projects. The first step is to get the basic idea working, and then it is more about what I need to do to set it apart from all the other games that are like it.

<!-- more -->


## 1 - A grid.js module to use with the grid defense canvas example

Here Is the grid.js file for starters, this will be used as a base class that will then be extended into another class that will server as a game board of sorts for the canvas example. This file just outlines the base constructor of the Grid class, as well as a few prototype methods that have to do with creating grid cells, and getting grid cells.

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

I went for two get cell methods one that accepts cell index values, and the other that accepts canvas relative pixel values. So for this project that is all there is for the base grid class. This style of defense game is not going to be tower defense, enemies are just going to move from one side to the other so there is no need for path detection of anything to that effect.

## 2 - Grid unit module

So now for a more advanced class that extends the grid class, and an enemy class. The Unit Grid class extends the base Grid class that I went over in the previous section, and on top of that adds some additional methods that have to do with spawning and updating enemies.

The spawn method when called will place a new enemy in a cell that is all the way to the right side of the grid. If there number of enemies is at or above a set limit in the Unit Grid class instance the enemy will not spawn.

```js
// ENEMY OBJECT CLASS
var Enemy = function (opt) {
    this.board = opt.board || new UnitGrid();
    this.cell = opt.cell || {};
    this.ticksPerMove = 8;
    this.ticks = 0;
};
// update and enemy
Enemy.prototype.update = function (ticks) {
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

The update method will loop over all cells in the gird, and for now the only thing there is to update are enemies. So the update method just spawns new enemies, and updates any enemies on the board before hand.

## 3 - The draw module

Now to work out some draw methods for the game board, and to display some other basic info. I have a draw method that will just blank the screen, and then a draw method that will draw the grid lines, as well as the current enemies. I also have a draw method that will print some values of interest so far with the canvas example.

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

Now that I have my grid class, and drawing methods together I can now tie everything together with a main app loop, and other code that sets things up for the first time.

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

When this canvas example is up, running and working as expected the result is a very basic defense game of sorts. Display objects move from one side of the canvas to the other, and when I click on one it gets destroyed. So far it is not all that much fun or interesting, but oddly enough there are many such games like this that are fun and interesting that just have a little more going on then just this.

## 5 - Conclusion

So for now this canvas example of a basic defense game works okay, but there is much more to be done before this really starts to feel like a game. For example I would want to have it so the player can build some defense structures rather than just having it so the player clicks on the incoming enemy objects. I would also want to add some kind of in game money system for this also. Then of course there is a whole lot more work to do when it comes to skinning the display objects and so forth. Still for one of my canvas example posts I do aim to keep things simple, and the basic idea that I had in mind is there.