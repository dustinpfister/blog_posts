---
title: Create textures in phaser with game.create
date: 2018-10-06 11:42:00
tags: [js,phaser]
layout: post
categories: phaser
id: 299
updated: 2018-10-06 12:19:25
version: 1.3
---

So when making a project with [Phaser ce](https://photonstorm.github.io/phaser-ce/) I often go with solutions for graphics that do not involve loading an external sprite sheet. Do not get me wrong that is a great way of handling it, and I have written a post on how to do that in phaser. However for simple hyper casual style games, it is often possible to just quickly throw together some simple graphics with one of the assetless solutions available in phaser ce for making on the fly graphics for a game. I have all ready wrote a post on the graphics display objects, and how to make sprite sheets with a canvas element, and the 2d drawing canvas api. However in this post I will be writing about another option for doing this in phaser ce which is the Create.texture method.

<!-- more -->

## 1 - What to know

This is a post on creating textures in phaser ce using the Create.texture method in the Create Class. This is not the only way to go about creating textures with javaScript code in phaser ce, and there it much to know about phaser before hand. If you are new to phaser you might want to check out my getting started post on phaser ce. I also assume that you have at least some background with javaScript and front end development as well. Phaser is a fairly complex game framework, and it takes time to learn.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.0, and not the latest major release of phaser. All of my content as of this writing is on phaser 2, and much of that still needs to be expanded and improved. So if you run into problems the first thing you should check is the version number of phaser that you are using as this code will break on later versions.

## 2 - Basic example of create.texture

For a basic example of create.texture I made a quick little demo that results in a sprite displayed on the screen of a little guy that is made with a texture that I created with create.texture. 

## 2.1 - The createTexture helper

When calling the method I need to pass a key that will be used when creating a sprite to let phaser know which texture I want to use. After that I need to pass an array of data that contains hex values that are pallet color indexes. Then I pass

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
