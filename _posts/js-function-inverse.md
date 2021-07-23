---
title: javaScript inverse functions
date: 2021-07-23 11:08:00
tags: [js]
layout: post
categories: js
id: 917
updated: 2021-07-23 11:45:49
version: 1.10
---

I have made an [experience point system](/2020/04/27/js-javascript-example-exp-system/), It works okay, but it lacks some additional features that I would like to add. So as of late I have been making a few new systems, but I have found that I should maybe take a step back and work on some more [basic functions](/2019/12/26/js-function/) before progressing on to making one or more experience point systems. I say that because I think I need to work out some things when it comes to [inverse functions](https://en.wikipedia.org/wiki/Inverse_function) which is a subject that seems to come up when getting into making an experience point system, at least speaking from my experience with making experience point systems thus far, not pun intended. 

Simply put when I am making an experience point system I like to have two methods that give me an unknown value when I have a known value. As you might expect I like to have a method that will return a level number when an experience point number is given, and another function that will give an experience point number when a level number is given. So in other words I want a kind of get level function, and an _inverse_ of this get level function that would be called something like get exp. Some times when trying to make this set of functions I get stuck, and I start to think that I might be wasting time trying to do the impossible because I am trying to create an inverse function, for a function that can not be inverted. 

Some times I might be working with something that is [not monotonic](https://en.wikipedia.org/wiki/Monotonic_function), or even possibility a kind of [one way function](https://en.wikipedia.org/wiki/One-way_function). That is a kind of function where there is more than one possibility for a given set of known arguments, or I have a function where it it is easy to make one function but hard if not possible at all to make the inverse of the easy to make function. So it would seem that in order for a function to be invertible it must be a kind of [pure function](/2020/06/18/js-function-pure/), and also it must be monotonic so that there is never the same output for two different arguments. On top of that in some cases it might be hard to still find or make an inversion of a function, even if it might be be pure and monotonic.

<!-- more -->

## 1 - Some basic examples of inverse functions

In this section I will be going over just a few simple examples of what an inverse of a function is. This are just a few basic hello world type examples.

### 1.1 - Multiply and divide example

```js
// get x function with div
var getX = function (y) {
    return y * 5;
};
 
var getY = function (x) {
    return x / 5;
};
 
// getting x when I know y
var x = getX(12);
console.log(x); // 60
// when I feed x to my getY function
// I should get the original value I gave to getX
var y = getY(x, 5);
console.log(y); // 12
```

### 1.2 - Simple expressions example

```js
// have x, return y
var getY = function(x){
    return 5 * x - 7;
};
// have y, return y
var getX = function(y){
   return ( y + 7 ) / 5;
};
 
// The functions can be used to get
// whatever the unknown is for a given known
 
// have y to get x
var x = getX(42);
var y = getY(x);
console.log(x); // 9.8
console.log(y); // 42
 
// have x to get y
var y = getY(9.8);
var x = getX(y);
console.log(x); // 9.8
console.log(y); // 42
```

### 1.3 - Math pow and Math log

```js
// get x when I know y and base
var getX = function (y, base) {
    return Math.pow(base, y);
};
// get y when I know x and base
var getY = function (x, base) {
    return Math.log(x) / Math.log(base);
};
// looks good
var x = getX(4, 2);
console.log(x); // 16
var y = getY(x, 2);
console.log(y); // 4
```

## 2 - Some examples that have to do with angles and distances

### 2.1 - Radians and Degrees

```js
var getDegree = function (radian) {
    return radian / (Math.PI * 2) * 360;
};
 
var getRadian = function (degree) {
    return degree / 360 * (Math.PI * 2);
};
 
var d = getDegree(1.5707963267948966);
console.log(d); // 90
var r = getRadian(d);
console.log(r); // 1.5707963267948966
```

### 2.2 - Math.atan2

```js
// get d when normalized x, and y are known
var getD = function (x, y) {
    var n = Math.atan2(y, x),
    radian = n < 0 ? Math.PI + (Math.PI - Math.abs(n)) : n;
    return radian / (Math.PI * 2) * 360;
};
 
// get a normalized position when d is known
var getPos = function (d) {
    var radian = Math.PI / 180 * d;
    return {
        x: Math.cos(radian),
        y: Math.sin(radian)
    };
};
 
var d = getD(0.9396926207859084, 0.3420201433256687);
console.log(d); // 20
var pos = getPos(20);
console.log(pos);
// { x: 0.9396926207859084, y: 0.3420201433256687 }
```

### 2.3 - Distance and angle

```js
// get radian, get degree, and a distance function
var getRadian = function (degree) {
    return degree / 360 * (Math.PI * 2);
};
var getD = function (x, y) {
    var n = Math.atan2(y, x),
    radian = n < 0 ? Math.PI + (Math.PI - Math.abs(n)) : n;
    return radian / (Math.PI * 2) * 360;
};
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// get position when distance and degree are known
var getPosition = function (dist, degree) {
    var radian = getRadian(degree);
    return {
        x: Math.cos(radian) * dist,
        y: Math.sin(radian) * dist
    }
};
// get distance and degree when position is known
var getDistAngle = function (x, y) {
    var dist = distance(0, 0, x, y);
    return {
        dist: dist,
        degree: getD(x, y)
    }
};
// looking good
var pos = getPosition(9, 20);
console.log(pos);
// { x: 8.457233587073176, y: 3.0781812899310186 }
var da = getDistAngle(pos.x, pos.y);
console.log(da);
// { dist: 9, degree: 20 }
```

## 3 - Conclusion

