---
title: Pool reduction digital art javaScript example
date: 2021-12-31 12:51:00
tags: [js]
layout: post
categories: js
id: 947
updated: 2021-12-31 13:19:58
version: 1.2
---

For the last day of the year I wanted to do something fun, so I made yet another quick [javaScript example](/2021/04/02/js-javascript-example/) type post, this time it is a kind of digital art project type thing that has to do with an object pool that will reduce in terms of the active count of objects. I am thing that this might just be the first of at least a few javaScript examples where the goal is to just do something artful with canvas elements, and also try to go i some new directions with things also while I am in the process of doing so.

<!-- more -->


## 1 - The utilities library for this javaScript example

First off I have the utilities library for this javaScript example, just like with many of my other javaScript examples I often have a library such as this as part of the project. In other words this is a custom cut collection of methods that I will be using in one or more additional javaScript files in the rest of the source code, as such I have methods that have to do with various things that will pop up when working on all kinds of various javaScript files. For this javaScript example project I have a mathematical modulo method as well as my wrap number method as well as distance and bounding box methods on top of that.

```js
var utils = {};
// create a canvas element
utils.createCanvas = function(opt){
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
    opt.canvas.onselectstart = function () { return false; }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};
// wrap a number
utils.wrapNumber = function(n, min, max){
    var r = max - min;
    return (min + ((((n - min) % r) + r) % r));
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
```

## 2 - The object pool module

```js
var poolMod = (function () {
    // Public API
    var api = {};
    // get next inactive object in the given pool
    var getInactive = function (pool) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        var i = 0,
        pool = {
            objects: [],
            secsCap: opt.secsCap === undefined ? Infinity : opt.secsCap,
            disableLifespan: opt.disableLifespan || false,
            data: opt.data || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {}
        };
        while (i < opt.count) {
            pool.objects.push({
                active: false,
                i: i,
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                w: opt.w === undefined ? 32 : opt.w,
                h: opt.h === undefined ? 32 : opt.h,
                heading: opt.heading === undefined ? 0 : opt.heading,
                pps: opt.pps === undefined ? 32 : opt.pps,
                lifespan: opt.lifespan || 3,
                data: {}
            });
            i += 1;
        }
        return pool;
    };
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || {};
        opt = opt || {};
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        }
        return false;
    };
    // spawn all objects
    api.spawnAll = function(pool, state, opt){
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        });
        return pool.objects;
    };
    // purge an object ( make it inactive and call the purge method for the pool )
    api.purge = function(pool, obj, state){
        obj.active = false;
        pool.purge.call(pool, obj, pool, state);
    };
    // spawn all objects
    api.purgeAll = function(pool, state, opt){
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active =  false;
                pool.purge.call(pool, obj, pool, state);
            }
        });
        return pool.objects;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        secs = secs > pool.secsCap ? pool.secsCap : secs;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                // if disableLifespan featre
                if(pool.disableLifespan){
                }else{
                    // else use lifespan feature
                    obj.lifespan -= secs;
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        //pool.purge.call(pool, obj, pool, state);
                        api.purge.call(pool, pool, obj, state);
                    }
                }
            }
        }
    };
    // set all to inActive or active state
    api.setActiveStateForAll = function (pool, bool) {
        bool = bool === undefined ? false : bool;
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            obj.active = bool;
        }
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // check bounds for the given display object and canvas and return true if the object
    // is out of bounds and false if it is not.
    api.checkBounds = function (obj, canvas) {
        if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
            return false;
        }
        return true;
    };
    // bounding box
    api.boundingBox = function (a, b) {
        return utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
    };
    // wrap an object to an area like a canvas
    api.wrap = function(obj, area, space){
        area = area || {x: 0, y: 0, width: 640, height: 480 };
        space = space === undefined ? 32 : space;
        if(!utils.boundingBox(obj.x, obj.y, obj.w, obj.h, space * -1, space * -1, area.width + space, area.height + space)){
            obj.x = utils.mod(obj.x + space, area.width + space * 2) - space;
            obj.y = utils.mod(obj.y + space, area.height + space * 2) - space;
        }
    };
    // get a collection of overlaying active objects from a pool, that overlap with the gievn object
    api.getOverlaping = function(obj, pool){
        var i = 0,
        obj2,
        overlap = [];
        len = pool.objects.length;
        if(obj.active){
            while(i < len){
                obj2 = pool.objects[i];
                if(obj != obj2 && obj2.active){
                    if(utils.boundingBox(obj.x, obj.y, obj.w, obj.h, obj2.x, obj2.y, obj2.w, obj2.h)){
                         overlap.push(obj2);
                    }
                }
                i += 1;
            }
        }
        return overlap;
    };
    // get a current active count for a pool
    api.getActiveCount = function(pool){
        return pool.objects.reduce(function(acc, obj){
            return obj.active ? acc += 1: acc;
        }, 0);
    };
    // get active objects from a pool
    api.getActiveObjects = function(pool){
        return pool.objects.reduce(function(acc, obj){
            if(obj.active){
                acc.push(obj);
            }
            return acc;
        }, []);
    };
    // get distance to object method
    api.getDistanceToObj = function(obj1, obj2){
        var x1 = obj2.x + obj2.w / 2,
        y1 = obj2.y + obj2.h / 2,
        x2 = obj1.x + obj1.w / 2,
        y2 = obj1.y + obj1.h / 2;
        return utils.distance(x1, y1, x2, y2);
    };
 
    // return public method
    return api;
}
    ());
```

## 3 - The game module

```js

var gameMod = (function () {
    // the public api
    var api = {};
    // some constants
    var UNIT_SIZE_RANGE = [16, 128],
    UNIT_COUNT = 30;
    // the unit pool options object
    var UNIT_OPT = {
        count: UNIT_COUNT,
        disableLifespan: true
    };
    // set the size of the given unit object
    var getSize = function (unit) {
        var totalMass = UNIT_COUNT * 50,
        sizePer = unit.data.mass / totalMass,
        size = UNIT_SIZE_RANGE[0] + (UNIT_SIZE_RANGE[1] - UNIT_SIZE_RANGE[0]) * sizePer;
        return size;
    };
    // spawn a unit
    UNIT_OPT.spawn = function (obj, pool, game, opt) {
        var canvas = game.sm.canvas;
        // start mass
        obj.data.mass = 50;
        // size and position
        var size = getSize(obj);
        obj.w = size;
        obj.h = size;
        var r = canvas.height * 0.4,
        a = Math.PI * 2 * Math.random();
        obj.x = canvas.width / 2 - obj.w / 2 + Math.cos(a) * r;
        obj.y = canvas.height / 2 - obj.h / 2 + Math.sin(a) * r;
        // speed and heading
        obj.pps = 64;
        obj.heading = Math.PI * 2 * Math.random();
    };
    // update a unit
    UNIT_OPT.update = function (obj, pool, game, secs) {
        // move the unit my pps and wrap
        poolMod.moveByPPS(obj, secs);
        var size = UNIT_SIZE_RANGE[1];
        obj.x = utils.wrapNumber(obj.x, size * -1, game.sm.canvas.width + size);
        obj.y = utils.wrapNumber(obj.y, size * -1, game.sm.canvas.height + size);
        // if any other unit is under this one add the mass of them and purge them
        var under = poolMod.getOverlaping(obj, pool);
        if (under.length > 0) {
            under.forEach(function (underUnit) {
                obj.data.mass += underUnit.data.mass;
                poolMod.purge(pool, underUnit, game)
            });
            var size = getSize(obj);
            obj.w = size;
            obj.h = size;
        }
    };
    // purge a unit
    UNIT_OPT.purge = function (obj, pool, game) {}
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPT)
        };
        // spawn all for starters
        poolMod.spawnAll(game.units, game)
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        poolMod.update(game.units, secs, sm.game)
    };
    // return the public API
    return api;
}
    ());
```

## 4 - The draw module

```js
var draw = {};
// draw the background
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
};
// draw the pool
draw.pool = function (game, ctx, canvas) {
    var pool = game.units;
    pool.objects.forEach(function (obj) {
        ctx.fillStyle = obj.data.fillStyle || 'white';
        ctx.strokeStyle = obj.data.strokeStyle || 'black';
        if (obj.active) {
            var cx = obj.x + obj.w / 2,
            cy = obj.y + obj.h / 2;
            ctx.beginPath();
            ctx.arc(cx, cy, (obj.w + obj.h) / 2 / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    });
};
// draw version number
draw.ver = function (sm, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '12px arial';
    ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
};
```

## 5 - The main javaScript file

```js
// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
var sm = {
    ver: 'r0',
    lt: new Date(),
    fps: 30,
    game: null,
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas
};
sm.game = gameMod.create({
        sm: sm
    });
// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        gameMod.update(sm.game, secs);
        draw.background(sm.ctx, sm.canvas);
        draw.pool(sm.game, sm.ctx);
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
    }
};
loop();
```

## 6 - Conclusion

