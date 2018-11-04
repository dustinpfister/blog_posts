---
title: The Point Class in phaser ce
date: 2018-11-03 09:48:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 320
updated: 2018-11-04 15:49:10
version: 1.10
---

So for the past few months I have been expanding, and updating  my content on [Phaser ce](https://photonstorm.github.io/phaser-ce/) the javaScript powered game framework, and have discovered that I do not have a post on the Point Class in general. Having a solid grasp on this class is important because it's use comes up a lot throughout the framework with anything and everything that has to do with a single point in a 2d [coordinate system](https://en.wikipedia.org/wiki/Coordinate_system). So in this post I will be going over some simple examples, as well as more advanced examples of the Point class in phaser ce, and link off into other relevant posts on this Class and it's many important and useful methods.

<!-- more -->

## 1 - What to know before continuing

This is a post on the Point Class in phaser ce which contains many useful methods for working with 2d points. This is not a getting started post on phaser ce, and javaScript in general.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](http://phaser.io/)

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

So a very common task when working with points is to find the distance between two points. So of course for this there is the [Point.angle](/2018/08/19/phaser-point-angle-between-two-sprites/) method. This method can be used as a prototype method off an instance of Phaser.Point or as a stand alone static method like with this example here.

```js
// very basic
var angle = Phaser.Point.angle({x:0,y:0},{x:10,y:10});
console.log( angle );  // 0.7853981633974483
console.log( angle / Math.PI * 180); // 45
```

## 3 - Getting the distance between two points

Another common task with Points is finding the distance between two of theme. With phaser there is no need to retype or copy and past the same old distance formula each time I start a new project the Point.distance method is always there at the ready.

```js
var pt1 = new Phaser.Point(10, 10),
pt2 = new Phaser.Point(90, 10)
 
console.log( 'distance: ' + pt1.distance(pt2) ); // 'distance: 80';
```

There is also a distance formula in Phasers math object as well.

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

## 5 - Conclusion

So working with Points in phaser is a fairly easy and straight forward process once you become aware of how to go about using the class to help make quick work of common programming tasks with Points.

As I write more posts and update older content on phaser I will update this post with more examples, and links to additional content on working with Points in phaser ce. If you feel as though something is missing, mentioning it in the comments will help expedite the process of expanding this content. I have a lot of content on phaser, and posts that get the most traction do take higher priority when it comes to revision.