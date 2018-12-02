---
title: Setting a Circle for collision detection in phaser 2
date: 2018-12-01 21:43:00
tags: [js,phaser]
layout: post
categories: phaser
id: 341
updated: 2018-12-01 22:01:30
version: 1.1
---

In this post on [phaser 2](https://photonstorm.github.io/phaser-ce/index.html) I will be writing about using the body.setCircle method to make the collision detection work with a circle shape rather than the default square shape.

<!-- more -->

## 1 - What to know before continuing.


```js
var createBall = function (game, x, y) {
 
    var ball = game.add.sprite(x, y, 'sheet-ball');
    game.physics.enable(ball);
    ball.body.setCircle(16);
    ball.body.bounce.set(1, 1);
    ball.anchor.set(0.5, 0.5);
    ball.body.collideWorldBounds = true;
 
    return ball
 
}
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
 
game.state.add('demo', {
 
    create: function () {
 
        game.data = {};
 
        createBallSheet(game);
 
        // placing a ball at the center
        var ball1 = game.data.ball1 = createBall(game, game.world.centerX, game.world.centerY);
 
        // placing ball2
        var angle = Math.PI / 180 * 45,
        distance = 100,
        ball2 = game.data.ball2 = createBall(game, ball1.x + Math.cos(angle) * distance, ball1.y + Math.sin(angle) * distance);
 
        // set velocity in direction of ball1
        angle = ball2.position.angle(ball1);
        ball2.body.velocity.set(Math.cos(angle) * 100, Math.sin(angle) * 100);
 
    },
 
    update: function () {
 
        var data = game.data;
 
        game.physics.arcade.collide(data.ball1, data.ball2);
 
    }
 
});
 
game.state.start('demo');
```

