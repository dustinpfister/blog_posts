---
title: Sprite Masks in phaser ce.
date: 2018-11-30 22:21:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 340
updated: 2018-12-02 21:53:29
version: 1.4
---

In [Phaser 2](https://photonstorm.github.io/phaser-ce/) when working with sprites it is possible to use a mask to make only a portion of the sprite visible. This can come in handy for effects that are like that of a spotlight where only a certain area of a sprite is visible that falls inside that of a mask.

<!-- more -->

## 1 - What to know before continuing

This is a post on using a mask to make only a certain area of a sprite visible in phaser 2 the javaScript powered game framework. This is not a getting started post on phaser 2 , or javaScript in general, so I assume that you have at least some background with these topics before hand.

### 1.1 - This is a phaser 2 post

In this post I was using phaser 2.11.1 for the code examples. So if you run into problems reproducing the code on your end be sure to check the version number of phaser that you are using. The code will break on newer major releases of phaser.

## 2 - Basic Mask Demo

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('mask-demo', {
 
    create: function () {
 
        var texture = game.make.graphics(0, 0);
        texture.beginFill(0xff0000);
        texture.drawRect(0, 0, 32, 32);
        texture.endFill();
 
        var mask = game.make.graphics(0, 0);
        mask.beginFill(0xffffff);
        mask.drawCircle(16, 16, 32);
 
        //Here we add a Sprite to the display list
        sprite = game.add.sprite(0, 0, texture.generateTexture());
        sprite.scale.set(2);
        sprite.mask = mask;
 
        var group = game.add.group();
        group.add(sprite);
        group.add(mask);
 
        group.x = 32;
        group.y = 32;
 
    }
 
});
 
game.state.start('mask-demo');
```