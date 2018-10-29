---
title: Playing with acceleration in phaser ce
date: 2018-10-29 17:33:00
tags: [js,phaser]
layout: post
categories: phaser
id: 316
updated: 2018-10-29 17:42:06
version: 1.1
---

For todays post on [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) I thought I would play around with acceleration. Doing so with phaser ce is just a matter of setting point values for the instance of Phaser.Point at Sprite.body.acceleration in a physics enabled Sprite. In this post I will be covering a simple silly use case example of how to go about working with acceleration in phaser ce, and also touch base on some other important tools available in the framework for doing so.

<!-- more -->

## 1 - What to know before continuing.


```js
// a method to update acceleration based an angle and distance to a center point
var updateAcceleration = function (game) {
 
    var ball = game.data.ball,
    pointCenter = new Phaser.Point(game.world.centerX, game.world.centerY),
    angle = ball.position.angle(pointCenter) - Math.PI / 2,
    distance = ball.position.distance(pointCenter);
 
    // update acceleration
    ball.body.acceleration.set(Math.cos(angle) * distance/2 + 1, Math.sin(angle) * distance/2 + 1);
 
};
```

```js
var createBall = function (game) {
 
    game.data = game.data || {};
 
    var ball = game.data.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);
 
    // enable physics
    game.physics.enable(ball);
 
    // set some values
    ball.body.bounce.set(1, 1);
    ball.body.collideWorldBounds = true;
 
};
```

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
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('ball-bounce', {
 
    create: function () {
 
        game.data = {
            tick: 0,
            tickMax: 100
        };
 
        createBallSheet(game);
        createBall(game);
 
        game.data.tx = game.add.text(10, 10, '', {
                fill: 'white',
                font: '10px courier'
            });
 
    },
 
    update: function () {
 
        var ball = game.data.ball;
 
        updateAcceleration(game);
 
        game.data.tx.text = 'speed: ' + ball.body.speed.toFixed(2) +
            ', acc (x,y): ' + ball.body.acceleration.x.toFixed(2) + ',' + ball.body.acceleration.y.toFixed(2);
 
    }
 
});
 
game.state.start('ball-bounce');
```