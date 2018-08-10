---
title: Animation keyframes with phaser
date: 2018-08-08 09:56:00
tags: [js,phaser,games,canvas,animation]
layout: post
categories: phaser
id: 255
updated: 2018-08-10 19:58:42
version: 1.3
---

When making animations for a phaser project, or with animation in general actually the concept of a key frame is important. A key frame can be described as a frame when an animation begins, or ends, and as such it is a beginning state from which an animation will progress from, and then back to in the case of a looping animation. It can also be the two frames at which an animation begins at a starting state, and ends at an ending state when dealing with some kind of non-looping animation sequence. In this post I will be writing about key frames when using the phaser ce game framework, giving some examples of this important animation concept when making sprite sheets for a phaser project.

<!-- more -->

## 1 - Before continuing to read

This is a post on [animation keyframes](https://en.wikipedia.org/wiki/Key_frame) using phaser ce, and html5 game framework. This is an advanced post on phaser, and javaScript, and I assume that you have at least some background on these topics before hand.

## 1.1 - keyframes, and tweening

In you travels on javscript realed content that has to do with animation to one extent or another you might have heard about the terms [keyframes](https://en.wikipedia.org/wiki/Key_frame), and [tweening](https://en.wikipedia.org/wiki/Key_frame). These are just terms for the end points of an animation and all the other frames that lay in between those end points. For example if you have an animation that loops back to the beginning, resulting in a loading icon type animation, that kind of animation would only have a single keyframe, and all other frames just transition back to that initial state. In other words you start with a key frame, and then tween back to that keyframe. Other animations act as transitions from one state, to another state, these kinds of animations have two key frames, an initial state, and an ending state. In addition with this kind of animation all other frames transition this starting state to an ending state.

## 2 - basic example of keyframes in animation

For a basic example of keyframes, and tweening I will just quickly put together a demo that is just a simple circle that starts out at the right, then swings to the left, and then back again. If I get some time maybe I will make some more interesting animations, but for the sake of this post, and the basic concepts to work with that can be used to make more interesting animations, this should work okay for a basic example.

## 2.1 - sheet from canvas

In this example I am using a method I wrote that can be used to quickly make animations with canvas. I have written about this method back in my post on making sprite sheets with canvas, but I will also cover some of the important aspects of this method in detail here as well. If you want to work out something else to make animations thats fine, I think it is often best to have your own system for this kind of thing, but this should still work out okay to help cover some of the important aspects of keyframes and tweening.

The code of the method is like this:

```js
var sheetFromCanvas = function (opt) {
 
    var f,
    sx,
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
 
        sx = opt.frameWidth * f + 0.5;
 
        ctx.save();
        ctx.translate(sx, 0);
 
        opt.forFrame.call({
            f: f,
            sx: sx,
            per: per,
            bias: Math.abs(.5 - per) / .5,
            canvas: canvas,
            ctx: ctx,
            frameWidth: opt.frameWidth,
            frameHeight: opt.frameHeight
        }, ctx);
        ctx.restore();
 
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

The method is used by passing an object with values that define the frame width, and height, the number of total animation frames, along with a method that is executed with call function prototype method making the value of the this keyword refer to an api that contains properties about the current frame. In the body of this method is where I define the logic that will be my animation.

```js
// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// some global stuff
game.global = {};
 
game.state.add('single-loop', {
 
    create: function () {
 
        sheetFromCanvas({
 
            game: game,
            name: 'sheet-basic',
            frameWidth: 32,
            frameHeight: 64,
            frames: 20,
            forFrame: function (ctx) {
 
                var sa = -Math.PI,
                a = sa - Math.PI * this.bias,
                bounce = 4,
                cx = this.frameWidth / 2,
                cy = this.frameHeight / 2 - bounce * this.bias,
                r = this.frameWidth / 4;
 
                ctx.strokeStyle = '#ffffff';
 
                // draw main circle
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
 
                // draw smaller circle along the line of the main circle
                ctx.fillStyle = 'rgba('+Math.floor((255 * this.bias))+',0,0,1)';
                ctx.beginPath();
                ctx.arc(Math.cos(a) * 8 + cx, Math.sin(a) * 8 + cy, r / 4, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
 
            }
        });
 
        var sprite = game.add.sprite(0, 0, 'sheet-basic', 0);
        sprite.animations.add('loop', null, 12, true);
 
        sprite.animations.play('loop');
 
    },
 
    update: function () {}
 
});
 
game.state.start('single-loop');
```
