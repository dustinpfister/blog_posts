---
title: The javaScript module object literal pattern
date: 2020-08-27 14:46:00
tags: [js]
layout: post
categories: js
id: 697
updated: 2020-08-28 09:55:23
version: 1.4
---

So there are many patterns and standards when it comes to [javaScript modules](/2019/03/12/js-javascript-module/) these days. Just when it comes to making them the tired yet true way in a es5 spec javaScript kind of way things can quickly spiral down in to a major rabbit hole when it comes to the various patterns, and standards with old school style javaScript. Then there is of course the new ways to go about making [javaScript modules in modern javaScript specs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) when it comes to using import and export.

However if you are new to javaScript module design, you have to start somewhere, and maybe a good starting point would be to just start playing around with [object literals](https://www.dyn-web.com/tutorials/object-literal/) as a [javaScript module pattern](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s02.html) in client side javaScript. This might not be the best way to go about making modules in javaScript, but it sure is a good first step in the right direction if you are not sure where to start.

<!-- more -->

## 1 - The basics of a javaScript Object literal module pattern

When I was first starting out with javaScript many years ago I am sure that I was writing simple javaScript code examples that would just be a bunch of global variables, and methods where I am mutating those global variables. This kind of approach to things is something that I tend to avoid doing, but for now lets just assume that we are starting out with some code like that.

```js
var x = 0,
y = 0;
 
var move = function (dx, dy) {
    x += dx;
    y += dy;
};
 
move(5, 7);
move(0, 3);
 
console.log(x,y);
// 5 10
```

Although this might not be much so far, there is a few things that I would all ready do differently here these days. However the first thing that comes to mind would be to pull this code into some kind of module pattern. One way to go about making this code a little ore modular would be to turn this code that is just littered around in the global name space into just a single global object in the forum of an object literal.

```js
var point = {
    x: 0,
    y: 0,
    move: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};
 
point.move(5, 7);
point.move(0, 3);
 
console.log(point.x, point.y);
// 5 10
```