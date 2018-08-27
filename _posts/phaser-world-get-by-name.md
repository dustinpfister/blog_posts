---
title: Getting sprites, and other objects by name in phaser with
date: 2018-08-25 21:23:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 270
updated: 2018-08-27 19:34:21
version: 1.2
---

So when making a [Phaser ce](https://photonstorm.github.io/phaser-ce/) project I end up with a lot of sprites, and other display objects. As such there needs to be a way to obtain a reference to a single specific display object by some kind of id, or name. That is to grab at display objects in phaser in a similar fashion to that of id attributes when it comes to html elements with document.getElementById. After playing around with phaser for a while I came across just such a method called game.world.getByName. This post will be a quick overview of this method, as a way to grab references to display objects across the different methods of a state object in phaser, and why game.world.getByName is the document.getElementById of phaser ce.

<!-- more -->

## 1 - What to know before continuing


## 2 - Example 1 - Using game.world.getByname to get a reference to a display object

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example-1', {
 
    create: function () {
 
        var font = {
            fill: 'red',
            font: '15px courier'
        },
        mess = game.add.text(5, 5, '', font);
 
        // setting a name for the text object
        mess.name = 'mess';
 
        mess.data.tick = 0;
 
    },
 
    update: function () {
 
        var mess = game.world.getByName('mess');
 
        mess.text = 'tick: ' + mess.data.tick;
 
        mess.data.tick += 1;
 
    }
 
});
 
game.state.start('example-1');
```
