---
title: javaScript module examples
date: 2019-03-12 19:10:00
tags: [js]
layout: post
categories: js
id: 400
updated: 2019-03-15 16:55:21
version: 1.9
---

When starting to develop a complex project with javaScript the importance of using [modules](https://en.wikipedia.org/wiki/Modular_programming) becomes of greater interest. Modules are a great way to keep your project broken down into smaller units of code that are easier to manage. In this post I will be covering some basic [module examples](http://exploringjs.com/es6/ch_modules.html) when it comes to module design with javaScript.

<!-- more -->

## 1 - JavaScript Module basics

There are many ways to go about designing something in javaScript that can be thought of as a kind of module. In this post I will mainly be writing modules with core javaScript by itself that can often work out okay in any javaScript environment. There are specifics to be aware of when it comes to a node.js environment though. There are also many standards that come to mind such as AMD. It goes without saying that this is an advanced topic when it comes to javaScript development. There are many different design patterns, and standards for modules so this can get a littler overwhelming.

## 1.1 - JavaScript Module by Object literal

One way to design a module would be to place all the properties and methods that are relevant with something in an object literal. 

```js
var mod = {
    x: 0,
    y: 10,
    move: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};

mod.move(45, 7);
console.log(mod.x,mod.y); // 45 17
```

This way everything is packed into a single global variable, and can be accessed from outside the the module via that single global variable. This approach works okay in some cases assuming that it is okay that everything can be accessed from outside the module.

## 1.2 - JavaScript Module by Closure

An IIFE (immediately invoked function expression) or self executing function expression can be used as a way to encapsulate variables into a function level local variable scope. From within this local function level scope, variables can be declared that will not end up becoming global variables. So there should not be any fear of polluting the global name space, or running into problems with name space collisions.

```js
// declaring point global variable
var point;
 
// having another point variable in a 
// Immediately Invoked Function Expression
(function () {
    var point = {
        x: 5,
        y: 17
    };
    console.log(point); // {x:5,y:17}
}
    ());
 
// point global is still undefined
// there are two point variables because
// of  function level scope
console.log(point); // undefined
```

There are also ways of creating an API that can be accessed from outside the module as well. A global can be declared from outside the function expression, or the global object can be passed as an argument as well. In other cases the expression can just be used to accomplish some things without polluting the global name space, or argument an object that exists before hand.


### 2 -javaScript Module with Object API;

```js
var mod = (function () {
    var point = {
        x: 5,
        y: 17
    };
    // plain object api
    return {
        move: function (dx, dy) {
            point.x += dx;
            point.y += dy;
        },
        print: function () {
            console.log('(' + point.x + ',' + point.y + ')')
        }
    }
}
    ());
mod.move(-5, 3);
mod.print(); // '(0,20)'
```

## 3 - javaScript module with function API

```js
var mod = (function () {
    // return a function
    return function (point) {
        return {
            move: function (dx, dy) {
                point.x += dx;
                point.y += dy;
            },
            print: function () {
                console.log('(' + point.x + ',' + point.y + ')')
            }
        }
    };
}
    ());
var pt = mod({
        x: 42,
        y: -12
    });
pt.move(3, 12);
pt.print();
```