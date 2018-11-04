---
title: The Point Class in phaser ce
date: 2018-11-03 09:48:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 320
updated: 2018-11-04 11:54:24
version: 1.6
---

So for the past few months I have been expanding, and updating  my content on [Phaser ce](https://photonstorm.github.io/phaser-ce/) the javaScript powered game framework, and have discovered that I do not have a post on the Point Class in general. Having a solid grasp on this class is important because it's use comes up a lot throughout the framework with anything and everything that has to do with a single point in a 2d [coordinate system](https://en.wikipedia.org/wiki/Coordinate_system). So in this post I will be going over some simple examples, as well as more advanced examples of the Point class in phaser ce, and link off into other relevant posts on this Class and it's many important and useful methods.

<!-- more -->

## 1 - What to know before continuing

This is a post on the Point Class in phaser ce which contains many useful methods for working with 2d points. This is not a getting started post on phaser ce, and javaScript in general.


## 2 - Basic example of Phaser.Point

To create an instance of Phaser.Point I just need to call the constructor with the new keyword, and pass the x and y values for the point. Once that is done I can use methods such as Point.angle which will give me the angle to another given point.

```js
var pt = new Phaser.Point(10, 10);
 
// so then there are the x and y properties of the point
console.log(pt.x, pt.y); // 15, 20
 
// and then there are methods that can be used with other points
var pt2 = new Phaser.Point(20, 20),
angle = pt.angle(pt2);
console.log(angle / Math.PI * 180); // 45
```

In addition to prototype methods there are also static methods that can be used as well without having to create point instances first.

## 2 - Getting the angle between two points

```js
// very basic
var angle = Phaser.Point.angle({x:0,y:0},{x:10,y:10});
console.log( angle );  // 0.7853981633974483
console.log( angle / Math.PI * 180); // 45
```

/2018/08/19/phaser-point-angle-between-two-sprites/

## 3 - Getting the distance between two points

```js
var pt1 = new Phaser.Point(10, 10),
pt2 = new Phaser.Point(90, 10)
 
console.log( 'distance: ' + pt1.distance(pt2) ); // 'distance: 80';
```

## 4 - Rotating one point around another

I [wrote a post on this using Point.rotate](/2018/08/20/phaser-point-rotate-sprite-around-another/) but I will also cover it beirfly here as well.

```js
// objects for centerPoint, and a thing that
// I want to rotate around it.
var thing = new Phaser.Point(100, 100),
center = new Phaser.Point(0, 0);
 
// Using the prototype method
thing.rotate(center.x, center.y, 45, true, 100);
 
console.log(Math.floor(thing.x), Math.floor(thing.y)); // 0 100
```