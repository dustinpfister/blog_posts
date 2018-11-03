---
title: The Point Class in phaser ce
date: 2018-11-03 09:48:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 320
updated: 2018-11-03 13:56:39
version: 1.1
---

So for the past few months I have been expanding, and updating  my content on [Phaser ce](https://photonstorm.github.io/phaser-ce/) the javaScript powered game framework, and have discovered that I do not have a post on the Point Class in general. Having a solid grasp on this class is important because it's use comes up a lot throughout the framework with anything and everything that has to do with a single point in a 2d [coordinate system](https://en.wikipedia.org/wiki/Coordinate_system). So in this post I will be going over some simple examples, as well as more advanced examples of the Point class in phaser ce, and link off into other relevant posts on this Class and it's many important and useful methods.

<!-- more -->

## 1 - What to know before continuing


## 2 - Basic example of Phaser.Point

```js
var pt = new Phaser.Point(10, 10);
 
// so then there are the x and y properties of the point
console.log(pt.x, pt.y); // 15, 20
 
// and then there are methods that can be used with other points
var pt2 = new Phaser.Point(20, 20),
angle = pt.angle(pt2);
console.log(angle / Math.PI * 180); // 45
```