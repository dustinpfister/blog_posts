---
title: Getting a sprite that is closest to another sprite in a group in phaser
date: 2018-09-29 11:02:00
tags: [js,phaser]
layout: post
categories: phaser
id: 292
updated: 2018-10-01 18:19:56
version: 1.1
---

When working with a group of sprites in a [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) project a common task that comes up is to get a reference to a sprite in a group that is closest to another sprite. There are many ways of doing this that involve using a distance formula when looping over all active children in the group, however there is also a group method called group.getClosestTo that can be used to quickly get that sprite in question.

<!-- more -->

```js
// show the closest enemy in the enemies group
var showClosest = function (game) {
 
    var enemies = game.data.enemies,
    closest = enemies.getClosestTo(game.data.player);
 
    // set to selected frame
    closest.frame = 2;
 
};
```

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

```js
// create a player sprite
var createPlayer = function () {
 
    var player = game.data.player = game.add.sprite(0, 0, 'sheet-blocks', 0);
    player.x = game.world.centerX - 16;
    player.y = game.world.centerY - 16;
 
};
```

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
