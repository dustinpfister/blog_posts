---
title: Working with pointer objects in phaser.
date: 2017-10-17 14:58:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 67
updated: 2018-11-26 09:59:55
version: 1.11
---

When making a [phaser ce](https://photonstorm.github.io/phaser-ce/) project, these days it's important to try to make games that are well designed with both mobile and traditional desktop systems in mind. As such it is important to understand the nature of touch events, and the mouse. That is how they are different, but more importantly how they are the same, as they are both a means of how to point at something. They can be thought of as pointer devices, as such this post is about how to go about working with [pointer objects](https://photonstorm.github.io/phaser-ce/Phaser.Pointer.html) in phaser.

<!-- more -->

## 1 - What to know before getting started with pointer objects

In phaser pointer objects are standard objects that contain useful information about a state of a mouse or touch screen. In this post I will be covering pointer objects in general, but will not be getting into detail about the nature of things like activePointer property, as there is much to cover when it comes to this topic. However I will link to other posts as needed, and where doing so is appropriate. For example if you are interested in getting started with multi touch there is the [pointers array](/2017/10/19/phaser-input-pointers/), and when working with a mouse there is the [mouse pointer](/2017/10/12/phaser-input-mousepointer/).

It should go without saying that this is not a getting started post with phaser, or javaScript in general so I trust that you have at least some background with these topics before hand. If you are new to phaser ce you might want to check out [my post on getting started with phaser ce](/2017/10/04/phaser-getting-started/).

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser Community edition 2.11.1 of [phaser](https://phaser.io/).

## 2 - Pointer Object example

So this is a quick example of how to go about getting started with pointer objects.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('example1', {
    create: function () {
 
        game.input.onDown.add(function (ptObj, e) {
 
            // pointer object
            console.log(ptObj);
 
            // Event
            console.log(e);
 
        });
 
    }
});
 
game.state.start('example1');
```

The function that I pass to the add method of onDown receives a pointer object, and a pointer event object as its arguments. By looking in the javaScript console I can look over all the values of each object. The first thing to understand here is that regardless if it is a mouse, or touch event, certain values are the same in the pointer object that is given, such as the container relative x, and y position values.

All of these pointer objects behave differently, and reference different input devices that may or not may not be available on a client system. However they all hold certain values in comment sense they are all pointer objects.

## 3 - Container relative x, and y position.

The most important values sought after in a pointer object are the container relative x, and y values of the pointer object.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('position', {
 
    create: function () {
 
        game.input.onDown.add(function (pt) {
 
            console.log(pt.x, pt.y);
 
        });
 
    }
 
});
 
game.state.start('position');
```

these values are simply just pt.x, and pt.y in a given pointer object. these values of course differ from pt.clientX, and pt.clientY that of course hold the window relative position values.

## 4 - Conclusion

This post will be expanded on as I see fit. In my experience so far it is just the position values that are of most interest, however there are other values of interest that are useful. In any case it is important that pointer objects are a standard of sorts in phaser, and there are several areas in phaser that are in instance of a pointer object (game.input.activePointer, game.input.pointer1, [game.input.mousePointer](/2017/10/12/phaser-input-mousepointer/), ect). You might want to read over my post on the [pointers array](/2017/10/19/phaser-input-pointers/), as well as my post on [game.input](/2017/10/13/phaser-gameobj-input/) that has been serving as a central point of all things input related in phaser.
