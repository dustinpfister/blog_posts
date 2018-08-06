---
title: Moving around in the phaser world
date: 2018-08-05 20:42:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 250
updated: 2018-08-06 16:36:06
version: 1.4
---

In phaser the world is where all game display objects are. It is a 2d, well, world in which these display objects can move around by way of player input, or some kind of ai script. In this post I will be writing about some examples in which I am just creating one or more display objects, and then moving around in this world. There are some basic thiongs one should know about such as how to have the camera follow a sprite, which is often desirable for most projects. So this should be a fun post.

<!-- more -->

## 1 - What to know

This is a post on the html 5 game framework known as phaser ce. In addition to this it is a post on a narrow topic on the phaser world object. although I am writing about a full working example in this post, I will not be getting into the world object in detail. This is also of course not a getting started post on phaser, and javaScript in general. However I have many other posts on phaser, and I am always working on adding more context, and updating older stuff as well.

## 2 - An example of having a sprite move around in a phaser world.

For an example of this I will want a phaser project that involves one sprite that is under player control, and a whole bunch of other sprites littered all over the screen as a way to know that the player object is moving around. So one way or another I will need to make some display objects. I will want to make the world bigger than the native size, and pan around in this world. I might want to set some boundaries, and have it so the camera follows the player sprite.

### 2.1 - My sheet from canvas method

In this demo I am using my sheet from canvas method. This is a quick little method I worked out for making a sprite sheet with a canvas element. I get into this method, and subject in greater detail in my post on this subject. It's not that involved so I will copy and post the source code here.

```js
var sheetFromCanvas = function (opt) {
 
    var f,
    per,
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
 
    opt = opt || {};
    opt.name = opt.name || '';
    opt.frames = opt.frames || 3;
    opt.frameWidth = opt.frameWidth || 32;
    opt.frameHeight = opt.frameHeight || 32;
    opt.forFrame = opt.forFrame || function () {};
    opt.game = opt.game || null;
 
    canvas.width = opt.frameWidth * opt.frames;
    canvas.height = opt.frameHeight;
 
    f = 0;
    while (f < opt.frames) {
        per = f / opt.frames;
        opt.forFrame.call({
            f: f,
            sx: opt.frameWidth * f + 0.5,
            per: per,
            canvas: canvas,
            ctx: ctx
        }, ctx);
        f += 1;
    }
 
    // add a new sheet to cache if we have a game
    if (opt.game) {
        opt.game.cache.addSpriteSheet(opt.name, null, canvas, opt.frameWidth, opt.frameHeight, opt.frames, 0, 0);
    }
 
    // return the canvas
    return canvas;
 
};
```

This allows for me to make both static sprites, and animations with just the canvas 2d context. If you prefer to use an external sheet you will want to look into my post on using the [sprite loader](/2017/10/12/phaser-spritesheets/), or find some other way to make some display objects.


### 2.2 - The example

 Here I am just creating a single state, with a single create, and update method. When making the phaser game instance, the first two arguments that I pass to the constructor is the width and height of the camera. By default the size of the world will be the same as the camera, for many projects this is fine, however for the same of this post I will want to set it higher than that with game.world.resize in the create method.

So the following

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
game.world.resize(640,480);
```
Will result in a camera having a width, and height of 320,240. However the size of the actual world will be twice that, so this will result in a world that is bigger than the screen, and I can move around in it. However I will of course want the camera to follow a sprite, typically on that is under player control. One quick way to do this is to use the target property of the phaser camera.

```js
// the player sprite
player = game.add.sprite(0, 0, 'sheet-player', 0);
player.name = 'player';
 
// have the camera follow the player sprite
game.camera.target = player;
```

The full source code of an example of having a sprite move around in a phaser world is as follows.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.data = {
 
    cursors: null
 
};
 
game.state.add('world-demo', {
 
    create: function () {
 
        var i,
        sprite,
        player,
        len,
        x,
        y
 
        // set world size twice that of the native camera size
        // given to the phaser camera constructor
        game.world.resize(640, 480);
 
        // making a sheet for objects
        sheetFromCanvas({
 
            game: game,
            name: 'sheet-object',
            frames: 1,
            forFrame: function (ctx) {
 
                ctx.fillStyle = '#0000ff';
                ctx.fillRect(0, 0, 32, 32);
 
            }
 
        });
 
        // a sheet for the player
        sheetFromCanvas({
 
            game: game,
            name: 'sheet-player',
            frames: 1,
            forFrame: function (ctx) {
 
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(0, 0, 32, 32);
 
            }
 
        });
 
        // place some objects in the world
        i = 0;
        len = 20;
        while (i < len) {
 
            x = Math.floor(Math.random() * (game.world.width - 32));
            y = Math.floor(Math.random() * (game.world.height - 32));
 
            sprite = game.add.sprite(x, y, 'sheet-object', 0);
            sprite.name = 'object' + i;
 
            i += 1;
 
        }
 
        // the player sprite
        player = game.add.sprite(0, 0, 'sheet-player', 0);
        player.name = 'player';
        player.data = {
            dx: 0,
            dy: 0
        };
 
        // keyboard cursor keys
        game.data.cursors = game.input.keyboard.createCursorKeys();
 
        // have the camera follow the player sprite
        game.camera.target = player;
 
    },
 
    // update loop
    update: function () {
 
        var player = game.world.getByName('player'),
        cursors = game.data.cursors;
 
        // data the deltas based a keyboard input
        if (cursors.right.isDown)
            player.data.dx += .25;
        if (cursors.left.isDown)
            player.data.dx -= .25;
        if (cursors.down.isDown)
            player.data.dy += .25;
        if (cursors.up.isDown)
            player.data.dy -= .25;
 
        // crude friction
        player.data.dx /= 1.05;
        player.data.dy /= 1.05;
        if (player.data.dx > 0 && player.data.dx <= 0.1)
            player.data.dx = 0;
        if (player.data.dx < 0 && player.data.dx >= -0.1)
            player.data.dx = 0;
        if (player.data.dy > 0 && player.data.dy <= 0.1)
            player.data.dy = 0;
        if (player.data.dy < 0 && player.data.dy >= -0.1)
            player.data.dy = 0;
 
        // clamp deltas
        player.data.dx = Phaser.Math.clamp(player.data.dx, -5, 5);
        player.data.dy = Phaser.Math.clamp(player.data.dy, -5, 5);
 
        // add to player pos by deltas
        player.x += Math.floor(player.data.dx);
        player.y += Math.floor(player.data.dy);
 
        // clamp player pos
        player.x = Phaser.Math.clamp(player.x, 0, (game.world.width - 32));
        player.y = Phaser.Math.clamp(player.y, 0, (game.world.height - 32));
 
    }
 
});
 
game.state.start('world-demo');
```