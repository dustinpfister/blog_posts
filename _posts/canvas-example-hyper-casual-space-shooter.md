---
title: Hyper Casual Space Shooter canvas example
date: 2020-12-11 17:06:00
tags: [canvas]
categories: canvas
layout: post
id: 760
updated: 2021-01-07 16:13:51
version: 1.14
---

I have made a few [canvas examples](/2020/03/23/canvas-example/) so far, but I think it is time to try something new. I started one other canvas example thus far that I have called a kind of [hyper casual](https://en.wikipedia.org/wiki/Hyper-casual_game) type game called [to the black](/2020/09/19/canvas-example-hyper-casual-to-the-black/). The idea that I had in mind for that example was very basic, I just wanted a ship that goes forward threw space at a given rate, and I have an estimate as to how long it would take for the ship to reach Max Safe integer. It was a fun, simple little project that I was able to put together in a sort time frame.

With this canvas example I want to continue with making a collection of games where I just have a very basic general idea as the whole of the example, or as a starting point for something I might put a fair amount of time into. In other words set the bar very low in terms of complexity and therefore have an idea for a game in which I can end up having a working proof of concept in a short time frame. Once I have the basic idea working from that point forward it is just a question of what I need to add in order to make the game more fun.

So then for this next hyper casual canvas example I had an idea to just make a simple, basic game in which I just fly around space and destroy blocks, thats it. So of course I was able to get that up and working in a flash, and now I just need to think in terms of what I want to add moving forward from here. Unlike the to the black example, with this one I put over a month worth of time into, and as such there is much more going on. Still the basic idea was done right away, at this point I am just continuing to pile more features on top of it. I have a half way decent example together now as of v0.25.0 of the example, I might put a little more time into it, but I think I am getting to the point where there really is only so much more to do. The core of the idea is there along with a great deal more, and now I might start some additional examples based off of this.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script src="/js/canvas-examples/hyper-casual-space-shooter/0.25.0/pkg.js"></script>

## If you just want to play the game

If you just want to play the game itself then so far the controls can involve just clicking and dragging the mouse around the canvas. For now I have an auto fire option just set to true, so it is basically just chaining the heading and speed of the ship to move around. There are a number of keyboard events also w, and s keys can be used to change the speed of the ship and the a and d keys can be used to change heading.

As of 0.11.0 there is not much to talk about when it comes to game play beyond just moving around and shooting blocks. I aim to make this game at least a little more interesting though as I do aim to continue working on this one.

## This example and many others are in my canvas-example github repo

The version number in the [github repo](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-hyper-casual-space-shooter) might be higher than what I have deployed here. I will get around to editing this posy now and then, but for the lateset on what is going on with this, and all the other canvas examples that will be the latest that is going on with this.

When it comes to going over the source code below I do not care to get into much detail just yet. Because I aim to keep working on this at least a little while longer so I do not want to have to wring about everything all over again when I come around to edit this post later. So for now I am going to keep things very general when it comes to writing about the code.


## 1 - The utility library

First off as with any of my other canvas example I start off with a main.js file and a utility library. This utility library is packed with methods that are often reused across other canvas examples. However I always make a new utility library for each example. The reason why is because I do not want to have this part of the canvas example packed with code that I am not actually going to use in the project. In addition although many of these might be usual suspects such as a distance formula, some of theme might be closely related to the nature of the example.

```js
var utils = {};
 
// deep clone an object
utils.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
 
// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};
 
// return a canvas realtive point from the given Mouse or Touch event Object
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
 
// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// ANGLES
 
// Wrap a radian value
utils.wrapRadian = function(radian){
    return utils.mod(radian, Math.PI * 2);
};
 
// get the angle from one point to another
utils.angleTo = function(fromX, fromY, toX, toY){
    return utils.wrapRadian(Math.atan2(toY - fromY, toX - fromX) + Math.PI);
};
 
utils.normalizeHalf = function(n, scale) {
  var c = scale || Math.PI * 2;
  var h = c / 2;
  return utils.mod(n + h, c) - h;
};
 
utils.shortestDirection = function(from, to, scale) {
  var z = from - to;
  if (from === to) {
    return 0;
    // if (mod(-z, 360) < mod(z, 360)) {
  } else if (utils.normalizeHalf(z, scale) < 0) {
    return -1; // Left
  } else {
    return +1; // Right
  }
};
```

## 2 - The Pool.js module for creating and updating Object pools

I have made another canvas example a while back in which I made a module that is an object pool type project. After many years of experience writing javaScript code for various projects such as this I have come to find that I like to have fixed object pools to work with when it comes to display objects, rather than to have a system in which these kinds of objects a created and purged as needed. This object pool module is only slightly modified from what I was working with in the object pool canvas example. I of course made some revisions to the source code to make it more appropriate for this specific project.

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
                r: opt.r === undefined ? 16 : opt.r,
                //w: opt.w === undefined ? 32 : opt.w,
                //h: opt.h === undefined ? 32 : opt.h,
                radian: opt.radian === undefined ? 0 : opt.radian,
                pps: opt.pps === undefined ? 32 : opt.pps,
                lifespan: opt.lifespan || 3,
                // basic style
                fillStyle: opt.fillStyle || 'red',
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
    // get all active
    api.getAllActive = function(pool, activeState){
        activeState = activeState === undefined ? true : activeState;
        return pool.objects.filter(function(object){
            return object.active === activeState;
        });
    };
    // return the public api
    return api;
}
    ());
```

## 3 - The main game.js module

I then have a main game module that will be used to create, and update the main game state object for the canvas example. This module then contains a large list of constants for certain rules when it comes to the mechanics of the game, as well as a wide range of helper methods used to create objects pools for blocks and shots.

```js
var gameMod = (function(){
    
    // CONSTANTS
    var BLOCK_COUNT = 20,
    BLOCK_POS_MAX_DIST = 600,
    BLOCK_POS_SLOT_DIST = 15,
    BLOCK_HP_MIN = 5,
    BLOCK_HP_MAX = 1000,
    BLOCK_MONEY_BASE = 1,
    BLOCK_MONEY_DIST = 999,
    SHIP_AUTOFIRE = true,
    SHIP_HP = 100,
    SHIP_AUTOHEAL_RATE = 5,
    SHIP_AUTOHEAL_AMOUNT = 1,
    MAP_MAX_DIST = Math.pow(10,5); //Number.MAX_SAFE_INTEGER;      // max distance from 0,0
 
    // DEFAULT WEAPON OBJECTS
    var DEFAULT_WEAPONS = {
        0 : {
            name: "Pulse gun",
            firesPerSecond: 2,
            shotDamage: 1
        },
        1 : {
            name: "Cannon",
            firesPerSecond: 5,
            shotDamage: 3
        },
        2 : {
            name: "Atom",
            firesPerSecond: 1,
            shotDamage: 100
        }
    };
 
    var api = {};
 
    // HIT POINTS
    var CreateHPObject = function(maxHP){
        return {
            current: maxHP || 100,
            max: maxHP || 100,
            per: 1,
            autoHeal: {
                rate: 3,
                amount: 1, // every RATE heal AMOUNT
                secs: 0
            }
        };
    };
 
    var autoHealObject = function(obj, secs){
        if(obj.hp){
            obj.hp.autoHeal.secs += secs;
            if(obj.hp.autoHeal.secs >= obj.hp.autoHeal.rate){
                obj.hp.current += obj.hp.autoHeal.amount;
                obj.hp.current = obj.hp.current > obj.hp.max ? obj.hp.max : obj.hp.current;
                obj.hp.per = obj.hp.current / obj.hp.max;
                obj.hp.autoHeal.secs = 0;
            }
        }
    };
 
    var onShipDeath = function(game){
        game.ship = createShip(game);
        game.map.x = 0;
        game.map.y = 0;
        // set all blocks inactive
        poolMod.getAllActive(game.blocks).forEach(function(block){
           block.active = false;
           block.lifespan = 0;
        });
        // game money effected
        game.money = game.money > 0 ? game.money / 2 : 0;
    };
 
    // attack the given object with the given amount of damage
    var attackObject = function(game, obj, damage){
        if(obj.hp){
            obj.hp.current -= damage;
            obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
            obj.hp.per = obj.hp.current / obj.hp.max;
            // if ship death
            if(obj.hp.current === 0 && obj.type === 'ship'){
                onShipDeath(game);
            }
        }
    };
 
    // SHOTS
 
    // create shots pool helper
    var createShotsPool = function(){
        return poolMod.create({
                count: 60,
                fillStyle: 'red',
                r: 2,
                spawn: function(obj, pool, state, opt){
                    obj.x = 0;
                    obj.y = 0;
                    // shot radian should be set to current map radian
                    obj.radian = state.game.map.radian;
                    obj.pps = 128;
                    obj.lifespan = 3;
                    var weapon = state.game.ship.weapon;
                    obj.damage = weapon.shotDamage; // damage when shot hits a block
                   
                },
                update: function(shot, pool, state, secs){
                    var objDeltaX = Math.cos(shot.radian) * shot.pps * secs;
                    var objDeltaY = Math.sin(shot.radian) * shot.pps * secs;
                    shot.x += objDeltaX;
                    shot.y += objDeltaY;
                    // check if the shot has hit an active block
                    var blocks = poolMod.getAllActive(state.game.blocks, true);
                    var i = blocks.length;
                    while(i--){
                        var block = blocks[i];
                        var dist = utils.distance(shot.x, shot.y, block.x, block.y);
                        // if a shot hits a block
                        if(dist <= block.r + shot.r){
                            shot.lifespan = 0;
                            attackObject(state.game, block, shot.damage);
                            // if the block is dead
                            if(block.hp.current <= 0 ){
                                state.game.money += block.money;
                                block.lifespan = 0;
                                block.active = false;
                            }
                            break;
                        }
                    }
                }
            });
    };
 
    // BLOCK POOL
 
    // get all free positions where a block can go
    // will retrun an empty array in the event that there are none
    var getFreePositions = function(game, blockPool){
        var map = game.map,
        activeBlocks = poolMod.getAllActive(blockPool || game.blocks, true),
        xMapAjust = utils.mod(game.map.x, 32), // take into account current map position
        yMapAjust = utils.mod(game.map.y, 32),
        spotX, // the position relative to 0,0
        spotY,
        blockIndex,
        block,
        free = [],
        gridH = 10,
        gridW = 10,
        slotDist = BLOCK_POS_SLOT_DIST,
        // starting position of grid
        sx = Math.ceil(Math.cos(game.map.radian) * (gridH / 2 + slotDist) - gridW / 2),
        sy = Math.ceil(Math.sin(game.map.radian) * (gridH / 2 + slotDist) - gridH / 2),
        x = sx, // grid position
        y = sy;
        while(y < gridH + sy){
            x = sx;
            spotY =  y * 32 - yMapAjust;
            loopx:while(x < gridW + sx){
                spotX = x * 32 - xMapAjust;
                blockIndex = activeBlocks.length;
                while(blockIndex--){
                    block = activeBlocks[blockIndex];
                    if(utils.distance(block.x, block.y, spotX, spotY) <= block.r){
                       x+=1;
                       continue loopx;
                    }
                }
                free.push({
                    x: spotX,
                    y: spotY
                });
                x += 1;
            }
            y += 1;
        }
        return free;
    };
 
    // position a block
    var positionBlock = function(state, obj){
        var game = state.game;
        var freeSlots = getFreePositions(game);
        if(freeSlots.length === 0){
            obj.active = false;
            obj.lifespan = 0;
        }else{
            var slot = freeSlots.splice(Math.floor(freeSlots.length * Math.random()), 1)[0];
            obj.x = slot.x;
            obj.y = slot.y;
        }
    };
 
    // create block pool helper
    var createBlocksPool = function(){
        return poolMod.create({
            data: {},
            fillStyle: '#1a1a1a',
            count: BLOCK_COUNT,
            spawn: function(obj, pool, state, opt){
                var game = state.game;
                // set starting position of block
                positionBlock(state, obj);
                obj.radian = utils.wrapRadian(game.map.radian + Math.PI);
                obj.pps = game.map.pps;
                obj.lifespan = 1;
                obj.hp = CreateHPObject( BLOCK_HP_MIN + Math.round( (BLOCK_HP_MAX - BLOCK_HP_MIN) ) * game.map.per );
                obj.damage = 1;
                // block money based on BASE amount plus DIST AMOUNT
                obj.money = BLOCK_MONEY_BASE + Math.round(game.map.per * BLOCK_MONEY_DIST);
            },
            update: function(obj, pool, state, secs){
                obj.lifespan = 1;
                var game = state.game;
                var map = state.game.map;
                obj.radian = utils.wrapRadian(state.game.map.radian + Math.PI);
                obj.pps = state.game.map.pps;
                var objDeltaX = Math.cos(obj.radian) * obj.pps * secs;
                var objDeltaY = Math.sin(obj.radian) * obj.pps * secs;
                obj.x += objDeltaX;
                obj.y += objDeltaY;
                // data object for 'block'
                obj.data.dist = utils.distance(obj.x, obj.y, state.game.ship.x, state.game.ship.y);
                // become inactive if
                // block hits ship
                if(obj.data.dist <= game.ship.r + obj.r){
                    attackObject(game, game.ship, obj.damage);
                    obj.lifespan = 0;
                }
                // block goes out of range
                if(obj.data.dist >= BLOCK_POS_MAX_DIST){
                    obj.lifespan = 0;
                }
            }
        });
    };
 
    var createShip = function(game){
        var ship = {
            type: 'ship',
            x: 0, // ship position relative to map position
            y: 0,
            r: 8,
            hp: CreateHPObject(SHIP_HP),
            fillStyle: 'blue',
            weaponSecs: 0,
            weapon: game.weapons[0] // reference to the current weapon
        };
        ship.hp.autoHeal.rate = SHIP_AUTOHEAL_RATE;
        ship.hp.autoHeal.amount = SHIP_AUTOHEAL_AMOUNT;
        return ship;
    };
 
    // public create method
    api.create = function(){
        var game = {
            money: 0,
            weapons: utils.deepClone(DEFAULT_WEAPONS),
            ship: {}, //createShip(),
            shots: createShotsPool(),
            blocks: createBlocksPool(),
            map: { // map position
                x: 0,
                y: 0,
                radian: 0, 
                pps: 0,
                maxPPS: 256,
                dist: 0,
                per: 0 // map.dist / MAX_MAX_DIST
            }
        };
 
        // set current weapon
        game.ship = createShip(game);
 
        return game;
    };
 
    // set map movment values and wrap or clamp anything that might go out of range
    api.setMapMovement = function(game, degree, pps){
        game.map.radian = utils.wrapRadian(Math.PI / 180 * degree);
        // clamp PPS
        game.map.pps = pps;
        game.map.pps = game.map.pps < 0 ? 0 : game.map.pps;
        game.map.pps = game.map.pps > game.map.maxPPS ? game.map.maxPPS : game.map.pps;
    };
 
    // clamp map pos helper for map updater
    var clampMapPos = function(map){
        if(map.dist >= MAP_MAX_DIST){
          var radian = utils.wrapRadian(map.radian + Math.PI);
          map.x = Math.cos(radian) * MAP_MAX_DIST;
          map.y = Math.sin(radian) * MAP_MAX_DIST;
        }
    };
    // update the MAP using current RADIAN and PPS values
    // with the given SECS value.
    api.updateMap = function(game, secs){
        var map = game.map;
        map.x += Math.cos(map.radian) * map.pps * secs;
        map.y += Math.sin(map.radian) * map.pps * secs;
        map.dist = utils.distance(0, 0, map.x, map.y);
        clampMapPos(map);
        map.per = game.map.dist / MAP_MAX_DIST;
        map.aToOrigin = utils.angleTo(map.x, map.y, 0, 0);
 
        autoHealObject(game.ship, secs);
    };
 
    api.updateBlocks = function(game, secs, state){
        poolMod.update(game.blocks, secs, state);
        poolMod.spawn(game.blocks, state, {});
    };
 
    api.updateShots = function(game, secs, state){
        var ship = game.ship,
        weapon = ship.weapon;
        ship.weaponSecs += secs;
        if(SHIP_AUTOFIRE || state.input.fire){
            if(ship.weaponSecs >= 1 / weapon.firesPerSecond){
                poolMod.spawn(game.shots, state, {});
                ship.weaponSecs = 0;
            }
        }
        poolMod.update(game.shots, secs, state);
    };
 
    // return the Public API
    return api;
}());
```

## 4 - The draw.js module as this is a canvas example

So this is a canvas example after all, and just like every other canvas example I often end up with a draw module. This us where I park all my methods and code that has to do with drawing a view for a game state object to a canvas element.

```js
var draw = (function(){
 
    // draw a health bar for an object
    var drawHealthBar = function(ctx, obj){
        if(obj.hp){
            if(obj.hp.per < 1){
                ctx.beginPath();
                ctx.rect(obj.x - obj.r, obj.y + obj.r - 5, obj.r * 2, 5);
                ctx.fillStyle="rgba(120,120,120,0.4)";
                ctx.fill();
                ctx.beginPath();
                ctx.rect(obj.x - obj.r, obj.y + obj.r - 5, obj.r * 2 * obj.hp.per, 5);
                ctx.fillStyle="rgba(0,255,0,0.4)";
                ctx.fill();
            }
        }
    };
 
    // base draw object helper
    var baseObjectDraw = function(ctx, obj, render){
        ctx.save();
        ctx.translate(160, 120);
        ctx.fillStyle= obj.fillStyle || 'gray';
        ctx.strokeStyle= obj.strokeStyle || 'white';
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if(render){
            render(ctx, obj);
        }
        if(obj.hp){
            drawHealthBar(ctx, obj);
        }
        ctx.restore();
    };
 
    var api = {};
 
    // draw background
    api.background = function (ctx, state) {
        var canvas = state.canvas,
        map = state.game.map,
        r = Math.floor(map.per * 255);
        ctx.fillStyle = 'rgba(' + r + ',0,0,1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    api.shots = function(ctx, state){
       var game = state.game;
        state.game.shots.objects.forEach(function(shot){
            if(shot.active){
                baseObjectDraw(ctx, shot, function(ctx, shot){
                    ctx.fillStyle = 'yellow';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                });
            }
        });
    };
    api.blocks = function(ctx, state){
        var game = state.game;
        state.game.blocks.objects.forEach(function(block){
            if(block.active){
                baseObjectDraw(ctx, block, function(ctx, block){
                    ctx.fillStyle = 'yellow';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.font = '8px arial';
                    ctx.fillText(Math.floor(block.hp.current) + '/' + Math.floor(block.hp.max) , block.x, block.y);
                    ctx.fillText(block.money.toFixed(2), block.x, block.y + 8);
                });
            }
        });
    };
    api.ship = function(ctx, state){
        var game = state.game;
        ctx.fillStyle = 'rgba(0,0,255,0.2)';
        baseObjectDraw(ctx, game.ship, function(){
            var radian = game.map.radian;
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(
                game.ship.x + Math.cos(radian) * game.ship.r,
                game.ship.y + Math.sin(radian) * game.ship.r
            );
            ctx.lineTo(game.ship.x, game.ship.y);
            ctx.lineWidth = 3;
            ctx.stroke();
        });
    };
    api.gridLines = function (ctx, state, style) {
        var grid={
            cellSize: 64,
            cellWidth: 7,
            cellHeight: 7,
            xOffset: state.game.map.x,
            yOffset: state.game.map.y
        },
        sx = grid.cellWidth * grid.cellSize / 2 * -1 - (grid.xOffset % grid.cellSize),
        sy = grid.cellHeight * grid.cellSize / 2 * -1 + (grid.yOffset % grid.cellSize) * -1,
        x, y,
        len = grid.cellWidth * grid.cellHeight,
        i = 0;
        ctx.strokeStyle = style || 'red';
        ctx.lineWidth = 1;
        ctx.save();
        ctx.translate(160, 120);
        while(i < len){
            x = sx + (i % grid.cellWidth) * grid.cellSize;
            y = sy + Math.floor(i / grid.cellWidth) * grid.cellSize;
            ctx.beginPath();
            ctx.rect(x,y,grid.cellSize, grid.cellSize);
            ctx.stroke();
            i += 1;
        }
        ctx.restore();
    };
    // draw game state info
    api.info = function(ctx, state){
        var game = state.game,
        ship = game.ship,
        w = ship.weapon,
        map = game.map;
        ctx.fillStyle = 'yellow';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('map pos: ' + Math.floor(map.x) + ' , ' + Math.floor(map.y), 10, 10);
        ctx.fillText('map radian: ' + map.radian.toFixed(2) + '; map pps: ' + map.pps.toFixed(2), 10, 20);
        ctx.fillText('map dist: ' + map.dist.toFixed(2) + ' ('+Math.floor(map.per * 100)+'%)', 10, 30);
        ctx.fillText('a to origin: ' + map.aToOrigin.toFixed(2), 10, 40);
        ctx.fillText('weapon : ' + w.name + ', damage: ' + w.shotDamage + ', fps: ' + w.firesPerSecond, 10, 50);
        ctx.fillText('money : ' + game.money.toFixed(2) + '$', 10, 60);
    };
    // draw current version number
    api.ver = function(ctx, state){
        ctx.fillStyle = 'yellow';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
    };
    // return draw api
    return api;
}());
```

## 5 - The main.js file

For this canvas example I have a utility module, an Object pool module, a game module, and a draw module. There just needs to be a little more javaScript code that will make use of all of this. In many projects what is written here might often turn into a full blown state machine. However for this hyper casual style game I wanted to keep things simple, and to the point. 

So for this canvas example in the main.js file I just create the canvas element, and the main state object that also included the main game object. Beyond that I just have a simple app loop, and attach some event handlers for keyboard and pointer support.

```js
// CANVAS
var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};
 
var canvasObj = createCanvas(),
canvas = canvasObj.canvas;
 
// STATE
var state = {
    ver: '0.11.0',
    canvas : canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    input: {
        //pointerDown: false,
        //pointerPos: {},
        pointer: {
            down: false,
            pos: {},
            dir: 0,
            dist: 0
        },
        degree: 0,
        degreesPerSecond: 90,
        pps: 0,
        ppsDelta: 64,
        fire: false,
        keys: {}
    }
};
 
// update pointer object helper
var updatePointer = function(pos){
    // update dir so that we know the shortest direction to go
    var d = Math.floor(utils.angleTo(pos.x, pos.y, 160, 120) / ( Math.PI * 2 ) * 360);
    state.input.pointer.dir = utils.shortestDirection(d, Math.floor(state.input.degree), 360);
 
    // update dist
    state.input.pointer.dist = utils.distance(pos.x, pos.y, 160, 120);
 
};
 
// LOOP
var lt = new Date(),
FPS_target = 1000 / 30;
var loop = function () {
 
    var now = new Date(),
    t = now - lt,
    game = state.game,
    secs = t / 1000;
 
    requestAnimationFrame(loop);
 
    if (t >= FPS_target) {
        var input = state.input;
 
        // update input.pointer
        updatePointer(input.pointer.pos);
 
        // keyboard or pointer update map radian
        if(input.keys.a || (input.pointer.dir === 1 && input.pointer.down) ){
            input.degree += input.degreesPerSecond * secs;
        }
        if(input.keys.d || (input.pointer.dir === -1 && input.pointer.down) ){
            input.degree -= input.degreesPerSecond * secs;
            
        }
 
        // pointer update pps
        if(input.pointer.down && input.pointer.dist < 160){
            var per = input.pointer.dist / 160;
            input.pps = game.map.maxPPS * per;
        }
 
        // keyboard update pps
        if(input.keys.w){
           input.pps += input.ppsDelta * secs;
           input.pps = input.pps > game.map.maxPPS ? game.map.maxPPS : input.pps;
        }
        if(input.keys.s){
            input.pps -= input.ppsDelta * secs;
            input.pps = input.pps < 0 ? 0 : input.pps;
        }
 
        // keyboard update fire
        input.fire = false;
        if(input.keys.l){
            input.fire = true;
        }
 
        // keyboard switch weapons
        if(input.keys[1]){
            game.ship.weapon = game.weapons[0];
        }
        if(input.keys[2]){
            game.ship.weapon = game.weapons[1];
        }
        if(input.keys[3]){
            game.ship.weapon = game.weapons[2];
        }
 
        // wrap degree
        input.degree = utils.mod(input.degree, 360);
 
        // update game
        gameMod.setMapMovement(game, input.degree, input.pps);
        gameMod.updateMap(game, secs);
        gameMod.updateBlocks(game, secs, state);
        gameMod.updateShots(game, secs, state);
 
        // draw
        draw.background(state.ctx, state);
        draw.gridLines(state.ctx, state, 'rgba(255,255,255,0.1)');
        draw.blocks(state.ctx, state);
        draw.ship(state.ctx, state);
        draw.shots(state.ctx, state);
        draw.info(state.ctx, state);
        draw.ver(state.ctx, state);
        lt = now;
 
    }
};
loop();
 
// KEYBOARD EVENTS
window.addEventListener('keydown', function(e){
    //e.preventDefault();
    var key = e.key.toLowerCase();
    state.input.keys[key] = true;
});
window.addEventListener('keyup', function(e){
    //e.preventDefault();
    var key = e.key.toLowerCase();
    state.input.keys[key] = false;
});
 
// MOUSE AND TOUCH
 
var pointerEvent = function(e){
   var pos = state.input.pointer.pos = utils.getCanvasRelative(e);
   if(e.type === 'mousedown' || e.type === 'touchstart'){
       state.input.pointer.down = true;
   }
   if(e.type === 'mouseup' || e.type === 'touchend'){
       state.input.pointer.down = false;
   }
};
 
canvas.addEventListener('mousedown', pointerEvent);
canvas.addEventListener('mousemove', pointerEvent);
canvas.addEventListener('mouseup', pointerEvent);
```

## 6 - Conclusion

I was able to get the basic idea of what I wanted together with this fairly quickly. However now the question is how much more do I need to add to this in order to make a project that people are actually going to want to play? I have a lot of this drafted out in my todo list for this one as of this writing, and I think at least some of it might prove to be interesting.

I think that maybe an important part of the process is to not just think of a canvas example as just another project that I need to get over with so I can move on to the next thing. I am guilty of this kind of problem with many of my examples thus far, I work on something until I get the basic idea up and running, and then I stop working on it so I can move on to something else.

I have a few canvas examples where I have tried to put more time and effort into the example in an effort to break a cycle of sorts, but no matter how much time I put into an example I still always feel as though that example is lacking something. 

This is why I have started this hyper casual series of canvas examples. I have some other examples where I have broke the cycle of not going beyond the basic core idea, only to end up stopping eventually anyway. Ending with a project that is just starting to feel like a game, but not just there yet. So maybe if I start with a very basic idea for a game, try to limit the number of features, and focus on what really truly matters, I can break this cycle once and for all.
