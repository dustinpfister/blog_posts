---
title: Setting an out of bounds event in phaser ce
date: 2018-10-25 21:29:00
tags: [js,phaser]
layout: post
categories: phaser
id: 312
updated: 2018-10-28 14:38:58
version: 1.13
---

For this post I will be writing about a [Phaser ce](https://photonstorm.github.io/phaser-ce/) example that I built around the [onOutOfBounds event](https://photonstorm.github.io/phaser-ce/Phaser.Events.html#onOutOfBounds) for sprites. This event will fire if the sprites checkWorldBounds boolean is set to true, and can be used to define some logic that will fire each time a sprite leaves the game world. This event is useful for bringing sprites back to a pool to be reuse again when working with groups, and the example will also cover that as well. In any case this post should give readers a better sense of how to dead with sprites that go out of bounds when making a phaser ce powered game with javaScript.

<!-- more -->

## 1 - What to know

This is a post on using the onOutOfBounds event in phaser ce to define some logic for what to do when a sprite goes out of bounds. In this post I am also using a lot of other phaser ce features, I will try to link to other relevant content where it is called for to help with anything that you might not be familiar with. If you are new to phaser you might want to start with my [getting started post on phaser ce](/2017/10/04/phaser-getting-started/) first, and a background with javaScript in general is required as well which should go without saying.

## 2 - The onOutOfBounds example

For this example I have a project that creates a pool of enemy sprites that will spawn from the bottom of the screen, and then move up to the top of the screen. Once they go out of bounds after reaching the top the onOutOfBounds event will fire resulting in the player losing health, and the enemy being killed which will case it to potentially be reused.

### 2.1 - The onOutOfBounds handler

This is the handler that will fire each time an enemy reaches the top of the screen, here I check that the y value is indeed less than zero, and so set its y value back to a starting y value, as well as deduct health from the player, and preform other necessary actions.

```js
// what to do when an enemy does out of bounds
var onOutOfBounds = function (enemy) {
    var game = this.game;
    if (enemy.y <= 0) {
        enemy.y = game.world.height + 32;
        enemy.kill();
        game.data.health -= 10;
        if (game.data.health <= 0) {
            game.data.gameOver = true;
        }
    }
 
};
```

So now that I have my handler I will need to attach it to one or more sprites that make use of it, so I will want a method that will create a pool of enemies and within there I will attach this handler for each sprite.

### 2.2 - Create a pool of enemies

Here I have a method that I can use to create a pool of enemies. For each enemy I attach my onOutOfBounds hander by attaching it via enemy.events.onOutOfBounds, but first I make sure to set the checkWorldBounds boolean to true as well or else the event will not fire. In this method I also do whatever else is called for each child in the enemies sprite pool.

```js
// create a pool of enemies
var createEnemySpritePool = function (game) {
 
    var data = game.data,
    i = 0,
    len = 4;
    data.enemies = game.add.group();
 
    while (i < len) {
        // create the enemy sprite
        var space = game.world.width / len;
        var enemy = data.enemy = game.make.sprite(space * i + space / 2, game.world.height + 32, 'sheet-enemy');
        enemy.anchor.set(0.5, 0.5);
 
        // set checkWorldBounds, and attach a handler
        enemy.checkWorldBounds = true;
        enemy.events.onOutOfBounds.add(onOutOfBounds, this);
 
        // the player can kill an enemy without loosing health
        enemy.inputEnabled = true;
        enemy.events.onInputDown.add(function (enemy) {
            enemy.y = game.world.height + 32;
            enemy.kill();
        });
 
        enemy.data.PPS = 32;
        enemy.kill();
        data.enemies.add(enemy);
        i += 1;
    }
 
};
```

All the enemies will start of as dead by calling the kill command, this will not destroy the sprite, but place it in a dead state. I will then have a spawn method that will be called every so often that will revive the dead sprites at which point they will start to cross the screen.

### 2.3 - The Enemy Spawn method

Here Is a method that I will call with a timer every once in a while to revive dead sprites, and cause them to start to cross the screen.

```js
// spawn enemies
var enemySpawn = function () {
    var data = this.game.data,
    dead = data.enemies.filter(function (enemy) {
            return !enemy.alive;
        }),
    enemy,
    roll = Math.random();
 
    if (dead.list.length > 0 && roll < data.enemySpawnPer) {
        enemy = dead.list[Math.floor(Math.random() * dead.list.length)];
        enemy.data.PPS = 16 + Math.floor(32 * Math.random());
        enemy.revive();
    }
};
```

It would seem that there is no getRandomDead method built into phaser so I had to use Group.filter to filter out enemies that are alive, and then spawn a random index from that list so that they are not released in a predictable pattern sense I am keeping the x values of the sprites fixed.

### 2.4 - The sprite sheet

For this example I made a sprite sheet using canvas

```js
// Guy SPRITE SHEET
var createEnemySheet = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 16, 16);
    game.cache.addSpriteSheet('sheet-enemy', null, canvas, 16, 16, 1, 0, 0);
};
```

### 2.5 - The Phaser.game instance

Dow it is time to make the magic happen with an instance of Phaser.Game and a state object. Here I am using the helper methods that I have wrote about above, and well as setting up a game.data object that I often use as a way to store variables that will be used across the whole project.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        var data = game.data = game.data || {
            health: 100,
            gameOver: false,
            lt: game.time.physicsElapsedMS,
            enemyPPS: 32, // enemy pixles per second
            enemySpawnPer: 0.25
        };
 
        // create enemy sprite sheet and sprite pool
        createEnemySheet(game);
        createEnemySpritePool(game);
 
        // reset game if it is over
        game.input.onDown.add(function () {
            if (data.gameOver) {
                data.health = 100;
                data.gameOver = false;
            }
        });
 
        // text object
        var tx = data.tx = game.add.text(10, 10, '', {
                fill: 'white',
                font: '15px courier'
            });
 
        // enemy spawn loop
        game.time.events.loop(500, enemySpawn, this);
 
    },
 
    update: function () {
 
        var data = game.data,
        enemy = data.enemy,
        tx = data.tx;
 
        tx.text = 'health: ' + data.health;
        if (data.gameOver) {
            tx.text = 'game over: click to reset';
        } else {
            // move alive enemies by pixels per second going by elapsed game time
            data.enemies.forEachAlive(function (enemy) {
                enemy.y -= game.time.elapsed / 1000 * enemy.data.PPS;
            });
        }
 
    }
 
});
 
game.state.start('demo');
```

In the update method I am also using [game.time.elapse](/2018/10/26/phaser-time-elapsed/) as a way to have the sprites move over time by a pixel per second rate as well.
