---
title: Search destroy and spawn canvas example
date: 2020-04-13 15:47:00
tags: [canvas]
layout: post
categories: canvas
id: 645
updated: 2021-03-09 16:46:16
version: 1.25
---

For todays [canvas example](/2020/03/23/canvas-example/) post I thought I would make a simple example that is some display objects moving around a canvas, some of which are destroyed by others, and they just keep spawning back. There will be just two types of display objects one of which is none, and the other is a hunter type that will attack other display objects. 

So then these Hunters will hurt non hunter display objects, and any display object that will have zero hit points will be purged from the pool of display objects. There will also be a simple method for spawning display objects back into the pool of display objects or in other words a spawn method of sorts.

So this canvas example will just be an exercise of many aspects of canvas projects that has to do with just spawning, and purging display objects from a pool. This is a task that comes up in one form or another for all kinds of game projects, as well as simple animation or digital art type projects such as this one. In addition it is also a basic exercise of creating a primitive AI when it comes to how the hunters, and also how non hunters behave. When it comes to AI that is something that I do not have as much experience as I would like, so working out example such as this now and then is just what needs to happen in order to address that. Anyway for now I will be keeping the AI, if I can call it that, stupid simple, however that is yet another part of this project that I intend to make a focal point of sorts if I keep working on it.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/percent-math-log/0.0.1/pkg.js"></script>

## 1 - The utils module

For this canvas example I will want a utils module that will contain some methods that I might not want to have in my particles module as well as maybe other modules for this canvas example. This utility module contains a distance formula, along with a method for clamping values and other helpful methods that come into play with various tasks.

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

// create a canvas
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
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
```

Just about all of my canvas examples have this kind of module that serves as a kind of project centered utility library of sorts. The create canvas method is one methods that has become a kind of standard for all of my canvas examples now, I do not use a framework for these examples, and I would like to keep it that way for this collection of posts at least. However for now using the create canvas method is just about the only thing that I kind myself using over and over agian for all canvas examples, even then I might still make slight changes to it.

## 2 - The particles module

I then have a particles module that will be used to create a simple state object that contains a pool of particle objects. Each particle object in the state objects particle pool is an instance of the Particle class that I have contained in the module. So there is a Particle Class, helper methods for creating and updating a collection of Particle class instances, and a few public methods that are used outside of the module.

I have made lots of modules like this, so many that I made a canvas example where I focus on this subject along that has to do with just making a single [object pool library](/2020/07/20/canvas-example-object-pool/). In that example I am creating a system where I have just a single fixed collection of objects that I set active or not, rather than creating and purging out objects as needed like I am doing in this module.

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

### 2.4 - Purge dead Particles, and spawn new ones

I will also want methods for purging out dead Particles that have a hit point value of zero, and also while I am at it have a method that will spawn in new ones. When it comes to the purge method I make use of a trick that involves looping backward over the pool, and then using the splice method to mutate the array in place. There are of course a wide range of other ways that I could go about making this kind of method such as using the Array filter method for example, however I had to just go with one or the other and move on.

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

The public API of the Particles module consists of two methods one to create a state object, and another to update it. These are the only methods that I will be using outside of this module in my main.js file that will make use of this module along with my other modules that I worked out for this example.

```js
    // public API
    return {
        create: function (opt) {
            var state = {
                ver: opt.ver || '',
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
        },
 
        ver: function(ctx, canvas, state){
            ctx.fillStyle = 'gray';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('v' + state.ver, 5, canvas.height - 15);
        }
 
    };
 
}
    ());
```

## 4 - Main.js and index.html

Now for a main.js file and some html to pull this all together. In my html file I have a gamearea div, and I link to my utils module, the particles module, the draw module, and some additional javaScript in a main,js file.

```html
<html>
    <head>
        <title>canvas example percent math log</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="utils.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

In the main.js file I create and inject the canvas element into the game area div, and get a reference to the drawing context also.

```js
// MAIN
var canvasObj = u.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
 
var state = paricles.create({
        ver: '0.0.1',
        canvas: canvas,
        ctx: ctx
    });
 
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.pool(state);
    draw.ver(state.ctx, state.canvas, state);
    paricles.update(state);
 
};
 
loop();

```

I use the create method of my particles module to create a state object that I can then pass to by draw module methods and the update method of the particles module in the body of the main app loop.

When this is all up and running I have a bunch of particles moving around the screen and a single hunter type particle destroying the other types. In addition new particles keep spawning also as expected.

## 5 - Conclusion

I wanted to make at least one canvas example that is something like this. That is some kind of project where there is one or more display objects that attack other display objects, and then more display objects just keep spawning back into the canvas. the idea here is to just have something that is the beginnings of a project that is just an interesting simulation of sorts. I might come back to this one at some point to make things a little more advanced but there are a lot of other canvas examples that I would like to dump more time into also.

In any case maybe this canvas example can serve as a good example of a basic mechanic that poops up in a whole lot of canvas projects in the open Internet. How many games are there that involve display objects moving around and getting attacked by other display objects when they come in range?