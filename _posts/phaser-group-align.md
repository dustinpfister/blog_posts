---
title: Aligning Sprites in a group into a grid in phaser ce with group.align
date: 2018-09-28 11:09:00
tags: [js,phaser]
layout: post
categories: phaser
id: 291
updated: 2018-10-01 17:28:54
version: 1.11
---

If you have a collection of sprites in a [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) project and you want to align them into a grid, it is not to hard to just do it by working out a method. However why bother with that when there is a method that is part of the group class itself? There is of course [group.align](https://photonstorm.github.io/phaser-ce/Phaser.Group.html#align) that can be used to do this, and it does it fairly well with some nice features that can be used to tweak things a bit. Never the less in this post I will be writing about some examples that have to do with aligning sprites, and other display objects in a group in phaser ce.

<!-- more -->

## 1 - what to know

This is a post on aligning display objects such as sprites into a grid using group.align, and other related topics using phaser ce. There are a number of other topics of interest that are required before hand in order to get something of value from this post. I will not get into every little detail about groups, phaser, and javaScript in general. However if you are interested in reading about some examples that have to do with arranging sprites in a phaser ce project you might like this post.

## 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.0

## 2 - Basic example of group.align to arrange text objects

For a basic example of group.align I put together an example that aligns a bunch of text objects into a grid. Not the most interesting example but will serve fine as a quick simple example. After I create the group, and add some text objects to it with group.add I then pass the grid tile width and height, as well as the pixel width and hight as the first four arguments. Then I can also define how the display objects are to be aligned within there space.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('boot', {
 
    create: function () {
 
        var text,
        font = {
            fill: 'white',
            font: '15px courier'
        },
        i = 0,
        len = 25,
        group = game.add.group();
 
        // add text elements
        while (i < len) {
            text = game.add.text(0, 0, i, font);
            group.add(text);
            i += 1;
        }
 
        // using group.align to align the text objects
        group.align(5, 5, 40, 40, Phaser.TOP_LEFT, 0);
 
        group.x = game.world.centerX - group.width / 2;
        group.y = game.world.centerY - group.height / 2;
 
    }
 
});
 
game.state.start('boot');
```

This is a great way to quickly align sprites and other display objects such as these text objects into a grid. In many cases though it might be better to go with tile maps as a way to go about doing this.

## 3 - Conclusion

So it is nice that phaser includes this method for aligning display objects into a grid, but it is not so hard to do so with just some plain old vanilla js code. If you have any questions, or would like to see some more examples of this aspect of phaser ce development be sure to let me know in the comments, and thanks for reading.