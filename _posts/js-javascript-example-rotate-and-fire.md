---
title: Rotate and Fire javaScript example
date: 2021-04-05 16:13:00
tags: [js]
layout: post
categories: js
id: 838
updated: 2021-04-06 15:08:29
version: 1.14
---

Lately I have been giving my turret defense canvas example a much needed overhaul as I do not like the state that I have it in. I added a whole bunch of code that brings things to the example that start to make it look like an actual game to some extent for once. However there is much more work to do when it comes to making a quality game that people might actually want to play. For today though I wanted to work out a simple [javaScript example](/2021/04/02/js-javascript-example/) where I am just focusing one one little aspect of the game, and that is just having the turret move and fire.

This fire control system is just working out a standard way to control what will cause the turret to move, in what direction, and at at what rate of movement. This example then makes use of a bunch of methods that have to do with working with angles, because I will want to know the shortest direction between two angles, and also the angular distance from one angle to another, and so forth. Also it is true that what I am working out here will ally to all kind of games that will make use of this kind of control system, or something like it.

<!-- more -->

## 1 - utils library for this javaScript example

For this javaScript example I put together a simple general utility library that will contain all kinds of methods that will be used for this javaScript example. In just about any kind of project example like this I always have a general utility library to park methods that I might use in more than one place, or are methods that I will often copy over to other modules like this.

Anyway in this module I have a number of methods that have to do with things like getting the distance between tow points as well as a number of methods that have to do with working with angles. I am going to want to get an angular  distance, as well as the shortest distance to rotate the turret so of course I have methods to help with that sort of thing here.

```js
var utils = {};
 
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


## 2 - The state module

I put together a quick state module that will create and return, as well as update the main state object of this javaScript example. In a real projects I might have a lot of files that will make up the state including a state machine, a game module, along with many plug ins for this modules. However this is a simple little javaScript example where I just have a single file for this sort of thing.

The main public method of this module is the create method, this will create the main state object for this module, and the javaScript example as a whole. This state object contains properties like the x and y position of the turret, the width and height of the area of the turret, as well as a number of other properties that have to do with the rotational speed and rate of fire of the turret.

I then have a number of public methods that are used to mutate a state object created with the main create method of this module. I have things broken down when it comes to this where I have an update method that will just update the target property of the state object, and then another that will update the current facing direction of the turret. I then have another update method that will update the state of a shots object pool that I am using inside this module.

```js
var stateMod = (function () {
 
    var api = {};
 
    api.create = function (opt) {
        var state = {
            turret: {
                x: opt.canvas.width / 2,
                y: opt.canvas.height / 2,
                w: 32,
                h: 32,
                facing: 1.57,
                target: 0,
                radiansPerSecond: Math.PI / 180 * 90,
                heading: Math.PI * 1.5,
                fireRate: 0.25,
                fireSecs: 0,
                inRange: false
            },
            down: false // a pointer is down
        };
 
        state.shots = [];
        var shotCount = 10,
        i = 0;
        while (i < shotCount) {
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
        if (state.down && dist < Math.PI / 180 * 5) {
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
                shot.x += Math.cos(shot.heading) * 512 * secs;
                shot.y += Math.sin(shot.heading) * 512 * secs;
                if (utils.distance(shot.x, shot.y, turret.x, turret.y) >= 250) {
                    shot.active = false;
                }
            }
        });
 
    };
 
    return api;
 
}
    ());
```

SO that is it for my main state module for this javaScript example, but this is just to create and update an object that will sever as a model of sorts. When it comes to drawing the state of this model to a canvas element, or any kind of display for that example I am going to need to use some kind of draw method.

## 3 - The draw module

For this javaScript example I am making use of a canvas element to provide a crude yet effective view of the situation. So of course like just about any other example where I make use of a canvas element I have a draw module that will contains all the methods that I will be using to draw to a canvas element. WHen it comes to this module I have a draw method that will render a simple solid background for the canvas, draw the turret, and draw shots coming from the turret.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.turret = function (ctx, state) {
    var turret = state.turret;
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
 
draw.shots = function (ctx, state) {
    var shots = state.shots;
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

## 4 - The main.js javaScript file

I am now going to want to have a main.js file in which I can make use of all the above javaScript code and add a main app loop, along with some event handers. Often when it comes to this kind of file I might have a state machine, and a whole bunch of other things going on. However this javaScript example is fairly simple so I only need one state to work with really.

Here I create and append the canvas element that i will be using for the example, then create the state object with the sate module that I worked out above. I then have my main app loop in which I update the state of the state object, and draw some things using the draw module also in each app loop.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('canvas-app').appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
 
var state = stateMod.create({
        canvas: canvas
    });
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    stateMod.updateTurretFacing(state, secs);
    stateMod.updateShots(state, secs);
    draw.back(ctx, canvas);
    draw.turret(ctx, state);
    draw.shots(ctx, state);
    lt = now;
};
loop();
 
var pointerDown = function (e) {
    var pos = utils.getCanvasRelative(e);
    stateMod.updateTurretTarget(state, pos.x, pos.y);
    state.down = true;
};
var pointerMove = function (e) {
    var pos = utils.getCanvasRelative(e);
    stateMod.updateTurretTarget(state, pos.x, pos.y);
};
var pointerUp = function (e) {
    state.down = false;
};
 
canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);
```

When this example is up and running I have a turret that moves from its current facing direction to the heading direction if I just leave it alone. When I click on the canvas the facing direction moved to the point on the canvas that I am clicking on, and when it gets within the fire range it begins to fire shots.

## 5 - Conclusion

So it looks like I have the basic idea that I has in mind up and running just great, In fact this time around I would say that it is working better than the old buggy code that I am not replacing in my canvas example that will make use of what I worked out here today. So it should go without saying that I will apply what I have worked out here in this example in my turret defense canvas example to say the least. I also have a lot of ideas of other games that might involve this kind of system so it might pop up in some other future projects here and there as time goes by.

