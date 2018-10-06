---
title: Input down events for all children in a group in phaser ce
date: 2018-10-06 20:04:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 298
updated: 2018-10-05 20:35:09
version: 1.5
---

These days I have been playing around with groups in [phaser ce](https://photonstorm.github.io/phaser-ce/), and have learned a lot about what there is to work with in the Phaser.Group class allowing me to make smarter decisions when developing a project with phaser ce. For example when it comes to attaching an event hander for sprites, I can attach one for each sprite in a group. However if it is something that applies to all of the children in a group, I can use [Group.onChildInputDown](https://photonstorm.github.io/phaser-ce/Phaser.Group.html).

<!-- more -->

## 1 - What to know before continuing

This is a post on using Group.onChildInputDown in phaser ce, a [Signal](/2018/10/04/phaser-signal/) that can be used to attach a handler that will fire each time a sprite in the group is clicked assuming that it is input enabled. As such this is an advanced post on phaser ce that deals with a very specific issue, and is therefore not a getting started post on groups, phaser ce, or javaScript in general.


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

