---
title: Setting, and getting point length in phaser with Point.setMagnitude, and Point.getMagnitude.
date: 2018-08-22 09:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 267
updated: 2018-08-23 12:43:35
version: 1.12
---

So these days I have been expanding my content on [Phaser ce](https://photonstorm.github.io/phaser-ce/), because phaser is just awesome, and deserves a fair share of my attention. In todays post I will be writing yet another post on the Point class, and it's many useful methods. This time I will be writing about Point.setMagnitude, and Point.getMagnitude. Just yesterday I wrote a post on Point.normalize which is the same as using Point.setMagnitude(1). So in other words normalizing a Point is the process of making the unit length of a Point one. The methods I will be writing about in this post have to do with setting the length to something other than one.

<!-- more -->

## 1 - What to know before continuing

This is a post on the Point Class in Phaser ce, and html5 powered game framework with many useful little tools and methods. So to put it another way, this is a very specific post, on something that is a little complicated. I assume that you have at least some background on phaser, and javaScript in general.


## 2 - Basic example of Point.setMagnitude()

So for a very basic example of these methods I made a quick code example where I am using The Phaser.Point constructor to create a new instance of point. Then once I have my Point instance I can use the Point.getMagnitude to get the current unit length of that point, and then store that to a variable. I then use Point.normalize to set the unit length to one, which is just a shorthand for Point.setMagnitude(1). Once again I then use Point.getMagnitude to get the current unit length of the point, and sure enough it is pretty much 1 as expected. Then finally I use my startMag variable to set the unit length to one half of what it once was using Point.setMagnitude.

```js
var point = new Phaser.Point(10, 5),
startMag = point.getMagnitude();
 
console.log('start mag: ' + startMag); // 11.18...
 
// normalize or setMagnitude(1);
point.normalize();
console.log('normal mag: ' + point.getMagnitude()); // 0.99...
 
// set length to 1/2
point.setMagnitude(startMag / 2);
console.log('half mag: ' + point.getMagnitude());
console.log('pos: ', point.x, point.y); // 5.00... 2.50...
```

So the point with these methods is that they are useful for scaling points up, and down without changing the angle direction of the Point.

## 3 - A more interesting example of Point.setMagnitude

For a more advanced example of Point.setMagnitude I came up with an example that involves using a Point to set the position of a sprite that moves from one corder of the screen to another using Point.setMagnitude to set the magnitude of that point. This example demonstrates what is meant by length of a point compared to direction. Point.getMagnitude can be used to get the length of a point that is at the bottom right corner of a screen, which can be thought of as a kind of max magnitude compared to 0,0 at the top left corder. This value can then be used to set the magnitude of a point that lays anywhere between those two points.

### 3.1 - Phaser.Game instance and boot state

I start off this example by making the usual Phaser.Game instance. Once I have that I can define a boot state using game.state.add. In this state I do things with setting scaling, and anything else that I want to happen before anything else including loading, or generating sprite sheets.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
// boot state will be called first
game.state.add('boot', {
 
    create: function () {
 
        game.global = game.global || {};
        game.global.money = 0;
        game.global.taskRate = 0.25;
        game.global.upgrades = 0;
        game.global.upgradeCost = 1;
 
        // scale settings
        game.scale.compatibility.scrollTo = false;
        game.scale.pageAlignHorizontally = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.width = document.getElementById(game.parent).scrollWidth;
        game.scale.height = document.getElementById(game.parent).scrollHeight;
 
        // start buttons state
        game.state.start('gen-sheet');
 
    }
 
});
```

When I want to start this project I will do so my staring this state first, and then it will progress into the next state that will be used to generate a sprite sheet using canvas.

### 3.2 - The generate sprite sheet state

In this state I generate a canvas that will be used to make a sprite that will be moved by way of a point that will be changed by Point.setMagnitude. I have [written a post a little while back](/2018/08/04/phaser-spritesheet-from-canvas/) in which I get into this in a little more detail if interested.

```js
// generate a sprite sheet using canvas
game.state.add('gen-sheet', {
 
    create: function () {
 
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
 
        canvas.width = 32;
        canvas.height = 32;
 
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
 
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
 
        this.game.cache.addSpriteSheet('sheet-1', null, canvas, 32, 32, 1, 0, 0);
 
        game.state.start('example');
 
    }
 
});
```

I like generating sprites this way compared to loading a sheet, at least for simple demos like this.

### 3.3 - The example state

So here I have the actual example state that will demonstrate Point.setMagnitude. I start out making a sprite using the sheet that I made in a previous state, that is now in the game cache, as well as a text display object that will show the current magnitude of the Point that will be used to change the position of the sprite.

```js
// the example
game.state.add('example', {
 
    create: function () {
 
        // make a sprite
        var sprite = game.add.sprite(0, 0, 'sheet-1', 0),
        text = game.add.text(5, 5, '', {
                fill: 'white',
                font: '10px courier'
            });
 
        // append some stuff to its data object
 
        // a reference to the sprite
        sprite.data.sprite = sprite;
 
        // a point that will be used to position the sprite
        sprite.data.point = new Phaser.Point(game.world.width, game.world.height);
 
        // the max magnitude of the point
        sprite.data.maxMag = new Phaser.Point(game.world.width, game.world.height).getMagnitude();
 
        // a method that will be used to position the sprite
        sprite.data.setToPoint = function () {
            this.sprite.x = this.point.x - this.sprite.width / 2;
            this.sprite.y = this.point.y - this.sprite.height / 2;
        };
 
        // frame info
        sprite.data.frame = 0;
        sprite.data.maxFrame = 50;
 
        // fire the given callback every 1000ms
        game.time.events.loop(100, function () {
 
            let data = sprite.data,
            per = data.frame / data.maxFrame,
            bias = Math.abs(0.5 - per) / 0.5;
 
            data.point.setMagnitude(1 + (data.maxMag - 1) * bias);
            data.setToPoint();
 
            data.frame += 1;
            data.frame = data.frame % data.maxFrame;
 
            // print current magnitude
            text.text = 'mag: ' + data.point.getMagnitude().toFixed(2);
 
        });
 
    }
 
});
 
// start boot state
game.state.start('boot');
```

## 4 - Conclusion

So Point.setMagnitude is a way to set the length of a point relative to position 0,0. With complex polygons involving a lengthy array of points this can be used as a way to preform a kind of scaling of those points without changing the polar direction of the point, that is the angle will be preserved.