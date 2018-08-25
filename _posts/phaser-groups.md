---
title: Getting started with Groups of Sprites in phaser
date: 2018-08-24 20:08:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 269
updated: 2018-08-25 11:36:47
version: 1.1
---

So in many games you end up with one or more collections or groups of sprites. In this case there is a need for all kinds of methods that help with managing that group of display objects. In todays post I will be writing about grops in [Phaser ce](https://photonstorm.github.io/phaser-ce/). There are many methods, and properties with groups, so this will be just a simple getting started post on groups for now.

<!-- more -->

## 1 - What to know before continuing

## 3 - An example involving blocks

### 3.1 - Sheet from canvas method


```js
// sheet from canvas helper
var sheetFromCanvas = function (opt) {
 
    var f,
    fd, // frame data
    sx,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
 
    opt = opt || {};
    opt.name = opt.name || 'sheet';
    opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.forFrame = opt.forFrame || function () {};
    opt.game = opt.game || {};
 
    canvas.width = opt.frameWidth * opt.frames;
    canvas.height = opt.frameHeight;
 
    // to store frame data
    opt.game.global = opt.game.global || {};
    opt.game.global.frameData = opt.game.frameData || {};
 
    fd = opt.game.global.frameData[opt.name] = [];
 
    f = 0;
    // for each frame
    while (f < opt.frames) {
 
        // find current percent
        per = f / opt.frames;
        sx = opt.frameWidth * f + 0.5;
 
        // push frame index to frame data
        fd.push(f);
 
        // call forFrame with api set to the value
        // of 'this' inside the forFrame function
        ctx.save();
        ctx.translate(sx, 0);
        opt.forFrame.call({
            f: f,
            p: Math.PI,
            p2: Math.PI * 2,
            hw: opt.frameWidth / 2,
            hh: opt.frameHeight / 2,
            sx: sx,
            per: per,
            canvas: canvas,
            ctx: ctx
        }, ctx);
        ctx.restore();
 
        // next frame
        f += 1;
 
    }
 
    // add a new sheet to cache if we have a game
    if (opt.game) {
 
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
 
    }
 
    //document.body.appendChild(canvas);
 
    // return the canvas
    return canvas;
 
};
```

### 3.2 - The SpriteDat Class


### 3.3 - The SpriteGroup Class


### 3.4 - The Phaser Game Instance, and example state

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example-1', {
 
    create: function () {
 
        // green block sheet
        sheetFromCanvas({
            name: 'block',
            game: game,
            frames: 3,
            frameWidth: 16,
            frameHeight: 16,
            forFrame: function (ctx) {
                var colors = ['red', 'white', 'blue'];
                ctx.fillStyle = colors[this.f];
                ctx.lineWidth = 3;
                ctx.fillRect(0, 0, 32, 32);
            }
        });
 
        // making the sprite Group
        var sg = new SpriteGroup({
                game: this.game,
                sheetKey: 'block',
                name: 'blocks'
            });
 
        // I can set up a timer for new deltas
        // I just need to make sure the context is the
        // instance of SpriteGroup
        game.time.events.loop(2000, sg.newDeltas, sg);
 
    },
 
    update: function () {
 
        // I can also grab the group by using getByName
        var blocks = game.world.getByName('blocks');
 
        // Group.forEach method example
        blocks.forEach(function (sprite) {
 
            // call next tick for each sprite in the group
            sprite.data.nextTick();
 
        });
 
    }
 
});
 
game.state.start('example-1');
```
