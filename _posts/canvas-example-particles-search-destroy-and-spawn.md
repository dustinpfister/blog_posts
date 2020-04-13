---
title: Search destroy and spawn canvas example
date: 2020-04-13 15:47:00
tags: [canvas]
layout: post
categories: canvas
id: 645
updated: 2020-04-13 15:56:00
version: 1.1
---

For todays quick [canvas example](/2020/03/23/canvas-example/) post I thought I would make a simple example that is some display objects moving around a canvas. There will be just two types of display object one of which is none, and the other is a hunter. Hunters will hurt non hunter display objects, and any display object that will have zero hit points will be purged from a pool of display objects. There will also be a simple method for spawning display objects back into the pool of display objects.

So this canvas example will just be an exercise of many aspects of canvas projects.

<!-- more -->

## 1 - The utils module

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

## 2 - the particles module

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