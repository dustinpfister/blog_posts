---
title: Working with arrays of points, and polygons in phaser
date: 2017-10-22 09:37:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 71
updated: 2017-10-28 18:00:10
version: 1.7
---

When working with on the fly graphics in [phaser](http://phaser.io/), there might come a time in which i might want to do something with a collection of points that form a shape, or drawing, or polygon. In this post I will be writing about how to make on the fly shapes without using any external assets in phaser.

<!-- more -->

{% phaser_top %}

{% phaser_if_new_mess %}

## A Graphics.drawPolygon example

I often start a post off with a simple example of what I will be writing about in more detail in post. As such here is a quick, simple example of use for [Graphics.drawPolygon](http://phaser.io/docs/2.6.2/Phaser.Graphics.html#drawPolygon) in phaser.

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
{
 
        // create method
        create : function () {
 
            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);
 
            gra.lineStyle(3, 0x00ff00);
            gra.drawPolygon([0, -100, 100, 0, 0, 100,-50,100,-50,50,-100,50,-100,-50,-50,-50,-50,-100,0,-100]);
 
        }
 
    }
 
);
```

Here I just made a very bad drawing of an arrow, but you should get the basic idea. You need create a Graphics Display Object, set a style for it, and then pass an array of points to it that follow the simple formula of:

```js
var x = pointIndex * 2,
y = pointIndex * 2 + 1;
```
## Arrays of points

How would you go about having an array of points in javaScript? Would you store an array of objects that have x, and y properties? Would you have an array of arrays where the first element is x, and the second element is y? Or would you just have a linear array of numbers that follow a certain formula?

```js
var ptFormat1 = [{x:10,y:20},{x:25,y:-50}], // Array of objects
ptFormat2 = [[10,20],[25,-50]], // Array of arrays
ptFormat3 = [10,20,25,-50];  // Formula (this is what we use in phaser)
```

Well regardless of how you might think with this in phaser just a single linear array is used, so whenever you want to feed some points to a method like Graphics.drawPolygon this is the format the array of points should be in.

## Generating a points array

So when it comes to making a shape in phaser I want to think in terms of of an array of numbers that are the x, and y values of each point.

```js
var points = (function () {
 
    var pCT = 10, // point count
    p = [], // points array to be returned
    pi = 0; // current point index
 
    while (pi < pCT) {
 
        // set some radian, and radius values for each point
        var ra = Math.PI * 2 / pCT * pi,
        ri = 75 + Math.random() * 25;
 
        // push x first, then y
        p.push(Math.cos(ra) * ri);
        p.push(y = Math.sin(ra) * ri);
 
        pi += 1;
 
    }
 
    // push first point at the end
    p.push(p[0]);
    p.push(p[1]);
 
    // return the points
    return p;
 
}
    ());
 
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea', 
 
{
 
        // create method
        create : function () {
 
            // add a graphics object to the world
            var gra = game.add.graphics(game.world.centerX, game.world.centerY);
 
            gra.lineStyle(3, 0x00ff00);
            gra.drawPolygon(points);
 
        }
 
    }
 
);
```

## Add Phaser Graphics display Object

Once I have an array of points to pass to the polygon method, the next step is the add method of the main game object that is used to create a new graphics display object via game.add.graphics(x,y). This is what I call first in my create method to get a new graphics display object that will contain the drawPolygon method, along with a bunch of other useful stuff.

```js
var gra = game.add.graphics(game.world.centerX, game.world.centerY);
```

## Setting Graphics line Style in phaser

Another important method to know of is the graphics lineStyle method, this is what to use to style lines that are used to draw polygons, and anything else in the graphic that involves drawing a line. This is a method in which I pass lineWidth, color, and alpha too in order to set line style.

```js
gra.lineStyle(3,0x00ff00,.8);
```

this sets a lineWidth of 3, a lineColor of green, and an lineAlpha (or transparent) value of .8. Of course Alternatively I can directly set those values by setting each property independently as well.

```js
gra.lineWidth = 3;
gra.lineColor = 0x00ff00;
gra.lineAlpha = .8;
```

Looking at the source code is may be generally better to use the lineStyle method as it also runs some checks on the currentPath

## Conclusion

I hope this post has helped you gain a better understanding of how to work with polyGons in phaser. If you liked this post you might want to check out my [many other posts](/categories/phaser/) on phaser. Because this post is not graphics my post on [Graphics in general](/2017/10/21/phaser-graphics/) in phaser might be of specific interest.

in any case have fun working (or playing), with phaser.

{% phaser_bottom %}