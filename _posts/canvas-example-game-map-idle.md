---
title: A Canvas example of an idle game that makes use of a map
date: 2020-01-13 19:01:00
tags: [canvas]
categories: canvas
layout: post
id: 591
updated: 2020-01-29 13:35:46
version: 1.2
---

Today I will be writing about yet another canvas example, this one will be an idle game that makes use of a map or gird module. On top of the use of a grid module it will also make used of other modules, methods, and concepts that I have covered in other posts. It makes use of a state machine in the main app loop, and also a pointer movement module that I have worked out as yet another javaScript example that is closely tired to working with canvas.

In any case this canvas example will be a little involved, but I will have the whole state of the source coded here as it was at the time of this writing. I might work on it more, or use it as a starting point for another project if I feel that this will be a good project that is worth more time.

<!-- more -->

## 1 -

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

## 2 - utils

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

## 3 - Pointer Movement module

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
 
    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt, invert) {
 
        invert = invert === undefined ? false : invert;
        invert = invert ? -1 : 1;
 
        pt.x += Math.cos(pm.angle) * pm.delta * invert;
        pt.y += Math.sin(pm.angle) * pm.delta * invert;
    };
 
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
 
        // draw debug info
        debugInfo: function (ctx, grid) {
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            var pt = grid.mapMoveStartPoint;
            ctx.fillText('startPos: (' + pt.x + ',' + pt.y + ')', 10, 10);
            ctx.fillText('moveDistance: ' + grid.moveDistance, 10, 20);
            ctx.fillText('moveDelta: ' + grid.moveDelta, 10, 30);
        },
 
        buildMenu: function (ctx, canvas, buildMenu) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fillRect(0, 0, 96, canvas.height);
            ctx.strokeStyle = 'rgba(255,0,0,0.5)';
            ctx.strokeRect(0, 0, 96, 96);
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.textAlign = 'center';
            ctx.fillText(buildMenu.buildOptions[0].name, 48, 32);
 
        },
 
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