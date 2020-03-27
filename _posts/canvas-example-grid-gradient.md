---
title: Canvas example of a gradient grid
date: 2020-03-26 18:46:00
tags: [canvas]
categories: canvas
layout: post
id: 636
updated: 2020-03-27 15:47:11
version: 1.2
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

## 2 - The gradient.js module, and plugins

```js
// GRID
 
var gradient = (function () {
 
    // object update methods
    var objUpdaters = [];
 
    var initMethods = {
        objDefaults: function (obj, grad, i) {
            obj.x = 0;
            obj.y = 0;
            obj.radius = 5;
            obj.power = [1, 1, 1, 1];
            obj.cps = 0;
            obj.heading = 1;
            obj.objUpdaterIndex = 0;
            obj.radiusDir = 1;
        }
    };
 
    var Grid = function (opt) {
        opt = opt || {};
        var grad = this;
        grad.gridWidth = opt.gridWidth || 7;
        grad.gridHeight = opt.gridHeight || 6;
        grad.cellWidth = opt.cellWidth || 7;
        grad.cellHeight = opt.cellHeight || 6;
        grad.MIN_CPS = opt.MIN_CPS || 0.25;
        grad.MAX_CPS = opt.MAX_CPS || 1.5;
        grad.MIN_RADIUS = opt.MIN_RADIUS || 3;
        grad.MAX_RADIUS = opt.MAX_RADIUS || 5;
        grad.cells = [];
        grad.resetCells();
        grad.lt = new Date();
        grad.initMethods = initMethods;
        grad.objUpdaters = objUpdaters;
        // setup objects
        grad.objs = [];
        var i = opt.objCount || 5,
        rand,
        r,
        g,
        b;
        // create objects With init method(s)
        while (i--) {
            var obj = {};
            initMethods.objDefaults(obj, grad, i);
            if (opt.initMethod) {
                if (typeof opt.initMethod === 'string') {
                    initMethods[opt.initMethod](obj, grad, i);
                }
                if (typeof opt.initMethod === 'object') {
                    opt.initMethod.forEach(function (initMethodKey) {
                        initMethods[initMethodKey](obj, grad, i);
                    });
                }
            }
            grad.objs.push(obj);
        }
        // update for the first time
        grad.update();
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
                color: [0, 0, 0, 0]
            };
            this.cells.push(cellObj);
            ci += 1;
        }
    };
 
    Grid.prototype.capCellColors = function () {
        this.cells.forEach(function (cell) {
            var c = cell.color;
            c[0] = Math.floor(c[0] > 255 ? 255 : c[0]);
            c[1] = Math.floor(c[1] > 255 ? 255 : c[1]);
            c[2] = Math.floor(c[2] > 255 ? 255 : c[2]);
            c[3] = c[3] > 1 ? 1 : c[3];
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
            c[3] += per * obj.power[3];
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
            // call updater
            var updater = objUpdaters[obj.objUpdaterIndex];
            if (updater) {
                updater(grid, obj, secs);
            }
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
        // cap colors and set lt to now
        grid.capCellColors();
        grid.lt = now;
    };
 
    return {
        Grid: Grid,
        load: function (plug) {
            // load any init methods
            for (var key in plug.initMethods) {
                initMethods[key] = plug.initMethods[key];
            }
            // load any update methods
            objUpdaters = objUpdaters.concat(plug.objUpdaters || []);
        }
    };

}
    ());
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
    ctx.strokeStyle = 'black';
    while (ci < cLen) {
        cell = grid.cells[ci];
        c = cell.color;
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ')';
        ctx.beginPath();
        ctx.rect(
            cell.x * grid.cellWidth,
            cell.y * grid.cellHeight,
            grid.cellWidth, grid.cellHeight);
        ctx.stroke();
        ctx.fill();
        ci += 1;
    }
};
```

## 4 - Main

```js
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480
    ctx.translate(0.5, 0.5);
 
var w = 24,
h = 16;
var grad = new gradient.Grid({
        cellWidth: canvas.width / w,
        cellHeight: canvas.height / h,
        gridWidth: w,
        gridHeight: h,
        initMethod: ['random', 'rgb', 'updatersStager'],
        MIN_RADIUS: 3,
        MAX_RADIUS: 7,
        MAX_CPS: 5,
        objCount: 15
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    grad.update();
    draw.back(ctx, canvas);
    draw.cells(ctx, grad);
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas grid gradient</title>
    </head>
    <body>
        <canvas id="thecanvas" style="position:absolute;left:0px;top:0px;width:100%;height:100%;"></canvas>
        <script src="utils.js"></script>
        <script src="gradient.js"></script>
        <script src="plugins/init_rand.js"></script>
        <script src="plugins/init_rgb.js"></script>
        <script src="plugins/radius_change.js"></script>
        <script src="plugins/heading_change.js"></script>
        <script src="plugins/fixed_pos.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```