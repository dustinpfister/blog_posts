---
title: Making a Sprite physics body immovable in phaser ce
date: 2018-11-08 14:38:00
tags: [js,phaser]
layout: post
categories: phaser
id: 326
updated: 2018-11-08 17:58:36
version: 1.5
---

When working out things with physics in [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) there may be a need to set some display objects as immovable when hit by another display object physics body. So that is to not make it so the display object is immovable at all, just immovable when hot by another object.

<!-- more -->

## 1 - What to know before continuing.

This is a post on making display objects not move when hit by another display object when working out physics for a game made with phaser ce as a game framework. This is not a getting started post with physics in phaser ce or with phaser ce in general. In this post I am using many aspects of the framework that you should know a thing or two about before hand.

## 2 - An example of body.immovable

### 2.1 - making an immovable sprite

```js
var mkImmovable = function (game) {
 
    var imm = game.data.immovable = game.add.sprite(game.world.centerX - 32, game.world.centerY - 32, 'blocks', 0);
    imm.width = 64;
    imm.height = 64;
 
    // enable physics and set immovable
    game.physics.enable(imm);
    imm.body.immovable = true;
 
};
```

### 2.2 - Making a group of sprites

```js
var mkGroup = function (game) {
 
    var group = game.data.group = game.add.group(),
    sprite,
    radian,
    dist,
    i = 0,
    len = 5;
    while (i < len) {
        radian = Math.PI * 2 / len * i;
        dist = Math.random() * 30 + 70;
        sprite = game.make.sprite(
                game.world.centerX + Math.cos(radian) * dist,
                game.world.centerY + Math.sin(radian) * dist, 'blocks', 1);
        game.physics.enable(sprite);
        sprite.body.velocity.set(
            Math.cos(radian) * -100,
            Math.sin(radian) * -100);
        sprite.body.bounce.set(1, 1);
        group.add(sprite);
        i += 1;
    }
 
};
```

### 2.3 - making a sprite sheet with canvas

```js
// just make a simple block sheet
var mkBlockSheet = function (game) {
 
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
 
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#af0000';
    ctx.fillRect(0, 0, 32, 32);
    ctx.strokeRect(0, 0, 32, 32);
 
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(32.5, 0, 31, 32);
 
    game.cache.addSpriteSheet('blocks', null, canvas, 32, 32, 2, 0, 0);
 
};
```

### 2.4 - The Phaser.game instance

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        game.data = {};
 
        mkBlockSheet(game);
        mkImmovable(game);
        mkGroup(game);
 
    },
 
    update: function () {
 
        game.data.group.forEach(function (gfx) {
 
            gfx.x = Phaser.Math.wrap(gfx.x, -8, game.world.width + 8);
            gfx.y = Phaser.Math.wrap(gfx.y, -8, game.world.height + 8);
 
            game.physics.arcade.collide(gfx, game.data.group);
            game.physics.arcade.collide(gfx, game.data.immovable);
 
        });
 
    }
 
});
 
game.state.start('demo');
```
