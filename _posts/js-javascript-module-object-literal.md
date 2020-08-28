---
title: The javaScript module object literal pattern
date: 2020-08-27 14:46:00
tags: [js]
layout: post
categories: js
id: 697
updated: 2020-08-28 09:48:21
version: 1.2
---

So there are many patterns and standards when it comes to [javaScript modules](/2019/03/12/js-javascript-module/) these days. Just when it comes to making them the tired yet true way in a es5 spec javaScript kind of way things can quickly spiral down in to a major rabbit hole when it comes to the various patterns, and standards with old school style javaScript. Then there is of course the new ways to go about making [javaScript modules in modern javaScript specs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) when it comes to using import and export.

However if you are new to javaScript module design, you have to start somewhere, and maybe a good starting point would be to just start playing around with [object literals](https://www.dyn-web.com/tutorials/object-literal/) as a [javaScript module pattern](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s02.html) in client side javaScript. This might not be the best way to go about making modules in javaScript, but it sure is a good first step in the right direction if you are not sure where to start.

<!-- more -->

## 1 - The basics of a javaScript Object literal module pattern

When I was first starting out with javaScript many years ago I am sure that I was writing simple javaScript code examples that might look something like this.

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

Another way to go about doing this would be to take the x and y globals an make them properties of a single object literal, and on top of that make the move method a property of that object also.

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