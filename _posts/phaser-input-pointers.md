---
title: Getting started with multi touch in phaser with the pointers array.
date: 2017-10-19 10:53:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 68
updated: 2017-10-22 13:49:01
version: 1.5
---

The pointers array in phaser will contain an array of [pointer objects](/2017/10/17/phaser-input-pointer-objects/) for each non mouse pointer object. This can be useful for working on any project that may involve multi touch. It can be thought of as an alternative to the pointer1, pointer2, pointer3, etc objects available via [game.input](/2017/10/13/phaser-gameobj-input/).

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## Quickly getting started with the pointers array

One way to quickly know what is going on with the current status of the pointers array is by using the pointer debug method.

```js
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {
 
    render : function () {
 
        // show what is going on with the pointers array.
        game.input.pointers.forEach(function (pointer) {
 
            game.debug.pointer(pointer);
 
        });
 
    }
 
});
```

## Using game.input.addPointer to increase the length of the pointers array

By default there are only two pointer objects in the pointers array, if You want to make a project that makes use of more pointers you will want to use the addPointer method to do so.

```js
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {
 
        create : function () {
 
            // pointer1, and pointer2 exist by default
            console.log(game.input.pointers.length); // 2
 
            game.input.addPointer(); // add pointer3
            game.input.addPointer(); // add pointer4
            game.input.addPointer(); // add pointer5
            console.log(game.input.pointers.length); // 5
 
        },
 
        render : function () {
 
            game.input.pointers.forEach(function (pointer) {
 
                game.debug.pointer(pointer);
 
            });
 
        }
 
    });
```

## Max Pointers

As of this writing I am using phaser 2.8.8, and the max amount of pointers allow appears to be 10. I can not see a need for there to be more than that, so I would say that is an adequate ceiling for it.

## Comparison with pointer1, pointer2, pointer3, ect

There are a number of properties in the game.input object that contain references to the latest pointer object for a certain touch in multi touch. That is if just one finger is on the screen then what is going on with it can be found at game.input.pointer1, if there are two fingers, and you want to do something involving that data, then game.input.pointer2 is of interest.

This is basically just a different way of accessing the same data in that game.input.pointer1 is the same thing as game.input.pointers[0].

```js
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', 
 
    {
 
        create : function () {
 
            var bx = game.add.graphics(0, 0);
 
            bx.beginFill(0x00ff00);
            bx.drawCircle(0, 0, 100);
            bx.endFill();
 
        },
 
        render : function () {
 
            var bx = game.world.children[0];
 
            // setting x via pointers array
            bx.x = game.input.pointers[0].x;
 
            // setting y via pointer1
            bx.y = game.input.pointer1.y;
 
        }
 
    }
 
);
```

So both options are provided, which you use depends on your coding style.

## Multi touch example

So for full working quick example of the use of the pointers array in phaser I thought I would put together something where the position of a display object is effected by the number of active pointers there are.

```js
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gamearea', {
 
        create : function () {
 
            // a display object that will be effected
            var avg = game.add.graphics(-100, 0);
            avg.beginFill(0x00ff00);
            avg.drawCircle(0, 0, 100);
            avg.endFill();
 
            // add a third pointer
            game.input.addPointer();
 
            // maybe even a forth
            game.input.addPointer();
 
        },
 
        render : function () {
 
            // grabbing a ref to the display object this way
            var avg = game.world.children[0],
 
            // points is short for the pointer array
            points = game.input.pointers;
 
            // set some default values for the display object
            avg.x = 0;
            avg.y = 0;
 
            // the data object of a display object comes in handy for things like this
            avg.data.activeCount = 0;
 
            // loop over all pointers
            points.forEach(function (pointer) {
 
                // is the pointer active?
                if (pointer.active) {
 
                    // if so count it as part of the average
                    avg.x += pointer.x;
                    avg.y += pointer.y;
                    avg.data.activeCount += 1;
 
                }
 
            });
 
            // divide the sum over count of values for average
            avg.x /= avg.data.activeCount;
            avg.y /= avg.data.activeCount;
 
        }
 
    });
```

Whats nice about the pointers array is that it there to begin with when it comes to doing anything that involves looping over all pointer objects. Keep in mind that if you do not use the active property to weed out any inactive pointers, then values from the latest objects will be used.

## Conclusion

So the pointers array is one of two options in game.input to use when it comes to doing something involving multi touch.

{% phaser_bottom %}