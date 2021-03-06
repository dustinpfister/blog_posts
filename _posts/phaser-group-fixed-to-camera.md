---
title: Fixing Sprites and other display objects to a camera in phaser
date: 2018-08-28 07:54:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 273
updated: 2018-09-04 19:38:21
version: 1.8
---

Sow when making a game with [Phaser ce](https://photonstorm.github.io/phaser-ce/) that is the kind of game where the world is bigger than the native size of the canvas, there will be a need to pan around the world some way. When doing so there might be some display objects that I will want to have fixed to the camera. One way would be to just update the positions of these sprites, text object, and groups manualy in the update loop. However there is a way to have a group fixed to the camera, so when the camera moves all these other objects move with it relative to it's position. In this post I will be writing about doing just that with groups, and some corresponding properties.

<!-- more -->

## 1 - What to know

This is a post on using the [FixedToCamera](https://photonstorm.github.io/phaser-ce/Phaser.Group.html#fixedToCamera) property of a [Group](https://photonstorm.github.io/phaser-ce/Phaser.Group.html) in [Phaser ce](https://photonstorm.github.io/phaser-ce/), as well as a few related properties and topics. This is not a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/), or javaScript in general, so I hope that you have logged at least some time with the basics before hand.

## 2 - An example of a fixed group

For this example of a fixed group in phaser ce I will be creating a group, and then make it fixed to the camera. I then use the cameraOffset property to set the position of the group relative to the camera. To know that the camera is moving around the world I will place a bunch of sprites in the world just to help server as a frame of reference. Then in the update method I will move the camera around the game world, and any display objects that I will place in the fixed group will stay in the proper position relative to the position of the camera.

### 2.1 - The fixed group helper

So to start things off I made a fixed group helper method. This is a simple little method that takes care of everything that needs to happen with a fixed group right in a nice neat little reusable helper method. I pass it the instance of Phaser.Game, the name I want to give to the group, and an offset that is an instance of Phaser.Point.

```js
// add a fixed group helper
var addFixedGroup = function (game, name, offset) {
 
    var fixed = game.add.group();
    fixed.name = name;
    fixed.fixedToCamera = true;
    fixed.cameraOffset = offset;
 
    return fixed;
 
};
```

When I call this method in the create method of a game state, it will return a new fixed group that I can then add display objects to such as sprites, and text.

### 2.2 - An add Text helper

For this example I also made a addText helper. With this helper I can give a group that was created with my addFixedGroup helper above, as the second argument.

```js
// add a text element to a group
var addText = function (game, group, name, x, y) {
 
    var font = {
        fill: 'white',
        font: '15px courier'
    };
 
    x = x === undefined ? 5 : x;
    y = y === undefined ? 5 : y;
 
    var text = game.add.text(x, y, '', font);
    text.name = name;
    group.add(text);
 
};
```

In many projects I might have more than one instance of a text object, so it is nice to have something like this to help keep me from repeating code.

### 2.3 - A simple helper to make a sprite sheet with canvas

Again I made another helper that can be used to quickly make a one frame sprite sheet for a project like this.

```js
// just make a simple box sheet
var mkBoxSheet = function (game, sheetKey) {
 
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, 32, 32);
    game.cache.addSpriteSheet(sheetKey, null, canvas, 32, 32, 1, 0, 0);
 
};
```

### 2.4 - The gen Boxes helper

So this helper is called after I have a sheet to give it.

```js
// gen boxes
var genBoxes = function (game, sheetKey, count) {

    var bx = count || 100,
    x,
    y;
    while (bx--) {

        x = Math.random() * (game.world.width - 32);
        y = Math.random() * (game.world.height - 32);

        game.add.sprite(x, y, sheetKey);

    }

};
```

### 2.5 - The phaser game instance, and single state object

So here is the source of the example in which I am creating an instance of Phaser.Game, and then making sure that the game world is larget than the native canvas size that I set when making the game instance.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example', {
 
    create: function () {
 
        // SETING WORLD SIZE
        game.world.resize(640, 480);
 
        // MAKING THWE FIXED GROUP
        var fixed = addFixedGroup(game, 'fixed', new Phaser.Point(0, game.camera.height - 20));
 
        // ADDING A TEXT ELEMENT TO THE FIXED GROUP
        addText(game, fixed, 'mess');
 
        // GENERATING SOME BOXES TO THE WORLD
        mkBoxSheet(game, 'sheet-box');
        genBoxes(game,'sheet-box',150);
 
        // SETTING SOME VALUES
        // that will be used in the update method
        var data = game.data = game.data || {};
 
        data.frame = 0;
        data.maxFrame = 200;
        data.dist = game.world.height / 4;
 
    },
 
    update: function () {
 
        var per = game.data.frame / game.data.maxFrame,
        fixed = game.world.getByName('fixed'),
        angle = Math.PI * 2 * per,
        x,
        y;
 
        // updating position of the camera
        x = Math.floor((game.world.width / 2) - (game.camera.width / 2) + Math.cos(angle) * game.data.dist);
        y = Math.floor((game.world.height / 2) - (game.camera.height / 2) + Math.sin(angle) * game.data.dist);
        game.camera.setPosition(x, y);
 
        // displaying current camera position in text object
        // that is in the fixed group
        fixed.getByName('mess').text = 'fixed info: (' + x + ',' + y + ') ';
 
        // step frame
        game.data.frame += 1;
        game.data.frame %= game.data.maxFrame;
 
    }
 
});
 
game.state.start('example');
```

