---
title: javaScript module examples
date: 2019-03-12 19:10:00
tags: [js]
layout: post
categories: js
id: 400
updated: 2020-08-24 09:54:57
version: 1.16
---

When starting to develop a complex project with javaScript the importance of using [modules](https://en.wikipedia.org/wiki/Modular_programming) becomes of greater interest to help keep things neat, easy to follow, and to debug when it comes to working out problems with code. Modules are a great way to keep your project broken down into smaller units of code that are easier to manage compared to one large monolithic block of code that all to often ends up getting messy. 

There is not just using modules of course when it comes to keeping code broken down, and easy to follow. For example modules can be made in a way in which the module will work by itself without the need for any additional code that the modules depends on. However often I make modules where there is at least one central utility module of sorts, and sometimes a module will require additional modules in order to work. 

In addition there is also making modules where a module is used as a way to play with a state that is held in the module as a local variable to the module. There is also having modules where a public method is used to create a new state object, and that is what I am working with in a main javaScript file.

So there are many little tips and tricks when it comes to module design, also there is more than one pattern to be familiar with when it comes to how to go about creating them. So in this post I will be covering some basic [module examples](http://exploringjs.com/es6/ch_modules.html) when it comes to module design with javaScript, and maybe tocuhing base on some related topics of interest in the process.

<!-- more -->

## 1 - JavaScript Module basics

There are specifics to be aware of when it comes to a node.js environment though. There are also many standards that come to mind such as AMD. It goes without saying that this is an advanced topic when it comes to javaScript development. There are many different design patterns, and standards for modules so this can get a littler overwhelming.

Although there are many ways to go about designing something in javaScript that can be thought of as a kind of module. In this post I will mainly be writing modules with core javaScript by itself that can often work out okay in any javaScript environment. Well at least for the most part in client side javaScript anyway, in a node environment you really just need to design it in a way where use are exporting what you want to be public. 


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

A public API can be returned in the form of an object literal. This object literal can be the actual thing that is returned to a global variable, or it can be a variable that contains such an object that was declared elsewhere in the body of the function expression.

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

A function can also be what is returned as well. This allows for creating a custom API that works with an argument that is given. In javaScript a function is also a kind of object so it is possible to make a module where there is a function that can be called via the global variable, as well as a bunch of static methods attached to the object.

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