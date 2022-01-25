---
title: New Object Pool library javaScript example
date: 2022-01-24 11:43:00
tags: [js]
layout: post
categories: js
id: 954
updated: 2022-01-25 15:56:49
version: 1.9
---

Looks like I will be continuing to expand on my collection of [javaScript examples](/2021/04/02/js-javascript-example/) posts with a new examples as it just seems like the thing to do once I write about the [basics of javaScript](/2018/11/27/js-getting-started/). This week the example that I made is a new object pool library that I made for a recent digital art example earlier this month. After doing so I thought that this new object pool library deserves a [for post folder of its own in my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-pool-normalized), and I should also maybe mack at least one if not more examples that make use of this library when it comes to making additional javaScript projects.

This is not the first time I made this sort of library that I then end up using in one or more additional projects, in fact this is still very much based off of what I started in my [canvas examples series post on this subject of object pools](/2020/07/20/canvas-example-object-pool/). If you are not sure what an [object pool is](https://en.wikipedia.org/wiki/Object_pool_pattern) the general idea is more or less as the term descries, it is just a system of creating a pool of objects that are then used over and over again, rather than creating and destroying objects as needed.

One major improvement that I wanted to make with this object pool library is how the object state is stored as well as rendered. The older object pool module that I based this on centered around the idea of having the x and y values of an object refer to the upper left corner of a display object. In this pool I wanted to change things with the various methods so that the x and y values refer to the center point of a display object actually, and then things are figured out from there. While I was at it I started to make some additional improvements on top of that of course though. As I keep copying the source code of the original library over from project to project I have made little additions here and there with this, one of which is a wrap object method which is a typical methods that is needed for a library such as thins, however for this version of the library I also added a clamp method.

<!-- more -->


## 1 - The pool normalized lib

So then in this section I will want to start out with the state of the source code of the object pool library itself before continuing with additional dependencies and files to make use of this.

```js
var poolMod = (function () {
    // Public API
    var api = {
        ver: 'r2'
    };
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
    // spawn all objects
    api.spawnAll = function(pool, state, opt){
        state = state || pool.game || {};
        pool.objects.forEach(function(obj){
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        });
        return pool.objects;
    };
    // spawn all objects
    api.purgeAll = function(pool, state, opt){
        state = state || pool.game || {};
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
    // get a current active count for a pool
    api.getActiveCount = function(pool, bool){
        return api.getActiveObjects(pool, bool).length;
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
    // wrap an object to an area like a canvas
    api.wrap = function(obj, area, space){
        area = area || {width: 640, height: 480 };
        space = space === undefined ? 0 : space;
        // using new utils.wrapNumber method
        obj.x = utils.wrapNumber(obj.x, 0 - space, area.width + space);
        obj.y = utils.wrapNumber(obj.y, 0 - space, area.height + space);
    };
    // clamp an object to an area like a canvas
    api.clamp = function(obj, area, space){
        area = area || {x: 0, y: 0, width: 640, height: 480 };
        area = Object.assign({}, {x: area.x, y: area.y, width: area.width, height: area.height}, {x: 0, y: 0});
        space = space === undefined ? 0 : space;
        var xMin = area.x - space,
        xMax = area.x + area.width + space,
        yMin = area.y - space,
        yMax = area.y + area.height + space;
        if(obj.x < xMin){ obj.x = xMin; }
        if(obj.x > xMax){ obj.x = xMax; }
        if(obj.y < yMin){ obj.y = yMin;}
        if(obj.y > yMax){ obj.y = yMax; }
    };
    // find out if an object is on edge or not with the given area and space values
    api.isOnEdge = function(obj, area, space){
        area = area || {x: 0, y: 0, width: 640, height: 480 };
        area = Object.assign({}, {x: area.x, y: area.y, width: area.width, height: area.height}, {x: 0, y: 0});
        space = space === undefined ? 0 : space;
        var xMin = area.x - space,
        xMax = area.x + area.width + space,
        yMin = area.y - space,
        yMax = area.y + area.height + space;
        if(obj.x === xMin){ return true; }
        if(obj.x === xMax){ return true; }
        if(obj.y === yMin){ return true; }
        if(obj.y === yMax){ return true; }
        return false;
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
    // center the disp to the given areaObj, the areaObj can be a canvas
    api.centerDisp = function(obj, areaObj){
        areaObj = areaObj === undefined ? {width: 0, height: 0} : areaObj;
        obj.x = areaObj.width / 2;
        obj.y = areaObj.height / 2;
    };
    // return public method
    return api;
}
    ());
```

## 2 - Utilities of this example

Just like with my many other javaScript examples I typical have a utilities library that contains a lot of methods that I will use in my various files that compose an over all project.

```js
var utils = {};
 
//******** **********
//  MISC
//******** **********
 
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
//  DOM
//******** **********
 
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
 
//******** **********
//  OBJECT
//******** **********
 
// chunk and array
utils.chunk = function (arr, size) {
    var chunkedArr = [];
    arr = arr || [];
    size = size === undefined ? 1 : size;
    for (var i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};
 
//******** **********
//  ANGLES
//******** **********
 
// PI * 2
utils.PI2 = Math.PI * 2;
// unit conversion
utils.radToDeg = function(n){
    return utils.mod(n, utils.PI2) / utils.PI2 * 360;
};
utils.degToRad = function(n){
   return utils.mod(n, 360) / 360 * utils.PI2;
};
// normalize an angle by half
utils.normalizeHalf = function (n, scale) {
    var c = scale || utils.PI2,
    h = c / 2;
    return utils.mod(n + h, c) - h;
};
// the angular distance between two angles
utils.angleDistance = function (a, b, scale) {
    var m = scale || utils.PI2,
    h = m / 2,
    diff = utils.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return utils.mod( Math.abs(diff), m);
};
// get the angle from one point to another
utils.getAngleToPoint = function (pt1, pt2, scale) {
    var a = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x);
    return utils.normalizeHalf(a, scale || utils.PI2);
};
// get -1, 1, or 0 depending on the the state of two angles
utils.shortestAngleDirection = function (a1, a2, scale) {
    var z = a1 - a2,
    x = utils.normalizeHalf(z, scale || utils.PI2);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};
```

## 3 - Draw module

```js
var draw = (function(){
    // hard settings
    var BACKGROUND_COLOR = 'gray',
    LINE_WIDTH = 3,
    STROKE_STYLE = 'black',
    FILL_STYLE = 'white',
    TEXT_COLOR = 'yellow';
    // draw disp
    var drawDisp = function(sm, disp, ctx, canvas){
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
            // draw small circle over obj.x, obj.y
            ctx.beginPath();
            ctx.fillStyle = FILL_STYLE;
            ctx.arc(disp.x, disp.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
    // PUBLIC API METHODS
    var api = {};
    // draw the background
    api.background = function (sm, ctx, canvas) {
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(-1, -1, canvas.width + 2, canvas.height + 2);
    };
    // draw the pool
    api.pool = function (sm, pool, ctx, canvas) {
        ctx.lineWidth = LINE_WIDTH;
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || FILL_STYLE;
            ctx.strokeStyle = obj.data.strokeStyle || STROKE_STYLE;
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            drawDisp(sm, obj, ctx, canvas);
        });
        ctx.globalAlpha = 1;
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = TEXT_COLOR;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '14px arial';
        ctx.fillText('version: ' + poolMod.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
```

## 4 - Main javaScript file

```js
// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// pool options object
var POOL_OPT = {
    count: 10,
    disableLifespan: true
};
// on spawn
var modes = ['wrap', 'clamp'],
mIndex = 0;
POOL_OPT.spawn = function (unit, pool, sm, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = sm.canvas;
        // usere defined data for this example
        var uDat = unit.data;
        uDat.alpha = 1;
        uDat.size = 32;
        uDat.mode = modes[mIndex];
        uDat.fillStyle = uDat.mode === 'wrap' ? '#008888' : '#880088';
        mIndex += 1;
        mIndex = utils.mod(mIndex, modes.length);
        // size and pos
        unit.w = uDat.size;
        unit.h = uDat.size;
        unit.x = canvas.width / 2;
        unit.y = canvas.height / 2;
        // heading
        unit.heading = utils.PI2 * Math.random();
        // speed
        unit.pps = utils.valueByRange(Math.random(), [32, 256]);
};
// update a unit
POOL_OPT.update = function (unit, pool, sm, secs) {
    var uDat = unit.data;
    poolMod.moveByPPS(unit, secs);
    if(uDat.mode === 'wrap'){
        poolMod.wrap(unit, sm.canvas, unit.data.size)
    }
    if(uDat.mode === 'clamp'){
        var space = unit.data.size / 2 * -1;
        poolMod.clamp(unit, sm.canvas, space);
        if(poolMod.isOnEdge(unit, sm.canvas, space)){
            unit.heading = utils.PI2 * Math.random();
        }
    }
};
 
// main sm object
var sm = {
    lt: new Date(),
    fps: 30,
    pool: poolMod.create(POOL_OPT),
    ctx: canvasObj.ctx,
    canvas: canvasObj.canvas,
    background: {
       angle: 1,
       degreesPerSec: -5,
       radius: 200
    }
};
 
// spawn all
poolMod.spawnAll(sm.pool, sm, {})
 
// basic app loop
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / sm.fps) {
        // update pool
        poolMod.update(sm.pool, secs, sm);
        // draw
        draw.background(sm, sm.ctx, sm.canvas);
        draw.pool(sm, sm.pool, sm.ctx);
        draw.ver(sm, sm.ctx, sm.canvas);
        // set sm.lt to now
        sm.lt = now;
    }
};
loop();
```

## 5 - Conclusion

