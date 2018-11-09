---
title: On collision events in phaser ce
date: 2018-11-09 09:55:00
tags: [js,phaser]
layout: post
categories: phaser
id: 326
updated: 2018-11-09 12:47:46
version: 1.15
---

When making a game with [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) a common topic that comes up a lot is dealing with collision, there is detecting if a collision has occurred, and then there is doing something with that collision event. In this post I will be coving an examples of both using the default arcade physics engine in phaser ce. However the focus on this post will be on the [body.onCollide](https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.Body.html#onCollide) event and how to use that to do something in the event of a collision.

<!-- more -->

## 1 - What to know before continuing.

This is a post on using the body.onCollide event with an instance of [Phaser.signal](/2018/10/04/phaser-signal/). So in other words this is one of many posts on using the phaser ce default [physics engine](/2018/10/27/phaser-physics-getting-started/), and is not a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/). In this post I will be making use of many phaser ce features that I cover in other phaser ce posts of mine, I will try my best to link to other relevant content as needed.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser Community edition 2.11.1 of [phaser](https://phaser.io/) the javaScript powered game framework.

## 2 - Basic example of onCollide

For this basic example of body.onCollide I mad a quick project that involves a ball sprite that falls down onto a block, and when it hits the block it does damage to it. The block can be destroyed, and also re-spawn as well. Nothing to interesting but it will serve the purpose of demonstrating the use of the body.collide property just fine.

### 2.1 - The create ball helper

So I will want a method in which I create the ball that is to be used in the project. In this method I will be creating the sprite, enabling physics for it, and attach the on collide event. To do this I must first create an instance of Phaser.Signal and assign it to the body.onCollide property, this is to phaser knows that there is such an event set up for this ball sprite of mine. Once I have my Phaser.Signal instance I can attach a handler to it, in this handler I have access to the ball sprite, and the sprite that the ball has hit. For the sake of this example in the handler I just do damage to the block sprite.

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

So then I will also want a helper that ca be used to quickly create the block sprite that will be used for this example as well. Here I am not doing anything that special just creating the sprite, setting health for the sprite, and enabling physics for it as well. I will be setting the block as [immovable](/2018/11/08/phaser-physics-immovable/), this will make it so that when the ball hits the block sprite that block sprite will not bounce back.

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

So I will want to also create some quick assets for the sprites as well. In place of using an external image I often use a [canvas solution](/2018/08/04/phaser-spritesheet-from-canvas/) for making sprite sheets for thse kinds of projects.

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

So now that I have my helpers worked out it is time to use them with a [Phaser.Game](/2017/10/11/phaser-main-game-constructor/), and [state Object](/2017/10/06/phaser-state-objects/). In the create method I call my helpers to set everything up, and also make a [text object](/2017/10/14/phaser-text/) to display the status of the blocks health.

In the update method of the state object I check for collision between the ball and block. I also update the text on each tick, and check to see if the block has been destroyed if so I re spawn it.

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

So using body.onCollide is a great way to set up one or more events that are to be fired when a sprite collides with another sprite. It goes without saying that this can be very useful when working with most projects that involve sprites moving around an colliding with each other.