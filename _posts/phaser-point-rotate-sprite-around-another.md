---
title: Rotating one sprite around another in Phaser using Point.rotate
date: 2018-08-20 11:56:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 265
updated: 2018-08-20 12:15:58
version: 1.3
---

So far this week I have been expanding my content on [Phaser ce](https://photonstorm.github.io/phaser-ce/) with the Point Class. This is a very helpful Class that helps with common issues that developers run into when dealing with points in a 2d space. In this post I will be writing about the Point.rotate methods, that can be used to rotate a sprite around another sprite, or any object that has exposed x, and y properties for that matter. This should be fun, so lets get into it.

<!-- more -->

## 1 - what to know before continuing

This is a post on the Point.rotate static method, and it's Point Class prototype equivalent method in the HTML 5 game framework know as phaser ce. This is not a getting started post on Phaser in general, if you are new to phaser you might want to start with a getting started post on phaser, and brush up more on more general concepts with phaser, before getting into more specific posts like this. Also In this post I am using phaser 2.x, and not the newer phaser 3.x.


## 2 - Some very basic examples of the Phaser.Point.rotate method

So lets start off by playing around with a few very simple examples of the Point.rotate method in both it's static, and prototype form. Once we have a good feel for how to work with this method we can get into some more interesting examples with it.

### 2.1 - Using the static method form of Point.rotate


```js
// objects for centerPoint, and a thing that
// I want to rotate around it.
var thing = {
    x: 100,
    y: 100
},
center = {
    x: 0,
    y: 0
};
 
// Using the static method
Phaser.Point.rotate(thing, center.x, center.y, 45, true, 100);
 
console.log(Math.floor(thing.x), Math.floor(thing.y)); // 0 100
```

### 2.2 - Using the prototype form of the method

```js
// objects for centerPoint, and a thing that
// I want to rotate around it.
var thing = new Phaser.Point(100, 100),
center = new Phaser.Point(0, 0);
 
// Using the prototype method
thing.rotate(center.x, center.y, 45, true, 100);
 
console.log(Math.floor(thing.x), Math.floor(thing.y)); // 0 100
```