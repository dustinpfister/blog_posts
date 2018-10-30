---
title: Playing with acceleration in phaser ce
date: 2018-10-29 17:33:00
tags: [js,phaser]
layout: post
categories: phaser
id: 316
updated: 2018-10-29 20:23:20
version: 1.8
---

For todays post on [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) I thought I would play around with acceleration. Doing so with phaser ce is just a matter of setting point values for the instance of Phaser.Point at Sprite.body.acceleration in a physics enabled Sprite. In this post I will be covering a simple silly use case example of how to go about working with acceleration in phaser ce, and also touch base on some other important tools available in the framework for doing so.

<!-- more -->

## 1 - What to know before continuing.

This is a post on setting acceleration for a sprite physics body in phaser ce. It is not a getting started post on physics in phaser ce, a getting started post with phaser, or with javaScript in general. To gain anything of value from this post it is important to start with the basics first, there is a whole lot to be aware with in phaser before starting to get into the arcade physics engine.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](http://phaser.io/).

## 2 -  Accelerating a ball based on distance from a point

In this example I am changing acceleration of a ball based on the distance and angle to another point of reference at the center of the game world. So in the post on top of using the Phaser.Point instance at Sprite.body.acceleration, I am also using Point methods like Point.angle, and Point.distance as well. This does not aim to be a practical example, just an exercise. In game projects acceleration is something that might be set with user input, or hitting a power up of some kind. In any case it will involve setting values at the Point instance at Sprite.body.acceleration.

### 2.1 - The updateAccleration method

Here is the method that is used to update acceleration on each frame tick.

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

### 2.2 - The Create Ball method

In the method I create the ball sprite, and enable physics for the sprite.

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

### 2.3 - Create the Ball Sprite Sheet

Here I am creating a simple sprite sheet to be used to skin the sprite with.

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

### 2.4 - The Phaser.Game instance

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

## 3 - Conclusion