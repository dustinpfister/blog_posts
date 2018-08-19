---
title: Finding the angle between to sprites in phaser with the Point Class
date: 2018-08-19 19:09:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 264
updated: 2018-08-19 19:33:21
version: 1.17
---

In this point on [Phaser ce](https://photonstorm.github.io/phaser-ce/), I will be writing about finding the angle between two sprites using the Point class. looking over my content on phaser so far I am surprised that I do not have any content on the point class, so lets put and end to that with one of the most useful methods that is at the ready in that class.


<!-- more -->

## 1 - What to know before continuing.

This is a post on the html 5 game framework know as [phaser](https://phaser.io/), and how to find the angle between two sprites using a method in the [Point class](https://photonstorm.github.io/phaser-ce/Phaser.Point.html). In this post I am using phaser ce 2.x, and not the newer phaser 3. I assume that you have at least some background with phaser, and javaScript in general.

## 2 - Basic examples of Phaser.Point.prototype.angle

So lets start this post off with some very basic examples of using the angle method of the phaser point class to find the angle between two points. These two points can be instances of Phaser.Point, a display object such as a Sprite, or just a plain old object with x, and y properties.

This section will provide some very simple copy and past demos to help get a feel as to how to work with this method in different ways.

### 2.1 - Using Phaser.prototype.angle with call on two objects

The call method of the function prototype is a very powerful method, if you are not familiar with call yet as a jaavScript developer you should get up to speed with it. In a nut shell it allows me to call methods of any prototype, on any object, and if that object has the properties that the method needs, it might very well work. 

Call works by accepting the first argument that I give it as the value of the this keyword. Because Phaser.prototype.angle is a prototype method of Point the first argument that I give it should be some kind object that has proprieties that are similar to that of an instance of Point, namely x, and y properties. The next argument that i give it will be the first argument that I would give it if I was calling it on an instance of Point.

If that all confuses you just check out this example:

```js
// very basic
var angle = Phaser.Point.prototype.angle.call({x:0,y:0},{x:10,y:10});
console.log( angle );  // 0.7853981633974483
console.log( angle / Math.PI * 180); // 45
```

So in this example I am finding the angle between these two plain old objects, that have x, and y properties by using the call Function prototype method. The angle that is returned is in the range of Math.PI to -Math.PI so if I want degrees i will need to convert.
