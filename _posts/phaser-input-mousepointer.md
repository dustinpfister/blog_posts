---
title: The mouse pointer in phaser
date: 2017-10-12 11:27:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 61
updated: 2017-10-22 13:49:01
version: 1.5
---

When making a [phaser](http://phaser.io) project, unless I am making some kind of true idel game, will often need to accept input from a user somehow. When making a desktop game, the mouse is often something of interest. As such this post will cover how to work with pointer a pointer object that has current values from the mouse.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## The mousePointer pointer object

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

## Mouse is down

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

## Conclusion

There is a whole lot more on just input in phaser, this post and many more on it will be updated as my content grows

{% phaser_bottom %}