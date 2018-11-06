---
title: Getting a center point in an array of points with Phaser ce
date: 2018-11-05 13:41:00
tags: [js,phaser]
layout: post
categories: phaser
id: 322
updated: 2018-11-05 19:45:27
version: 1.5
---

In todays post on [Phaser ce](https://photonstorm.github.io/phaser-ce/) I will be covering the Point.centroid method than can be used to quickly get the arithmetic average of an array of Phaser.Point instances in the form on a single Phaser.Point instance. This might come of use in certain projects where such a point is of interest.

<!-- more -->

## 1 - What to know before continuing

This is a post on the Point.centroid method that can be used to get the average of an array of Points. I have a main post on the Phaser.Point Class that might be a better starting point if you are new to working with Points in phaser ce. This is also not a getting started post on phaser ce in general, and I also assume that you have at least some background with javaScript as well.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](http://phaser.io/)

## 2 - Basic example of Point.centroid

A basic example of Point.centroid would just be something like this then.

```js
var points = [];
 
points.push( new Phaser.Point(100,0));
points.push( new Phaser.Point(200,0));
 
var centroid = Phaser.Point.centroid(points);
 
console.log( centroid.x, centroid.y); // 150 0
```

I just created an array of two points, and then used the Phaser.Point.centroid static method to get the average of those two points.

## 3 - Conclusion

This is an interesting method, of course it would not be to hard to make my own method to do it from the ground up, but it is nice to know that many methods like this are in the Point class that can be used to help me save time from writing a solution over each time.
