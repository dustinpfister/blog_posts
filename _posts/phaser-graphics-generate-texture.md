---
title: Generating a texture with graphics to use with sprites in phaser ce
date: 2018-11-20 16:17:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 334
updated: 2018-11-20 18:32:12
version: 1.8
---

So I have wrote a [post on how to make sprite sheets with canvas](/2018/08/04/phaser-spritesheet-from-canvas/), which seems to work okay as a way to generate graphics to use in a [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) game project without loading an external image. However in this post I will be writing about how to go about doing so with phaser graphics display objects. Also for whatever the reason it might be nice to just generate textures in generate for whatever the reason using phaser graphics, so in this post I will be writing about some use examples of the [generateTexture method](https://photonstorm.github.io/phaser-ce/Phaser.Graphics.html#generateTexture) of the Phaser Graphics class.

<!-- more -->

## 1 - what to know

In the content of this post I am writing about a method in the graphics class of phaser ce that can be used to convert the current state of a graphics display object to a texture that can then be used to skin sprites. If you are new to phaser ce you might want to start with [my getting started post on phaser ce](/2017/10/04/phaser-getting-started/), also if you are new to using graphics display objects you might want to start with my [post on graphics in general](/2017/10/21/phaser-graphics/) as well.

## 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](https://phaser.io/).

## 2 - Basic example of Graphics.generateTexture.

Whenever I create a graphics object the generateTextxure method can eb called to create an instance of [PIXI.texture](https://photonstorm.github.io/phaser-ce/PIXI.Texture.html) this can the be used anywhere where a texture can be used such as with a sprite.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('basic', {

    // create method
    create: function () {
 
        var gfx = game.add.graphics(0, 0);
 
        gfx.beginFill(0x00ff00);
        gfx.drawRect(0, 0, 32, 32);
        gfx.visible = false;
 
        var texture = gfx.generateTexture();
 
        var sprite = game.add.sprite(32, 32, texture);
 
    }
 
});
 
game.state.start('basic');
```

In this example I cam creating a graphics object and making it so it is not visible. However I am creating a texture from that graphics object and then using it to skin a sprite that is visible.

## 2 - Making a sprite sheet with graphics

So another use case example of Graphics.generateTexture would be to use it to create a sprite sheet with at least two or more frames. Doing so involves creating the state of the graphics that I want with the usual drawing methods, and then creating a texture like before for starters. However this time I need to pass the source property of the baseTexture property of the texture that is returned with Graphics.generateTexture. The image that is located at the source property is what I can pass as data for the game.cache.addSpriteSheet method.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('mksheet', {
 
    // create method
    create: function () {
 
        // create graphics
        var gfx = game.make.graphics(0, 0);
        gfx.lineStyle(3, 0xffffff, 1);
        gfx.visible = false;
 
        // draw frame 0
        gfx.moveTo(16, 3);
        gfx.lineTo(29, 29);
        gfx.lineTo(3, 29);
        gfx.currentPath.shape.closed = true;
 
        // draw frame 1
        gfx.moveTo(48, 29);
        gfx.lineTo(35, 3);
        gfx.lineTo(61, 3);
        gfx.currentPath.shape.closed = true;
 
        // creating a sprite sheet with generateTexture
        game.cache.addSpriteSheet('sheet', null, gfx.generateTexture().baseTexture.source, 32, 32, 2, 0, 0);
 
        // creating a sprite with the sheet
        var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet', 0);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = 100;
        sprite.height = 100;
 
        // step frame index every second
        game.time.events.loop(1000, function () {
            sprite.frame += 1;
            sprite.frame = sprite.frame %= 2;
        });
 
    }
 
});
 
game.state.start('mksheet');
```

## 3 - Custom resolution

Another thing about Graphics.generateTexture is that the resolution can be set with the first argument that by default has a value of 1. The documentation does not explain what the standard is with it, but it looks like it is a value that can be between 0 and 1.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('res', {
 
    // create method
    create: function () {
 
        // create graphics
        var gfx = game.add.graphics(0, 0);
        gfx.lineStyle(3, 0xffffff, 1);
        gfx.moveTo(16, 3);
        gfx.lineTo(29, 29);
        gfx.lineTo(3, 29);
        gfx.currentPath.shape.closed = true;
        gfx.visible = false;
 
        // create textures with different resolutions
        var i = 0,
        sprite,
        texture,
        len = 9;
        while (i < len) {
 
            texture = gfx.generateTexture(.15 + 0.85 * (i / len));
            game.add.sprite(0 + 32 * i, 32, texture);
 
            i += 1;
 
        }
 
    }
 
});
 
game.state.start('res');
```