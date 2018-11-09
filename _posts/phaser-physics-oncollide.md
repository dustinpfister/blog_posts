---
title: On collision events in phaser ce
date: 2018-11-09 09:55:00
tags: [js,phaser]
layout: post
categories: phaser
id: 326
updated: 2018-11-09 10:08:23
version: 1.5
---

When making a game with [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) a common topic that comes up a lot is dealing with collision, there is detecting if a collision has occurred, and then there is doing something with that collision event. In this post I will be coving an examples of both using the default arcade physics engine in phaser ce. However the focus on this post will be on the [body.onCollide](https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.Body.html#onCollide) event and how to use that to do something in the event of a collision.

<!-- more -->

## 1 - What to know before continuing.

This is a post on using the body.onCollide event with an instance of Phaser.signal. So in other words this is one of many posts on using the phaser ce default physics engine, and is not a getting started post on phaser ce. In this post I will be making use of many phaser ce features that I cover in other phaser ce posts of mine, I will try my best to link to other relevant content as needed.


## 2 - Basic example of onCollide


### 2.1 - The create ball helper

```js
var createBall = function (game) {
 
    var ball = game.data.ball = game.add.sprite(game.world.centerX, 0, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);
 
    ball.data.attack = 1;
 
    // enable physics
    game.physics.enable(ball);
 
    // set some values for gravity, bounce, and drag
    ball.body.gravity.set(0, 100);
    ball.body.bounce.set(1, 1);
    ball.body.collideWorldBounds = true;
 
    ball.body.onCollide = new Phaser.Signal();
    ball.body.onCollide.add(function (ball, block) {
        block.damage(ball.data.attack);
    });
 
};
```

### 2.2 - The create Block helper

```js
var createBlock = function (game) {
 
    var block = game.data.block = game.add.sprite(game.world.centerX, game.world.height - 32, 'sheet-block', 0);
    block.anchor.set(0.5, 0.5);
 
    block.health = 3;
 
    game.physics.enable(block);
    block.body.immovable = true;
 
};
```

### 2.3 - Create Sprite sheets with canvas

```js
var createBallSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};
```

```js
var createBlockSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 16;
    ctx.fillStyle = '#8fef00';
    ctx.fillRect(0, 0, 64, 16);
    game.cache.addSpriteSheet('sheet-block', null, canvas, 64, 16, 1, 0, 0);
};
```

### 2.4 - The Phaser.Game instance

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('ball-bounce', {
 
    create: function () {
 
        game.data = {};
 
        createBallSheet(game);
        createBlockSheet(game);
 
        createBall(game);
        createBlock(game);
 
        game.data.tx = game.add.text(10, 10, '', {
                fill: 'white',
                font: '10px courier'
            });
 
    },
 
    update: function () {
 
        var data = game.data,
        block = data.block,
        ball = data.ball;
 
        if (!block.alive) {
 
            if (ball.y <= 140) {
 
                block.revive(3);
 
            }
 
        }
 
        game.physics.arcade.collide(ball, block);
 
        game.data.tx.text = 'block health: ' + block.health;
 
    }
 
});
 
game.state.start('ball-bounce');
```

## 3 - Conclusion