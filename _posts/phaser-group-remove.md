---
title: Removing sprites from a Group in phaser
date: 2018-08-26 20:26:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 271
updated: 2018-08-26 20:27:09
version: 1.2
---

Today in this post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) I will be writing about removing Sprites, and other display objects from a group. There is of course the Group.remove method, but by default it will not destroy the sprite. In some cases this is desirable if I want to move the sprite from one Group to another, or just remove it from a group in place it directly in the world. However it other projects, where Sprites are something that are created and destroyed on demand, then it is important to know about the few little pitfalls when it comes to removing sprites from a group in phaser.

<!-- more -->

## 1 - What to know before continuing

## 2 - The basics with Group.remove

### 2.1 - creating two groups

```js
var group1 = game.add.group(),
group2 = game.add.group();
 
// anding a bunch of text objects to group 1
var i = 5;
while (i--) {
    group1.add(game.add.text(0, i * 20, 'foo' + i, {
            fill: 'red'
        }));
}
 
// child length of both groups is as expected
console.log(group1.children.length); // 5
console.log(group2.children.length); // 0
```

### 2.2 - removing from group one, and adding to group two

```js
// grabbing a reference to the third child
// in group1
var text = group1.children[2];
 
// removing the text object from group one
// but the text object will not be destroyed
group1.remove(text, false, false);
 
// adding the text object to group2
group2.add(text);
 
// child length of both groups is as expected
console.log(group1.children.length); // 4
console.log(group2.children.length); // 1
```

### 2.3 - Removing for good

```js
// if I have a reference I can really destroy
// the object this way
text.destroy();
 
// child length of group2 is as expected
console.log(group2.children.length); // 0
 
// I can also destroy objects by passing true
// as the second argument when calling Group.remove
group1.remove(group1.children[0], true);
 
// child length of group1 is as expected
console.log(group1.children.length); // 3
```

## 3 - Having a cache, and an active group of sprites.

```js
// removing from one group, and placing into another, and back again
game.state.add('example-1', {
 
    create: function () {
 
        // singe text object
        var text = game.add.text(0, 0, '', {
                fill: '#00ffff',
                font: '15px courier'
            });
        var setText = function () {
            text.text = 'active: ' + active.children.length + ', cached: ' + cache.children.length;
        };
 
        // basic block sprite sheet, made wwith canvas
        var canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 32, 32);
        this.game.cache.addSpriteSheet('sheet-1', null, canvas, 32, 32, 1, 0, 0);
 
        // a cache of blocks, invisible, and outside of the world
        var cache = game.add.group();
        cache.name = 'cache';
        cache.x = -32;
        cache.y = -32;
        var i = 10;
        while (i--) {
            var blk = cache.create(0, 0, 'sheet-1');
            blk.alpha = 0;
            // when clicked remove from active,
            // and place back in the cache
            blk.inputEnabled = true;
            blk.events.onInputDown.add(function (block) {
                block.x = 0;
                block.y = 0;
                block.alpha = 0;
                active.remove(block, false);
                cache.add(block);
                setText();
            });
        }
 
        // and active group inside the world
        var active = game.add.group();
        active.name = 'active';
        active.x = 0;
        active.y = 0;
 
        setText();
 
        // loop
        game.time.events.loop(1000, function () {
            // if there are blocks in the cache
            if (cache.children.length > 0) {
                // move child zero to the active group
                var child = cache.children[0];
                cache.remove(child, false);
                child.x = Math.floor(Math.random() * (game.world.width - 32));
                child.y = Math.floor(Math.random() * (game.world.height - 32));
                child.alpha = 1;
                active.add(child);
                setText();
            }
        });
 
    }
 
});
 
game.state.start('example-1');
```