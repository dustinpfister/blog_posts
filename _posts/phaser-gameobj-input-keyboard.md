---
title: Using the keyboard in phaser via game.input.keyboad
date: 2017-10-13 10:39:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 64
updated: 2017-10-22 13:48:59
version: 1.6
---

In this post I will be outlining a quick demo in which I am moving a sprite around the screen using the keyboard in [phaser](http://phaser.io/), using an instance of the keyboard handler at via [game.input](/2017/10/13/phaser-gameobj-input/). I will also cover the different options on how to work with keyboard input. It is possible to poll a key from an update method, or create an object in which handlers, can be attached, as well as a combination of the two if desired.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## phaser keyboard isDown example

One way to make use of keyboard input in phaser is to use the isDown method of the input hander via game.input.keyboard.isDown. This would be used in an update method of a state object, rather than a handler that is fire each time the key is pressed. As such you might end up with something like this:

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
            rate = 1000 / 12,
 
            // walk animation
            walk = function (sprite) {
 
                sprite.frame = f + 2;
 
                if (new Date() - lt > rate) {
 
                    f += 1;
                    if (f == 2) {
 
                        f = 0;
 
                    }
 
                    lt = new Date();
 
                }
 
            };
 
            return function () {
 
                var sprite = game.world.children[0],
                k = game.input.keyboard,
                w = false;
 
                // A
                if (k.isDown(65)) {
 
                    sprite.x -= 1;
                    w = true;
 
                }
 
                // D
                if (k.isDown(68)) {
 
                    sprite.x += 1;
                    w = true;
                }
 
                // W
                if (k.isDown(87)) {
 
                    sprite.y -= 1;
                    w = true;
                }
 
                // S
                if (k.isDown(83)) {
 
                    sprite.y += 1;
                    w = true;
 
                }
 
                // default sprite to frame 0
                sprite.frame = 0;
 
                if (w) {
 
                    walk(sprite);
 
                }
 
            };
 
        }
            ())
 
    }, false, false);
```

This works okay, but I tend to prefer for this to be pulled into separate event handlers rather than constantly checking the status of keys in an update method.

## The addKey method

I prefer the use of the addKey method compared to polling keys with isDown method of the keyboard handler. It allows for me to create an object for a certain key such as the "a" key. I can then attach event handlers to this object that will fire when the key is pressed by using the onHoldCallback of this object that is returned using addKey.

A quick example of these callbacks in use would look like this:

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
    {
 
        create : function () {
 
            var k = game.input.keyboard;
 
            // A
            var aKey = k.addKey(65);
 
            aKey.onHoldCallback = function (key) {
 
                console.log('holding down key: ' + key.keyCode);
 
            };
 
            aKey.onDown.add(function (key) {
 
                console.log('key ' + key.keyCode + ' is now down');
 
            });
 
            aKey.onUp.add(function (key) {
 
                console.log('key ' + key.keyCode + ' is now up');
 
            });
 
        }
 
    }
 
);
```


In addition the object can be pulled in an update method just like the first example with game.input.keyboard.isDown. So I can still handle keyboard input the same way, but also attach handlers.

heres a quick example of that:

```js
var game = (function () {
 
    var aKey;
 
    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        create : function () {
 
            var k = game.input.keyboard;
 
            // A
            aKey = k.addKey(65);
 
            // I can attach handlers like
            aKey.onUp.add(function (key) {
 
                console.log('key ' + key.keyCode + ' is up');
 
            });
 
        },
 
        update : function () {
 
            // it can also be polled in an update loop
            if (aKey.isDown) {
 
                console.log('key ' + aKey.keyCode + ' is down!');
 
            }
 
        }
 
    });
 
}
    ());
```

So now my above example can also be writen like this:.

```js
var game = (function () {
 
    var f = 0,
    lt = new Date(),
    rate = 1000 / 12,
    w = false, // walk animation bool
 
    // walk animation
    walk = function (sprite) {
 
        sprite.frame = f + 2;
 
        if (new Date() - lt > rate) {
 
            f += 1;
            if (f == 2) {
 
                f = 0;
 
            }
 
            lt = new Date();
 
        }
 
    };
 
    return new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', {
 
        // load the sprite sheet
        preload : function () {
 
            game.load.spritesheet('cucco', '/img/cuccos_zelda4.png', 20, 20, 10);
 
        },
 
        // create the sprite
        create : function () {
 
            var sprite = game.add.sprite(160 - 40, 120 - 40, 'cucco');
 
            sprite.width = 80;
            sprite.height = 80;
 
            var k = game.input.keyboard;
 
            // A
            k.addKey(65).onHoldCallback = function (key) {
 
                sprite.x -= 1;
                w = true;
 
            };
 
            // D
            k.addKey(68).onHoldCallback = function (key) {
 
                sprite.x += 1;
                w = true;
 
            };
 
            k.addKey(87).onHoldCallback = function (key) {
 
                sprite.y -= 1;
                w = true;
 
            };
 
            k.addKey(83).onHoldCallback = function (key) {
 
                sprite.y += 1;
                w = true;
 
            };
 
            // set walk bool back to false on any keyup event
            k.onUpCallback = function () {
 
                w = false;
 
            }
 
        },
 
        update : (function () {
 
            return function () {
 
                var sprite = game.world.children[0];
 
                // default sprite to frame 0
                sprite.frame = 0;
 
                if (w) {
 
                    walk(sprite);
 
                }
 
            };
 
        }
            ())
 
    }, false, false);
 
}
    ());
```

## Conclusion

Phaser is great at handling Keyboard input, as long as I know how to go about using what is provided for it. I hope you found these examples helpful, if so be sure to check out my many other [posts on phaser](/categories/phaser/).

{% phaser_bottom %}