---
title: The mouse pointer in phaser
date: 2017-10-12 11:27:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 61
updated: 2018-11-09 18:17:04
version: 1.16
---

When making a [phaser ce](https://photonstorm.github.io/phaser-ce/) project, unless I am making some kind of true idle game, will often need to accept input from a user somehow. When making a desktop game, the mouse is often something of interest. As such this post will cover how to work with a mouse pointer object that has current values from the mouse via [game.input.mousePointer](https://photonstorm.github.io/phaser-ce/Phaser.Input.html#mousePointer).

<!-- more -->

## 1 - what to know first

This is a post on using the mouse pointer in phaser ce the javaScript powered game framework. The mouse pointer one of many other ways to go about getting pointer state information when setting up controls for a game. There is also the active pointer as well that is a more robust pointer object that is influenced by both the mouse, and touch events. However if you are making a desktop game, or if you want to work out different controls for desktop and mobile then you will want to know a thing or two about this pointer object. 

It also goes without saying that this is not a [getting started post on phaser ce](/2017/10/04/phaser-getting-started/), I am also not going to cover many of the aspects of phaser that I am using in this post such as the [main game constructor](/2017/10/11/phaser-main-game-constructor/), and [state objects](/2017/10/06/phaser-state-objects/).

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser ce 2.11.1 of [phaser](https://phaser.io/).

### 1.2 - The mousePointer pointer object

The current [pointer object](/2017/10/17/phaser-input-pointer-objects/) for the mouse can be found at game.input.mousePointer. On a desktop system this is always there to work with when you want to do something involving the mouse.

## 2 - Phaser mouse pointer hello world

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

## 3 - Follow the mouse pointer example

In this example I made a sprite follow the mouse pointer. This makes use of the withinGame property of the mouse pointer object so that when the mouse leaves the canvas the sprite goes back to a home location else it follows the mouse pointer. In this example I also make use of some very important [Phaser.Point](/2018/11/03/phaser-point/) properties as well, mainly [Point.angle](/2018/08/19/phaser-point-angle-between-two-sprites/), and Point.distance. These point methods are used to find both the angle and distance to the mouse pointer, or the home location for that matter.

### 3.1 - The Follow Pointer method

Here is the method that sets the velocity of the sprite based on the angle and distance to the mouse pointer, or a fixed home location depending if the mouse pointer is in the canvas or not. In this method I am using a [physics enabled]( /2018/10/27/phaser-physics-getting-started/) sprite that has a physics body property, this is enabled in the create method of the state object later.

```js
var followPointer = function (game, sprite) {
 
    // the mouse pointer
    var pt = game.input.mousePointer,
    home = {
        x: game.world.centerX,
        y: game.world.centerY
    },
    angle,
    distance,
    power;
 
    if (pt.withinGame) {
        // if the mouse is in the canvas go there
        angle = sprite.position.angle(pt);
        distance = sprite.position.distance(pt);
    } else {
        // else go home
        angle = sprite.position.angle(home);
        distance = sprite.position.distance(home);
    }
 
    // set velocity of the sprite
    power = distance / 150;
    power = power > 1 ? 1 : power;
    sprite.body.velocity.set(Math.cos(angle) * 200 * power, Math.sin(angle) * 200 * power);
 
};
```

### 3.2 - create a sprite sheet with canvas

For this example I added a simple sprite sheet very quickly using a [canvas solution](/2018/08/04/phaser-spritesheet-from-canvas/) for doing so.

```js
var createBallSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};
```

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('follow-pointer', {
 
    create: function () {
 
        var data = game.data = {};
 
        createBallSheet(game);
 
        var sprite = game.data.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sheet-ball');
        sprite.anchor.set(0.5, 0.5);
        game.physics.enable(sprite);
 
    },
    update: function () {
 
        var pt = game.input.mousePointer,
        sprite = game.data.sprite;
 
        followPointer(game, sprite);
 
    }
 
});
 
game.state.start('follow-pointer');
```

## 4 - Mouse is down

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

## 5 - Conclusion

There is a whole lot more on just input in phaser, this post and many more on it will be updated as my content grows
