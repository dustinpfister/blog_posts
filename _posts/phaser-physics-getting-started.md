---
title: Getting started with physics using phaser ce
date: 2018-10-27 18:16:00
tags: [js,phaser]
layout: post
categories: phaser
id: 314
updated: 2018-10-28 16:14:57
version: 1.3
---

So there are javaScript projects that one can learn the ins and outs in just a few hours or a day or two, and then there are javaScript projects like [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) where it can take a good part of a month or even a whole lot longer just to get a good grasp about everything it has to offer before event starting to get into the [Physics Manager](https://photonstorm.github.io/phaser-ce/Phaser.Physics.html) it comes with.

Now that I have covered a great deal about phaser when it comes to the basics such as state objects, groups, makijng sprite sheets with canvas it is time to get into some use case examples in which I am using the physics engines that come with phaser.

<!-- more -->

## 1 - What to know before continuing.


```js
var createBall = function () {
 
    game.data = game.data || {};
 
    var ball = game.data.ball = game.add.sprite(game.world.centerX, 0, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);
 
    // enable physics
    game.physics.enable(ball);
 
    // set some values for gravity, bounce, and drag
    ball.body.gravity.set(0, 100);
    ball.body.bounce.set(1, 1);
    ball.body.drag.set(10, 10);
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
 
        createBallSheet(game);
 
        createBall(game);
 
    }
 
});
 
game.state.start('ball-bounce');
```