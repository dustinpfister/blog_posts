---
title: Sprite animation Canvas example
date: 2021-01-29 16:22:00
tags: [canvas]
categories: canvas
layout: post
id: 792
updated: 2021-01-29 16:54:35
version: 1.5
---

For a new [canvas examples](/2020/03/23/canvas-example/) I think I would like to start another example expanding on what I started with my other [canvas example on animation basics](/2019/10/10/canvas-example-animation-basics/). This time I would like to build on top of this basic library that helps with animations that I just call _forFrame_ by making a solution that I can use to make sprite sheets with a little javaScript code.

The goal here is to at least start working on something that will serve as a way to include basic pixel art graphics without having to hassle with external images. The image assets can just be part of the source code build. So I will just ned to work out some simple system where I have an array of pixel data for each frame, along with some additional values like a color pallette and so forth. I am thinking that it would also be nice to have some kind of plugin format where all of this data is pulled into external files, and also that each file can have more than one animation, each with a different set of frames, and they can also share color pallettes.

So this kind of project might prove to be a little involved, but becuase I am working on top of something that I have made before hand, and also becuase I have a fair amount of experence I was able to get the basic idea of what I wanted up and running within just a single day.

<!-- more -->

For the [full source code is at my canvas examples reposatory](https://github.com/dustinpfister/canvas-examples/tree/master/forpost/canvas-example-animation-pixmaps) on github. The source of the full example is there, along with all my other canvas examples thus far.

## 1 - The format for a pixmap.js plugin

The first thing that comes to mind with this is that I want to work out a format for a file where I am calling a public method of this pixmap library and passing in an object that contains all the data for a set of animations.

```js
pixmapMod.load({
    name: 'box_basics',  // animation set name
    palettes: [
        [false, 'black', 'lime', 'green'],
        ['lime', 'black', 'white', 'gray']
    ],
    ani:{ // the collection of animations
        box1: {  // the first animation called 'box1'
            paletteIndex: 0,
            w: 8,
            h: 8,
            data: [
                1,1,1,1,1,1,1,1, // frame 0
                1,2,2,2,2,2,2,1,
                1,2,3,3,3,3,3,1,
                1,2,3,3,3,3,3,1,
                1,2,3,3,3,3,3,1,
                1,2,3,3,3,3,3,1,
                1,2,3,3,3,3,3,1,
                1,1,1,1,1,1,1,1,

                0,0,0,0,0,0,0,0, // frame 1
                0,1,1,1,1,1,1,0,
                0,1,2,2,2,2,1,0,
                0,1,2,3,3,3,1,0,
                0,1,2,3,3,3,1,0,
                0,1,2,3,3,3,1,0,
                0,1,1,1,1,1,1,0,
                0,0,0,0,0,0,0,0,

                0,0,0,0,0,0,0,0, // frame 2
                0,0,0,0,0,0,0,0,
                0,0,1,1,1,1,0,0,
                0,0,1,2,2,1,0,0,
                0,0,1,2,3,1,0,0,
                0,0,1,1,1,1,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
            ]
        },
        box2: {  // the first animation called 'box1'
            paletteIndex: 1,
            w: 8,
            h: 8,
            data: [
                3,0,0,0,0,0,0,3, // frame 0
                0,0,0,0,0,0,0,0,
                0,0,2,0,0,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,0,2,0,0,0,
                0,0,0,0,0,0,0,0,
                3,0,0,0,0,0,0,3,

                3,0,0,0,0,0,0,3, // frame 1
                0,0,0,0,0,0,0,0,
                0,0,1,1,0,0,0,0,
                0,0,1,1,2,0,0,0,
                0,0,0,2,1,1,0,0,
                0,0,0,0,1,1,0,0,
                0,0,0,0,0,0,0,0,
                3,0,0,0,0,0,0,3,

                0,0,0,0,0,0,0,0, // frame 2
                0,0,0,0,0,0,0,0,
                1,1,1,0,0,0,0,0,
                1,1,1,0,0,0,2,0,
                2,0,0,0,0,0,0,0,
                0,0,2,0,0,0,1,1,
                0,0,0,0,0,0,1,1,
                0,0,0,0,0,0,0,0
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

## 3 - Conclusion

So then this pixmap library that works on top of my _forframe_ library seems to work well thus far as a way to create pixel graphics for another canvas example. I think I might use this in one or two other canvas exmaples as a way to create some animations that are things other than simple shapes.
