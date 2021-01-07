---
title: Hyper Casual Space Shooter canvas example
date: 2020-12-11 17:06:00
tags: [canvas]
categories: canvas
layout: post
id: 760
updated: 2021-01-07 17:09:24
version: 1.26
---

I have made a few [canvas examples](/2020/03/23/canvas-example/) so far, but I think it is time to try something new. I started one other canvas example thus far that I have called a kind of [hyper casual](https://en.wikipedia.org/wiki/Hyper-casual_game) type game called [to the black](/2020/09/19/canvas-example-hyper-casual-to-the-black/). The idea that I had in mind for that example was very basic, I just wanted a ship that goes forward threw space at a given rate, and I have an estimate as to how long it would take for the ship to reach Max Safe integer. It was a fun, simple little project that I was able to put together in a sort time frame.

With this canvas example I want to continue with making a collection of games where I just have a very basic general idea as the whole of the example, or as a starting point for something I might put a fair amount of time into. In other words set the bar very low in terms of complexity and therefore have an idea for a game in which I can end up having a working proof of concept in a short time frame. Once I have the basic idea working from that point forward it is just a question of what I need to add in order to make the game more fun.

So then for this next hyper casual canvas example I had an idea to just make a simple, basic game in which I just fly around space and destroy blocks, thats it. So of course I was able to get that up and working in a flash, and now I just need to think in terms of what I want to add moving forward from here. Unlike the to the black example, with this one I put over a month worth of time into, and as such there is much more going on. Still the basic idea was done right away, at this point I am just continuing to pile more features on top of it. I have a half way decent example together now as of v0.25.0 of the example, I might put a little more time into it, but I think I am getting to the point where there really is only so much more to do. The core of the idea is there along with a great deal more, and now I might start some additional examples based off of this.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script src="/js/canvas-examples/hyper-casual-space-shooter/0.25.0/pkg.js"></script>

## If you just want to play the game

If you just want to play the game it might still not be such a good idea to spend a great deal of time playing this. I might still continue working on it, and at this time I might end up adding game state breaking changes. For the most part this should not be a problem, because the game can be finished fairly quickly anyway. Just keep in might that if you do play the game, do not get to attached to your save state at this time.

### How to play

When it comes to just playing the game the general idea is to move out from the main base area and just go out and blast blocks with the current ship weapon. When doing so money is made each time a block is destroyed, the money can then be used to upgrade the ship back at the base area. As you move farther from the base area block values will go up, this includes values like money, but also values like armor.

### Controls

If you are on a desktop client the keyboard can be used to preform a number of actions.

* w - speed up
* s - slow down
* a - change heading
* d - change heading

* v - debug display on/off
* b - auto fire on/off
* l - fire

* 1,2,3 - change weapon (when at base)

The mouse can also be used to click buttons when at base mouse, and it can also be used to move the ship and control speed. To control the speed of the ship click the speed bar on the left of the canvas, to change heading click in the circle in the lower right. This is also the way that one would have to do everything on a mobile device that does not have a keyboard.

## This example and many others are in my canvas-example github repo

The version number in the [github repo](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-hyper-casual-space-shooter) might be higher than what I have deployed here. I will get around to editing this post now and then, and when I do so I will update the content of the post, but to reflect the state of the source code at the version that I have published here. For the latest on what is going on with this canvas example, and all the other canvas examples that I have made thus far, it would be best to check out the github repository.

When it comes to going over the source code below I do not care to get into much detail just yet. Because I aim to keep working on this at least a little while longer so I do not want to have to wring about everything all over again when I come around to edit this post later. So for now I am going to keep things very general when it comes to writing about the code.


## 1 - The utility library

First off as with any of my other canvas examples I start off with a main.js file and often a utility library that contains a bunch of methods that I know I am going to want. This utility library is packed with methods that are often reused across other canvas examples, so many of the functions might just be copied and pasted in from other utility libraries. 

I keep making a new utils.js file for each canvas example, the reason why is because I do not want to have this part of the canvas example packed with code that I am not actually going to use in the project. In addition although many of these might be usual suspects such as a distance formula, some of theme might be closely related to the nature of the example. If often add in at least a few new ones when I start to create new features that I have never added to a project before.

```js
```

## 2 - The Pool.js module for creating and updating Object pools

I have made another canvas example a while back in which I made a module that is an object pool type project. After many years of experience writing javaScript code for various projects such as this I have come to find that I like to have fixed object pools to work with when it comes to display objects. I just like this kind of approach compared to the alternative system in which these kinds of objects are created and purged as needed. This object pool module is modified from what I was working with in the object pool canvas example. I of course made some revisions to the source code to make it more custom cut for this specific project.

```js
```

## 3 - The main game.js module

I then have a main game module that will be used to create, and update the main game state object for the canvas example. This module then contains a large list of constants for certain rules when it comes to the mechanics of the game, as well as a wide range of helper methods used to create objects pools for blocks and shots. There are then also a number of public methods that I will be using in my main.js file to create and update the main game object.

```js
```

## 4 - The draw.js module as this is a canvas example

So this is a canvas example after all, and just like every other canvas example I often end up with a draw module. This us where I park all my methods and code that has to do with drawing a view for a game state object to a canvas element. It is generally a good idea to pull this code away from other files that have to do with the main app loop, the game object, and general reusable utility functions.

```js
```

## 5 - The main.js file

For this canvas example I have a utility module, an Object pool module, a game module, and a draw module. There just needs to be a little more javaScript code that will make use of all of this. In many projects what is written here might often turn into a full blown state machine. However for this hyper casual style game I wanted to keep things simple, and to the point so I just have a single main.js file that just allows for a single app loop and state object.

So for this canvas example in the main.js file I just create the canvas element, and the main state object that also included the main game object. Beyond that I just have a simple app loop, and attach some event handlers for keyboard and pointer support. That is it, I wanted to focus on the logic of the game itself, however in future releases I might add a state machine, if I do in fact keep adding features, menus, and so forth, sooner or later I do need to just break things down more.

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
    ver: '0.26.0',
    canvas : canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create({money: 100}),
    debug: false, // debug mode on or off
    input: {
        pointer: {
            down: false,
            pos: {x:0,y:0},
            dir: 0,
            headCir: { // the heading circle use to set a target heading for the ship
                x: 320 - 30,
                y: 240 - 30,
                r: 24,
                dist: 0,
                a: 0,
                d: 0,
                dir: 0
            },
            ppsBar: {
                x: 5,
                y: 50,
                w: 16,
                h: 150,
                targetY: 200, // the target Y value for the speed to get to
                actualY: 50 + 75  // the actual Y value for the current speed
            },
            dist: 0 // dist from 160, 120 ( or 0,0 when it comes to game state)
        },
        //degree: 0,
        //degreesPerSecond: 90,
        //pps: 0,
        //ppsDelta: 1,
        fire: false,
        keys: {}
    },
    lt : new Date(),
    FPS_target : 20,
    FPS: 0
};
// update pointer object helper
var updatePointer = function(game, pos){
    var map = game.map,
    input = state.input,
    pointer = input.pointer,
    headCir = pointer.headCir,
    ppsBar = pointer.ppsBar;
    // update dir so that we know the shortest direction to go
    var d = Math.floor(utils.angleTo(pos.x, pos.y, 160, 120) / ( Math.PI * 2 ) * 360);
    pointer.dir = utils.shortestDirection(d, Math.floor(map.degree), 360);
    // update main dist
    pointer.dist = utils.distance(pos.x, pos.y, 160, 120);
    // update headCir
    if(pointer.down){
        headCir.dist = utils.distance(pos.x, pos.y, headCir.x, headCir.y);
        headCir.dist = headCir.dist > headCir.r ? headCir.r: headCir.dist;
        if(headCir.dist < headCir.r){
            headCir.a = utils.angleTo(pos.x, pos.y, headCir.x, headCir.y);
            headCir.d = Math.floor(headCir.a / ( Math.PI * 2 ) * 360);
            headCir.dir = utils.shortestDirection(headCir.d, Math.floor(map.degree), 360);
        }
        if(utils.boundingBox(pos.x, pos.y, 1, 1, ppsBar.x, ppsBar.y, ppsBar.w, ppsBar.h)){
            ppsBar.targetY = pos.y;
        }
    }
};
 
var numberButtonCheck = function(game, input){
    if(game.mode === 'base'){
        [1,2,3].forEach(function(n){
            if(input.keys[n]){
                game.ship.weaponIndex = n - 1;
                game.ship.weapon = game.weapons[n - 1];
                game.buttons.currentPage = 'weapons';
                gameMod.updateButtons(game);
            }
        });
    }
};
 
// SAVE STATE CHECK and LOOP START
 
var save = {
   appName: 'hyper-casual-space-shooter-save',
   gameSaves:[],
   slotIndex: 0,
   // update the current slotIndex with the given game object
   updateSlot: function(game){
       var createOptions = save.gameSaves[save.slotIndex];
       // save money to create options
       createOptions.money = game.money;
       // save upgrades
       createOptions.upgradeIndices = {};
       game.upgrades.forEach(function(upgrade){
           createOptions.upgradeIndices[upgrade.id] = upgrade.levelIndex;
       });
       // save map pos
       createOptions.mapX = game.map.x;
       createOptions.mapY = game.map.y;
       // update jason
       localStorage.setItem(save.appName, JSON.stringify(save.gameSaves));
   }
};
 
//localStorage.removeItem(save.appName);
 
save.gameSaves = localStorage.getItem(save.appName);
if(save.gameSaves){
   console.log('save found, parsing');
   save.gameSaves = JSON.parse(save.gameSaves);
}else{
   console.log('no save found, creating new one');
   save.gameSaves=[{money:10000, upgradeIndices:{}, mapX:0, mapY:0}];
   //localStorage.setItem(save.appName, JSON.stringify(save.gameSaves));
}
 
var createOptions = save.gameSaves[save.slotIndex];
 
console.log(save.gameSaves);
console.log(createOptions);
 
state.game = gameMod.create(createOptions);
 
// LOOP
//var lt = new Date(),
//FPS_target = 1000 / 30;
var loop = function () {
 
    var now = new Date(),
    t = now - state.lt,
    game = state.game,
    map = game.map,
    input = state.input,
    speedPer = map.pps / map.maxPPS,
    ppsBar = input.pointer.ppsBar,
    secs = t / 1000;
 
    requestAnimationFrame(loop);
 
    if (t >= 1000 / state.FPS_target) {
 
        state.FPS = 1 / secs;
 
        // if new ship
        if(game.ship.newShip){
            ppsBar.targetY = 200;
            game.ship.newShip = false;
        }
 
        // update input.pointer
        updatePointer(game, input.pointer.pos);
        // keyboard or pointer update map radian
 
        // keyboard update map pps
        if(input.keys.w){
            //map.pps += map.ppsDelta * secs;
            //map.pps = map.pps > map.maxPPS ? map.maxPPS : map.pps;
            ppsBar.targetY -= 100 * secs;
        }
        if(input.keys.s){
            //map.pps -= map.ppsDelta * secs;
            //map.pps = map.pps < 0 ? 0 : map.pps;
            ppsBar.targetY += 100 * secs;
        }
        if(input.keys.a){
            map.degree += map.degreesPerSecond * secs;
        }
        if(input.keys.d){
            map.degree -= map.degreesPerSecond * secs;
        }
 
        // clamp targetY
        ppsBar.targetY = ppsBar.targetY < ppsBar.y ? ppsBar.y: ppsBar.targetY;
        ppsBar.targetY = ppsBar.targetY > ppsBar.y + ppsBar.h ? ppsBar.y + ppsBar.h: ppsBar.targetY;
 
        // update map pps based on targetY and actualY of the ppsBar
 
        if(ppsBar.targetY != ppsBar.actualY){
 
            if(ppsBar.actualY > ppsBar.targetY){
                map.pps += map.ppsDelta * secs;
                map.pps = map.pps > map.maxPPS ? map.maxPPS : map.pps;
                // update ppsBar.actualY based on map.pps over map.maxPPS
                ppsBar.actualY = ppsBar.y + ppsBar.h - ppsBar.h * speedPer;
                if(ppsBar.actualY < ppsBar.targetY){
                    ppsBar.actualY = ppsBar.targetY;
                }
            }
 
            if(ppsBar.actualY < ppsBar.targetY){
                map.pps -= map.ppsDelta * secs;
                map.pps = map.pps < 0 ? 0 : map.pps;
                // update ppsBar.actualY based on map.pps over map.maxPPS
                ppsBar.actualY = ppsBar.y + ppsBar.h - ppsBar.h * speedPer;
                if(ppsBar.actualY > ppsBar.targetY){
                    ppsBar.actualY = ppsBar.targetY;
                }
            }
        }
 
        // pointer update map radian
        var headCir = input.pointer.headCir;
        //if(input.pointer.down && input.pointer.dist <= 32){
        if(input.pointer.down && headCir.dist < headCir.r){
            //if(input.pointer.dir === 1){
            if(headCir.dir === 1){
                map.degree += map.degreesPerSecond * secs;
            }
            //if(input.pointer.dir === -1){
            if(headCir.dir === -1){
                map.degree -= map.degreesPerSecond * secs;
            }
        }
        // pointer update map pps
        if(input.pointer.down && input.pointer.dist < 32){
            var per = input.pointer.dist / 32;
            map.pps.pps = map.maxPPS * per;
        }
        // keyboard update fire
        input.fire = false;
        if(input.keys.l){
            input.fire = true;
        }
        // number button check
        numberButtonCheck(game, input);
        // wrap degree
        map.degree = utils.mod(map.degree, 360);
        // update game
        //gameMod.setMapMovement(game, input.degree, input.pps);
        map.radian = utils.wrapRadian(Math.PI / 180 * map.degree);
        gameMod.update(game, secs, state);
 
        // draw
        draw.currentMode(state.ctx, state);
        draw.pointerUI(state.ctx, state);
 
        // update slot
        save.updateSlot(game);
 
        state.lt = now;
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
    // toggle debug mode
    if(key === 'v'){
       state.debug = !state.debug;
    }
    if(key === 'b'){
       state.game.autoFire = !state.game.autoFire;
    }
    state.input.keys[key] = false;
});
// MOUSE AND TOUCH
var pointerEvent = function(e){
   var pos = state.input.pointer.pos = utils.getCanvasRelative(e);
   if(e.type === 'mousedown' || e.type === 'touchstart'){
       state.input.pointer.down = true;
   }
   //if((e.type === 'mousemove' || e.type === 'touchmove') && state.input.pointer.down){
   //}
   if(e.type === 'mouseup' || e.type === 'touchend'){
       state.input.pointer.down = false;
       gameMod.checkButtons(state.game, pos, e);
   }
};
canvas.addEventListener('mousedown', pointerEvent);
canvas.addEventListener('mousemove', pointerEvent);
canvas.addEventListener('mouseup', pointerEvent);
```

## 6 - Conclusion

I was able to get the basic idea of what I wanted together with this fairly quickly. However now the question is how much more do I need to add to this in order to make a project that people are actually going to want to play? The game started out with just shooting shot objects at block objects, and that was just it. When I take a moment to play the game for a while, just doing that alone is a little satisfying, but in order to have a real game of course I am going to need more than just that. So I started adding features that have to do with weapons, upgrades, block positioning, block properties, and effects on blocks. It is starting to feel like a bit og a game, but I am not sure if I can truly say that this one is a done deal just yet.

I think that maybe an important part of the process is to not just think of a canvas example as just another project that I need to get over with so I can move on to the next thing. I am guilty of this kind of problem with many of my examples thus far, I work on something until I get the basic idea up and running, and then I stop working on it so I can move on to something else. This is a bad habit that has something to do with entering a kind of developer mindset, but loosing sight of a gamer mindset. So I have made an effort to break that cycle by trying to get into playing my own game, this game, to experience what it is like to actually play it. So far I would say that it is fun for a little while, but I still quickly loose interest after a little while, so maybe I still have some work to do with this one.

I have some other examples where I have broke the cycle of not going beyond the basic core idea, only to end up stopping eventually anyway. The result then is ending up with a project that is just starting to feel like a game, but not just there yet. So maybe if I start with a very basic idea for a game, try to limit the number of features, and focus on what really truly matters, I can break this cycle once and for all. I should keep working on this game, but I should not just more forward with any little idea that comes to mind. The focus should be on what truly matters with this, what will truly make this game into a real game for once.

I have some additional work drafted out for additional features, but at this point I think that there is only so much more to add. Once I have all the features that I want from there I think I might just want to make some code readability improvements. I have a lot of ideas that might help to make this game a lot more fun, but maybe some of those ideas should be pursued in a fork of this source code actually. I think that in the ling term I would like to keep this example simple, in terms of the game play at least. Sore I have added a fair number of features all ready, but the basic idea is to just fly around, and blast some blocks all to hell. A basic as it might be, it seems to work okay as a kind of escape. Not just when working on it, but paying it also.