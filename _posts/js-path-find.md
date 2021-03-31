---
title: Path finding with javaScript
date: 2019-08-27 12:42:00
tags: [js]
layout: post
categories: js
id: 528
updated: 2021-03-31 11:13:43
version: 1.17
---

In javaScript [path finding](https://en.wikipedia.org/wiki/Pathfinding) is a subject that will come up when making certain games and projects that require finding a path from one cell position to another in a 2d grid typically. It is a major part of game development when it comes to any style of game that requires such methods, as well as any kind of practical application also. 

There are many game frameworks that might have this built in, there are also well know javaScript dependencies such as [pathfinding.js](https://github.com/qiao/PathFinding.js/) that [can be used](https://qiao.github.io/PathFinding.js/visual/) to make quick work of this aspect of javaScript Game development by making it part of the applications dependences.

However pathfinding.js is a little bloated, it comes with a collection of methods for path finding rather than just one tired yet true solution. It is also true that pathfinding.js no longer appears to be supported, which is not always such a bad thing mind you. It is true that if something is not broken there might very well not be a need to fix it after all, that sort of things happens now and then and that might very well be the case with pathinging.js. 

Still there might be a need to work out a custom solution for path finding for a number of other reasons that might come up, including just making something that is a little lighter, so in this post I will be writing about making a custom path finding method in javaScript. I have not tested this solution extensively, but it is based off of what I have studied in pathfinder.js, and in any case it should still serve as a decent starting point for this sort of thing.

<!-- more -->

## 1 - Vanilla js path find solution example for nodejs

In this section I will be writing about my own js path fining solution that I put together after studying the source code of the PathFinding.js repository at github. I have not battle tested this, but the basic idea seems to work okay so far for what it is worth. 

The solution makes use of a grid that is created by another dependency that I am also going to go over in this section that has to do with creating and working with a Grid. Creating a Grid module is a whole other can of worms when it comes to javaScript projects that require this sort of module, but is also closely related to path finding so the two things need to work out okay with each other. So lets start out with the grid module and then get into the path finding solution for this section.

### 1.1 - Grid module

First off I need some kind of Grid module, or at least decide on some kind of standard format for a grid.

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

### 1.2 - Path finder Module

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

### 1.3 - Helpers

So then I worked out some additional code to help with things like printing the state of a grid.

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

### 1.4 - Using the lib

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

## 2 - Conclusion

So that is it for now at least when it comes to path finding and javaScript in general. There is much more to write about when it comes to this topic though of course. I should in time work out a few canvas examples that make use of path finding, when doing so I am sure I will touch base on this post again and expand this content more.