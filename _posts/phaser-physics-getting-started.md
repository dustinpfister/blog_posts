---
title: Getting started with physics using phaser ce
date: 2018-10-27 18:16:00
tags: [js,phaser]
layout: post
categories: phaser
id: 314
updated: 2018-10-28 19:34:35
version: 1.11
---

So there are javaScript projects that one can learn the ins and outs in just a few hours or a day or two, and then there are javaScript projects like [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) where it can take a good part of a month or even a whole lot longer just to get a good grasp about everything it has to offer before event starting to get into the [Physics Manager](https://photonstorm.github.io/phaser-ce/Phaser.Physics.html) it comes with.

Now that I have covered a great deal about phaser when it comes to the basics such as [state objects](/2017/10/06/phaser-state-objects/), [groups](/2018/08/24/phaser-groups/), [making sprite sheets with canvas](/2018/08/04/phaser-spritesheet-from-canvas/) it is time to get into some use case examples in which I am using the physics engines that come with phaser.

<!-- more -->

## 1 - What to know before continuing.

it goes without saying that th subject of [physics](https://en.wikipedia.org/wiki/Physics) is a broad topic, and I am not going to even scratch the surface in this post. As such in this post I am just going to cover a simple bouncing ball example using the default arcade physics engine in phaser ce. This is not a getting started post with phaser ce, or javaScript in general, a good starting point might be [my getting started post on phaser ce](/2017/10/04/phaser-getting-started/) if you are new to phaser. Aslo you might want to check out [my many other posts on phaser ce](/categories/phaser/) to learn all the basics of phaser ce before getting into the physics manager.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser Community edition 2.11.1 of [phaser](https://phaser.io/). As such the code examples in the post might break in older or newer major release of phaser.

## 2 - A bounding Ball example

So if you are just starting out with using a physics engine in phaser ce A good start would be just a simple bounding ball example. So lets get this one out of the way. The Phaser.Physics.Arcade physics engine is running by default with phaser so there is no need to call [physics.startSystem](https://photonstorm.github.io/phaser-ce/Phaser.Physics.html#startSystem) to start that engine which will be used in this example.

### 2.1 - The create ball helper

So this helper will create a ball sprite, and enable physics for the sprite which will make it so I now have a Sprite.body property that contains many THREE.Point values that can be used to set things like gravity, bounce, and drag. For this example I also make sure to set the body.collideWorldBounds boolean set to true so that the ball will bounce off the boundaries of the game world.

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

### 2.2 - The create ball sheet helper

Here I have a simple helper that creates a sprite sheet for the ball using canvas.

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

### 2.3 - The Phaser.game instance

Now it is time to get the example working by calling the helpers in the create method of a state object that I will be adding to a [Phaser.game](/2017/10/11/phaser-main-game-constructor/) instance.

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

If all goes well the ball will drop down to the bottom of the game world, and then bounce back up almost to where it started, and then repeat until it stops bouncing completely. If I comment out the line that sets body.drag, the ball will keep bouncing indefinitely, and if I do the same with body.bounce the ball will just hit the bottom of the screen once and stop there.

## 3 - Conclusion