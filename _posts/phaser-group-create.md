---
title: Making a group of sprites in phaser with group.create
date: 2018-08-30 18:32:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 274
updated: 2018-09-04 19:35:42
version: 1.13
---

In this post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) I will be covering some examples of making a collection of sprites using [Group.create](https://photonstorm.github.io/phaser-ce/Phaser.Group.html#create). There is also [Group.add](https://photonstorm.github.io/phaser-ce/Phaser.Group.html#add) that can be used to add sprites, as well as many display objects as well, however in this post the emphasis will be just on sprites.

<!-- more -->

## 1 - What to know

If you want to read about how to create a group of sprites using phaser ce, the javaScript powered game frame work, this post is for you. If you are new to phaser you might want to start with a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/). Also in this post I am using phaser ce version 2.11.0, and not  the new phaser 3.x major release that came out this year.

## 2 - Example of many Sprites in a group, moving around in the group, that is also moving.

So In this example I will be making a group using the phaser.Group constructor, and then add a bunch of sprites to the group using the Group.create method. I will also be creating a very basic sprite sheet using canvas, which is a great way for making basic sprite sheets for simple examples like this.

### 2.1 - Making a simple block sprite sheet

So in order to make a bunch of sprites I will want to have a sprite sheet. In a real project, rather than a simple quick demo, I might want to load external assets, however for this post I will be using a method that involves canvas. This method when called will just make a simple single frame sheet of a red box, that will have a single key set by way of a string literal.

```js

// make a basic block sheet for the given game
var makeBasicBlockSheet = function (game) {

    // basic block sprite sheet, made with canvas
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0, 0, 8, 8);
    this.game.cache.addSpriteSheet('sheet-basic-block', null, canvas, 32, 32, 1, 0, 0);

};
```

This will get the job done, for this example. In addition I can add to it to make it more robust if I choose to make a more interesting example for this. Which I might at some point of this post gets some traction.

### 2.2 - The create blocks method

So here is the method where I will be creating the sprites with Group.create. In This method I also made the beginnings of a Block class the instances of which will end up being the data object for each sprite created with Group.create. In this method I just have the Class in the body of the method itself, but if this project where to group more complex the class would of course be placed elsewhere.

This method will not make the group itself, but will accept a group as the old argument that is given to it.

```js
// create blocks
var createBlocks = function (group) {
 
    var i = 0,
    count = 10,
    groupSize = 64,
    sprite;
 
    var Block = function (opt) {
 
        this.sprite = opt.sprite;
 
        this.newAngle();
 
    };
 
    Block.prototype.newAngle = function () {
 
        this.angle = Math.PI * 2 * Math.random();
 
    };
 
    Block.prototype.tick = function () {
 
        var dx = Math.cos(this.angle) * 1,
        dy = Math.sin(this.angle) * 1; ;
        this.sprite.y += dy;
 
        // update sprite position relative to group
        this.sprite.x = Phaser.Math.clamp(this.sprite.x + dx, 0, groupSize - 8);
        this.sprite.y = Phaser.Math.clamp(this.sprite.y + dy, 0, groupSize - 8);
 
        // new angle when bounds of group are hit
        if (this.sprite.x === groupSize - 8 || this.sprite.y === groupSize - 8) {
            this.newAngle();
        }
        if (this.sprite.x === 0 || this.sprite.y === 0) {
            this.newAngle();
        }
 
    };
 
    // create the blocks
    while (i < count) {
 
        // I can create a block using Group.create
        sprite = group.create(0, 0, 'sheet-basic-block', 0);
 
        // group.create returns a reference to the sprite
        // that I can then use to add soem values;
        sprite.name = 'block-' + i;
        sprite.x = Math.random() * (groupSize - 8);
        sprite.y = Math.random() * (groupSize - 8);
 
        sprite.data = new Block({
                sprite: sprite
            });
 
        i += 1;
 
    }
 
};
```

When I use Group.create an instance of the sprite is what is returned, just like the plain old Phaser.Sprite container that could also be used as a way to make sprites, and then add to a group as well using the more versatile Group.add, but that is a matter for another post.

### 2.3 - The make block group helper

This method creates the actual group, and appends a data object to it that will be used to store some values that will be used for the movement of the group. It also calls the create blocks method mentioned above, passing the group as the single argument to it.

```js
// make a block Group for the given game
var makeBlockGroup = function (game) {
 
    var group = game.add.group();
    group.name = 'block-group';
    group.width = 128;
    group.height = 128;
 
    createBlocks(group);
 
    group.data = {
 
        group: group,
        frame: 0,
        maxFrame: 200,
        tick: function () {
 
            var per = this.frame / this.maxFrame,
            bias = Math.abs(0.5 - per) / 0.5;
 
            this.group.x = (game.world.width - 64) * bias;
 
            this.frame += 1;
            this.frame %= this.maxFrame;
 
        }
 
    };
    group.x = 0;
    group.y = game.world.height / 2 - 32;
 
    return group;
 
};
```

This wil result in a group that has everything I need to make the group do what I want it to do. In this example I am just moving the group back and forth, but it a real project the movement might be governed by something else a bit more complex.

### 2.4 - The phaser Game object instance, and single state object

So now it is time to get all of this working with a Phaser.Game instance, and a single state object. In the create method of the state object I call my helper that makes the block sheet, and then the helper that makes the block group. Then in the update method I can grab a reference to the group with the name that I assigned to it, and use the Group.forEach method to call the tick Block class method that I have made for each sprite in the group. I also Call the main tick method for the group itself as well.

```js
// the game instance, and state object
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example', {
 
    create: function () {
 
        game.scale.compatibility.scrollTo = false;
 
        makeBasicBlockSheet(this.game);
 
        makeBlockGroup(this.game);
 
    },
 
    update: function () {
 
        var blocks = game.world.getByName('block-group');
 
        // update children
        blocks.forEach(function (block) {
            block.data.tick();
        });
 
        // update group position
        //blocks.x += 1;
        blocks.data.tick();
 
    }
 
});
 
game.state.start('example');
```

This results in a bunch of sprites moving around randomly inside the dimensions of the group, and the group itself moving from side to side. For this simple example that is not all that interesting, but a greater potential for this exists where this can be a kind of unit where it is actually a collection of smaller units. There are many games that come to mind where A mechanic like this exists.