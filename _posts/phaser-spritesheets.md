---
title: Getting started with sprite sheets in phaser.
date: 2017-10-12 16:35:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 62
updated: 2018-08-11 17:32:08
version: 1.4
---

Sprite sheets come into play when starting to work with sprites. As a sprite needs to be skinned with something it is wise to start with sprite sheets before moving on to learning more about sprites. In this post I will be covering how to get started with the basics of sprite sheets in [phaser](http://phaser.io/) by way of involving an external image that must be loaded. However I will also branch off into other topics that involve making a sprite sheet from canvas with javaScript code, and cover some basics with animations and sprites.

<!-- more -->

## 1 - What to know

This is a post on [loading a spritesheet](https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#spritesheet) that exists as an external image asset in [phaser ce](https://photonstorm.github.io/phaser-ce/). This is not a getting started post on phaser or javaScript in general, for that you might want to check out my [getting started post on phaser ce](/2017/10/04/phaser-getting-started/).

## 2 - A quick phaser sprite sheet hello world example.

So here is a quick sprite sheet hello world here.

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

## 4 - A load State

If you end up eventually having a lot of sheets, and images, it might be a good idea to have a load state. I will not cover that here, but I did write a [post on that](/2017/10/07/phaser-state-loader/).
