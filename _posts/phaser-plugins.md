---
title: Starting out with plug-ins in phaser ce
date: 2018-10-09 18:34:00
tags: [js,phaser]
layout: post
categories: phaser
id: 301
updated: 2018-10-10 20:39:45
version: 1.18
---

So I finally got around to making my first [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) [plug in](https://photonstorm.github.io/phaser-ce/Phaser.Plugin.html), and now I am wishing that I look into how to go about doing this sooner. Although I have not been writing about it yet, I have bean working on a few prototypes for actual games, rather than simple little examples that just show how to work with one little thing in phaser ce. As such I am ruing into issues when it comes to how to go about keeping things well organized as a project grows in size. So far it looks like making plug-ins might be a better way of keeping things well structured compared to other options. So in this post I will me writing about how to make a basic plug-in, and also some slightly more complex examples as well.

<!-- more -->

## 1 - what to know

This is a post on how to make plug-ins in phaser ce a javaScript powered game framework. This is not a getting started post on phaser ce, or javaScript in general so I trust that you have at least some background with these topics. Phaser is a fairly complex framework, and it takes time to learn all the ins and outs, but it sure is worth the effort. If you run into trouble with the content of this post I have many other posts on phaser that have to do with other topics that are required before hand, and there is also the comments section on my site here as well if you find that something is missing in this post.

### 1.1 - This is a phaser ce (2.x post)

In this post I am using phaser community edition 2.11.0 of [phaser](https://phaser.io/)

## 2 - Basic phaser ce plug-in example

In this section I will be covering just a basic simple plug in design pattern. What needs to happen in any case is just the passing of an instance of Phaser.Plugin to game.plugins.add. The Plugin object can contain both an init, and update methods, and as such they are similar to state objects.

### 2.1 - The plug-in

One way or another a plain object, or better yet an instance of Phaser.Plugin needs to be passed to game.plugins.add, and this needs to be done in the create method of a state object. One way to design a plugin is to have a method that accepts the Phaser.game instance, and some options. Then I can create the plugin object by calling Phaser.plugin with the new keyword, and then pass the Phaser.game instance, and a reference to the plugin manager via game.plugins.

```js
// the first plugin
var myFirstPlugin = function (game, opt) {
 
    // create the plugin object
    var plugin = new Phaser.Plugin(game, game.plugins);
 
    // to be called once
    plugin.init = function (opt) {
 
        console.log('hello I am a plugin');
        console.log(opt.foo); // 'bar'
 
    };
 
    // to be called on each tick
    plugin.update = function () {
 
        console.log('tick');
 
    };
 
    // add the plugin
    game.plugins.add(plugin, opt);
 
};
```

I can then add init, and update methods just like that of a state object and then add the plugin to the plugin manger via game.plugins.add.

### 2.2 - The Phaser.Game instance 

I can then use the plugin by calling it in the create method of the state object in which I want to use it.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        myFirstPlugin(game, {
            foo: 'bar'
        });
 
    }
 
});
 
game.state.start('demo');
```

## 3 - Paddle plug-in

In this section I will be writing about a simple paddle plug-in. When this plug-in is used in the create method of a new state object it should result in a paddle that will move from right to left depending on input from the [keyboard](/2017/10/13/phaser-gameobj-input-keyboard/).

### 3.1 - On paddle collide helper

Here I have a method that will be called by the onCollide method of the paddle sprite. This is so that when this plug-in is used in conjunction with another plugging that will provide everything that has to do with a ball it will change the angle and speed of that ball based on where it hits the surface of the paddle.

```js
// What to do when something collides with the paddle
var onPaddleCollide = function (paddle, ball) {
 
    var max = paddle.width / 2 + ball.width / 2,
    fromCenter = Math.abs(ball.x - paddle.x),
    dir = ball.x - paddle.x < 0 ? 1 : -1,
    per = fromCenter / max,
    x = 0,
    y = 0,
    a = 0;
    // clamp per
    per = Phaser.Math.clamp(per, 0, 1);
    // set angle
    a = -Math.PI / 2 - Math.PI / 180 * 45 * per * dir;
    // set velocity
    x = Math.floor(Math.cos(a) * 200);
    y = Math.floor(Math.sin(a) * 200);
    ball.body.velocity.set(x, y);
};
```

### 3.2 - create sheet helper

Here I have a simple helper that will create a [sprite sheet with canvas](/2018/08/04/phaser-spritesheet-from-canvas/) for the paddle sprite. I just need to create a canvas element, and then get the 2d drawing context. Once I have a reference to the drawing context I can use the to draw a rectangle that will function as the image for the paddle. I can then pass the canvas element to game.cache.addSpriteSheet to add the sprite sheet to the games cache.

```js
// create sheet helper
var createPaddleSheet = function (game) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 96;
    canvas.height = 16;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 96, 16);
    game.cache.addSpriteSheet('sheet-paddle', null, canvas, 96, 16, 1, 0, 0);
};
```

This way I can pack everything for the functionality of the paddle into a single javaScript file, even the graphics.

### 3.3 - createPaddleSprite helper

Then I have a helper method for creating the paddle sprite. Here I create the sprite, and use the sheet that will be created with my createPaddleSheet helper. I also enable physics for this sprite, and make sure to make the paddle immovable. making the paddle sprite immovable does not mean it can not be moved, it just means that if something hits it it will not move. Here I also attach the onPaddleCollide handler as well.

```js
// create sprite helper
var createPaddleSprite = function (game) {
    var x = game.world.width / 2,
    y = game.world.height - 32,
    paddle = game.data.paddle.sprite = game.add.sprite(x, y, 'sheet-paddle');
    paddle.anchor.set(0.5, 0.5);
    // physics
    game.physics.enable(paddle);
    paddle.body.immovable = true;
    paddle.body.collideWorldBounds = true;
    paddle.body.drag.set(180, 0);
    paddle.body.collideWorldBounds = true;
    // collision
    paddle.body.onCollide = new Phaser.Signal();
    paddle.body.onCollide.add(onPaddleCollide);
};
```

### 3.4 - The paddle plug-in

```js
var Plugin_paddle = function (game, opt) {
 
    var plug = new Phaser.Plugin(game, game.plugins);
 
    // called once to set things up
    plug.init = function (opt) {
 
        // create or append game.data
        game.data = game.data || {};
        game.data.paddle = {};
 
        // start Arcade physics, should be the case by default but making sure
        // this will also reset, but not re-create Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
 
        // PADDLE SPRITE SHEET
        createPaddleSheet(game);
 
        // PADDLE SPRITE
        createPaddleSprite(game);
 
    };
 
    // on each tick
    plug.update = function () {
 
        // check keyboard
        var kb = game.input.keyboard,
        paddle = game.data.paddle.sprite,
        ball = game.data.ball;
 
        // if there is a ball, check for collision
        if (ball) {
            game.physics.arcade.collide(ball.sprite, paddle);
        }
 
        // set velocity based on keyboard
        if (kb.isDown(37)) {
            paddle.body.velocity.set(-200, 0);
        }
        if (kb.isDown(39)) {
            paddle.body.velocity.set(200, 0);
        }
 
    };
 
    // add the plugin to the game
    game.plugins.add(plug, opt);
 
};
```