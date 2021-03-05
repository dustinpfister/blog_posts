---
title: Random Walk Stochastic process example
date: 2021-03-05 10:02:00
tags: [statistics]
layout: post
categories: statistics
id: 817
updated: 2021-03-05 10:12:13
version: 1.1
---

This will be yet another [Stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) example when it comes to working out some basic and maybe sometime not so basic examples of such a process in [statistics](https://en.wikipedia.org/wiki/Statistics), this time on a random walk which is an easy typical getting started type example.

<!-- more -->

## 1 - Working out a walk method

The first step here is to work out a simple walk method. This is a method where each time I call it, the method will return a set od delta values for x and y that will move an object in a grid in one of up to 8 possible directions. The default walk method will be built in and return a random number in the set of numbers of \[0,2,4,6\] which will mean right, down, left, and up. When calling the walk method I can give and object that is the object that is to move, along with another walk method, and a custom set of directions other than the built in default.

```js
var walk = (function(){
    // default dir movement array
    // [0,1,2,3,4,5,6,7] => 8 dir movement
    // [0,2,4,6];        => 4 dir movement
    // [6];              => always go up
    var default_dirs = [0,2,4,6];
    // built in walk methods
    var walkMethods = {
        // random dir
        rnd: function(obj, dirs){
            return dirs[Math.floor(Math.random() * dirs.length)];
        },
        // use a heading prop of an object, or default to 0
        useHeading: function(obj, dirs){
            return dirs[obj.heading] || 0;
        }
    };
    // Public API
    var api = function(obj, method, dirs){
        obj = obj || {x: 0, y: 0};
        dirs = dirs === undefined ? default_dirs : dirs;
        // call step method and get a d num (0-7)
        var d = method === undefined ? walkMethods.rnd(obj, dirs): method(obj, dirs);
        // convert to radian
        var radian = Math.PI * 2 / 8 * d;
        // use Sin And Cos to return delta values for x and y
        return {
            x: Math.round(Math.cos(radian)),
            y: Math.round(Math.sin(radian))
        };
    };
    // make walk methods public
    api.wm = walkMethods;
    // return public API
    return api;
}());
 
// random deltas
console.log(walk());
// always 4 ( { x: -1, y: 0 } )
console.log( walk({x:0, y:0, heading:1}, walk.wm.useHeading, [0, 4]) );
```