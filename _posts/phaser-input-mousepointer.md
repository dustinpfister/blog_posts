---
title: The mouse pointer in phaser
date: 2017-10-12 11:27:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 61
updated: 2018-11-09 13:03:58
version: 1.9
---

When making a [phaser ce](https://photonstorm.github.io/phaser-ce/) project, unless I am making some kind of true idle game, will often need to accept input from a user somehow. When making a desktop game, the mouse is often something of interest. As such this post will cover how to work with a mouse pointer object that has current values from the mouse via [game.input.mousePointer](https://photonstorm.github.io/phaser-ce/Phaser.Input.html#mousePointer).

<!-- more -->

## 1 - what to know first

This is a post on using the mouse pointer in phaser ce the javaScript powered game framework. The mouse pointer one of many other ways to go about getting pointer state information when setting up controls for a game. There is also the active pointer as well that is a more robust pointer object that is influenced by both the mouse, and touch events. However if you are making a desktop game, or if you want to work out different controls for desktop and mobile then you will want to know a thing or two about this pointer object. 

It also goes without saying that this is not a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/), I am also not going to cover many of the aspects of phaser that I am using in this post such as the [main game constructor](/2017/10/11/phaser-main-game-constructor/), and [state objects](/2017/10/06/phaser-state-objects/).

## 1.1 - This is a phaser ce 2.x post

In this post I am using phaser ce 2.11.1 of [phaser](https://phaser.io/).

## 2 - The mousePointer pointer object

The current [pointer object](/2017/10/17/phaser-input-pointer-objects/) for the mouse can be found at game.input.mousePointer. On a desktop system this is always there to work with when you want to do something involving the mouse.

## phaser mouse pointer hello world

The debug feature of phaser can be used if you just quickly want to know what is up with the current values in the pointer object at game.input.mousePointer

```js
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', 
    {
 
        render : function () {
 
            game.debug.pointer(game.input.mousePointer);
 
        }
 
    }
);
```

just playing around with this simple demo, you should notice some values of the pointer object such as the position, and duration if the mouse button is down.

## 3 - Mouse is down

Now that I know where to look for current mouse values, I would like to do something with that data. Maybe just another quick demo where I am just testing things out with a mouse pointer object. Something like changing text data when the mouse button is down.

```js
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {
 
        create : function () {
 
            var st = {
                fill : '#ffffff',
                font : '15px courier'
            };
 
            game.add.text(20, 20, 'tx0', st);
            game.add.text(20, 40, 'tx1', st);
 
        },
 
        update : function () {
 
            var pt = game.input.mousePointer,
            time,
            tx = game.world.children;
 
            if (pt.isDown) {
 
                // time can be found thanks to pt.timeDown
                time = new Date() - pt.timeDown;
 
                tx[0].text = 'mouse is down!';
                tx[1].text = time;
 
            } else {
 
                tx[0].text = 'mouse is not down.';
                tx[1].text = '';
 
            }
 
        },
 
        render : function () {
 
            //game.debug.pointer(game.input.mousePointer);
 
        }
 
    });
```

I will not cover pointer objects in detail here, that will be fore another post. However in the above example I am using pointerObject.timeDown to help me find how long the mouse button has been pressed down, a common value of interest in a lot of games.

## 4 - Conclusion

There is a whole lot more on just input in phaser, this post and many more on it will be updated as my content grows
