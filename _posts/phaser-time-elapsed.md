---
title: Game time that is subject to pause in phaser ce
date: 2018-10-26 20:45:00
tags: [js,phaser]
layout: post
categories: phaser
id: 313
updated: 2018-10-27 17:37:13
version: 1.6
---

When working with time in [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) it is often important to now use game.time.now, or a new javaScript date object by itself. Unless you are making a project where things do need to progress with real world time, in most projects it is necessary to have game time be a subject to a pause event, or inactivity. The vale that is returned by [game.time.elapsed](https://photonstorm.github.io/phaser-ce/Phaser.Time.html#elapsed) is the about of time in milliseconds that has elapsed sense the last frame tick. In addition it is.a value that will not keep getting larger as real world time goes by when the game is pause or the window is inactive. As such the elapsed time is great for moving display objects by a pixels per second value, as the display objects will not jump forward if the game is inactive for a sec. So in this post I will be going over some use case examples of the elapsed property in the time object in phaser ce.

<!-- more -->

## 1 - What to know before continuing.

This is a post on the game.time.elapsed property is phaser ce that gives the amount of time that has passed sense the last frame update in milliseconds, and is subject to game pause events. As such this is an advanced post on phaser ce and is not a getting started post on phaser ce or javaScript in general.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser ce 2.11.1 of [phaser](https://phaser.io/).

## 2 - Moving a sprite by a pixels per second rate.

On use case example of game.time.elapse would be an example that moves a sprite by a pixel per second rate. This helps to ensure that a sprite will always move as the same rate regardless of how fast or slow a device might be, and the value is also automatically adjusted by phaser when the project goes inactive due to a pause of inactive windows event.

### 2.1 - The make Sprite method

In this method I am making a sprite and setting a pixel per second value to the data object of the sprite. I am also creating an update method for the sprite that will use game.time.elapsed to move the sprite. In addition I am also making use of Phaser Wrap method to make the sprite wrap back around to the beginning of the game world when it goes out of bounds.

```js
var makeSprite = function (game) {
    var sprite = game.data.sprite = game.add.sprite(10, 10, 'sheet-box');
    // setting a pixels per second value for sprite.data
    sprite.data.pps = 128;
    // setting an update method for the sprite
    sprite.update = function () {
        // using game.time.elapsed to figure deltaX
        var deltaX = game.time.elapsed / 1000 * sprite.data.pps;
        sprite.x = Phaser.Math.wrap(sprite.x += deltaX, -8, game.world.width + 8);
    };
};
```

### 2.2 - The create box sheet method

This method uses canvas to create a simple sprite sheet for the example.

```js
var createBoxSheet = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 8;
    canvas.height = 8;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 8, 8);
    game.cache.addSpriteSheet('sheet-box', null, canvas, 8, 8, 1, 0, 0);
};
```

### 2.3 -

```js
// the Phaser game instance
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
game.state.add('pps', {
    create: function () {
        game.data = {};
        createBoxSheet(game);
        makeSprite(game);
    }
});
game.state.start('pps');
```