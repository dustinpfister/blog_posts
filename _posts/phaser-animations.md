---
title: Making animations in phaser with the animation manager
date: 2018-08-08 09:56:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 253
updated: 2018-08-11 21:30:38
version: 1.2
---

When making a animation from the ground up with javaScript by itself the process often might involve one or more sprite sheets that is brought into the project by way of an external image file, or generated from code. Once I have my sheets I then devise some kind of system to get the proper frames, from the proper animations, from the proper sheets. This process can be time consuming, and is one of the many reasons why it is a good idea to just work in a framework such as phaser to one extent or another.

<!-- more -->


## 2 - Box guy phaser animation example


## 2.1 - my sheetFromCanvas method

```js
var sheetFromCanvas = function (opt) {
 
    var f,
    sx,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
 
    opt = opt || {};
    opt.name = opt.name || '';
    //opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.animations = opt.animations || [{
                frames: 1,
                forFrame: function () {}
            }
        ];
    opt.game = opt.game || null;
 
    var width = 0;
    opt.animations.forEach(function (ani) {
 
        width += ani.frames * opt.frameWidth;
 
    });
 
    canvas.width = width;
    canvas.height = opt.frameHeight;
 
    var sx = 0;
    opt.animations.forEach(function (ani) {
 
        f = 0;
        while (f < ani.frames) {
 
            per = f / ani.frames;
            ctx.save();
            ctx.translate(sx + 0.5, 0);
            ani.forFrame.call({
                f: f,
                sx: sx,
                per: per,
                bias: Math.abs(.5 - per) / .5,
                canvas: canvas,
                ctx: ctx,
                frameWidth: opt.frameWidth,
                frameHeight: opt.frameHeight,
                cx: opt.frameWidth / 2,
                cy: opt.frameHeight / 2
            }, ctx);
            ctx.restore();
 
            sx += opt.frameWidth;
            f += 1;
        }
 
    });
 
    // add a new sheet to cache if we have a game
    if (opt.game) {
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
    }
 
    // return the canvas
    return canvas;
 
};
```