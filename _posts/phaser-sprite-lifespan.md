---
title: Setting sprite lifespan in phaser ce
date: 2018-10-10 13:23:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 302
updated: 2018-10-10 15:50:54
version: 1.14
---

When making some games with [Phaser ce](https://photonstorm.github.io/phaser-ce/) there might come a time when it is necessary to set a millisecond time limit to the existence of a sprite until it is killed. This will come up with things like particles and other short lived sprites that are to just exist on the screen for a short while and then end up in a killed state to be revived later when needed. This is where the [sprite.lifespan](https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html#lifespan) property can be of use to quickly get this working in a project compared to making a custom solution for this. In this post I will be covering a simple example that makes use of the lifespan property of sprites to set a time limit for how long a sprite will be at play.

<!-- more -->

## 1 - What to know before continuing

In this post I am using the sprite.lifespan property to set an amount of time that a sprite is to remain alive in a game until it is automatically killed once that amount of time elapses. I am also using many other aspects of the phaser ce javaScript powered game framework such as [groups](/2018/08/24/phaser-groups/), along with [many others](/categories/phaser/). In other words this is not a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/) or javaScript in general and I trust that you have spent at least a little time getting up to speed with these things.

## 2 - An example of Sprite.lifespan

For an example of Sprite.lifespan I put together a quick example that involves a button sprite that will result in a bunch of sprites springing from the single button sprite when clicked. The sprites will have random lifespans and will spring up and out and fall down by way of gravity. Also as the lifespan of a sprite runs out, and alpha transparency effect will also be in effect on the sprites as then reach death. Once the lifespan time runs out the sprites will be killed automatically by phaser, but will still exist in a group I made from them, ready to be revived once again.

### 2.1 - A launchBalls method that sets Sprite.lifespan

Here is the method that will fire when the main button sprite is clicked. This will result in causing each sprite in the group that is dead to be revived and have its position set to the location of the button. Then I set the velocity to some random values that will cause the ball sprites to go up, and away from the button. Here I also set the Sprite.lifeSpan property to a value between 500 and 3000 milliseconds.

```js
var launchBalls = function () {
 
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

In this example this method will fire each time the button sprite is clicked, the so I will need more method for creating that button sprite, and attaching this method to an event hander for it. Also there is much more that needs to be done such as creating the group of sprites, adding an alpha transparency effect, and more. However the basic idea of the Sprite.lifespan property by itself is all ready covered. One way or another the Sprite needs to be revived, and have it's lifespan property set to a desired millisecond value, once that is done the sprite will automatically be killed by phaser when the time is up.


### 2.2 - An Alpha effect for the ball sprites

So it would be nice to also have an alpha transparent effect to go along with the use of the Sprite.lifespan property. That is that the sprites will become more transparent as they approach the end of there lifespan. So I will just want a method that I can call in an update method that will go over all the alive sprites in the group, and set the alpha values of each depending on the current lifespan value.

```js
var alphaEffect = function (game) {
 
    var ballPool = game.data.ballPool;
 
    ballPool.forEachAlive(function (ball) {
 
        ball.alpha = ball.lifespan / 3000;
 
    })
 
};
```

### 2.3 - Create a pool of ball sprites

So before I can use the Sprite.lifespan property or anything else to that effect I will need my group of sprites. So I made a method that ca be used to create that, and set up things for each sprite in the group. I will want to make sure each sprite starts out dead by calling the Sprite.kill command. This method will not destroy the sprites completely just put them in a dead state that can then be revived at a later point.

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

I also enabled physics for the sprites so I can set velocity when the launchBalls method is called, and I am also sure to set gravity for the sprites as well so that they fall down to the bottom of the screen as well.

### 2.4 - create a sprite sheet with canvas

So I will also want a sprite sheet for both the balls in the group, as well as for my button sprite as well. For these simple examples I often go with a canvas solution to quickly create simple on the fly graphics.

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

### 2.5 - create a button sprite that when clicked will launch the balls

So then I will also want to have the sprite that will cause the balls in the group to launch out when clicked, so I made a simple method to encapsulate everything that has to do with that as well. I just create the sprite using the same sheet as the balls in the group as well. but use a different frame index. I then set the side of the button sprite, and make sure that input is enabled. The of course I attach the lanuchBalls event I covered earlier in this post with the onInputDown event.

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

There is also a special [button display object](/2018/08/14/phaser-buttons/) as well in phaser that can be used for these kinds of sprites as well that may have been a better choice for this kind of project. If you are making a rel project that will involve a mechanic such as this, which is common in many clicker or idle style games then it might be better to go with the button class instead of just a plain old sprite like I did here.

### 2.6 - Bringing it all together with Phaser.Game

So now it is time to tie all these helper method together into a working example by creating the Phaser.Game instance, and calling the methods in the create method of a state object, as well as calling the alpha effect method in the update method.

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

If you want to learn more about state objects you might want to check out my post on theme, it is an important feature of phaser that a developer should be solid with in phaser ce game development.