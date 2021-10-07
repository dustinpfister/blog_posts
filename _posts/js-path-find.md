---
title: Path finding with javaScript
date: 2019-08-27 12:42:00
tags: [js]
layout: post
categories: js
id: 528
updated: 2021-10-07 17:36:55
version: 1.38
---

In javaScript [path finding](https://en.wikipedia.org/wiki/Pathfinding) is a subject that will come up when making certain games and projects that require finding a path from one cell position to another in a 2d grid typically. It is a major part of game development when it comes to any style of game that requires such methods, as well as any kind of practical application also. 

There are many game frameworks that might have this built in, there are also well know javaScript dependencies such as [pathfinding.js](https://github.com/qiao/PathFinding.js/) that [can be used](https://qiao.github.io/PathFinding.js/visual/) to make quick work of this aspect of javaScript Game development by making it part of the applications dependences.

However pathfinding.js is a little bloated, it comes with a collection of methods for path finding rather than just one tired yet true solution. It is also true that pathfinding.js no longer appears to be supported, which is not always such a bad thing mind you. It is true that if something is not broken there might very well not be a need to fix it after all, that sort of things happens now and then and that might very well be the case with pathinging.js. 

Still there might be a need to work out a custom solution for path finding for a number of other reasons that might come up, including just making something that is a little lighter, so in this post I will be writing about making a custom path finding method in javaScript. I have not tested this solution extensively, but it is based off of what I have studied in pathfinder.js, and in any case it should still serve as a decent starting point for this sort of thing.

<!-- more -->

## 1 - Path finding and what to know first

This is a post on the subject of path finding in a javaScript environment. This is not in any way a kind of [getting started type post on javaScript in general](/2018/11/27/js-getting-started/) in the browser, or [nodejs](/2017/04/05/nodejs-helloworld/), so I assume that you have some background when it comes to javaScript programing. Also there is some more that you show be aware of when it comes to some things that might be required before working out things with path finding such as working out some kind of grid or map module to begin with.

### 1.1 - The score code examples here are on my github account

On github I have my test vjs repository which is where I park all my source code examples for blog posts such as this on javaScript in general. The source code examples for this post can be found in the [for post folder for this post on path detection](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-path-find) in that repository. I get around to editing my older posts on javaScript now and then and this post is no exception, so the latest state of the examples are there. In the event that something seems wrong with the source code that would also be where to go about making a pull request.

### 1.2 - Might want to come up with some kind of grid module first

Before getting into path finding I will first need some kind of [Grid module](/2021/08/20/js-javascript-example-grid-module). There are a bunch of ways of going about making this kind of module, however just about any gird module will consist of a 2d collection of objects in one form or another.

## 2 - Vanilla js path find solution example for nodejs

In this section I will be writing about my own js path fining solution that I put together after studying the source code of the PathFinding.js repository at github. I have not battle tested this, but the basic idea seems to work okay so far for what it is worth. 

The solution makes use of a grid that is created by another dependency that I am also going to go over in this section that has to do with creating and working with a Grid. Creating a Grid module is a whole other can of worms when it comes to javaScript projects that require this sort of module, but is also closely related to path finding so the two things need to work out okay with each other. So lets start out with the grid module and then get into the path finding solution for this section.

### 2.1 - Grid module

First off I need some kind of grid module, or at least decide on some kind of standard format for a grid. So then I worked out a module that will have a Class for what a single Node or tile if you prefer in a Grid, and of course a Grid class. I also worked out a number of other useful methods that I will want for this kind of module when it comes to making a path finding method of some kind. For example there is having a method that will return all of the nodes that border a given node which is an impotent first step for this sort of thing.

```js
// Node Constructor
var Node = exports.Node = function (opt) {
    var opt = opt || {};
    this.x = opt.x;
    this.y = opt.y;
    this.i = opt.i;
    this.walkable = opt.walkable === undefined ? true : opt.walkable;
    this.ti = opt.ti || 0; // tile index used to skin the tile
};
 
// Main Grid Constructor
var Grid = exports.Grid = function (opt) {
    opt = opt || {};
    this.w = opt.w || 8;
    this.h = opt.h || 6;
    this.nodes = [];
    this.buildCleanNodes();
};
 
// FromMatrix static method can be used to clone a Grid
Grid.fromMatrix = function (matrix) {
    var grid = new Grid({
            w: matrix[0].length,
            h: matrix.length
        });
    var y = 0,
    x,
    m;
    while (y < grid.h) {
        x = 0;
        while (x < grid.w) {
            m = matrix[y][x];
            grid.nodes[y][x] = new Node({
                    x: x,
                    y: y,
                    i: y * grid.w + x,
                    walkable: m.walkable,
                    ti: m.ti || 0
                });
            x += 1;
        }
        y += 1;
    }
    return grid;
};
 
// just build a clean array of nodes for the gird
Grid.prototype.buildCleanNodes = function (ti) {
    this.nodes = [];
    var y = 0,
    x,
    row;
    ti = ti === undefined ? 0 : ti;
    while (y < this.h) {
        x = 0;
        row = [];
        while (x < this.w) {
            row.push(new Node({
                    x: x,
                    y: y,
                    i: y * this.w + x,
                    walkable: true,
                    ti: ti
                }));
            x += 1;
        }
        this.nodes.push(row);
        y += 1;
    }
    return this.nodes;
};
 
// return true if the given x and y position is in bounds
Grid.prototype.isInBounds = function (x, y) {
    return (x >= 0 && x < this.w) && (y >= 0 && y < this.h);
};
 
Grid.prototype.isWalkable = function (x, y) {
    if (this.isInBounds(x, y)) {
        return this.nodes[y][x].walkable;
    }
    return false;
};
 
// get the four Neighbors of a node
Grid.prototype.getNeighbors = function (node) {
    var x = node.x,
    y = node.y,
    neighbors = [];
    if (this.isWalkable(x, y - 1)) {
        neighbors.push(this.nodes[y - 1][x]);
    }
    if (this.isWalkable(x, y + 1)) {
        neighbors.push(this.nodes[y + 1][x]);
    }
    if (this.isWalkable(x - 1, y)) {
        neighbors.push(this.nodes[y][x - 1]);
    }
    if (this.isWalkable(x + 1, y)) {
        neighbors.push(this.nodes[y][x + 1]);
    }
    return neighbors;
};
```

### 2.2 - Path finder Module

Here is the actual pathfinder module that I worked out bases very loosely on the [AStarFinder method of pathfinding.js](https://github.com/qiao/PathFinding.js/blob/master/src/finders/AStarFinder.js) with many changes. The basic idea of any path finding method is to start at one node location of a grid, get the neighboring nodes, and then find which node would be the best option to move to next. This process is then repeated until a path to an end node is obtained or it is found that getting there is not possible.

```js
let Grid = require('./grid.js').Grid;
 
// sort a list of open nodes
var sortOpen = function (open) {
    return open.sort(function (nodeA, nodeB) {
        if (nodeA.weight < nodeB.weight) {
            return 1;
        }
        if (nodeA.weight > nodeB.weight) {
            return -1;
        }
        return 0;
    });
};
 
// set weight for a node
var setWeight = function (endNode, neighbor) {
    return Math.sqrt(Math.pow(endNode.x - neighbor.x, 2) + Math.pow(endNode.y - neighbor.y, 2))
};
 
// build a path based an parent property
var buildPath = function (node) {
    var path = [];
    while (node.parent) {
        path.push([node.x, node.y]);
        node = node.parent;
    }
    path.push([node.x, node.y]);
    return path;
};
 
// for Each Neighbor for the given grid, node, and open list
var forNeighbors = function (grid, node, endNode, open) {
    var neighbors = grid.getNeighbors(node);
    var ni = 0,
    nl = neighbors.length;
    while (ni < nl) {
        var neighbor = neighbors[ni];
        // if the neighbor is closed continue looping
        if (neighbor.closed) {
            ni += 1;
            continue;
        }
        // set weight for the neighbor
        neighbor.weight = setWeight(endNode, neighbor);
        // if the node is not opened
        if (!neighbor.opened) {
            neighbor.parent = node;
            open.push(neighbor);
            neighbor.opened = true;
        }
        ni += 1;
    }
};
 
// Find path from start node to end node
module.exports = function (givenGrid, sx, sy, ex, ey) {
    // copy the given grid
    var grid = Grid.fromMatrix(givenGrid.nodes),
    path = [],
    open = [],
    node;
    // set startNode and End Node to copy of grid
    var startNode = grid.nodes[sy][sx];
    endNode = grid.nodes[ey][ex];
    // push start Node to open list
    open.push(startNode);
    startNode.opened = true;
    startNode.weight = 0;
    // start walking
    while (open.length > 0) {
        // pop out next Node from open list
        node = open.pop();
        node.closed = true;
        // if the node is the end node
        if (node === endNode) {
            return buildPath(node);
        }
        // loop current neighbors
        forNeighbors(grid, node, endNode, open);
        // sort the list of nodes be weight value to end node
        sortOpen(open);
    }
    // return an empty array if we get here (can not get to end node)
    return [];
};
```

### 2.3 - Helpers

So then I worked out some additional code to help with things like printing the state of a grid to the standard output of the console in a node project.

```js
let findPath = require('./find-path.js'),
os = require('os');
 
// print a grid
exports.print = (grid) => {
    var tiles = ['.', '+', 'S', 'E', '#'];
    grid.nodes.forEach((row) => {
        row.forEach((node) => {
            process.stdout.write(tiles[node.ti]);
        });
        process.stdout.write(os.EOL);
    });
};
 
// set the tile index value for the given path
exports.setTileIndexValuesforPath = (grid, path, ti) => {
    ti = ti === undefined ? 0 : ti;
    path.forEach((pt) => {
        let node = grid.nodes[pt[1]][pt[0]];
        node.ti = ti;
    });
};
 
// set the start and end point tile locations
exports.setStartEnd = (grid, sx, sy, ex, ey) => {
    let startNode = grid.nodes[sy][sx],
    endNode = grid.nodes[ey][ex],
    //p = grid.findPath(startNode, endNode);
    p = findPath(grid, sx, sy, ex, ey);
    this.setTileIndexValuesforPath(grid, p, 1);
    startNode.ti = 2;
    endNode.ti = 3;
};
```

### 2.4 - Using the lib

So now that I have my grid library and by path finder worked out I can now work out some examples that make use of it.

```js
let Grid = require('./grid/grid.js').Grid,
helpers = require('./grid/helpers.js');
 
let g = new Grid({
        w: 40,
        h: 8
    });
 
helpers.setStartEnd(g, 0, 0, 35, 7);
helpers.print(g);
```

```js
let Grid = require('./grid/grid.js').Grid,
findPath = require('./grid/find-path.js'),
helpers = require('./grid/helpers.js');
 
let g = Grid.fromMatrix([
    [{walkable: true,ti: 0},{walkable: false,ti: 4},{walkable: true,ti: 0},{walkable: true,ti: 0}],
    [{walkable: true,ti: 0},{walkable: false,ti: 4},{walkable: false,ti: 4},{walkable: true,ti: 0}],
    [{walkable: true,ti: 0},{walkable: true,ti: 0},{walkable: true,ti: 0},{walkable: true,ti: 0}],
    [{walkable: true,ti: 0},{walkable: false,ti: 4},{walkable: true,ti: 0},{walkable: true,ti: 0}],
]);
 
helpers.setStartEnd(g, 0, 0, 2, 0);
helpers.print(g);
```

## 3 - Client side javaScript and canvas

I Worked out a nodejs solution that seems to work okay, now I will just want to make another one that will work with canvas in client side javaScript. Also while I am at it I might do a few things a little different while I am at it as I am still trying to find out what would be a good grid module for me.

### 3.1 - The utils module

First off for this canvas example I have a general utilities library as its the case with just about all my other canvas examples and projects. For a good idea of what this kind of module is all about you might want to check out my [javaScript example post on a general utilities library](/2021/08/06/js-javascript-example-utils/). The basic idea is to just have a library where I can park various methods that I will want to use in one or more other files, and I can not thing of any other pace to park them for the moment.

```js
var utils = {};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
// depp clone
utils.deepCloneJSON = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
// create a canvas element
utils.createCanvas = function (opt) {
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
    opt.canvas.onselectstart = function () {
        return false;
    }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// get a canvas relative position that is adjusted for scale
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};
// create and return a canvas pointer event handler
utils.canvasPointerEventHandler = function (state, events) {
    return function (e) {
        var pos = utils.getCanvasRelative(e),
        handler = null;
        e.preventDefault();
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            handler = events['pointerStart'];
        }
        if (e.type === 'mousemove' || e.type === 'touchmove') {
            handler = events['pointerMove'];
        }
        if (e.type === 'mouseup' || e.type === 'touchend') {
            handler = events['pointerEnd'];
        }
        if (handler) {
            handler.call(e, e, pos, state);
        }
    };
};
// attach canvas pointer events
utils.canvasPointerEvents = function (canvas, state, events) {
    var handler = utils.canvasPointerEventHandler(state, events),
    options = {
        passive: false
    }
    canvas.addEventListener('mousedown', handler, options);
    canvas.addEventListener('mousemove', handler, options);
    canvas.addEventListener('mouseup', handler, options);
    canvas.addEventListener('touchstart', handler, options);
    canvas.addEventListener('touchmove', handler, options);
    canvas.addEventListener('touchend', handler, options);
};
```

### 3.2 - The grid module

So then here is my grid module based off of what I made for my javaScript example post on a grid module. It is more or less the same as what I worked out for my node example above, but I just made some changes to the source code of my grid module example to create one that has path finding.

This is a little tricky as the grid module that I made that I wanted to use for this example works by having all the cells, or nodes if you prefer in a single array, rather than an array of arrays. There are many user space libraries, as well as built in javaScript features that use this kind of standard for a 2d matrix. However the older path finding module that I made does not use this kind of standard, so I needed to make a chunk method that will convert one standard to another. In [lodash there is a chunk](/2017/09/13/lodash-chunk/) method that would be useful in these kinds of situations, but for this example I would like to stuck to vanilla javaScript only.

```js
(function (api) {
 
    // sort a list of open nodes
    var sortOpen = function (opened) {
        return opened.sort(function (nodeA, nodeB) {
            if (nodeA.weight < nodeB.weight) {
                return 1;
            }
            if (nodeA.weight > nodeB.weight) {
                return -1;
            }
            return 0;
        });
    };
 
    // set weight for a node
    var setWeight = function (endNode, neighbor) {
        return Math.sqrt(Math.pow(endNode.cellX - neighbor.cellY, 2) + Math.pow(endNode.cellY - neighbor.cellY, 2))
    };
 
    // build a path based an parent property
    var buildPath = function (node) {
        var path = [];
        while (node.parent) {
            path.push([node.cellX, node.cellY]);
            node = node.parent;
        }
        path.push([node.cellX, node.cellY]);
        return path;
    };
 
    // for Each Neighbor for the given grid, node, and open list
    var forNeighbors = function (grid, node, endNode, opened) {
        //var neighbors = grid.getNeighbors(node);
        var neighbors = gridMod.getNeighbors(grid, node);
        var ni = 0,
        nl = neighbors.length;
        while (ni < nl) {
            var neighbor = neighbors[ni];
            // if the neighbor is closed continue looping
            if (neighbor.closed) {
                ni += 1;
                continue;
            }
            // set weight for the neighbor
            neighbor.weight = setWeight(endNode, neighbor);
            // if the node is not opened
            if (!neighbor.opened) {
                neighbor.parent = node;
                opened.push(neighbor);
                neighbor.opened = true;
            }
            ni += 1;
        }
    };
 
    api.getPath = function (grid, sx, sy, ex, ey) {
        // copy the given grid
        //var grid = Grid.fromMatrix(givenGrid.nodes),
        var grid = utils.deepCloneJSON(grid),
        nodes = api.chunk(grid),
        path = [],
        opened = [],
        node;
        // set startNode and End Node to copy of grid
        var startNode = nodes[sy][sx];
        endNode = nodes[ey][ex];
        // push start Node to open list
        opened.push(startNode);
        startNode.opened = true;
        startNode.weight = 0;
        // start walking
        while (opened.length > 0) {
            // pop out next Node from open list
            node = opened.pop();
            node.closed = true;
            // if the node is the end node
            if (node === endNode) {
                return buildPath(node);
            }
            // loop current neighbors
            forNeighbors(grid, node, endNode, opened);
            // sort the list of nodes be weight value to end node
            sortOpen(opened);
        }
        // return an empty array if we get here (can not get to end node)
        return [];
    };
 
    // create a grid object
    api.create = function (opt) {
        opt = opt || {};
        var grid = {
            cellSelected: null, // selected cell ref
            cells: []
        };
        grid.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
        grid.w = opt.w === undefined ? 8 : opt.w;
        grid.h = opt.h === undefined ? 8 : opt.h;
        grid.xOffset = opt.xOffset === undefined ? 0 : opt.xOffset;
        grid.yOffset = opt.yOffset === undefined ? 0 : opt.yOffset;
        var i = 0,
        cell,
        len = grid.w * grid.h;
        while (i < len) {
            cell = {
                i: i, // store index for this cell
                cellX: i % grid.w, // grid index pos values as uppercase X, and Y
                cellY: Math.floor(i / grid.w),
                walkable: true,
                closed: false,
                data: {}
                // user data object
            };
            // cell pixel pos values as lowercase x, and y
            cell.x = grid.xOffset + cell.cellX * grid.cellSize;
            cell.y = grid.yOffset + cell.cellY * grid.cellSize;
            grid.cells.push(cell);
            i += 1;
        }
        return grid;
    };
 
    // get method
    api.get = function (grid, ix, y) {
        if (arguments.length === 1) {
            return grid.cells[ix];
        }
        return grid.cells[y * grid.w + ix];
    };
 
    // get a cell by the given pixel position
    api.getCellByPixlePos = function (grid, x, y) {
        var cellX = Math.floor((x - grid.xOffset) / grid.cellSize),
        cellY = Math.floor((y - grid.yOffset) / grid.cellSize),
        cell;
        if (cellX >= 0 && cellY >= 0 && cellX < grid.w && cellY < grid.h) {
            return grid.cells[cellY * grid.w + cellX];
        }
        return null;
    };
 
    // selected cell check
    api.selectedCheck = function (grid, x, y, onSelect, onUnselect) {
        var cell = api.getCellByPixlePos(grid, x, y);
        if (cell) {
            if (cell === grid.cellSelected) {
                onUnselect(cell, grid, x, y);
                grid.cellSelected = null;
            } else {
                if (grid.cellSelected) {
                    onUnselect(grid.cellSelected, grid, x, y);
                }
                grid.cellSelected = cell;
                onSelect(cell, grid, x, y);
            }
        } else {
            if (grid.cellSelected) {
                onUnselect(grid.cellSelected, grid, x, y);
                grid.cellSelected = null;
            }
        }
    };
 
    // get a chunk form of a grid
    api.chunk = function (grid) {
        var arr = [],
        row,
        i = 0;
        while (i < grid.cells.length) {
            row = grid.cells.slice(i, i + grid.w);
            arr.push(row);
            i += grid.w;
        }
        return arr;
    };
 
    // return true if the given x and y position is in bounds
    api.isInBounds = function (grid, x, y) {
        return (x >= 0 && x < grid.w) && (y >= 0 && y < grid.h);
    };
 
    // is the given cell location walkable?
    api.isWalkable = function (grid, x, y) {
        if (api.isInBounds(grid, x, y)) {
            return api.get(grid, x, y).walkable; //grid.nodes[y][x].walkable;
        }
        return false;
    };
 
    // get the four Neighbors of a node
    api.getNeighbors = function (grid, node) {
        var x = node.cellX,
        y = node.cellY,
        neighbors = [];
        if (api.isWalkable(grid, x, y - 1)) {
            //neighbors.push(this.nodes[y - 1][x]);
            neighbors.push(gridMod.get(grid, x, y - 1));
        }
        if (api.isWalkable(grid, x, y + 1)) {
            //neighbors.push(this.nodes[y + 1][x]);
            neighbors.push(gridMod.get(grid, x, y + 1));
        }
        if (api.isWalkable(grid, x - 1, y)) {
            //neighbors.push(this.nodes[y][x - 1]);
            neighbors.push(gridMod.get(grid, x - 1, y));
        }
        if (api.isWalkable(grid, x + 1, y)) {
            //neighbors.push(this.nodes[y][x + 1]);
            neighbors.push(gridMod.get(grid, x + 1, y));
        }
        return neighbors;
    };
}
    (this['gridMod'] = {}))
```

### 3.3 - The draw module

So then because This is a canvas project I often have a stand alone file for a few draw methods.

```js
var draw = {};
// draw a background
draw.background = function (sm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw the given grid object
draw.grid = function (grid, ctx, canvas) {
    grid.cells.forEach(function (cell) {
        ctx.fillStyle = cell.data.fillStyle || 'white';
        ctx.fillRect(cell.x, cell.y, grid.cellSize, grid.cellSize);
    });
};
```

### 3.4 - The main javaScript file

Now I just need a little more javaScript code to test out that my grid module with a find path method is working okay.

```js
var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    canvasObj: utils.createCanvas({
        width: 640,
        height: 480
    }),
    grid: gridMod.create({
        xOffset: 32,
        yOffset: 32
    }),
    currentState: 'game',
    states: {}
};
 
console.log(gridMod.chunk(sm.grid));
console.log(gridMod.get(sm.grid, 2, 2));
console.log(gridMod.getNeighbors(sm.grid, gridMod.get(sm.grid, 0, 0)));
 
//var path = gridMod.getPath(sm.grid, 0, 0, 2, 0); // ???
var path = gridMod.getPath(sm.grid, 1, 4, 5, 0);
 
path.forEach(function (pos) {
    //console.log(pos);
    var cell = gridMod.get(sm.grid, pos[0], pos[1]);
    cell.data.fillStyle = 'lime';
    console.log(cell);
 
})
 
var onSelected = function (cell, grid, x, y) {
    cell.data.fillStyle = 'red';
};
var onUnselected = function (cell, grid, x, y) {
    cell.data.fillStyle = 'white';
};
 
// game state
sm.states.game = {
    update: function (sm, secs) {},
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
        draw.grid(sm.grid, ctx, canvas);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            gridMod.selectedCheck(sm.grid, pos.x, pos.y, onSelected, onUnselected);
        },
        pointerMove: function (e, pos, sm) {},
        pointerEnd: function (e, pos, sm) {}
    }
};
 
utils.canvasPointerEvents(sm.canvasObj.canvas, sm, {
    pointerStart: function (e, pos, sm) {
        var state = sm.states[sm.currentState];
        var handler = state.events['pointerStart'];
        if (handler) {
            handler.call(e, e, pos, sm);
        }
    }
});
 
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000,
    state = sm.states[sm.currentState];
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        state.update(sm, secs);
        state.draw(sm, sm.canvasObj.ctx, sm.canvasObj.canvas);
        sm.lt = now;
    }
};
 
loop();
```

## 4 - Conclusion

So that is it for now at least when it comes to path finding and javaScript in general. There is much more to write about when it comes to this topic though of course. I have got around to working out two examples thus far that will work in nodejs, as well as in client side javaScript when it comes to doing something with a canvas element which is great. However it would seem that the module might need a little more work when it comes to how the choices are made, it will take some weird paths with certain combinations it would seem. However when I started working on this I did not want to make something that will be flawless, I just wanted something that works okay at least and it would seem that is what I have thus far.