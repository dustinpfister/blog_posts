---
title: Making a Sprite physics body immovable in phaser ce
date: 2018-11-08 14:38:00
tags: [js,phaser]
layout: post
categories: phaser
id: 325
updated: 2018-11-26 10:28:08
version: 1.19
---

When working out things with physics in [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) there may be a need to set some display objects as immovable when hit by another display object physics body. So that is to not make it so the display object is immovable at all, just immovable when hot by another object.

<!-- more -->

## 1 - What to know before continuing.

This is a post on making display objects not move when hit by another display object when working out physics for a game made with phaser ce as a game framework. This is not a [getting started post](/2017/10/04/phaser-getting-started/) with physics in phaser ce or with phaser ce in general. In this post I am using many aspects of the framework that you should know a thing or two about before hand.

### 1.1 - This is a phase ce 2.x post

In this post I am using phaser Community Edition 2.11.1 of [phaser](https://phaser.io/)

## 2 - An example of body.immovable

For this example I made a quick project that involves an immovable sprite that is placed at the center of the game world, and a bunch of sprites that move around the rest of the screen wrapping back around when the leave the bounds of the game world, and of course bounce off the immovable object when they hit it.

### 2.1 - making an immovable sprite

Here I have a helper method that will be used to make the immovable sprite. When I call this it will add the sprite to a game.data object that I create in the state object later. Making a sprite immovable is as simple as just setting the body.immovable boolean to true after physics have been enabled for the sprite.

```js
var mkImmovable = function (game) {
 
    var imm = game.data.immovable = game.add.sprite(game.world.centerX - 32, game.world.centerY - 32, 'blocks', 0);
    imm.width = 64;
    imm.height = 64;
 
    // enable physics and set immovable
    game.physics.enable(imm);
    imm.body.immovable = true;
 
};
```

### 2.2 - Making a group of sprites

Here I have a method that will be used to create a [group of sprites](/2018/08/24/phaser-groups/).

```js
var mkGroup = function (game) {
 
    var group = game.data.group = game.add.group(),
    sprite,
    radian,
    dist,
    i = 0,
    len = 5;
    while (i < len) {
        radian = Math.PI * 2 / len * i;
        dist = Math.random() * 30 + 70;
        sprite = game.make.sprite(
                game.world.centerX + Math.cos(radian) * dist,
                game.world.centerY + Math.sin(radian) * dist, 'blocks', 1);
        game.physics.enable(sprite);
        sprite.body.velocity.set(
            Math.cos(radian) * -100,
            Math.sin(radian) * -100);
        sprite.body.bounce.set(1, 1);
        group.add(sprite);
        i += 1;
    }
 
};
```

### 2.3 - Making a sprite sheet with canvas

Here I have a method that will add a simple [sprite sheet using canvas](/2018/08/04/phaser-spritesheet-from-canvas/) as a way to do so rather than bothering with an external sprite sheet.

```js
// just make a simple block sheet
var mkBlockSheet = function (game) {
 
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
 
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#af0000';
    ctx.fillRect(0, 0, 32, 32);
    ctx.strokeRect(0, 0, 32, 32);
 
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(32.5, 0, 31, 32);
 
    game.cache.addSpriteSheet('blocks', null, canvas, 32, 32, 2, 0, 0);
 
};
```

### 2.4 - The Phaser.game instance

Now it is time to pull it all together with a Phaser.game instance and a state object. Here I create the sprite sheet, the immovable sprite, and the group of sprites in the create method of the single state object. In the update method I check for collision for each moving sprite in the group to set if a sprite hit the immovable sprite of another sprite.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        game.data = {};
 
        mkBlockSheet(game);
        mkImmovable(game);
        mkGroup(game);
 
    },
 
    update: function () {
 
        game.data.group.forEach(function (sprite) {
 
            sprite.x = Phaser.Math.wrap(sprite.x, -8, game.world.width + 8);
            sprite.y = Phaser.Math.wrap(sprite.y, -8, game.world.height + 8);
 
            game.physics.arcade.collide(sprite, game.data.group);
            game.physics.arcade.collide(sprite, game.data.immovable);
 
        });
 
    }
 
});
 
game.state.start('demo');
```

## 3 - Conclusion

Setting a sprite as immovable is a fairly straight forward process of just setting the proper boolean in the body object true. No not let the immovable name of the property fool you though, and immovable sprite can still be moved as well. For example if making a breakout clone the paddle, and the blocks are examples of physics enabled sprites that I would want to set as being immovable. I hope you enjoyed this post on phaser ce, if you have any questions or concerns let me know in the comments, and thank you for reading.
