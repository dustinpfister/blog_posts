---
title: Setting up keyboard cursor keys in phaser ce.
date: 2018-10-11 20:39:00
tags: [js,phaser]
layout: post
categories: phaser
id: 303
updated: 2018-10-11 21:17:08
version: 1.9
---

For todays post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) topics I thought I would put together a quick post on [keyboard.createCursorKeys](https://photonstorm.github.io/phaser-ce/Phaser.Keyboard.html#createCursorKeys). This can be used to create an object containing a collection of four hot keys for up down left and right. As such this can be used as a way to quickly get going with directional movement of a display object with the keyboard in phaser. Each hot key object can be used to pull the current state of a key in an update loop, as well as attach events via [Phaser.signal](/2018/10/04/phaser-signal/) instances. So in this post I will be writing about how to go about getting keyboard movement up and running real quick in a phaser ce project with this method.

<!-- more -->

## 1 - What to know

This is a post on using keyboard.createCursor keys to quickly create an object of hot keys for the arrow keys of a keyboard. This is not a post on the [keyboard manager in general](/2017/10/13/phaser-gameobj-input-keyboard/), or other aspects of handling input such as with [pointer objects](/2017/10/17/phaser-input-pointer-objects/). This is not a getting started post on [phaser ce](/2017/10/04/phaser-getting-started/), or javaScript in general as well.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.0 of [phaser](https://phaser.io/).

## 2 - Examples of keyboard.createCursorKeys that pulls key states


### 2.1 - The moveSpriteWithCursors helper

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

### 2.2 - Create the ball sheet

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

### 2.3 - The Phaser.Game instance

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
