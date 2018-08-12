---
title: Making animations in phaser with the animation manager
date: 2018-08-08 09:56:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 253
updated: 2018-08-12 09:39:12
version: 1.7
---

When making a animation from the ground up with javaScript by itself the process often might involve one or more sprite sheets that is brought into the project by way of an external image file, or generated from code. Once I have my sheets I then devise some kind of system to get the proper frames, from the proper animations, from the proper sheets. This process can be time consuming, and is one of the many reasons why it is a good idea to just work in a framework such as phaser ce to one extent or another. In phaser sprite sheets can be added into a project from an external file via the asset loader, or generated with javaScript and added into the cache. Once I have a sprite sheet animations can be made by way of the animation manager of a sprite. In this post I will be writing about using the animation manager with asset less sprite sheet solution.

<!-- more -->

## 1 - What to know

This is a post on making animations in phaser ce animation manager with an asset free sprite sheet solution I have made. This is not a getting started post on phaser, or javaScript in general, so I assume that you have gotten your feet wet at least with these topics.

## 2 - Box guy phaser animation example

In order to have an phaser animation example I first need a sprite sheet to work with. So for this example I will be using a solution I worked out that allows be to create sprite sheets with the 2d canvas drawing api. This sheet will contain two animations for a sprite. One that will be an animation that is to be played when the sprite is not moving, and another that is to be played when it is moving.

### 2.1 - my sheetFromCanvas method

First off there is my sheetFromCanvas method that I can use to make a sprite sheet. This works by passing an object to it that contains, among other properties, and array of objects that declare the number of frames, and a method that will be used to render each frame for that animation.

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

### 2.2 - The state

Once I have my sprite sheet worked out, I can now use it to make some animations.

```js
game.state.add('ani-box-guy', {
 
    create: function () {
 
        sheetFromCanvas({
            game: game,
            name: 'sheet-box-guy',
            animations: [{
                    frames: 4,
                    forFrame: function (ctx) {
 
                        var x = this.cx - 8,
                        y = this.cy - 8 - 4 + 8 * (1 - this.bias);
 
                        ctx.fillStyle = '#ffffff';
                        ctx.strokeStyle = '#000000';
 
                        // legs
                        ctx.fillRect(x + 2, y + 16, 4, 12 - 8 * (1 - this.bias));
                        ctx.strokeRect(x + 2, y + 16, 4, 12 - 8 * (1 - this.bias));
                        ctx.fillRect(x + 10, y + 16, 4, 12 - 8 * (1 - this.bias));
                        ctx.strokeRect(x + 10, y + 16, 4, 12 - 8 * (1 - this.bias));
 
                        // body
                        ctx.fillRect(x, y, 16, 16);
                        ctx.strokeRect(x, y, 16, 16);
 
                    }
                }, {
                    frames: 8,
                    forFrame: function (ctx) {
 
                        var x = this.cx - 8,
                        y = this.cy - 8;
 
                        //ctx.fillStyle = '#00ff00';
                        //ctx.fillRect(0, 0, this.frameWidth, this.frameHeight);
 
                        ctx.fillStyle = '#ffffff';
                        ctx.strokeStyle = '#000000';
 
                        // legs
                        ctx.save();
                        ctx.translate(x + 4, y + 12);
                        ctx.rotate((Math.PI / 180 * 45) * (1 - this.bias));
                        ctx.fillRect(-2, 0, 4, 12);
                        ctx.strokeRect(-2, 0, 4, 12);
                        ctx.restore();
 
                        ctx.save();
                        ctx.translate(x + 12, y + 12);
                        ctx.rotate((-Math.PI / 180 * 45) * (1 - this.bias));
                        ctx.fillRect(-2, 0, 4, 12);
                        ctx.strokeRect(-2, 0, 4, 12);
                        ctx.restore();
 
                        // body
                        ctx.fillRect(x, y + 2 * this.bias, 16, 16);
                        ctx.strokeRect(x, y + 2 * this.bias, 16, 16);
 
                    }
                }
            ]
 
        });
 
        var sprite = game.add.sprite(0, 0, 'sheet-box-guy', 0);
        sprite.name = 'box-walk';
 
        // static movement animation
        sprite.animations.add('walk', [4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        sprite.animations.play('walk');
        sprite.x = 0;
        sprite.y = 96;
        sprite.data.right = true;
 
        sprite = game.add.sprite(0, 0, 'sheet-box-guy', 0);
        sprite.name = 'box-static';
        sprite.animations.add('static', [0, 1, 2, 3], 6, true);
        sprite.animations.play('static');
 
        sprite.x = 64;
        sprite.y = 32;
 
    },
 
    update: function () {
 
        var sprite = game.world.getByName('box-walk');
 
        if (sprite.data.right) {
            sprite.x += 1;
        } else {
            sprite.x -= 1;
        }
 
        sprite.x = Phaser.Math.clamp(sprite.x, 0, game.world.width - 32);
 
        if (sprite.x === 0 || sprite.x === game.world.width - 32) {
 
            sprite.data.right = !sprite.data.right;
 
        }
 
    }
 
});
```