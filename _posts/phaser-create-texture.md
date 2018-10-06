---
title: Create textures in phaser with game.create
date: 2018-10-06 11:42:00
tags: [js,phaser]
layout: post
categories: phaser
id: 299
updated: 2018-10-06 11:55:02
version: 1.1
---

So when making a project with [Phaser ce](https://photonstorm.github.io/phaser-ce/) I often go with solutions for graphics that do not involve loading an external sprite sheet. Do not get me wrong that is a great way of handling it, and I have written a post on how to do that in phaser. However for simple hyper casual style games, it is often possible to just quickly throw together some simple graphics with one of the assetless solutions available in phaser ce for making on the fly graphics for a game. I have all ready wrote a post on the graphics display objects, and how to make sprite sheets with a canvas element, and the 2d drawing canvas api. However in this post I will be writing about another option for doing this in phaser ce which is the Create.texture method.

<!-- more -->

## 1 - What to know

## 2 - Basic example of create.texture


## 2.1 - The createTexture helper

```js
var createTexture = function (game, done) {
 
    var key = 'guy-blue',
    data = ['11111', '12121', '11111', '33333', ' 3 3 ', ' 3 3 ', ' 3 3 ', ' 4 4 '],
    pxWidth = 8,
    pxHeight = 8,
    palletIndex = 0;
 
    done = done || function () {};
 
    // pallet 0 for 'blue guy'
    game.create.palettes[palletIndex] = ['black', 'orange', 'white', 'blue', 'pink'];
 
    game.create.texture(key, data, pxWidth, pxHeight, palletIndex, true, done);
 
};
```
### 2.2 - The Phaser.Game instance

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        createTexture(game, function () {
 
            game.add.sprite(32, 32, 'guy-blue');
 
        });
 
    }
 
});
 
game.state.start('boot');
```
