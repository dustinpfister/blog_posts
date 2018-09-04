---
title: Enabling frame by frame stepping in phaser
date: 2018-09-04 15:18:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 276
updated: 2018-09-04 18:50:53
version: 1.6
---

When making a game using [Phaser ce](https://photonstorm.github.io/phaser-ce/) as a framework, there might comes a time that for one reason of another I will want to have the game run in a frame by frame basis. For the sake of some kind of turn based game, or I need to hunt down a hard to find bug, there comes a time that I need to do this now and then. In phaser ce there is the game.enableStep method along with game.step, that can be used to enable frame by frame stepping in phaser ce. In this post I will be writing about a quick demo I put together to help show how easy this is.

<!-- more -->

## 1 - What to know

This is a post on using the game.enableStep method in phaser ce to enable frame by frame stepping in a game made with the framework. Phaser ce is the community edition of the popular phaser javaScript powered game framework, so in this post I am using that rather than phaser 3. In this post I am also making use of many other aspects of the framework, as well as with javaScript in general. This is not a getting started post on phaser, or any additional skills that you should have before hand. However if you do want to know how to do frame by frame stepping in phaser ce you have come to the right place.

## 2 - A full example of game.enableStep

For a full working phaser example that demonstrates the use of game.enableStep, and game.step, I came up with a quick idea for a project that involves a group of circles. The group will have a data object that contains an index that will be the current circle index, each time the game world is clicked the index will step forward looping around again to zero when it reaches the count of circles. So this demo also makes use of groups, and making a sprite sheet with canvas, along with basic state management.

In a real project I might have a complex game consisting of many modules, and lines of code, and I want to hunt down a bug. However for just demonstrating the effect of game.enableStep this should do.

### 2.1 - Making a quick sprite sheet with canvas

So for this example I will want a way to quickly make a simple sprite sheet that has two frames, one for an inactive state for the circle, and another for an active state when the circle is the current index in a group.

```js
// make a basic sprite sheet
var makeCircleSheet = function (game) {
 
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
 
    ctx.strokeStyle = '#ff0000';
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 12, 0, Math.PI * 2);
    ctx.stroke();
 
    ctx.beginPath();
    ctx.arc(48.5, 16.5, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
 
    this.game.cache.addSpriteSheet('sheet-circle', null, canvas, 32, 32, 2, 0, 0);
 
};
```

### 2.2 - Making the circle group

This helper will add a new group, and create a bunch of sprites using the sheet that will be made with my makeCircleSheet helper above.

```js
// make a group of circles
var makeCircleGroup = function (game) {
 
    var circles = game.add.group();
    circles.name = 'circles';
 
    circles.data = {
        i: 0
    };
 
    var i = 0,
    len = 12, // 12 circles
    x,
    y,
    r;
 
    // create a sprite for each circle
    while (i < len) {
 
        r = Math.PI * 2 * (i / len);
        x = game.world.centerX - 16 + Math.cos(r) * 96;
        y = game.world.centerY - 16 + Math.sin(r) * 96;
 
        // using group.create to create sprites for the group
        circles.create(x, y, 'sheet-circle', 0);
 
        i += 1;
 
    }
 
};
```

### 2.3 - What to do for each frame tick for the circle group

Next I have another method that will be called in the update method of a state in which I have created a group of circles with my makeCircleGroup method.

```js
// tick the given circle group
var tickCircleGroup = function (circles) {
 
    var index = 0;
 
    // for each circle
    circles.forEach(function (circle) {
 
        // default to frame zero
        circle.frame = 0;
 
        // if index === current index
        if (index === circles.data.i) {
 
            // use frame 1
            circle.frame = 1;
 
        }
 
        // next child index
        index += 1;
 
    });
 
    // step current index
    circles.data.i += 1;
    circles.data.i %= circles.children.length;
 
}
```

### 2.4 - The Phaser.Game instance, along with the boot, and demo states

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

// the boot state
game.state.add('boot', {

    create: function () {

        // make the sheet
        makeCircleSheet(this.game);

        // enable stepping
        game.enableStep();

        // start the demo
        game.state.start('demo');

    }

});

// the actual demo state
game.state.add('demo', {
 
    create: function () {
 
        makeCircleGroup(this.game);
 
        // on input down, step
        this.game.input.onDown.add(function () {
 
            // game.step can then be used to
            // step each game tick
            game.step();
 
        });
 
    },
 
    // what to do for each tick
    update: function () {
 
        // call the tick Circle group method for each
        // frame tick
        tickCircleGroup(game.world.getByName('circles'));
 
    }
 
});
 
// start with the boot state
game.state.start('boot');
```