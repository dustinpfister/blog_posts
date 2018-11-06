---
title: Getting a center point in an array of points with Phaser ce
date: 2018-11-05 13:41:00
tags: [js,phaser]
layout: post
categories: phaser
id: 322
updated: 2018-11-05 19:30:51
version: 1.1
---

[Phaser ce](https://photonstorm.github.io/phaser-ce/)

<!-- more -->

## 1 - What to know before continuing

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](http://phaser.io/)

## 2 - Basic example of Point.centroid

```js
var points = [];
 
points.push( new Phaser.Point(100,0));
points.push( new Phaser.Point(200,0));
 
var centroid = Phaser.Point.centroid(points);
 
console.log( centroid.x, centroid.y); // 150 0
```
