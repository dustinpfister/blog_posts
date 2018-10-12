---
title: Setting up keyboard cursor keys in phaser ce.
date: 2018-10-11 20:39:00
tags: [js,phaser]
layout: post
categories: phaser
id: 303
updated: 2018-10-11 20:50:45
version: 1.2
---

For todays post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) topics I thought I would put together a quick post on [keyboard.createCursorKeys](https://photonstorm.github.io/phaser-ce/Phaser.Keyboard.html#createCursorKeys). This can be used to create an object containing a collection of four hot keys for up down left and right. As such this can be used as a way to quickly get going with directional movement of a display object with the keyboard in phaser.

<!-- more -->

## 1 - What to know


```js
var moveSpriteWithCursors = function (game, sprite) {
 
    game.data = game.data || {};
 
    // create cursors
    if (!game.data.cursors) {
        game.data.cursors = game.input.keyboard.createCursorKeys();
    }
 
    var cursors = game.data.cursors;
 
    if (cursors.up.isDown) {
        sprite.y -= 10;
    }
 
    if (cursors.down.isDown) {
        sprite.y += 10;
    }
 
    if (cursors.left.isDown) {
        sprite.x -= 10;
    }
 
    if (cursors.right.isDown) {
        sprite.x += 10;
    }
 
    sprite.y = Phaser.Math.wrap(sprite.y, -32, game.world.height + 32);
    sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);
 
};
```

```js
var createBallSheet = function (game) {
 
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
 
    canvas.width = 32;
    canvas.height = 32;
 
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(16, 16, 12, 0, Math.PI * 2);
    ctx.fill();
 
    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};
```

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        game.data = {};
 
        createBallSheet(game);
 
        var sprite = game.data.sprite = game.add.sprite(0, 0, 'sheet-ball');
 
    },
 
    update: function () {
 
        moveSpriteWithCursors(game, game.data.sprite);
 
    }
 
});
 
game.state.start('boot');
```
