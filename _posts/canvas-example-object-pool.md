---
title: Canvas examples on animation basics and beyond
date: 2020-07-20 09:40:00
tags: [canvas]
categories: canvas
layout: post
id: 683
updated: 2020-07-21 09:47:34
version: 1.12
---

This will be just a quick [canvas examples](/2020/03/23/canvas-example/) post on object pools. An object pool is what I have come to call a collection of display object when making a canvas project that calls for them. So these objects will often contain properties like x and y for the current position as well as width, and height as one might expected. Depending on the nature of the canvas project they will often have additional properties like heading, pixels per second, max hit points, damage, and so forth. However than main point of this canvas example is just to show one way of how to go about creating a collection of these kinds of objects.

There is creating a collection pool as just an empty array, and then have code that pushes new display objects into the pool, and purge them out as needed. However there is also creating an array of display objects once of a certain set length, and then have an active property of the display object that is used to set if the display object is currently being used or not. This way I am setting fixed amounts of display objects rather than just pushing them in and out out as needed.So then in this post I will be going over an example that involves a fixed pool.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var Pool=(function(){var createPool=function(opt){opt=opt||{};var state={ver:'0.1.0',canvas:opt.canvas||{width:320,height:240},pool:[],spawnRate:0.1,secs:0,colors:['red','green','blue']};var i=opt.count||10;while(i--){state.pool.push({x:32,y:32,w:32,h:32,heading:0,pps:64,lifespan:3,hcps:0,alpha:0.5,fill:state.colors[i%state.colors.length],active:false});}return state;};var spawn=function(state,secs){var bx;state.secs+=secs;if(state.secs>=state.spawnRate){bx=getInactive(state.pool);if(bx){bx.active=true;bx.x=state.canvas.width/2;bx.y=state.canvas.height/2;bx.heading=Math.PI*2*Math.random();bx.pps=32+128*Math.random();bx.hcps=-90+180*Math.random();bx.lifespan=10;}state.secs%=state.spawnRate;}};update=function(state,secs){var i=state.pool.length,bx;while(i--){bx=state.pool[i];if(bx.active){bx.x+=Math.cos(bx.heading)*bx.pps*secs;bx.y+=Math.sin(bx.heading)*bx.pps*secs;bx.heading+=Math.PI/180*bx.hcps*secs;bx.lifespan-=secs;bx.lifespan=bx.lifespan<0?0:bx.lifespan;if(bx.lifespan===0){bx.hcps=0;}}checkBounds(bx,canvas);}spawn(state,secs);};var getInactive=function(pool){var p=state.player,i=pool.length,obj;while(i--){obj=pool[i];if(!obj.active){return obj;}}return false;};var checkBounds=function(bx,canvas){if(bx.x>=canvas.width||bx.x<bx.w* -1||bx.y>canvas.height||bx.y<bx.h* -1){bx.active=false;}};return{create:createPool,update:update}}());var draw={};draw.back=function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);};draw.pool=function(ctx,state){var i=state.pool.length,bx;ctx.fillStyle='white';ctx.strokeStyle='black';ctx.lineWidth=3;while(i--){bx=state.pool[i];if(bx.active){ctx.save();ctx.fillStyle=bx.fill;ctx.globalAlpha=bx.alpha;ctx.translate(bx.x,bx.y);ctx.rotate(bx.heading);ctx.beginPath();ctx.rect(bx.w/2* -1,bx.h/2* -1,bx.w,bx.h);ctx.fill();ctx.stroke();ctx.restore();}}};draw.info=function(ctx,state){ctx.font='10px couriter';ctx.fillStyle='white';ctx.fillText('v'+state.ver,5,15);};var container=document.getElementById('canvas-app'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=320;canvas.height=240;container.appendChild(canvas);var state=Pool.create({canvas:canvas,count:100});var lt=new Date();var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);draw.back(ctx,canvas);draw.pool(ctx,state);draw.info(ctx,state);Pool.update(state,secs);lt=now;};loop();</script>

## 1 - The pool.js file

So the main event of this post is then the pool.js file that I have work out here. In this module I have just two public methods, one to create a pool, and the other to update the pool. In more complex projects I might need some additional methods when it comes to working with two or more pools of objects, and how they interact with each other, or I might be able to just work that out via arguments.

So at the top of the module I have my create pool method, that will be made public. For now I am not doing anything that involved with arguments, it just creates a pool of objects in a property of a state object that it returns. I have some additional properties outside of the pool attached to the state object that have to do with spawn rate, and how much time has passed sense the last spawn. So any additional properties outside of the pool that have to do with the pool would also be attached to this main state object for it.

I then also have a spawn method...

```js
var Pool = (function () {
 
    // create a pool
    var createPool = function (opt) {
        opt = opt || {};
        var state = {
            ver: '0.1.0',
            canvas: opt.canvas || {
                width: 320,
                height: 240
            },
            pool: [],
            spawnRate: 0.1,
            secs: 0,
            colors: ['red', 'green', 'blue']
        };
        var i = opt.count || 10;
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
                bx.x = state.canvas.width / 2;
                bx.y = state.canvas.height / 2;
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

## 2 - The draw.js module

So this is very much a canvas example, so there is of course the draw.js module for this example. This time around I wanted to make things simple, so there is mainly just one method to draw a background, and another to just darw the state of the pool.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.pool = function (ctx, state) {
    var i = state.pool.length,
    bx;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    while (i--) {
        bx = state.pool[i];
        if (bx.active) {
            ctx.save();
            ctx.fillStyle = bx.fill;
            ctx.globalAlpha = bx.alpha;
            ctx.translate(bx.x, bx.y);
            ctx.rotate(bx.heading);
            ctx.beginPath();
            ctx.rect(bx.w / 2 * -1, bx.h / 2 * -1, bx.w, bx.h);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
};
 
draw.info = function (ctx, state) {
    ctx.font = '10px couriter';
    ctx.fillStyle = 'white';
    ctx.fillText('v' + state.ver, 5, 15);
};
```

## 3 - Main.js

So now just for a main.js file to make use of the pool.js and draw.js modules. Here I create and inject a canvas element into a container element. I then also pass the canvas element to the create method of my Pool.js module when creating a pool for the canvas area, while I am at it I also set a count for the size of the pool.

In here I also have my main app loop where I am updating the stat of the pool, by calling the update method of the Pool module and pass the state object I want to update along with a value that is the number of seconds that has passed sense the last update. I am also of course using mu draw methods to render the current state of the pool.

```js
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);
 
// create a state with pool
var state = Pool.create({
        canvas: canvas,
        count: 100
    });
 
// LOOP
var lt = new Date();
var loop = function () {
 
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
 
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.pool(ctx, state);
    draw.info(ctx, state);
    Pool.update(state, secs);
 
    lt = now;
 
};
loop();
```

```html
<html>
    <head>
        <title>canvas example object pool</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="pool.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```