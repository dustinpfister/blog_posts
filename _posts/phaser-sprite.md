---
title: Sprites in phaser ce, what to know.
date: 2018-11-26 11:46:00
tags: [js,phaser]
layout: post
categories: phaser
id: 337
updated: 2018-11-27 09:50:32
version: 1.14
---

When it comes to making an html 5 game with javaScript and [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) as a front end game framework, [Sprites](https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html) are central to just about any kind of game project. There is a lot to cover with sprites when it comes to creating Sprite sheets, hit detection, motion and physics, handing groups of sprites, among many other topics as well. So I can not possible cover everything there is to write about when it comes to sprites, but I can at least cover the basics, as well as link to other posts on my site that might help cover most of what there is to know about sprites in phaser ce.

<!-- more -->

## 1 - What to know before hand

In this post I am writing about the basics of sprites, and in addition this post acts as a central index for many other topics surrounding the use of Sprite display objects in phaser ce, the javaScript powered html5 game framework. This is not a getting started post with phaser ce, or javaScript in general so I trust that you have logged at least some time with phaser, and maybe even have some experience with them so far and just want to know some more about them. If you are new to phaser ce you might want to start with [my post on getting started with phaser ce](/2017/10/04/phaser-getting-started/).

## 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](https://phaser.io/). If you run into problems reproducing the code examples here be sure to start with the version number first. As of this writing phaser ce 2.x is not the latest major release of phaser and the code here might break on newer major release of phaser.

## 2 - Basic example of making a Sprite in phaser ce.

For starters here is a very basic example that uses a sprite sheet that is generated using the canvas 2d drawing api. Once I have a sprite sheet to work with in phasers cache, I can then use it to create a sprite sheet using that sheet.

### 2.1 - Using canvas to make a simple block sprite sheet

I have a post that I wrote a while back in which I get into [using canvas to make sprite sheets](/2018/08/04/phaser-spritesheet-from-canvas/) in detail, So I will not be getting into detail with this. However the basic idea is to just create a canvas, draw to it with the 2d canvas drawing api, and then pass the canvas to the addSpriteSheet method as extra data, after passing null for what would be a url sense I am not loading an external sprite sheet.

```js
var mkBlockSheet = function () {
 
    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
 
    // blue block
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 32, 32);
 
    game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, 1, 0, 0);
 
};
```

### 2.2 - Making the sprite

Once I have my sprite sheet I can now use it my passing the key of the sprite sheet as the third argument, after pasing the starting x, and y position. In phaser there is game.add.sprite, and game.make.sprite. In this example I am using game.add.sprite which results in the sprite being created, and being stored in the phaser cache.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example1', {
 
    create: function () {
 
        mkBlockSheet(game);
 
        var sprite = game.add.sprite(32, 32, 'sheet-block');
 
    }
 
});
 
game.state.start('example1');
```

## 3 - Enabling physics

So now that we have worked out how to just place a sprite on a screen it might be nice to get it to do something. It is possible to just manually move a sprite around by stepping the x and y properties of the sprite object manually, and for some projects that might be the way to do it. However phaser does come with a fairly impressive physics engine built in, and it is enabled by default. I will not be covering every little detail about the physics engine here of course, this post is going to be long enough to begin with. However I have a [getting started with physics in phaser ce](/2018/10/27/phaser-physics-getting-started/) post that would be a good starting point.

To physics enable a sprite I just need to call game.physics.eanble and pass a reference to the sprite to which I want to enable physics for. Once That is done there is then a physics body for the sprite that i can then set values for things like gravity, bounce, and velocity.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// enabling physics
game.state.add('example2', {
 
    create: function () {
 
        mkBlockSheet(game);
 
        var sprite = game.add.sprite(32, 32, 'sheet-block');
 
        // enabling physics
        game.physics.enable(sprite);
 
        // set some gravity, and bounce
        sprite.body.gravity.set(0, 100);
        sprite.body.bounce.set(1, 1);
 
        // collide with wourld bounds
        sprite.body.collideWorldBounds = true;
 
    }
 
});
 
game.state.start('example2');
```

## 4 - Sprite Data Objects

Another feature of Sprites to be aware of is the [data object of a sprite](/2018/09/14/phaser-sprite-data/). This is the standard object to use when it comes to parking any kind of data with a single sprite instance. In this simple example I am just using the data object to store a per pixel rate that the sprite is to move by.

```js
// data objects
game.state.add('example3', {
 
    create: function () {
 
        mkBlockSheet(game);
 
        var sprite = game.add.sprite(32, 32, 'sheet-block');
 
        sprite.name = 'block';
        sprite.data.pps = 128;
 
    },
 
    update: function () {
 
        var sprite = game.world.getByName('block');
 
        // move the sprite by per pixel rate
        sprite.x += game.time.elapsed / 1000 * sprite.data.pps;
 
        // wrap sprite when it goes out of bounds
        sprite.x = Phaser.Math.wrap(sprite.x, -32, game.world.width + 32);
 
    }
 
});
 
game.state.start('example3');
```

in a real example I might use the data object to store an instance of some kind of class that contains all kinds of properties and methods that have to do with that sprite. The data Object is just a plain  old object that is not used by phaser internally, if I really wanted to I could just append some other object to the sprite as well as long as I do not overwrite anything. So this is just the standard way of setting any kind of data that should be associated with the sprite.