---
title: Player Unit Grid javaScript example
date: 2021-04-08 15:32:00
tags: [js]
layout: post
categories: js
id: 841
updated: 2021-04-12 16:40:33
version: 1.16
---

This week I am continuing to get a little more work on my turret defense canvas example, and as such I think I will make another simple [javaScript example](/2021/04/02/js-javascript-example/) where I am working out a separate stand alone project that is just one little feature that I may or may not add to the actual game.

In this post I am writing abound a quick amount of code that I thrashed together in a single day that might prove to be a better system for placing a player controlled turret in the game, along with additional units that can be placed in this player unit area of a canvas element. There are a number of ways to go about making this kind of system, but for this kind of unit grid I think a system where there is a fixed collection of objects for each gird location will work okay actually. The reason why I say that is because the gird will be rather small, I am thinking maybe only 3 by 3, or maybe one as large as 5 x 5, and that is it.

Much of the source code I worked out here is just a hacked over revision of the source code that I worked out for my other simple javaScript example where the aim was to work out rotation and fire control for a turret.

<!-- more -->


## 1 - The game module

First off for this post I will want to go over the state of the main game.js file for this example, rather than the additional code that supports this.

At the top of the module I have some constants which is a typical thing that I do for modules like this often, but then I have to methods that are the base of what I have in mind here. I have a method that will set a standard set of properties for a display object, and another method that will create a base display object. The idea here is that I want to have a method that I will call to create a base, plain, standard object for a each grid location. then the process of creating something at a location, or removing it, is just a matter of changing the type property of an object that is all ready there, rather than creating and purging objects as needed.

```js
var gameMod = (function () {
 
    // constants
    var SHOT_COUNT = 100,
    SHOT_MAX_DIST = 300,
    SHOT_PPS = 256,
    TURRET_FIRE_RANGE = Math.PI / 180 * 20,
    TURRET_ROTATION_RATE = Math.PI / 180 * 180,
    TURRET_FIRE_RATE = 0.125;
 
    var setDispObject = function(disp, x, y, w, h){
        disp.x = x === undefined ? 0 : x;
        disp.y = y === undefined ? 0 : y;
        disp.w = w === undefined ? 4 : w;
        disp.h = h === undefined ? 4 : h;
        disp.hh = disp.h / 2;
        disp.hw = disp.w / 2;
        disp.cx = disp.x + disp.hw;
        disp.cy = disp.y + disp.hh;
    };
 
    // create a base disp object
    var createBaseDispObject = function(opt){
        opt = opt || {};
        var disp = {
            x:0,y:0,w:32,h:32,
            heading: opt.heading === undefined ? 0 : opt.heading,
            active: false,
            data: {}
        };
        setDispObject(disp, opt.x, opt.y, opt.w, opt.h);
        return disp;
    };
 
    // CREATE a base player unit that will just serve as a place holder unit
    var create_unit_base = function(opt){
        opt = opt || {};
        opt.w = 32;
        opt.h = 32;
        var unit = createBaseDispObject(opt);
        unit.active = false;
        unit.data.unitType = 'none';
        return unit;
    };
 
    // SET the given player unit pool slot to a turret
    var set_unit_turret = function(game, slotIndex){
        var unit = game.player_units[slotIndex];
        unit.heading = Math.PI * 1.5;
        unit.active = true;
        unit.data = {
            unitType: 'turret',
            facing: 0,
            target: 0,
            radiansPerSecond: TURRET_ROTATION_RATE,
            fireRate: TURRET_FIRE_RATE,
            fireSecs: 0,
            inRange: false
        };
        return unit;
    };
 
    // pubic api
    var api = {};
 
    // create state
    api.create = function (opt) {
        opt = opt || {canvas: {width: 640, height: 480}};
        var game = {
            canvas : opt.canvas,
            player_units: [],
            shots: [],
            down: false // a pointer is down
        };
 
        // create unit pool
        var i = 0,
        w = 3, h = 3, x, y,
        spacing = 20,
        unitSize = 32,
        sx = game.canvas.width / 2 - ((unitSize + spacing) * w / 2),
        sy = game.canvas.height / 2 - ((unitSize + spacing) * h / 2),
        len = w * h;
        game.player_units = [];
        while(i < len){
            x = i % w;
            y = Math.floor(i / w);
            game.player_units.push(create_unit_base({
                x: sx + x * unitSize + spacing * x,
                y: sy + y * unitSize + spacing * y
            }));
            i += 1;
        }
 
        // start unit
        set_unit_turret(game, 0);
        set_unit_turret(game, 2);
        set_unit_turret(game, 4);
        set_unit_turret(game, 6);
        set_unit_turret(game, 8);
 
        // create shot pool
        game.shots = [];
        var i = 0;
        while (i < SHOT_COUNT) {
            game.shots.push(createBaseDispObject());
            i += 1;
        }
 
        return game;
    };
    // update turret target
    api.updateTurretTarget = function (game, x, y) {
        game.player_units.forEach(function(unit){
           if(unit.data.unitType === 'turret'){
               // old system just sets an angle
               var a = Math.atan2(y - (unit.y + unit.hh), x - (unit.x + unit.hw));
               unit.data.target = a;
               // new system will involve some kind of object
               unit.data.targetObj = {
                   x: x,
                   y: y,
                   a: a + Math.PI,
                   dist: utils.distance(x, y, unit.x + unit.hw, unit.y + unit.hh)
               };
           }
        });
    };
 
    // find and return a free shot or false
    var getFreeShot = function (state) {
        var i = 0,
        shot,
        len = state.shots.length;
        while (i < len) {
            shot = state.shots[i];
            if (!shot.active) {
                return shot;
            }
            i += 1;
        }
        return false;
    };
 
    // update turret facing to face current target
    var update_turret_facing = function (game, turret, secs) {
        var toAngle = turret.heading;
        if (game.down) {
            toAngle = turret.data.target;
        }
        var dist = utils.angleDistance(turret.data.facing, toAngle);
        var dir = utils.shortestAngleDirection(toAngle, turret.data.facing);
        var delta = turret.data.radiansPerSecond * secs;
        if (delta > dist) {
            turret.data.facing = toAngle;
        } else {
            turret.data.facing += delta * dir;
        }
        turret.data.inRange = false;
        if (game.down && dist < TURRET_FIRE_RANGE) {
            turret.data.inRange = true;
        }
    };
 
    var update_turret_fire = function(game, turret, secs){
        turret.data.fireSecs += secs;
        if (turret.data.fireSecs >= turret.data.fireRate && turret.data.inRange) {
            var freeShot = getFreeShot(game);
            if (freeShot) {
                freeShot.active = true;
 
                // OLD SYSTEM
                //freeShot.data.unit = turret;
                //freeShot.x = turret.x + turret.w / 2 - freeShot.w / 2;
                //freeShot.y = turret.y + turret.h / 2 - freeShot.h / 2;
                //freeShot.heading = turret.data.facing;
                 
                // NEW SYSTEM set angle and dist
                freeShot.data.a = turret.data.targetObj.a;
                freeShot.data.dist = turret.data.targetObj.dist;
                freeShot.data.targetX = turret.data.targetObj.x
                freeShot.data.targetY = turret.data.targetObj.y
            }
            turret.data.fireSecs = 0;
        }
    };
 
    // update shots
    var updateShots = function (game, secs) {
        game.shots.forEach(function (shot) {
            if (shot.active) {
                
                // OLD SYSTEM
                //shot.x += Math.cos(shot.heading) * SHOT_PPS * secs;
                //shot.y += Math.sin(shot.heading) * SHOT_PPS * secs;
                //if (utils.distance(shot.x, shot.y, shot.data.unit.x, shot.data.unit.y) >= SHOT_MAX_DIST) {
                //    shot.active = false;
                //}
 
                // NEW SYSTEM
                var data = shot.data;
                data.dist -= SHOT_PPS * secs;
                data.dist = data.dist < 0 ? 0 : data.dist;
                shot.x = data.targetX + Math.cos(data.a) * data.dist;
                shot.y = data.targetY + Math.sin(data.a) * data.dist;
                if(data.dist === 0){
                    shot.active = false;
                }
 
            }
        });
    };
 
    api.update = function(game, secs){
        game.player_units.forEach(function(unit){
           if(unit.data.unitType === 'turret'){
               update_turret_facing(game, unit, secs);
               update_turret_fire(game, unit, secs);
           }
        });
        updateShots(game, secs);
    };
 
    // return public api
    return api;
}
    ());
```

For now I just have one unit other than the default for the unit pool that is a player controlled turret. SO for now there are just two types of units which are none, and turret. I plain to add AI controlled turrets, and have it so that a player controlled turret is just a single starting unit. In some levels I might have it so there is more than one player controlled turret, maybe, but that is a topic for a whole other post.

## 2 - Here I have the utils.js file

This is the utility library that I am using for this javaScript example. I do not think I added anything major to this as of this writing from some of my earlier javaScript examples to which this one is based oof of. Still I should place a copy of it that I am using just for the hell of it.

```js
var utils = {};
 
utils.pi2 = Math.PI * 2;
 
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
 
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
 
utils.normalizeHalf = function (n, scale) {
    var c = scale || Math.PI * 2,
    h = c / 2;
    return utils.mod(n + h, c) - h;
};
 
// the angular distance between two angles
utils.angleDistance = function (a, b, scale) {
    var m = scale || Math.PI * 2,
    h = m / 2,
    diff = utils.normalizeHalf(a - b, scale);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};
 
// get -1, 1, or 0 depending on the the state of two angles
utils.shortestAngleDirection = function (a1, a2, scale) {
    var z = a1 - a2,
    x = utils.normalizeHalf(z, scale);
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

## 3 - The Draw module

For this example I worked out a new draw method to render the turret, as well as a unit of type none for starters. As I add more unit types I will just need to add additional draw methods for each unit.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
var drawUnit = {
    none: function(ctx, unit){
        ctx.save();
        ctx.translate(unit.x, unit.y);
        // draw base area
        ctx.fillStyle = 'lime';
        ctx.fillRect(0, 0, unit.w, unit.h);
        ctx.restore();
    },
    turret: function(ctx, turret){
        ctx.save();
        ctx.translate(turret.x, turret.y);
        // draw base area
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, turret.w, turret.h);
        ctx.translate(turret.w / 2, turret.h / 2);
        ctx.rotate(turret.data.facing);
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.fillRect(-8, -8, 16, 16);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(turret.w, 0);
        ctx.stroke();
        ctx.restore();
    }
};
 
draw.player_units = function(ctx, game){
   game.player_units.forEach(function(unit){
       drawUnit[unit.data.unitType](ctx, unit)
   });
};
 
draw.shots = function (ctx, game) {
    var shots = game.shots;
    shots.forEach(function (shot) {
        if (shot.active) {
            ctx.save()
            ctx.fillStyle = 'white';
            ctx.translate(shot.x, shot.y);
            ctx.fillRect(0, 0, shot.w, shot.h);
            ctx.restore();
        }
    });
};
```

## 4 - Main

Now for the main javaScript file where I will be making use of this new system for having a grid of units for a turret defense type game. In the main project that I might use this with I have a few states all ready but for this one I am just going to need a main game state that I will just jump right into. Stll I am makign use of a kind of standard that I have worked out for state machines, however this is one thing that I seem to keep switching up a little now and then.

In this main.js file I have my main app loop of course where I am calling request animation frame, and I am also setting up some event handers here also.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;
 
var sm = {
    currentState: 'game',
    game: {},
    states: {},
    pos: {},
    down: false
};
 
sm.game = gameMod.create();
 
sm.states.game = {
    update: function(sm, secs){
        gameMod.update(sm.game, secs);
    },
    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.player_units(ctx, sm.game);
        draw.shots(ctx, sm.game);
    },
    pointer: {
        start: function(sm, pos, e){
            gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
        },
        move: function(s, pos, e){
            gameMod.updateTurretTarget(sm.game, pos.x, pos.y);
        }
    }
};
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    var state = sm.states[sm.currentState];
    state.update.call(state, sm, secs);
    state.draw.call(state, ctx, canvas, sm);
    lt = now;
};
loop();
 
var createPointerHandler = function(sm, eventType){
    return function (e) {
        var pos = sm.pos = utils.getCanvasRelative(e),
        state = sm.states[sm.currentState],
        pointer = state.pointer;
        if(eventType === 'start'){
            sm.game.down = true;
            sm.down = true;
        }
        if(eventType === 'end'){
            sm.game.down = false;
            sm.down = false;
        }
        if(pointer){
            if(pointer[eventType]){
                pointer[eventType].call(state, sm, pos, e, state);
            }
        }
    };
};
 
canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
```

When this is up and running I have a bunch of player controlled turrets for each of the areas in the grid that I set one up for. When I click an area in the canvas all of the turrets fire shots as that location. This kind of system seems to be working out okay thus far, but it does still have some draw backs maybe when it comes to a large enough map. However I am going to keep map sizes small when it comes to what I want to do, so maybe this will work out okay for some projects that I would like to start, and improve.

## 5 - Conclusion

That is it for now when it comes to this one little feature that I might very well add to my turret defense canvas game. The real system for this might take about a week of work, or at least one full long solid day of just working on this and nothing else to get solid. When it comes to introducing this to my canvas game, it is not just a question of shoehorning it into the source code of the game and that is it. I am going to want to add additional features that will alone for the player to create and remove units, or more accurately just change the types of units at each grid location, as well as the units being targeted and destroyed by incoming enemy units. 

There is also the question of what more additional types I would want to add. In this example I just have a fixed collection of objects for each location where a unit can be, and creating a unit is just a mater of making a blank place holder object a type of object other than that. I am not sure if I can say this is the best way of going about doing this sort of thing or not, but I have come to find that I am starting to care less about those kinds of things. What really matters is what the experience is from the perspective of the player, with that said I think a system like this might add value to my over all game, but I am going to need way more than just this alone going on for sure.


