---
title: A canvas example game that is a fixed shooter hybrid
date: 2020-07-10 13:15:00
tags: [canvas]
layout: post
categories: canvas
id: 680
updated: 2021-02-27 16:50:02
version: 1.16
---

This post will be on a fixed shooter hybrid [canvas example](/2020/03/23/canvas-example/) game, like that of [centipede](https://en.wikipedia.org/wiki/Centipede_%28video_game%29). The game is like a fixed shooter type game like that of space invaders or kaboom, however the player is able to move by two axis of movement rather than just one.Still the player can not just move anywhere the play display object must stay in an area at the bottom of the screen. So then the player is not truly fixed to one axis, but is fixed to an area. I do not aim to make a true clone of centipede, but I would like to just make a clean canvas example of something that is similar to that classic game.

If I get more time to come around and add some more features I am not really sure what more I can add to it that would be taking this kind of game into a new direction. I also have so many other canvas examples that also could use some more work. All i wanted to do with this example is just get the basic idea of this kind of game up and working though, and that is what this is.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-fixed-shooter-hybrid/0.1.1/pkg.js"></script>

## 1 - The utils.js file

First off when it comes to this canvas example I have a utility library as I often do with many of these canvas examples of mine. For this example I know that I am going to want bounding box collision detection, a clamp method to clamp a display object to an area. I also have a helper method here that helps be get a canvas relative position of a pointer object.

```js
var utils = {};
 
// bounding box
utils.bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};
// clamp
utils.clamp = function (obj, box) {
    var xMax = box.x + box.w - obj.w,
    yMax = box.y + box.h - obj.h;
    obj.x = obj.x > xMax ? xMax : obj.x;
    obj.y = obj.y > yMax ? yMax : obj.y;
    obj.x = obj.x < box.x ? box.x : obj.x;
    obj.y = obj.y < box.y ? box.y : obj.y;
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
// get a point relative to the canvas rather than window, 
// and scale the point to fit the current scaled size of the canvas
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

As I continuing working on this example, which I might at some point in the future, this library will grow with additional methods like this. So in other words this is a kind of application specific lodash of sorts where I am just adding methods that I am actually going to use in one or more other modules.

## 2 - The game.js file to create and update a state object

So in this section I will be going over the game.js file for this canvas example of a fixed hybrid type game. This module can be used to create and return a state object that is used outside of the module that contains properties that have to do with the areas for enemies and the player, as well as the player object and pools of display objects for shots and enemies.

Theer are methods for creating display object pools for both an array of enemies, as well as an array of shots that the player auto fires upward. I followed a standard where there is an active flag for each object, and that is used as a way to spawn and destroy from the game board. I sometimes go with this kind of approach with that rather than pushing and purging display objects from a pool.

For now I went with an auto fire feature for this game that I might keep in place as I continue to developed this one more when and if I get around to it. I could make it so that there are ways to fire by pressing a button or preforming some kind of action when it comes to working out how I go about handing input here. However chances are this is the kind of game where I would want to just keep firing over and over again anyway.

```js
var game = (function () {
 
    // center the player
    var centerPlayer = function (state) {
        var pa = state.playArea,
        p = state.player;
        p.x = pa.x + pa.w / 2 - p.w / 2;
        p.y = pa.y + pa.h / 2 - p.h / 2;
    };
 
    // create player shot pool
    var createPlayerShotPool = function (state) {
        var i = 0,
        len = 10,
        p = state.player;
        p.shots = [];
        while (i < len) {
            p.shots.push({
                x: 0,
                y: 0,
                w: 3,
                h: 3,
                pps: 128,
                heading: Math.PI * 1.5,
                active: false
            });
            i += 1;
        }
    };
 
    // get inactive pool object
    var getInactive = function (pool) {
        var p = state.player,
        i = pool.length,
        obj;
        while (i--) {
            obj = pool[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
 
    var hitCheck = function (obj, pool) {
        var i = pool.length,
        poolObj;
        while (i--) {
            poolObj = pool[i];
            if (poolObj.active && utils.bb(obj, poolObj)) {
                return poolObj;
            }
        }
        return false;
    };
 
    // update player shots
    var updatePlayerShots = function (state, secs) {
        var i = 0,
        p = state.player,
        shot,
        e,
        len = p.shots.length;
        while (i < len) {
            shot = p.shots[i];
            if (shot.active) {
                shot.x += Math.cos(shot.heading) * shot.pps * secs;
                shot.y += Math.sin(shot.heading) * shot.pps * secs;
                e = hitCheck(shot, state.enemies.pool);
                if (e) {
                    e.active = false;
                    p.kills += 1;
                }
                if (!utils.bb(shot, state.playArea) && !utils.bb(shot, state.board)) {
                    shot.active = false;
                }
            }
            i += 1;
        }
    };
 
    // create enemies pool
    var createEnemiesPool = function (state) {
        var i = 0,
        len = 10,
        p = state.player;
        state.enemies.pool = [];
        while (i < len) {
            state.enemies.pool.push({
                x: 0,
                y: 0,
                w: 8,
                h: 8,
                pps: 32,
                heading: 0,
                active: false
            });
            i += 1;
        }
    };
 
    // update enemies
    var updateEnemies = function (state, secs) {
        var es = state.enemies,
        e;
        es.secs += secs;
        // spawn
        if (es.secs >= es.spawnRate) {
            es.secs %= es.spawnRate;
            e = getInactive(es.pool);
            if (e) {
                e.x = state.board.x + state.board.w * Math.random();
                e.y = state.board.y;
                e.heading = Math.PI * Math.random();
                e.active = true;
            }
        }
        // move
        var i = es.pool.length;
        while (i--) {
            e = es.pool[i];
            e.x += Math.cos(e.heading) * e.pps * secs;
            e.y += Math.sin(e.heading) * e.pps * secs;
            if (!utils.bb(e, state.board)) {
                e.active = false;
            }
        }
    };
 
    // create the state object
    var createState = function (opt) {
        opt = opt || {};
        var state = {
            canvas: opt.canvas,
            ctx: opt.canvas.getContext('2d'),
            ver: '0.1.1',
            board: {
                x: 16,
                y: 16,
                w: 128,
                h: 128
            },
            playArea: {
                x: 16,
                y: 144,
                w: 128,
                h: 64
            },
            enemies: {
                pool: [],
                spawnRate: 1,
                secs: 0
            }
        };
        state.player = {
            x: 0,
            y: 0,
            w: 16,
            h: 16,
            shots: [],
            lastShot: new Date(),
            shotRate: 0.25,
            heading: Math.PI * 1.5,
            pps: 0,
            maxPPS: 32,
            kills: 0
        };
        centerPlayer(state);
        createPlayerShotPool(state);
        createEnemiesPool(state);
        return state;
    };
 
    var playerFire = function (state) {
        var p = state.player,
        now = new Date(),
        shot = getInactive(state.player.shots),
        t = now - p.lastShot,
        secs = t / 1000;
        if (shot && secs >= p.shotRate) {
            shot.active = true;
            shot.x = p.x + p.w / 2 - shot.w / 2;
            shot.y = p.y;
            p.lastShot = now;
        }
    };
 
    return {
        create: createState,
        playerFire: playerFire,
        update: function (state, secs) {
            var p = state.player,
            pa = state.playArea;
            p.x += Math.cos(p.heading) * p.pps * secs;
            p.y += Math.sin(p.heading) * p.pps * secs;
 
            // clamp player
            utils.clamp(p, pa);
            // auto fire for now
            playerFire(state);
 
            // update shots
            updatePlayerShots(state, secs);
 
            // update enemies
            updateEnemies(state, secs);
 
        }
    };
 
}
    ());
```

The get inactive helper method was designed in a way so that it will work with any pool object in general. I did start a unit module when starting this example, but I did not get far with it this time. When it get around to it much of the code here would be pulled from the game.js file into this unit module of sorts, but as of this writing I did not get around to that.

I do not want to get into to much detail about the module here as I might get around to chaining a lot of things, and then I would just have to write everything all over again about it when I do so with this one. In any case moving forward this will be the main module for creating an updating a main game state object, it all ready contains properties like how many enemies the player killed and so forth, so in the future it might contain values like level, and current weapon type when and if I get into a more interesting version of this project.

## 3 - The draw.js module

So then of course I have my draw module that will render to a canvas element. There are methods for just drawing a plain background as well as many methods for drawing certain aspects of the game state object. This way I can control the order in which cretin things are drawn when drawing to the canvas element.

```js
var draw = (function () {
 
    return {
        background: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        board: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx,
            b = state.board,
            pa = state.playArea;
            // board
            ctx.fillStyle = 'blue';
            ctx.fillRect(b.x, b.y, b.w, b.h);
            // play area
            ctx.fillStyle = 'green';
            ctx.fillRect(pa.x, pa.y, pa.w, pa.h);
        },
 
        // draw the player display object
        player: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx,
            pl = state.player;
            ctx.fillStyle = 'red';
            ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
 
        },
 
        // player shots
        playerShots: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx;
            ctx.fillStyle = 'white';
            state.player.shots.forEach(function (shot) {
                if (shot.active) {
                    ctx.fillRect(shot.x, shot.y, shot.w, shot.h);
                }
            });
        },
 
        // draw enemies
        enemies: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx;
            ctx.fillStyle = 'white';
            state.enemies.pool.forEach(function (e) {
                if (e.active) {
                    ctx.fillRect(e.x, e.y, e.w, e.h);
                }
            });
        },
 
        // info
        info: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx,
            p = state.player,
            b = state.board,
            sx = b.x + b.w + 16,
            sy = b.y + 16;
 
            ctx.fillStyle = 'white';
            ctx.font = '10px courier';
            ctx.fillText('kills: ' + p.kills, sx, sy);
            ctx.fillText('v' + state.ver, sx, sy + 10);
 
        }
    };
 
}
    ());
```

## 4 - Main.js, and index.html

Now for the current state of the main.js file for this canvas example. Here I am creating and injecting the canvas element as well as the state object created with he create method of the game module.

```js
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
// CREATE STATE
var state = game.create({
        canvas: canvas
    });
 
// APP LOOP
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    game.update(state, secs);
    draw.background(state);
    draw.board(state);
    draw.player(state);
    draw.playerShots(state);
    draw.enemies(state);
    draw.info(state);
    lt = now;
};
loop();
 
// KEYBOARD events
var keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    k: false
};
var keyUpdate = function () {
    state.player.heading = 0;
    state.player.pps = 0;
    if (keys.d) {
        state.player.heading = 0;
    }
    if (keys.a) {
        state.player.heading = Math.PI;
    }
    if (keys.w) {
        state.player.heading = Math.PI * 1.5;
    }
    if (keys.s) {
        state.player.heading = Math.PI * 0.5;
    }
    if (keys.w || keys.a || keys.s || keys.d) {
        state.player.pps = 32;
    }
    // auto fire only for now
    //if (keys.k) {
    //    game.playerFire(state);
    //}
 
};
 
window.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase(),
    aKey = 'wasdk'.split('').some(function (aKey) {
            return aKey === key;
        });
    if (aKey) {
        keys[key] = true;
    }
    keyUpdate();
});
 
window.addEventListener('keyup', function (e) {
    var key = e.key.toLowerCase(),
    aKey = 'wasdk'.split('').some(function (aKey) {
            return aKey === key;
        });
    if (aKey) {
        keys[key] = false;
    }
    keyUpdate();
});
 
// POINTER events
var pointer = {
    down: false,
    x: 0,
    y: 0
};
var pointStart = function (e) {
    pointer.down = true;
};
var pointMove = function (e) {
    var pos = utils.getCanvasRelative(e),
    per,
    d,
    p = state.player;
    pointer.x = pos.x;
    pointer.y = pos.y;
    if (pointer.down) {
        p.heading = Math.atan2(pointer.y - p.y, pointer.x - p.x);
        p.pps = 32;
    }
 
};
var pointEnd = function (e) {
    var p = state.player;
    pointer.down = false;
    p.pps = 0;
};
 
canvas.addEventListener('mousedown', pointStart);
canvas.addEventListener('mousemove', pointMove);
canvas.addEventListener('mouseup', pointEnd);
canvas.addEventListener('touchstart', pointStart);
canvas.addEventListener('touchmove', pointMove);
canvas.addEventListener('touchend', pointEnd);
```

So now I have just a little html that will make use of all of these modules and stand alone code in several files when I use it in development form.

```html
<html>
    <head>
        <title>canvas example game fixed shooter hybrid</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So when this canvas example is up and running I have the basic idea of the shooter type games like I wanted. I can more the player object around and shot objects move from the player object up to the top of the board. When a shot hits an enemy object it is killed, and I have a kill count that show how many enemy objects I killed so far.

So it is not much of anything to exciting from an end users perspective, but I just wanted the basic idea of the game working so far, and that is what this is. The question now is what more to I add from here when it comes to making the game a little more fun, and unique. There is a lot that comes to mind with this, and at some point in the future maybe I will get around to expanding this more.

## 5 - Conclusion

So this canvas example is showing some potential when it comes to making a project that might actually be a little fun and interesting. That is not saying much though because I have a lot of other canvas examples like this one that i would also like to put a little more time into also.

I all ready have some plans for additional versions of this canvas example, I might expand when it comes to making a general unit class for the project. It would be nice for there to be different types of units when it comes to enemies, for the speed and hit point values for the enemies to go up and so forth. I never get around to graphics with many of these projects and that is something that I would also like to change at some point, if not with this project one of theme. However there is always so many ides for projects and so little time.