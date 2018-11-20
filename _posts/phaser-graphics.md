---
title: Working with on the fly graphics in phaser
date: 2017-10-21 18:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 70
updated: 2018-11-20 18:29:54
version: 1.11
---

In my effort to make a [great series of posts](/categories/phaser/) on [phaser ce](https://photonstorm.github.io/phaser-ce/index.html), it is only a matter of time until I started writing on how to make on the fly graphics in phaser. This is something that I often want to do in the early stages of a project where I just want to know the location of what will eventually be a sprite, or even a project with no external assets which can happen sometimes with something pretty simple.

So this will be a quick how to get started with graphics in phaser post, but also a review of the most important methods and properties with [Graphics display objects](https://photonstorm.github.io/phaser-ce/Phaser.Graphics.html) in phaser ce.

<!-- more -->

## 1 - what to know

This is a post on [graphics objects](https://photonstorm.github.io/phaser-ce/Phaser.Graphics.html) in phaser ce, which is a kind of [display object](https://photonstorm.github.io/phaser-ce/PIXI.DisplayObjectContainer.html) like a sprite only it can be used for making graphics on the fly without the use of an external sprite sheet. There are a few other ways of making textures without the use of an external sprite sheet, such as [using canvas](/2018/08/04/phaser-spritesheet-from-canvas/) to do so, there is also the [create.texture](/2018/10/06/phaser-create-texture/) method as well. However graphics might be one of the best options for when I am making a graphics that need to be updated on each frame tick, and involve some match to do so rather than static frames in a sprite sheet. In any case Graphics objects are one of a few kinds of display objects that a phaser ce developer should be aware of.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](http://phaser.io/)

## 2 - A phaser graphics hello world example (Graphics.drawCircle)

I often start off my posts by giving a quick, simple hello world example of how to get started with something, then everything else is often just different mutations of that example . For graphics I went with just drawing a circle in the center of the canvas. So this will also be an example of the [Graphics.drawCircle](http://phaser.io/docs/2.6.2/Phaser.Graphics.html#drawCircle) method.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('game', {
 
    // create method
    create: function () {
 
        // add a graphics object to the world
        var cir = game.add.graphics(game.world.centerX, game.world.centerY);
 
        // make it a green circle
        cir.beginFill(0x00ff00);
        cir.drawCircle(0, 0, 100);
        cir.endFill();
 
    }
 
});
 
game.state.start('game');
```

Calling game.add.graphics will return an instance of [Graphics](http://phaser.io/docs/2.6.2/Phaser.Graphics.html), which has many properties and methods for making on the fly graphics. Here we are just starting with Graphics.beginFill, Graphics.drawCircle, and Graphics.endFill.

So every time I want to do something with graphics in phaser the first thing to do is create a new Graphics display object by calling game.add.graphics, then I use the methods and properties that are provided in that instance of Graphics to create whatever it is that I want. 

## 3 - Graphics.beginFill(color, alpha), and Graphics.endFill()

Not much to say these methods are of course what need to be called in order to start, and end a fill operation. I can set both the color and alpha values with the two arguments that can be given to beginFill, and endFill has no arguments, it is just used to end a fill operation.

## 4 - Drawing a box with Graphics.drawRect()

If not drawing a circle, another very common shape to work with when making a game is of corse a box or rectangle like object. Doing this in phaser is not all that more complicated, I just need to use the [Graphics.drawRect](http://phaser.io/docs/2.6.2/Phaser.Graphics.html#drawRect) method.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // create method
        create : function () {
 
            // add a graphics object to the world
            var cir = game.add.graphics(game.world.centerX, game.world.centerY);
 
            // make it a red rectangle
            cir.beginFill(0xff0000);
            cir.drawRect(-50, -50, 100,100);
            cir.endFill();
 
        }
 
});
```

## 5 - Drawing lines With Graphics.moveTo, and Graphics.lineTo

Drawing lines is pretty easy, it just involves a certain combination of calls to moveTo, and line to. I use moveTo to just move the drawing position, and lineTo t actually draw a line. I [wrote a post on graphics and lines](/2017/10/22/phaser-graphics-lineto/) in which I cover doing this in greater detail as well.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // create method
        create : function () {
 
            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);
 
            // make it a red rectangle
            gra.lineStyle(3, 0xff0000);
 
            // start by moving to a point
            gra.moveTo(0, 0);
            gra.lineTo(100, 0);
            gra.lineTo(100, 100);
            gra.lineTo(0, 0);
 
        }
 
    });
```

## 6 - Working with polygons with Graphics.drawPolygon

Check out my [full post on working with polygons](/2017/10/22/phaser-graphics-polygon/) in phaser. When it comes to working with Graphics.drawPolygon it is all about how you make an array of points first, then it is just a matter of passing that array to the method.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
{
 
        // create method
        create : function () {
 
            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);
 
            gra.lineStyle(3, 0x00ff00);
            gra.drawPolygon([0, 0, 100, 0, 100,100, 0, 0]);
 
        }
 
    }
 
);
```

## 7 - Generating a texture from graphics that can then be used to create a sprite or sprite sheet.

It is possible to quickly generate a texture from a graphics object by just calling the Graphics.generateTexture method. This texture can then be used to skin a sprite, or create a sprite sheet.

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

For more information on this method and how it can be used to generate a sprite sheet as well as some of its other featurss be sure to check out my [post on Graphics.generateTexture](/2018/11/20/phaser-graphics-generate-texture/).

## 8 - Conclusion

There is a lot to cover with graphics in phaser, this post alone is not going to do it justice, hopefully it has helped you getting started if you did not know how before hand. I will be updating this post, as well as a whole lot more of them as my work on phaser continues.
