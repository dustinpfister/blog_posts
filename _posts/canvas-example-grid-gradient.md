---
title: Canvas example of a gradient grid
date: 2020-03-26 18:46:00
tags: [canvas]
categories: canvas
layout: post
id: 636
updated: 2020-04-04 08:54:08
version: 1.8
---

When working with a canvas element there are ways to quickly paint a [gradient](https://en.wikipedia.org/wiki/Gradient) to the canvas but todays [canvas example](/2020/03/23/canvas-example/) is about making something a little more fun and interesting. It involves having a bunch of objects that are used to set color channel values for each grid cell that is a model object that is then drawn to the canvas resulting cool color gradient effect.

I went a little overboard with this example, making a plug in system and a few plug ins that have to do with the behavior of these objects and how the grid gradient changes.

<!-- more -->


## 1 - Starting off with a utils module for the grid gradient canvas example.

With many of these canvas examples of mind I have a utils.js file that contains some functions that I will be using in one or more modules. For this example it is just a distance formula and a mathematical modulo method.

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

The design of the gradient module that I made has two public methods one of Which is a Grid class, and the other is a load method that is used to load plug-ins that are used to define styles of behaviors for the objects.

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

### 2.1 - The init rand plugin

The plug ins are objects that contain collections of methods that are used to figure initial properties of objects, as well collections of methods that are used to update methods. The init rand plugin that I made is a way for me to abstract away much of the starting logic for the objects that I had built in early in development of this.

This plug-in just has init methods that set random values for object properties including position, heading, and color. I can use just one or two of them or all of them when using the Grid constructor later on.

```js
gradient.load({
 
    initMethods: {
        randomPos: function (obj, grad) {
            obj.x = grad.gridWidth * Math.random();
            obj.y = grad.gridHeight * Math.random();
        },
        randomColor: function (obj, grad, i) {
            var r = Math.random(),
            g = Math.random(),
            b = Math.random(),
            a = Math.random();
            obj.power = [r, g, b, a];
        },
        randomHeading: function (obj, grad, i) {
            var r = Math.PI * 2 * Math.random();
            obj.heading = r;
        },
        randomSpeed: function (obj, grad, i) {
            obj.cps = grad.MIN_CPS + (Math.random() * (grad.MAX_CPS - grad.MIN_CPS));
        },
        randomRadius: function (obj, grad, i) {
            obj.radius = grad.MIN_RADIUS + (Math.random() * (grad.MAX_RADIUS - grad.MIN_RADIUS));
        },
        // random
        random: function (obj, grad, i) {
            grad.initMethods.randomPos(obj, grad, i);
            grad.initMethods.randomColor(obj, grad, i);
            grad.initMethods.randomHeading(obj, grad, i);
            grad.initMethods.randomSpeed(obj, grad, i);
            grad.initMethods.randomRadius(obj, grad, i);
        }
    }
 
});
```

### 2.2 - The init RGB plugin

Here I have another plug-in with some init methods for the objects. It sets the color channel values for each object in a way in which there is an even number of objects with with red, or green, or blue channel values set to one while the others are set to zero. This way as the objects move around all other colors are possible depending on the position, size, and distance from each other as they move around. I think this kind of plug-in results in a cool effect, but I want to experiment with others, so I pulled it into a plug-in.

```js
gradient.load({
 
    initMethods: {
        updatersStager: function (obj, grad, i) {
            obj.objUpdaterIndex = u.mod(i, grad.objUpdaters.length);
        },
        rgb: function (obj, grad, i) {
            // cycle r,g,b color power
            var rand = Math.random() * 0.75 + 0.25,
            r = rand,
            g = 0,
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
            obj.power = [r, g, b, 1];
        }
    }
 
});
```

### 2.3 - radius_change, heading_change, and fixed_pos object update methods.

```js
gradient.load({
    objUpdaters: [
        // radius changes, slow speed
        function (grid, obj, secs) {
            //obj.power = [1, 0, 0];
            if (obj.radius === 3 || obj.radius === 10) {
                var roll = Math.floor(Math.random() * 50) + 1;
                if (roll === 1) {
                    obj.radiusDir = obj.radiusDir === 1 ? -1 : 1;
                }
            }
            obj.radius += 1 * secs * obj.radiusDir;
            obj.radius = obj.radius < 3 ? 3 : obj.radius;
            obj.radius = obj.radius > 10 ? 10 : obj.radius;
            obj.cps = 3;
        }
    ]
});
```

```js
gradient.load({
    objUpdaters: [
        // heading changes, fast speed
        function (grid, obj, secs) {
            //obj.power = [0, 0, 1];
            obj.heading += Math.PI / 180 * 5 * secs;
            obj.heading = u.mod(obj.heading, Math.PI * 2);
            obj.cps = 15;
        }
    ]
});
```

```js
gradient.load({
    objUpdaters: [
        // fixed position
        function (grid, obj, secs) {
            //obj.power = [0, 1, 0];
            obj.cps = 0;
        }
    ]
});
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