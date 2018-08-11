---
title: Making a sprite sheet from an 2d canvas context in phaser
date: 2018-08-04 20:56:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 249
updated: 2018-08-11 17:32:08
version: 1.1
---

For this post on [phaser ce](https://photonstorm.github.io/phaser-ce/) I will be writing about ways to go about making a sprite sheet from a canvas element, rather than loading an external asset. This can be done a number of ways, but in this post I will be using the 2d canvas drawing context in a [canvas element](/2017/05/17/canvas-getting-started/) and pass that element to a method that can be used in the phaser cache to create a [sprite sheet](/2017/10/12/phaser-spritesheets/) from a canvas element.

<!-- more -->

## 2 - A not so basic, basic example

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
game.antialias = false;
 
game.state.add('basic', {
 
    data: {
        maxFrame: 24,
        frameRate: 100,
        lastFrame: new Date()
    },
 
    create: function () {
 
        var frame = 0,
        maxFrame = this.data.maxFrame,
        frameWidth = 64,
        frameHeight = 64,
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
 
        canvas.width = frameWidth * maxFrame;
        canvas.height = frameHeight;
        while (frame < maxFrame) {
 
            // figure startx, and percent done
            var sx = frameWidth * frame + 0.5,
            per = frame / maxFrame;
 
            // draw for current frame
            ctx.strokeStyle = '#00ff00';
            ctx.save();
            ctx.translate(sx + 32, 32);
            ctx.rotate(Math.PI * 2 * per);
            ctx.strokeRect(-16, -16, 32, 32);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 30);
            ctx.stroke();
            ctx.restore();
 
            // next frame
            frame += 1;
 
        }
 
        // add a new sheet to cache
        game.cache.addSpriteSheet('sheet-1', null, canvas, frameWidth, frameHeight, maxFrame, 0, 0);
 
        // create a sprite with the sheet
        var sprite = game.add.sprite(0, 0, 'sheet-1', 0);
        sprite.smoothed = false;
        sprite.name = 'sp1';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;
 
    },
 
    // loop frames
    update: function () {
 
        var sprite = game.world.getByName('sp1'),
        now = new Date();
 
        if (now - this.data.lastFrame >= this.data.frameRate) {
 
            sprite.frame += 1;
            sprite.frame %= this.data.maxFrame;
 
            this.data.lastFrame = new Date();
 
        }
 
    }
 
});
 
game.state.start('basic');
```

## 3 - A sheet from canvas method

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
 
game.state.add('sheet-from-canvas', {
 
    data: {
        maxFrame: 30,
        frameRate: 100,
        lastFrame: new Date()
    },
 
    create: function () {
 
        sheetFromCanvas({
            name: 'sheet-1',
            game: game,
            frames: 30,
            frameWidth: 64,
            frameHeight: 64,
            forFrame: function (ctx) {
                ctx.strokeStyle = '#ffff00';
                ctx.save();
                ctx.translate(this.sx + 32, 32);
                ctx.rotate(Math.PI * 2 * this.per);
                ctx.strokeRect(-16, -16, 32, 32);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, 30);
                ctx.stroke();
                ctx.restore();
            }
        });
 
        // create a sprite with the sheet
        var sprite = game.add.sprite(0, 0, 'sheet-1', 0);
        sprite.smoothed = false;
        sprite.name = 'sp1';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;
 
    },
 
    // loop frames
    update: function () {
 
        var sprite = game.world.getByName('sp1'),
        now = new Date();
 
        if (now - this.data.lastFrame >= this.data.frameRate) {
            sprite.frame += 1;
            sprite.frame %= this.data.maxFrame;
            this.data.lastFrame = new Date();
        }
 
    }
 
});
 
game.state.start('sheet-from-canvas');
```