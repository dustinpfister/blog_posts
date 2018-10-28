---
title: A Runner phaser plug-in example
date: 2018-10-23 17:14:00
tags: [js,phaser]
layout: post
categories: phaser
id: 310
updated: 2018-10-28 14:09:29
version: 1.18
---

Fot the next few days I would like to have some fun with [phaser ce](https://photonstorm.github.io/phaser-ce/index.html), and make some [plug-in](https://photonstorm.github.io/phaser-ce/Phaser.Plugin.html) examples. In this post I will be covering plug-ins that create the beginnings of a simple runner game. I hope to make a few posts like this where I start writing about how to go about making something that is starting to look like an actual game, rather than just simple demos that do not do much of anything interesting.

<!-- more -->

## 1 - what to know

This is a post on a phaser ce plug in-in that I made to serve as an example on how to make phaser plug ins to help keep things more organized as I start to make more complex projects in phaser. This is not a getting started post on phaser ce so if you are new to phaser you might want to start with my [getting started post](/2017/10/04/phaser-getting-started/) first. I am also using a lot of other features in phaser that I am not covering in detail in this post at least however I will link to other relevant posts where needed. I also wrote a post on [plugins in general](/2018/10/09/phaser-plugins/) as well that might be of interest as well.

## 2 - The Runner plugin

So for this example I made two plugins one for the runner sprite, and another for platforms that the runner can jump on to from the floor.

### 2.1 - The guy sheet helper, and start of plugin.

So I start off making the plugin by having everything in a function literal. When I use this plug in I will call this function in the create method of a state that makes use of it. At the top of the function I started off my making a createGuySheet helper that will create a simple box sprite sheet that will be used to represent the guy.

```js
var Plugin_runner = function (game, opt) {
 
    // Guy SPRITE SHEET
    var createGuySheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 16;
        canvas.height = 32;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 16, 32);
        game.cache.addSpriteSheet('sheet-guy', null, canvas, 16, 32, 1, 0, 0);
    };
```

For this helper I am using a canvas solution for making a simple sprite sheet for the sake of this demo, for more info on using canvas to make sprite sheets check out [my post on the subject](/2018/08/04/phaser-spritesheet-from-canvas/).

### 2.2 - Creating the guy sprite

Here I have a method that will create the guy sprite when called. In here I am setting up [physics values](/2018/10/27/phaser-physics-getting-started/), such as gravity. In addition I am also attaching a guyJump event handler for when the screen is clicked or pressed, or if the up arrow on a keyboard is pressed.

```js
// GUY SPRITE
    var createGuySprite = function (game) {
 
        var runner = game.data.runner,
        x = game.world.width / 2,
        y = game.world.height - 32,
        guy = runner.guy = game.add.sprite(x, y, 'sheet-guy');
        guy.anchor.set(0.5, 0.5);
 
        // physics
        game.physics.enable(guy);
        guy.body.collideWorldBounds = true;
        guy.checkWorldBounds = true;
        guy.body.gravity.set(0, 150);
 
        // making jumps event driven
        runner.cursors.up.onDown.add(guyJump, this);
        game.input.onDown.add(guyJump, this);
 
    };
```

### 2.3 - On guy jump

This the hander that is attached to the onDown [signal](/2018/10/04/phaser-signal/) of the keyboard [cursor keys](/2018/10/11/phaser-input-keyboard-cursorkeys/) instance, and also to the onDown of game.input as well so that it will fire each time the screen is pressed, or clicked, and if the keyboard up arrow button is pressed on desktop systems.

```js
 
    // the player wants to jump
    var guyJump = function () {
 
        var guy = this.game.data.runner.guy;
 
        if (guy.body.touching.down || guy.body.onFloor()) {
 
            guy.body.velocity.y = -175;
 
        }
 
    };
```

### 2.4 - The plugin object, and end of plugin

Here I am creating the actual plug-in object, and creating an init method that will be called once when the plugin is used in a project. Once I have everything set up I just need to add the plugin object to the game that will happen once the main factory function plugin_runner is called.

```js
    // The plugin Object
    var plug = new Phaser.Plugin(game, game.plugins);
 
    // call once
    plug.init = function (opt) {
 
        // create or append game.data
        game.data = game.data || {};
 
        var runner = game.data.runner = {};
 
        runner.cursors = game.input.keyboard.createCursorKeys();
 
        createGuySheet(game);
        createGuySprite(game);
 
    };
 
    // add the plugin to the game
    game.plugins.add(plug, opt);
 
};
```

## 3 - The platforms plug-in

Now that I have my runner plug-in I can then create additional plug-ins that can also work on there own, or add additional functionality to my runner plug-in. In this example I will be writing about a platforms plug in that will define the logic for a pool of platforms that are place at the far right of the game world off screen, and then move across the screen to provide something that the running guy can jump onto.

### 3.1 - The create platform sheet helper, and start of plugin

Just like the runner plugin I start off by defining a factory function that will contain everything that will be used in the body of the plugin.

```js
var Plugin_platforms = function (game, opt) {

    // create a platform sheet
    var createPlatformSheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 96;
        canvas.height = 16;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(0, 0, 96, 16);
        game.cache.addSpriteSheet('sheet-platfrom', null, canvas, 96, 16, 1, 0, 0);
    };
```

After that I again start off with a way to make a sprite sheet to be used with the plug-in. If I where to continue developing this I might make it so I can pass a key for an external sprite sheet, but for this example just a simple canvas solution will get the job done.

### 3.2 - create the platform sprite pool

Here I have a method that will create a pool of platform sprites by [making a group](/2018/08/24/phaser-groups/), and using the group.create method to create a bunch of platform sprites. I then also use the [Sprite.kill](/2018/09/13/phaser-sprite-events-onkilled/) method to place the platforms in a dead state to begin with, I will then use the Sprite.revive method to revive the platform sprites and place them into position as needed. I also [enable physics](/2018/10/27/phaser-physics-getting-started/) for each platform, and set up some physics values for collision and to make sure that they do not move when the guy jumps onto them.

```js
    // Create a Pool Of Platforms
    var createPlatfromPool = function (game) {
        var i = 0,
        len = 5,
        plat,
        platforms = game.data.platforms,
        pool = platforms.pool = game.add.group();
 
        while (i < len) {
 
            plat = pool.create(0, 0, 'sheet-platfrom');
 
            plat.kill();
 
            game.physics.enable(plat);
            plat.body.immovable = true;
 
            plat.body.checkCollision.left = false;
            plat.body.checkCollision.right = false;
            plat.body.checkCollision.down = false;
 
            i += 1;
        }
 
    };
```

### 3.3 - Update platforms

```js
    var updatePlatfroms = function (game) {
 
        var platforms = game.data.platforms,
        platPool = platforms.pool,
        plat;
 
        // revive
        if (platPool.countDead() > 0 && platforms.lastPlatDist >= 96) {
            plat = platPool.getFirstDead();
            plat.revive();
            plat.x = game.world.width;
            plat.y = game.world.height - 32 - Math.floor(Math.random() * 100);
            platforms.lastPlatDist = 0;
        };
 
        // For All Alive
        platPool.forEachAlive(function (plat) {
 
            // move
            plat.x -= platforms.delta;
 
            // kill if old
            if (plat.x + plat.width <= 0) {
                plat.kill();
            }
 
        });
 
        platforms.lastPlatDist += platforms.delta;
 
    };
```

### 3.4 - The plugin object, and init method.

```js
    var plug = new Phaser.Plugin(game, game.plugins);

    // call once
    plug.init = function (opt) {
 
        // create or append game.data
        game.data = game.data || {};
 
        //var runner = game.data.runner;
        var platforms = game.data.platforms = {};
        platforms.lastPlatDist = 0;
        platforms.delta = 5;
 
        createPlatformSheet(game);
        createPlatfromPool(game);
 
        game.time.events.loop(33, function () {
 
            //runner.distnace += runner.delta;
 
            updatePlatfroms(game);
 
        });
 
    };
```

### 3.5 - The update method

```js
    // what to do for each tick
    plug.update = function () {
 
        var runner = game.data.runner,
        platforms = game.data.platforms;
 
        if (runner) {
 
        game.physics.arcade.collide(platforms.pool, runner.guy);
 
        }
 
    };
 
    // add the plugin to the game
    game.plugins.add(plug, opt);
 
};
```

