---
title: Getting a sprite that is closest to another sprite in a group in phaser
date: 2018-09-29 11:02:00
tags: [js,phaser]
layout: post
categories: phaser
id: 292
updated: 2018-10-01 19:38:40
version: 1.10
---

When working with a group of sprites in a [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) project a common task that comes up is to get a reference to a sprite in a group that is closest to another sprite. There are many ways of doing this that involve using a distance formula when looping over all active children in the group, however there is also a group method called group.getClosestTo that can be used to quickly get that sprite in question.

<!-- more -->

## 1 - what to know

This is a post on finding the closest display object such as a sprite in a group in phaser ce. In this post I am using many different classes, and other aspects pf phaser ce that I am not going to get into detail. I have written a getting started post on phaser ce that you might want to start with if you are new to phaser ce, I also have other posts on groups in phaser including one that is a starting post of sorts on that subject.

## 2 - A Basic example of group.getClosestTo in phaser ce

For a basic example of using group.getClosestTo I put together a simple demo that will just set the closest sprite to a player sprite in a group of randomly positioned sprites to a certain frame index. In this post I make use of a canvas solution to make a quick sprite sheet, and also make use of the group.scatter method to randomize the sprites, another group convenience method for doing so.

### 2.1 - The showClosest method

First off we have a method that will be used to set the frame index of the sprite that is closest to the player sprite. In this method I get a reference to an enemies group, and the player sprite both of which will be set up later before this is called. The group.getClosestTo method can then just be called off of the instance of the enemies group, passing the reference to the player sprite. Simply enough this should return the sprite that is closest to the player sprite, and I can then set the frame index of that sprite.

```js
// show the closest enemy in the enemies group
var showClosest = function (game) {
 
    var enemies = game.data.enemies,
    closest = enemies.getClosestTo(game.data.player);
 
    // set to selected frame
    closest.frame = 2;
 
};
```

### 2.2 - Make a simple sprite sheet

So then I will need at least one sprite sheet that will have at least three frames, one for the player block, and then two for the two different states of the enemy blocks. In a real project I will have many sprite sheets and frames for each, but for this simple demo combining everything into one should work just fine.

```js
// make a sprite sheet
var mkSheet = function (game) {
 
    // basic block sprite sheet, made with canvas
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 96;
    canvas.height = 32;
 
    // player block
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 32, 32);
 
    // enemy block
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(32, 0, 32, 32);
 
    // enemy selected block
    ctx.fillStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.fillRect(64, 0, 32, 32);
    ctx.strokeRect(65.5, 1.5, 29, 29);
 
    game.cache.addSpriteSheet('sheet-blocks', null, canvas, 32, 32, 3, 0, 0);
 
};
```

### 2.3 - Create a group of enemies

I then have a method that will create a group of enemies. Here I just create the group with game.add.group, and then use group.create to create a bunch of sprites. I then also use the group.scatter method to randomly scatter the sprites across the canvas.

```js
// create a group of enemies
var createEnemies = function (game) {
 
    var enemies = game.data.enemies = game.add.group();
    var i = 0,
    enemy,
    len = 15;
    while (i < len) {
        enemies.create(0, 0, 'sheet-blocks', 1);
        i += 1;
    }
 
    enemies.scatter(new Phaser.Rectangle(0, 0, game.world.width - 32, game.world.height - 32));
 
};
```

### 2.4 - Create a player sprite

I then have a method that will create a player sprite that will be given to group.getClosestTo to get the enemy sprite that is closest to the player sprite.

```js
// create a player sprite
var createPlayer = function () {
 
    var player = game.data.player = game.add.sprite(0, 0, 'sheet-blocks', 0);
    player.x = game.world.centerX - 16;
    player.y = game.world.centerY - 16;
 
};
```

Not much of anything fancy here just creating a sprite, and placing it in the center.

### 2.5 - Tie everything together with Phaser.Game

Now I just need to tie everything together with a Phaser.Game instance, and a single state object. In the create method I create the game.data object that will contain references to my sprites, and then call my mkSheet method. Once I have done that I then create the enemies, and the player sprite. Finally I call my showClosest method that makes use of group.getClosestTo to the the frame index of the closest sprite to that of an index value that is not that of the player or any other enemies sprite.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        game.data = game.data || {};
 
        mkSheet(game);
 
        createEnemies(game);
 
        createPlayer(game);
 
        showClosest(game);
 
    }
 
});
 
game.state.start('boot');
```

## 3 - Conclusion

So the group.getClosestTo method comes in handy for quickly getting the sprite in a group that is closest to the given sprite object. One of many convenience methods in phaser ce that can be used to help save time with these common tasks in game development. Hope you enjoyed this post, and be sure to have fun with phaser.
