---
title: Pool reduction digital art javaScript example
date: 2021-12-31 12:51:00
tags: [js]
layout: post
categories: js
id: 947
updated: 2022-01-04 13:11:48
version: 1.20
---

For the last day of the year I wanted to do something fun, so I made yet another quick [javaScript example](/2021/04/02/js-javascript-example/) type post, this time it is a kind of [digital art](https://en.wikipedia.org/wiki/Digital_art) project that has to do with an object pool that will reduce in terms of the active count of objects. When it comes to my [canvas examples](/2020/03/23/canvas-example/) collection of posts I have put together a [canvas example that makes use of an object pool module](/2020/07/20/canvas-example-object-pool/) for that example that I will then be using in this javaScript example.

I am thinking that this might just be the first of at least a few javaScript examples where the goal is to just do something artful with canvas elements, and also try to go in some new directions with programing in general while I am in the process of doing so. Often people think in terms of what they can do that is new, or different each time a new year comes around, and there are a whole lot of things that I would like to do that are new with javaScript, as well as with this website for sure. With that said there is treating this javaScript example differently this time around by setting some intentions, and making sure to follow threw with them. For example there is not just getting a crude idea up and working and moving on, but refining and improving the over all structure of the idea in terms of the quality of the source code which is one thing I would like to do with this javaScript example.

The general idea of this example came to me when I was editing my [post on the javaScript array reduce method](/2021/07/13/js-array-reduce/) which is of course one of the many methods in the [array prototype](/2018/12/10/js-array/) of native javaScript. What I had in mind was just a collection of display objects that move around on the canvas, and when one or more of them overlap with one all the display objects that overlap will combine into one parent display object. So then eventual all the display objects will end up, well reducing into a single display object. After that there is having some additional code that involves having the display objects split apart again. That is it in terms of the genera idea, and as of this writing I have that general idea up and running, but I would like to continue working on this project at least a little way beyond just having the general idea working.

<!-- more -->

## This object pool reduction digital art javaScript example and what to know before hand

This is a post on a full client side javaScript project example that is just a simple digital art project involving object pools and canvas elements. This is then not in any way a blog post that is intended for people that are new to javaScript in general so if you are still new to javaScript you might want to start out with a [getting started post with native javaScript](/2018/11/27/js-getting-started/).

### The current source code is up on Github

As of this writing I have just finished revision 4 of this javaScript example as I have outlined in the todo list of this javaScript example. This todo list of which I speak, along with the full source code of this javaScript example can be found in [my test vjs Github preparatory in the for post folder that corresponds with the name of this blog post](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-digital-art-reduce-pool). This should be the case with my many other javaScript project example posts, as well as with all my various [blog posts on javaScript in general](/categories/js).

## 1 - The utilities library for this javaScript example

First off I have the [utilities library](/2021/08/06/js-javascript-example-utils/) for this javaScript example, just like with many of my other javaScript examples I often have a library such as this as part of the project. In other words this is a custom cut collection of methods that I will be using in one or more additional javaScript files in the rest of the source code, as such I have methods that have to do with various things that will pop up when working on all kinds of various javaScript files. For this javaScript example project I have a mathematical modulo method as well as my wrap number method as well as distance and bounding box methods on top of that.

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

This is the object pool library that I will be using for this example, which I have started out with by copying what I was using from another javaScript example which would be my [turn based rpg game](/2021/12/10/js-javascript-example-turn-based-rpg/) that I was working on. In that javaScript example I was using this module for a circle menu that is being used to navigate threw various menus. Here in this example I am going to be using it to create and update the object pool that will be these various objects that will move around and when they overlay combine into a single object with greater mass.

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

I have a single javaScript file that will be used to create and update the main game state object of this example. There are aways at least two public methods that I would want in a module such as this, one of which would be a create method that is used to create the starting state of the game, and the other is an update method. In other various examples I might want to have at least a few more methods beyond that, but because this is just a digital art type thing for the most part I will just be needing those two methods.

```js
var gameMod = (function () {
    // the public api
    var api = {};
    // some constants
    var UNIT_SIZE_RANGE = [32, 256],
    UNIT_TRANSFER_RATE = 100,
    UNIT_TRANSFER_MODE_MAX_PPS = 256,
    UNIT_TRANSFER_MODE_MAX_DIST = 100,
    UNIT_SPLIT_DELAY = 5,
    UNIT_CHASE_PPS_DELTA = 64,
    UNIT_PPS_RANGE = [32, 64],
    UNIT_MASS_PER = 50,
    UNIT_COUNT = 50,
    UNIT_MAX_ALPHA = 0.7,
    UNIT_COLORS = ['red', 'lime', 'blue', 'white', 'purple', 'pink'],
    BUG0_TEMP = [1.90, 0.10];          // bug #0 temp fix values used in updateByMass helper
    // the unit pool options object
    var UNIT_OPT = {
        count: UNIT_COUNT,
        disableLifespan: true
    }; 
    // get adjusted center helper
    var getAdjustedCenter = function(game, obj){
        var canvas = game.sm.canvas;
        return {
            x : canvas.width / 2 - obj.x - obj.w / 2,
            y : canvas.height / 2 - obj.y - obj.h / 2 
        };
    };
    // distToCenter helper
    var distToCenter = function(game, obj){
        var centerPos = getAdjustedCenter(game, obj);
        return utils.distance(0, 0, centerPos.x, centerPos.y);
    };
    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };
    // parse heading helper
    var parseHeading = function(heading, obj, game){
        // if heading is a string
        if(typeof heading === 'string'){
            // for 'center' value set heading to adjusted center
            if(heading === 'center'){
                var pos = getAdjustedCenter(game, obj);
                return Math.atan2(pos.y, pos.x);
            }
            // for random heading
            if(heading === 'random'){
                return randomHeading()
            }
        }
        // return heading value
        return heading;
    };
    // get total mass helper (actual or exspcted)
    var getTotalMass = function(game){
        return game.units.objects.reduce(function(acc, unit){
            return acc + unit.data.mass;
        }, 0);
    };
    var getExpectedTotalMass = function(){
        return UNIT_COUNT * UNIT_MASS_PER;
    };
    // get the size of the given unit object
    var getSize = function (unit) {
        var totalMass = getExpectedTotalMass(); //UNIT_COUNT * UNIT_MASS_PER,
        sizePer = unit.data.mass / totalMass,
        size = UNIT_SIZE_RANGE[0] + (UNIT_SIZE_RANGE[1] - UNIT_SIZE_RANGE[0]) * sizePer;
        return size;
    };
    var randomPPS = function(unit){
        var ppsMin = UNIT_PPS_RANGE[0],
        ppsMax = UNIT_PPS_RANGE[1];
        return ppsMin + Math.floor( (ppsMax - ppsMin) * Math.random());
    };
    var chasePPS = function(unit){
        var ud = unit.data;
        if(ud.target){
            if(ud.target.active){
                return ud.speed.basePPS + UNIT_CHASE_PPS_DELTA;
            }
        }
        return ud.speed.basePPS;
    };
    // move unit helper
    var moveUnit = function(game, obj, secs){
        // parse heading first
        obj.heading = parseHeading(obj.heading, obj, game);
        // move by pps
        poolMod.moveByPPS(obj, secs);
        // wrap
        var size = UNIT_SIZE_RANGE[1];
        var size = obj.w;
        obj.x = utils.wrapNumber(obj.x, size * -1, game.sm.canvas.width + size);
        obj.y = utils.wrapNumber(obj.y, size * -1, game.sm.canvas.height + size);
    };
    // update unit helper
    var updateByMass = function(obj){
        // center position
        var cx = obj.x + obj.w / 2;
        cy = obj.y + obj.h / 2;
        // new size
        var size = getSize(obj);
        obj.w = size;
        obj.h = size;
        // adjust postion
        // !!! TEMP fix for bug #0 
        obj.x = cx - obj.w / (BUG0_TEMP[0] + BUG0_TEMP[1] * Math.random());
        obj.y = cy - obj.h / (BUG0_TEMP[0] + BUG0_TEMP[1] * Math.random());
    };
    // seek unit helper
    var seekUnit = function(game, unit){
        var ud = unit.data,
        getNewTarget = false;
        getNewTarget = ud.target === null ? true : getNewTarget;
        if(ud.target){
           getNewTarget = !ud.target.active ? true: getNewTarget;
        }
        // new new target
        if(getNewTarget){
            var activeUnits = poolMod.getActiveObjects(game.units).filter(function(target){
                return target.i != unit.i;
            }),
            i = activeUnits.length;
            if(activeUnits.length >= 1){
                ud.target = activeUnits[0];
            }
        }
    };
    // unit modes
    var UNIT_MODES = {};
    // move mode
    UNIT_MODES.move = {
        update: function(obj, pool, game, secs){
            // target
            var ud = obj.data;
            if(ud.target === null){
                // seek
                seekUnit(game, obj);
            }
            // if we have a target
            if(ud.target){
                if(ud.target.active){
                    // set heading for target
                    obj.heading = Math.atan2(ud.target.y - obj.y, ud.target.x - obj.x);
                }else{
                    ud.target = null;
                }
            }
            // set pps by chasePPS at this point
            obj.pps = chasePPS(obj);
            // still no target? The this should be the last active div
            if(ud.target === null && game.activeCount === 1){
                obj.heading = 'center';
                var d = distToCenter(game, obj),
                per = d / 300;
                per = per > 1 ? 1 : per;
                obj.pps = UNIT_PPS_RANGE[1] * per;
            }
            // move the unit
            moveUnit(game, obj, secs);
            // if any other unit is under this one switch them over to transfer mode
            // and make it so that the transfer target is this current unit
            var under = poolMod.getOverlaping(obj, pool);
            if (under.length > 0) {
                under.forEach(function (underUnit) {
                    var uud = underUnit.data;
                    // set unit into transfer mode
                    if(uud.mode === 'move'){
                        uud.mode = 'transfer';
                        uud.transferTarget = obj;
                    }
                });
            }
            // if active count is 1, set this last move mode unit to splitup mode
            if(game.activeCount === 1){
                game.splitDelay -= secs;
                if(game.splitDelay <= 0){
                    game.splitDelay = UNIT_SPLIT_DELAY;
                    obj.data.mode = 'splitup';
                }
            }
        }
    };
    // transfer mode
    UNIT_MODES.transfer = {
        update: function(obj, pool, game, secs){
            var target = obj.data.transferTarget;
            // reduce mass
            if(obj.data.mass > 0){
                var mDelta = Math.floor(UNIT_TRANSFER_RATE * secs);
                mDelta = mDelta === 0 ? 1 : mDelta;
                if(obj.data.mass - mDelta < 0){
                    mDelta = Math.round(obj.data.mass);
                }
                obj.data.mass = obj.data.mass - mDelta;
                target.data.mass = target.data.mass + mDelta;
            }else{
                poolMod.purge(pool, obj, game);
            }
            // adjust alpha
            var per = obj.data.mass / UNIT_MASS_PER;
            per = per > 1 ? 1 : per;
            obj.data.alpha = UNIT_MAX_ALPHA * per;
            // update size on unit and target unit
            updateByMass(obj);
            updateByMass(target);
            // how to update heading and speed
            var x1 = obj.x + obj.w / 2,
            y1 = obj.y + obj.h / 2,
            x2 = target.x + target.w / 2,
            y2 = target.y + target.h / 2;
            var d = utils.distance(x1, y1, x2, y2);
            var a = Math.atan2(y2 - y1, x2 - x1);
            obj.heading = a;
            // pps
            var per = d / UNIT_TRANSFER_MODE_MAX_DIST,
            per = per > 1 ? 1 : per;
            obj.pps = UNIT_TRANSFER_MODE_MAX_PPS * per;
            // moce the unit
            moveUnit(game, obj, secs);
        }
    };
    // splitup mode
    UNIT_MODES.splitup = {
        update: function(obj, pool, game, secs){
            // move the unit
            moveUnit(game, obj, secs);
            updateByMass(obj);
            // subtract from delay
            pool.data.splitDelay -= secs;
            // if active count is below UNIT COUNT then spawn new units
            if(game.activeCount < UNIT_COUNT){
                poolMod.getActiveObjects(pool).forEach(function(aObj){
                   aObj.data.mass = UNIT_MASS_PER;
                   updateByMass(aObj);
                });
                var len = UNIT_COUNT - game.activeCount,
                i = 0;
                while(i < len){
                    poolMod.spawn(game.units, game, {
                        mode: 'splitup',
                        mass: UNIT_MASS_PER,
                        heading: 'random',
                        x: obj.x,
                        y: obj.y
                    });
                    i += 1;
                }
            }
        }
    };
    // spawn a unit
    UNIT_OPT.spawn = function (obj, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // start in move mode by default
        obj.data.mode = spawnOpt.mode || 'move';
        obj.data.transferTarget = null;
        obj.data.target = null;
        obj.data.alpha = spawnOpt.alpha === undefined ? UNIT_MAX_ALPHA: spawnOpt.alpha;
        // random colors for now
        obj.data.fillStyle = UNIT_COLORS[ Math.floor(UNIT_COLORS.length * Math.random()) ];
        // heading
        obj.heading = spawnOpt.heading || 'random';
        // speed
        obj.data.speed = {
            basePPS: randomPPS(obj)
        };
        obj.pps = obj.data.speed.basePPS;
        // start mass
        obj.data.mass = spawnOpt.mass === undefined ? UNIT_MASS_PER : spawnOpt.mass;	
        // random pos from center by default
        var r = canvas.height * 0.4,
        a = Math.PI * 2 * Math.random();
        x = canvas.width / 2 - obj.w / 2 + Math.cos(a) * r,
        y = canvas.height / 2 - obj.h / 2 + Math.sin(a) * r;
        // use spawnOpt to set start postion, esle go with random from center
        obj.x = spawnOpt.x === undefined ? x : spawnOpt.x;
        obj.y = spawnOpt.y === undefined ? y : spawnOpt.y;
        // update size and positon based on mass
        updateByMass(obj);
        // move unit by 0 secs this will parse heading for first time
        // as well as prefroming any wrapping of obj.x, and obj.y that might need to happen
        moveUnit(game, obj, 0);
    };
    // update a unit
    UNIT_OPT.update = function (obj, pool, game, secs) {
        // move the unit my pps and wrap
        UNIT_MODES[obj.data.mode].update(obj, pool, game, secs);
    };
    // purge a unit
    UNIT_OPT.purge = function (obj, pool, game) {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPT),
            activeCount: 0,
            totalMass: 0,
            splitDelay: UNIT_SPLIT_DELAY
        };
        // spawn all for starters
        poolMod.spawnAll(game.units, game, {});
        game.activeCount = poolMod.getActiveCount(game.units);
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        game.activeCount = poolMod.getActiveCount(game.units);
        game.totalMass = getTotalMass(game);
        // update units
        poolMod.update(game.units, secs, sm.game);
        // set units back to move if in split up mode
        if(game.activeCount === UNIT_COUNT && game.units.objects[0].data.mode === 'splitup'){
            game.splitDelay -= secs;
            if(game.splitDelay <= 0){
                game.units.objects.forEach(function(obj){
                    obj.data.mode = 'move';
                });
                game.splitDelay = UNIT_SPLIT_DELAY;
            }
        }
    };
    // return the public API
    return api;
}
    ());
```

## 4 - The draw module

To display what is going on I am going to need to have to work out a few methods that will have to do with drawing the state of things to a canvas element.

```js
var draw = {};
// draw the background
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
};
// draw the pool
draw.pool = function (game, ctx, canvas) {
    var pool = game.units;
    pool.objects.forEach(function (obj) {
        ctx.fillStyle = obj.data.fillStyle || 'white';
        ctx.strokeStyle = obj.data.strokeStyle || 'black';
        ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
        if (obj.active) {
            var cx = obj.x + obj.w / 2,
            cy = obj.y + obj.h / 2;
            ctx.beginPath();
            ctx.arc(cx, cy, (obj.w + obj.h) / 2 / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    });
    ctx.globalAlpha = 1;
};
// draw version number
draw.info = function (sm, ctx, canvas) {
    ctx.fillStyle = 'yellow';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '12px arial';
    ctx.fillText('active count: ' + sm.game.activeCount, 10, 10);
    ctx.fillText('total mass: ' + sm.game.totalMass, 10, 20);
    ctx.fillText('splitDelay: ' + sm.game.splitDelay, 10, 30);
    var dInfo = sm.game.debugInfo;
    if(dInfo){
        ctx.fillText( dInfo.key + ' : ' + dInfo.value, 10, 40);
    }
};
// draw version number
draw.ver = function (sm, ctx, canvas) {
    ctx.fillStyle = 'yellow';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '12px arial';
    ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
};
```

## 5 - The main javaScript file

I am then just going to need a little more javaScript code that will make use of everything else to create the final end result. In this main javaScript file then I am creating what might eventually become a state machine object. Even though of revision 0 there is not any state objects and I am just updating the game module in the main app loop. Speaking of the app loop that is also where I will be keeping that as you might expect.

```js
// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// sm
var sm = {
    ver: 'r4',
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
        draw.info(sm, sm.ctx, sm.canvas);
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
    }
};
loop();
```

## 6 - Conclusion

So far this javaScript example is looking good as of revision zero at least when I have wrote this. When it comes to plans for additional edits of this post in the future I all ready have some things drafted out in the repository folder for this example.


