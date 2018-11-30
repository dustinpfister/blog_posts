---
title: Making game display objects draggable in phaser
date: 2017-10-24 12:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 74
updated: 2018-11-30 10:34:09
version: 1.12
---

Making a display object such as sprites, graphics objects draggable in [phaser](http://phaser.io) is pretty easy. I just need to make sure that the inputEnabled,a and input.draggable Booleans are set to true. There is a bot more to it than just that of course when it comes to some Signal instances, and other properties when it comes to snaping sprites to a grid and so forth. So in this post I will be covering many topics when it comes to draging a sprite with a mouse or touch device in phaser ce.

<!-- more -->

## 1 - What to know

This is a post on making sprites draggable in phaser ce. I am not going to cover everything there is to know about [sprites](/2018/11/26/phaser-sprite/), [signals](/2018/10/04/phaser-signal/), and [input](/2017/10/13/phaser-gameobj-input/) in phaser ce here as I have many posts on those subjects. If you are new to phaser I have a post on getting stared with phaser ce as well.

### 1.1 - This is a phaser ce 2.x post

The version of [phaser](https://phaser.io/) I am using in this post is 2.11.1, which is a late version of phaser community edition 2.x, and not the newer 3.x major release. As such the code in this post might break with newer major releases.

## 2 - Draggable simple hello world example

A basic example of this will involve just creating a Sprite, Graphics object or any display object in phaser ce that supports this, and just set the inputEnabled boolean of the display object true, and do the same for the input.draggable as well.

So if you are looking for a simple getting started example it might look something like this.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
{
 
        // create the sprite
        create : function () {
 
            var bx = game.add.graphics(game.world.centerX, game.world.centerY);
 
            bx.beginFill(0xff0000);
            bx.drawRect(-50, -50, 100, 100);
            bx.endFill();
 
            bx.inputEnabled = true;
            bx.input.draggable = true;
 
        }
 
    }
 
);
```

When this example is up and running it will result in a simple red box at the center of the screen that can be dragged across the screen with a mouse or touch screen device. If that is all you care about mission accomplish, however chances are you also want to do more than just that. There is having the display object snap in place on a grid, or have an event fire when it is placed in a certain location. So lets take a look at some more examples that get into these other related topics when it comes to dragging sprites with phaser.

## 3 - Getting started with snap values.

There are a lot of other things that are of interest once I have started with draggable display objects. Such as setting some values that have to do with setting snap values, and adding event handlers. This is a simple example that makes use of the input.snapX, and input.snapY properties as well as the onDragStop event that can now be used with a draggable sprite or graphics object.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
{

        // create the sprite
        create : function () {
 
            var bx = game.add.graphics(game.world.centerX, game.world.centerY);
 
            bx.beginFill(0xff0000);
            bx.drawRect(-160, -120, 160, 120);
            bx.endFill();
 
            bx.inputEnabled = true;
            bx.input.draggable = true;
 
            bx.input.snapOnRelease = true;
            bx.input.snapX = 160;
            bx.input.snapY = 120;
 
            bx.events.onDragStop.add(function (bx) {
 
                // snap back to center
                if (bx.x <= 0 || bx.x >= 480 || bx.y <= 0 || bx.y >= 360) {
 
                    bx.x = 160;
                    bx.y = 120;
 
                }
 
            });
 
        }
 
    }
 
);
```

The snapX, and snapY properties can be used to define the width and height of a snap grid, and then I can make it so that the display object will snap to a location in that grid when release. In addition now that input is enabled, I have event handlers that can be used in the events property of the display object including events like onDragStop. Here I am using that event handler to set the display object back to a certain location when it goes out of bounds.

## 4 - Conclusion

I hope this post helped you get at least a basic idea of how to get started with dragging sprites, and graphics in phaser. There is a lot more to write about when it comes to the input handler, events, and so forth, when I have more relevant content elsewhere I will update this post.
