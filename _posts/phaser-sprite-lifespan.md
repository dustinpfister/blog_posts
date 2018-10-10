---
title: Setting sprite lifespan in phaser ce
date: 2018-10-10 13:23:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 302
updated: 2018-10-10 14:40:59
version: 1.2
---

When making some games with [Phaser ce](https://photonstorm.github.io/phaser-ce/) there might come a time when it is necessary to set a millisecond time limit to the existence of a sprite until it is killed. This will come up with things like particles and other short lived sprites that are to just exist on the screen for a short while and then end up in a killed state to be revived later when needed. This is where the lifespan property can be of use to quickly get this working in a project compared to making a custom solution for this. In this post I will be covering a simple example that makes use of the lifespan property of sprites to set a time limit for how long a sprite will be at play.

<!-- more -->

## 1 - What to know before continuing

In this post I am using the sprite.lifespan property to set an amount of time that a sprite is to remain alive in a game until it is automatically killed once that amount of time elapses. I am also using many other aspects of the phaser ce javaScript powered game framework such as groups, and the sprite.kill method, along with many others. In other words this is not a getting started post on phaser ce or javaScript in general and I trust that you have spent at least a little time getting up to speed with these things.

## 2 - An example of Sprite.lifespan

```js
var lanuchBalls = function () {
 
    var ballPool = game.data.ballPool,
    button = game.data.button;
 
    ballPool.forEachDead(function (ball) {
 
        // revive and set some values
        ball.revive();
        ball.x = button.x;
        ball.y = button.y;
        ball.body.velocity.set(-100 + Math.floor(200 * Math.random()), Math.floor(-50 - 150 * Math.random()));
        ball.alpha = 1;
 
        // setting lifespan to 500 - 3000ms
        ball.lifespan = 500 + Math.floor(2500 * Math.random());
 
    });
 
};
```

```js
var alphaEffect = function (game) {
 
    var ballPool = game.data.ballPool;
 
    ballPool.forEachAlive(function (ball) {
 
        ball.alpha = ball.lifespan / 3000;
 
    })
 
};
```

```js
var createBallSpritePool = function (game) {
 
    game.data = game.data || {};
 
    var ballPool = game.data.ballPool = game.add.group();
    i = 0,
    len = 10;
    while (i < len) {
 
        // sprites start out dead, but will be revived
        var sprite = ballPool.create(0, 0, 'sheet-ball', 0);
        sprite.anchor.set(0.5, 0.5);
        sprite.kill();
 
        game.physics.enable(sprite);
        sprite.body.gravity.set(0, 200);
 
        i += 1;
    }
 
};
```

```js
var createBallSheet = function (game) {
 
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
 
    canvas.width = 32;
    canvas.height = 16;
 
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(8, 8, 6, 0, Math.PI * 2);
    ctx.fill();
 
    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.closePath();
    ctx.arc(24, 8, 6, 0, Math.PI * 2);
    ctx.fill();
 
    game.cache.addSpriteSheet('sheet-ball', null, canvas, 16, 16, 2, 0, 0);
};
```

```js
var createButton = function (game) {
 
    var button = game.data.button = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball', 1);
    button.width = 128;
    button.height = 128;
    button.anchor.set(0.5, 0.5);
    button.inputEnabled = true;
    button.events.onInputDown.add(lanuchBalls);
    game.world.moveDown(button);
 
};
```

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        createBallSheet(game);
        createBallSpritePool(game);
        createButton(game);
 
    },
 
    update: function () {
 
        alphaEffect(game);
 
    }
 
});
 
game.state.start('boot');
```