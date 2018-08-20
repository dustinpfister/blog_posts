---
title: Rotating one sprite around another in Phaser using Point.rotate
date: 2018-08-20 11:56:00
tags: [js,phaser,games,canvas]
layout: post
categories: phaser
id: 265
updated: 2018-08-20 12:30:31
version: 1.6
---

So far this week I have been expanding my content on [Phaser ce](https://photonstorm.github.io/phaser-ce/) with the Point Class. This is a very helpful Class that helps with common issues that developers run into when dealing with points in a 2d space. In this post I will be writing about the Point.rotate methods, that can be used to rotate a sprite around another sprite, or any object that has exposed x, and y properties for that matter. This should be fun, so lets get into it.

<!-- more -->

## 1 - what to know before continuing

This is a post on the Point.rotate static method, and it's Point Class prototype equivalent method in the HTML 5 game framework know as phaser ce. This is not a getting started post on Phaser in general, if you are new to phaser you might want to start with a getting started post on phaser, and brush up more on more general concepts with phaser, before getting into more specific posts like this. Also In this post I am using phaser 2.x, and not the newer phaser 3.x.


## 2 - Some very basic examples of the Phaser.Point.rotate method

So lets start off by playing around with a few very simple examples of the Point.rotate method in both it's static, and prototype form. Once we have a good feel for how to work with this method we can get into some more interesting examples with it.

### 2.1 - Using the static method form of Point.rotate

So like many of the methods in the Point class, they can be used in both a static, and prototype form, out of the gate, without having to do something fancy with call. In most cases I will want to use the static form of the method, because there are a lot of things in Phaser that are not instances of Phaser.Point, but do have exposed x, and y properties in the object, and I will want to use those objects with these methods.

The Phaser.Point.rotate methods works by first giving the object that I want to rotate around another object, I then give the x, and y values of the point that I want this object to rotate around. Then I give the angle in radians or degrees depending on the state of the next argument that is a boolean to set to degrees or radians. Then at least the final sixth argument is the distance between the two points.

So then an example of the static from of Point.rotate might look like this.

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

So then the static method version is great for working with any kind of object that has exposed x, and y values. No need to use the prototype version with call or apply.

### 2.2 - Using the prototype form of the method

So then there is also the prototype version of the same method, that works the same way as the static method, but I do not have to give the object that I want to rotate as the first argument, because that is the instance of Point that I am calling the method off of.

```js
// objects for centerPoint, and a thing that
// I want to rotate around it.
var thing = new Phaser.Point(100, 100),
center = new Phaser.Point(0, 0);
 
// Using the prototype method
thing.rotate(center.x, center.y, 45, true, 100);
 
console.log(Math.floor(thing.x), Math.floor(thing.y)); // 0 100
```

This method can also be used in the same manor as the static method if I use Function.call. However why bother with that when I have the static version there before hand?