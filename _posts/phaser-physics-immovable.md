---
title: Making a Sprite physics body immovable in phaser ce
date: 2018-11-08 14:38:00
tags: [js,phaser]
layout: post
categories: phaser
id: 326
updated: 2018-11-08 14:40:25
version: 1.1
---

[phaser ce](https://photonstorm.github.io/phaser-ce/index.html)

<!-- more -->

## 1 - What to know before continuing.


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

```js
var mkGroup = function (game) {
 
    var group = game.data.group = game.add.group(),
    radian,
    i = 0,
    len = 5;
    while (i < len) {
        radian = Math.PI * 2 / len * i,
        dist = Math.random() * 30 + 70,
        gfx = game.make.sprite(
                game.world.centerX + Math.cos(radian) * dist,
                game.world.centerY + Math.sin(radian) * dist, 'blocks', 1);
        game.physics.enable(gfx);
        gfx.body.velocity.set(
            Math.cos(radian) * -100,
            Math.sin(radian) * -100);
        gfx.body.bounce.set(1, 1);
        group.add(gfx);
        i += 1;
    }
 
};
```

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
