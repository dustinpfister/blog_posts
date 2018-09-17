---
title: Making a sprite from an html5 2d canvas element in phaser
date: 2018-08-04 12:58:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 248
updated: 2018-09-17 13:04:50
version: 1.7
---

So for todays post on the html5 game framework known as [phaser ce](https://photonstorm.github.io/phaser-ce/), the community edition of [phaser ce](http://phaser.io/). I will be writing about a way to go about making sprites form 2d canvas elements. This means making a sprite using the html 5 2d drawing context via a canvas element that has been made before hand elsewhere, or directly drawing to a new one. In any case the canvas can be used to make an instance of bitmap data that can then be used as a texture for a sprite, rather than an external image. I will not be getting into how to go about spritesheets for now, as I think that should be a whole other post.

<!-- more -->

## 1 - What to know before continuing

This is a post on the html 5 game framework phaser, and how to use canvas elements as a way to make static sprites. I will not be getting inot how to get started with phaser, or javaScript in general here. As such I hope you have at least some background with these things, and are now exploring ways to make assets from code. There are a few ways to do so with phaser, such as with the Graphics class, but I have come to find that I prefer to work with 2d canvas over that.

## 2 - Some basic examples of using canvas to make a static sprite

For a basic working example of this, the process is to start out by making a canvas element, or using the canvas element that is in an instance of bitmapData, and then draw something to it like always when doing something with canvas. I can not just pass a canvas element as the texture for a sprite, but I can pass an instance of bitmap data. That being said I must then create an instance of bitmap data, which will have a canvas as one of its properties. I can either directly draw to that canvas, or draw another canvas to that canvas with drawImage. Once I have my bitmap data I can then use that as the texture for a sprite.

## 2.1 - drawing directly to a bitmap data canvas

In any case doing this will often involve making an instance of the phaser bitmap data class. This class will have a canvas as one of its properties, and as such if I am not doing anything that involves a canvas element that exists before hand, I can just draw to the context of that canvas.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// basic state
game.state.add('bitmap-only', {
 
    create: function () {
 
        var bitmap,
        ctx,
        sprite;
 
        // make a bitmap, and draw to the canvas context
        bitmap = new Phaser.BitmapData(game, '', 64, 64);
        ctx = bitmap.context;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, bitmap.width, bitmap.height);
 
        // use that bitmap as the texture for the sprite
        sprite = game.add.sprite(0, 0, bitmap);
        sprite.name = 'bx';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;
 
    }
 
});
 
game.state.start('bitmap-only');
```

If I want to cache the bitmap data I would want to use game.add.bitMapdata, and set a boolen with that true rather than directly using the constructor like I am in this example.

## 2.2 - drawing to the bitmap data canvas with another canvas

In order to pull this off I can just draw to the bitmap data canvas with the other canvas.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// basic state
game.state.add('basic', {
 
    create: function () {
 
        // create a canvas, and get the 2d context
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        bitmap,
        sprite;
 
        // set the native width, and height of the canvas
        // and draw something to the context
        canvas.width = 64;
        canvas.height = 64;
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
 
        // make a bitmap, and draw the canvas to its canvas
        bitmap = new Phaser.BitmapData(game, '', 64, 64);
        bitmap.context.drawImage(canvas, 0, 0);
 
        // use that bitmap as the texture for the sprite
        sprite = game.add.sprite(0, 0, bitmap);
        sprite.name = 'bx';
        sprite.x = game.world.centerX - sprite.width / 2;
        sprite.y = game.world.centerY - sprite.height / 2;
 
    }
 
});
 
game.state.start('demo');
```

In this example I am creating the canvas in the same body of code. However I could create a function where something like this would be pulled away into. In a real project I might have some kind of module that returns a canvas and I need to fine a way to make a sprite from it, in such a case a function that does that would be helpful.

## 3 - bitmap caching

So If I am in a situation in which I want to make a whole bunch of sprites from one bitmap image that is made by drawing to is canvas. Then I would do something similar to the example in which I am drawing directly to a canvas like before. However this time I will want to cache it to phasers cache, and then grab at it when I need to when creating a new sprite in my states update method.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('bitmap-cache', {
 
    data: {
 
        max: 10,
        bx: []
 
    },
 
    create: function () {
 
        var bitmap,
        ctx,
        sprite;
 
        // make an instance of bitmap data, and cache it.
        // the final argument here is a boolean that if true will
        // add the bitmap to the phaser cache.
        bitmap = game.add.bitmapData(64, 64, 'bitmap-key', true);
 
        // I can just draw to the canvas context on the bitmapData
        ctx = bitmap.context;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, bitmap.width, bitmap.height);
 
        this.data.bx = [];
 
    },
 
    update: function () {
 
        var bitmap,
        sprite,
        i,
        x,
        y;
 
        if (this.data.bx.length < this.data.max) {
 
            x = Math.random() * game.world.width;
            y = Math.random() * game.world.height;
 
            // so I can grab at the cached bitmap like this
            bitmap = game.cache.getBitmapData('bitmap-key');
 
            // and then use it to make a sprite
            sprite = game.add.sprite(x, y, bitmap);
            sprite.data.maxLife = Math.floor(Math.random() * 150 + 50);
            sprite.data.life = sprite.data.maxLife;
 
            this.data.bx.push(sprite);
 
        }
 
        i = this.data.bx.length;
        while (i--) {
 
            sprite = this.data.bx[i];
            sprite.data.life -= 1;
 
            if (sprite.data.life <= 0) {
 
                this.data.bx.splice(i, 1);
                sprite.kill();
 
            } else {
 
                sprite.alpha = sprite.data.life / sprite.data.maxLife;
 
            }
 
        }
 
    }
 
});
 
game.state.start('bitmap-cache');
```

So then this way I can make a whole bunch of sprites from just one bitmapData instance that is cached.