---
title: Canvas example of exploding binary particles
date: 2020-03-18 16:21:00
tags: [canvas]
layout: post
categories: canvas
id: 630
updated: 2020-03-18 18:02:07
version: 1.9
---

I like the die hard move franchise, and in the third movie there are several scenes that involve the use of a bomb that is composed of a [binary liquid](https://en.wikipedia.org/wiki/Binary_liquid). One chemical component by itself is not dangerous at all, however if mixed with another, it becomes unstable and can very easily explode.

So the binary liquid bomb thing in die hard inspired me to make a canvas example that consists a bunch of particles moving around the canvas. Each particle is of one type or another, they can overlap if they are the same type, but if two of two different types combine they will result in another particle type that will result in an explosion.

<!-- more -->

## 1 - The utils module

So to start off I will want a utility library for this canvas example. For this example I will just want a distance formula, and a modulo function.

```js
// UTILS
var u = {};
 
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// Math mod and angle methods from
// https://github.com/infusion/Angles.js/blob/master/angles.js
u.mod = function mod(x, m) {
    return (x % m + m) % m;
};
```

## 1 - The particles module for this canvas example

I will then want a particles library that I can use to create a state object, and update a state object for this binary particles canvas example. In fact that is the two public methods that this module provides, just a create an update method. However there is of course everything else going on inside of it so lets take a look.

### 1.1 - The start of the module and a random heading helper

At the top of the module I start off with the beginnings of an IIFE that will return a public API of two methods at the end of the module. After the start of the IIFE I have a few properties for the pool size, and other defaults for particles that I use in the body of code to come. In addition I also have a single helper method that will return a random radian value between a min and max degree given as arguments. This method will come into play just a litter latter when I get into the Particle class.

```js
var paricles = (function () {
 
    var DEFAULT_POOL_SIZE = 160,
    PARTICLE_MIN_RADIUS = 8,
    PARTICLE_MAX_RADIUS = 64,
    PARTICLE_MAX_LIFE = 3000;
 
    // random reading
    var randomHeading = function (min, max) {
        min = min === undefined ? 0 : min;
        max = max === undefined ? 359 : max;
        var degree = min + Math.random() * (max - min);
        return Math.PI / 180 * degree;
    };
```

### 1.2 - The Particle Class

```js
    // Particle Class
    var Particle = function () {
        this.x = -1;
        this.y = -1;
        this.heading = 0;
        this.bits = '00'; // [0,0] inactive, [1,0] // blue, [0,1] red, [1,1] // explode
        this.pps = 32; // pixels per second
        this.life = PARTICLE_MAX_LIFE; // life left in milliseconds when in explode mode
        this.radius = PARTICLE_MIN_RADIUS;
        this.per = 1;
    };
 
    // Particle prototype methods for activating an deactivating a particle
    Particle.prototype.activate = function (side, canvas) {
        this.bits = side === 1 ? '10' : '01';
        this.x = canvas.width / 2;
        this.y = side === 1 ? 0 : canvas.height - 1;
        this.heading = side === 1 ? randomHeading(45, 135) : randomHeading(225, 315);
        this.pps = 32 + 128 * Math.random();
        this.life = PARTICLE_MAX_LIFE;
        this.radius = PARTICLE_MIN_RADIUS;
        this.per = 1;
    };
    Particle.prototype.deactivate = function () {
        this.bits = '00';
        this.x = -1;
        this.y = -1;
    };
```

### 1.3 - The create particle pool helper

```js
    // create a particle pool
    var createPool = function () {
        var len = DEFAULT_POOL_SIZE,
        i = len,
        pool = [];
        while (i--) {
            pool.push(new Particle());
        }
        return pool;
    };
```

### 1.4 - Check if a particle has hit another particle in the pool.

```js
    // check if a particle has hit another
    var partHitCheck = function (state, part) {
        var i = state.pool.length,
        compare;
        if (part.bits === '11' || part.bits === '00') {
            return;
        }
        while (i--) {
            compare = state.pool[i];
            if (part === compare || compare.bits === '11' || compare.bits === part.bits || compare.bits === '00') {
                continue;
            }
            if (u.distance(part.x, part.y, compare.x, compare.y) <= 16) {
                part.bits = '11';
                part.pps = 0;
                part.x = (part.x + compare.x) / 2;
                part.y = (part.y + compare.y) / 2;
                compare.deactivate();
                break;
            }
        }
    };
```

### 1.5 - A spawn method to activate particles in the pool

```js
    // spawn or activate particles
    var spawn = function (state, t) {
        state.lastSpawn += t;
        if (state.lastSpawn >= state.spawnRate) {
            state.lastSpawn = u.mod(state.lastSpawn, state.spawnRate);
            var i = state.pool.length;
            while (i--) {
                var part = state.pool[i];
                if (part.bits === '00') {
                    part.activate(state.nextSide, state.canvas);
                    state.nextSide = u.mod(state.nextSide + 1, 2);
                    break;
                }
            }
        }
    };
```

### 1.6 - Update the pool

```
    // update a particle pool
    var updatePool = function (state, t) {
        var secs = t / 1000,
        i = state.pool.length,
        part;
        while (i--) {
            part = state.pool[i];
            if (part.bits === '10' || part.bits === '01') {
                part.x += Math.cos(part.heading) * part.pps * secs;
                part.y += Math.sin(part.heading) * part.pps * secs;
                part.x = u.mod(part.x, state.canvas.width);
                part.y = u.mod(part.y, state.canvas.height);
                partHitCheck(state, part);
            }
            if (part.bits === '11') {
                part.per = 1 - part.life / PARTICLE_MAX_LIFE;
                var deltaRadius = (PARTICLE_MAX_RADIUS - PARTICLE_MIN_RADIUS) * part.per;
                part.radius = PARTICLE_MIN_RADIUS + deltaRadius;
                part.life -= t;
                if (part.life < 0) {
                    part.deactivate();
                }
            }
        }
    };
```

### 1.7 - The Public API

```js
    // public API
    return {
        // create a state
        create: function (opt) {
            opt = opt || {};
            state = {
                canvas: opt.canvas || null,
                ctx: opt.ctx || null,
                pool: createPool(),
                lastTime: new Date(), // last Tick
                spawnRate: 60, // num of ms per spawn event
                lastSpawn: 0, // ms sense last spawn
                nextSide: 0
            };
            return state;
        },
        // update state
        update: function (state) {
            var now = new Date(),
            t = now - state.lastTime,
            secs = t / 1000;
            // update pool, and spawn
            updatePool(state, t);
            spawn(state, t);
            // update last time
            state.lastTime = now;
        }
    }
 
}
    ());
```

## 3 - Draw module

I will want a draw module that I can use in a main javaScript file to draw the current state of  state object created with my particles module. The draw module that I worked out here has just two methods both of which act on a stat object that contains references to a canvas element and its drawing context. One method just draws the background, and the other draws the current state of the particle pool property of the state object.

```js
var draw = (function () {
    return {
        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        pool: function (state) {
            var i = state.pool.length;
            while (i--) {
                var part = state.pool[i];
                if (part.bits != '00') {
                    var color = part.bits === '01' ? 'blue' : 'red';
                    color = part.bits === '11' ? 'purple' : color;
                    ctx.globalAlpha = 0.8;
                    if (part.bits === '11') {
                        ctx.globalAlpha = 1 - part.per;
                    }
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        },
        // draw debug info
        debug: function (state) {}
    }
}
    ());
```

## 4 - Main.js

So now I have a utility module, a particles module that I can use to create and update a state, and a draw module to draw the current status of a state object. With that said it is now time to make use of it all with an index html file, and a main.js file that will tie all this together, and provide a basic app loop.

```js
// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
canvas.style.width = '100%';
canvas.style.height = '100%';
ctx.translate(0.5, 0.5);
 
var state = paricles.create({
        canvas: canvas,
        ctx: ctx
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(state);
    draw.pool(state);
    paricles.update(state);
 
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas example particles</title>
    </head>
    <body style="margin:0px;">
        <div id="gamearea"></div>
        <script src="utils.js"></script>
        <script src="particles.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```