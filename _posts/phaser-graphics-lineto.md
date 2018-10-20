---
title: Playing with lines in phaser with Graphics.lineTo
date: 2017-10-22 08:40:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 72
updated: 2018-10-19 21:19:07
version: 1.6
---

I have [made a post on graphics in general](/2017/10/21/phaser-graphics/) in phaser and as such I spent some time playing with Graphics.lineTo, and Graphics.moveTo when it comes to drawing lines in phaser. Because there is a great deal that can be done with lines, and graphics I thought that this needs a post of it's own. This post will mostly be about use examples of lineTo in [phaser ce](https://photonstorm.github.io/phaser-ce/index.html).

<!-- more -->

## 1 - What to know

This is a post on making lines in phaser ce with graphics display objects. It is also possible to make graphics with the 2d canvas drawing context and then [use that to make a sprite sheet](/2018/08/04/phaser-spritesheet-from-canvas/) as well. However Graphics might be a better option for making graphics that will update for each frame tick.

### 1.1 - This is a phaser 2.x post

In this post I am using the older phaser 2.x version of [phaser](https://phaser.io/).

## 2 - Getting started with lines in phaser with lineStyle, moveTo, and lineTo

To draw A line I first need to make a [Graphics](http://phaser.io/docs/2.6.2/Phaser.Graphics.html) display object via game.add.graphics to work with, once I have that I will want to set some style for the line so that I can see it if the background is black, because the default color for lines is also black, to do that I use [Graphics.lineStyle](http://phaser.io/docs/2.6.2/Phaser.Graphics.html#lineStyle) to set the style. Then it is just a matter of using [Graphics.moveTo](http://phaser.io/docs/2.6.2/Phaser.Graphics.html#moveTo) to move to a certain point, relative to the display object position, and then use [Graphics.lineTo](http://phaser.io/docs/2.6.2/Phaser.Graphics.html#lineTo) to actually draw a line.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea',
 
    {
 
        // create method
        create : function () {
 
            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);
 
            // make it a red rectangle
            gra.lineStyle(3, 0xff0000);
 
            // start by moving to a point
            gra.moveTo(0, 0);
 
            // draw a line
            gra.lineTo(100, 0);
 
        }
 
    }
 
);
```

## 3 - Arrays of points

If you are thinking about something involving an array of points, you can use the lineTo method, but what I use in that case is the [Graphics.drawPolygon](/2017/10/22/phaser-graphics-polygon/) method.

## 4 - Conclusion

The lineTo method might be useful in some cases, but for the most part I like to use polygon's when it comes to working with on the fly graphics in place of external assets.
