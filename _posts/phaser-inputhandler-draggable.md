---
title: Making game display objects draggable in phaser
date: 2017-10-24 12:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 74
updated: 2017-10-28 18:00:11
version: 1.3
---

Making a display object (sprites, graphics, ect) draggable in [phaser](http://phaser.io) is pretty easy, assuming it allows for the enabling of an input handler (Sprites, and Graphics do at least). In this post I will be should how to get started with doing this.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## Draggable simple hello world example

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

First I want to enable the input handler for the display object, by setting it's inputEnable property to true. Once that is done the input property of the display object will be an instance of inputControler rather than null, and as such I can now set the draggable property of the display objects input control to true. The display object should now be draggable.

## Whats next with draggable display objects

There are a lot of other things that are of interest once I have started with draggable display objects. Such as setting some values that have to do with setting snap values, and adding event handlers.

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

## Conclusion

I hope this post helped you get at least a basic idea of how to get started with dragging sprites, and graphics in phaser. There is a lot more to write about when it comes to the input handler, events, and so forth, when I have more relevant content elsewhere I will update this post.

{% phaser_bottom %}