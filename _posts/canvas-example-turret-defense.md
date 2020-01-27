---
title: A Canvas example of a turret defense game
date: 2020-01-10 18:04:00
tags: [canvas]
categories: canvas
layout: post
id: 590
updated: 2020-01-27 09:20:19
version: 1.6
---

Todays post will be on yet another canvas example, this time a turret defense style game demo type thing that might be fun. This example will make used of a lot of different methods some of which have to do with many concerns surrounding angles. So it will involve creating a utility module of sorts with methods that can be used for things like finding the distance between two points as well as the angular distance between two angles. Once that module is covered I will then be getting into the main game module, and then finally the module that is used to render the sate of this game to the canvas.

<!-- more -->


## 1 - The utility module of this canvas example of a turret defense game

So to start off with lets take a look the the custom utility module that I made for this canvas example. Here I have many methods for working with angles mostly, but it is still a general utility module of sorts that will be used in the game module that I will be going over in the next section.

### 1.1 - The mathematical modulo method and the start of the module

Here I have the mathematical module method. This is something that I covered in another post way back when it comes to something that is wrong with the built in javaScript module operator and how some might expect modulo to work.

```js
var u = {
    defaultAngleScale: Math.PI * 2
};
 
// mathematical modulo
u.mod = function (x, m) {
    return (x % m + m) % m;
};
```

### 1.2 - Normalize half

This can be used to normalize and angle to half.

```js
u.normalizeHalf = function (n, scale) {
    var c = scale || u.defaultAngleScale,
    h = c / 2;
    return u.mod(n + h, c) - h;
};
```

### 1.3 - The distance formula

I am going to want a method that can be used to find the distance between two points for the sake of collision detection.

```js
// distance
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.4 - The angle distance method

This is like the other distance formal only instead of getting the distance between two points, I am getting the distance between two angles.

```js
// the angular distance between two angles
u.angleDistance = function (a, b, scale) {
    var m = scale || u.defaultAngleScale,
    h = m / 2,
    diff = u.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};
```

### 1.5 - Get an angle to a point

```js
// get the angle from one point to another
u.getAngleToPoint = function (pt1, pt2) {
    return u.normalizeHalf(Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x));
};
```

### 1.6 - Get shortest direction

```js
// get -1, 1, or 0 depending on the the state of two angles
u.shortestAngleDirection = function (a1, a2) {
    var z = a1 - a2,
    x = u.normalizeHalf(z);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};
```