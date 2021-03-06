---
title: Removing sprites from a Group in phaser
date: 2018-08-26 20:26:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 271
updated: 2018-08-27 07:41:25
version: 1.10
---

Today in this post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) I will be writing about removing Sprites, and other display objects from a group. There is of course the Group.remove method, but by default it will not destroy the sprite. In some cases this is desirable if I want to move the sprite from one Group to another, or just remove it from a group in place it directly in the world. However it other projects, where Sprites are something that are created and destroyed on demand, then it is important to know about the few little pitfalls when it comes to removing sprites from a group in phaser.

<!-- more -->

## 1 - What to know before continuing

The content of this post is on removing display objects from a group in phaser ce. I have another [post on groups in general](/2018/08/24/phaser-groups/), and another post on getting started with phaser that may be of interest if you are new to using groups in phaser, or phaser in general.

## 2 - The basics with Group.remove

So lets start out by covering some quick basics about removing Sprites, or display objects in general from a group in phaser cd, by looking at some simple examples. This will involve creating two groups, removing display objects from one, and adding to another. It will also cover how to truly remove display objects from the cache completely using Group.remove.

### 2.1 - Creating two groups

For these examples I started out my creating two groups called group1, and group2. I then add a bunch of text objects to group one using Group.add.

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

After doing so the child length of each group is as expected.

### 2.2 - Removing from group one, and adding to group two

So the Group.remove Method works by passing a reference to the child that I want to remove as the first argument. In order to do that I need a reference first, one way to do so is to just grab one from the children array in the group as in this example. The second argument that I pass to Group.remove is a boolean that if true will truly destroy the display object, rather than just removing it from the group. By default this value is false, but I just pass a false value anyway for the sake of example.

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

The final boolean has to do with making it so an event does not fire, more on that later in the events section of this post.

### 2.3 - Removing for good

So if I want to truly, and fully remove a display object from a group, I can just call the destroy method of the child in the group. I can also set the second argument of Group.remove to true.

```js
console.log(group2.children.length); // 1

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

by looking at the length of the group, or what is going on in the phaser cache, I can confirm first hand that these methods are working as advertised in the docs. Just remember that there is a difference between removing a display object from a group, and removing a display Object from a phaser game instance completely.


## 3 - Events

There are a few events that can be attached to display objects, the two of interest with respect to the content of this post are onAddedToGroup, and onRemoveFromGroup.

### 3.1 - onRemoveFromGroup, and onAddedToGroup example

The third argument that can be given to Group.remove is a boolean that makes the onRemovedFromGroup event not fire it's callback method.

```js
game.state.add('events-1', {
 
    create: function () {
 
        // display object with an onRemovedFromGroup event
        var text = game.add.text(0, 0, 'foo');
        text.name = 'text-1';
 
        // on add to group
        text.events.onAddedToGroup.add(function (dispObj, group) {
 
            console.log(dispObj.name + ' added to group ' + group.name);
 
        });
 
        // on remove from group
        text.events.onRemovedFromGroup.add(function (dispObj, group) {
 
            console.log(dispObj.name + ' remove from group ' + group.name);
 
        });
 
        var group = game.add.group();
        group.name = 'the-group';
 
        group.add(text); // onAddedToGroup event fires
        group.remove(text, false, false); // onRemovedFromGroup event does fire
 
        group.add(text); // onAddedToGroup event fires
        group.remove(text, false, true); // onRemovedFromGroup event does not fire
 
    }
 
});
```

## 4 - Having a cache, and an active group of sprites.

Dow for an interesting example that might start to resemble the beginnings of an actual game. In this example I have two groups. One is a cache of Sprites that is positioned outside the bounds of the game world, and the other is positioned inside the game world. After a certain amount of time a Sprite from the cache Group is moved from the cache to the active group inside the game world. I made these sprites input enabled so when you click on them they are then moved back to the cache group.

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