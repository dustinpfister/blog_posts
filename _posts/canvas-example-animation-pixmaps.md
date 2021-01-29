---
title: Sprite animation Canvas example
date: 2021-01-29 16:22:00
tags: [canvas]
categories: canvas
layout: post
id: 792
updated: 2021-01-29 16:33:19
version: 1.1
---

For a new canvas example I think I would like to start another example expanding on what I started with my other canvas example on animation basics. This time I would like to build on top of this basic library that helps with animations that I just call for frame by making a solution that I can use to make sprite sheets with a little javaScript code.

<!-- more -->


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

Now for the source code of the pixmap module.

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

