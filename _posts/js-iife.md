---
title: IIFE or Immediately Invoked Function Expressions in javaScript
date: 2020-02-04 08:46:00
tags: [js]
layout: post
categories: js
id: 605
updated: 2020-02-05 19:05:37
version: 1.6
---

A [JS IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) or [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) is a way to make a javaScript function that self invokes. These kinds of functions in javaScript are often used in module design, as private methods and other values can be in the body of the function and a public set of methods and properties can be a product that is returned to a variable.

<!-- more -->

## 1 - JS IIFE basic example

Lets start out with just a basic example of an IIFE in javaScript. I do so by just writing a function expression like always, but I then wrap the expression in parenthesis or a group operator if you prefer. I then call the function expression as well within the group operator. So I define the function wile also calling it invoking any code that may be within the body of the IIFE.

```js
var count = (function () {
    var c = 0;
    return function (opt, n) {
        if (opt === 'get') {
            return c;
        }
        c = opt === undefined || opt === 'count' ? c += 1 : c;
        c = opt === 'reset' ? 0 : c;
        c = opt === 'set' ? n : c;
        return c;
    };
}
    ());
 
count('set', -5);
count();
count('count');
console.log( count('get') ); // -3
```

## 2 - A function can be passed as the public API with static methods attached

In javaScript functions are a kind of object, so just like any other object in javaScript additional methods and properties can be attached to them. If I attach methods to the prototype object they become part of a constructor functions prototype, however if I do not want to do that I can just add static methods as just properties of the function.

```js
var BX = (function () {
 
    // a private method
    var getCenterPoint = function (bx) {
        return {
            x: bx.x + bx.w / 2,
            y: bx.y + bx.h / 2
        };
    };
 
    // a public main api a function
    var api = function (opt) {
        opt = opt || {};
        opt.x = opt.x === undefined ? 0 : opt.x;
        opt.y = opt.y === undefined ? 0 : opt.y;
        opt.w = opt.w === undefined ? 32 : opt.w;
        opt.h = opt.h === undefined ? 32 : opt.h;
        return opt;
    };
 
    // a public static method
    api.distance = function (bx1, bx2) {
        var pos1 = getCenterPoint(bx1),
        pos2 = getCenterPoint(bx2);
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };
 
    return api;
 
}
    ());
 
bx1 = BX(),
bx2 = BX({
        x: 32,
        y: 32
    });
 
console.log(BX.distance(bx1, bx2).toFixed(2)); // 45.25
```