---
title: Input down events for all children in a group in phaser ce
date: 2018-10-06 20:04:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 298
updated: 2018-10-07 17:24:16
version: 1.11
---

These days I have been playing around with groups in [phaser ce](https://photonstorm.github.io/phaser-ce/), and have learned a lot about what there is to work with in the Phaser.Group class allowing me to make smarter decisions when developing a project with phaser ce. For example when it comes to attaching an event hander for sprites, I can attach one for each sprite in a group. However if it is something that applies to all of the children in a group, I can use [Group.onChildInputDown](https://photonstorm.github.io/phaser-ce/Phaser.Group.html).

<!-- more -->

## 1 - What to know before continuing

This is a post on using Group.onChildInputDown in phaser ce, a [Signal](/2018/10/04/phaser-signal/) that can be used to attach a handler that will fire each time a sprite in the group is clicked assuming that it is input enabled. As such this is an advanced post on phaser ce that deals with a very specific issue, and is therefore not a getting started post on groups, phaser ce, or javaScript in general.

## 2 - An example using group.onChildInputDown

For an example of group.onChildInputDown I made a quick project that involves making a small group of block sprites using a canvas solution to make the sprite sheet. Each time a sprite is clicked a handler that is attached to the group thanks to group.onChildInputDown is called that reduces the health property of the sprite that was clicked.  When the health of a sprite reaches zero it dies, and if all sprites in the group die the group is reset. 

### 2.1 - The handler to be used with group.onChildInputDown

This is the handler that will be called each time a sprite is clicked. I could attach the handler on a per sprite bases, but because it applies to all sprites in the group, I can attach it here.

```js
// the onBlockInputDown handler
var onBlockInputDown = function (block) {
 
    block.damage(1);
 
    block.frame = 5 - Math.floor(block.health / 5 * 5);
    block.frame %= 5;
 
    // reset the group if they are all dead
    if (block.parent.countLiving() === 0) {
        resetGroup(block.parent);
    }
 
};
```

### 2.2 - Create the group, and attach the handler with group.onChildInputDown

Now that I have a handler I can attach the handler to a group with group.onChildInputDown, but first I need a group to attach to. So I made a group, and created a bunch of sprites with group.create. In then call my reset group method that I will get into in a bit, and why that is important. Then of course I attach the onBlockInputDown handler to the group.

```js
// create the group
var createGroup = function (game) {
 
    var group = game.add.group(),
    block,
    i = 0,
    count = 25;
 
    // create children
    while (i < count) {
        block = group.create(0, 0, 'sheet-block', 0);
        i += 1;
    }
 
    resetGroup(group);
 
    // attach the OnBlcokInputDown handler for the group
    // with onChildInputDown
    group.onChildInputDown.add(onBlockInputDown);
 
};
```

### 2.3 - Reset group helper

Here I have a method that will reset the group, or set it for the first time. Here I make sure that the inputEnabled boolean is set true if it has not yet, and use the revive method to set the health property of the sprite to 5. I then also use Group.align to align the position of the sprites into a grid formation as well, and set the position of the group in a similar matter to that of any other display object in phaser.

```js
var resetGroup = function (group) {
 
    group.forEach(function (block) {
 
        // make sure input is enabled
        block.inputEnabled = true;
        block.revive(5);
 
    });
 
    // align children, and move the group
    group.align(5, 5, 34, 34);
    group.x = 32;
    group.y = 32;
 
};
```

### 2.4 - Make a sprite sheet with canvas

Here I have a method that I use to create a sprite sheet with canvas. In many of my examples I often use a solution like this that can be used to generate some graphics with javaScript code on the fly, rather than loading an external sprite sheet.

```js
// make a sprite sheet
var mkSheet = function (game) {
 
    var states = 5,
    i,
    val,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32 * states;
    canvas.height = 32;
 
    i = 0;
    while (i < states) {
        val = 255 - Math.floor(200 * i / states);
        ctx.fillStyle = 'rgba(0,0,' + val + ',1)';
        ctx.fillRect(32 * i, 0, 32, 32);
        i += 1;
    }
 
    game.cache.addSpriteSheet('sheet-block', null, canvas, 32, 32, states, 0, 0);
 
};
```

### 2.5 - The Phaser.Game instance

Now it is time to pull everything together with a Phaser.Game instance. With this example I just need to do everything in a single create method in a single state object sense everything is event driven, and I have off set just about all of the logic into small helper methods in an effort to make the code more fine grain.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('demo', {
 
    create: function () {
 
        mkSheet(game);
 
        createGroup(game);
 
    }
 
});
 
game.state.start('demo');
```

## 3 - Conclusion

