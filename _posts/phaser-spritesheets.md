---
title: Getting started with sprite sheets in phaser.
date: 2017-10-12 16:35:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 62
updated: 2018-09-17 13:04:51
version: 1.10
---

Sprite sheets come into play when starting to work with sprites. As a sprite needs to be skinned with something it is wise to start with sprite sheets before moving on to learning more about sprites. In this post I will be covering how to get started with the basics of sprite sheets in phaser ce by way of involving an external image that must be loaded. However I will also branch off into other topics that involve making a sprite sheet from canvas with javaScript code, and cover some basics with animations and sprites.

<!-- more -->

## 1 - What to know

This is a post on [loading a spritesheet](https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#spritesheet) that exists as an external image asset in [phaser ce](https://photonstorm.github.io/phaser-ce/). This is not a getting started post on phaser or javaScript in general, for that you might want to check out my [getting started post on phaser ce](/2017/10/04/phaser-getting-started/).

### 1.1 - This is a phaser ce (phaser 2.x post)

This is a post on [phaser ce](https://photonstorm.github.io/phaser-ce/) also known as phaser 2.x of the [phaser ce](http://phaser.io/) javaScript powered game framework. I have not started writing content on phaser 3 as of this writing, but in any case I have gotten into the habit of making it clear in the beginning of posts what version of phaser I am using. As log as phaser ce is still supported, and used by developers, then there should remain a demand for content on it.

### 1.2 - More than one way to make a sheet

There are many ways to go about loading, or generating a sprite sheet in phaser. If you all ready have an external sprite sheet image that you want to use, then there are ways to use a loader, to bring it into a project during a load state. If you want to generate a sprite sheet with javaScript code then there are ways to do that involving the 2d canvas drawing api. In this post I will be briefly coving some of these topics. and link to other posts in which I get into these things in further detail.

### 1.2 - A load State

If you end up eventually having a lot of sheets, and images, it might be a good idea to have a load state. The process of putting together a loader can be a little involved, but there are many methods and events that help with the process I will not cover that here, but I did write a [post on that](/2017/10/07/phaser-state-loader/). 

## 2 - From an external file load.spritesheet

So if your project involves external spritesheets rather than generating sheets with javaScript code via canvas then the solution that you will want will involve in one way or another game.load.spritesheet.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // load the sprite sheet
        preload : function () {
 
            // load it in the preload state
            game.load.spritesheet('cucco', '/img/cuccos_zelda4.png', 20, 20, 10);
 
        },
 
        // create the sprite
        create : function () {
 
            game.add.sprite(0, 0, 'cucco');
 
        },
 
        update : (function () {
 
            var f = 0, // frame index
            lt = new Date(), // last time
            rate = 1000 / 12; // frame rate
 
            return function () {
 
                // getting the sprite this way works
                // because it is the only child in the world
                sprite = game.world.children[0];
 
                 // the frame indexes I want are 2, and 3 in my sheet
                sprite.frame = f + 2;
 
                // if it is time to step frames...
                if (new Date() - lt > rate) {
 
                    // ... then do it
                    f += 1;
                    if (f == 2) {
 
                        f = 0;
 
                    }
 
                    // set new last time date
                    lt = new Date();
 
                }
 
            };
 
        }
            ())
 
    });
```

## 3 - Spritesheet from canvas

There is loading a sprite sheet that I have made before hand, and there is the process of making a sprite sheet in the first place. In many of my code examples here, as well as with my projects so far I often prefer to go with a canvas solution. This allows me to make my own sprite sheets with javaScript, buy making simple little characters and objects with code. If I want to furnish a sprite sheet from canvas there are ways of doing that, but often I just use this is a way to generate the assets. This approach works find if I am to make a simple hyper casual style game, but in other projects I can see why it might fall short, and I will want to use at least some external assets.

In any case using a canvas solution is pretty easy to get started with a method that might look something like this.

```js
// make a sprite sheet
Enemy.mkSheet = function (game) {
 
    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
 
    // blue frame
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 32, 32);
 
    // red frame
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(32, 0, 32, 32);
 
    game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 2, 0, 0);
 
};
```

At which point I can then use the key 'sheet-block' when making sprites. For more on this topic you will want to check out my [post on making sprite sheets from canvas](/2018/08/04/phaser-spritesheet-from-canvas/).

## 4 - Not using a sprite sheet

In some cases I might not even need to bother with a sprite sheet at all, and just use a singe generated image. To pull this off then making a sprite I pass an instance of phaser bitmap data to the sprite in place of a key to a sprite sheet. I cover this in further detail on making [sprites with canvas](/2018/08/04/phaser-sprite-from-canvas/).
