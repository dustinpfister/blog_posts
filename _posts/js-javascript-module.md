---
title: javaScript module examples
date: 2019-03-12 19:10:00
tags: [js]
layout: post
categories: js
id: 400
updated: 2019-03-15 14:07:47
version: 1.6
---

When starting to develop a complex project with javaScript the importance of using [modules](https://en.wikipedia.org/wiki/Modular_programming) becomes of greater interest. Modules are a great way to keep your project broken down into smaller units of code that are easier to manage. In this post I will be covering some basic [module examples](http://exploringjs.com/es6/ch_modules.html) when it comes to module design with javaScript.

<!-- more -->

## 1 - JavaScript Module basics

There are many ways to go about designing something in javaScript that can be thought of as a kind of module. In this post I will mainly be writing modules with core javaScript by itself that can often work out okay in any javaScript environment. There are specifics to be aware of when it comes to a node.js environment though. There are also many standards that come to mind such as AMD. It goes without saying that this is an advanced topic when it comes to javaScript development. There are many different design patterns, and standards for modules so this can get a littler overwhelming.

## 1.2 - JavaScript Module by Closure

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

## 1.2 - JavaScript Module by Object literal

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