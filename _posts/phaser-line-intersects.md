---
title: Finding if two lines intersect in phaser ce
date: 2018-11-06 19:07:00
tags: [js,phaser]
layout: post
categories: phaser
id: 323
updated: 2018-11-06 19:22:27
version: 1.3
---

When making a game with [Phaser ce](https://photonstorm.github.io/phaser-ce/) some projects may involve working with lines. Ither for the sake of making graphics, or for the sake of working out game mechanics. When using lines to work out mechanics there os often a need to find out if one line intersects with another line, or with a rectangle area. For this there is the [Phaser.Line.intersects](https://photonstorm.github.io/phaser-ce/Phaser.Line.html#_intersects), and [Phaser.Line.intersectsRectangle](https://photonstorm.github.io/phaser-ce/Phaser.Line.html#_intersectsRectangle) static [Phaser.Line](/2017/10/28/phaser-line/) methods. In this post I will be outlining some examples of using these methods to find line intersection points.

<!-- more -->

## 1 - What to know before continuing

This is a post on Phaser.Line class methods that can be used to find if a line intersects with another line or rectangle. This is not a getting started post on phaser ce, or javaScript in general so I assume that you have at least some background working with phaser, and would like to learn more about working with lines in phaser ce.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](http://phaser.io/)

## 2 - Basic example of Phaser.Line.intersects

A basic example of Phaser.Line.intersects is simple enough. I just need to call the static method and pass the two lines to which I want to check for intersection. If the two lines do intersect then a point will be returned that will be the point at which they intersect.

```js
var line1 = new Phaser.Line(10, 50, 10, 100),
line2 = new Phaser.Line(20, 75, 8, 75),
 
intersect = Phaser.Line.intersects(line1, line2);
 
console.log(intersect.x, intersect.y); // 10 75
```

## 3 - Conclusion

