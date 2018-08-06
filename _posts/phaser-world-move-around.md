---
title: Moving around in the phaser world
date: 2018-08-05 20:42:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 250
updated: 2018-08-06 16:18:12
version: 1.1
---

In phaser the world is where all game display objects are. It is a 2d, well, world in which these display objects can move around by way of player input, or some kind of ai script. In this post I will be writing about some examples in which I am just creating one or more display objects, and then moving around in this world. There are some basic thiongs one should know about such as how to have the camera follow a sprite, which is often desirable for most projects. So this should be a fun post.

<!-- more -->



## 2 - An example of having a sprite move around in a phaser world.

### 2.1 - My sheet from canvas method

In this demo I am using my sheet from canvas method. This is a quick little method I worked out for making a sprite sheet with a canvas element. I get into this method, and subject in greater detail in my post on this subject. It's not that involved so I will copy and post the source code here.

```js
var sheetFromCanvas = function (opt) {
 
    var f,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
 
    opt = opt || {};
    opt.name = opt.name || '';
    opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.forFrame = opt.forFrame || function () {};
    opt.game = opt.game || null;
 
    canvas.width = opt.frameWidth * opt.frames;
    canvas.height = opt.frameHeight;
 
    f = 0;
    while (f < opt.frames) {
        per = f / opt.frames;
        opt.forFrame.call({
            f: f,
            sx: opt.frameWidth * f + 0.5,
            per: per,
            canvas: canvas,
            ctx: ctx
        }, ctx);
        f += 1;
    }
 
    // add a new sheet to cache if we have a game
    if (opt.game) {
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
    }
 
    // return the canvas
    return canvas;
 
};
```

This allows for me to make both static sprites, and animations with just the canvas 2d context. If you prefer to use an external sheet you will want to look into my post on using the [sprite loader](/2017/10/12/phaser-spritesheets/).
