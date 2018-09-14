---
title: The Sprite onKilled event in phaser
date: 2018-09-13 20:54:00
tags: [js,phaser]
layout: post
categories: phaser
id: 278
updated: 2018-09-14 17:34:19
version: 1.19
---

When making a [Phaser ce](https://photonstorm.github.io/phaser-ce/) powered javaScript game project there are of course sprites, and when working with sprites there are useful events. In this post the focus will be on the [sprite.events.onKilled](https://photonstorm.github.io/phaser-ce/Phaser.Events.html#onKilled) event in phaser ce. This is a signal that will fire when the sprite.kill method is called, which is very different from sprite.destroy. The kill method is what I would call if I want to set certain values to what would be appropriate if the sprite has been killed, but I do not want to actually destroy the sprite completely. So in this post I will be coving some use case examples for this method.

<!-- more -->

## 1 - Start here

In this post I am writing about the onKilled event that is fired when a sprite is killed with the sprite.killed method in phaser ce. There is also the onDestroy event that is fired when a sprite is completely removed from the game world, and cache completely. In most projects I like to have a pool of sprite objects that I reuse, rather than the alternative which would be a mechanic where there is no set maximum of enemies that can be in the world. In any case it is good to be ware of both of these events, as well as the many other events that are fired by game objects in phaser ce.

### 1.1 - This is a phaser ce 2.x post

In this post I am using [Phaser ce](https://photonstorm.github.io/phaser-ce/) 2.11.0, not the newer phaser 3.x major release of [phaser](https://phaser.io/).

## 2 - A full example using sprite.events.onKilled

For this posts full working example I made a simple little project that involves a pool of sprites that spawn from the upper left corner of the screen, and then move across the screen, [wrapping around within the screen](/2018/07/22/phaser-math-wrap-and-clamp/) when going out of bounds. When a sprite is clicked it looses hp, and will be killed when hp reaches zero. At which point the sprite.events.onKilled event will fire, in this example I have some logic that determines how many points the player should get when killing the enemy.

### 2.1 - My enemies.js file

So in this example I have an enemies.js file that contains many methods that help with the creating of a group of enemies, that is then used in my main.js file where I create an instance of Phaser.Game, and add some states to it. In this file I make a javaScript object literal, and append a few methods to it including a method that makes use of sprite.events.onKilled.

#### 2.1.1 - Staring off the Enemy module, and Enemy.setup

For this module I went with just the Object literal module pattern, which works fine for this example as it is okay that everything is public. I then start off with a setup method that I will call in a boot state when making the phaser game instance later.

```js
var Enemy = {};
 
// setup a game.data object
Enemy.setup = function () {
 
    this.game.data = {
 
        maxEnemies: 5,
        enemies: null,
        score: 0
 
    };
 
};
```

When I do call the setup method it will create an append a data object to the game instance when I call it with [Function.call](/2017/09/21/js-call-apply-and-bind/). Just appending a data object to the Phaser.Game instance is a common way to set some game wide variables.

#### 2.1.2 - The Enemy.onKill handler

Here is the handler that I will use with the sprite.events.onKill method.

```js
// The onKill method that will be called each time an enemy is killed
Enemy.onKill = function (sprite) {
 
    var game = this.game,
    spriteSpeed = (sprite.data.dx + sprite.data.dy) / 8,
    speedBonus = 175, // points bonus for speed.
    perKill = 25; // points per kill
 
    // score formula
    game.data.score += perKill + Math.floor(spriteSpeed * speedBonus);
 
};
```

So in this example each time an enemy is killed a points value will be figured out, and appended to the score property of my game.data object.

#### 2.1.3 - The Enemy.onInputDown handler

So another useful event is the sprite.events.onInputDown event. I this example I will want one of these attached for each sprite as well, so that when one is clicked by the player something happens in this case it looses a single hp point.

```js
// What happens when the player clicks an enemy
Enemy.onInputDown = function (enemy) {
 
    enemy.data.hp -= 1;
 
    if (enemy.data.hp === 1) {
        enemy.frame = 1;
    }
 
    if (enemy.data.hp <= 0) {
        enemy.kill();
    }
 
};
```

#### 2.1.4 - Generate Sprite Data objects

So this method will create a new data object for a sprite. The sprite.data object is an official phaser ce way of setting some values and methods for a sprite that are specific to the nature of the game itself that I am making. The sprite.data object is not used my phaser itself internally, so it is safe to do whatever seems right with it.

```js
// generate a data object for a sprite
Enemy.genSpriteData = function () {
 
    return {
        dx: Math.random() * 3.5 + 0.5,
        dy: Math.random() * 3.5 + 0.5,
        hp: 2
    };
 
};
```

In this example I will just be setting some delta values, and a hit point value.

#### 2.1.5 - Make a sprite sheet with canvas

So this is just a simple demo rather than a real serious game that consists of many lines of code. Never the less I am using sprites, and I will want a way to skin these sprites, even if they are just solid colored boxes. So for many of my examples for these posts I like to use a [canvas solution for making a sprite sheet](/2018/08/04/phaser-spritesheet-from-canvas/).

```js
// make a sprite sheet
Enemy.mkSheet = function (game) {
 
    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
 
    // blue frame
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 32, 32);
 
    // red frame
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(32, 0, 32, 32);
 
    game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 2, 0, 0);
 
};
```

#### 2.1.6 - Create a pool of enemies

So because this is an example of sprite.events.onKilled, I will be working with a pool of sprites. This is because of the differences between the sprite.kill, and the sprite.destroy methods. The sprite.kill method will set a bunch of properties of a sprite to a status that is that considered dead. The sprite can then later be reused by using a method like group.getFirstDead, or sprite.revive. This is very different from the sprite.destroy method that will completely remove the sprite from phaser all together.

```js
// create a group of enemies
Enemy.createEnemyPool = function () {
 
    var i = 0,
    data = this.game.data;
 
    // make data.enemies a new group
    data.enemies = game.add.group();
 
    // make a pool of enemies in the group
    while (i < data.maxEnemies) {
 
        var enemy = data.enemies.create(0, 0, 'sheet-block');
 
        // enemy starts out killed
        enemy.kill();
 
        // attach onKilled event
        enemy.events.onKilled.add(Enemy.onKill, this);
 
        // attach on input down event
        enemy.inputEnabled = true;
        enemy.events.onInputDown.add(Enemy.onInputDown, this);
 
        i += 1;
 
    }
 
};
```

So I am calling sprite.kill right after making the sprite to start it off in a dead state. I then have another method Enemy.spawn that will revive these at a set rate.

#### 2.1.7 - The spawn method

So here is my spawn method that will be called every second or so in the main state that will run this example.

```js
// re-spawn a dead enemy
Enemy.spawn = function (a) {
 
    var enemies = this.game.data.enemies;
 
    var dead = enemies.getFirstDead(false, 0, 0, 'sheet-block', 0);
 
    // if there is
    if (dead) {
 
        dead.data = Enemy.genSpriteData();
 
    }
 
};
```

Here I am using the group.getFirstDead method to get and revive the first dead sprite in the pool or group of sprites. In the event that they are all alive this method will return null, so i test if it is not before setting a new sprite.data object to it with the genSpriteData helper I made earlier.

#### 2.1.8 - An update method for the enemies

So when I make a module like this I often have an update method as well that will be called each time there is a frame tick in the main game state when making my state objects of the instance of Phaser.Game

```js
// What needs to happen for each frame tick
Enemy.update = function () {
 
    var data = this.game.data,
    game = this.game;
 
    // loop all enemies
    data.enemies.forEach(function (enemy) {
 
        // step position based on current deltas
        enemy.x = Phaser.Math.wrap(enemy.x += enemy.data.dx, -32, game.world.width + 32);
        enemy.y = Phaser.Math.wrap(enemy.y += enemy.data.dy, -32, game.world.height + 32);
 
    });
 
};
```

For this method I am using group.forEach to loop over all sprites an stepping there position with the current deltas in the sprite.data object.


### 2.2 - The Phaser.Game instance, and states

So now to tie everything to together with a Phaser.Game instance an a few state objects. For this example I just have a boot state, and a demo state, I guess I could just have everything in a single state, but I like to start off with this even for simple examples like this one. In a real game there will end up being a lot of state objects, this helps to break things down, making them more fine grain. Fine grain code is often easier to read, and debug.

#### 2.2.1 - The Phaser.Game instance, and boot state

So like always I create a new instance of Phaser.game, setting a mobile friendly resolution of 32- by 240. I just about always set the renderer to Phaser.AUTO, and often have a div in my html with an id attribute of 'gamearea'.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        // setup game data object
        Enemy.setup.call(this);
 
        Enemy.mkSheet(this.game);
 
        Enemy.createEnemyPool.call(this);
 
        // start demo, and do not clear the world
        game.state.start('demo', false, false);
 
    }
 
});
```

In my boot state I set up the game.data object with the Enemy.setup method, create the sprite sheet with Enemy.mkSheet, and set up the sprite pool with Enemy.createEnemyPool. Once way or another I need to share the instance of Phaser.Game with these methods, by passing them as an argument, or using Function.call to set the value of the this keyword.

#### 2.2.2 - The demo state

I start the game by starting the boot state, that will set some things up, and then start the actual demo state. In the demo state I start a loop that will call Enemy.spawn every second to spawn a new enemy, and create a text display object to display the current player score.

```js
game.state.add('demo', {
 
    create: function () {
 
        // call Enemy.spawn every second
        game.time.events.loop(1000, Enemy.spawn, this);
 
        // text display object to show score
        var text = game.add.text(5, 5, '', {
                fill: 'white'
            });
        text.name = 'disp-score';
 
    },
 
    update: function () {
 
        var data = this.game.data;
 
        Enemy.update.call(this);
 
        game.world.getByName('disp-score').text = 'score: ' + data.score;
 
    }
 
});
 
game.state.start('boot');
```

In the update method of the demo state I call my Enemy.update method, and update the score to the latest value in the game.data object created with Enemy.setup