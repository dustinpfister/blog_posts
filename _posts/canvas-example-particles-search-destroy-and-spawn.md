---
title: Search destroy and spawn canvas example
date: 2020-04-13 15:47:00
tags: [canvas]
layout: post
categories: canvas
id: 645
updated: 2021-03-09 16:18:57
version: 1.19
---

For todays [canvas example](/2020/03/23/canvas-example/) post I thought I would make a simple example that is some display objects moving around a canvas some of which are destroyed by others, and they just keep spawning back. There will be just two types of display objects one of which is none, and the other is a hunter type. Hunters will hurt non hunter display objects, and any display object that will have zero hit points will be purged from the pool of display objects. There will also be a simple method for spawning display objects back into the pool of display objects or in other words a spawn method of sorts.

So this canvas example will just be an exercise of many aspects of canvas projects that has to do with just spawning, and purging display objects from a pool. This is a task that comes up in one form or another for all kinds of game projects. In addition it is also a basic exercise of creating a primitive AI when it comes to how the hunters, and also how non hunters behave. For now i will be keeping that stupid simple, however that is yet another part of this project that I intend to make a focal point of sorts if I keep working on it.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/percent-math-log/0.0.1/pkg.js"></script>

## 1 - The utils module

For this canvas example I will want a utils module that will contain some methods that I might not want to have in my parti8cles module as well as maybe other modules for this canvas example. This utility module contains a distance formula, along with a method for clamping values and other helpful methods.

```js
// UTILS
var u = {};
 
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// clamp the given object to the given world
u.clamp = function (obj, world) {
    if (obj.x < 0) {
        obj.x = 0;
    }
    if (obj.y < 0) {
        obj.y = 0;
    }
    if (obj.x >= world.width) {
        obj.x = world.width - 1;
    }
    if (obj.y >= world.height) {
        obj.y = world.height - 1;
    }
};
 
// percent to radian
u.perToRadian = function (per) {
    return Math.PI * 2 * per;
};
```

Just about all of my canvas examples have this kind of module that serves as a kind of project centered utility library of sorts.

## 2 - the particles module

I then have a particles module that will be used to create a simple state object that contains a pool of particle objects. Each particle object in the state objects particle pool is an instance of the Particle class that I have contained in the module. So there is a Particle Class, helper methods for creating and updating a collection of Particle class instances, and a few public methods that are used outside of the module.

### 2.1 - The start of the particles module, and the Particle Class

The module follows the [IIFE module pattern](/2020/02/04/js-iife/) and returns a public API to a global called particles. At the top of the module I have one variable that is used as a way to hard code a set count of particles for the pool of particles. After that I have the Particle constructor followed by a few prototype methods.

With many of these canvas examples I might choose to take a more functional approach to the creation of these kinds of objects. However for this example I just wanted to move forward quickly and get this done in about an hour or so. With that said I just went with a constructor and moved on, it is not like it would be that hard to change things over to a more functional form anyway.

The prototype methods are used to move a given Particle Object, and attack another Particle Object if it is of the hunter type.

```js
var paricles = (function () {
 
    var PARTICLE_COUNT = 10;
 
    // Particle Class
    var Particle = function (opt) {
        opt = opt || {};
        this.x = opt.x || 0;
        this.y = opt.y || 0;
        this.radius = opt.radius || 10;
        this.heading = opt.heading || 0;
        this.pps = opt.pps || 16; // pixels per second
        this.type = opt.type || 'none';
        this.hpMax = opt.hpMax || 100;
        this.hp = this.hpMax;
        this.radiusAttack = 50;
        this.dps = 50;
    };
    // attack and move prototype methods
    Particle.prototype.move = function (secs) {
        this.x += Math.cos(this.heading) * this.pps * secs;
        this.y += Math.sin(this.heading) * this.pps * secs;
    };
    Particle.prototype.attack = function (part, secs) {
        if (this.type === 'hunter' && part.type != 'hunter') {
            if (u.distance(this.x, this.y, part.x, part.y) <= this.radiusAttack) {
                part.hp -= this.dps * secs;
                part.hp = part.hp < 0 ? 0 : part.hp;
            }
        }
    };
```

### 2.2 - The create Pool helper

Here I have a helper method that is called in the public create method that I will be getting to later when going over the public API. The method is used to just simply create the pool of particles for the first time. 

In the particles constructor the default type is none which for now is the type set for all particles accept for one that will be my hunter type.

```js
    // create a pool of particles
    var createPool = function (state) {
        var i = 0,
        canvas = state.canvas;
        state.pool = [];
        while (i < PARTICLE_COUNT) {
            state.pool.push(new Particle({
                    x: canvas.width * Math.random(),
                    y: canvas.height * Math.random(),
                    heading: Math.PI * 2 * Math.random()
                }));
            i += 1;
        }
        state.pool[0].type = 'hunter';
        state.pool[0].pps = 32;
    };
```

### 2.3 - Move all Particles in a pool, and Attack for hunters.

I pulled the logic for moving all Particles in a pool into a method, and also did the same when it comes to attacking other Particles in rage for hunters.

```js
    // move all parts
    var poolMove = function (state, secs) {
        var i = state.pool.length,
        canvas = state.canvas,
        part;
        while (i--) {
            part = state.pool[i];
            part.move(secs);
            u.clamp(part, state.canvas);
            if (part.x === 0 || part.y === 0 || part.x === canvas.width - 1 || part.y === canvas.height - 1) {
                part.heading = u.perToRadian(Math.random());
            }
        }
    };
 
    // hunters attack!
    var poolAttack = function (state, secs) {
        var hi = state.pool.length,
        hunter,
        i,
        part;
        while (hi--) {
            hunter = state.pool[hi];
            if (hunter.type === 'hunter') {
                i = state.pool.length;
                while (i--) {
                    part = state.pool[i];
                    hunter.attack(part, secs);
                }
            }
        }
    };
```

### 2.4 - Purge dead Particles, and span new ones

I will also ant methods for purging out dead Particles that have a hit point value of zero, and spawn in new ones.

```js
    // purge dead particles
    var poolPurge = function (state) {
        var i = state.pool.length,
        part;
        while (i--) {
            part = state.pool[i];
            if (part.hp <= 0) {
                state.pool.splice(i, 1);
            }
        }
    };
 
    // spawn new particles
    var poolSpawn = function (state) {
        if (state.pool.length < PARTICLE_COUNT) {
            state.pool.push(new Particle({
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    heading: Math.PI * 2 * Math.random()
                }));
        }
    };
```

### 2.5 - The public API

The public API of the Particles module consists of tow methods one to create a state object, and another to update it.

```js
    // public API
    return {
        create: function (opt) {
            var state = {
                canvas: opt.canvas,
                ctx: opt.ctx,
                lt: new Date(),
                pool: []
            };
            createPool(state);
            return state;
        },
        update: function (state) {
            var now = new Date(),
            t = now - state.lt,
            secs = t / 1000;
            poolMove(state, secs);
            poolAttack(state, secs);
            poolPurge(state);
            poolSpawn(state);
            state.lt = now;
        }
    }
 
}
    ());
```

## 3 - The draw module

I then have a draw module for drawing the current state of a particles state object to the canvas. when it comes to drawing a particle I broke the several parts of drawing a particle into several draw methods for drawing the base of the particle from other methods that draw other parts of a particle. Many of these are internal methods that are used by the public method that is returned by the module that is used to draw the full pool of the state object that I give it. 

```js
var draw = (function () {
 
    var drawPartBase = function (part) {
        ctx.fillStyle = part.type === 'hunter' ? 'red' : 'blue';
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };
 
    var drawPartHeading = function (part) {
        var x = Math.cos(part.heading) * part.radius * 2 + part.x,
        y = Math.sin(part.heading) * part.radius * 2 + part.y;
        ctx.beginPath();
        ctx.moveTo(part.x, part.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    };
 
    var drawPartHealth = function (part) {
        var x = part.x - part.radius,
        y = part.y + part.radius + 3,
        w = part.radius * 2,
        h = part.radius / 2,
        per = part.hp / part.hpMax;
        ctx.fillStyle = 'rgba(128,128,128,1)';
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.beginPath();
        ctx.rect(x, y, w * per, h);
        ctx.fill();
    };
 
    var drawPartAttackRange = function (part) {
        if (part.type === 'hunter') {
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.beginPath();
            ctx.arc(part.x, part.y, part.radiusAttack, 0, Math.PI * 2);
            ctx.fill();
        }
    };
 
    return {
 
        // draw background
        back: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        pool: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas,
            pool = state.pool,
            len = pool.length,
            part,
            i = 0;
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'white';
            while (i < len) {
                part = pool[i];
                drawPartBase(part);
                drawPartHeading(part);
                drawPartHealth(part);
                drawPartAttackRange(part);
                i += 1;
            }
        }
 
    }
 
}
    ());
```

## 4 - Main.js and index.html

Now for a main.js file and some html to pull this all together. In my html file I have a gamearea div, and I link to my utils module, the particles module, the draw module, and some additional javaScript in a main,js file.

```html
<html>
    <head>
        <title>canvas example particles search destroy and spawn</title>
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

In the main.js file I create and inject the canvas element into the game area div, and get a reference to the drawing context also.

```js
// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var state = paricles.create({
        canvas: canvas,
        ctx: ctx
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.pool(state);
    paricles.update(state);
 
};
 
loop();
```

I use the create method of my particles module to create a state object that I can then pass to by draw module methods and the update method of the particles module in the body of the main app loop.

When this is all up and running I have a bunch of particles moving around the screen and a single hunter type particle destroying the other types. In addition new particles keep spawning also as expected.

## 5 - Conclusion

I wanted to make at least one canvas example that is something like this. That is some kind of project where there is one or more display objects that attack other display objects, and then more display objects just keep spawning back into the canvas. the idea here is to just have something that is the beginnings of a project that is just an interesting simulation of sorts. I might come back to this one at some point to make things a little more advanced but there are a lot of other canvas examples that I would like to dump more time into also.

In any case maybe this canvas example can serve as a good example of a basic mechanic that poops up in a whole lot of canvas projects in the open Internet. How many games are there that involve display objects moving around and getting attacked by other display objects when they come in range?