---
title: Cannon shoot canvas example
date: 2020-02-17 15:26:00
tags: [canvas]
layout: post
categories: canvas
id: 614
updated: 2020-02-18 10:35:56
version: 1.11
---

The will be a post on a cannon shoot [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) type game. There are many games like this on the open Internet such as [kitten cannon](https://www.youtube.com/watch?v=BtXSxeVDYD4) where the basic mechanics are than the player sets an angle and initial power value and then that is used to determine how far the object will go in a game map.

<!-- more -->


## 1 - The Utils module of this canvas example

To start off with in this section I will be going over the custom utility library that I worked out for this canvas example. This module contains a custom tailor set of copy and past usual suspects for these kinds of projects. Considering the nature of the project, I am going to want methods like the distance formula and some methods that have to do with angles. I also want some additional methods that I will be using in the game module, but also potential outside of it as well if I where to continue working on this example.

### 1.1 - The start of the module, and the get canvas relative method.

I went with just an object literal pattern rather than an IIFE for the utils module. This will more or less work out okay with this module as all of the methods here are public.

The first method I added to my utils module is a method that is a usual copy and past suspect that has to do with getting a canvas relative position when a canvas is clicked or touched. This is of course something that I am going to want to do one way or another when to comes to any kind of canvas project that works with input from a user in  the from of mouse or touch events.

```js
// UTILS
var utils = {};
 
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};
```

### 1.2 - Bounding box collision detection

This project is going to involve at least maybe one or two areas in the canvas that will act as a fire button of sorts. I could just use the distance formula if it is a circle like area, but I desired to make bounding box part of the utility library so I will use that for the fire button at least if not elsewhere.

```js
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
```

### 1.3 - The Distance formal

I added the distance formula as part of the module. This is what I will be using to just find the distance between two points. This can be used with a little additional code to set the initial power of the cannon and therefor the shot by comparing the distance from a certain point to a certain max length.

```js
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.4 - Mathematical modulo and angle methods

I also have a few methods that have to do with [mathematical modulo](/2017/09/02/js-whats-wrong-with-modulo/) and working with angles. The modulo method is just another way of getting a remainder that compared to what is used in the core javaScript syntax. The other methods here have to do with normalizing angles and angular distance that are from a project called [angles.js](https://github.com/infusion/Angles.js/blob/master/angles.js).

```js
// Math mod and angle methods from
// https://github.com/infusion/Angles.js/blob/master/angles.js
utils.mod = function mod(x, m) {
    return (x % m + m) % m;
};
 
utils.angleNormalizeHalf = function (n) {
    var c = Math.PI * 2;
    var h = c / 2;
    return utils.mod(n + h, c) - h;
};
 
utils.angleMinDistance = function (a, b) {
    var m = Math.PI * 2;
    var h = m / 2;
    var diff = utils.angleNormalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};
```

## 2 - The Game module for this cannon shoot canvas example


### 2.1 - The start of the module and create new state method

```js
// GAME
var game = (function () {
 
    var createNewState = function (opt) {
        var state = {
            canvas: canvas,
            ctx: ctx = canvas.getContext('2d'),
            mode: 'aim', // 'aim', 'fired, and 'over' modes
            userDown: false,
            lastTick: new Date(),
            time: 0,
            offset: {
                x: 0,
                y: 0
            },
            shot: {
                x: 0,
                y: 0,
                pps: 64, // pixels per second
                power: 1,
                plps: 1 / 10, // power loss per second
                startHeading: 0,
                heading: 0
            },
            cannon: {
                heading: 0,
                power: 1,
                sx: 0,
                sy: 0,
                len: 100
            }
        };
        setCannon(state, -1, 1);
        return state;
    };
```

### 2.2 - Set cannon and set shot method.

```js
    var setCannon = function (state, heading, power) {
        var cannon = state.cannon;
        cannon.heading = heading;
        cannon.power = power;
        cannon.sx = Math.cos(cannon.heading) * cannon.len,
        cannon.sy = Math.sin(cannon.heading) * cannon.len + state.canvas.height;
    };
 
    // set the shot heading and pps based on power and startHeading
    var setShot = function (shot) {
        shot.heading = shot.startHeading + shot.angleDistanceToGround * (1 - shot.power);
        shot.pps = 128 + Math.floor(256 * shot.power);
    };
```

### 2.3 - Fire shot method

```js
    // fire the shot
    var fireShot = function (state) {
        var sh = state.shot,
        canvas = state.canvas,
        ca = state.cannon;
 
        sh.startHeading = ca.heading;
        sh.angleDistanceToGround = utils.angleMinDistance(sh.startHeading, Math.PI / 2);
        sh.x = canvas.width / 2,
        sh.y = canvas.height / 2,
        state.offset.x = ca.sx;
        state.offset.y = ca.sy;
        sh.power = ca.power;
        setShot(sh);
        state.lastTick = new Date();
        state.mode = 'fired';
    };
```

### 2.4 -  Events attachment and user action methods for each mode that uses one

```js
    // Events
    var eventTypeMaps = {
        mousedown: 'start',
        mousemove: 'move',
        mouseup: 'end',
        touchstart: 'start',
        touchmove: 'move',
        touchend: 'end'
    };
    var userAction = function (state) {
        return function (e) {
            var pos = utils.getCanvasRelative(e),
            myType = eventTypeMaps[e.type];
            if (myType === 'start') {
                state.userDown = true;
            }
            if (myType === 'end') {
                state.userDown = false;
            }
            var userActionMode = userAction[state.mode] || {},
            modeAction = userActionMode[myType];
            if (modeAction) {
                modeAction(pos, state, e);
            }
        };
    };
 
    userAction.aim = {
        start: function (pos, state, e) {},
        move: function (pos, state, e) {
            var cannon = state.cannon,
            canvas = state.canvas;
            if (state.userDown) {
                var d = utils.distance(pos.x, pos.y, 0, canvas.height);
                var power = d / cannon.len;
                power = power > 1 ? 1 : power;
                setCannon(state,
                    Math.atan2(canvas.height - pos.y, pos.x) * -1,
                    0.75 + 0.25 * power);
            }
        },
        end: function (pos, state, e) {
            var cannon = state.cannon;
            var overFire = utils.boundingBox(pos.x, pos.y, 1, 1, canvas.width - 64, canvas.height - 64, 64, 64);
            if (overFire) {
                fireShot(state);
            }
        }
    };
 
    userAction.over = {
        end: function (pos, state, e) {
            setCannon(state, -1, 1);
            state.offset.x = 0;
            state.offset.y = 0;
            state.mode = 'aim';
        }
    };
```

### 2.5 - The main update method, mode update methods, and the public API.

```js
    var update = function (state) {
        var now = new Date();
        state.time = now - state.lastTick;
        state.lastTick = now;
        var modeUpdate = update[state.mode] || false;
        if (modeUpdate) {
            modeUpdate(state);
        }
    };
 
    update.fired = function (state) {
        var secs = state.time / 1000,
        canvas = state.canvas;
        state.offset.x += Math.cos(state.shot.heading) * state.shot.pps * secs;
        state.offset.y += Math.sin(state.shot.heading) * state.shot.pps * secs;
 
        if (state.offset.y > canvas.height) {
            state.offset.y = canvas.height;
            state.mode = 'over';
        } else {
            state.shot.power -= state.shot.plps * secs;
            state.shot.power = state.shot.power < 0.025 ? 0 : state.shot.power;
        }
        setShot(state.shot);
    };
 
    return {
        update: update,
        createNewState: createNewState,
        userAction: userAction
    }
 
}
    ());
```

## 3 - Draw

```js
var draw = (function () {
 
    // draw Cell Lines
    var drawCellLines = function (ctx, opt) {
        opt = opt || {};
        var ci = 0,
        w = opt.w || 8,
        h = opt.h || 8,
        cellSize = opt.cellSize || 32,
        cLen = w * h;
        offset = opt.offset || {};
        offset.x = offset.x === undefined ? 0 : offset.x;
        offset.y = offset.y === undefined ? 0 : offset.y;
        ctx.strokeStyle = opt.style || 'lime';
        while (ci < cLen) {
            var x = ci % w,
            y = Math.floor(ci / w);
            ctx.strokeRect(
                x * cellSize + offset.x,
                y * cellSize + offset.y,
                cellSize, cellSize);
            ci += 1;
        }
    };
 
    var drawShot = function (state) {
        var ctx = state.ctx;
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        ctx.arc(state.shot.x, state.shot.y, 5, 0, Math.PI * 2);
        ctx.stroke();
    }
 
    var modes = {
        aim: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas,
            cannon = state.cannon;
            // crude cannon line
            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(cannon.sx, cannon.sy);
            ctx.stroke();
            // fire button
            ctx.fillStyle = 'red';
            ctx.fillRect(canvas.width - 64, canvas.height - 64, 64, 64);
            ctx.fillStyle = 'black';
            ctx.font = '20px arial';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('FIRE!', canvas.width - 32, canvas.height - 32);
        },
        fired: function (state) {
            drawShot(state);
        },
        over: function () {
            drawShot(state);
        }
    };
 
    return {
 
        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        // draw by way of the current mode
        currentMode: function (state) {
            modes[state.mode](state);
        },
 
        // draw grid lines
        gridLines: function (state) {
            var ctx = state.ctx;
            var xPer = state.offset.x % 32 / 32,
            yPer = state.offset.y % 32 / 32;
            drawCellLines(ctx, {
                w: 12,
                h: 10,
                style: 'grey',
                offset: {
                    x: -32 * xPer - 32,
                    y: -32 * yPer - 32
                }
            });
        },
 
        // draw debug info
        debug: function (state) {
            var ctx = state.ctx;
            ctx.fillStyle = 'white';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('mode: ' + state.mode, 10, 10);
            ctx.fillText('map offset:  ' + Math.floor(state.offset.x) + ',' +
                Math.floor(state.offset.y), 10, 20);
            ctx.fillText('cannon power: ' + state.cannon.power, 10, 30);
        },
 
        // draw ground
        ground: function (state) {
            var canvas = state.canvas,
            yAjust = 0;
            if (state.offset.y > -5) {
                ctx.fillStyle = 'green';
                yAjust = state.offset.y > 0 ? state.offset.y / canvas.height : 0;
                ctx.fillRect(0, canvas.height - 5 - (canvas.height / 2) * yAjust, canvas.width, 150);
            }
        }
 
    }
 
}
    ());
```

## 4 - Main

```js
// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var state = game.createNewState({
        canvas: canvas
    });
 
// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    game.update(state);
    draw.background(state);
    draw.gridLines(state);
    draw.ground(state);
    draw.currentMode(state);
    draw.debug(state);
};
loop();
canvas.addEventListener('mousedown', game.userAction(state));
canvas.addEventListener('mousemove', game.userAction(state));
canvas.addEventListener('mouseup', game.userAction(state));
canvas.addEventListener('touchstart', game.userAction(state));
canvas.addEventListener('touchmove', game.userAction(state));
canvas.addEventListener('touchend', game.userAction(state));
```