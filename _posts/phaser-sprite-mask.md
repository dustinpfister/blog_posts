---
title: Sprite Masks in phaser ce.
date: 2018-11-30 22:21:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 340
updated: 2018-11-30 22:25:09
version: 1.1
---

In [Phaser ce](https://photonstorm.github.io/phaser-ce/) when working with sprites it is possible to use a mask to make only a portion of the sprite visible.

<!-- more -->

## 1 - What to know before continuing


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