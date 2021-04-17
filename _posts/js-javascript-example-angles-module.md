---
title: javaScript angles module example
date: 2021-04-16 14:04:00
tags: [js]
layout: post
categories: js
id: 847
updated: 2021-04-17 07:45:05
version: 1.1
---

WHen working on various [javaScript examples](/2021/04/02/js-javascript-example/) I often run into problems that have to do with angles. I often find or make solutions for these problems, but they ended up littered all over various collections of examples, and I can not always remember where a certain method that solves a given problem with angles can be found. So I thought it would be a good idea to start a javaScript example that is a stand alone module that can be used to work with angles, and various problems that have to do with angles.

<!-- more -->

## 1 - The angles module

```js
(function(anglesMod){
 
    // PI * 2
    anglesMod.PI2 = Math.PI * 2;
 
    // mathematical modulo
    anglesMod.mod = function (x, m) {
        return (x % m + m) % m;
    };
 
    // normalize an angle by half
    anglesMod.normalizeHalf = function (n, scale) {
        var c = scale || anglesMod.PI2,
        h = c / 2;
        return angles.mod(n + h, c) - h;
    };
 
    // the angular distance between two angles
    anglesMod.distance = function (a, b, scale) {
        var m = scale || angles.PI2,
        h = m / 2,
        diff = anglesMod.normalizeHalf(a - b);
        if (diff > h) {
            diff = diff - m;
        }
        return angles.mod( Math.abs(diff), scale);
    };
 
    // get the angle from one point to another
    anglesMod.getAngleToPoint = function (pt1, pt2, scale) {
        var a = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x);
        return anglesMod.normalizeHalf(a, scale || anglesMod.PI2);
    };
 
    // get -1, 1, or 0 depending on the the state of two angles
    anglesMod.shortestAngleDirection = function (a1, a2, scale) {
        var z = a1 - a2,
        x = anglesMod.normalizeHalf(z, scale || anglesMod.PI2);
        if (x < 0) {
            return -1; // Left
        }
        if (x > 0) {
            return 1; // Right
        }
        // if a1 === a2 or any other case
        return 0;
    };
 
}( typeof module === 'undefined' ? this['anglesMod'] = {} : module.exports  ));
```
