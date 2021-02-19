---
title: Monster Smash canvas game example
date: 2020-08-17 11:21:00
tags: [canvas]
layout: post
categories: canvas
id: 695
updated: 2021-02-19 12:07:39
version: 1.11
---

I will be making at least a few more [canvas examples](/2020/03/23/canvas-example/) this summer, some of which I might continue developing if some people show interest in them. Last week I started working on one of many game prototype ideas that I am currently just calling Monster Smash. The general idea is not clear, aside from just some very vague concepts that have to do with just moving a player object inside a grid, and have enemies come to the location. I am thinking somewhat in terms of a kind or RPG style game like [Dragon Warrior](https://en.wikipedia.org/wiki/Dragon_Quest_%28video_game%29), the early [Pokemon games](https://en.wikipedia.org/wiki/Pok%C3%A9mon_Red_and_Blue), or some like of [Roguelike](https://en.wikipedia.org/wiki/Roguelike) game, but I am not so sure yet. That is okay though I can ways fork off of what I work out here as long as I get the very basic idea of what I want working.

I would like to have at least one canvas example that is just a nice little RPG style game where you move a player object around and battle enemies and level up. Nothing to ground breaking or exciting, just a nice little RPG like that of dragon warrior maybe.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/grid-game-monster-smash/0.2.0/pkg.js"></script>

## 1 - The utility library

To start things off I have a basic utility library for this canvas example. Here I have a distance formula, a method to get an angle to a point, and a method to help with getting a point relative to a canvas element rather than the window object.

```js
// UTILS
var utils = {};
// the distance formula
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// get angle from one point to another
utils.angleToPoint = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? Math.PI * 2 : scale;
    var aTan = Math.atan2(y1 - y2, x1 - x2);
    return (aTan + Math.PI) / (Math.PI * 2) * scale;
};
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
```

## 2 - The map module

So then I have a module that will be used for creating a map object for this canvas example. The idea that I had in mind for this project is to have an array of map objects, bit I figure that everything that has to d with creating an mutating a collection of maps should be independent of a module that is used to do so with just one map object. So for now as of this writing the map module for this example is fairly simple and striped down, with just a hand full of usual methods for such a module.

```js
var mapMod = (function () {
 
    var api = {};
 
    var createCells = function (map) {
        var cells = [];
        var len = map.w * map.h,
        i = 0;
        while (i < len) {
            cells.push({
                i: i,
                x: i % map.w,
                y: Math.floor(i / map.w),
                unit: false // reference to current unit here or false if empty
            });
            i += 1;
        }
        return cells;
    };
 
    // return a cell at the given position, or false for out of bounds values
    api.get = function (map, x, y) {
        if (x < 0 || y < 0 || x >= map.w || y >= map.h) {
            return false;
        }
        return map.cells[y * map.w + x];
    };
 
    // get a cell in the current map by way of
    // a canvas relative x and y pixel pos
    api.getCellByPointer = function (map, x, y) {
        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);
        return api.get(map, cx, cy)
    };
 
    api.create = function (opt) {
        opt = opt || {};
        var map = {
            w: opt.w || 9,
            h: opt.h || 7,
            cellSize: 32,
            spawnEnabled: opt.spawnEnabled || false,
            spawnLimit: opt.spawnLimit || 2,
            spawnCells: opt.spawnCells || [0], // cell index values where enemies can spawn
            margin: {
                x: 5,
                y: 5
            },
            cells: []
        };
        map.cells = createCells(map);
        return map;
    };
    return api;
 
}
    ());
```

## 3 - The game module

I will want to have a module that will act as a way to create a main state object for a game instance. In many of my canvas examples this kind of object is also the main object that will constitute a model for the whole of the state of the application, however in other projects, including this one, there is yet another object to which the game object is a part of.

```js
var gameMod = (function () {
 
    // create a base unit object
    var createBaseUnit = function () {
        return {
            HP: 100,
            maxHP: 100,
            weaponIndex: 0,
            sheetIndex: 0,
            currentCell: false,
            active: false
        }
    };
 
    // create an enemy Unit Object
    var createEnemyUnit = function () {
        var enemy = createBaseUnit();
        enemy.sheetIndex = 1;
        enemy.sight = 3; // sight radius in cells
        return enemy;
    };
 
    // create a player unit
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.sheetIndex = 0; // player sheet
        return player;
    };
    // create enemy pool
    var createEnemyUnitPool = function (size) {
        var pool = [];
        var i = 0;
        while (i < size) {
            pool.push(createEnemyUnit());
            i += 1;
        }
        return pool;
    };
    var getActiveCount = function (game, pool) {
        pool = pool || game.enemyPool;
        return pool.reduce(function (acc, obj) {
            acc = typeof acc === 'object' ? !!acc.active : acc;
            return acc + !!obj.active;
        });
    };
    var spawnEnemy = function (game) {
        var map = getCurrentMap(game),
        e,
        spawnCell = map.cells[map.spawnCells[0]], // just index 0 for now
        activeCount;
        if (map.spawnEnabled) {
            activeCount = getActiveCount(game, game.enemyPool);
            if (activeCount < map.spawnLimit && spawnCell.unit === false) {
                e = getNextInactive(game, game.enemyPool);
                if (e) {
                    placeUnit(game, e, spawnCell.x, spawnCell.y);
                }
            }
        }
    };
    // get next inactive
    var getNextInactive = function (game, pool) {
        pool = pool || game.enemyPool;
        var i = 0,
        len = pool.length;
        while (i < len) {
            if (!pool[i].active) {
                return pool[i];
            }
            i += 1;
        }
        return false;
    };
 
    // get the current map
    var getCurrentMap = function (game) {
        return game.maps[game.mapIndex];
    };
 
    // place a unit at a current map location
    var placeUnit = function (game, unit, x, y) {
        var map = getCurrentMap(game);
        var newCell = mapMod.get(map, x, y);
        if (!unit) {
            return;
        }
        if (newCell) {
            // clear old position if any
            if (unit.currentCell) {
                map.cells[unit.currentCell.i].unit = false;
            }
            // make sure the unit is active
            unit.active = true;
            // update to new location
            unit.currentCell = newCell; // unit ref to cell
            map.cells[unit.currentCell.i].unit = unit; // map ref to unit
        }
    };
 
    // remove a unit from any map location it may be at
    // this will not destroy the object if it is part of a pool, or reference elsewhere
    var removeUnit = function (game, unit) {
        unit.active = false;
        getCurrentMap(game).cells[unit.currentCell.i].unit = false;
        unit.currentCell = false;
    };
 
    // start game helper
    var setupGame = function (game) {
        game.mapIndex = 0;
        var map = getCurrentMap(game);
        placeUnit(game, game.player, 0, 0);
        placeUnit(game, getNextInactive(game), 5, 5);
        placeUnit(game, getNextInactive(game), 2, 5);
    };
 
    var moveEnemies = function (game) {
        var i = 0,
        cell,
        radian,
        map = getCurrentMap(game),
        e,
        cx,
        cy,
        p = game.player,
        len = game.enemyPool.length;
        while (i < len) {
            e = game.enemyPool[i];
            if (e.active) {
                cell = e.currentCell;
                if (utils.distance(cell.x, cell.y, p.currentCell.x, p.currentCell.y) <= e.sight) {
                    radian = utils.angleToPoint(cell.x, cell.y, p.currentCell.x, p.currentCell.y);
                } else {
                    radian = Math.PI * 2 * Math.random();
                }
                cx = Math.round(cell.x + Math.cos(radian));
                cy = Math.round(cell.y + Math.sin(radian));
                // get location before moving to it
                var newCell = mapMod.get(map, cx, cy);
                // if no unit just move there
                if (!newCell.unit) {
                    placeUnit(game, e, cx, cy);
                }
            }
            i += 1;
        }
    };
 
    var api = {};
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            mode: 'map',
            maps: [],
            mapIndex: 0,
            targetCell: false, // a reference to the current target cell to move to, or false
            player: createPlayerUnit(),
            kills: 0,
            enemyPool: createEnemyUnitPool(5)
        };
        game.maps.push(mapMod.create({
                spawnEnabled: true
            }));
        setupGame(game);
 
        return game;
    };
    // update a game state object
    api.update = function (game, secs) {
        var cell,
        map = getCurrentMap(game),
        radian,
        target;
 
        // move player
        if (target = game.targetCell) {
            cell = game.player.currentCell;
            if (target != cell) {
                radian = utils.angleToPoint(cell.x, cell.y, target.x, target.y);
                var cx = Math.round(cell.x + Math.cos(radian)),
                cy = Math.round(cell.y + Math.sin(radian));
                // get location before moving to it
                var newCell = mapMod.get(map, cx, cy);
                // if no unit just move there
                if (!newCell.unit) {
                    placeUnit(game, game.player, cx, cy);
                } else {
                    // else there is an enemy there
                    var e = newCell.unit;
 
                    // just step a kill count for now
                    e.active = false;
                    removeUnit(game, e);
                    game.kills += 1;
                    placeUnit(game, game.player, cx, cy);
                }
                game.targetCell = false;
                // move active enemies
                moveEnemies(game);
                // enemies might spawn per turn
                spawnEnemy(game);
            }
        }
 
    };
 
    // return the public api
    return api;
}
    ());
```

## 4 - The draw module for rendering to canvas

So yes this is a canvas example, and as such I am going to want at least a little javaScript code that will be used to render to a canvas element. In very simple projects I might have this code dumped together with everything else, but for projects that are starting to get a little complex, or will get there at some point in the future it becomes important to pull this code out of a main.js file and into it's own module for the sake of readability of code.

```js
var draw = (function () {
 
    var unitColors = ['blue', 'red'];
 
    return {
        // draw background
        back: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        // draw a map
        map: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx,
            map = sm.game.maps[sm.game.mapIndex];
            var cs = map.cellSize,
            i = 0,
            x,
            y,
            len = map.cells.length,
            cell;
            while (i < len) {
                cell = map.cells[i];
                x = map.margin.x + cell.x * cs;
                y = map.margin.y + cell.y * cs;
                // draw base cell
                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.rect(x, y, 32, 32);
                ctx.fill();
                ctx.stroke();
                // if we have a unit
                if (cell.unit) {
                    if (cell.unit.active) {
                        ctx.fillStyle = unitColors[cell.unit.sheetIndex];
                        ctx.beginPath();
                        ctx.rect(x, y, 32, 32);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
                i += 1;
            }
        },
 
        info: function (sm) {
            var ctx = sm.ctx,
            canvas = sm.canvas;
            ctx.fillStyle = 'white';
            ctx.font = '10px courier';
            ctx.textBaseline = 'top';
            var pos = sm.input.pos;
            ctx.fillText('pointerDown: ' + sm.input.pointerDown + ' pos: ' + pos.x + ',' + pos.y, 5, 5);
            ctx.fillText('kills: ' + sm.game.kills, 5, 15);
            ctx.fillText('v' + sm.ver, 1, canvas.height - 11);
        }
 
    }
}
    ());
```

## 5 - Main.js, the start of a state machine, and index.html

I have code that serves as a general application wide utility library, a map system, a game module, and a way to render to a canvas element. Now I just need a little additional code that will make use of all of this, and also provide any additional functionality.

```js
(function () {
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
 
    var sm = {
        ver: '0.2.0',
        game: gameMod.create(),
        canvas: canvas,
        ctx: ctx,
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };
 
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos;
            sm.input.pointerDown = true;
 
            var cell = mapMod.getCellByPointer(sm.game.maps[sm.game.mapIndex], pos.x, pos.y);
 
            if (cell) {
                sm.game.targetCell = cell;
            }
 
        },
        move: function (sm, e) {},
        end: function (sm, e) {
            sm.input.pointerDown = false;
            loop();
        }
    };
 
    var createPointerHandler = function (sm, type) {
        return function (e) {
            sm.input.pos = utils.getCanvasRelative(e);
            pointerHanders[type](sm, e);
        };
    };
 
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
 
    var loop = function () {
        //requestAnimationFrame(loop);
 
        gameMod.update(sm.game);
 
        draw.back(sm);
        draw.map(sm);
        draw.info(sm);
    };
 
    loop();
 
}
    ());
```

Here I have the html that will link to all the external javaScript code in order.

```html
<html>
    <head>
        <title>canvas example monster smash</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/map.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 6 - Conclusion

So far this game is working more or less like what it is that I had in mind. I do have the current state of my todo lost when it comes to additional features with this one though. I would like for there to be more than one map that the player can move to, and there are additional states that i would like to add. As of this writing the player just kills enemies when the player object comes in contact with an enemy object, so obviously there is more work to do when it comes to turning this one into something that people might actually like to play.