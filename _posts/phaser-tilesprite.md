---
title: Tile Sprites in phaser for repeating backgrounds.
date: 2018-09-19 19:14:00
tags: [js,phaser]
layout: post
categories: phaser
id: 283
updated: 2018-09-20 12:44:10
version: 1.10
---

Tile sprites are a useful way to go about making a repeating background in a [Phaser ce](https://photonstorm.github.io/phaser-ce/) project. A [tile Sprite](https://photonstorm.github.io/phaser-ce/Phaser.TileSprite.html) is not to be confused with a tile map which is something completely different. For today I spent a little time playing around with tile sprites, and have found that if I ever want to set something up that involves one or more repeating backgrounds, I will want to use a tile sprite.

<!-- more -->

## 1 - what to know

In this post I will be writing about making and using tile sprites in [phaser ce](https://photonstorm.github.io/phaser-ce/) the community edition of the [popular javaScript game frame work](https://phaser.io). I will also be making use of a lot of other aspects of phaser including things like state objects, and making sprite sheets from canvas elements. I will of course not get into every little detail about phaser let alone javaScript in general, but I have written a [getting started post on phaser](/2017/10/04/phaser-getting-started/) a while back.

### 1.1 - This is a phaser ce (2.x) post

Ever sense the release of phaser 3 earlier this year I have started the habit of making in clear what version of phaser I am using when making a post. This is a practice that I should be doing in one manor or another each time anyway. So for this post I was using phaser ce 2.11.0

## 2 - Basic example using a tile sprite in phaser ce

For a basic example of a tile sprite I will need a texture, in this example I will be making once via a canvas element. Once I have a texture that will repeat well I can then use that texture to make a tile sprite by calling game.add.tileSprite. There are some properties that I then can used to work with the tile sprite, but the most important one might be the Phaser.Point instance at the tileSprite.tilePosition property. This what I use to make a repeating texture scroll. In this section I will be covering a basic working example of this.

### 2.1 - The tile sprite helper

In this method I am creating a tile sprite by calling game.add.tileSprite, the arguments that I give to the constructor are essentially the same as a regular Sprite, so if you are familiar with that constructor you know the drill. If not the first two arguments are the x, and y position, the next two are the width and height, the fifth is a key to the sheet I want to use, and the final argument is the frame index.

```js
// make a tile sprite
var mkTileSprite = function (game) {
 
    var tile = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sheet-block', 0);
    tile.name = 'tile';
 
    tile.data.i = 0;
    tile.data.i_max = 150;
    tile.data.tick = function () {
 
        this.per = this.i / this.i_max;
 
        this.r = Math.PI * 2 * this.per;
        this.x = Math.cos(this.r) * 64;
        this.y = Math.sin(this.r) * 64;
 
        // set tile position
        tile.tilePosition.set(this.x, this.y);
 
        this.i += 1;
        this.i %= this.i_max;
 
    };
 
};
```

Once I have my tile sprite I assign a name to it so I can use game.world.getByName as a way to grab a reference to it later on in my code. In addition to that I also assign some code to the [data object of the tile sprite](/2018/09/14/phaser-sprite-data/) to help offset some stuff to the instance of the tile sprite rather than polluting the global name space, or ending up with a lengthly game.data object in the event that this example  grows.

### 2.2 - Making the sprite sheet

The above example makes use of a sprite sheet called 'sheet-block', I often like to use canvas as a way to make basic sheets for the purpose of these examples. So here I have a method that will create a simple texture that will repeat well with canvas, and then add it to the cache.

```js
var mkSheet = function () {
 
    // sprite sheet generated by canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
 
    // background
    ctx.fillStyle = '#8a0000';
    ctx.fillRect(0, 0, 64, 64);
 
    // white lines around edges
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, 64, 64);
 
    // large circle in the center
    ctx.fillStyle = '#4a0000';
    ctx.lineWidth = 3;
    ctx.beginPath()
    ctx.arc(32, 32, 16, 0, Math.PI * 2)
    ctx.fill();
    ctx.stroke();
 
    // small circles at the corners
    ctx.fillStyle = '#ff0000';
    var i = 0,x,y;
    while (i < 4) {
        x = i % 2;
        y = Math.floor(i / 2);
        ctx.beginPath()
        ctx.arc(x * 64, y * 64, 4, 0, Math.PI * 2)
        ctx.fill();
        ctx.stroke();
        i += 1;
    }
 
    // add a single sheet to cache
    game.cache.addSpriteSheet('sheet-block', null, canvas, 64, 64, 1, 0, 0);
 
};
```

I have found that it is generally a good practice to stick to powers of 2 when making the size of a frame to be used in sprite sheets. Although other sizes might work it can some times cause adverse effects, or in some cases not work at all.

### 2.3 - Now to get things working

So now that I have my two helper methods I can now make use of them my making a Phaser.Game instance, and a state object. For this example I just need to call my mkSheet helper in in the create method followed by the mkTileSprite helper. Then in the update method I just need to call the tick method in the data object of my tile sprite.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        // make the sheet
        mkSheet(game);
 
        // make the tile sprite
        mkTileSprite(game);
 
    },
 
    update: function () {
 
        // just need to call by tick method
        game.world.getByName('tile').data.tick();
 
    }
 
});
 
game.state.start('boot');
```

This results in a sprite with a repeating texture that scrolls around in a circular motion. In real projects this can of course be used to make repeating backgrounds, and other interesting sprites that call for such an effect. It is also possible to have more than one layer of these kinds of sprites [in a Group](/2018/08/24/phaser-groups/) to make very interesting professional looking backgrounds.

## 3 - Conclusion

So tile sprites are a great way to make any kind of sprite that involves the use of a repeating texture. There is also of course tile maps as well that allow for making display Objects that are composed of a bunch of different frames that represent different blocks, but that is a mater for another post.