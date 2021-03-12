---
title: Pop The Lock Canvas Example Game Clone
date: 2019-11-26 21:22:00
tags: [js, canvas]
layout: post
categories: canvas
id: 571
updated: 2021-03-12 15:22:43
version: 1.37
---

A long time ago I played a game called [pop the lock on android](https://play.google.com/store/apps/details?id=com.sm.popTheLock&hl=en_US), and managed to end up getting hooked for a while. It was a very simple game that just involved a circle moving along the path of another circle, and once it gets close to a target area you need to tap the screen or else you loose, you also loose if you tap to soon. I can then try again and the object is to repeat this process up to a certain count of times to unlock a lock.

I find myself making clones of this game now and then, in part because it is so easy to make a game like this. It is the kind of game where I can make a working clone within just about an hour or so when I am working at my best. Many of the game prototypes that I have made so far are the kind of projects where it takes a long time to get something together that is just starting to look like a game, but things do not always have to be that way when it comes to this sort of thing, a game can be simple. It is also a great example of what really matters when making a game which is just to make something that is fun, or addictive in a distinct unique way.

So todays [canvas example](/2020/03/23/canvas-example/) will be a game that is a clone of this pop the lock game to some extent, but a little different. I want to play around with the various values that come to mind when making a game like this, and maybe make it work a little differently altogether so it is not just a full rip off of the original.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pop-the-lock/0.3.0/pkg.js"></script>

## 1 - The game.js module for pop the lock

For this canvas example I made a game module that will be used to create and return a game state object, as well as provide methods to update that state object.

The game object contains values such as the current degree of the point in motion, and a value that reflects the total number of degrees in the main circle of the game. In addition there is also a target degree, and margin value that can be used to result in a range area in the circle. This range is the area where the payer will score if they make an action such as clicking or touching the canvas when the current degree is in that range. There are also a number of other values that have to do with the rate at which the current degree will move as well as the current direction, and a boolean that indicates that the current degree is in the range.

```js
var gameMod = (function(){
    // return the shortest distance to the target from the current position
    var getDistanceFromTarget = function(game){
        return utils.shortestDistance(game.deg.current, game.deg.target, game.deg.total);
    };
    // helpers
    var getInRange = function (game) {
        return game.deg.distance <= game.deg.margin;
    };
    // get a target degree, with degOrgin, percent, and range arguments
    var getTarget = function(game, degOrgin, per, rangePer){
        degOrgin = degOrgin === undefined ? game.deg.current: degOrgin;
        per = utils.mod(per === undefined ? 0 : per, 1);
        rangePer = utils.clampPer(rangePer === undefined ? 1 : rangePer);
        var halfDeg = game.deg.total / 2,
        halfRange = halfDeg * rangePer,
        homeDeg = utils.mod(degOrgin + halfDeg, game.deg.total),
        deg = homeDeg - halfRange + (halfRange * 2 * per);
        return utils.mod(Math.round(deg), game.deg.total);
    };
    // get a target degree from a given degOrigin (0 to deg.total) 
    // by a margin (0 to deg.total) in a direction (1, -1)
    var getTargetFrom = function(game, degOrgin, margin, dir){
        margin = margin === undefined ? 0 : margin;
        dir = dir === undefined ? 1 : dir;
        return utils.mod(Math.round(degOrgin + margin * dir), game.deg.total);
    };
    // get a random target
    var getTargetRandom = function(game){
        return getTarget(game, game.deg.current, Math.random(), game.range);
    };
    // get a random target that is a 'trip up' target
    var getTargetRandomTripUp = function(game){
        //var deltaDeg = utils.randomRange(game.tripUp.degMin, game.tripUp.degMax);
        var deltaDeg = utils.randomRange(game.tripUp.degRange);
        return getTargetFrom(game, game.deg.current + deltaDeg * game.dir);
    };
    // create and return a new target
    var newTarget = function(game){
        if(game.tripUp.count > 0){
            game.tripUp.count -= 1;
            return getTargetRandomTripUp(game);
        }
        var roll = Math.random();
        if(roll < game.tripUp.chance){
            game.tripUp.count = Math.floor(utils.randomRange(game.tripUp.countRange));
            return getTargetRandomTripUp(game);
        }
        return getTargetRandom(game);
    };
    // MODES
    var modes = {
        freePlay: {
            init: function(game){
                game.deg.perSec = 30;
            },
            update: function(game){
                var hitPer = game.clickTrack.hits / game.clickTrack.total,
                missLoss = 1 - (1 / (game.missTrack.count + 1));
                hitPer = utils.isNaN(hitPer) ? 1 : hitPer;
                game.score = Math.floor(game.clickTrack.hits * hitPer * (1-missLoss));
            },
            onMiss: function(game){
                game.missTrack.count += 1;
            },
            onClick: function(game){
                if (game.inRange) {
                    game.deg.target = newTarget(game);
                }
            }
        },
        endurance: {
            init: function(game){
                game.deg.perSec = 20;
                game.deg.target = getTargetRandom(game);
            },
            update: function(game){
                var hits = game.clickTrack.hits;
                game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;
            },
            onMiss: function(game){
                game.missTrack.count = 1;
                game.gameOver = true;
            },
            onClick: function(game){
                if (game.inRange) {
                    game.deg.target = getTargetRandom(game); //newTarget(game);
                    game.level += 1;
                    game.level = game.level > 100 ? 100 : game.level;
                    game.deg.perSec = 20 + Math.round( 80 * (game.level / 100));
                }else{
                    game.gameOver = true;
                }
            }
        }
    };
    // public API
    var api = {};
    // CREATE and return a main game object
    api.create = function(opt){
        opt = opt || {};
        var game = {                         // THE MAIN GAME OBJECT
            mode: opt.mode || 'freePlay',    // current game mode such as 'endurance', or 'freePlay' (see modes object)
            level: 1,
            deg: {                           // 'degree' object
               perSec: 30,                   // degrees per second
               current: 25,                  // the current 'degree'
               target: 0,                    // the target 'degree'
               total: 100,                   // total number of 'degrees'
               margin: 4,                    // the margin of 'degrees' +- from target that will still count as in range
               distance: 0                   // should be the shortest distance in 'degrees' from target
            },
            missTrack: {                     // Miss Tacking (missed target, not clicking to soon)
                canMiss: false,
                count: 0
            },
            clickTrack: {
                total: 0,                    // total number of clicks
                hits: 0                      // total number of clicks that are hits
            },
            tripUp: {                        // settings for 'tripUp' mode
               count: 5,
               chance: 0.12,
               countRange: [3, 10],
               degRange: [10, 20]
            },
            gameOver: false,
            pause: true,
            range: 0.5,                      // a number (0-1) that will set the range in which a new target can be
            dir: -1,                         // the direction in which the current degree will change
            inRange: false,                  // true if the current degree is in range of the target degree
            score: 0                         // player score
        };
        game.deg.target = newTarget(game);
        modes[game.mode].init(game);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        if(!game.pause && !game.gameOver){
            game.deg.current +=  game.deg.perSec * secs * game.dir;
        } 
        game.deg.current = utils.mod(game.deg.current, game.deg.total);
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        if(game.inRange){
            game.missTrack.canMiss = true;
        }
        if(game.missTrack.canMiss && !game.inRange){
            // call onMiss for the current mode
            modes[game.mode].onMiss(game);
            game.missTrack.canMiss = false;
        }
        // call update method for the current mode
        modes[game.mode].update(game);
    };
    // create click handler
    api.click = function (game) {
        if(!game.pause && !game.gameOver){
            game.clickTrack.total += 1;
            game.clickTrack.hits += game.inRange ? 1 : 0;
            if (game.inRange) {
                game.missTrack.canMiss = false;
                game.dir = game.dir === 1 ? -1 : 1;
                
            }
            // call on click for the current mode
            modes[game.mode].onClick(game);
        }
        game.pause = false;
    };
    // return public api
    return api;
}());
```

In this module I am making use of a utils library that contains many useful methods such as mathematical modulo. I will be getter to that in a later section in this post.

So now that I have a game module worked out I am going to want to have some additional code that is used to draw the state of one of these game state objects to the canvas. In additional I am also going to want to have some javaScript code that will provide a main app loop, and a state machine that will be needed when it comes to continuing to expand this.

## 2 - The draw method

So now that I have the game state object worked out it is time to work out a draw method for it, as well as some additional draw methods for the project as a whole. In this example I am not doing anything fancy with layering, sprites, and so forth. So I just have a collection of draw methods for drawing things like a solid color background, the current version number, and the current state of things when it comes to the game state object of course. I took the time to break things down into a whole bunch of helper methods, and then have just a few public drawing methods that I will be using in my main.js file.

```js
var draw = (function(){
    var text_big_center = function(ctx){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.font='30px arial';
        ctx.textAlign = 'center';
    };
    var text_game_stats = function(ctx){
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.font='10px arial';
        ctx.textAlign = 'left';
    };
    // draw base circle
    var baseCircle = function(ctx, canvas){
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw target range
    var targetRange = function(ctx, canvas, game){
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100,
            utils.mod(game.deg.target - game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2,
            utils.mod(game.deg.target + game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2);
        ctx.stroke();
    };
    // draw current position
    var current_pos = function(ctx, canvas, game){
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        var r = game.deg.current / game.deg.total * Math.PI * 2,
        x = Math.cos(r) * 100 + canvas.width / 2,
        y = Math.sin(r) * 100 + canvas.height / 2;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    };
    // public api
    var api = {};
    // background
    api.background = function(ctx, canvas, style){
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // Pop The Lock
    api.PTL = function (ctx, canvas, game) {
        baseCircle(ctx, canvas);
        targetRange(ctx, canvas, game);
        current_pos(ctx, canvas, game);
    };
    // score
    api.score = function(ctx, canvas, game){
        ctx.fillStyle = game.score > 0 ? 'green' : 'red';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '25px arial';
        ctx.fillText(game.score, canvas.width / 2, canvas.height / 2);
    };
    // draw title text
    api.text_title = function(ctx, canvas){
        text_big_center(ctx);
        ctx.fillText('Pop The Lock', canvas.width / 2, canvas.height / 2 - 50);
    };
    // draw game over text
    api.text_gameover = function(ctx, canvas, sm){
        var game = sm.game,
        sx = canvas.width / 2 - 120,
        sy = canvas.height / 2 - 25;
        text_big_center(ctx);
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);
        text_game_stats(ctx);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, sx, sy + 10);
        ctx.fillText('miss count: ' + game.missTrack.count, sx, sy + 20);
        ctx.fillText('score: ' + game.score, sx, sy + 40);
    };
    // version
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font='10px arial';
        ctx.textAlign = 'left';
        ctx.fillText('v' + sm.ver, 5, canvas.height - 15);
    };
    // draw object pool
    api.pool = function (ctx, pool) {
        var i = pool.objects.length,
        obj;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                ctx.save();
                ctx.fillStyle = obj.data.fill || 'white';
                ctx.globalAlpha = obj.data.alpha || 1;
                ctx.translate(obj.x, obj.y);
                ctx.beginPath();
                ctx.rect(0, 0, obj.w, obj.h);
                ctx.fill();
                ctx.stroke();
                if(obj.data.disp){
                   ctx.fillStyle = 'black';
                   ctx.textBaseline = 'middle';
                   ctx.font = '10px arial';
                   ctx.textAlign = 'center';
                   ctx.fillText(obj.data.disp, obj.w / 2, obj.h / 2);
                }
                ctx.restore();
            }
        }
    };
    // info
    api.debugInfo = function(ctx, canvas, game){
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.globalAlpha = 0.35;
        ctx.font = '10px arial';
        ctx.fillText('deg.current ' + game.deg.current.toFixed(2), 10, 10);
        ctx.fillText('deg.target ' + game.deg.target, 10, 20);
        ctx.fillText('deg.distance ' + game.deg.distance.toFixed(2), 10, 30);
        ctx.fillText('trip up count: ' + game.tripUp.count, 10, 40);
        ctx.fillText('inrange ' + game.inRange, 10, 50);
        ctx.fillText('miss count: ' + game.missTrack.count, 10, 60);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, 10, 70);
        ctx.fillText('paused: ' + game.pause, 10, 80);
        ctx.fillText('mode: ' + game.mode, 10, 90);
        ctx.fillText('level: ' + game.level, 10, 100);
    };
    // return public API
    return api;
}());
```

If I put more time into this project this will end up getting broken down into many methods and will be pulled into a file of its one which is often the case with many of these canvas examples.

## 3 - The utils lib

Like all my other canvas examples these days I have a utils library where I park functions that I will likely use in more than one file in a project, and also might copy and paste over to other utils libraries in other canvas examples. For pop the lock thus far as of version 0.0.0 I am just using my create canvas method that is more or less standard for canvas examples now.

```js
var utils = {};
// no operation ref
utils.noop = function(){};
utils.isNaN = function (a) {
    return String(a) === 'NaN' && typeof a != 'string';
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
// clamp a 0 - 1 value
utils.clampPer = function (per) {
    per = per > 1 ? 1 : per;
    per = per < 0 ? 0 : per;
    return per;
};
utils.randomRange = function(a, b){
    var x = a, y = b;
    if(typeof a === 'object'){
        x = a[0];
        y = a[1];
    }
    return x + (y - x) * Math.random();
};
// normalizeHalf
utils.normalizeHalf = function(degree, scale) {
  var halfScale = scale / 2;
  return utils.mod(degree + halfScale, scale) - halfScale;
};
// shortest distance
utils.shortestDistance = function(a, b, scale) {
  var halfScale = scale / 2,
  diff = utils.normalizeHalf(a - b, scale);
  if (diff > halfScale){
    diff = diff - scale;
  }
  return Math.abs(diff);
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

## 4 - An Object pool module that I am using for buttons in the state machine

I wanted to add an object pool module, however for this canvas example the only reason why is more so for the sake of having animated buttons, and maybe a few additional effects. This module is based off of what i worked out in my other canvas example on objects pools, in fact I copied that source code and just made a few changes here and there that I might add in future versions of that canvas example.

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
 
    // return public method
    return api;
}
    ());
```

## 5 - The canvas, main app loop, and the html

So now to make use of everything I worked out in a main javaScript file that will proved the main app loop and the state machine. In this main.js file I create a canvas with the create canvas utils method, and get the drawing context to it.

I then create the state machine object that will contain a game state object as one of itself properties. I then start to create at least one game state, that will have methods for updating, drawing and clicking.

In the main app loop I am calling the game module update method of my pop the lock game module, and passing the game object that I created with the game module create method. I am also using the draw method I have worked out to draw the current state of the game state object in the canvas element. I am also of course using request animation frame as always to create the app loop for the canvas example as with just about any other.

```js
(function () {
 
    // SETUP CANVAS
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
            width: 320,
            height: 240
        }),
    canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;
 
    // BUTTON OBJECT POOL
    var buttonPool = poolMod.create({
            spawn: function (obj, pool, sm, opt) {
                // just ref opt for the data object
                obj.data = opt;
                obj.x = opt.hx;
                obj.y = opt.hy;
                obj.w = opt.w || 128;
                obj.h = opt.h || 32;
            },
            // update the button
            update: function (obj, pool, sm, secs) {
                var fp = {
                    sx: obj.data.sx || 0,
                    sy: obj.data.sy || 0,
                    dist: obj.data.dist || 0,
                    heading: obj.data.heading || 0,
                    frame: Math.round(sm.trans.secs / sm.trans.secsTotal * 50),
                    frameMax: 50,
                    rev: !sm.trans.inState // use trans instate bool to ser rev
                };
                poolMod.moveByFramePerObj(obj, fp);
                obj.lifespan = 1;
            }
        });
 
    // STATE MACHINE
    var sm = {
        ver: '0.3.0',
        canvas: canvas,
        ctx: ctx,
        game: {},
        lt: new Date(),
        currentState: 'title',
        gameMode: 'freePlay',
        trans: {
            active: true,
            inState: true,
            secs: 0,
            secsTotal: 0.5,
            onDone: utils.noop
        },
        states: {},
        buttons: buttonPool
    };
    // change the current state and set up a 'in' transition for the new state
    var changeState = function (sm, stateKey) {
        sm.currentState = stateKey;
        sm.trans.active = true;
        sm.trans.inState = true;
        sm.trans.secs = 0;
        sm.states[sm.currentState].init(sm);
    };
    // start a 'out' transition to a state change
    var startStateChangeTrans = function(sm, stateKey){
        sm.trans.active = true;
        sm.trans.inState = false;
        sm.trans.secs = 0;
        sm.trans.onDone = function(sm){
            changeState(sm, stateKey);
            sm.trans.onDone = function(){};
            sm.trans.onDone = utils.noop;
        };
    };
    // update state by calling trans or update method
    var updateState = function (sm, secs) {
        if (sm.trans.active) {
            if (sm.trans.secs < sm.trans.secsTotal) {
                sm.trans.secs += secs;
                sm.trans.secs = sm.trans.secs > sm.trans.secsTotal ? sm.trans.secsTotal : sm.trans.secs;
                if (sm.trans.secs === sm.trans.secsTotal) {
                    sm.trans.active = false;
                    sm.trans.onDone(sm);
                }
            }
            sm.states[sm.currentState].trans(sm, secs);
        } else {
            sm.states[sm.currentState].update(sm, secs);
        }
    };
 
    // TITLE STATE
    sm.states.title = {
        init: function (sm) {
            // set all button object to inactive
            poolMod.setActiveStateForAll(sm.buttons, false);
            // spawn object for new Game button
            poolMod.spawn(sm.buttons, sm, {
                action: 'start_game_freePlay',
                disp: 'New Freeplay Game',
                sx: -150,  // start x and y where the button should start
                sy: sm.canvas.height / 2,
                dist: 250, // distance and heading from start location
                heading: 0,
                rev: false
            });
            // spawn object for new Game button
            poolMod.spawn(sm.buttons, sm, {
                action: 'start_game_endurance',
                disp: 'New Endurance Game',
                sx: sm.canvas.width + 150,  // start x and y where the button should start
                sy: sm.canvas.height / 2 + 32,
                dist: 250 + 120, // distance and heading from start location
                heading: Math.PI,
                rev: false
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.text_title(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_game_freePlay'){
                    sm.gameMode = 'freePlay';
                    startStateChangeTrans(sm, 'game');
                }
                if(button.data.action === 'start_game_endurance'){
                    sm.gameMode = 'endurance';
                    startStateChangeTrans(sm, 'game');
                }
            }
        }
    };
 
    // GAME STATE
    sm.states.game = {
        init: function (sm) {
            poolMod.setActiveStateForAll(sm.buttons, false);
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_gameover',
                disp: 'Quit',
                sx: sm.canvas.width + 32,
                sy: 0,
                dist: 64,
                heading: Math.PI,
                rev: false,
                w: 32,
                h: 32
            });
            // create a new game object
            sm.game = gameMod.create({
               mode: sm.gameMode
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
            if(sm.game.gameOver){
                startStateChangeTrans(sm, 'gameOver');
            }
        },
        draw: function (sm, ctx, canvas) {
            draw.PTL(ctx, canvas, sm.game);
            draw.score(ctx, canvas, sm.game);
            draw.pool(ctx, sm.buttons);
            draw.debugInfo(ctx, canvas, sm.game);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_gameover'){
                    startStateChangeTrans(sm, 'gameOver');
                }
            } else {
                gameMod.click(sm.game);
            }
        }
    };
 
    // GAME OVER STATE
    sm.states.gameOver = {
        init: function (sm) {
            poolMod.setActiveStateForAll(sm.buttons, false);
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_title',
                disp: 'Back',
                sx: sm.canvas.width + 32,
                sy: sm.canvas.height / 2,
                dist: 165,
                heading: Math.PI,
                rev: false,
                w: 128,
                h: 32
            });
            poolMod.spawn(sm.buttons, sm, {
                action: 'set_state_game',
                disp: 'Play New Game',
                sx: sm.canvas.width + 32,
                sy: sm.canvas.height / 2 - 32,
                dist: 165,
                heading: Math.PI,
                rev: false,
                w: 128,
                h: 32
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {
        },
        draw: function (sm, ctx, canvas) {
            draw.PTL(ctx, canvas, sm.game);
            draw.background(ctx, canvas, 'rgba(0,0,0,0.8)');
            draw.text_gameover(ctx, canvas, sm);
            draw.pool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_title'){
                    startStateChangeTrans(sm, 'title');
                }
                if(button.data.action === 'set_state_game'){
                    startStateChangeTrans(sm, 'game');
                }
            }
        }
    };
 
    // LOOP
    changeState(sm, 'title');
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        updateState(sm, secs);
        draw.background(ctx, canvas, '#0a0a0a');
        sm.states[sm.currentState].draw(sm, ctx, canvas);
        draw.ver(ctx, canvas, sm);
        sm.lt = now;
    };
    loop();
 
    // EVENTS
    canvas.addEventListener('mousedown', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
    canvas.addEventListener('touchstart', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
 
}
    ());
```

Now that I have covered everything that composes the main.js file I just need a little HTML to get this up and running. In my html I just have a div element that I am using for a container element to which the canvas element gets injected in when my main.js file runs, and then of course I have a script tag that links to my main.js file.

```html
<html>
    <head>
        <title>canvas example pop the lock</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/pool.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When this game is up and running it works as I would expect as the circle along the other edge moves alone one way or another. If I tab the canvas when the circle is in the range the score will go up otherwise the score will go down. At the time of this writing I am not sure what to do differently, so I just have the basic core idea of the game working for now. There is working out additional logic when it comes to how to go about tripping up the player rather than just having random locations, along with many other such ideas. However for now this is just about it I think.

## 5 - Conclusion

This was a quick, and fun little project that I put together in a flash, but is all ready starting to feel like a game. However there is still a great deal of room for improvement with it also, and I have yet to find a way to turn this kind of project into some more distinct from what I am cloning so that it is not just a knock off. 

I like to try to keep the projects in these canvas examples posts fairly simple and basic though so that I do not have to write an extremely lengthly amount of written content outlining the example. However this one is starting to get a little involved and I also have a lot more ideas that I keep writing down on my todo list for this one. The original game that I cloned off of was all ready a little addictive, but I found myself loosing interest fairly quick still. I thought to myself, hey this game is pretty cool actually, and it is so simple too, but it would be even better if it had these features.

I will be continuing to work on this one at least a little while longer, because I think that it could use a few more game modes. Also I think I should have some additional states, and even some basic features are still missing. As I continue to work on this I hope to also work out a half way decent system when it comes to having a state machine, and user interface features to move from one state to another.

