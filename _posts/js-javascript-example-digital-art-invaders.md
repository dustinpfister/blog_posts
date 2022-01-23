---
title: Invaders Digital Art javaScript example
date: 2022-01-17 07:36:00
tags: [js]
layout: post
categories: js
id: 952
updated: 2022-01-23 12:31:06
version: 1.14
---

Continuing with a digital art collection of [javaScript examples](/2021/04/02/js-javascript-example/) I have made yet another quick project following the same general thought process with the others when it comes to sticking with a fairly simple idea, and getting the core of that idea done within the span of just few days. This time I wanted to make a digital art project that involves display objects that repentants fixed structures that spawn at the center of the canvas, and additional display objects that spawn from outside the canvas and move in to where the buildings are to attack and destroy these structures. The structures themselves also fight back, and both kinds of display units fire yet another kind of display object that is a shot object at each other. So then this digital art project is then something that resembles a kind of game, but because it is a digital art project that means I do not have to worry about UI design, save states, menus, and all kinds of additional features that I would need to work out of it where a game. This allows me to focus more so on just game logic, and also how the project looks as this is a digital art project.


<!-- more -->

## 1 - The utilities library

With just about all of these javaScript examples I often have a [general utilities library](/2021/08/06/js-javascript-example-utils/) where I park various methods that I will end up using in one or more additional files in an over all project such as this one. These are then typical usual suspect type methods that have to do with things like getting the distance between two points, bounding box collision detection, working with angles, the Document Object Model and so forth. The collection of methods in a module such as this will change from one project to the next so it is a kind of custom cut, application specific utilizes library.

One method that I have in here is a method similar to that of the [lodash get method](/2018/09/24/lodash_get/) where I can pass an object, then a string that is a path to a value in that object, and then an optional default value to return in the vent that there is not a value at that path location. Another method that I have here is a kind of get a value within a range by a number between 0 and 1 method. This is another kind of method that helps with something that seems to happen fairly often when making this kind of a project. That is that I give the method a value between 0 and 1, which can also be the result of a Math random call, and then the next values are a range of values, a kind of min and max so that they return value is the per value that is between these values.

I then have my create canvas method that I started when working out my collection if vanilla javaScript canvas examples. When it comes to those examples I started each project from the ground up, as I do with these examples, rather than using [some kind of canvas framework](/2021/08/27/js-javascript-example-canvas-module/) for better or worse that is one of rules when it came to making that series of examples. However I made one little exception from one project to the next, and that exception was this method.

```js
var utils = {};
// get a nested object node from a source object by path string
utils.getPath = function(sourceObj, pathStr, def){
   var propNames = pathStr.split('.');
   var node = sourceObj[propNames[0]];
   var i = 1, len = propNames.length;
   while(i < len){
      try{
          node = node[propNames[i]];
          if(node === undefined){
              return def;
          }
      }catch(e){
          return def;
      }
      i += 1;
   }
   return node;
};

// get a value by way of a per value (0-1), and a min and max value
utils.valueByRange = function(per, a, b){
    per = per === undefined ? 0 : per;
    var nMin, nMax;
    if(typeof a === 'object'){
        nMin = a[0];
        nMax = a[1];
    }else{
        nMin = a === undefined ? 0 : a;
        nMax = b === undefined ? 1 : b;
    }
    return nMin + Math.round(per * (nMax - nMin));
};
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
//******** **********
//  ANGLES
//******** **********
// PI * 2
utils.PI2 = Math.PI * 2;
// unit conversion
utils.degToRad = function(n){
   return utils.mod(n, 360) / 360 * utils.PI2;
};
// normalize an angle by half
utils.normalizeHalf = function (n, scale) {
    var c = scale || utils.PI2,
    h = c / 2;
    return utils.mod(n + h, c) - h;
};
```

## 1 - The improved object pool normalized library

In revision 1 of this example I made an improved object pool library that I will likely use for future projects moving forward as a like it a lot more compared to the library that I based this off of. With my canvas example on object pools I started a library for this kind of thing that I kept copying over to other projects, each time I did so I might not change much of anything to it, other times I made improvements and added features. However with this object pool library I decided to give it a new name to help really set this one apart from the others by calling in pool normalized.

By normalized I mean thinking in terms of having a point in 2d space first and for most rather than a 2d box object with a width and height that is to be place somewhere relative to the upper left corner of the object, which was the nature of the older object pool library.

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
//******** **********
//  CREATE METHODS
//******** **********
    // create a single display object
    var createDisp = api.createDisp = function(opt, i){
        return {
            active: false,
            pool: opt.pool || null,
            i: i === undefined ? -1 : i,
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
            heading: opt.heading === undefined ? 0 : opt.heading,
            pps: opt.pps === undefined ? 32 : opt.pps,
            lifespan: opt.lifespan || 3,
            data: {}
        }
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        // the main pool object
        var pool = {
            objects: [],
            secsCap: opt.secsCap === undefined ? Infinity : opt.secsCap,
            disableLifespan: opt.disableLifespan || false,
            data: opt.data || {},
            game: opt.game || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {},
            beforeUpdate: opt.beforeUpdate || function(pool, state, secs){},
            afterUpdate: opt.afterUpdate || function(pool, state, secs){}
        };
        // populate the pools objects array
        var i = 0, dispOpt;
        while (i < opt.count) {
            var dispOpt = Object.assign({}, {pool: pool}, opt)
            pool.objects.push( createDisp(dispOpt, i) );
            i += 1;
        }
        // return the pool object
        return pool;
    };
//******** **********
//  POOL METHODS
//******** **********
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || pool.game || {};
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
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || pool.game || {}; // your projects state object
        secs = secs > pool.secsCap ? pool.secsCap : secs;
        // call beforeUpdate hook
        pool.beforeUpdate.call(pool, pool, secs, state);
        // for each object
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
        // call afterUpdate hook
        pool.afterUpdate.call(pool, pool, secs, state);
    };
    // get active objects from a pool
    api.getActiveObjects = function(pool, bool){
        bool = bool === undefined ? true : bool;
        return pool.objects.reduce(function(acc, obj){
            if(obj.active === bool){
                acc.push(obj);
            }
            return acc;
        }, []);
    };
//******** **********
//  DISP OBJECT METHODS
//******** **********
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // bounding box
    api.boundingBox = function (obj, obj2) {
        var x1 = obj.x - obj.w / 2,
        y1 = obj.y - obj.h / 2,
        x2 = obj2.x - obj2.w / 2,
        y2 = obj2.y - obj2.h / 2;
        return utils.boundingBox(x1, y1, obj.w, obj.h, x2, y2, obj2.w, obj2.h);
    };
    // purge an object ( make it inactive and call the purge method for the pool )
    api.purge = function(obj, state){
        var pool = obj.pool;
        state = state || pool.game || {};
        obj.active = false;
        pool.purge.call(pool, obj, pool, state);
    };
    // get a collection of overlaying active objects from a pool, that overlap with the given object
    api.getOverlaping = function(obj, pool){
        var i = 0,
        obj2,
        overlap = [];
        len = pool.objects.length;
        if(obj.active){
            while(i < len){
                obj2 = pool.objects[i];
                if(obj != obj2 && obj2.active){
                    if(api.boundingBox(obj, obj2)){
                         overlap.push(obj2);
                    }
                }
                i += 1;
            }
        }
        return overlap;
    };
    // get the distance between the two given disp objects
    // or a given position depending on the number of arguments given
    api.distance = function(disp, a, b){
        var x2 = 0, y2 = 0;
        if(typeof a === 'object' && a != null){
            x2 = a.x;
            y2 = a.y;
        }
        if(b != undefined){
            x2 = a;
            y2 = b;
        }
        return utils.distance(disp.x, disp.y, x2, y2);
    };
    // get the angle from the given disp, to the given other disp or position
    api.getAngleTo = function(disp, a, b){
        var x2 = 0, y2 = 0;
        if(typeof a === 'object' && a != null){
            x2 = a.x;
            y2 = a.y;
        }
        if(b != undefined){
            x2 = a;
            y2 = b;
        }
        return Math.atan2(y2 - disp.y, x2 - disp.x);
    };
    // return public method
    return api;
}
    ());
```

## 2 - The units module and plug ins

Yet another major component that I have started with this example and will likely take with me to additional projects is the unit module that I started in this example. I have made a few modules such as this in past projects, but often then end up being coded together with the game module of a project, as such it is something that I found myself writing over and over again with each project. To help put an end to this I made a stand alone units module, complete with a plug in system that will allow for me to septate logic that has to do with specific kinds of units such as units that move, units that just stay in a fixed location, and various other kinds of units such as shots.

```js
var unitsMod = (function () {
//  HARD SETTINGS VALUES
    var SECS_CAP = 1,
    UNIT_STATS_DEFAULTS = {
        range: 100,
        attack: 1,
        subType: 'none'
    },
    UNIT_PPS_MIN = 32,
    UNIT_PPS_MAX = 64;
    // the unit types object that is to be extended
    // by calling unitsMod.load
    var UNIT_TYPES = {};
//  PUBLIC API
    // the public api
    var api = {};
    // parse core stats for a unit
    api.coreStats = function(unit, spawnOpt, defaults){
        defaults = defaults || UNIT_STATS_DEFAULTS;
        var uDat = unit.data;
        // parse core stats
        ['attack', 'range', 'subType'].forEach(function(statKey){
            uDat[statKey] = spawnOpt[statKey] === undefined ? defaults[statKey] : spawnOpt[statKey];
        });
    };
    // totalPower of a pool
    api.totalPower = function(pool){
        var power = 0;
        // for each active object
        poolMod.getActiveObjects(pool, true).forEach(function(unit){
           var uDat = unit.data;
           // dps
           power += uDat.attack / uDat.fireRate;
           // 
        });
        return Math.round(power);
    };
    // get a target or set current to default null value
    api.getTarget = function(unit, targetPool, game){
        // defualt to no target
        unit.data.target = null;
        // get current active buildings and sort by distance
        var targets = poolMod.getActiveObjects(targetPool).sort(function(a, b){
            var d1 = poolMod.distance(unit, a),
            d2 = poolMod.distance(unit, b);
            if(d1 < d2){
                return -1;
            }
            if(d1 > d2){
                return 1;
            }
            return 0;
        });
        // if we have one or more targets set a target
        if(targets.length >= 1){
            unit.data.target = targets[0];
        }
    };
    // fire at target method
    api.fireAtTarget = function(unit, opt){
        opt = opt || {};
        opt.onNoTarget = opt.onNoTarget || function(unit, game){};
        opt.secs = opt.secs || 0;
        opt.game = opt.game || {};
        var uDat = unit.data;
        var target = uDat.target;
        // if target is null call onNoTarget
        if(target === null){
            opt.onNoTarget(unit, opt.game);
        }else{
            // if target is longer active, set target back to null, and call onNoTarget
            if(!target.active){
                uDat.target = null;
                opt.onNoTarget(unit, opt.game);
            }else{
                // attack target!
                uDat.fireSecs += opt.secs;
                if(uDat.fireSecs >= uDat.fireRate){
                    uDat.fireSecs = utils.mod(uDat.fireSecs, uDat.fireRate);
                    // spawn a shot
                    poolMod.spawn(opt.game.shots, opt.game, {
                        subType: uDat.shotSubType,
                        strokeStyle: opt.strokeStyle || 'yellow',
                        fillStyle: opt.fillStyle || 'yellow',
                        attack: uDat.attack,
                        sx: unit.x, sy: unit.y,
                        ex: target.x, ey: target.y,
                        heading: poolMod.getAngleTo(unit, target),
                        accuracy: uDat.accuracy,
                        range: uDat.range,
                        hitPool: opt.hitPool
                    });
                }
            }
        }
    };
    // load a unit type 
    api.load = function(typeOptions){
        var typeKey = typeOptions.typeKey || Object.keys(UNIT_TYPES).length; 
        console.log('setting the given typeOptions object at key: ' + typeKey);
        // just ref the object for now if that works okay
        UNIT_TYPES[typeKey] = typeOptions;
    };
    // change the mode of a given unit
    api.changeMode = function(unit, modeKey, pool, game){
        var uDat = unit.data;
        uDat.mode = modeKey;
        var modeObj = pool.data.modes[uDat.mode]; //UNIT_MODES[uDat.mode];
        uDat.modeTime = 0;
        uDat.lastRoll = 0;
        // call init hook of new mode obj
        modeObj.init.call(unit, unit, pool, game);
    };
    // random heading helper
    api.randomHeading = function(){
       return utils.PI2 * Math.random();
    };
    // random ppx helper
    api.randomPPS = function(){
       return UNIT_PPS_MIN + Math.round((UNIT_PPS_MAX - UNIT_PPS_MIN) * Math.random());
    };
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var typeOptions = UNIT_TYPES[opt.type];
        var unitOpt = typeOptions ? typeOptions : UNIT_OPTIONS;
        var options = Object.assign({}, unitOpt, opt);
        // data object should have the modes
        options.data = {
            modes: options.modes
        };
        return poolMod.create(options);
    };
    // public update method
    api.update = function (units, secs, state) {
        secs = secs > SECS_CAP ? SECS_CAP : secs;
        // update units
        poolMod.update(units, secs, state);
    };
    // return the public API
    return api;
}
    ());
```

### 2.1 - The attackers plug in

The attackers plug in for my units module contains the logic for the units that will spawn from the outside of the canvas and then select a target that is one of the buildings and move it to attack.

```js
unitsMod.load( (function () {
 
    ATTACKER_SPAWN_RADIUS = [450, 600];
 
// HELPERS
    var getAttackerStartPos = function(game){
        var canvas = game.sm.canvas,
        cx = canvas.width / 2,
        cy = canvas.height / 2,
        pos = {},
        radian = unitsMod.randomHeading(),
        radius = utils.valueByRange(Math.random(), ATTACKER_SPAWN_RADIUS)
        pos.x = cx + Math.cos(radian) * radius;
        pos.y = cy + Math.sin(radian) * radius;
        return pos;
    };
 
    var setOverlapColor = function(unit){
        unit.data.fillStyle = 'blue';
        var overlap = poolMod.getOverlaping(unit, unit.pool).length;
        if(overlap > 0){
            unit.data.fillStyle = 'red';
        }
    };
 
// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'attackers',
        count: 6,
        disableLifespan: true
    };
 
    // unit modes
    var UNIT_MODES = {};
 
    // attack the current target switching back to idle if the target is null of not active
    UNIT_MODES.attackTarget = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // set overlap color in move mode also for now
            setOverlapColor(unit);
            // fire at target
            unitsMod.fireAtTarget(unit, {
                game: game,
                secs: secs,
                hitPool: game.buildings,
                onNoTarget: function(unit, game){
                    unitsMod.changeMode(unit, 'idle', pool, game);
                }
            });
        }
    };
 
    // move to the current target, and switch to attackTarget mode when it range. For othe cases switch back to idle
    UNIT_MODES.moveToTarget = {
        init: function(unit, pool, game){
 
        },
        update: function(unit, pool, game, secs){
            // set overlap color in move mode also for now
            setOverlapColor(unit);
            // update target?
            unitsMod.getTarget(unit, game.buildings, game);
            // ref to target
            var target = unit.data.target;
            // if target is null return to idle mode
            if(target === null){
                unitsMod.changeMode(unit, 'idle', pool, game);
            }else{
                // if target is no longer active, set target back to null, and go back to idle mode
                if(!target.active){
                    unit.data.target = null;
                    unitsMod.changeMode(unit, 'idle', pool, game);
                }else{
                    // distance and abgle
                    var d = poolMod.distance(unit, unit.data.target),
                    a = poolMod.getAngleTo(unit, unit.data.target);
                    // set heading of unit to move to target
                    unit.heading = a;
                    // if distance to building is greater that range move
                    if(d > 120){
                        poolMod.moveByPPS(unit, secs);
                    }else{
                       // else the unit is in range, and thus can attack
                       unitsMod.changeMode(unit, 'attackTarget', pool, game);
                    }
                }
            }
        }
    };
 
    // get a target and switch to move to target, or back to idle
    UNIT_MODES.getTarget = {
        init: function(unit, pool, game){
            unit.data.target = null;
        },
        update: function(unit, pool, game, secs){
            // try to get a target
            unitsMod.getTarget(unit, game.buildings, game);
            // if we have a target move to it
            if(unit.data.target){
                unitsMod.changeMode(unit, 'moveToTarget', pool, game);
            }else{
                // no active targets? return to idle
                unitsMod.changeMode(unit, 'idle', pool, game);
            }
        }
    };
 
    UNIT_MODES.moveOut = {
        init: function(unit, pool, game){
            unit.heading += Math.PI;
            unit.heading = utils.mod(unit.heading, utils.PI2);
 
            unit.data.yaw = Math.PI / 180 * (-10 + 20 * Math.random())
        },
        update: function(unit, pool, game, secs){
            var canvas = game.sm.canvas;
            // set overlap color in move mode also for now
            setOverlapColor(unit);
            var targets = poolMod.getActiveObjects(game.buildings),
            targetCount = targets.length;
            if(targetCount > 5){
                unitsMod.changeMode(unit, 'idle', pool, game);
            }
            // distance from center
            var dc = poolMod.distance(unit, canvas.width / 2, canvas.height / 2);
            if(dc < ATTACKER_SPAWN_RADIUS[0]){
                unit.heading += unit.data.yaw * secs;
                unit.heading = utils.mod(unit.heading, utils.PI2);
                poolMod.moveByPPS(unit, secs);
            }
        }
    };
 
    // idle mode - what an attacker should do while it is active, but does not have any kind
    // of task such as seeking a target, moving to a new location ect, attacking a building ect.
    UNIT_MODES.idle = {
        init: function(unit, pool, game){
            unit.data.target = null;
        },
        update: function(unit, pool, game, secs){
            // set overlap color for now in this mode
            setOverlapColor(unit);
            // if there are targets switch to getTarget mode
            var targets = poolMod.getActiveObjects(game.buildings),
            targetCount = targets.length;
            if(targetCount > 0){
                unitsMod.changeMode(unit, 'getTarget', pool, game);
            }else{
                // if no targets
                unitsMod.changeMode(unit, 'moveOut', pool, game);
            }
        }
    };
 
    UNIT_OPTIONS.modes = UNIT_MODES;
 
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas,
        uDat = unit.data;
        // STATS
        //uDat.attack = 1;
        //uDat.range = 150;
        unitsMod.coreStats(unit, spawnOpt, {attack: 1, range: 150});
 
        uDat.shotSubType = 'shot.shell';
        uDat.fireRate = 0.25;
        uDat.fireSecs = 0;
        uDat.accuracy = 0.25;
        uDat.hpMax = 10;
        uDat.hp = unit.data.hpMax;
 
        // the current target to attack
        uDat.target = null;
        // mode of the unit
        uDat.mode = spawnOpt.mode || 'idle';
        // colors
        uDat.fillStyle = '#aa0000';
        // alpha
        uDat.alpha = 1;
        // size
        unit.w = 32;
        unit.h = 32;
        // start position
        Object.assign(unit, getAttackerStartPos(game));
        // heading
        unit.heading = unitsMod.randomHeading();
        // speed
        unit.pps = 64; //32; //unitsMod.randomPPS();
        // chance mode
        unitsMod.changeMode(unit, uDat.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var modeObj = pool.data.modes[unit.data.mode];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };
 
    UNIT_OPTIONS.beforeUpdate = function(pool, secs, game){
        poolMod.spawn(pool, game, {});
    }
 
    // return the OPTIONS object to use to create
    // this type of unit
    return UNIT_OPTIONS;
}
    ()) );
```

### 2.2 - The Buildings plug in

I then have the fixed buildings in the center of the canvas so of course I am going to want a units plug in for that as well.

```js
unitsMod.load( (function () {
 
// HELPERS
 
    // spawn building helper
    var spawnBuilding = function(game, pool){
        // spawn buidling
        var canvas = game.sm.canvas,
        space = 5,
        unitsPerAxis = 5,
        sx = canvas.width / 2 - ((32 + space) * (unitsPerAxis - 1 ) / 2),
        sy = canvas.height / 2 - ((32 + space) * ( unitsPerAxis - 1) / 2);
        // get a random area
        var areaDisp = poolMod.createDisp({
            x: sx + (32 + space) * Math.floor( unitsPerAxis * Math.random()) ,
            y: sy + (32 + space) * Math.floor( unitsPerAxis * Math.random())
        });
        // check to see of area if not taken
        var active = poolMod.getActiveObjects(pool),
        ai = active.length,
        good = true;
        while(ai--){
            var disp = active[ai];
            if(poolMod.boundingBox(areaDisp, disp)){
                good = false;
                break;
            }
        }
        // if we have a good location spawn
        if(good){
            poolMod.spawn(pool, game, {x: areaDisp.x, y: areaDisp.y});
        }
    };
 
    var attackUpdate = function(unit, game, secs){
        // set or update target
        unitsMod.getTarget(unit, game.attackers, game);
        // if we have a target
        if(unit.data.target){
            // check if the target is in range, if so fire
            var d = poolMod.distance(unit, unit.data.target);
            if(d <= unit.data.range){
                // fire at target
                unitsMod.fireAtTarget(unit, {
                    strokeStyle: 'blue',
                    fillStyle: 'cyan',
                    game: game,
                    secs: secs,
                    hitPool: game.attackers,
                    onNoTarget: function(unit, game){
                  
                    }
                });
            }
        }
    };
 
// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'buildings',
        count: 10,
        disableLifespan: true
    };
 
    // unit modes
    var UNIT_MODES = {};
    
    // idle
    UNIT_MODES.idle = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
           
 
            attackUpdate(unit, game, secs);
 
        }
    };
 
    UNIT_OPTIONS.modes = UNIT_MODES;
 
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas,
        uDat = unit.data;
        // mode of the unit
        uDat.mode = spawnOpt.mode || 'idle';
        // STATS
        unitsMod.coreStats(unit, spawnOpt, {attack: 3, range: 150});
        uDat.shotSubType = 'shot.bullet';
        uDat.fireRate = 0.5;
        uDat.fireSecs = 0;
        uDat.accuracy = 0.25;
        uDat.hpMax = 10;
        uDat.hp = unit.data.hpMax;
        // colors
        uDat.fillStyle = 'white'
        // alpha
        uDat.alpha = 1;
        // size
        unit.w = 32;
        unit.h = 32;
        // start position
        unit.x = spawnOpt.x;
        unit.y = spawnOpt.y;
        // heading and speed not used
        unit.heading = 0;
        unit.pps = 0;
        // chance mode
        unitsMod.changeMode(unit, uDat.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var modeObj = pool.data.modes[unit.data.mode];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };
 
    UNIT_OPTIONS.beforeUpdate = function(pool, secs, game){
        // set spawn secs of not there
        pool.data.spawnSecs = pool.data.spawnSecs === undefined ? 0 : pool.data.spawnSecs; 
        pool.data.spawnSecs += secs;
        if(pool.data.spawnSecs > 1){
            spawnBuilding(game, pool);
            pool.data.spawnSecs = 0;
        }
    };
 
    // return the OPTIONS object to use to create
    // this type of unit
    return UNIT_OPTIONS;
}
    ()) );
```

### 2.3 - The shots plug in

Both the attacker units and the building units will fire shots at each other, so then there will need to be another plug in for the units module that will contain the logic used for a shared object pool of shots.

```js
unitsMod.load( (function () {
 
    var SHOT_MAX_ACCURACY_HEADING_DELTA = utils.degToRad(20),
    SHOT_DEFAULTS = {
        range: 100,
        attack: 1,
        subType: 'shot.bullet'
    }
 
   var subTypes = {};
   
   subTypes.shot = {};
   
   subTypes.shot.bullet = {
       // check for one or more hits of any target in hitPool when moving and do not
       // care about any end point position
       hitCheck: true,
       endPointCheck: false,
       // a bullet will purge if at range
       atRange : function(unit, pool, game, secs){
            poolMod.purge(unit, game);
       },
       // when one or more objects are hit
       onHit : function(unit, pool, game, secs, hitObjects){
            var uDat = unit.data;
            if(hitObjects.length > 0){
                // bullets are single hit
                var target = hitObjects[hitObjects.length - 1];
                //hitObjects.forEach(function(target){
                    target.data.hp -= uDat.attack;
                    target.data.hp = target.data.hp < 0 ? 0 : target.data.hp;
                    if(target.data.hp === 0){
                        poolMod.purge(target, game);
                    }
                //});
            }
            // purge shot
            poolMod.purge(unit, game);
       },
       onEndPoint: function(unit, pool, game, secs){
 
       }
   };
   
   subTypes.shot.shell = {
       // no hit detection while moving, but check endPoint
       hitCheck: false,
       endPointCheck: true,
       atRange : function(unit, pool, game, secs){
           // purging for now, but the shot should switch to blast mode
           // also it should not even get to this point
           poolMod.purge(unit, game);
       },
       onHit : function(unit, pool, game, secs, hitObjects){},
       onEndPoint: function(unit, pool, game, secs){
            var uDat = unit.data;
            // blast!
            var blastRadius = 32;
            unit.w = blastRadius * 2;
            unit.h = blastRadius * 2;
            var hitObjects = poolMod.getOverlaping(unit, uDat.hitPool);
            hitObjects.forEach(function(target){
                var d = poolMod.distance(unit, target);
                d = d > blastRadius ? blastRadius: d;
                var damagePer = 1 - (d / blastRadius);
                target.data.hp -= uDat.attack * damagePer;
                target.data.hp = target.data.hp < 0 ? 0 : target.data.hp;
                if(target.data.hp === 0){
                    poolMod.purge(target, game);
                }
           });
           poolMod.purge(unit, game);
       }
   };
 
// THE OPTIONS OBJECT 
    var UNIT_OPTIONS = {
        typeKey: 'shots',
        count: 10,
        disableLifespan: true
    };
 
    // unit modes
    var UNIT_MODES = {};
   
    // The atRange mode is what needs to happen when a shot is at or beyond the max range of the shot
    UNIT_MODES.atRange = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            // call at range method for the current subType
            unit.data.subTypeObj.atRange(unit, pool, game, secs);
        }
    };
 
    // a shot enters hit mode when a shot hits one ore more units in the hitPool of the shot
    UNIT_MODES.hit = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            var hitObjects = poolMod.getOverlaping(unit, uDat.hitPool);
            unit.data.subTypeObj.onHit(unit, pool, game, secs, hitObjects);
        }
    };
 
    // The general move mode of a shot
    UNIT_MODES.move = {
        init: function(unit, pool, game){},
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // distance from start position
            var ds = poolMod.distance(unit, uDat.sx, uDat.sy);
            // move and switch to at rangMode if set range is reached
            poolMod.moveByPPS(unit, secs);
            // if distance from start point is at or over range
            if(ds >= uDat.range){
                // make sure shot is at range, not beyond
                unit.x = uDat.sx + Math.cos(unit.heading) * uDat.range;
                unit.y = uDat.sy + Math.sin(unit.heading) * uDat.range;
                // switch to at range mode
                unitsMod.changeMode(unit, 'atRange', pool, game);
            }
            // end point check
            if(uDat.subTypeObj.endPointCheck){
               // is the distance from the start point greater than that distance to the end point?
               var de = utils.distance(uDat.sx, uDat.sy, uDat.ex, uDat.ey);
               if(ds >= de){
                   
                   unit.x = uDat.sx + Math.cos(unit.heading) * de;
                   unit.y = uDat.sy + Math.sin(unit.heading) * de;
                   uDat.subTypeObj.onEndPoint(unit, pool, game, secs);
               }
            }
            // check hit pool and switch to hitMode if one or more objects where hit
            if(uDat.hitPool && uDat.subTypeObj.hitCheck){
                var hitObjects = poolMod.getOverlaping(unit, uDat.hitPool);
                if(hitObjects.length > 0){
                    unitsMod.changeMode(unit, 'hit', pool, game);
                }
            }
        }
    };
 
    UNIT_OPTIONS.modes = UNIT_MODES;
 
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas,
        uDat = unit.data;
        // current mode of the unit
        uDat.mode = spawnOpt.mode || 'move';
        // SHOT STATS
        // core stats
        unitsMod.coreStats(unit, spawnOpt, SHOT_DEFAULTS);
        uDat.subTypeObj = utils.getPath(subTypes, uDat.subType, {});
        // shot hitPool - a pool to check on each update to see if something that hot or not
        uDat.hitPool = spawnOpt.hitPool || null;
        // colors
        uDat.strokeStyle = spawnOpt.strokeStyle || 'white';
        uDat.fillStyle = spawnOpt.fillStyle || 'white';
        // alpha
        uDat.alpha = 1;
        // size
        unit.w = 4;
        unit.h = 4;
        // start position
        uDat.sx = spawnOpt.sx || 0;
        uDat.sy = spawnOpt.sy || 0;
        unit.x = uDat.sx;
        unit.y = uDat.sy;
        // end x and y used for shells
        uDat.ex = spawnOpt.ex;
        uDat.ey = spawnOpt.ey;
        // heading and speed not used
        unit.heading = spawnOpt.heading || 0;
        // apply accuracy
        var delta = SHOT_MAX_ACCURACY_HEADING_DELTA,
        accuracy = spawnOpt.accuracy === undefined ? 0 : spawnOpt.accuracy;
        delta = delta * -1 + delta * 2 * Math.random();
        unit.heading += delta * (1 - accuracy);
        unit.pps = 128;
        // chance mode
        unitsMod.changeMode(unit, uDat.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var modeObj = pool.data.modes[unit.data.mode];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };
    // return the Options object
    return UNIT_OPTIONS;
}
    ()) );
```

## 3 - The game module

So then sense most of the logic that has to do with the game is pulled out of the main game module and into units module plug ins that results in a cleaner main game module. This is still the module where I will be creating the main game state object as well as updating such an object.

```js
var gameMod = (function () {
    // the public api
    var api = {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            power: {
               buildings: 0,
               attackers: 0
            }
        };
        // create game units
        game.buildings = unitsMod.create({
            type: 'buildings',
            game: game,
            count: 20
        });
        // create game units
        game.attackers = unitsMod.create({
            type: 'attackers',
            game: game,
            count: 10
        });
        // create game units
        game.shots = unitsMod.create({
            type: 'shots',
            game: game,
            count: 100
        });
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        // update units
        unitsMod.update(game.shots, secs, sm.game);
        unitsMod.update(game.attackers, secs, sm.game);
        unitsMod.update(game.buildings, secs, sm.game);
        // power stats
        game.power.buildings = unitsMod.totalPower(game.buildings);
        game.power.attackers = unitsMod.totalPower(game.attackers);
    };
    // return the public API
    return api;
}
    ());
```

## 4 - The draw module

Sense this is a digital art project of course there is a library that contains a collection of methods that can be used to draw the various aspects of the main game object to the canvas.

```js
var draw = (function(){
    var DEFAULT_LINE_WIDTH = 1,
    DEFAULT_STROKE_STYLE = 'black',
    DEFAULT_FILL_STYLE = 'white',
    DEFAULT_TEXT_COLOR = 'yellow',
    DEFAULT_COLOR_STOPS = [
       [0, 'black'],
       [1, 'white']
    ];
    // HELPERS
    var createBackground = function(ctx, canvas, opt){
        // options
        opt = opt || {};
        opt.angle = opt.angle === undefined ? Math.PI * 0.25: opt.angle;
        opt.radius = opt.radius === undefined ? 150 : opt.radius;
        // create locals
        var cx = canvas.width / 2,
        cy = canvas.height / 2,
        dx = Math.cos(opt.angle) * opt.radius,
        dy = Math.sin(opt.angle) * opt.radius,
        sx = cx - dx,
        sy = cy - dy,
        ex = cx + dx,
        ey = cy + dy;
        // create gradient
        var gradient = ctx.createLinearGradient(sx, sy, ex, ey);
        // Add color stops
        var colorStops = opt.colorStops || DEFAULT_COLOR_STOPS;
        colorStops.forEach(function(colorStop){
            gradient.addColorStop(colorStop[0], colorStop[1]);
        });
        // return gradiant
        return gradient;
    };
    var drawDisp = function(sm, disp, ctx, canvas){
        var hpPer = 0,
        dDat = disp.data;
        // if the object is active
        if (disp.active) {
            // draw base area as recr
            ctx.beginPath();
            ctx.rect(disp.x - disp.w / 2, disp.y - disp.h / 2, disp.w, disp.h);
            ctx.fill();
            ctx.stroke();
            // draw base area as circle
            ctx.beginPath();
            ctx.arc(disp.x, disp.y, (disp.w + disp.h) / 2 / 2, 0, utils.PI2);
            ctx.fill();
            ctx.stroke();
            // hp bar
            if(dDat.hp != undefined){
               var x = disp.x - disp.w / 2,
               y = disp.y - disp.h / 2;
               hpPer = dDat.hp / dDat.hpMax;
               ctx.fillStyle = 'lime';
               ctx.fillRect(x, y, disp.w * hpPer, disp.h * 0.15 );
            }
        }
    };
    // PUBLIC API METHODS
    var api = {};
    // draw the background
    api.background = function (sm, ctx, canvas) {
        var bg = createBackground(ctx, canvas, sm.background);
        ctx.fillStyle = bg;
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    };
    // draw the pool
    api.pool = function (sm, pool, ctx, canvas) {
        //var pool = game.units;
        ctx.lineWidth = DEFAULT_LINE_WIDTH;
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || DEFAULT_FILL_STYLE;
            ctx.strokeStyle = obj.data.strokeStyle || DEFAULT_STROKE_STYLE;
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            drawDisp(sm, obj, ctx, canvas);
        });
        ctx.globalAlpha = 1;
    };
    // draw status info
    api.status = function (sm, ctx, canvas) {
        var game = sm.game,
        power = game.power;
        ctx.fillStyle = DEFAULT_TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('power buildings: ' + power.buildings, 10, 10);
        ctx.fillText('power attackers: ' + power.attackers, 10, 25);
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = DEFAULT_TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
```

## 5 - The main javaScript file

I am then just going to need a little more additional logic that will provide a main application loop, and a main state object.
```js
// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// main sm object
var sm = {
    ver: 'r6',
    lt: new Date(),
    fps: 30,
    game: null,
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    background: {
       angle: 1,
       degreesPerSec: -5,
       radius: 200
    }
};
// set up game object
sm.game = gameMod.create({
        sm: sm
    });
// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        // update game
        gameMod.update(sm.game, secs);
        // draw
        draw.background(sm, sm.ctx, sm.canvas);
        draw.pool(sm, sm.game.buildings, sm.ctx);
        draw.pool(sm, sm.game.attackers, sm.ctx);
        draw.pool(sm, sm.game.shots, sm.ctx);
        draw.status(sm, sm.ctx, sm.canvas);
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
    }
};
loop();
```

## 6 - Conclusion

So then this example turned out pretty great, and I was able to get the core idea of what I had in mind up and running pretty fast. As of this writing I have a lot planed out for the rest of the example when it comes to the additional features phase of this example, in time I might complete that phase and have something that is even more interesting than what I have all ready, but I do also have a lot of competing ideas also so we will see if I get to the maintenance phase with this one.

Even if I do not complete the additional features planed out for this example, a whole lot has been created and improved that I will be taking with me to additional examples.
