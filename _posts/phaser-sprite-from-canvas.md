---
title: Making a sprite from an html5 2d canvas element
date: 2018-08-04 12:58:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 248
updated: 2018-08-04 14:16:08
version: 1.2
---

So for todays post on the html5 game framework known as phaser ce, I will be writing about a way to go about making sprites form 2d canvas elements. This means making a sprite using the html 5 2d drawing context via a canvas element that has been made before hand elsewhere, or directly drawing to a new one. In any case the canvas can be used to make an instance of bitmap data that can then be used as a texture for a sprite, rather than an external image. I will not be getting into how to go about spritesheets for now, as I think that should be a whole other post.

<!-- more -->

## 1 - What to know before continuing

This is a post on the html 5 game framework phaser, and how to use canvas elements as a way to make static sprites. I will not be getting inot how to get started with phaser, or javaScript in general here. As such I hope you have at least some background with these things, and are now exploring ways to make assets from code. There are a few ways to do so with phaser, such as with the Graphics class, but I have come to find that I prefer to work with 2d canvas over that.

## 2 - Some basic examples of using canvas to make a static sprite

For a basic working example of this, the process is to start out by making a canvas element, or using the canvas element that is in an instance of bitmapData, and then draw something to it like always when doing something with canvas. I can not just pass a canvas element as the texture for a sprite, but I can pass an instance of bitmap data. That being said I must then create an instance of bitmap data, which will have a canvas as one of its properties. I can either directly draw to that canvas, or draw another canvas to that canvas with drawImage. Once I have my bitmap data I can then use that as the texture for a sprite.

## 2.2 - drawing to the bitmap data canvas with another canvas

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