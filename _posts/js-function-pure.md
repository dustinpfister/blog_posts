---
title: javaScript and pure functions
date: 2020-06-18 16:13:00
tags: [js]
layout: post
categories: js
id: 669
updated: 2020-06-18 17:39:56
version: 1.3
---

So in javaScript there are many different [kinds of functions](/2019/12/16/js-function/), and also how functions can be used. There is the nature of [constructor functions](/2019/02/27/js-javascript-constructor/) and how they are used as a way to create functions that are called off of an instance of that constructor. In contrast to that of a constructor function there is what many might call a [pure function](https://en.wikipedia.org/wiki/Pure_function). In pure functions one of the features is that a pure function will always return the same result for the same arguments, this is not always the case when calling the prototype method of a constructor instance.

With the instances of constructor functions there are prototype methods like that of the array splice method for example that will mutate an array in place, and then there are other methods in the array prototype such as slice that will not mutate the source array, but instead return a new array without mutating the source array off of while array slice was called. However even with array slice it can still end up giving different results depending on the state of the array that is is called off of, so although it is pure like it is not the case.

<!-- more -->

## 1 - Basic examples of a pure and not so pure function

```js
// some globals
var x = 0,
y = 0;
// a function that makes use of the globals and some arguments
var dist = function (x2, y2) {
    return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
};
 
// a function that just makes use of arguments and only arguments
// no use of globals or the this keyword
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
console.log(dist(100, 100)); // 141.4213562373095
console.log(distance(0, 0, 100, 100)); // 141.4213562373095
 
x = -15;
y = -32;
 
// a pure function will always give the same result with the same arguments
console.log(dist(100, 100)); // 175.06855799943062
console.log(distance(0, 0, 100, 100)); // 141.4213562373095
```

## 2 - A box Class and a pure function alternative way of doing the same thing

```js
var Box = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
    this.w = opt.w === undefined ? 32 : opt.w;
    this.h = opt.h === undefined ? 32 : opt.h;
};
 
Box.prototype.distance = function (bx) {
    var x1 = this.x + this.w / 2,
    y1 = this.y + this.h / 2,
    x2 = bx.x + bx.w / 2,
    y2 = bx.y + bx.h / 2,
    d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return Math.floor(d);
};
 
var bx1 = new Box({
        x: 0,
        y: 0
    });
 
var bx2 = new Box({
        x: 100,
        y: 50
    });
 
// calling the distance prototype method off of the
// bx1 instance, and passing bx2 as the first argument
console.log(bx1.distance(bx2)); // 111
 
// the state of bx1 is changed
bx1.x = -15;
bx1.y = -24;
 
// now calling the distance prototype method
// results in a different value even though the same argument
// is passed and it did not change.
console.log(bx1.distance(bx2)); // 136
 
// one way to resolve this might be to use call to make it more
// pure function like, but it still might be best to just make distance
// a stand alone function.
console.log( Box.prototype.distance.call(bx1, bx2) ); // 136
```

```js
var createBox = function (opt) {
    opt = opt || {};
    return {
        x: opt.x === undefined ? 0 : opt.x,
        y: opt.y === undefined ? 0 : opt.y,
        w: opt.w === undefined ? 32 : opt.w,
        h: opt.h === undefined ? 32 : opt.h
    };
};
 
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
var bx = createBox({
        x: 100,
        y: 50
    });
 
console.log( distance(0, 0, bx.x, bx.y) ); // 111.80339887498948
```