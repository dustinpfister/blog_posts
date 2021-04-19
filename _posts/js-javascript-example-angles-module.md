---
title: javaScript angles module example
date: 2021-04-16 14:04:00
tags: [js]
layout: post
categories: js
id: 847
updated: 2021-04-19 14:48:38
version: 1.8
---

When working on various [javaScript examples](/2021/04/02/js-javascript-example/) I often run into problems that have to do with angles. I often find or make solutions for these problems, but they ended up littered all over various collections of examples, and I can not always remember where a certain method that solves a given problem with angles can be found. So I thought it would be a good idea to start a javaScript example that is a stand alone module that can be used to work with angles, and various problems that have to do with angles.

There are two general problems that I think many javaScript developers will run into when starting to make canvas games from the ground up without a framework. One of which is to find out how to go about getting an angle from point point in the canvas to another. This problem can be result by making use of the Math.atan2 method in core javaScript, the use of it is a little weird tough so it make a little sense at least to have an abstraction of sorts for it, which would make a good additional to a library like this. The other general problem that comes to mind has to do with finding out what direction to rotate an object in order to face the direction of another object, so another method of interest is a kind of get shortest angle direction method.

Many of the methods that I have in this module are based off of [angles.js](https://www.npmjs.com/package/angles) up on npmjs, which is still a great module for many of these kinds of tasks. Still the module seems to no longer be support, but still seems to work just find in many situations. I really wanted to just make my own module for this sort of thing though, so I started putting something together of my own that just contains the methods that I seem to use the most often, with just a few slight changes here and there.

<!-- more -->

## 1 - The angles module

The module follows a pattern that I am now using the works well for making a module that will work okay in both a nodejs as well as a browser environment. It involves using an IIFE and passing a value that will be the object to append to when calling the self executing function. This kind of module pattern will not work well in all situations whne it comes to making a module that is very browser, or nodejs centric, but for this kind of module I think it would be a good choice. I will not be getting into this topic in detail here as I have [wrote a post on this kind of module that can be used to share code between nodejs and the browser](/2021/04/14/js-javascript-example-nodejs-browser-share-code-module/), if you want to read more about it that would be a good place to start.

One method that I have in here is a mathematical modulo method, this is also a topic that I got into detail with when it comes to [my post on what it is that is wrong with the javaScript modulo operator](/2017/09/02/js-whats-wrong-with-modulo/) that I wrote a few years back. In short there is actually nothing wrong with the javaScript modulo operator actually, it is just that the built in javaScript modulo operator uses a convention that is not what some developers might be used to coming from other programing environments.

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

## 2 - Conclusion

I am sure that there will be a lot of other little things that have to do with angles that will pop up now and then, as such I am sure that there will be at least a few additional edits of this post in the future sooner or later.


