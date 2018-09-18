---
title: Setting sprite transparency in phaser with Sprite.alpha
date: 2018-09-18 14:26:00
tags: [js,phaser]
layout: post
categories: phaser
id: 282
updated: 2018-09-18 17:07:51
version: 1.9
---

Setting sprite [transparency](https://en.wikipedia.org/wiki/Alpha_compositing) in [Phaser ce](https://photonstorm.github.io/phaser-ce/) is pretty simple, I just need to set the [Sprite.alpha](https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html#alpha) value to a number value between 0, an 1.  There is also playing around with the alpha values in canvas when making sheets that way, but why bother with that when Sprite.alpha works just fine. Never the less I thought I would make a quick post on this, and some other sprite related topics just for the fun of it.

<!-- more -->

{% phaser 'phaser-sprite-alpha/main.js' %}

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

The spawn method will be used with a timer event to create a new sprite every so often up until a certain limit is reached. In this method I also attach some events including one that calls my Sprite.data onDeath method that will begin the death alpha transparency effect. This is pulled off with the [Sprite.events.onKilled](/2018/09/13/phaser-sprite-events-onkilled/) event for handing what happens when the Sprite is killed when [Sprite.damage](/2018/09/17/phaser-sprite-health/) is called enough times when the player clicks a sprite.

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

Now that I have a module together it is time to use all of this stuff by making a [Phaser.Game instance](/2017/10/11/phaser-main-game-constructor/), and at least a few state objects. In many of these examples I like to at least separate things into a boot state, and another state that runs the actual example. In the boot state I make a sprite sheet with canvas, and the game.cache.addSpriteSheet method. The boot state is also the place where I often set the scroll, and scale properties and anything else to that effect.

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
 
        // scrolling
        game.scale.compatibility.scrollTo = false;
        game.scale.pageAlignHorizontally = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.width = document.getElementById(game.parent).scrollWidth;
        game.scale.height = document.getElementById(game.parent).scrollHeight;

        // start demo
        game.state.start('demo');

    }
 
});
```

Once all that is set up the game will then progress to the actual demo state.

#### 2.5 - The demo state.

In the demo state I set up my game.data object by calling the Blocks.setup method that I outline above, and then also start the loop that will call my spawn method every second. In the update loop I loop over every block that is currently in a group, and step the blocks by there current delta values that I set in the method that sets up my Sprite.data objects.

```js
game.state.add('demo', {
 
    create: function () {
 
        Blocks.setup(game);
 
        // spawn loop
        game.time.events.loop(1000, Blocks.spawn, this);
 
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

The result if all goes well is a simple Sprite.alpha example where sprites move across the canvas, and when clicking on them they undergo a death process as well.