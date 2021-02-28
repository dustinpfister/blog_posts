---
title: A Canvas example of an idle game that makes use of a map
date: 2020-01-13 19:01:00
tags: [canvas]
categories: canvas
layout: post
id: 591
updated: 2021-02-28 14:54:32
version: 1.33
---

Today I will be writing about yet another [canvas example](/2020/03/23/canvas-example/), this one will be an [idle game](https://en.wikipedia.org/wiki/Incremental_game) that makes use of a map or gird module. On top of the use of a grid module it will also make used of other modules, methods, and concepts that I have covered in other canvas example posts. It makes use of a [state machine](/2020/01/28/canvas-example-state-machine/) in the main app loop, and also a pointer movement module that I have worked out as yet another javaScript example that is closely tied to working with canvas.

In any case this canvas example will be a little involved, but I will have the whole state of the source code here as it was at the time of this writing. I might work on it more, or use it as a starting point for another project if I feel that this will be a good project that is worth more time. So for now lets take a look at what we have when it comes to this ma idle type canvas game example.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-map-idle/0.0.0/pkg.js"></script>

## 1 - The html file of this canvas example and overview of what is to come

So maybe for this example it will be best to start with the HTML file, and the order of the external javaScript files. I am using a small custom trailered utility library that has some functions that I use in other modules so of course that must be loaded first before anything else.

In addition to the utility lib I am also using a Pointer Movement module that is not so different from the other one that I worked out in another post. This module just stores the state of some properties like an angle, and distance that is then used to update a map offset object. When I was first making this project I had that functionally baked into the map module but now have found that is better to pull it out of there.

```html
<html>
    <head>
        <title>canvas example map idle</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="utils.js"></script>
        <script src="pm.js"></script>
        <script src="map.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

Speaking of the map module yes there is of course that which us used to create and store the state of a game map. There is a base object for each cell, and then an additional nested object for a building that is on the cell.

I then also have a draw module that is used to draw the current state of the map, as well as the state of the pointer movement state when navigating the map. The draw module is also used for displaying debug info on a per state basis for each state as at the time this was a work and progress.

Of course there is also a main.js file where the canvas element is created, and events are attached to the canvas. In addition this is where I have the state machine which I felt is needed for this canvas example to helper keep things better organized.

## 2 - utils

The utils module for this canvas example is just two methods. One is a distance formula that is used in my pointer movement module, and in the map module when it comes to setting a worth value for land tiles. The other method is something that I am using when it comes to event attachment that just converts a window relative value to a canvas relative position.

```js
var u = {};
 
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// get canvas relative point
u.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = (e.touches ? e.touches[0].clientX : e.clientX) - bx.left,
    y = (e.touches ? e.touches[0].clientY : e.clientY) - bx.top;
    e.preventDefault();
    return {
        x: x,
        y: y,
        bx: bx
    };
};
```

The general process here is that if a helper method is just used in one module I leave it in there. However if I find that I am suing that method in more than one module I may place it here, and then make this module a dependency of those modules.

## 3 - Pointer Movement module

So in this section I will be going over the Pointer Movement module for this canvas example. This is a module that is used for creating what I call a Pointer Movement state object that contains the current state of an angle, and delta value that can be used step a point object. 

In this canvas example the module is used to pan the map around by applying the state of a Pointer Movement state object to the map offset values. More on that later when I get to the map module and the main javaScript file.

### 3.1 - The beginning of the module and the newPm method

So I start off the module with the beginnings of an IIFE as a way of containing everything in a closure.

The first public method is a method that is used to create a new Pointer Movement state object. This object contains a down property that should be set true when the user does something like clicking down a mouse button. There are then properties for a start point and current point when a user pointer action is preformed.

There is then an angle and delta value that are used as a way to step a point by way of Math cos and sin. More on that a little later when I get to the method that is used to do just that.

```js
var PM = (function () {
 
    var api = {};
 
    // new Pointer Movement State Object
    api.newPM = function () {
        return {
            down: false,
            angle: 0,
            dist: 0,
            delta: 0,
            sp: { // start point
                x: -1,
                y: -1
            },
            cp: { // current point
                x: -1,
                y: -1
            }
        };
    };
```

### 3.2 - Update a PM state object

This is the main update method for a PM state object. This method should be used in a main app loop, or a tick method of sorts in the state in which a PM state object is being used.

```js
    // update the pm based on startPoint, and currentPoint
    api.updatePM = function (pm) {
        pm.dist = 0;
        pm.delta = 0;
        pm.angle = 0;
        if (pm.cp.x >= 0 && pm.cp.y >= 0) {
            pm.dist = u.distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        }
        if (pm.down && pm.dist >= 5) {
            var per = pm.dist / 64;
            per = per > 1 ? 1 : per;
            per = per < 0 ? 0 : per;
            pm.delta = per * 3;
            pm.angle = Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x);
        }
    };
```

### 3.2 - Step a point by a PM state

Here I have the method that I use to step a point object with an x and y property by the current state of a PM state object. I just pass the PM state object as the first argument, and then the point I want to step, followed by an option invert boolean.

```js
    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt, invert) {
        invert = invert === undefined ? false : invert;
        invert = invert ? -1 : 1;
        pt.x += Math.cos(pm.angle) * pm.delta * invert;
        pt.y += Math.sin(pm.angle) * pm.delta * invert;
    };
```

### 3.3 - Event Handlers

Then I have some event handers for helping with the process of updating a PM state object by way of events. these events are meant to be used in an event hander where a canvas relative position has been obtained before hand. This canvas relative position is then passed as a second arguments after the usual PM state is give as the first.

```js
    // when a pointer action starts
    api.onPointerStart = function (pm, pos, e) {
        pm.down = true;
        pm.sp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer action moves
    api.onPointerMove = function (pm, pos, e) {
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };
 
    // when a pointer actions ends
    api.onPointerEnd = function (pm, pos, e) {
        pm.down = false;
        pm.sp = {
            x: -1,
            y: -1
        };
        pm.cp = {
            x: -1,
            y: -1
        };
    };
 
    return api;
 
}
    ());
```

## 4 - The map module of this canvas example

This section will be one the map module that can be used to create a map or gird object that contains an array of cell objects for each cell in the grid.

### 4.1 - The parse grid properties helper

```js
var map = {};
 
// CREATE A GRID OBJECT
 
// parse grid properties
map.parseGridProps = function (grid) {
    var a = {};
    a.width = grid.width || 64;
    a.height = grid.height || 16;
    a.cellSize = grid.cellSize || 32;
    a.offset = {};
    a.offset.x = grid.xOffset === undefined ? 0 : grid.xOffset;
    a.offset.y = grid.yOffset === undefined ? 0 : grid.yOffset;
    a.bufferSize = grid.bufferSize === undefined ? 32 : grid.bufferSize;
    a.selectedCellIndex = grid.selectedCellIndex || -1;
    a.cells = [];
    // game logic
    a.money = 0; // player money
    a.lastUpdate = new Date();
    a.tickTime = 3000;
    return a;
};
```

### 4.2 - The create grid object method

This is the method that is used to create a new grid or map object if you prefer by passing a cell width and height value.

```js
// make and return a new grid object by just passing width and height values
map.createGridObject = function (w, h) {
    var a = map.parseGridProps({
            width: w,
            height: h
        });
    return map.createClearCellGrid(a);
};
 
// create a new grid object with blank cells by passing a given grid Object
map.createClearCellGrid = function (grid) {
    var a = map.parseGridProps(grid);
    // create clean cells
    var i = 0,
    x,
    y,
    len = a.width * a.height;
    while (i < len) {
        a.cells.push({
            i: i,
            x: i % a.width,
            y: Math.floor(i / a.width),
            type: 0, // type index (0 - 4 = sand, 5 - 9 = grass, 10 -14 = wood),
            worth: 0, // the value of the cell
            bought: true, // has the player bought the cell
            building: {}
            // the building object
        });
        i += 1;
    }
    return a;
};
```

### 4.3 - Set grid worth helper

This is a quick method that I made to just set a worth property for each cell. The reasoning is that each cell should have some kind of worth, or price that is used in the process of unlocking the cell, or influencing the rate at which a building on it is producing money.

```js
// GRID WORTH
 
// set grid worth for all cells from a fixed point outwards
// using a base
map.setGridWorth = function (grid, x, y, b) {
    x = x === undefined ? 0 : x;
    y = y === undefined ? 0 : y;
    b = b === undefined ? 2 : b;
    var i = grid.cells.length,
    d,
    cell;
    while (i--) {
        cell = grid.cells[i];
        d = u.distance(cell.x, cell.y, x, y);
        cell.worth = 1 + Math.pow(b, d);
    }
};
```

### 4.4 - Create a building

I will want a method that can be called to create a building from a list of building options when it comes to the player creating a new building on a cell with an empty object for its building property.

```js
// BUILDINGS
 
// create a building object at the given cell position
map.createBuilding = function (grid, x, y, index, buildOptions) {
    buildOptions = buildOptions || [{
                name: 'farm',
                moneyPerTick: 1
            }
        ];
    index = index === undefined ? 0 : index;
    var cell = map.get(grid, x, y);
    // should be an empty object if not building is there
    if (cell.building.index === undefined && cell.bought) {
        cell.building = Object.assign({
                index: index
            }, buildOptions[index]);
    }
};
```

### 4.5 - Clamp map offsets

I am going to have to worry about map offsets going out of bounds, so i will want something that will wrap or clamp the map offsets.

```
// BOUNDS
 
// return a set of clamped offset values for the given grid
map.clampedOffsets = function (grid, canvas) {
    canvas = canvas || {
        width: 320,
        height: 120
    };
    var w = grid.width * grid.cellSize,
    h = grid.height * grid.cellSize,
    bufferSize = grid.bufferSize,
    xMin = bufferSize,
    yMin = bufferSize,
    xMax = (w - canvas.width + bufferSize) * -1,
    yMax = (h - canvas.height + bufferSize) * -1,
    x = grid.offset.x,
    y = grid.offset.y;
    // rules
    x = x > xMin ? xMin : x;
    y = y > yMin ? yMin : y;
    x = x < xMax ? xMax : x;
    y = y < yMax ? yMax : y;
    // return offset values
    return {
        x: x,
        y: y
    };
};
```

### 4.6 - Get a cell methods

If I want to get a cell by index I can just use the index number with the array brackets syntax with the cell array property of a map object. However it would be nice to have some methods that can be used to abstract away some simple expressions that can be used to get a cell by a cell index position, or a canvas relative position from a mouse or touch event.

```js
// GET CELL
 
// get a cell from the given cell position
map.get = function (grid, x, y) {
    if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
        return {};
    }
    return grid.cells[y * grid.width + x];
};
 
// get a cell position by way of a point on a canvas
map.getCellPositionFromCanvasPoint = function (grid, x, y) {
    return {
        x: Math.floor((x - grid.offset.x) / grid.cellSize),
        y: Math.floor((y - grid.offset.y) / grid.cellSize)
    };
};
 
// get a cell position by way of a point on a canvas
map.getCellFromCanvasPoint = function (grid, x, y) {
    var pos = map.getCellPositionFromCanvasPoint(grid, x, y);
    return map.get(grid, pos.x, pos.y);
};
```

### 4.7 - update the map object

So now I have the main update method of this map module that can be passes a map object, and then update the current money value with what is there in terms of buildings.

```js
// UPDATE GRID
 
map.updateGrid = function (grid) {
    var now = new Date(),
    t = now - grid.lastUpdate,
    ticks = Math.floor(t / grid.tickTime),
    cell,
    i = grid.cells.length;
    if (ticks >= 1) {
        while (i--) {
            cell = grid.cells[i];
            if (cell.building.index >= 0) {
                //grid.money += cell.moneyPerTick * ticks;
                grid.money += cell.building.moneyPerTick * ticks;
            }
        }
        grid.lastUpdate = now;
    }
    grid.offset = map.clampedOffsets(grid, canvas);
};
```

## 5 - draw

This is a canvas example, so here is the draw module for this canvas example. Here I have all of the draw methods that are used to update the drawing context of the canvas element that is created and append in  the main javaScript file that I will be getting to in another section.

## 5.1 - draw state debug 

So I made a draw method that will render different debug info depending on the current state of the state machine that I will be getting to when covering main.js in a section coming up.

```js
var draw = (function () {
 
    var drawStateDebug = {
        nav: function (ctx, grid, states) {
            var pm = states.pm;
            ctx.fillText('pm.angle: ' + pm.angle, 10, 30);
            ctx.fillText('pm.down: ' + pm.down, 10, 40);
            ctx.fillText('pm.cp: ' + pm.cp.x, 10, 50);
        },
        land: function (ctx, grid) {
            var cell = grid.cells[grid.selectedCellIndex];
            ctx.fillText('index (x,y): ' + cell.i + ' (' + cell.x + ',' + cell.y + ')', 10, 20);
            ctx.fillText('worth: ' + cell.worth, 10, 30);
        },
        building: function (ctx, grid) {
            var cell = grid.cells[grid.selectedCellIndex],
            build = cell.building;
            ctx.fillText('index (x,y): ' + cell.i + ' (' + cell.x + ',' + cell.y + ')', 10, 20);
            ctx.fillText('worth: ' + cell.worth, 10, 30);
            ctx.fillText('name: ' + build.name, 10, 40);
            ctx.fillText('money per tick: ' + build.moneyPerTick, 10, 50);
        }
    };
```

## 5.2 - Draw cells

I will need some kind of draw method that will draw the current state of the map. For this canvas example I am working with small maps, and focusing on just getting the core of the game together. So with that said something that just loops over all the cells and draws them all at once each time will work okay for now.

```js
    // draw cells
    var drawCells = function (grid, ctx, canvas, pxRatio, xOffset, yOffset, cellSize) {
        var colors = ['yellow', 'green'];
        grid.cells.forEach(function (cell) {
            ctx.fillStyle = colors[cell.type] || 'white';
            x = cell.x * cellSize + xOffset * pxRatio;
            y = cell.y * cellSize + yOffset * pxRatio;
            ctx.fillRect(x, y, cellSize, cellSize);
            if (!cell.bought) {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(x, y, cellSize, cellSize);
            }
            if (cell.building.index >= 0) {
                ctx.fillStyle = 'red';
                ctx.fillRect(x, y, cellSize, cellSize);
            }
            ctx.strokeStyle = 'white';
            ctx.strokeRect(x, y, cellSize, cellSize);
        });
    };
```

## 5.3 - The start of the public api, draw background, and draw status info.

I start off the public api with just returning an object literal that will hold all the public draw methods that will be used in main.js. I started it off with a draw background method that will just black the canvas to a plain black background. I also added a draw grid status info method that is the start of a game play status bar of sorts, rather than debug info.

```js
    return {
 
        // draw background
        background: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        // draw status info bar
        gridStatusInfo: function (ctx, canvas, grid) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
            ctx.fillStyle = 'black';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = '15px courier';
            ctx.fillText('$' + grid.money.toFixed(2), 5, canvas.height - 15);
        },
```

## 5.4 - Draw build menu

Buildings are something that are created in this canvas example to increase the amount of money that the player gets over time. There is a state that the player will enter when a cell is clicked that contains no building, from there a build menu will be displayed that can be used to create a building on this land cell without a building.

So then I need a draw method that will render the current status of this build menu.

```js
        buildMenu: function (ctx, canvas, buildMenu) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(0, 0, 96, canvas.height);
            ctx.strokeStyle = 'rgba(255,0,0,0.5)';
            ctx.strokeRect(0, 0, 96, 96);
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.textAlign = 'center';
            ctx.fillText(buildMenu.buildOptions[0].name, 48, 32);
        },
```

## 5.5 - draw state debug info

Here I have the public method that will render the debug info for the current state, that makes use of the draw state debug object at the top of this draw module. I want to have it so that the first line is always the current state, followed by any additional info to draw if a draw debug info method for the current state is there.

```js
        stateDebugInfo: function (ctx, stateName, grid, states) {
            var state = drawStateDebug[stateName];
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.fillText('current state: ' + stateName, 10, 10);
            if (state) {
                state(ctx, grid, states);
            }
        },
```

## 5.6 - draw the map

Here is a draw method that will draw the current status of the map. It will of course call the draw cells method mentioned before hand, but will also draw the current selected cell if one is selected. 

```js
        map: function (grid, ctx, canvas, pxRatio) {
            var colors = ['yellow', 'green'],
            cellSize = grid.cellSize || 10,
            x,
            y,
            xOffset = grid.offset.x,
            yOffset = grid.offset.y;
            pxRatio = pxRatio || 1;
            cellSize = cellSize * pxRatio;
            ctx.lineWidth = 1;
            drawCells(grid, ctx, canvas, pxRatio, xOffset, yOffset, cellSize);
            if (grid.selectedCellIndex > -1) {
                ctx.strokeStyle = 'red';
                var cell = grid.cells[grid.selectedCellIndex],
                x = cell.x * cellSize + xOffset * pxRatio;
                y = cell.y * cellSize + yOffset * pxRatio;
                ctx.strokeStyle = 'red';
                ctx.strokeRect(x, y, cellSize, cellSize);
            }
        },
```

## 5.7 - draw the nav circle

Here I have a draw method that will render the current state of of a Pointer Movement state object. This is used in my navigation state in the state machine.

```js
        // draw a navigation circle when moving the map
        navCirclePM: function (pm, ctx, canvas) {
            var cx = pm.sp.x,
            cy = pm.sp.y,
            x,
            y,
            min = 64,
            per = 0,
            a = pm.angle;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            // draw circle
            ctx.beginPath();
            ctx.arc(cx, cy, min / 2, 0, Math.PI * 2);
            ctx.stroke();
            // draw direction line
            x = Math.cos(a) * min + cx;
            y = Math.sin(a) * min + cy;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
            // draw delta circle
            per = pm.delta / 3;
            x = Math.cos(a) * min * per + cx;
            y = Math.sin(a) * min * per + cy;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.stroke();
        }
 
    }
 
}
    ());
```

## 6 - main

Now for the main javaScriot file, here I create the canvas, attach events for the canvas, and define the state machine and main app loop which is also started here. This is also where I have what is begging to be another module for buildings, but for now it is just an object.

```js
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// BUILD MENU
var buildMenu = {
    yOffet: 0,
    buildOptions: [{
            name: 'farm',
            moneyPerTick: 1
        }
    ]
};
 
// STATE
var states = {
 
    currentState: 'init',
 
    grid: map.createGridObject(17, 13),
    pm: PM.newPM(),
 
    // ALWAYS STATE
    always: {
        tick: function () {
            // update and draw
            map.updateGrid(states.grid);
            draw.background(ctx, canvas); // background
            draw.map(states.grid, ctx, canvas); // the map
            draw.stateDebugInfo(ctx, states.currentState, states.grid, states);
        }
    },
 
    // INIT STATE
    init: {
        tick: function () {
            grid = states.grid;
            grid.offset = {
                x: grid.cellSize * grid.width / 2 * -1 + canvas.width / 2,
                y: grid.cellSize * grid.height / 2 * -1 + canvas.height / 2
            };
            map.setGridWorth(grid, 0, 0, 2);
            // starting building
            map.createBuilding(grid, 8, 6, 0);
            // enter disp state
            states.currentState = 'disp';
        }
    },
 
    // DISPLAY STATE
    disp: {
        tick: function () {
            PM.updatePM(states.pm);
            draw.gridStatusInfo(ctx, canvas, states.grid); // status bar
        },
        pointer: {
            start: function (pos, grid, e) {
                grid.mapMoveStartPoint = {
                    x: pos.x,
                    y: pos.y
                };
                PM.onPointerStart(states.pm, pos, e);
            },
            move: function (pos, grid, e) {
                // movement can trigger nave state
                PM.onPointerMove(states.pm, pos, e);
                if (states.pm.dist >= 32 && states.pm.down) {
                    states.currentState = 'nav';
                }
            },
            end: function (pos, grid, e) {
                // select a cell if not entering nav state
                var cell = map.getCellFromCanvasPoint(grid, pos.x, pos.y);
                if (cell.i === grid.selectedCellIndex) {
                    grid.selectedCellIndex = -1;
                } else {
                    if (cell.i >= 0) {
                        grid.selectedCellIndex = cell.i;
                        var cell = grid.cells[cell.i];
                        // if cell index enter building state
                        if (cell.building.index >= 0) {
                            states.currentState = 'building';
                        } else {
                            // else enter land state
                            states.currentState = 'land';
                        }
                    }
                }
            }
        }
    },
 
    // NAV STATE
    nav: {
        tick: function () {
            PM.updatePM(states.pm);
            draw.navCirclePM(states.pm, ctx, canvas);
            PM.stepPointByPM(states.pm, grid.offset, true);
        },
        pointer: {
            move: function (pos, grid, e) {
                PM.onPointerMove(states.pm, pos, e);
            },
            end: function (pos, grid, e) {
                PM.onPointerEnd(states.pm, pos, e);
                // return to disp
                states.currentState = 'disp';
            }
        }
    },
 
    land: {
        tick: function () {
            draw.buildMenu(ctx, canvas, buildMenu);
        },
        pointer: {
            end: function (pos, grid, e) {
                if (pos.x >= 96) {
                    grid.selectedCellIndex = -1;
                } else {
                    // create a building
                    if (pos.y <= 96) {
                        var buildIndex = 0,
                        cell = grid.cells[grid.selectedCellIndex];
                        map.createBuilding(grid, cell.x, cell.y, buildIndex, buildMenu.buildOptions);
                    }
                }
                PM.onPointerEnd(states.pm, pos, e);
                states.currentState = 'disp';
            }
        }
    },
 
    building: {
        tick: function () {},
        pointer: {
            end: function (pos, grid, e) {
                PM.onPointerEnd(states.pm, pos, e);
                if (pos.x >= 96) {
                    grid.selectedCellIndex = -1;
                    states.currentState = 'disp';
                }
            }
        }
    }
 
};
 
// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    states.always.tick();
    states[states.currentState].tick();
};
loop();
 
// EVENTS
var attachEvent = function (canvas, domType, smType) {
    canvas.addEventListener(domType, function (e) {
        var pos = u.getCanvasRelative(e);
        var stateObj = states[states.currentState];
        if (stateObj.pointer) {
            var handler = stateObj.pointer[smType];
            if (handler) {
                handler(pos, states.grid, e);
            }
        }
    });
};
attachEvent(canvas, 'mousedown', 'start');
attachEvent(canvas, 'mousemove', 'move');
attachEvent(canvas, 'mouseup', 'end');
```

## 7 - Conclusion

When this canvas example is up an running I have a map centered with a starting building in the very center. Every time a certain amount of time passes I am given an amount of money because of the starting building that is generating income for me. I can then click on a land cell to get a build menu to which I can then use to create another building at that cell. In the event there there is a building at a cell I enter a separate build state that is reserved for doing things with that building. Finally when I am in the default display state, I can click hold and drag to enter a navigation state that uses the Pointer Movement state object to update the map offsets and pan the map.