---
title: Attack Wave Control System javaScript example
date: 2021-03-31 14:01:00
tags: [js]
layout: post
categories: js
id: 835
updated: 2021-03-31 17:21:43
version: 1.9
---

For todays javaScript example I worked out an attack wave control system that I might use in one or move canvas projects that will be games that might make use of such a system. What I am taking about here is a system where there is an object pool that is used for buttons that from a bar or sorts. As time goes by the buttons move along to a given point such as the top of the canvas element. When a button reaches the top of the canvas it will become inactive, and that wave will then become the current wave, and as such will add however many enemies the wave will add to a queue.

<!-- more -->

## 1 - The wave module

I am going to start off this post with the main event of the over all system rather than starting with support modules. I will be getting to them later in this post, but many of them are just more of the same when it comes to the various other topics that I write about when it comes to the various resources that I make for a javaScript project.

```js
var waveMod = (function () {
 
    var BUTTON_HEIGHT = 128,
    BUTTON_BASE_PPS = BUTTON_HEIGHT / 60, // every 30 secs
    BUTTON_RUSH_PPS = BUTTON_HEIGHT / 1; // every 1 sec
 
    var api = {};
 
    // spawn an update methods
    var spawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 1.5;
        obj.pps = pool.data.pps; //opt.pps || BUTTON_BASE_PPS;
        obj.h = BUTTON_HEIGHT;
        obj.lifespan = Infinity;
        obj.x = opt.x || 0;
        obj.y = opt.startY;
 
        obj.data.waveNumber = pool.data.waveNumber || 0;
        obj.data.unitCount = pool.data.baseUnitCount;
 
        pool.data.waveNumber += 1;
        pool.data.toSpawn -= 1;
    };
 
    var update = function (obj, pool, sm, secs) {
        obj.pps = pool.data.pps;
        poolMod.moveByPPS(obj, secs);
        if (obj.y <= 0) {
            obj.active = false;
            sm.game.onWaveStart(obj, sm);
            pool.data.currentWave += 1;
        }
    };
 
    // create a waveButtons pool
    api.create = function (opt) {
        opt = opt || {};
        opt.startY = opt.startY || 0;
        var pool = poolMod.create({
                count: 4, // max number of buttons on the canvas
                spawn: spawn,
                update: update,
                data: {
                    pps: BUTTON_BASE_PPS,
                    baseUnitCount: opt.baseUnitCount || 1,
                    currentWave: 0,
                    waveNumber: 1,
                    waveCount: opt.waveCount || 0, // total number of waves
                    toSpawn: opt.waveCount,
                    activeCount: 4,
                    rushTo: 0
                }
            });
        // set all to active
        //poolMod.setActiveStateForAll(pool, true);
        pool.objects.map(function (obj, i) {
            // if i is less than wave count then start the object
            // off as active
            if (i < opt.waveCount) {
                poolMod.spawn(pool, sm, {
                    x: opt.x,
                    startY: opt.startY + i * BUTTON_HEIGHT
                });
            }
        });
        return {
            x: opt.x || 0, // the upper left position of the wave bar
            y: opt.y || 0,
            pool: pool
        };
    };
 
    var getLowsetActive = function (pool) {
        var lowest = {
            y: 0,
            obj: {}
        };
        pool.objects.forEach(function (obj, i) {
            if (obj.active && obj.y > lowest.y) {
                lowest.y = obj.y;
                lowest.obj = obj;
            }
        });
        return lowest.obj;
    };
 
    api.update = function (sm, secs) {
        // get pool
        var pool = sm.game.waveButtons.pool;
        // update all buttons
        poolMod.update(pool, secs, sm);
        // spawn next button
        pool.data.activeCount = poolMod.activeCount(pool);
        if (pool.data.activeCount < pool.objects.length && pool.data.toSpawn > 0) {
            var lowest = getLowsetActive(pool);
            poolMod.spawn(pool, sm, {
                startY: lowest.y + BUTTON_HEIGHT //sm.canvas.height
            });
        }
        pool.data.pps = BUTTON_BASE_PPS;
        if (pool.data.rushTo > pool.data.currentWave) {
            pool.data.pps = BUTTON_RUSH_PPS;
        }
    };
 
    api.onClick = function (sm, pos) {
        var pool = sm.game.waveButtons.pool;
        var obj = poolMod.getObjectAt(pool, pos.x, pos.y);
        if (obj) {
            pool.data.rushTo = obj.data.waveNumber;
        }
    }
 
    return api;
 
}
    ());
```

## 2 - A utils.js unilty library

This is a javaScript example, and as such the main feature is something that can be used in just about any kind of javaScript environment. However the typical use of the wave module will be as a canvas project in front end javaScript. As with just about any other canvas example I have a utility library that contains a bunch of copy and past methods that I use from one canvas example to another. This is s module that will change up a little from one example to another thigh, so for this example I am using bound box collision detection, as well as some additional methods that have to do with creating a canvas and getting a point relative to a canvas element.

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
 
// create a canvas
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
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// get canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

## 3 - Object pool module

In this example I am also making use of an object pool module, this is something that I first worked out for my canvas example on objects pools, and take with me from one canvas example to another. I am using it to create wave bar buttons, and I am also using it to create enemy units for this example in the game module that I will be getting to a little later in this post.

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
            maxSecs: opt.maxSecs || 0.125,
            objects: [],
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
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        secs = secs >= pool.maxSecs ? pool.maxSecs : secs;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                obj.lifespan -= secs;
                obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                if (obj.lifespan === 0) {
                    obj.active = false;
                    pool.purge.call(pool, obj, pool, state);
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
    // get an active object at the given position, or return false if nothing is there
    api.getObjectAt = function (pool, x, y) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                if (api.boundingBox(obj, {
                        x: x,
                        y: y,
                        w: 1,
                        h: 1
                    })) {
                    return obj;
                }
            }
        }
        return false;
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // move my frame percent object
    /*
{
    sx: -100,
    sy: 0,
    dist: 100,
    heading: 0,
    frame: 0,
    frameMax: 50,
    rev: false
    }
     */
    api.moveByFramePerObj = function (obj, fp) {
        var per = fp.frame / fp.frameMax;
        per = per > 1 ? 1 : per;
        per = per < 0 ? 0 : per;
        per = fp.rev ? 1 - per : per;
        obj.x = fp.sx + Math.cos(fp.heading) * fp.dist * per;
        obj.y = fp.sy + Math.sin(fp.heading) * fp.dist * per;
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
 
    // active count method
    api.activeCount = function (pool, activeState) {
        activeState = activeState === undefined ? true : activeState;
        var i = pool.objects.length,
        count = 0;
        while (i--) {
            if (pool.objects[i].active === activeState) {
                count += 1;
            }
        }
        return count;
    };
 
    // return public method
    return api;
}
    ());
```

## 4 - A game module

I made a quick place holder game module for this example, for now this is just a very simple game where units spawn at the top of the canvas and move to the bottom of the canvas. I did not put much time into this because the main thing I wanted to work out for this post is of course the wave control module. However In a real game I might only built so much more on top of this.

```js
var gameMod = (function () {
    var UNIT_PPS = 32,
    UNIT_RELEASE_RATE_MIN = 0.25,
    UNIT_RELEASE_RATE_MAX = 3;
    var api = {};
 
    // on unit spawn
    var unitSpawn = function (obj, pool, sm, opt) {
        obj.heading = Math.PI * 0.5;
        var delta = sm.canvas.width * 0.5 * Math.random();
        obj.x = sm.canvas.width * 0.25 + delta;
        obj.y = 0;
        obj.lifespan = Infinity;
    };
 
    // on unit update
    var unitUpdate = function (obj, pool, sm, secs) {
        obj.pps = UNIT_PPS;
        poolMod.moveByPPS(obj, secs);
        if (obj.y >= sm.canvas.height - 50) {
            obj.lifespan = 0;
        }
    };
 
    var onWaveStart = function (waveObj, sm) {
        sm.game.unitQueue.unitCount += waveObj.data.unitCount;
    };
 
    api.create = function () {
        return {
            unitQueue: {
                unitCount: 0,
                secs: 0
            },
            unitPool: poolMod.create({
                count: 30,
                spawn: unitSpawn,
                update: unitUpdate,
                data: {}
            }),
            waveButtons: waveMod.create({
                startY: 64,
                waveCount: 99,
                baseUnitCount: 10
            }),
            onWaveStart: onWaveStart
        };
    };
 
    api.update = function (sm, secs) {
 
        if (sm.game.unitQueue.unitCount > 0) {
            sm.game.unitQueue.secs += secs;
            var releasePer = sm.game.unitQueue.unitCount / 30;
            releasePer = releasePer > 1 ? 1 : releasePer;
            var releaseDelta = (UNIT_RELEASE_RATE_MAX - UNIT_RELEASE_RATE_MIN) * (1 - releasePer);
            sm.game.unit_release_rate = UNIT_RELEASE_RATE_MIN + releaseDelta;
            if (sm.game.unitQueue.secs > sm.game.unit_release_rate) {
                var unit = poolMod.spawn(sm.game.unitPool, sm, {});
                if (unit) {
                    sm.game.unitQueue.unitCount -= 1;
                }
                sm.game.unitQueue.secs = 0;
            }
        }
 
        // update wave buttons
        waveMod.update(sm, secs);
 
        //
        poolMod.update(sm.game.unitPool, secs, sm);
 
    };
 
    return api;
}
    ());
```

## 5 - A draw module

I made the full example of this a canvas example, so I have a draw module that I put together real fast. Most of what i have here I copied over from one of my canvas examples, called pop the lock when it comes to the draw pool methods.

```js
var draw = (function () {
 
    var api = {};
 
    // plain background method
    api.background = function (ctx, canvas, style) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
 
    // draw object pool
    var drawPool = function (ctx, pool, globalDraw) {
        var i = pool.objects.length,
        obj;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                ctx.save();
                if (obj.data.draw) {
                    obj.data.draw(ctx, obj, i);
                } else {
                    globalDraw(ctx, obj, i);
                }
                ctx.restore();
            }
        }
    };
 
    var globalDraw = {
        basic: function (ctx, obj, i) {
            ctx.fillStyle = obj.data.fill || 'white';
            ctx.globalAlpha = obj.data.alpha || 1;
            ctx.beginPath();
            ctx.rect(obj.x, obj.y, obj.w, obj.h);
            ctx.fill();
            ctx.stroke();
            ctx.globalAlpha = 1;
        },
        waveButtons: function (ctx, obj, i) {
            globalDraw.basic(ctx, obj, i);
            ctx.fillStyle = 'black';
            ctx.fillText(obj.data.waveNumber, obj.x + 5, obj.y + 5);
        }
    };
 
    // basic draw pool method with a solid background fallback if there is
    // draw method in an disp objects data object
    api.pool = function (ctx, pool) {
        drawPool(ctx, pool, globalDraw.basic);
    };
 
    api.waveButtons = function (ctx, pool) {
        drawPool(ctx, pool, globalDraw.waveButtons);
    };
 
    // debug info
    api.debugInfo = function (ctx, sm, sx, sy) {
        var waveButtonsPool = sm.game.waveButtons.pool,
        waveButtonData = waveButtonsPool.data;
        ctx.fillStyle = 'white';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('currentWave: ' + waveButtonData.currentWave, sx, sy);
        ctx.fillText('waveCount: ' + waveButtonData.waveCount, sx, sy + 20);
        ctx.fillText('toSpawn: ' + waveButtonData.toSpawn, sx, sy + 40);
        ctx.fillText('ActiveCount: ' + waveButtonData.activeCount, sx, sy + 60);
        ctx.fillText('rushTo: ' + waveButtonData.rushTo, sx, sy + 80);
 
        ctx.fillText('Unit Count: ' + sm.game.unitQueue.unitCount, sx, sy + 120);
    };
 
    api.resetButton = function (ctx, sm) {
        ctx.fillStyle =  'white';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        var obj = sm.resetButton;
        ctx.rect(obj.x, obj.y, obj.w, obj.h);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
    };
 
    return api;
 
}
    ());
```

## 6 - Main javaScript file

I now just have a little more javaScript that will make use of everything that I put together here, and also a place to pack the main application loop. With many complex examples that I am starting to turn into a finished product of one kind or another often I might get into adding a state machine, and animated button system, and all kinds of additional little features. However for this example I have just a very simple main state object that contains an instance of a game module, which in turn holds an instance of my wave buttons module of course.

```js
var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    });
 
var sm = {
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    resetButton: {
        x: canvasObj.canvas.width - 48,
        y: 8,
        w: 40,
        h: 40
    },
    lt: new Date()
};
 
sm.canvas.addEventListener('click', function (e) {
    var pos = utils.getCanvasRelative(e);
    // wave buttons
    waveMod.onClick(sm, pos);
    // unit
    var unit = poolMod.getObjectAt(sm.game.unitPool, pos.x, pos.y);
    if (unit) {
        unit.lifespan = 0;
    }
    // reset button
    var bx = sm.resetButton;
    if (utils.boundingBox(pos.x, pos.y, 1, 1, bx.x, bx.y, bx.w, bx.h)) {
        sm.game = gameMod.create();
    }
});
 
var loop = function () {
    var now = new Date(),
    secs = (now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    gameMod.update(sm, secs);
    // draw
    draw.background(sm.ctx, sm.canvas, 'blue');
    draw.waveButtons(sm.ctx, sm.game.waveButtons.pool);
    draw.pool(sm.ctx, sm.game.unitPool);
    draw.resetButton(sm.ctx, sm);
    draw.debugInfo(sm.ctx, sm, 128, 32);
    sm.lt = now;
};
loop()
```

## 7 - Conclusion

Well that is it for now when it comes to this javaScript example of an attack wave control system if I can call it that. I am not sure what else to call it, but so far it seems to work just the way that I wanted it to. I was able to put this together real fast in just a single day, and there is not really all that much more I can thing of that I might want to add to it. I am sure that some things will come up when I use this is an actual example of two. There are a few of my canvas examples that I would like to rework with something like this, and of course all kids of additional ideas that would work great with a system such as this that I might get around to starting at some point. 

I just wanted to have a nice starting point for this kind of system, something that I can copy and past to a folder and start to hack over to make something else that will prove to be more interesting. As I start to make and update some of my canvas examples with this I will be sure to link to those examples in this post when I get around to editing.