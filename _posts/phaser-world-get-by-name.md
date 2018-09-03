---
title: Getting sprites, and other objects by name in phaser with world.getByName
date: 2018-08-25 21:23:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 270
updated: 2018-09-03 14:03:14
version: 1.9
---

So when making a [Phaser ce](https://photonstorm.github.io/phaser-ce/) project I end up with a lot of sprites, and other display objects. As such there needs to be a way to obtain a reference to a single specific display object by some kind of id, or name. That is to grab at display objects in phaser in a similar fashion to that of id attributes when it comes to html elements with document.getElementById. After playing around with phaser for a while I came across just such a method called [game.world.getByName](https://photonstorm.github.io/phaser-ce/Phaser.World.html#getByName). This post will be a quick overview of this method, as a way to grab references to display objects across the different methods of a state object in phaser, and why game.world.getByName is the document.getElementById of phaser ce.

<!-- more -->

## 1 - What to know before continuing

This is a post on the world.getByName method in [Phaser ce](https://photonstorm.github.io/phaser-ce/), the community edition of [phaser](https://phaser.io/), a javaScript powered html 5 game framework. This method along with name property is a way to get references to groups, and display objects in phaser. This is not a getting started post on phaser ce, let alone javaScript in general. If you are new to phaser ce do not get discouraged, this framework is a little involved and it can take time to learn all the little ins and outs including the world.getByName method.

## 2 - Using game.world.getByname to get a reference to a display object

In this example I will be setting a name property to a text object, which is one of many display objects in phaser ce. Once I have set the name, I can then get a reference to it in other methods within the state object, such as the update method.

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

## 3 - Conclusion

Using game.world.getByName, along with name properties is one way to go about grabbing references to display objects when making a phaser ce project. However it is not the only way. If you prefer to just use global variables, or an object that is appended to the state, or game objects I will not laugh at you for it. What matters most to me is the nature of your project, and what really truly sets it apart from others. I tend to like this way of handling this, but that is just my style, and in some cases it might not be the smartest play.
