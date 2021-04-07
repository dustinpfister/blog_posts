---
title: Simple map system for level selection javaScript example
date: 2021-04-06 14:36:00
tags: [js]
layout: post
categories: js
id: 839
updated: 2021-04-07 12:24:39
version: 1.22
---

This week I am continuing to work on one of my [canvas examples](/2020/03/23/canvas-example/) that is just simply called [turret defense](/2020/01/10/canvas-example-turret-defense/) because I am really bad at names. Anyway for the game I would like to have a level selection map where there are a bunch of display objects for each level in the game.

So then the general idea is to just have a collection of display objects, one for each level, and then at least two states in a crude yet effective state machine. When I click on one of these display objects in the map state I then go to the game state, but with the game state object created with custom options set by way of a game options object that is part of the level selection object in this map system. 

With that said in this post I will be going over a very simple example of this kind of game map system, and for the game object I will just be using what I worked out in yesterdays post on working out a system for [rotation and fire control](/2021/04/05/js-javascript-example-rotate-and-fire/). 

What I will be writing about here then today will be yet another one of my [javaScript example](/2021/04/02/js-javascript-example/) posts, where the aim is to work out some simple module, system, or mechanic, and not always worrying about making a full, finished product. There are a lot of ideas that come up when it comes to just having this kind of system in a game, but for the sake of this post I would like to have just a simple basic system for this sort of thing.

<!-- more -->

## 1 - The map module

First of I will get right to the main event of this javaScript example and start writing about the map module rater than any additional files that will be needed in order to have something that will make use of it, I can get to that later in this post. This module will contain at least two public methods, one to create a map object, and another that will serve as a way to know if a map item object has been clicked or not.

Like all of my other modules like this there is a main create public method, this is the method that I will be calling in my main.js javaScript file, or in a state machine module, or any other module where I will want to create an instance of a main level map object. The main map object will contain data that has to do with the current offset of the map when it comes to scrolling, for this example I went with a system where the map just scrolls along on a single axis as I would like to keep things a simple as possible with this one. So I have an object called move map that is not the current offset value, but it is a number of properties that are used to help with the process of mutating that value. After that in the main map object I have a current offset value, a max value for the offset value, and an objects array. This objects array is where I will be storing data for each display object in the map, and will also contain game module options for the current level.

Another public method that I have here is a get object at method, this is simply used to get an object at a given location in the map. So then this is what I will be using in an event handler somewhere outside of this module to find out if the player clicked a display object in the map or not.

```js
var mapMod = (function () {
 
    var DIST_MIN = 50,
    DIST_MAX = 100,
    MAP_PPS_MAX = 256;
 
    // pubic api
    var api = {};
 
    // create a new map state object
    api.create = function (opt) {
        var map = {
            moveMap: {
                startPos: {x: 0, y: 0},
                curPos: {x:0, y:0 },
                dist: 0,
                moving: false
            },
            yOffset: 0,
            yMax: 480,
            objects: []
        };
        return map;
    };
 
    // get an object in the map with the given canvas
    // relative position. In the event that there is no object
    // return false
    api.getObjectAt = function(map, x, y){
        var i = 0,
        obj,
        len = map.objects.length;
        while(i < len){
            obj = map.objects[i];
            if(utils.distance(x, y, obj.x, obj.y - map.yOffset) <= obj.r){
                return obj;
            }
            i += 1;
        }
        return false;
    };
 
    // update the map, this should be called in a state machine update method
    api.update = function(map, secs){
        var curPos = map.moveMap.curPos,
        startPos = map.moveMap.startPos,
        per,
        delta;
        if(map.moveMap.moving){
            per = (map.moveMap.dist - DIST_MIN) / (DIST_MAX - DIST_MIN);
            delta = MAP_PPS_MAX * per * secs;
            if(curPos.y > startPos.y){
                map.yOffset += delta
            }
            if(curPos.y < startPos.y){
                map.yOffset -= delta;
            }
            map.yOffset = map.yOffset > map.yMax ? map.yMax : map.yOffset;
            map.yOffset = map.yOffset < 0 ? 0 : map.yOffset;
        }
    };
 
    api.on = {
        start: function(map, x, y){
            map.moveMap.startPos.x = x;
            map.moveMap.startPos.y = y;
            map.moveMap.curPos.x = map.moveMap.startPos.x;
            map.moveMap.curPos.y = map.moveMap.startPos.y;
            map.moveMap.dist = 0;
            map.moveMap.moving = false;
        },
        move: function(map, x, y, down){
            var curPos = map.moveMap.curPos,
            startPos = map.moveMap.startPos;
            if(down){
                curPos.x = x;
                curPos.y = y;
                map.moveMap.dist = utils.distance(curPos.x, curPos.y, startPos.x, startPos.y);
                map.moveMap.moving = false;
                if(map.moveMap.dist >= DIST_MIN){
                    map.moveMap.moving = true;
                }
            }
        },
        end: function(map, x, y){
            map.moveMap.moving = false;
        }
    };
 
    // return public api
    return api;
}
    ());
```

I then have a main update method that will take a map object along with a secs value to update the current map offset position of the map. For now I have a system where the player can click on any area of the map and if they move far enough away from a start point that will cause the ma to begin to move. The rate at which the map moves will change depending on the distance from the start point, this seems to work fine for now, but in a more advanced system I would maybe want to add some features for keyboard support and other ways of moving the map that involve just pointing to an edge of the map or something to that effect.

One last additional feature that I put in is an on object with functions for each type of general pointer event. There is using the on.start function in event handler of a mouse down and touch start events for example. This is then just want way to go about changing the state of the offset value that is really the main feature of this map level select system. Really that is all that this needs to do, just move around on a map and then click on an item that will then result in the player moving on to another state where they are playing a game, or setting some additional options for the game before doing so.

## 2 - The utils lib

Like many of my javaScript and canvas examples I have a main utility library that serves as a way to have a base set of methods to use in the example. Mayne of these methods are usual suspect type methods that I take with be from one project to another, however in other examples I might work out some methods that have to do with the specific example that are new, but I might just want to park here for one reason or another.

The only method here that I am using in the map module is the distance method, which is a method that I am typically going to want to have with just about any example such as this. The other methods are used in the game module, and oter files such as the main javaScript file, but I might also use them elsewhere, so I park them here.

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

## 3 - The game module

Now for the game state module for this javaScript example of a map system. You see the map system is just a way to go about having the player select and maybe mutate some options that are then passed to the main game state modules create method to create a new game state. Then the over all application progresses to the game state of the application and the game will begin to play. For this javaScript example I am just more or less using the same state module that I would out in yesterdays post where I worked out some basics when it comes to having a turret that the player can control.

```js
var gameMod = (function () {
 
    // constants
    var SHOT_COUNT = 10,
    SHOT_MAX_DIST = 300,
    SHOT_PPS = 256,
    TURRET_FIRE_RANGE = Math.PI / 180 * 20,
    TURRET_ROTATION_RATE = Math.PI / 180 * 180;
 
    // pubic api
    var api = {};
 
    // create state
    api.create = function (opt) {
        opt = opt || {};
        var state = {
            turret: {
                x: opt.canvas.width / 2,
                y: opt.canvas.height / 2,
                w: 32,
                h: 32,
                facing: 0,
                target: 0,
                radiansPerSecond: opt.radiansPerSecond || TURRET_ROTATION_RATE,
                heading: Math.PI * 1.5,
                fireRate: opt.fireRate || 0.125,
                fireSecs: 0,
                inRange: false
            },
            down: false // a pointer is down
        };
        state.shots = [];
        var i = 0;
        while (i < SHOT_COUNT) {
            state.shots.push({
                x: 0,
                y: 0,
                heading: 0,
                active: false
            });
            i += 1;
        }
 
        return state;
    };
    // update turret target
    api.updateTurretTarget = function (state, x, y) {
        var turret = state.turret;
        turret.target = Math.atan2(y - turret.y, x - turret.x);
    };
    // update turret facing to face current target
    api.updateTurretFacing = function (state, secs) {
        var turret = state.turret;
        var toAngle = turret.heading;
        if (state.down) {
            toAngle = turret.target;
        }
        var dist = utils.angleDistance(turret.facing, toAngle);
        var dir = utils.shortestAngleDirection(toAngle, turret.facing);
        var delta = turret.radiansPerSecond * secs;
        if (delta > dist) {
            turret.facing = toAngle;
        } else {
            turret.facing += delta * dir;
        }
        turret.inRange = false;
        if (state.down && dist < TURRET_FIRE_RANGE) {
            turret.inRange = true;
        }
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
    // update shots
    api.updateShots = function (state, secs) {
        var turret = state.turret;
        turret.fireSecs += secs;
        if (turret.fireSecs >= turret.fireRate && turret.inRange) {
            var freeShot = getFreeShot(state);
            if (freeShot) {
                freeShot.active = true;
                freeShot.x = turret.x;
                freeShot.y = turret.y;
                freeShot.heading = turret.facing;
            }
            turret.fireSecs = 0;
        }
        state.shots.forEach(function (shot) {
            if (shot.active) {
                shot.x += Math.cos(shot.heading) * SHOT_PPS * secs;
                shot.y += Math.sin(shot.heading) * SHOT_PPS * secs;
                if (utils.distance(shot.x, shot.y, turret.x, turret.y) >= SHOT_MAX_DIST) {
                    shot.active = false;
                }
            }
        });
    };
    // return public api
    return api;
}
    ());
```

## 4 - The draw module

Just like with any other example where I am using canvas to create a view for the application I have a draw module that contains methods that help me draw to a canvas element. I always have a draw method to draw the background of the canvas which is almost always a solid simple solid color background, I also have methods that i am using to draw the state of display objects in the main game state of the over all example. The main method of interest here as far as the subject mater of this post is concerned though if of course the draw map method.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.map = function(ctx, map){
   map.objects.forEach(function(obj){
       ctx.fillStyle = 'lime';
       ctx.beginPath();
       ctx.arc(obj.x, obj.y - map.yOffset, obj.r, 0, utils.pi2);
       ctx.fill();
   });
};
 
draw.turret = function (ctx, game) {
    var turret = game.turret;
    ctx.save();
    ctx.translate(turret.x, turret.y);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(turret.w * 0.5 * -1, turret.h * 0.5 * -1, turret.w, turret.h);
    ctx.rotate(turret.facing);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.fillRect(turret.w * 0.3 * -1, turret.h * 0.3 * -1, turret.w * 0.6, turret.h * 0.6);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(turret.w, 0);
    ctx.stroke();
    ctx.restore();
};
 
draw.shots = function (ctx, game) {
    var shots = game.shots;
    shots.forEach(function (shot) {
        if (shot.active) {
            ctx.save()
            ctx.fillStyle = 'white';
            ctx.translate(shot.x, shot.y);
            ctx.fillRect(-3, -3, 6, 6);
            ctx.restore();
        }
    });
};
```

## 5 - The main javaScript file

Now for the main javaScript file will I will have a basic state machine for a map menu, and main game states.  On top of this crude yet effective state machine I also have a main app loop for the example, and anything else that should be placed in such a javaScript file. I am also creating an instance of the main map object here, and in addition to this I am also pushing in some display objects for the map in addition to this.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;
 
var sm = {
    currentState: 'mapMenu',
    game: {},
    map: mapMod.create(),
    states: {},
    pos: {},
    down: false
};
 
// push some objects to the map
sm.map.objects.push({
    x: 50,
    y: 45,
    r: 20,
    gameOptions: {
        radiansPerSecond: Math.PI / 180 * 20,
        fireRate: 1
    }
});
 
sm.map.objects.push({
    x: 520,
    y: 480,
    r: 20,
    gameOptions: {
        radiansPerSecond: Math.PI / 180 * 45,
        fireRate: 0.75
    }
});
 
sm.map.objects.push({
    x: 220,
    y: 720,
    r: 20,
    gameOptions: {
        radiansPerSecond: Math.PI / 180 * 90,
        fireRate: 0.25
    }
});
 
sm.states.mapMenu = {
    update: function(sm, secs){
        var state = this;
        mapMod.update(sm.map, secs);
    },
    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.map(ctx, sm.map)
    },
    pointer: {
        start: function(sm, pos, e){
            mapMod.on.start(sm.map, pos.x, pos.y);
        },
        move: function(sm, pos, e){
            mapMod.on.move(sm.map, pos.x, pos.y, sm.down);
        },
        end: function(sm, pos, e){
            if(!sm.map.moveMap.moving){
                var obj = mapMod.getObjectAt(sm.map, pos.x, pos.y);
                if(obj){
                    var gameOptions = Object.assign({canvas: canvas}, obj.gameOptions)
                    sm.game = gameMod.create(gameOptions);
                    sm.currentState = 'game';
                }
            }
            mapMod.on.end(sm.map, pos.x, pos.y);
        }
    }
};
 
sm.states.game = {
    update: function(sm, secs){
        gameMod.updateTurretFacing(sm.game, secs);
        gameMod.updateShots(sm.game, secs);
    },
    draw: function(ctx, canvas, sm){
        draw.back(ctx, canvas);
        draw.turret(ctx, sm.game);
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

When I have this example up and running the basic, crude, unpolished idea is working for what it is worth. I have a bunch of display objects on the canvas, I can move up and down to see more display objects, and when I click on one I progress to a new state in which the main game object is created with options set depending on the object I click on.

## 6 - Conclusion

So then it would seem that I have the basic idea up and running at least for what it is worth. However there might be a great deal ore to work on when it comes to making this system something that i will want to use in a real project though. Still that is okay because the aim here was to just make a simple system, not go all out with this, I wanted to just start somewhere with it, and this is what i wanted when it comes to just getting started at least.

Of course there are a lot of ideas for additional features not just with this map system, but also the game itself. This time around in the main javaScript file of this javaScript example I started a simple state machine, I am thinking that a more advanced version of this will make use of at least one more state that the player will enter when clicking on an item on the map menu. This additional state would be used to change a few more settings for the game, before moving on to the actual game state.
