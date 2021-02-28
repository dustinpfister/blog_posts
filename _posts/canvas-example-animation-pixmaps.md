---
title: Sprite animation Canvas example
date: 2021-01-29 16:22:00
tags: [canvas]
categories: canvas
layout: post
id: 792
updated: 2021-02-27 20:10:27
version: 1.13
---

For a new [canvas examples](/2020/03/23/canvas-example/) I think I would like to start another example expanding on what I started with my other [canvas example on animation basics](/2019/10/10/canvas-example-animation-basics/). This time I would like to build on top of this basic library that helps with animations that I just call _forFrame_ by making a solution that I can use to make sprite sheets with a little javaScript code.

The goal here is to at least start working on something that will serve as a way to include basic pixel art graphics without having to hassle with external images. The image assets can just be part of the source code build. So I will just need to work out some simple system where I have an array of pixel data for each frame, along with some additional values like a color palette and so forth. I am thinking that it would also be nice to have some kind of plug in format where all of this data is pulled into external files, and also that each file can have more than one animation, each with a different set of frames, and they can also share color palettes.

So this kind of project might prove to be a little involved, but because I am working on top of something that I have made before hand, and also because I have a fair amount of experience I was able to get the basic idea of what I wanted up and running within just a single day.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/animation-pixmaps/0.3.0/pkg.js"></script>

For the [full source code is at my canvas examples repository](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-animation-pixmaps) on github. The source of the full example is there, along with all my other canvas examples thus far.

## 1 - The format for a pixmap.js plug in

The first thing that comes to mind with this is that I want to work out a format for a file where I am calling a public method of this pixmap library and passing in an object that contains all the data for a set of animations.

```js
pixmapMod.load({
    name: 'mr_sun',
    palettes: [
        [false, 'black', 'white', 'orange', 'yellow', 'red']
    ],
    ani:{
        sun_happy: {
            paletteIndex: 0,
            w: 16,
            h: 16,
            data: [
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0, // frame 0
                0,0,0,0,0,3,3,4,4,3,3,0,0,0,0,0,
                0,0,0,3,3,4,4,4,4,4,4,3,3,0,0,0,
                0,0,3,4,4,4,4,4,4,4,4,4,4,3,0,0,
                0,0,3,4,4,4,4,4,4,4,4,4,4,3,0,0,
                0,3,4,4,4,4,4,4,4,4,4,4,4,4,3,0,
                0,3,4,4,1,1,1,4,4,1,1,1,4,4,3,0,
                3,4,4,4,2,5,2,4,4,2,5,2,4,4,4,3,
                3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
                0,3,4,4,4,4,4,1,1,4,4,4,4,4,3,0,
                0,3,4,4,4,4,4,4,4,4,4,4,4,4,3,0,
                0,0,3,4,4,1,4,4,4,4,1,4,4,3,0,0,
                0,0,3,4,4,4,1,1,1,1,4,4,4,3,0,0,
                0,0,0,3,3,4,4,4,4,4,4,3,3,0,0,0,
                0,0,0,0,0,3,3,4,4,3,3,0,0,0,0,0,
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,
 
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0, // frame 1
                0,0,0,0,0,3,3,4,4,3,3,0,0,0,0,0,
                0,0,0,3,3,4,4,4,4,4,4,3,3,0,0,0,
                0,0,3,4,4,4,4,4,4,4,4,4,4,3,0,0,
                0,0,3,4,4,4,4,4,4,4,4,4,4,3,0,0,
                0,3,4,4,4,4,4,4,4,4,4,4,4,4,3,0,
                0,3,4,4,1,1,1,4,4,1,1,1,4,4,3,0,
                3,4,4,4,2,2,5,4,4,2,2,5,4,4,4,3,
                3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,
                0,3,4,4,4,4,4,1,1,4,4,4,4,4,3,0,
                0,3,4,4,4,4,4,4,4,4,4,4,4,4,3,0,
                0,0,3,4,4,4,4,1,1,4,4,4,4,3,0,0,
                0,0,3,4,4,4,4,1,1,4,4,4,4,3,0,0,
                0,0,0,3,3,4,4,4,4,4,4,3,3,0,0,0,
                0,0,0,0,0,3,3,4,4,3,3,0,0,0,0,0,
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0
            ]
        },
        sun_mad: {
            paletteIndex: 0,
            w: 16,
            h: 16,
            data: [
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0, // frame 0
                0,0,0,0,0,3,3,5,5,3,3,0,0,0,0,0,
                0,0,0,3,3,5,5,5,5,5,5,3,3,0,0,0,
                0,0,3,5,5,5,5,5,5,5,5,5,5,3,0,0,
                0,0,3,5,5,5,5,5,5,5,5,5,5,3,0,0,
                0,3,5,5,5,5,5,5,5,5,5,5,5,5,3,0,
                0,3,5,5,1,1,1,5,5,1,1,1,5,5,3,0,
                3,5,5,5,2,5,2,5,5,2,5,2,5,5,5,3,
                3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,
                0,3,5,5,5,5,5,1,1,5,5,5,5,5,3,0,
                0,3,5,5,5,5,5,5,5,5,5,5,5,5,3,0,
                0,0,3,5,5,5,5,5,5,5,5,5,5,3,0,0,
                0,0,3,5,5,5,1,1,1,1,5,5,5,3,0,0,
                0,0,0,3,3,5,5,5,5,5,5,3,3,0,0,0,
                0,0,0,0,0,3,3,5,5,3,3,0,0,0,0,0,
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,
 
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0, // frame 0
                0,0,0,0,0,3,3,5,5,3,3,0,0,0,0,0,
                0,0,0,3,3,5,5,5,5,5,5,3,3,0,0,0,
                0,0,3,5,5,5,5,5,5,5,5,5,5,3,0,0,
                0,0,3,5,5,5,5,5,5,5,5,5,5,3,0,0,
                0,3,5,5,1,5,5,5,5,5,5,1,5,5,3,0,
                0,3,5,5,5,1,1,5,5,1,1,5,5,5,3,0,
                3,5,5,5,2,5,2,1,1,2,5,2,5,5,5,3,
                3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,
                0,3,5,5,5,5,5,1,1,5,5,5,5,5,3,0,
                0,3,5,5,5,5,5,5,5,5,5,5,5,5,3,0,
                0,0,3,5,5,5,1,1,1,1,5,5,5,3,0,0,
                0,0,3,5,5,5,5,1,1,5,5,5,5,3,0,0,
                0,0,0,3,3,5,5,5,5,5,5,3,3,0,0,0,
                0,0,0,0,0,3,3,5,5,3,3,0,0,0,0,0,
                0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0
            ]
        }
    }
});
```

## 2 - The pixmap library

Now for the source code of the pixmap module which works on top of my _forFrame_ animation library that I worked out in a previous canvas example. Here in the pixmap module I just want to have two public methods, one to load sets of animtions, and the other to create and return an array of for frame canvas objects using my _forframe_ library.

The forFrame.createCanvas method of my forframe library takes an for frame object that I create with the forFrame.create method as the first argument. This is an object that is just used to create a model for each frame up to a set number of frames. The other argument that I need to pass to my create forFrame.createCanvas method is a function that will be used to dray the module for each frame. In this pixmap module I have methods for bolth of these that I can then use for these arguments that will work for the specifc way that I want to use forFrame to create assets that I can then use to skin display objects.

```js
var pixmapMod = (function(){
    var api = {};
    var plugins = {};
    api.load = function(plug){
        var key = plug.name || 'pix_' + Object.keys(plugins).length;
        // just ref it in for now as long as that works okay
        plugins[key] = plug;
        console.log(plugins);
    };
    // create and return a forFrame ff object for pixmaps
    var createFF = function(maxFrame, w, h, pixdata, pallette){
        var size = w * h;
        return forFrame.create({
            maxFrame: maxFrame,
            width: w,
            height: h,
            forFrame: function(ff, model, frame, maxFrame, per){
                return {
                   pallette: pallette,
                   pixdata: pixdata.slice(ff.frame * size, ff.frame * size + size)
                };
            }
        });
    };
    // FF draw for pixmaps
    var ffDraw = function(ff, ctx, canvas){
        //var colors = ['black', 'white'];
        var colors = ff.model.pallette;
        ctx.imageSmoothingEnabled = false;
        ff.model.pixdata.forEach(function(colorIndex, pxIndex){
            var x = pxIndex % ff.width,
            y = Math.floor(pxIndex / ff.width);
            if(typeof colors[colorIndex] === 'string'){
                ctx.fillStyle = colors[colorIndex];
                ctx.fillRect(x, y, 1, 1);
            }
        });
    };
    // create a collection of forFrame.js canvas objects
    // based off of what is loaded into the pixmaps object 
    // with pixmapMod.load
    api.create = function(opt){
        var pixmaps = {};
        Object.keys(plugins).forEach(function(key){
            var plug = plugins[key];
            pixmaps[key] = {};
            Object.keys(plug.ani).forEach(function(aniKey){
                var ani = plug.ani[aniKey],
                frameSize = ani.w * ani.h,
                maxFrame = ani.data.length / frameSize,
                palette = plug.palettes[ani.paletteIndex],
                ff = createFF(maxFrame, ani.w, ani.h, ani.data, palette);
                pixmaps[key][aniKey] = forFrame.createCanvas(ff, ffDraw);
            });
        });
        return pixmaps;
    };
    // return the public api;
    return api;
 
}());
```

## 3 - The forFrame lib

The for frame library is an example of a library that I find myself making over and over again. Each time I do is I keep thinking about what I can add to it, or do differently. The general idea is to have a function that will create and return a model that is the state of something relative to a current frame index value, over a total number of frames. So the whole idea of this for frame library is to create something like the Array.forFrame method only more in tune with making an animation where the logic in the function is for a given frame index value.

```js
var forFrame = (function(){
 
    /********** **********
        CONSTANTS 
    *********************/
 
    var DEFAULT_MAX_FRAME = 50,
    DEFAULT_FRAME = 0,
    DEFAULT_WIDTH = 320,
    DEFAULT_HEIGHT = 240,
    FORFRAME_BUILT_IN = function(){},
    FFDRAW_BUILT_IN = function(){};
 
    /********** **********
        HELPERS
    *********************/
 
    // set frame helper
    var setFrame = function(ff, frame){
        ff.frame = frame;
        ff.frame = utils.mod(ff.frame, ff.maxFrame);
        ff.per = ff.frame / ff.maxFrame;
        ff.bias = 1 - Math.abs(0.5 - ff.per) / 0.5;
        // call beforeCall for the current type
        ff.model = {}; //FF_TYPES[ff.type].beforeCall(ff);
        var argu = [ff.model, ff.model.points, ff.per];  //FF_TYPES[ff.type].forframe_arguments(ff);
        ff.model = ff.forFrame.apply(ff, [ff].concat(argu));
        //ff.model = ff.forFrame(ff);
        return ff;
    };
 
    /********** **********
        FF object 
    *********************/
 
    // Public API
    var api = {};
    // create a plain ff object
    api.create = function(opt){
        opt = opt || {};
        var ff = {
            type: opt.type || 'plain',
            frame: opt.frame || DEFAULT_FRAME,
            width: opt.width || DEFAULT_WIDTH,
            height: opt.height || DEFAULT_HEIGHT,
            maxFrame: opt.maxFrame || DEFAULT_MAX_FRAME,
            model: {},
            per: 0,
            secs: 0
        };
        ff.forFrame = opt.forFrame || FORFRAME_BUILT_IN; 
        ff = setFrame(ff, ff.frame);
        return ff;
    };
    // STEP an ff object with a given amount of frames
    // as such STEPFRAMES needs to be a whole number
    api.step = function(ff, stepFrames){
        stepFrames = stepFrames === undefined ? 1 : stepFrames;
        stepFrames = Math.round(stepFrames);
        return setFrame(ff, ff.frame + stepFrames);
    };
   // UPDATE an ff Object
    api.update = function(ff, secs, fps){
        var frames;
        secs = secs === undefined ? 0: secs;
        fps = fps === undefined ? 30: fps;
        ff.secs += secs;
        if(ff.secs >= 1 / fps){
            frames = Math.floor(ff.secs / (1 / fps));
            api.step(ff, frames);
            ff.secs = utils.mod(ff.secs, 1 / fps);
        }
        return ff;
    };
 
    /********** **********
        CANVAS OBJECTS
    *********************/
 
    // create and return a canvas based object on the given ff
    api.createCanvas = function(ff, ffDraw, backFill, stroke, fill){
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = ff.width * ff.maxFrame;
        canvas.height = ff.height;
        ffDraw = ffDraw || FFDRAW_BUILT_IN;
        if(backFill){
            ctx.fillStyle=backFill;
            ctx.fillRect(0,0,canvas.width, canvas.height);
        }
        ff.frame = 0;
        while(ff.frame < ff.maxFrame){
            setFrame(ff, ff.frame);
            ffDraw.apply(ff, [ff, ctx, canvas, stroke, fill]);
            ctx.translate(ff.width, 0);
            ff.frame += 1;
        }
        return {
            canvas: canvas,
            ctx: ctx,
            frame: 0,
            maxFrame: ff.maxFrame,
            cellWidth: ff.width,
            cellHeight: ff.height,
            step: function(delta){
                delta = delta === undefined ? 1 : delta;
                this.frame += delta;
                this.frame = utils.mod(this.frame, this.maxFrame);
            },
            set: function(frame){
                frame = frame === undefined ? 0 : frame;
                this.frame = frame;
                this.frame = utils.mod(this.frame, this.maxFrame);
            },
            // draw the current state of this canvas object
            // to the given canvas, with the given values for position and size
            draw: function(ctx, x, y, w, h){
                ctx.drawImage(this.canvas, this.cellWidth * this.frame, 0, this.cellWidth, this.cellHeight, x, y, w, h);
            }
        };
    };
 
    // return the public api;
    return api;

}());
```

## 4 - The utility lib

Like just about all of my other canvas examples I have a general utility library. This is a collection of functions and properties, that I find myself using over and over again across canvas examples. However I add and take away things for each canvas example depending on what I need. 

Here I have my usual create canvas method that helps me to create a canvas element that is setup with all the basic little additions that I like to have, and it is a method that I keep refining a little now and then and take with me to other examples. There are a number of other methods in this copy of the utils lib, but O sometimes add things that are specific to a given example. Basically if I have a function that I am going to use across more than one module, or think that I will be doing that, or thing that I might do that I park it here.

```js
var utils = {};
 
utils.pi2 = Math.PI * 2;
 
// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// create a canvas element
utils.createCanvas = function(opt){
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
 
// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};
 
utils.bias = function(n, d){
    var per = n / d;
    return 1 - Math.abs(0.5 - per) / 0.5;
};
 
utils.log1 = function (n, d, base) {
    base = base === undefined ? 2 : base;
    var per = n / d;
    return Math.log( 1 + (per * (base - 1))) / Math.log(base);
};
```

## 5 - the object pool lib

This is another library that I started working out for my canvas example on object pools. This is just yet another library that I find myself making over again and never seem to get just right. That is why I started the canvas example on this type of library, and I keep coming back to it now and then. 

There are two general ideas when it comes to having a collection of display objects, one is to create and purge them out as needed, the other is to have a fixed stack, or pool of objects that are used over and over again. This object pool is the later rather than the former.

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
 
                // always update lifespan
                obj.lifespan -= secs;
                obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
 
                // always update position based on current obj.pps
                obj.x += Math.cos(obj.heading) * obj.pps * secs;
                obj.y += Math.sin(obj.heading) * obj.pps * secs;
 
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
    // get all objects with the gieven activeState
    api.getAllActive = function(pool, activeState){
        activeState = activeState === undefined ? true : activeState;
        return pool.objects.filter(function(object){
            return object.active === activeState;
        });
    };
    // move the given object by its current heading and pps
    api.moveByPPS = function (obj, secs) {
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
    };
    // check bounds for the given display object and canvas and return true if the object
    // is out of bounds and false if it is not.
    api.checkBounds = function (obj, canvas) {
        if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
            return false;
        }
        return true;
    };
    // bounding box
    api.boundingBox = function (a, b) {
        return utils.boundingBox(a.x, a.y, a.w, a.h, b.x, b.y, b.w, b.h);
    };
    // return public method
    return api;
}
    ());
```

## 6 - The main.js file

Now to just make use off all of this in a simple little demo project with a single main.js file. I just use the create canvas method of my utils library to create a single canvas element for this example. I then create a crude yet effective main state object in which I am creating an instance of my pixmaps object. I am then also creating an object pool to which I am going to skin the objects with using my new pixmaps library.

```js
var LIFESPAN = 7;
 
// state object
var canvasObj = utils.createCanvas({
    width: 320,
    height: 240
});
var state = {
    ver: '0.4.0',
    pixmaps: pixmapMod.create(),
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    framesPerSec: 20,
    secs: 1
};
 
state.maxDist = state.canvas.width * 0.75;
 
state.boxes = poolMod.create({
    count: 30,
    w: 64,
    h: 64,
    spawn: function(obj, pool, state, opt){
        var radian = utils.pi2 * Math.random();
        obj.x = state.canvas.width / 2 + Math.cos(radian) * state.maxDist - obj.w / 2;
        obj.y = state.canvas.height / 2 + Math.sin(radian) * state.maxDist - obj.h / 2;
        obj.heading = radian + Math.PI;
        obj.pps = 64;
        obj.pixmapKey = 'mr_sun';
        obj.aniKey = ['sun_happy', 'sun_mad'][Math.floor(Math.random() * 2)];
        obj.frameIndex = 0;
        obj.ani = state.pixmaps[obj.pixmapKey][obj.aniKey];
        obj.secs = 0;
        obj.lifespan = 1;
        obj.alpha = 1;
    },
    update: function(obj, pool, state, secs){
        obj.secs += secs;
        obj.lifespan = 1;
        if(obj.secs >= 0.25){
            obj.frameIndex += 1;
            obj.frameIndex %= obj.ani.maxFrame;
            obj.secs %= 0.25
        }
        var dist = utils.distance(obj.x + obj.w / 2, obj.y + obj.h / 2, state.canvas.width / 2, state.canvas.height / 2);
        obj.alpha = (1 - dist / state.maxDist).toFixed(2);
        if(dist >= state.maxDist){
           obj.lifespan = 0;
        }
    }
});
 
// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    state.secs += secs;
    state.secs = state.secs > 0.5 ? 0.5 : state.secs;
    if(state.secs >= 1 / state.framesPerSec){
        // draw
        draw.background(state.ctx, state.canvas);
        state.boxes.objects.forEach(function(box){
            if(box.active){
                box.ani.set(box.frameIndex);
                state.ctx.globalAlpha = box.alpha;
                box.ani.draw(state.ctx, box.x, box.y, box.w, box.h);
            }
        });
        state.ctx.globalAlpha = 1;
        draw.ver(state.ctx, state.canvas, state);
        // update
        poolMod.spawn(state.boxes, state, {});
        poolMod.update(state.boxes, state.secs, state);
        state.secs = 0;
    }
    state.lt = now;
};
 
loop();
```

## 7 - Conclusion

So then this pixmap library that works on top of my _forframe_ library seems to work well thus far as a way to create pixel graphics for another canvas example. I think I might use this in one or two other canvas examples as a way to create some animations that are things other than simple shapes.
