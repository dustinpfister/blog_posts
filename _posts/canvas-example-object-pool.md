---
title: Canvas examples on animation basics and beyond
date: 2020-07-20 09:40:00
tags: [canvas]
categories: canvas
layout: post
id: 683
updated: 2020-07-20 18:53:04
version: 1.4
---

This will be just a quick [canvas examples](/2020/03/23/canvas-example/) post on object pools. An object pool is what I have come to call a collection of display object when making a canvas project that calls for them. So these objects will often contain properties like x and y for the current position as well as width, and height as one might expected. Depending on the nature of the canvas project they will often have additional properties like heading, pixels per second, max hit points, damage, and so forth. However than main point of this canvas example is just to show one way of how to go about creating a collection of these kinds of objects.

There is creating a collection pool as just an empty array, and then have code that pushes new display objects into the pool, and purge them out as needed. However there is also creating an array of display objects once of a certain set length, and then have an active property of the display object that is used to set if the display object is currently being used or not. This way I am setting fixed amounts of display objects rather than just pushing them in and out out as needed.So then in this post I will be going over an example that involves a fixed pool.

<!-- more -->

## 1 - The pool.jd file

So the main event of this post is then the pool.js file that I have work out here. In this module I have juts two methods that I have made public, one to create a pool, and the other to update the pool.

```js
var Pool = (function () {
 
    // create a pool
    var createPool = function () {
        var state = {
            ver: '0.1.0',
            pool: [],
            spawnRate: 0.1,
            secs: 0,
            colors: ['red', 'green', 'blue']
        };
        var i = 50;
        while (i--) {
            state.pool.push({
                x: 32,
                y: 32,
                w: 32,
                h: 32,
                heading: 0,
                pps: 64,
                lifespan: 3,
                hcps: 0, // heading change per second in degrees
                alpha: 0.5,
                fill: state.colors[i % state.colors.length],
                active: false
            });
        }
        return state;
    };
 
    var spawn = function (state, secs) {
        var bx;
        state.secs += secs;
        if (state.secs >= state.spawnRate) {
            bx = getInactive(state.pool);
            if (bx) {
                bx.active = true;
                bx.x = canvas.width / 2;
                bx.y = canvas.height / 2;
                bx.heading = Math.PI * 2 * Math.random();
                bx.pps = 32 + 128 * Math.random();
                bx.hcps = -90 + 180 * Math.random();
                bx.lifespan = 10;
            }
            state.secs %= state.spawnRate;
        }
    };
 
    update = function (state, secs) {
        var i = state.pool.length,
        bx;
        while (i--) {
            bx = state.pool[i];
            if (bx.active) {
                // move
                bx.x += Math.cos(bx.heading) * bx.pps * secs;
                bx.y += Math.sin(bx.heading) * bx.pps * secs;
                bx.heading += Math.PI / 180 * bx.hcps * secs;
                bx.lifespan -= secs;
                bx.lifespan = bx.lifespan < 0 ? 0 : bx.lifespan;
                if (bx.lifespan === 0) {
                    bx.hcps = 0;
                }
            }
            // set inactive if out of bounds
            checkBounds(bx, canvas);
        }
        // spawn
        spawn(state, secs);
    };
 
    // get an inactive object or return false
    var getInactive = function (pool) {
        var p = state.player,
        i = pool.length,
        obj;
        while (i--) {
            obj = pool[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
 
    // check bounds with the given object and set it inactive if it is out
    var checkBounds = function (bx, canvas) {
        if (bx.x >= canvas.width || bx.x < bx.w * -1 || bx.y > canvas.height || bx.y < bx.h * -1) {
            bx.active = false;
        }
    };
 
    // public
    return {
        create: createPool,
        update: update
    }
 
}
    ());
```