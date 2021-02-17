---
title: Canvas example of exploding binary particles
date: 2020-03-18 16:21:00
tags: [canvas]
layout: post
categories: canvas
id: 630
updated: 2021-02-17 12:04:19
version: 1.25
---

I like the Die Hard move franchise, and in the third movie there are several scenes that involve the use of a bomb that is composed of a [binary liquid](https://en.wikipedia.org/wiki/Binary_liquid). One chemical component by itself is not dangerous at all, however if mixed with another, it becomes unstable and can very easily explode.

So the binary liquid bomb thing in Die Hard inspired me to make a [canvas example](/2020/03/23/canvas-example/) that consists of a bunch of particles moving around the canvas. Each particle is of one type or another, they can overlap if they are the same type, but if two of two different types combine they will result in another particle type that will result in an explosion.

This canvas example will then be yet another example of several canvas examples now that have to do with what is often called a particle. The term particle seems to be a generic term for a single display object of a collection of such display objects that move around the canvas. There are many other terms that might come up for this kind of object though such a sprite, or display object.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/particles-binary/0.1.0/pkg.js"></script>

## 1 - The utils module for this binary particles canvas example

So to start off I will want a utility library for this canvas example. For this example I will just want a distance formula, and a mathematical modulo function. As of version 0.1.0 of this example I now also added my standard create canvas method that I am starting to use in all of my canvas examples as usual. The idea here is that this library is a custom cut utility library for this example alone, there might be some functions that I use across all examples, but even then I might make some example specific changes to the function.

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
// create a canvas element
u.createCanvas = function(opt){
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
```

The distance formula as the name suggests is for just finding the distance between two points. The modulo method is just another way to go about getting the remainder of two numbers that works a little differentially from that of the built in javaScript modulo method. I wrote a [post on this mathematical modulo method](/2017/09/02/js-whats-wrong-with-modulo/) as it seems to be called a while back if you want to read up more on it, and why you might want to use if with certain projects.

## 1 - The particles module for this canvas example

I will then want a particles library that I can use to create a state object, and update a state object for this binary particles canvas example. In fact that is the two public methods that this module provides, just a create an update method. However there is of course everything else going on inside of it so lets take a look.

### 1.1 - The start of the module and a random heading helper

At the top of the module I start off with the beginnings of an IIFE that will return a public API of two methods at the end of the module. After the start of the IIFE I have a few properties for the pool size, and other defaults for particles that I use in the body of code to come. In addition I also have a single helper method that will return a random radian value between a min and max degree given as arguments. This method will come into play just a litter latter when I get into the Particle class.

```js
var paricles = (function () {
 
    var DEFAULT_POOL_SIZE = 100,
    PARTICLE_MIN_RADIUS = 6,
    PARTICLE_MAX_RADIUS = 64,
    PARTICLE_MAX_LIFE = 3000,
 
    PARTICLE_UPDATE_METHODS = {
        // no nothing (go by initial values only for heading, and pps)
        noop: function(part, pool, secs){
        },
        // use whatever the part.degreesPerSecond value is to change heading
        fixed_heading_change: function(part, state, secs){
            part.degreesPerSecond = u.mod(part.degreesPerSecond + 90, 180) - 90;
            part.heading += Math.PI / 180 * part.degreesPerSecond * secs;
        },
        // 
        DPS_change: function(part, state, secs){
            var roll = Math.random();
            var dir = roll < 0.5 ? -1 : 1;
            part.degreesPerSecond += 360 * secs * dir;
            this.fixed_heading_change(part, state, secs)
        }
    };
 
    // random reading
    var randomHeading = function (min, max) {
        min = min === undefined ? 0 : min;
        max = max === undefined ? 359 : max;
        var degree = min + Math.random() * (max - min);
        return Math.PI / 180 * degree;
    };
```

### 1.2 - The Particle Class

I have decided to work of a Class for each particle object in the pool object of the state object. There are just two prototype methods for this class that are used to activate an inactive particle, and another to set it back to that state.

Each Particle object has an x and y property that is the current location of the particle in the canvas matrix. There is a heading value that is of course the direction that the particle is heading in radians, as well as a pixels per second value that is the number of pixels that the particle will move in the span of a second.

The life, radius, and per values are used for when a particle enters a state in which it exists as a combination of both types of particles. When this is the case its position will be set to an average between the two points that have resulted in it entering this state, and it will begin to loose life, as the life value decrees the radius will increases, resulting in an explosion like effect.

```js
    // Particle Class
    var Particle = function () {
        this.x = -1;
        this.y = -1;
        this.degreesPerSecond = -90 + 180 * Math.random();
        this.updateKey = 'DPS_change'; // the method to use in PARTICLE_UPDATE_METHODS
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

So there are four states that a particle can be in a '00' or inactive state, a '10' and '01' state there are the two different particle types, and then a '11' or explosion state.

### 1.3 - The create particle pool helper

There is a simple function that is just used to create the particle pool when making the state object in the public API later on in the module.

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

There are two general ideas that come to mind when making a pool of objects like this. One is to create a fixed set of objects of a certain size, and then just have a way to set them active and inactive. The other way is to have a pool that can just be an empty array, or maxed out at a certain max size, and then have some way to spawn and purge objects to and from the pool. For this canvas example at least I have decided to go with the former rather than the latter.

### 1.4 - Check if a particle has hit another particle in the pool.

This method is used to loop over all particles in the particle pool to see if a given particle has hit another one or not.

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

Spawn an inactive particle into an active state.

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

I will want a method that will update the pool of particles that will be called in the main public update method of this module. In here I just loop over all of the instances of the Particle class and check the bits string of the instance. There is then just two general things to do depending on the value of the bits string, one is to call an particle update method and move the particle of it is a red or blue type particle. The other thing to do is expand the radius and reduce the lifespan of the particle if it is an explode type.

```js
    // update a particle pool
    var updatePool = function (state, t) {
        var secs = t / 1000,
        i = state.pool.length,
        part;
        while (i--) {
            part = state.pool[i];
            if (part.bits === '10' || part.bits === '01') {
                if(PARTICLE_UPDATE_METHODS[part.updateKey]){
                    PARTICLE_UPDATE_METHODS[part.updateKey].call(PARTICLE_UPDATE_METHODS, part, state, secs);
                }
                // move by current heading, pps
                part.x += Math.cos(part.heading) * part.pps * secs;
                part.y += Math.sin(part.heading) * part.pps * secs;
                // apply bounds
                part.x = u.mod(part.x, state.canvas.width);
                part.y = u.mod(part.y, state.canvas.height);
                // check if the part hit a type it combines with
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

Here now is the pubic API that consists of my create, and update methods that I will be using outside of the module in the main.js file. The create method will not just create an instance of the Particle class, but will create a state object that contains many useful properties including but not limited to a pool of particle class instances.

```js
    // public API
    return {
        // create a state
        create: function (opt) {
            opt = opt || {};
            state = {
                ver: opt.ver || '',
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

I will want a draw module that I can use in a main javaScript file to draw the current state of  state object created with my particles module. The draw module that I worked out here has two main methods both of which act on a state object that contains references to a canvas element, and its drawing context. One method just draws the background, and the other draws the current state of the particle pool property of the state object.

```js
var draw = (function () {
 
    var gradient;
 
    return {
 
        setGradient: function (state) {
            var canvas = state.canvas;
            gradient = state.ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#9f0000');
            gradient.addColorStop(1, '#00009f');
        },
 
        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = gradient || 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        pool: function (state) {
 
            var i = state.pool.length;
            ctx.strokeStyle = 'white';
            while (i--) {
                var part = state.pool[i];
                if (part.bits != '00') {
                    var color = part.bits === '01' ? 'blue' : 'red';
                    color = part.bits === '11' ? '#bf00bf' : color;
                    ctx.globalAlpha = 0.8;
                    if (part.bits === '11') {
                        ctx.globalAlpha = 1 - part.per;
                    }
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
 
        },
 
        // draw debug info
        debug: function (state) {},
 
        ver: function(state){
            var ctx = state.ctx;
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.font = '8px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('v' + state.ver, 3, state.canvas.height - 13);
        }
 
    }
 
}
    ());
```

I put in just one more method that is used to set up a gradient for the background. I went a little overboard with this one, and I just wanted something other than my usual solid black background.

## 4 - Main.js

So now I have a utility module, a particles module that I can use to create and update a state, and a draw module to draw the current status of a state object. With that said it is now time to make use of it all with an index html file, and a main.js file that will tie all this together, and provide a basic app loop.

```js
// MAIN
var canvasObj = u.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
var state = paricles.create({
        ver: '0.1.0',
        canvas: canvas,
        ctx: ctx
    });
draw.setGradient(state);
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(state);
    draw.pool(state);
    draw.ver(state);
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
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/particles.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 5 - Conclusion

This canvas example when up and running results in a bunch of particles moving around all over the canvas, when one hits another of a different type it explodes. I have to admit that looking at it is very satisfying, but there is so much more that I could add when it comes to moving forward from here. I do come around and put a little more time into an example now and then when I get to it, and there is maybe more that I could do when it comes to the movement of the particles.

This canvas example might not be the best example of an object pool though, I now have [another example where I made an attempt at a standard object pool library](/2020/07/20/canvas-example-object-pool/) of sorts that I now copy and past over to new examples now and then. Where it comes to making or using a canvas library an object pool, particles class, or something to that effect should be a standard feature of such a framework. However when it comes to doing everything from the ground up I am free to design such things anyway I like, which can be nice in some ways, but also proves to be time consuming.