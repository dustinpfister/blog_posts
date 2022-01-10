---
title: Unsteady Stars Digital Art javaScript example
date: 2022-01-10 14:10:00
tags: [js]
layout: post
categories: js
id: 950
updated: 2022-01-10 15:44:04
version: 1.14
---

Over the last few days I was working on yet another one of my [javaScript examples](/2021/04/02/js-javascript-example/) this time it is yet another Digital Art Projects based off of [revision 5 of my first Object Pool Reduction digital art example](/2021/12/31/js-javascript-example-digital-art-reduce-pool/) that I started late last year. This time around I wanted to make a quick project that was just a bunch of display objects moving around the canvas, each of which also contains a collection of points that form a star. However this is not just any star, but a kind of unsteady star that has more than one collection of points attached to it. One collection of points is a bunch of home points that are the pure position locations for each point in the star, then other collections of points have to do with old, target, and current positions. So then the points move from the home positions to random positions that are a certain random radius and angle from each home position. So then simply put they end up being collections of points that look like stars but the points will move around to these random locations within a range of each home point.

The main goal of this project was not just to create yet another digital art project, but also to continue to practice and refine the basic process that I started with in my first digital art javaScript example project. That is to come up with what the Core idea of a project is first, finish that, then move on to a few additional features. Also when it comes to additional features set a limit as to how many of them there will be, and try to focus on what I really want or need to add to the project. Then onces the few features are done, sop adding features and focus on code readability and fixing bugs. This kind of process combined with sticking to simple, artful projects will then result in me actually finishing a project, and then I will be free to move on to the next idea. With that said I would say that the main goal of this project was a success, now it is just doing the same of the next project, and the project after that. Keeping the ides simple and in the scope of something that I can complete in a few days, or at most a month if it is something that is a little involves.

<!-- more -->

## What to know first before continuing to read this post

This is one of my many posts on a full javaScript example that might be a fairly basic example, but still it is a fair amount of code stretched over several files. This is then not a post intended for people that are new to javaScript, but rather for people that have at least a little experience with javaScript and would like to now start working on some actually prototypes for various kinds of projects.

### The source code for this javaScript example as well as other notes and assets can be found on Github

The full up to date source code for this example can also be found on my [test vjs Github Repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-digital-art-unsteady-stars). This might also be the best way to pull down and use not just this javaScipt example, but all my other javaScript examples that I have made over the years for each [post I have wrote on javaScript in general](/categories/js/).

## 1 - The utilities library

The [utilities library](/2021/08/06/js-javascript-example-utils/) for this example contains a number of methods that I will be using throughout the other files in this over all project. So then many of these methods are usual suspect type methods that I end up using in just about any other javaScript example of mine, but I sill keep the example more or less custom cut for the specific project.

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
// PI * 2
utils.PI2 = Math.PI * 2;
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

## 2 - The star module

The star module that I am suing for this example is based off of what I worked out for my older [canvas example project and drawing stars](/2020/02/12/canvas-example-star/). It is more or less the same source code, but of course I made some additions to it when it comes to creating an instance of this unsteady star object that I want to use as the main feature of the over all digital art example.

The unsteady star object is just like the same object that is returned by the create1 method of the star module from before. I went with the cerate1 method that works by creating just one line to make a star by bounding between an outer ind inner radius, rather than the other method that words by creating one or two lines depending if the number of points is even or not.

```js
var starMod = (function () {
/********* **********
   HELPERS
********** *********/
    // get a point with a given radian, radius, and origin point
    var getPoint = function (radian, radius, ox, oy) {
        return {
            x: Math.cos(radian) * radius + ox,
            y: Math.sin(radian) * radius + oy
        };
    };
    // parse options
    var parseOptions = function (opt) {
        opt = opt || {};
        opt.pointCount = opt.pointCount || 5;
        opt.radius = opt.radius === undefined ? 50 : opt.radius;
        opt.radiusInner = opt.radiusInner === undefined ? 25 : opt.radiusInner;
        opt.radianAjust = opt.radianAjust === undefined ? 0 : opt.radianAjust;
        opt.ox = opt.ox || 0;
        opt.oy = opt.oy || 0;
        opt.pointSkip = opt.pointSkip || 2;
        return opt;
    };
/********* **********
   PUBLIC METHODS
********** *********/
    var api = {};
    // create a star points array by pointCount, and inner and outer radius
    api.create1 = function (opt) {
        opt = parseOptions(opt);
        var i = 0,
        pt,
        r,
        rd = Math.PI * 2 / opt.pointCount,
        points = [];
        while (i < opt.pointCount) {
            pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
            points.push(pt.x, pt.y);
            pt = getPoint(rd * i + rd / 2 + opt.radianAjust, opt.radiusInner, opt.ox, opt.oy);
            points.push(pt.x, pt.y);
            i += 1;
        }
        return [points];
    };
    // create a star by point count radius and point skip
    api.create2 = function (opt) {
        opt = parseOptions(opt);
        var i = 0,
        pt,
        r,
        rd = Math.PI * 2 / opt.pointCount * opt.pointSkip,
        even = opt.pointCount % 2 === 0 ? true: false;
        var points = [[]];
        if(even){
            points = [[],[]];
        }
        while (i < opt.pointCount) {
            pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
            points[0].push(pt.x, pt.y);
            if(even){
                var a = Math.PI * 2 / opt.pointCount
                pt = getPoint(rd * i + a + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points[1].push(pt.x, pt.y);
            }
            i += 1;
        }
        return points;
    };
    // new random positions
    var getNewPositions = function(uStar){
        // deltas for each point
        var newPos = [[]];
        utils.chunk(uStar.homePoints[0], 2).forEach(function(pos, i){
            var vIndex = 1,
            radian = Math.PI * 2 * Math.random(),
            radius = uStar.nprMin + ( uStar.nprMax - uStar.nprMin ) * Math.random(),
            // new position for each point
            x = pos[0] + Math.cos(radian) * radius,
            y = pos[1] + Math.sin(radian) * radius;
            // set new pos values
            newPos[0][i * 2] = x;
            newPos[0][i * 2 + 1] = y;
        });
        return newPos;
    };
    // unsteady star objects
    api.unsteady = function(opt){
        opt = opt || {};
        var uStar = [[]];
        // new point radius min and max
        uStar.nprMin = opt.nprMin === undefined ? 1 : opt.nprMin;
        uStar.nprMax = opt.nprMax === undefined ? 5 : opt.nprMax;
        // star create1 options
        uStar.pointCount = opt.pointCount === undefined ? 5 : opt.pointCount;
        uStar.radius = opt.radius === undefined ? 50 : opt.radius;
        uStar.radiusInner = opt.radiusInner === undefined ? 25 : opt.radiusInner;
        uStar.radianAjust = opt.radianAjust === undefined ? 0 : opt.radianAjust;
        // home positions that will be used to fine new positions
        uStar.homePoints = api.create1(uStar);
        // old positions start out at home positions for now
        uStar.oldPositions = uStar.homePoints;
        // get first set of new positions
        uStar.newPositions = getNewPositions(uStar);
        // frame, maxFrame, and Frames Per Second
        uStar.frame = opt.frame === undefined ? 0 : opt.frame;
        uStar.maxFrame = opt.maxFrame === undefined ? 30 : opt.maxFrame;
        uStar.fps = 30;
        // call update for first time, with 0 secs of time to just set things up
        api.unsteady.update(uStar, 0);
        // return the uStar
        return uStar;
    };
    // create is a ref to the main starMod.unsteady method
    api.unsteady.create = api.upsteady;
    // update an unsteady star created with starMod.unsteady.create
    api.unsteady.update = function(uStar, secs){
        // step frame
        uStar.frame += uStar.fps * secs;
        uStar.frame = uStar.frame > uStar.maxFrame ? uStar.maxFrame : uStar.frame;
        var perDone = uStar.frame / uStar.maxFrame; 
        // update pos of uStar
        var newPos = utils.chunk(uStar.newPositions[0], 2);
        utils.chunk(uStar.oldPositions[0], 2).forEach(function(pos, i){
            var vIndex = i,
            // start and end positions
            sx = pos[0],
            sy = pos[1],
            ex = newPos[i][0],
            ey = newPos[i][1],
            // angle and distance from old position and new position
            a = Math.atan2(ey - sy, ex - sx),
            d = utils.distance(sx, sy, ex, ey),
            // delta x and delta y based off of angle and distance
            dx = Math.cos(a) * d,
            dy = Math.sin(a) * d,
            // current x and y is start position + deltas over perDone
            // which is set by frame / maxFrame
            x = sx + dx * perDone,
            y = sy + dy * perDone;
            // set the positions for uStar points array
            uStar[0][vIndex * 2] = x;
            uStar[0][vIndex * 2 + 1] = y;
        });
        // if frame === maxFrame then set frame back to 0, set old position
        // as current new position, and then get a new position
        if(uStar.frame === uStar.maxFrame){
            uStar.frame = 0;
            uStar.oldPositions = uStar.newPositions;
            uStar.newPositions = getNewPositions(uStar);
        }
    };
    // resize unsteady
    api.resizeUnsteady = function(uStar, size, rDiv, riDiv){
        size = size || 0;
        rDiv = rDiv === undefined ? 2 : rDiv;
        riDiv = riDiv === undefined ? r : riDiv;
        var opt = Object.assign({}, uStar, {
            radius: size / rDiv,
            radiusInner: size / riDiv
        });
        return api.unsteady(opt);
    };
    // return the public api
    return api;
}
    ());
```

## 3 - The object pool module

The object pool module was copied over from the other digital art example that I started this out from. It started out with what what I put together with in my [canvas example on object pools](/2020/07/20/canvas-example-object-pool/). Sense then I keep making little changes to it here and there as needed, and over time I slowly but surly have a more solid module for this sort of thing.

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
    // create a single display object
    var createDisp = function(i, opt){
        return {
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
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {},
            beforeUpdate: opt.beforeUpdate || function(pool, state, secs){},
            afterUpdate: opt.afterUpdate || function(pool, state, secs){}
        };
        // populate the pools objects array
        var i = 0;
        while (i < opt.count) {
            pool.objects.push( createDisp(i, opt) );
            i += 1;
        }
        // return the pool object
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

## 4 - The game module

I then have the main game state module for this example, which is what I make that is typically used to create and update a main game state object.

```js
var gameMod = (function () {
 
/*  HARD CODED SETTINGS */
 
    var UNIT_COUNT = 20,
    UNIT_COLORS = ['rgb(64,0,32)', 'rgb(64,0,64)', 'rgb(64,0,128)', 'rgb(64,0,255)', 'black', 'white'], 
    //['red', 'green', 'blue', 'pink', 'purple', 'orange', 'black'],
    UNIT_ALPHA = 0.8,    // alpha transparency
    UNIT_SIZE_MIN = 32,  // size min and max values
    UNIT_SIZE_MAX = 256,
    UNIT_PPS_MIN = 16,   // Pixles Per Second min and max values
    UNIT_PPS_MAX = 256,
    UNIT_PPSPS = 128,    // Pixles Per Second Per Second used in mode 'move2'
    UNIT_NPR_RATIO_MIN = 0.025, // Unit New Point Radius Min + Max values used for new points to create 'unsteady star' effect
    UNIT_NPR_RATIO_MAX = 0.05,
    UNIT_MOVE_MODES = ['move', 'move2'];
 
/*  HELPERS */
 
    var changeMode = function(unit, modeKey, pool, game){
        var uDat = unit.data;
        uDat.mode = modeKey;
        var modeObj = UNIT_MODES[uDat.mode];
        uDat.modeTime = 0;
        uDat.lastRoll = 0;
        // call init hook of new mode obj
        modeObj.init.call(unit, unit, pool, game);
    };
    // random unit color helper
    var randomColor = function(){
        return UNIT_COLORS[ Math.floor(UNIT_COLORS.length * Math.random()) ];
    };
    // random heading helper
    var randomHeading = function(){
       return Math.PI * 2 * Math.random();
    };
    // random ppx helper
    var randomPPS = function(){
       return UNIT_PPS_MIN + Math.round((UNIT_PPS_MAX - UNIT_PPS_MIN) * Math.random());
    };
    // SIZE
    // get a size by a per value 0-1
    var getSizeByPer = function(per){
        per = per === undefined ? 1 : per;
        per = per < 0 ? 0 : per;
        per = per > 1 ? 1 : per;
        return Math.round(UNIT_SIZE_MIN + (UNIT_SIZE_MAX - UNIT_SIZE_MIN) * per);
    };
    // get a per value of 0-1 from a given size
    var getSizePer = function(size){
        var a = size - UNIT_SIZE_MIN;
        return a / (UNIT_SIZE_MAX - UNIT_SIZE_MIN);
    };
    // get a random size
    var getRandomSize = function(){
        return getSizeByPer(Math.random());
    };
    // to random move mode helper
    var toRandomMoveMode = function(unit, pool, game){
        var nextMoveMode = UNIT_MOVE_MODES[ Math.floor( UNIT_MOVE_MODES.length * Math.random() ) ];
        changeMode(unit, nextMoveMode, pool, game);
    };
 
/*  UNITS MODES AND OPTIONS */
 
    // unit modes
    var UNIT_MODES = {};
    // in rebirth mode the unit will translation from one set of values to another
    UNIT_MODES.rebirth = {
        init: function(unit, pool, game){
            unit.data.oldSize = unit.data.size;
            unit.data.newSize = getRandomSize();
            unit.data.sizeDelta = -100; // size delta
            unit.data.cx = unit.x + unit.w / 2;
            unit.data.cy = unit.y + unit.h / 2;
            // set frame to zero in order to keep a bug #0 from happening
            // This is something I might want to look into more at some point maybe
            var points = unit.data.points;
            points.frame = 0;
        },
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // update size
            uDat.size += uDat.sizeDelta * secs;
            // clamp size
            uDat.size = uDat.size < 0 ? 0 : uDat.size;
            uDat.size = uDat.size > uDat.newSize && uDat.sizeDelta > 0 ? uDat.newSize : uDat.size;
            var size = uDat.size;
            // update disp object w and h to size
            unit.w = size;
            unit.h = size;
            unit.x = uDat.cx - size / 2;
            unit.y = uDat.cy - size / 2;
            if(uDat.size === 0){
                uDat.sizeDelta = 100;
                // new heading and speed
                unit.heading = randomHeading();
                unit.pps = randomPPS();
                unit.data.fillStyle = randomColor();
                unit.data.pointsOpt = {
                    fill: randomColor()
                };
                // new points
                unit.data.points = starMod.unsteady({
                    pointCount: 5 + Math.round(5 * Math.random()),
                    radius : size / 2,
                    radiusInner: size / 4,
                    radianAjust: unit.heading,
                    nprMin: Math.round(UNIT_NPR_RATIO_MIN * uDat.newSize), //UNIT_NPR_MIN,
                    nprMax: Math.round(UNIT_NPR_RATIO_MAX * uDat.newSize) //UNIT_NPR_MAX
                });
            }
            if(uDat.sizeDelta > 0){
                size = uDat.size = uDat.size > uDat.newSize ? uDat.newSize : uDat.size;
            }
            unit.data.points = starMod.resizeUnsteady(uDat.points, uDat.size, 2, 4);
            if(size === uDat.newSize && uDat.sizeDelta > 0){
                toRandomMoveMode(unit, pool, game)
            }
        }
    };
    // a more advanced move2 mode where the heading and pps values will change over time
    UNIT_MODES.move2 = {
        init: function(unit, pool, game){
            var uDat = unit.data;
            uDat.oldHeading = unit.heading;
            uDat.targetHeading = randomHeading();
            uDat.targetDir = utils.shortestAngleDirection(unit.heading, uDat.targetHeading);
            uDat.targetDist = utils.angleDistance(unit.heading, uDat.targetHeading, Math.PI * 2);
            uDat.radiansPerSec = Math.PI / 180 * (10 + 80 * Math.random());
            uDat.headingSecs = 0;
            uDat.targetPPS = randomPPS();
        },
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            uDat.headingSecs += secs;
            var totalSecs = uDat.targetDist / uDat.radiansPerSec;
            var per = uDat.headingSecs / totalSecs;
            per = per > 1 ? 1 : per;
            unit.heading = uDat.oldHeading + uDat.targetDist * uDat.targetDir * per;
            if(per === 1){
                toRandomMoveMode(unit, pool, game);
            }
            // incress or decress target pps
            if(unit.pps < uDat.targetPPS){
                unit.pps += UNIT_PPSPS * secs;
                unit.pps = unit.pps > uDat.targetPPS ? uDat.targetPPS : unit.pps;
            }
            if(unit.pps > uDat.targetPPS){
                unit.pps -= UNIT_PPSPS * secs;
                unit.pps = unit.pps < uDat.targetPPS ? uDat.targetPPS : unit.pps;
            }
            // move and wrap
            poolMod.moveByPPS(unit, secs);
            poolMod.wrap(unit, game.sm.canvas, unit.w);
            // update only in move mode
            starMod.unsteady.update(unit.data.points, secs);
        }
    };
    // a simple move mode where the unit will just move by current PPS and heading values
    UNIT_MODES.move = {
        init: function(unit, pool, game){
            var uDat = unit.data;
            uDat.sizePer = getSizePer(unit.data.size);
        },
        update: function(unit, pool, game, secs){
            var uDat = unit.data;
            // move and wrap
            poolMod.moveByPPS(unit, secs);
            poolMod.wrap(unit, game.sm.canvas, unit.w);
            // update only in move mode
            starMod.unsteady.update(uDat.points, secs);
            // switch to another move mode after some time
            if(uDat.modeTime >= 5){
               toRandomMoveMode(unit, pool, game);
            }
        }
    };
    // the unit pool options object
    var UNIT_OPTIONS = {
        count: UNIT_COUNT,
        disableLifespan: true
    };
    // spawn a unit
    UNIT_OPTIONS.spawn = function (unit, pool, game, spawnOpt) {
        spawnOpt = spawnOpt || {};
        var canvas = game.sm.canvas;
        // mode of the unit
        unit.data.mode = spawnOpt.mode || UNIT_MOVE_MODES[0];
        unit.data.modeTime = 0; // the total amount of time the unit has been in the current mode
        unit.data.lastRoll = 0; // the amount of time sense the last roll (used for mode switching)
        // colors
        unit.data.fillStyle = randomColor();
        unit.data.pointsOpt = {
            fill: randomColor()
        };
        // alpha
        unit.data.alpha = UNIT_ALPHA;
        // size
        var size = unit.data.size = getRandomSize();
        unit.w = size;
        unit.h = size;
        // start position
        unit.x = Math.floor( canvas.width * Math.random());
        unit.y = Math.floor( canvas.height * Math.random());
        // heading
        unit.heading = randomHeading();
        // speed
        unit.pps = randomPPS();
        // start points for the unit
        unit.data.points = starMod.unsteady({
            pointCount: 5 + Math.round(5 * Math.random()),
            radius : size / 2,
            radiusInner: size / 4,
            radianAjust: unit.heading,
            nprMin: Math.round(UNIT_NPR_RATIO_MIN * size),
            nprMax: Math.round(UNIT_NPR_RATIO_MAX * size)
        });
        // chance mode
        changeMode(unit, unit.data.mode, pool, game);
    };
    // update a unit
    UNIT_OPTIONS.update = function (unit, pool, game, secs) {
        var uDat = unit.data;
        // update mode time and last roll
        uDat.modeTime += secs;
        uDat.lastRoll += secs;
        // crude yet effective mode switching
        if(uDat.modeTime >= 3 & uDat.lastRoll >= 2){
            var roll = Math.random();
            if(roll > 0.5){
                if(uDat.mode === 'move' || uDat.mode === 'move2'){
                    changeMode(unit, 'rebirth', pool, game);
                }
            }
            uDat.lastRoll = 0;
        }
        var modeKey = uDat.mode,
        modeObj = UNIT_MODES[modeKey];
        // call the current mode update method
        modeObj.update(unit, pool, game, secs);
    };
    // purge a unit
    UNIT_OPTIONS.purge = function (obj, pool, game) {};
    // what to do after all the objects have been updated
    UNIT_OPTIONS.afterUpdate = function(pool, secs, game){};
 
/*  PUBLIC API */
 
    // the public api
    var api = {};
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            sm: opt.sm || {},
            units: poolMod.create(UNIT_OPTIONS)
        };
        // spawn all for starters
        poolMod.spawnAll(game.units, game, {});
        return game;
    };
    // public update method
    api.update = function (game, secs) {
        // update units
        poolMod.update(game.units, secs, sm.game);
    };
    // return the public API
    return api;
}
    ());
```

## 5 - The draw module

I then have a draw module that contains all the methods that I will be using to draw the current state of the game object to a canvas element.

```js
var draw = (function(){
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
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(1, 'white');
        // return gradiant
        return gradient;
    };
    // draw direction helper
    var strokeDirHelper = function(ctx, obj, dir, radiusBegin, radiusEnd){
        radiusBegin = radiusBegin === undefined ? obj.r2 : radiusBegin;
        radiusEnd = radiusEnd === undefined ? obj.r1 : radiusEnd;
        ctx.beginPath();
        ctx.moveTo(
            obj.x + Math.cos(dir) * radiusBegin, 
            obj.y + Math.sin(dir) * radiusBegin);
        ctx.lineTo(
            obj.x + Math.cos(dir) * radiusEnd,
            obj.y + Math.sin(dir) * radiusEnd);
        ctx.stroke();
    };
    // draw star info
    var drawStarInfo = function(ctx, obj){
        ctx.fillStyle = 'rgba(255,255,0,0.5)';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('pos: ' + Math.floor(obj.x) + ', ' + Math.floor(obj.y), obj.x + 10, obj.y + 10);
        ctx.fillText('pps: ' + Math.floor(obj.pps), obj.x + 10, obj.y + 20);
        ctx.fillText('heading: ' + utils.radianToDegree(obj.heading), obj.x + 10, obj.y + 30);
        ctx.fillText('facing: ' + utils.radianToDegree(obj.facing), obj.x + 10, obj.y + 40);
    };
    var drawPoints = function(obj, ctx, canvas){
        var points = obj.data.points || null,
        cx = obj.x + obj.w / 2,
        cy = obj.y + obj.h / 2;
        if(points){
            api.points(ctx, points, cx, cy, obj.data.pointsOpt);
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
    api.pool = function (game, ctx, canvas) {
        var pool = game.units;
        ctx.lineWidth = 3;	
        pool.objects.forEach(function (obj) {
            ctx.fillStyle = obj.data.fillStyle || 'white';
            ctx.strokeStyle = obj.data.strokeStyle || 'black';
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            // if the object is active
            if (obj.active) {
                // draw base area
                var cx = obj.x + obj.w / 2,
                cy = obj.y + obj.h / 2;
                ctx.beginPath();
                ctx.arc(cx, cy, (obj.w + obj.h) / 2 / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                // draw any points
                drawPoints(obj, ctx, canvas);
            }
        });
        ctx.globalAlpha = 1;
    };
    // new draw points
    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    i += 1;
                }
            }
            ctx.lineWidth = lineWidth;
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };
    // draw version number
    api.info = function (sm, ctx, canvas) {
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        var dInfo = sm.game.debugInfo;
        if(dInfo){
            ctx.fillText( dInfo.key + ' : ' + dInfo.value, 10, 10);
        }
    };
    // draw version number
    api.ver = function (sm, ctx, canvas) {
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '12px arial';
        ctx.fillText('version: ' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());
```

## 6 - The main javaScript file

Now that I have everything that I need to create a state object, update that state object, and draw it to a canvas element I will just need a little more javaScript to make use of all of this in the form of a main javaScript file.

```js
// state object
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
// main sm object
var sm = {
    ver: 'r5',
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
        gameMod.update(sm.game, secs);
        draw.background(sm, sm.ctx, sm.canvas);
        draw.pool(sm.game, sm.ctx);
        draw.info(sm, sm.ctx, sm.canvas);
        draw.ver(sm, sm.ctx, sm.canvas);
        sm.lt = now;
        // rotation of background
        //var bg = sm.background; 
        //bg.angle += Math.PI / 180 * bg.degreesPerSec * secs;
        //bg.angle = utils.mod(bg.angle, Math.PI * 2);
    }
};
loop();
```


## 7 - Conclusion

So then I am glad that I followed threw with this project and have completed it by working out the core of the idea first, and also completed just the two features that I hand planed out for this. Of course I could just keep going with this project even further adding yet even more features that have come to mind for the project in terms of other movement modes, and well as whole other kinds of modes that have to do with completely different behavior all together. There is more that could be done with how to go about switching between modes, and also more advanced features for the background, colors, and so forth. However I did only want to spend at most a few days on this and then move on to the next project, which is what I will be doing.

So then the current plans with this at the time of this writing at least is to just do a little clean up with the code in order to help make the over all project a little easier to follow. I fixed all the bugs that I know of at this point as of revision 4 of this project, but I am sure there might be at least one or two more maybe. So then for the most part I intended to just maintain what the project all ready is rather than add more to it, unless of course something happens that might change that for me.
