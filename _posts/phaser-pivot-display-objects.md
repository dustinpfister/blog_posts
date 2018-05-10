---
title: Pivoting phaser display objects such as graphics, and sprites.
date: 2018-01-23 20:15:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 134
updated: 2018-01-23 20:42:35
version: 1.1
---

I have been making a new project as of late that makes use of [phaser](http://phaser.io) as a dependency, and came across something that I think might be worth a quick post. It has to do with setting a point that is to be a point at which a display object is to rotate. That is when I set the angle property of a display object I want to set the point at which the rotation is to occur. To do this I will want to make use of the pivot object.

<!-- more -->

## What to know before hand

This is a post on the html 5 game framework phaser, it is not a getting started post on this as I [have written that](/2017/10/04/phaser-getting-started/). In addition this post has to do with display objects used in phaser, it you are not up to speed with that check out my post on working with on the fly [graphics](/2017/10/21/phaser-graphics/), or look into how to get started with sprites.

## The angle property used with display objects in phaser.

So when working with a display object in phaser there is the angle property. It is very easy to use just set the desired angle in degrees and the display object will rotate to the angle. Simple enough, but what about the point at witch the angle rotates?

If I place a sheet of paper on a table I can rotate it in a way in which the upper left point of the sheet stays fixed where it is, and th rest of the sheet rotates around that point. However I could also rotate in in a manner in which this point is at the center of the paper, or at any point that I want. This is where the pivot object comes into play, it can be used to set that point.

## The pivot object

To set the pivot point just set the x, and y values of the pivot object to the desired point relative to the upper left point of the display object. Now when I set the angle of the display object it will rotate around that point.