---
title: The deal with Pausing a game in phaser
date: 2018-09-08 10:50:00
tags: [js,phaser]
layout: post
categories: phaser
id: 277
updated: 2018-09-08 18:08:09
version: 1.6
---

So when making a game with [Phaser ce](https://photonstorm.github.io/phaser-ce/) one of the many subjects that come up is how to handle pausing the game. There are many ways to do this such as having an array of update methods, and have it so that there is a string value that will result in a different update method that will not update or change the game state in any way. However there is also of course a phaser ce built in way to pause the game as well, it is just a simple boolean value in the game object instance. There is also the pause method of a state object that can be used to define some logic that will be called once this boolean is set true by whatever means. In any case this post will be an overview of what to know about when it comes to making a pause feature in a phaser ce project.

<!-- more -->

## 1 - What to know

This is a post on using the pause property of a game object in phaser ce to pause a game. Phaser Ce is the community edition of phaser a javaScript powered game framework.


## 2 - A simple example of game.pause

So I could just say that game.pause is what one would use to pause, and unpause a game, but for the sake of this post I made an example of this. The puase boolean will need to be toggled true, and back to false somehow, such as an input event. In this example I will be just throwing something together that is just a simple animation that ends up paused when the screen is clicked or pressed, an unpaused when such an event happens again.

### 2.1 - A create sheet helper

So The animation for this example will just be a bunch of block sprites moving around in a circle. Not much of anything to get excited over, but will serve the point of this post just fine. So I will need a helper that can be used to make a simple sprite sheet that will be used for the blocks.

```js
var createSheet = function () {
 
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
 
    this.game.cache.addSpriteSheet('sheet', null, canvas, 32, 32, 1, 0, 0);
 
};
```

This is a nice way to just quickly make a sprite sheet using canvas. For simple examples like this where I am just showcasing how to get started with game.pause as a way to pause a game in phaser ce and that is it, a solution like this is fine.

### 2.2 - create sprites helper

So when I have my sprite sheet I will want a way to create a bunch of sprites.

```js
var createSprites = function () {
    var i = 0,
    count = 10,
    obj;
    // create sprites
    while (i < count) {
        obj = this.game.add.sprite(0, 0, 'sheet');
        obj.name = 'block' + i;
        i += 1;
    }
 
    obj = game.add.text(game.world.centerX, game.world.centerY, '', {
            fill: 'white'
        });
    obj.name = 'text';
    obj.anchor.set(0.5, 0.5);
 
};
```

This method will be called in a boot state, after calling the method that creates the sheet that it uses.

### 2.3 - move sprites helper

For there to be some animation there will need to be a way to bring about a little movement. This movement will just serve as a way to have something to, well pause. In a real game using phaser this simple animation will be the game.

```js
var moveSprites = function () {
 
    var per = this.game.data.i / 120,
    r = Math.PI * 2 * per,
    i = 0,
    count = 10,
    sprite;
 
    // move sprites around
    while (i < count) {
 
        a = Math.PI * 2 * (i / 10);
 
        sprite = this.game.world.getByName('block' + i);
        sprite.x = game.world.centerX - 16 + Math.cos(r + a) * 50;
        sprite.y = game.world.centerY - 16 + Math.sin(r + a) * 50;
        i += 1;
 
    }
 
    this.game.data.i += 1;
    this.game.data.i %= 120;
 
};
```

### 2.4 - The phaser game instance, and the boot state.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        createSheet.call(this);
 
        game.state.start('demo');
 
    }
 
});
```

### 2.5 - The demo state

```js
game.state.add('demo', {
 
    create: function () {
 
        createSprites.call(this);
 
        this.game.data = {
            i: 0
        };
 
        this.game.input.onDown.add(function () {
 
            this.game.paused = !this.game.paused;
 
        });
 
    },
 
    // this will fire once when the game is paused
    paused: function () {
 
        // display paused message
        this.game.world.getByName('text').text = 'paused';
 
    },
 
    // update will run if the game is not paused
    update: function () {
 
        moveSprites.call(this);
 
        // display nothing if update is running
        this.game.world.getByName('text').text = '';
 
    }
 
});
 
game.state.start('boot');
```