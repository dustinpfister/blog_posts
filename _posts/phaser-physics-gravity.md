---
title: Playing with gravity in phaser ce
date: 2018-10-28 20:58:00
tags: [js,phaser]
layout: post
categories: phaser
id: 315
updated: 2018-10-28 21:08:48
version: 1.3
---

As of late I am diving into expanding my content on [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) and have gotten into the arcade physics engine. Todays post will be on [gravity](https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.Body.html#gravity), setting values for gravity is pretty straight forward if you just want to have all objects be pulled down to the ground. In that case all that is required is to set the sprite.body.gravity.y property to a desired value. However with other projects it can get a little complicated, so I have started this post for outlining some use case examples of gravity in phaser ce.

<!-- more -->

## 1 - What to know before continuing.

This is a post on setting gravity for physics enabled sprites in phaser ce. This is not a getting started post on phaser ce, or javaScript in general.

### 1.1 - This is a phase ce 2.x post

In this post I am using phaser Community Edition 2.11.1 of [phaser](https://phaser.io/)


```js
var updateGravity = function (game) {
 
    // clear gravity of all balls
    game.data.group.forEach(function (ball) {
        ball.body.gravity.set(0, 0);
    });
 
    // set gravity between balls
    game.data.group.forEach(function (ball1) {
        game.data.group.forEach(function (ball2) {
            var d = ball1.position.distance(ball2),
            a = ball2.position.angle(ball1);
            if (d <= 200 && ball2.data.i != ball1.data.i) {
                var per = d / 200;
                ball1.body.gravity.x -= Math.cos(a) * 20 * (1 - per);
                ball1.body.gravity.y -= Math.sin(a) * 20 * (1 - per);
            }
        });
    });
 
};
```

```js
var makeBall = function (game) {
 
    game.data = game.data || {};
 
    var ball = game.data.ball = game.make.sprite(game.world.centerX, 0, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);
 
    // enable physics
    game.physics.enable(ball);
 
    ball.body.collideWorldBounds = true;
 
    return ball;
 
};
```

```js
var createBallGroup = function (game) {
 
    var group = game.data.group = game.add.group(),
    per,
    ball;
 
    var i = 0,
    len = 2;
    while (i < len) {
 
        per = i / len;
        ball = makeBall(game);
 
        ball.x = 50 + 250 * per;
        ball.y = 100;
        ball.data.i = i;
 
        group.add(ball);
 
        i += 1;
 
    }
 
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
 
        game.data = {};
 
        createBallSheet(game);
 
        createBallGroup(game);
 
        // clear gravity of all balls
        game.data.group.forEach(function (ball) {
 
            console.log(ball.body.gravity);
 
        });
 
        //var ball = game.data.group.children[0];
        //ball.body.gravity.set(0, 0);
 
    },
 
    update: function () {
 
        updateGravity(game);
 
    }
 
});
 
game.state.start('ball-bounce');
```
