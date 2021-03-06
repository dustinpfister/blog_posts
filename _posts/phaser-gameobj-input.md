---
title: An overview of the main phaser input manager via game.input
date: 2017-10-13 09:22:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 63
updated: 2018-11-26 12:00:46
version: 1.11
---

This post is an overview of the main [phaser ce](https://photonstorm.github.io/phaser-ce/) input hander that can be found at game.input in a phaser game object instance. There is much to be said about [Input](http://phaser.io/docs/2.6.2/Phaser.Input.html) (what is used via game.input), and [InputHander](http://phaser.io/docs/2.6.2/Phaser.InputHandler.html) (what is used in game objects like sprites). However this post is mainly just an outline of what there is to work with via the Input instance at game.input.

<!-- more -->

## 1 - What to know

This is a post in the main input handler that is used at game.input in the game framework known as phaser. It is not a getting started post on phaser, javaScript or any additional skills that are required before hand. If you are new to phaser you might prefer to start with my [getting started post on phaser](/2017/10/04/phaser-getting-started/).

## 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](https://phaser.io/).

## 1.1 - Two general approaches with input

There are two general ways of handling input with phaser. One is to poll certain objects, or setup certain event handlers via game.input, of which this post is mainly about. The other approach is to do something involving the input handlers for game objects like sprites, if you are more interested in the approce you might want to check out my post on [enabling input with a sprite](/2017/10/23/phaser-components-input-enabled/), and another relevant post on that subject about [making sprites draggable](/2017/10/24/phaser-inputhandler-draggable/).

## 1.2 - Confusion over input and inputHander

What is given at game.input is an instance of input which differs from Phasers inputHander which is used in game objects like sprites. If you just want to know what the current status of some device is, then you would want to check out what is going on with instance of input at game.input. However if you want to attach some kind of event handler to a game object, which in many cases may be a better alternative, then you want to look into the Phaser inputHander, which is outside the scope of this post.

## 3 -Demo using game.input

I put together a quick demo for getting started with doing something with some values that are available at game.input. It's not my best work, but you should get the idea at least. In this demo I am using values at game.input.activePointer To get values for the latest pointer object (mouse or touch event) to move a chicken.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // load the sprite sheet
        preload : function () {
 
            game.load.spritesheet('cucco', '/img/cuccos_zelda4.png', 20, 20, 10);
 
        },
 
        // create the sprite
        create : function () {
 
            var sprite = game.add.sprite(160 - 40, 120 - 40, 'cucco');
 
            sprite.width = 80;
            sprite.height = 80;
 
        },
 
        update : (function () {
 
            var f = 0,
            lt = new Date(),
            rate = 1000 / 12;
 
            return function () {
 
                var sprite = game.world.children[0],
                pt = game.input.activePointer;
 
                if (pt.isDown) {
 
                    var r = Math.atan2(pt.y - sprite.y, pt.x - sprite.x);
 
                    sprite.x += Math.cos(r);
                    sprite.y += Math.sin(r);
 
                    sprite.frame = f + 2;
 
                    if (new Date() - lt > rate) {
 
                        f += 1;
                        if (f == 2) {
 
                            f = 0;
 
                        }
 
                        lt = new Date();
 
                    }
 
                } else {
 
                    // chicken is at rest state
                    sprite.frame = 0;
 
                }
 
            };
 
        }
            ())
 
    }, false, false);
```

If the isDown property of the pointer object is false, then the sprite will not go anywhere, and have a frame index of 0, which is just a picture of the chicken standing there doing nothing. If isDown is true however the chicken will move to the position of the pointer object, and a moving animation will occur.

## 3.1 - game.input.activePointer

The activePointer use in the demo above is helpful if you want to do something with values contained in the latest [pointer object](/2017/10/17/phaser-input-pointer-objects/). On systems that are a desktop system with a touch screen this can be the latest touch, or mouse event.

## 4 - keyboard

keyboard input can be handled via game.input.keyboard, I wrote a full post on working with the [keyboard here](/2017/10/13/phaser-gameobj-input-keyboard/).

## 5 - game.input.mousePointer

This is another [pointer object](/2017/10/17/phaser-input-pointer-objects/), but this is just the latest pointer Object concerning the mouse only when making a desktop game.

## 6 - pointer1, pointer2, ect

There are a few pointer objects at game.input.pointer1, game.input.pointer2, ect. each of these are references to pointer objects that contain the latest values for each finger in the event of multi touch.

```js
var game = (function () {
 
    var disp;
 
    return new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {
 
        create : function () {
 
            disp = game.add.text(10, 10, '', {
                    fill : 'white'
                });
 
        },
 
        update : function () {
 
            // the active pointer
            var pt = game.input.activePointer;
 
            // uncomment for the mouse pointer
            //var pt = game.input.mousePointer;
 
            // uncomment for touch pointer1
            //var pt = game.input.pointer1;
 
            // uncomment for touch pointer2
            //var pt = game.input.pointer2;
 
            disp.text = pt.x + ',' + pt.y;
 
        }
 
    });
 
}
    ());
```

## 7 - Conclusion

Handling input in phaser can be a little overwhelming at first if you are new to the framework, but it might be helpful to just remember that there is the main input handler at game.input, and input handlers that can be activated for game display objects such as sprites. There are [standard pointer objects](/2017/10/17/phaser-input-pointer-objects/) that can always be polled (game.input.activePointer, [game.input.mousePointer](/2017/10/12/phaser-input-mousepointer/), ect). There are also ways of setting up certain event handlers, both in general, and for a certain sprite. It is a bit to take in, but once you have a basic grasp of whats there, I find that it does help speed up development time compared to setting up something of my own.
