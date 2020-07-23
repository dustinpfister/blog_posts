---
title: A canvas example of an object pool
date: 2020-07-20 09:40:00
tags: [canvas]
categories: canvas
layout: post
id: 683
updated: 2020-07-23 14:13:05
version: 1.18
---

This will be just a quick [canvas examples](/2020/03/23/canvas-example/) post on [object pools](https://en.wikipedia.org/wiki/Object_pool_pattern). An object pool is what I have come to call a collection of display objects when making a canvas project that calls for them. This object pool is called such because it is a fixed collection of objects that are to be used over and over again, rather that created and destroyed as needed.

So these objects will often contain properties like x and y for the current position as well as width, and height as one might expected. Depending on the nature of the canvas project they will often have additional properties like heading, pixels per second, max hit points, damage, and so forth. However than main point of this canvas example is just to show one way of how to go about creating a collection of these kinds of objects.

There is creating a collection of objects as just an empty array, and then have code that pushes new display objects into the collection, and then purge them out when some kind of condition happens that will result in that happening. However there is also creating an array of display objects once, and when doing so making the fixed pool of a certain set length. I can then have an active property of a display object that is used to set if the display object is currently being used or not. 

So then an object pool is a way of creati8ng a collection of objects where I am setting fixed amounts of display objects rather than just pushing them in and out out as needed. That way I know for sure I will never end up with some kind of run away situation in which objects keep getting added. More objects means more overhead to have everything running, and although many computers are fast, I still think it terms of less is more when having display objects in a project. So then in this post I will be going over an example that involves a fixed pool.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var Pool=(function(){var createPool=function(opt){opt=opt||{};var state={ver:'0.1.0',canvas:opt.canvas||{width:320,height:240},pool:[],spawnRate:0.1,secs:0,colors:['red','green','blue']};var i=opt.count||10;while(i--){state.pool.push({x:32,y:32,w:32,h:32,heading:0,pps:64,lifespan:3,hcps:0,alpha:0.5,fill:state.colors[i%state.colors.length],active:false});}return state;};var spawn=function(state,secs){var bx;state.secs+=secs;if(state.secs>=state.spawnRate){bx=getInactive(state.pool);if(bx){bx.active=true;bx.x=state.canvas.width/2;bx.y=state.canvas.height/2;bx.heading=Math.PI*2*Math.random();bx.pps=32+128*Math.random();bx.hcps=-90+180*Math.random();bx.lifespan=10;}state.secs%=state.spawnRate;}};update=function(state,secs){var i=state.pool.length,bx;while(i--){bx=state.pool[i];if(bx.active){bx.x+=Math.cos(bx.heading)*bx.pps*secs;bx.y+=Math.sin(bx.heading)*bx.pps*secs;bx.heading+=Math.PI/180*bx.hcps*secs;bx.lifespan-=secs;bx.lifespan=bx.lifespan<0?0:bx.lifespan;if(bx.lifespan===0){bx.hcps=0;}}checkBounds(bx,canvas);}spawn(state,secs);};var getInactive=function(pool){var p=state.player,i=pool.length,obj;while(i--){obj=pool[i];if(!obj.active){return obj;}}return false;};var checkBounds=function(bx,canvas){if(bx.x>=canvas.width||bx.x<bx.w* -1||bx.y>canvas.height||bx.y<bx.h* -1){bx.active=false;}};return{create:createPool,update:update}}());var draw={};draw.back=function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);};draw.pool=function(ctx,state){var i=state.pool.length,bx;ctx.fillStyle='white';ctx.strokeStyle='black';ctx.lineWidth=3;while(i--){bx=state.pool[i];if(bx.active){ctx.save();ctx.fillStyle=bx.fill;ctx.globalAlpha=bx.alpha;ctx.translate(bx.x,bx.y);ctx.rotate(bx.heading);ctx.beginPath();ctx.rect(bx.w/2* -1,bx.h/2* -1,bx.w,bx.h);ctx.fill();ctx.stroke();ctx.restore();}}};draw.info=function(ctx,state){ctx.font='10px couriter';ctx.fillStyle='white';ctx.fillText('v'+state.ver,5,15);};var container=document.getElementById('canvas-app'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=320;canvas.height=240;container.appendChild(canvas);var state=Pool.create({canvas:canvas,count:100});var lt=new Date();var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;requestAnimationFrame(loop);draw.back(ctx,canvas);draw.pool(ctx,state);draw.info(ctx,state);Pool.update(state,secs);lt=now;};loop();</script>

## 1 - The pool.js file

So the main event of this post is then the pool.js file that I have work out here. In this module I have just two public methods, one to create a pool, and the other to update the pool. In more complex projects I might need some additional methods when it comes to working with two or more pools of objects, and how they interact with each other, or I might be able to just work that out via arguments.

So at the top of the module I have my create pool method, that will be made public. For now I am not doing anything that involved with arguments, it just creates a pool of objects in a property of a state object that it returns. I have some additional properties outside of the pool attached to the state object that have to do with spawn rate, and how much time has passed sense the last spawn. So any additional properties outside of the pool that have to do with the pool would also be attached to this main state object for it.

I then also have a spawn method that will not really spawn new objects into the pool of course, but just activates ones that are not being used from the pool. In the event that there is no inactive object available the method will just not activate a new object as it just can not be done because of the fixed nature of the pool. A similar effect could be achieved with the alliterative to an object pool, by setting some kind of limit for spawning. In a project where I must have an additional object added eventually, I could have some kind of backlog count maybe, but that might be a matter for another post.

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

So now that I have my Pool module I will now want some additional javaScript code for drawing the state of a pool to a canvas element, and some additional javaScript that makes use of this module and the daring module. SO lets look at the rendering code that will actually draw to the canvas now.

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

## 4 - Conclusion

This post was yet another exercise of creating something that I find myself creating over and over again each time I make another canvas example. Just about any game or animation type thing will involve creating at least one if not more pools of display objects that are used for rendering enemy object sprites, power ups, or anything else to that effect.

I wanted to go in a different direction with this example, but I did not quite get around to it. I might get around to putting a little more time into this one when I get some more time though. I would like to make it so that there is more than one pool and they interact with each other.