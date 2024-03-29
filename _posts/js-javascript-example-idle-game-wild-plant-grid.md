---
title: JavaScript While Plant Grid idle game prototype example
date: 2021-08-13 10:44:00
tags: [js]
layout: post
categories: js
id: 924
updated: 2021-11-21 17:17:12
version: 1.29
---

There is [getting started with javaSscript](/2018/11/27/js-getting-started/) and learning all kinds of various features to work with in a client side web development environment. However sooner or later One will need to get into making one or more actual projects with the skills acquired when learning to code. So I have mad a number of [javaScript example](/2021/04/02/js-javascript-example/) type post and this would be one of these such projects. This week I have been working on two projects that are additional game prototypes that might progress into some kind of final product. Today I will be writing on the current state of one of them that I am just calling wild plant grid idle for now. The general idea of the game was to just have a grid in which wild plants grow, and the player just harvests what is grown for points. These points can then be used to make improvements to the state of the grid.

So then this is yet another game prototype idea that I will add to the stack of my simple JavaScript example projects that are in various stats of completion. This is one of them where I did not get as far as I would like to have in part because of time, and focusing more so on the other project that I was working on this week.

<!-- more -->

## 1 - The utils module

First off here is the utils module that I have for this javaScript example that will contain a number of methods that I will be using thought the over all project. In other words this is the general utility module that I have made for this game that will differ a little from one project to a next when I make this kind of project. I have another [javaScript example in which I go over a general from of this utils module](/2021/08/06/js-javascript-example-utils/) that has many of the usual suspect methods that will end up in this module.

For this project I need a bounding box collection detection method to find out if a cell in the grid has been clicked or not. The rest of the methods that to do with quickly setting up a canvas element, and attaching event handers to it. For now that is more or less just about it, this module does also just serve as a general dumping ground for methods that I will be using across one or more modules, and I can not think of any other place to put the method. Often I might make some new additions when it comes to these kinds of methods, but not for this project it would seem.

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

## 2 - The grid module

Even If I do not work on this project any more one good thing that came out of this is coming up with a nice basic grid module. This is a module that I can use to create a base object for a grid, to which I can then use in my plant grid module that I will be getting to in a later section in this post. For now this module just has three public methods one of which is a create method that will just create and return a grid object. Another public method is to get a cell in the gird given a canvas relative pixel location, and I have another to select or deselect an orb.

When it comes to working out the nature of the grid object I went with a design where I have just an array of objects for each cell. I thought of using bounding box as a way to find what cell was clicked, but decided to instead go with expressions rather than looping.

```js
(function (api) {
    api.create = function (opt) {
        opt = opt || {};
        var grid = {
            cellSelected: null,
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
    // get a cell by the given pixel position
    api.getCellByPixlePos = function (grid, x, y) {
        var cellX = Math.floor( (x - grid.xOffset) / grid.cellSize ),
        cellY = Math.floor( (y - grid.yOffset) / grid.cellSize ),
        cell;
        if(cellX >= 0 && cellY >= 0 && cellX < grid.w && cellY < grid.h){
            return grid.cells[cellY * grid.w + cellX];
        }
        return null;
    };
    // selected cell check
    api.selectedCheck = function (grid, x, y, onSelect, onUnselect) {
        var cell = api.getCellByPixlePos(grid, x, y);
        if (cell) {
            if (cell === grid.cellSelected) {
                onUnselect(cell);
                grid.cellSelected = null;
            } else {
                if (grid.cellSelected) {
                    onUnselect(grid.cellSelected);
                }
                grid.cellSelected = cell;
                onSelect(cell);
            }
        } else {
            if (grid.cellSelected) {
                onUnselect(grid.cellSelected);
                grid.cellSelected = null;
            }
        }
    };
}
    (this['gridMod'] = {}))
```

There is a great deal more to write about when it comes to making this kind of module. Also this is the kind of module that I would like to just get solid for once and move on because I am getting tired of making this kind of module over and over again when it comes to starting a new vanilla javaScript project from the ground up. So I have wrote a [new post on another javaScript module where the focus is on making a solid grid module](/2021/08/20/js-javascript-example-grid-module/).

## 3 - The grid-plants module

Here I have the main module of interest when it comes to this game, where I am creating a grid with the grid module, but then creating some custom objects for each cell, and adding additional features that are specific to this game. So then at the top of the module I have a hard  coded object that is the beginnings of a hard coded plant database. I then have a public create method to create a plant grid object, and also a main update method of this module that I will be calling to update the state of this grid.

```js
(function (api) {
 
    var PLANTS = [
        // 0 - none
        {
            desc: 'none',
            minFert: 0,
            fillStyle: '#555500' // used as a base cell color
        },
        // 1 - grass
        {
            desc: 'Grass',
            minFert: 1,
            fillStyle: '#00aa00'
        }
    ]
 
    // create a new plant object for the given cell
    var createPlant = function (cell) {
        var plant = {
            def: PLANTS[cell.data.plantIndex]
        };
        return plant;
    };
 
    api.create = function () {
        var grid = gridMod.create({
                xOffset: 32,
                yOffset: 32
            });
        // start with one fertPoint
        grid.fertPoints = 1;
        // set some data for cells
        grid.cells.forEach(function (cell) {
            // fill style
            cell.data.fillStyle = 'lime';
            cell.data.fertPoints = 0;
            cell.data.plantIndex = 0; // the index of the current plant
            cell.data.plant = createPlant(cell);
        });
        return grid;
    };
 
    var onCellSelect = function (cell) {
        cell.data.fillStyle = 'red';
    };
    var onCellUnSelect = function (cell) {
        cell.data.fillStyle = 'lime';
    };
    api.selectedCheck = function (grid, x, y) {
        gridMod.selectedCheck(sm.game.grid, x, y, onCellSelect, onCellUnSelect);
    };
 
    // update
    api.update = function (grid, secs) {
        grid.cells.forEach(function (cell) {
            if (cell.data.plantIndex === 0 && cell.data.fertPoints >= 1) {
                cell.data.plantIndex = 1;
                cell.data.plant = createPlant(cell);
            }
        });
    };
 
}
    (this['gridPlantsMod'] = {}))
```

## 4 - The game module

It is a usual practice of mine to have a main game state object module. However when it comes to this game so far there is not much to write about with this module just yet.

```js
(function (api) {
 
    api.create = function () {
        var game = {};
        game.grid = gridPlantsMod.create({
                xOffset: 32,
                yOffset: 32
            });
        return game;
    };
 
}
    (this['gameMod'] = {}))
```

## 5 - The draw module

This is the current state of the draw module that is used to render things to the canvas element that is used for this.

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
        var plant = cell.data.plant;
        ctx.fillStyle = plant.def.fillStyle || 'white';
        ctx.fillRect(cell.x, cell.y, grid.cellSize, grid.cellSize);
        // debug text
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.fillText(cell.data.fertPoints, cell.x, cell.y);
    });
};
```

## 6 - The main JavaScript file

I then have a main javaScrit file where I have what is the beginnings of a state machine, and the main app loop.

```js
var sm = {
    secs: 0,
    fps: 30,
    lt: new Date(),
    canvasObj: utils.createCanvas({
        width: 640,
        height: 480
    }),
    game: gameMod.create(),
    currentState: 'game',
    states: {}
};
 
// game state
sm.states.game = {
    update: function (sm, secs) {
        gridPlantsMod.update(sm.game.grid, secs);
    },
    draw: function (sm, ctx, canvas) {
        draw.background(sm, ctx, canvas);
        draw.grid(sm.game.grid, ctx, canvas);
    },
    events: {
        pointerStart: function (e, pos, sm) {
            gridPlantsMod.selectedCheck(sm.game.grid, pos.x, pos.y);
            var cell = sm.game.grid.cellSelected;
            var delta = 1;
            if (cell && sm.game.grid.fertPoints >= delta) {
                sm.game.grid.fertPoints -= delta;
                cell.data.fertPoints += delta;
            }
        },
        pointerMove: function () {},
        pointerEnd: function () {}
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

## 7 - Conclusion

I did not put as much time into this prototype as I would have like to have, mainly because I have been working a lot more on my other prototype that is a game based off of [my orb module that I started a while back](/2021/04/09/js-javascript-example-orb-module/). In fact the current state of the game prototype that I am just calling orb match for now is a kind part of the [project folder for that module](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-orb-module). At this time I think this project should be shelfs so I can focus better on that project, however in the event that I get burnt out on that one maybe this project would be a good thing to get back into.

At this time I think I am going to need to focus on just one game at a time, and make these blog posts a weekly rather than daily thing for a while. The full vision of this game might not be that much more complex than what it currently is, but there is still a great deal more to work on with this before the example starts to even look like a done deal. The other project I was working on this week is in far better shape so far, so I will be working more so on that one for a while in the near future.