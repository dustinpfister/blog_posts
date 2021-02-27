---
title: Kill Box Canvas Example
date: 2020-09-04 12:14:00
tags: [canvas]
categories: canvas
layout: post
id: 701
updated: 2021-02-27 14:52:59
version: 1.10
---

While wasting some time scrolling threw you tube I can across a [video on how to make a kill box](https://www.youtube.com/watch?v=K8fsjNjbz8Y) in a game called [RimWorld](https://store.steampowered.com/app/294100/RimWorld/). I have found the video, other videos like it, and the game itself interesting even though I have nit played it myself just yet. This has inspired me to start a canvas [canvas example](/2020/03/23/canvas-example/) of my own where I will be playing around with many of the things that where talked about in the video, because I think making just a simple striped down game based around this might prove to be a little fun.

<!-- more -->

## - This canvas example is in alpha state for now

As of this writing my kill box example needs a lot more work until I have something that is really worth writing about. So for now this post is just a brief overview of what I have thus far on this one. If I get some time I will get around to fixing this one up a bit, as I do not even have the basic idea I hand in mind done. So it might be best to check out some of my other canvas examples and not wast your time reading about something that is not done yet.

## 1 - The utils framework for this kill box canvas example

So for this canvas example I have a general utility framework that just has two methods for now, one to get a canvas relative position in a canvas element when working with pointer events. The other method that I have in the utility library is a bounding box collision detection method.

```js
// UTILS
var utils = {};
// bounding box
utils.boundingBox = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};
// get a canvas relative point
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

## 2 - The object pool module

I know that I will want to have an object pool module for this canvas example. If you do not know what and object pool is then I have made another [canvas example in which I get into the topic of object pools in detail](/2020/07/20/canvas-example-object-pool/). However simple put an object pool is just a way to create and update a fixed pool of objects that are often used for sprites and other display objects that are used in a game. 

```js
var poolMod = (function () {
    return {
        // create a new pool
        create: function (opt) {
            opt = opt || {};
            opt.count = opt.count || 10;
            var i = 0,
            pool = [];
            while (i < opt.count) {
                pool.push({
                    active: false,
                    x: opt.x === undefined ? 0 : opt.x,
                    y: opt.y === undefined ? 0 : opt.y,
                    w: opt.w === undefined ? 32 : opt.w,
                    h: opt.h === undefined ? 32 : opt.h,
                    heading: opt.heading === undefined ? 0 : opt.heading,
                    pps: opt.pps === undefined ? 32 : opt.pps,
                    lifespan: opt.lifespan || 3,
                    data: opt.data || {},
                    spawn: opt.spawn || function (obj, state) {},
                    purge: opt.purge || function (obj, state) {},
                    update: opt.update || function (obj, state, secs) {
                        obj.lifespan -= secs;
                    }
                });
                i += 1;
            }
            return pool;
        },
        // spawn the next inactive object in the given pool
        spawn: function (pool, state, opt) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (!obj.active) {
                    obj.active = true;
                    obj.spawn.call(obj, obj, state, opt);
                    return obj;
                }
            }
            return false;
        },
        // update a pool object by a secs value
        update: function (pool, secs, state) {
            var i = pool.length,
            obj;
            state = state || {}; // your projects state object
            while (i--) {
                obj = pool[i];
                if (obj.active) {
                    obj.update(obj, state, secs);
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        obj.purge.call(obj, obj, state);
                    }
                }
            }
        },
        // set all to inActive or active state
        setActiveStateForAll: function (pool, bool) {
            bool = bool === undefined ? false : bool;
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                obj.active = bool;
            }
        }
    }
}
    ());
```

## 3 - The map module

For this kill box example I am also going to want a map module that will be used to create a map of cell objects.

```js
var mapMod = (function () {
    // create cells for a map object
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
    // PUBLIC API
    var api = {};
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
    // create a map object
    api.create = function (opt) {
        opt = opt || {};
        var map = {
            w: opt.w || 9,
            h: opt.h || 7,
            cellSize: 32,
            spawnEnabled: opt.spawnEnabled || false,
            spawnLimit: opt.spawnLimit || 2,
            spawnCells: opt.spawnCells || [0], // cell index values where enemies can spawn
            margin: opt.margin || {
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

## 4 - The game module

Many of these canvas examples of mine will contain a game module that is the module that is used to create and update a main game object.

```js
var gameMod = (function () {
    // create a new base game object
    var createBaseGameObject = function (opt) {
        return {
            enemies: [],
            playerUnits: [],
            shots: [],
            map: mapMod.create({
                margin: {
                    x: 10,
                    y: 10
                }
            })
        };
    };
    // create Object pools for the given game object
    var createObjectPools = function (game) {
        game.enemies = poolMod.create(enemyPoolOptions);
        game.playerUnits = poolMod.create(playerPoolOptions);
        game.shots = poolMod.create(shotPoolOptions);
    };
    // place a Unit in the game map
    var placeUnitInMap = function (game, unit, pos) {
        var map = game.map,
        cell = mapMod.get(map, pos.x, pos.y);
        unit.x = map.margin.x + map.cellSize * cell.x;
        unit.y = map.margin.y + map.cellSize * cell.y;
        console.log(unit);
    };
    // just create a blank base unit Object
    var createBaseUnit = function () {
        return {
            HP: {
                current: 100,
                max: 100
            }
        };
    };
    // Enemy object pool options
    var enemyPoolOptions = {
        count: 5,
        spawn: function (enemy, game, spawnOptions) {
            enemy.data = createBaseUnit();
            placeUnitInMap(game, enemy, spawnOptions.cellPos);
        }
    };
    // player unit object pool options
    var playerPoolOptions = {
        count: 5,
        spawn: function (playerUnit, game, spawnOptions) {
            playerUnit.data = createBaseUnit();
            placeUnitInMap(game, playerUnit, spawnOptions.cellPos);
        }
    };
    // shot object pool options
    var shotPoolOptions = {
        count: 10,
        w: 5,
        h: 5,
        spawn: function (shot, game, spawnOptions) {
            shot.data = createBaseUnit();
            placeUnitInMap(game, shot, spawnOptions.cellPos);
        }
    };
    // PUBLIC API
    return {
        create: function (opt) {
            var game = createBaseGameObject(opt);
            createObjectPools(game);
            var spawnOptions = {
                cellPos: {
                    x: 3,
                    y: 0
                }
            };
            poolMod.spawn(game.enemies, game, spawnOptions);
            spawnOptions.cellPos.x = 7;
            spawnOptions.cellPos.y = 6;
            poolMod.spawn(game.playerUnits, game, spawnOptions);
            spawnOptions.cellPos.x = 1;
            spawnOptions.cellPos.y = 1;
            poolMod.spawn(game.shots, game, spawnOptions);
            return game;
        }
    }
}
    ());
```

## 5 - the draw module

I also take the time to make a stand alone draw module for my canvas examples. This is a way to pull code that has o do with drawing to the canvas element away from code that is used to create an update a main state object of the game.

```js
var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        pool: function (sm, poolName, fill) {
            var pool = sm.game[poolName],
            unit,
            i = pool.length;
            while (i--) {
                unit = pool[i];
                if (unit.active) {
                    ctx.fillStyle = fill || 'white';
                    ctx.fillRect(unit.x, unit.y, unit.w, unit.h);
                }
            }
        },
        // draw a map
        map: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx,
            map = sm.game.map;
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
                // draw cell
                ctx.fillStyle = '#008800';
                ctx.strokeStyle = '#005500';
                ctx.beginPath();
                ctx.rect(x, y, 32, 32);
                ctx.fill();
                ctx.stroke();
                i += 1;
            }
        },
        // draw pointer cursor
        cursor: function (sm) {
            var ctx = sm.ctx;
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(sm.input.pos.x, sm.input.pos.y, 5, 0, Math.PI * 2);
            ctx.stroke();
        },
        //draw version number
        ver: function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'lime';
            ctx.textBaseline = 'top';
            ctx.font = '10px arial';
            ctx.fillText('v' + sm.ver, 2, sm.canvas.height - 12);
        }
    }
}
    ());
```

## 6 - the main.js file and state machine.

Now that I have all the files that I want and need to create my main state object I now need a little more javaScipt code that will have to do with a main update loop, creating the canvas, and setting up a state machine.

```js
// State Objects
var states = {
    // game state
    game: {
        // for each update tick
        update: function (sm, secs) {
            // DRAW for game state
            // draw background
            draw.back(ctx, canvas);
            draw.map(sm);
            // draw pools
            draw.pool(sm, 'enemies', 'red');
            draw.pool(sm, 'playerUnits', 'blue');
            draw.pool(sm, 'shots', 'white');
            // cursor and version
            draw.cursor(sm);
            draw.ver(sm);
        },
        // events
        pointerStart: function (sm, e) {},
        pointerMove: function () {},
        pointerEnd: function () {}
    }
};
 
// create canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// Main State Machine Object
var sm = {
    ver: '0.3.0',
    canvas: canvas,
    ctx: ctx,
    currentState: 'game',
    game: gameMod.create({
        canvas: canvas
    }),
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
        sm.input.pos = utils.getCanvasRelative(e);
        states[sm.currentState].pointerStart(sm, e);
    },
    move: function (sm, e) {
        if (sm.input.pointerDown) {
            sm.input.pos = utils.getCanvasRelative(e);
            states[sm.currentState].pointerMove(sm, e);
        }
    },
    end: function (sm, e) {
        sm.input.pointerDown = false;
        states[sm.currentState].pointerEnd(sm, e);
    }
};
 
var createPointerHandler = function (sm, type) {
    return function (e) {
        e.preventDefault();
        pointerHanders[type](sm, e);
    };
};
 
// attach for mouse and touch
canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
 
var lt = new Date(),
FPS_target = 30;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= 1000 / FPS_target) {
        states[sm.currentState].update(sm, secs);
        lt = now;
    }
};
loop();
```

## 7 - Conclusion

As of this writing I am not happy with the current state of this canvas example, there is much more work that needs to be done with this one. I would like to get to at least 50 or so canvas examples before pouring more attention in updating these, and when I do this one sure does need some work. I think that the basic idea that I have in mind might prove to be fun though when I do manage to get this up and running.
