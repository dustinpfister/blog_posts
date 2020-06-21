---
title: IIFE or Immediately Invoked Function Expressions in javaScript
date: 2020-02-04 08:46:00
tags: [js]
layout: post
categories: js
id: 605
updated: 2020-06-21 10:30:29
version: 1.11
---

A [JS IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) or [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) is a way to make a javaScript function that self invokes right away. When it comes to older specs of javaScript an IIFE is a way to go about using the function level only variable scope of those specs to have a whole bunch of private, or local variables wrapped up inside the body of one of these IIFE deals. In late specs of javaScript there is now block level variable scope, but I still find myself often using and IIFE with, or in place of, block level scope.

The return keyword can then be used as a way to go about returning something that can be stored in a variable, this something that is returned can be a plain old object with properties, or a function, or a function with properties that serves as a kind of public API. 

These kinds of functions in javaScript are often used in module design, as private methods and other values can be in the body of the function and a public set of methods and properties can be a product that is returned to a variable.

<!-- more -->

## 1 - JS IIFE basic example with an inner function returned as the public API

Lets start out with just a basic example of an IIFE in javaScript. I do so by just writing a function expression like always, but I then wrap the expression in parenthesis or a group operator if you prefer. I then call the function expression as well within the group operator. So I define the function while also calling it invoking any code that may be within the body of the IIFE.

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

In this example I have an inner function that is returned to the public count variable. I can then call that function from the outside of the IIFE however I can not directly work with the private c variable.

## 2 - Making a public API as an object literal

A function can be used as a public API but a plain old object can also be used as one also. Say I have a whole bunch of methods that I want to have as my public API for a game module. One way would be to attach them to a prototype object of a function, but what if they do not need to be part of a class of a constructor function? Also what if I do not want or need a constructor function at all, or a function of any kind as the public API? No problem just using a plain od object will work just fine.

```js
var game = (function () {
 
    // private variables and methods
    var state;
    var makeNewState = function () {
        return {
            money: 0,
            manual: 1,
            auto: {
                tickRate: 1000,
                lt: new Date(),
                perTick: 1
            }
        };
    };
    var loadState = function () {
        var state = document.localStorage ? document.localStorage.state : false;
        if (state) {
            return state;
        }
        return makeNewState();
    };
 
    // public API as an Object literal
    return {
        init: function () {
            state = loadState;
        },
        userAction: function () {
            state.money += state.manual;
        },
        tick: function () {
            var now = new Date(),
            t = now - state.auto.lt,
            ticks = t / state.auto.tickRate;
            if (ticks >= 1) {
                state.money += state.auto.perTick * ticks;
                state.auto.lt = now;
            }
        }
    };
 
}
    ());
```

## 3 - A function can be passed as the public API with static methods attached

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

## 4 - Conclusion

So a js IIFE is often my first go to when it comes to generic module design in front end javaScript. I might not always use one when it comes to making a nodejs module though as I do not see the need, unless I am making the kind of javaScript module that is expected to work in node and the browser in the same state in which case chances are I would use an IIFE.