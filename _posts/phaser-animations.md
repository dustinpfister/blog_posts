---
title: Making animations in phaser with the animation manager
date: 2018-08-08 09:56:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 253
updated: 2018-12-01 12:30:42
version: 1.10
---

When making a animation from the ground up with javaScript by itself the process often might involve one or more sprite sheets that is brought into the project by way of an external image file, or generated from code. Once I have my sheets I then devise some kind of system to get the proper frames, from the proper animations, from the proper sheets. This process can be time consuming, and is one of the many reasons why it is a good idea to just work in a framework such as [phaser 2](https://photonstorm.github.io/phaser-ce/) to one extent or another. In phaser sprite sheets can be added into a project from an external file via the asset loader, or generated with javaScript and added into the cache. Once I have a sprite sheet animations can be made by way of the [animation manager](https://photonstorm.github.io/phaser-ce/Phaser.AnimationManager.html) of a sprite. In this post I will be writing about using the animation manager with asset less sprite sheet solution.

<!-- more -->

## 1 - What to know

This is a post on making animations in phaser 2 animation manager with an asset free sprite sheet solution I have made. This is not a getting started post on phaser, or javaScript in general, so I assume that you have gotten your feet wet at least with these topics.

### 1.1 - The very basics of animations

So assuming that I have a sprite sheet loaded, or created and cached into the phaser cache. Creating a sprite that will make use of the animations in the sheet is a fairly straight forward process. I of course give the name of the sheet when making the sprite for starters. Then once I have a sprite, with a sprite sheet associated with it sprite I can then add an animation with the app method of the animation property of the sprite which is a reference to its animation manager.

something like this
```js
var sprite = game.add.sprite(0,0,'sheet-name');
sprite.name = 'guy';
sprite.animations.add('walk',[0,1,2],12,true);
```
This animation would be and animation called 'walk' that would consist of the first three frames of the sprite sheet associated with this sprite, will be played back as 12 frames per second, and will loop over and over again until the animation changes to something else.

I can then use the animation later in the state by grabbing a reference to the sprite, and calling the proper animation.

```js
var sprite = game.world.getByName('guy');
sprite.animations.play('walk');
```

However to cover a full working example of this I am going to need to load, or create from code a sprite sheet, so lets take a look as an actual example of this in action.

### 1.2 - This is a phaser 2 post

In this post I am using phaser 2.11.1, and not the newer phaser 3 major release.

## 2 - Box guy phaser animation example

In order to have an phaser animation example I first need a sprite sheet to work with. So for this example I will be using a solution I worked out that allows be to create sprite sheets with the 2d canvas drawing api. This sheet will contain two animations for a sprite. One that will be an animation that is to be played when the sprite is not moving, and another that is to be played when it is moving.

### 2.1 - my sheetFromCanvas method

First off there is my sheetFromCanvas method that I can use to make a sprite sheet. This works by passing an object to it that contains, among other properties, an array of objects that declare the number of frames, and a method that will be used to render each frame for that animation.

This method allows me to make a sprite sheet with code, rather than loading an external sprite sheet. In any case animation is a time consuming aspect of game development, I often pursue making an animation with some kind of code solution rather than hand drawing the cells. If you all ready have a sprite sheet available in you project then you can skip this.

```js
var sheetFromCanvas = (function () {
 
    // generate the api for the Current forFrame method, and frame
    // used in renderFrames
    var genForFrameAPI = function (opt, ani, af, sx, canvas, ctx) {
 
        var per = per = af / ani.frames;
 
        // the API to work with in a forFrame method
        return {
            f: af,
            sx: sx,
            per: per,
            bias: Math.abs(.5 - per) / .5,
            canvas: canvas,
            ctx: ctx,
            frameWidth: opt.frameWidth,
            frameHeight: opt.frameHeight,
            cx: opt.frameWidth / 2,
            cy: opt.frameHeight / 2
        };
 
    };
 
    // render all frames with the given options, and canvas
    var genFrames = function (opt, canvas) {
 
        var sx = 0,
        frameData = {},
        f = 0, // frame index
        ctx = canvas.getContext('2d');
        opt.animations.forEach(function (ani) {
 
            af = 0; // frame index relative to the current animation
            frameData[ani.name] = [];
            while (af < ani.frames) {
 
                // save the context, and translate so that 0,0
                // is the upper left corner of the frame when drawing in
                // the forFrame method
                ctx.save();
                ctx.translate(sx + 0.5, 0);
 
                // call the forFrame method of the current animation
                // generating the api that can be used via the this keyword
                ani.forFrame.call(genForFrameAPI(opt, ani, af, sx, canvas, ctx), ctx);
                ctx.restore();
 
                // push the sheet relative frame index to frameData for the animation
                frameData[ani.name].push(f);
 
                // step start x, and frame index
                sx += opt.frameWidth;
                af += 1;
                f += 1;
            }
 
        });
 
        // return the frameData
        return frameData;
 
    };
 
    // set the canvas width based on what is set
    // via opt.
    var setCanvasWidth = function (opt, canvas) {
 
        var width = 0;
        opt.animations.forEach(function (ani) {
            width += ani.frames * opt.frameWidth;
        });
 
        canvas.width = width;
        canvas.height = opt.frameHeight;
 
    };
 
    // return the public method
    return function (opt) {
 
        var canvas = document.createElement('canvas'),
        frameData;
 
        opt = opt || {};
        opt.name = opt.name || '';
        opt.frameWidth = opt.frameWidth || 32;
        opt.frameHeight = opt.frameHeight || 32;
        opt.animations = opt.animations || [{
                    frames: 1,
                    forFrame: function () {}
                }
            ];
        opt.game = opt.game || null;
 
        // set canvas width
        setCanvasWidth(opt, canvas);
 
        // render frames
        frameData = genFrames(opt, canvas);
 
        // if we have a game object
        if (opt.game) {
 
            // add a sheet to cache
            opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
 
            // append frame data to a global object
 
            game.global = game.global || {};
 
            game.global.frameData = frameData;
 
        }
 
    };
 
}
    ());
```

If you would like to learn more about making sprite sheets with this kind of solution I have written a post on [making a spritesheet with canvas](/2018/08/04/phaser-spritesheet-from-canvas/), in which I get into this method in detail. I will show an example of this being used in the next section when I make my state object for this example.

### 2.2 - The state

So now that I have my method that I can use to make a sprite sheet I will now show an example of this in action. I call the method in the create method of a state object to create the sheet, and add it into the state. In a simple example like the one I will show here this will all be done in a single state object, but in a more complex project this is something that might be done during another state in the project.

```js
// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('ani-box-guy', {
 
    create: function () {
 
        sheetFromCanvas({
            game: game,
            name: 'sheet-box-guy',
            animations: [{
                    frames: 4,
                    name: 'static',
                    forFrame: function (ctx) {
 
                        var sx = this.cx - 8,
                        sy = this.cy - 8 - 4 + 8 * (1 - this.bias),
                        x,y,w,h;
 
                        ctx.fillStyle = '#ffffff';
                        ctx.strokeStyle = '#000000';
 
                        // legs
                        x = sx + 2;
                        y = sy + 16;
                        w = 4;
                        h = 12 - 8 * (1 - this.bias);
                        ctx.fillRect(x, y, w, h);
                        ctx.strokeRect(x, y, w, h);
 
                        x = sx + 10;
                        ctx.fillRect(x, y, w, h);
                        ctx.strokeRect(x, y, w, h);
 
                        // body
                        ctx.fillRect(sx, sy, 16, 16);
                        ctx.strokeRect(sx, sy, 16, 16);
 
                    }
                }, {
                    frames: 8,
                    name: 'walk',
                    forFrame: function (ctx) {
 
                        var sx = this.cx - 8,
                        sy = this.cy - 8,
                        r = Math.PI / 180 * 25 * (1 - this.bias),
                        x,y,w,h
 
                        ctx.fillStyle = '#ffffff';
                        ctx.strokeStyle = '#000000';
 
                        // legs
                        x = sx + 4;
                        y = sy + 12;
                        w = 4;
                        h = 12;
                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(r);
                        ctx.fillRect(-w / 2, 0, w, h);
                        ctx.strokeRect(-w / 2, 0, w, h);
                        ctx.restore();
 
                        x = sx + 12;
                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(-r);
                        ctx.fillRect(-w / 2, 0, w, h);
                        ctx.strokeRect(-w / 2, 0, w, h);
                        ctx.restore();
 
                        // body
                        ctx.fillRect(sx, sy + 2 * this.bias, 16, 16);
                        ctx.strokeRect(sx, sy + 2 * this.bias, 16, 16);
 
                    }
                }
            ]
 
        });
 
        var sprite = game.add.sprite(0, 0, 'sheet-box-guy', 0);
        sprite.name = 'box-walk';
 
        // static movement animation
        sprite.animations.add('walk', game.global.frameData['walk'], 12, true);
        sprite.animations.play('walk');
        sprite.x = 0;
        sprite.y = 96;
        sprite.data.right = true;
 
        sprite = game.add.sprite(0, 0, 'sheet-box-guy', 0);
        sprite.name = 'box-static';
        sprite.animations.add('static', game.global.frameData['static'], 6, true);
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
 
game.state.start('ani-box-guy');
```