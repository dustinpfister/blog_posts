---
title: Setting, and getting point length in phaser with Point.setMagnitude, and Point.getMagnitude.
date: 2018-08-22 09:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 267
updated: 2018-08-22 10:05:46
version: 1.1
---

So these days I have been expanding my content on [Phaser ce](https://photonstorm.github.io/phaser-ce/), because phaser is just awesome, and deserves a fair share of my attention. In todays post I will be writing yet another post on the Point class, and it's many useful methods. This time I will be writing about Point.setMagnitude, and Point.getMagnitude. Just yesterday I wrote a post on Point.normalize which is the same as using Point.setMagnitude(1). So in other words normalizing a Point is the process of making the unit length of a Point one. The methods I will be writing about in this post have to do with setting the length to something other than one.

<!-- more -->

## 1 - What to know before continuing


## 2 - Basic example of Point.setMagnitude()


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