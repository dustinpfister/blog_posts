---
title: Setting sprite transparency in phaser with Sprite.alpha
date: 2018-09-18 14:26:00
tags: [js,phaser]
layout: post
categories: phaser
id: 282
updated: 2018-09-18 16:32:04
version: 1.5
---

Setting sprite transparency in [Phaser ce](https://photonstorm.github.io/phaser-ce/) is pretty simple, I just need to set the [Sprite.alpha](https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html#alpha) value to a number value between 0, an 1.  There is also playing around with the alpha values in canvas when making sheets that way, but why bother with that when Sprite.alpha works just fine. Never the less I thought I would make a quick post on this, and some other sprite related topics just for the fun of it.

<!-- more -->

## 1 - what to know

This is a post on setting Sprite alpha transparency in phaser ce, using Sprite.alpha. In other words this is a post on a very specific topic with phaser the javaScript powered game framework. I trust that you have at least some background with javaScript and phaser in general.

### 1.1 - This is a phaser ce (2.x) post

When I wrote this post I was using phaser ce 2.11.0, and not the later 3.x versions of [phaser](https://phaser.io/).

## 2 - An example involving blocks

For an example of using Sprite.alpha to set sprite transparency I made a quick project that involves some simple solid color sprites moving around the canvas. The Sprites will become less transparent the further away they are from the center of the canvas. The sprites will also go threw a transparency effect before they are destroyed when clicked.

### 2.1 - Starting off the Blocks module, and setup method.

So to start things off I made a Blocks module that will contain everything that I will be using to set up this example when making my state objects later on. For many of these examples I just go with a simple object literal module design because it works okay, and it is also okay that everything is public, for this example at least.

```js
var Blocks = {};
 
// setup the game.data object
Blocks.setup = function (game) {
 
    game.data = {
 
        maxEnemies: 5,
        enemies: game.add.group(),
        score: 0
 
    };
 
};
```

The Blocks.setup method will set up my game.data object which is the typical way I go about storing things that I will want to use across states.

### 2.2 - Setting Sprite.alpha with the Sprite.data object

I made a Blocks.setSpriteDataObject helper that will attach properties and method to the [Sprite.data](/2018/09/14/phaser-sprite-data/) object. When this helper is used two methods are added to the data object of the sprite given that both help manage alpha transparency effects. One of them is meant to be called on each frame tick and will help with the effect where the transparency will change depending on the distance to the center of the canvas. The other sets up a death animation that will also be caries out by the method that is called on each frame tick.

```js
// setup a data object for a given sprite
Blocks.setSpriteDataObject = function (game, sprite) {
 
    var data = sprite.data;
 
    data.i = 0;
    data.i_max = 50;
    data.sprite = sprite;
 
    data.dx = Math.random() * 2 + 1;
    data.dy = Math.random() * 2 + 1;
 
    // to be called on each frame tick
    data.tick = function (game) {
 
        if (this.sprite.alive) {
 
            // sprites when alive the alpha value will get higher
            // if it is closer to the center of the canvas
 
            var d = Phaser.Math.distance(this.sprite.x + 16, this.sprite.y + 16, game.world.centerX, game.world.centerY);
            d = Phaser.Math.clamp(d, 0, 100);
 
            this.sprite.alpha = 1 - 0.75 * (d / 100);
 
        } else {
 
            // if dead a sprites alpha starts at 1
            // and goes down two zero
            this.i += 1;
            this.sprite.alpha = 1 - this.i / this.i_max;
 
            // destroy the sprite completely
            // when done
            if (this.i >= this.i_max) {
                this.sprite.destroy();
            }
 
        }
 
    };
 
    // what to do when killed
    data.onDeath = function () {
 
        this.dx = 0;
        this.dy = 0;
        this.sprite.exists = true;
        this.sprite.frame = 1;
        this.i = 0;
 
    };
 
};
```

### 2.3 - The spawn method

```js
// spawn another enemy
Blocks.spawn = function (game) {
 
    var data = this.game.data;
 
    if (data.enemies.length < data.maxEnemies) {
 
        // create a new enemy
        var enemy = data.enemies.create(-32, -32, 'sheet-block');
 
        // set health
        enemy.health = 1;
 
        // setup a data object for the sprite
        Blocks.setSpriteDataObject(game, enemy);
 
        // events
        enemy.events.onKilled.add(function (enemy) {
            enemy.data.onDeath();
        });
        enemy.inputEnabled = true;
        enemy.events.onInputDown.add(function (enemy) {
            enemy.damage(1);
        });
 
    }
 
};
```

### 2.4 - The Phaser.Game instance, and boot state

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
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
 
        // start demo, and do not clear the world
        game.state.start('demo', false, false);
 
    }
 
});
```

#### 2.5 - The demo state.

```js
game.state.add('demo', {
 
    create: function () {
 
        Blocks.setup(game);
 
        // spawn loop
        game.time.events.loop(1000, Blocks.spawn, this);
 
        var text = game.add.text(5, 5, '', {
                fill: 'white'
            });
        text.name = 'disp';
 
    },
 
    update: function () {
 
        var data = this.game.data,
        game = this.game;
 
        data.enemies.forEach(function (enemy) {
 
            enemy.x = Phaser.Math.wrap(enemy.x += enemy.data.dx, -32, game.world.width + 32);
            enemy.y = Phaser.Math.wrap(enemy.y += enemy.data.dy, -32, game.world.height + 32);
 
            enemy.data.tick(game);
 
        });
 
    }
 
});

game.state.start('boot');
```