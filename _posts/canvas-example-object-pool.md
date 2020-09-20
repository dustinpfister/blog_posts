---
title: A canvas example of an object pool
date: 2020-07-20 09:40:00
tags: [canvas]
categories: canvas
layout: post
id: 683
updated: 2020-09-20 16:10:50
version: 1.20
---

This will be just a quick [canvas examples](/2020/03/23/canvas-example/) post on [object pools](https://en.wikipedia.org/wiki/Object_pool_pattern). An object pool is what I have come to call a collection of display objects when making a canvas project that calls for them. This object pool is called such because it is a fixed collection of objects that are to be used over and over again, rather that created and destroyed as needed.

So these objects will often contain properties like x and y for the current position as well as width, and height as one might expected. Depending on the nature of the canvas project they will often have additional properties like heading, pixels per second, max hit points, damage, and so forth. However than main point of this canvas example is just to show one way of how to go about creating a collection of these kinds of objects.

There is creating a collection of objects as just an empty array, and then have code that pushes new display objects into the collection, and then purge them out when some kind of condition happens that will result in that happening. However there is also creating an array of display objects once, and when doing so making the fixed pool of a certain set length. I can then have an active property of a display object that is used to set if the display object is currently being used or not. 

So then an object pool is a way of creati8ng a collection of objects where I am setting fixed amounts of display objects rather than just pushing them in and out out as needed. That way I know for sure I will never end up with some kind of run away situation in which objects keep getting added. More objects means more overhead to have everything running, and although many computers are fast, I still think it terms of less is more when having display objects in a project. So then in this post I will be going over an example that involves a fixed pool.

<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var poolMod=(function(){var api={};var getInactive=function(pool){var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];if(!obj.active){return obj;}} return false;};api.create=function(opt){opt=opt||{};opt.count=opt.count||10;var i=0,pool={objects:[],data:opt.data||{},spawn:opt.spawn||function(obj,pool,state,opt){},purge:opt.purge||function(obj,pool,state){},update:opt.update||function(obj,pool,state,secs){}};while(i<opt.count){pool.objects.push({active:false,i:i,x:opt.x===undefined?0:opt.x,y:opt.y===undefined?0:opt.y,w:opt.w===undefined?32:opt.w,h:opt.h===undefined?32:opt.h,heading:opt.heading===undefined?0:opt.heading,pps:opt.pps===undefined?32:opt.pps,lifespan:opt.lifespan||3,data:{}});i+=1;} return pool;};api.spawn=function(pool,state,opt){var obj=getInactive(pool);state=state||{};opt=opt||{};if(obj){if(!obj.active){obj.active=true;pool.spawn.call(pool,obj,pool,state,opt);return obj;}} return false;};api.update=function(pool,secs,state){var i=pool.objects.length,obj;state=state||{};while(i--){obj=pool.objects[i];if(obj.active){pool.update.call(pool,obj,pool,state,secs);obj.lifespan-=secs;obj.lifespan=obj.lifespan<0?0:obj.lifespan;if(obj.lifespan===0){obj.active=false;pool.purge.call(pool,obj,pool,state);}}}};api.setActiveStateForAll=function(pool,bool){bool=bool===undefined?false:bool;var i=pool.objects.length,obj;while(i--){obj=pool.objects[i];obj.active=bool;}};api.moveByPPS=function(obj,secs){obj.x+=Math.cos(obj.heading)*obj.pps*secs;obj.y+=Math.sin(obj.heading)*obj.pps*secs;};return api;} ());var draw={};draw.back=function(ctx,canvas){ctx.fillStyle='black';ctx.fillRect(0,0,canvas.width,canvas.height);};draw.pool=function(ctx,pool){var i=pool.objects.length,obj;ctx.fillStyle='white';ctx.strokeStyle='black';ctx.lineWidth=3;while(i--){obj=pool.objects[i];if(obj.active){ctx.save();ctx.fillStyle=obj.data.fill||'white';ctx.globalAlpha=obj.data.alpha||1;ctx.translate(obj.x,obj.y);ctx.beginPath();ctx.rect(obj.w/2* -1,obj.h/2* -1,obj.w,obj.h);ctx.fill();ctx.stroke();ctx.restore();if(obj.data.hp){var per=obj.data.hp.current/obj.data.hp.max;ctx.fillStyle='lime';ctx.fillRect(obj.x-16,obj.y,32*per,4);}}}};draw.ver=function(ctx,state){ctx.font='10px couriter';ctx.fillStyle='white';ctx.fillText('v'+state.ver,5,15);};var container=document.getElementById('canvas-app'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=320;canvas.height=240;container.appendChild(canvas);var boundingBox=function(x1,y1,w1,h1,x2,y2,w2,h2){return!((y1+h1)<y2||y1>(y2+h2)||(x1+w1)<x2||x1>(x2+w2));};var state={ver:'0.3.0',canvas:canvas,secs:0,spawnRate:0.1,shots:poolMod.create({count:100,pps:32,w:8,h:8,spawn:function(obj,pool,state,opt){obj.x=opt.x;obj.y=opt.y;obj.heading=opt.heading;obj.lifespan=3;obj.data.shooter=opt.shooter;obj.data.damage=opt.damage;},update:function(obj,pool,state,secs){poolMod.moveByPPS(obj,secs);state.boxes.objects.forEach(function(bx){if(bx!=obj.data.shooter&&bx.active){if(boundingBox(bx.x,bx.y,bx.w,bx.h,obj.x,obj.y,obj.w,obj.h)){bx.data.hp.current-=obj.data.damage;bx.data.hp.current=bx.data.hp.current<0?0:bx.data.hp.current;if(bx.data.hp.current===0){bx.lifespan=0;} obj.lifespan=0;}}})}}),boxes:poolMod.create({count:10,data:{colors:['red','green','blue']},spawn:function(obj,pool,state,opt){obj.x=state.canvas.width*Math.random();obj.y=state.canvas.height*Math.random();obj.heading=Math.PI*2*Math.random();obj.pps=32+128*Math.random();var dir=Math.random()<0.5?-1:1;obj.hcps=(90+90*Math.random())*dir;obj.lifespan=300;obj.data.fill=pool.data.colors[obj.i%pool.data.colors.length];obj.data.weapon={secs:0,shotRate:1,damage:1};obj.data.hp={current:10,max:10};},update:function(obj,pool,state,secs){if(obj.active){poolMod.moveByPPS(obj,secs);obj.heading+=Math.PI/180*obj.hcps*secs;var w=obj.data.weapon;w.secs+=secs;if(w.secs>=w.shotRate){poolMod.spawn(state.shots,state,{x:obj.x,y:obj.y,heading:obj.heading,shooter:obj,damage:w.damage});w.secs%=w.shotRate;}}}})};var lt=new Date(),maxSecs=0.1;var loop=function(){var now=new Date(),t=now-lt,secs=t/1000;secs=secs>maxSecs?maxSecs:secs;requestAnimationFrame(loop);draw.back(ctx,canvas);draw.pool(ctx,state.boxes);draw.pool(ctx,state.shots);draw.ver(ctx,state);poolMod.update(state.boxes,secs,state);poolMod.update(state.shots,secs,state);state.secs+=secs;if(state.secs>=state.spawnRate){poolMod.spawn(state.boxes,state);state.secs%=state.spawnRate;} lt=now;};loop();</script>

## 1 - The pool.js file

So the main event of this post is then the pool.js file that I have work out here. In this module I have just two public methods, one to create a pool, and the other to update the pool. In more complex projects I might need some additional methods when it comes to working with two or more pools of objects, and how they interact with each other, or I might be able to just work that out via arguments.

So at the top of the module I have my create pool method, that will be made public. For now I am not doing anything that involved with arguments, it just creates a pool of objects in a property of a state object that it returns. I have some additional properties outside of the pool attached to the state object that have to do with spawn rate, and how much time has passed sense the last spawn. So any additional properties outside of the pool that have to do with the pool would also be attached to this main state object for it.

I then also have a spawn method that will not really spawn new objects into the pool of course, but just activates ones that are not being used from the pool. In the event that there is no inactive object available the method will just not activate a new object as it just can not be done because of the fixed nature of the pool. A similar effect could be achieved with the alliterative to an object pool, by setting some kind of limit for spawning. In a project where I must have an additional object added eventually, I could have some kind of backlog count maybe, but that might be a matter for another post.

```js
var poolMod = (function () {
    // Public API
    var api = {};
    // get next inactive object in the given pool
    var getInactive = function (pool) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        var i = 0,
        pool = {
            objects: [],
            data: opt.data || {},
            spawn: opt.spawn || function (obj, pool, state, opt) {},
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {}
        };
        while (i < opt.count) {
            pool.objects.push({
                active: false,
                i: i,
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                w: opt.w === undefined ? 32 : opt.w,
                h: opt.h === undefined ? 32 : opt.h,
                heading: opt.heading === undefined ? 0 : opt.heading,
                pps: opt.pps === undefined ? 32 : opt.pps,
                lifespan: opt.lifespan || 3,
                data: {}
            });
            i += 1;
        }
        return pool;
    };
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || {};
        opt = opt || {};
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
                return obj;
            }
        }
        return false;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update.call(pool, obj, pool, state, secs);
                obj.lifespan -= secs;
                obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                if (obj.lifespan === 0) {
                    obj.active = false;
                    pool.purge.call(pool, obj, pool, state);
                }
            }
        }
    };
    // set all to inActive or active state
    api.setActiveStateForAll = function (pool, bool) {
        bool = bool === undefined ? false : bool;
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            obj.active = bool;
        }
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // return public method
    return api;
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
 
draw.pool = function (ctx, pool) {
    var i = pool.objects.length,
    obj;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    while (i--) {
        obj = pool.objects[i];
        if (obj.active) {
            ctx.save();
            ctx.fillStyle = obj.data.fill || 'white';
            ctx.globalAlpha = obj.data.alpha || 1;
            ctx.translate(obj.x, obj.y);
            //ctx.rotate(obj.heading);
            ctx.beginPath();
            ctx.rect(obj.w / 2 * -1, obj.h / 2 * -1, obj.w, obj.h);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
            if (obj.data.hp) {
                var per = obj.data.hp.current / obj.data.hp.max;
                ctx.fillStyle = 'lime';
                ctx.fillRect(obj.x - 16, obj.y, 32 * per, 4);
                //ctx.fillText(obj.data.hp.current, obj.x, obj.y);
            }
        }
    }
};
 
draw.ver = function (ctx, state) {
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
 
/*
var checkBounds = function (obj, canvas) {
if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
obj.active = false;
}
};
 */
 
var boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
 
// create a state with pool
var state = {
    ver: '0.4.0',
    canvas: canvas,
    secs: 0,
    spawnRate: 0.1,
    // shot pool
    shots: poolMod.create({
        count: 100,
        pps: 32,
        w: 8,
        h: 8,
        spawn: function (obj, pool, state, opt) {
            obj.x = opt.x;
            obj.y = opt.y;
            obj.heading = opt.heading;
            obj.lifespan = 3;
            obj.data.shooter = opt.shooter;
            obj.data.damage = opt.damage;
        },
        update: function (obj, pool, state, secs) {
            poolMod.moveByPPS(obj, secs);
            state.boxes.objects.forEach(function (bx) {
                // if not shooter box
                if (bx != obj.data.shooter && bx.active) {
                    if (boundingBox(bx.x, bx.y, bx.w, bx.h, obj.x, obj.y, obj.w, obj.h)) {
                        bx.data.hp.current -= obj.data.damage;
                        bx.data.hp.current = bx.data.hp.current < 0 ? 0 : bx.data.hp.current;
                        if (bx.data.hp.current === 0) {
                            bx.lifespan = 0;
                        }
                        obj.lifespan = 0;
                    }
                }
            })
        }
    }),
    // box pool
    boxes: poolMod.create({
        count: 10,
        data: {
            colors: ['red', 'green', 'blue']
        },
        spawn: function (obj, pool, state, opt) {
 
            //obj.x = state.canvas.width / 2;
            //obj.y = state.canvas.height / 2;
            obj.x = state.canvas.width * Math.random();
            obj.y = state.canvas.height * Math.random();
            obj.heading = Math.PI * 2 * Math.random();
 
            //obj.x = state.canvas.width / 2;
            //obj.y = state.canvas.height + 200;
            //obj.heading = Math.PI * 1.5;
 
            obj.pps = 32 + 128 * Math.random();
            var dir = Math.random() < 0.5 ? -1 : 1;
            obj.hcps = (90 + 90 * Math.random()) * dir; //-180; //-10 + 40 * Math.random();
            obj.lifespan = 300;
            // data
            obj.data.fill = pool.data.colors[obj.i % pool.data.colors.length];
            obj.data.weapon = {
                secs: 0,
                shotRate: 1,
                damage: 1
            };
            obj.data.hp = {
                current: 10,
                max: 10
            };
        },
        update: function (obj, pool, state, secs) {
            if (obj.active) {
                // move
                poolMod.moveByPPS(obj, secs);
                obj.heading += Math.PI / 180 * obj.hcps * secs;
                // shoot
                var w = obj.data.weapon;
                w.secs += secs;
                if (w.secs >= w.shotRate) {
                    poolMod.spawn(state.shots, state, {
                        x: obj.x,
                        y: obj.y,
                        heading: obj.heading,
                        shooter: obj,
                        damage: w.damage
                    });
                    w.secs %= w.shotRate;
                }
            }
        }
    })
};
 
// LOOP
var lt = new Date(),
maxSecs = 0.1;
var loop = function () {
 
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    secs = secs > maxSecs ? maxSecs : secs;
 
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
 
    draw.pool(ctx, state.boxes);
    draw.pool(ctx, state.shots);
 
    draw.ver(ctx, state);
    poolMod.update(state.boxes, secs, state);
    poolMod.update(state.shots, secs, state);
 
    state.secs += secs;
    if (state.secs >= state.spawnRate) {
        poolMod.spawn(state.boxes, state);
        state.secs %= state.spawnRate;
    }
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