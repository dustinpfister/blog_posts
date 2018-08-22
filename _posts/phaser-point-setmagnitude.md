---
title: Setting, and getting point length in phaser with Point.setMagnitude, and Point.getMagnitude.
date: 2018-08-22 09:56:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 267
updated: 2018-08-22 10:15:05
version: 1.4
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