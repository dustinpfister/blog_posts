---
title: javaScript module examples
date: 2019-03-12 19:10:00
tags: [js]
layout: post
categories: js
id: 400
updated: 2021-08-31 11:39:47
version: 1.35
---

When starting to develop a complex project with javaScript the importance of using [modules](https://en.wikipedia.org/wiki/Modular_programming) becomes of greater interest to help keep things neat, easy to follow, and to debug when it comes to working out problems with code. Modules are a great way to keep one of my projects broken down into smaller units of code that are easier to manage compared to one large monolithic block of code that all to often ends up getting messy. 

There are a lot of talking points when it comes to modules and javaScript, and often the subject can get a little confusing especially for beginners with javaScript and modules. For example modules can be made in a way in which the module will work by itself without the need for any additional code that the modules depends on. However often I make modules where there is at least one central utility module of sorts, and then a few additional modules that will work on top of the main utility method and will thus break without the use of that main module.

In addition there is also making modules where a module is used as a way to play with a state that is held in the module itself as a local variable to the module which I would not recommend doing. With that said there is also having modules where a public method is used to create a new independent state object that I use outside of the module that created it, and pass the created object as one of the arguments for many of the public methods of the module.

There are a wide range of patterns and standard for module design when it comes to client side javaScript as well as nodejs. There is a standard for [modules in client side javaScript that now involves the use of import and export keywords](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) for example. One down side though is that this kind of standard is modern so it will not work on older browsers, another draw back is that it will not work over the file protocol and I like to make projects that will work off line via the protocol. However even when it comes to writing modules the tired yet true way there is a lot of ground to cover when it comes to the various standards and patterns.

So there are many little tips and tricks when it comes to module design in javaScript, also there is more than one pattern to be familiar with, and there are many things to be aware of when starting out with javaScript modules. So in this post I will be covering some basic [module examples](http://exploringjs.com/es6/ch_modules.html) when it comes to module design with javaScript, and maybe touching base on some related topics of interest in the process.

<!-- more -->

## 1 - JavaScript Module basics

There are specifics to be aware of when it comes to a node.js environment and JavaScript module design however that might be a matter for another post, so in this section I will be sticking to some basics that work okay in client side javaScript. There are also many standards that come to mind such as AMD, but many of these require a library to get up and running with, so I will be sticking to simple patterns that work in native client side javaScript by itself. 

It goes without saying that this is an advanced topic when it comes to javaScript development, there are many different design patterns, and standards for modules so this can get a littler overwhelming. With that said this section and post in general is not meant for people that are new to javaScript, I assume that you have at least some background when it comes to the very basics of html and javaScript in general.

## 1.1 - JavaScript Module by way of an Object literal

One way to design a module would be to place all the properties and methods that are relevant with something in an object literal. I have [wrote a post in which I get into the object literal module pattern](/2020/08/27/js-javascript-module-object-literal/) in detail, but I will be quickly touching base on this topic here of course as I think this might be one of the best starting points for module design before moving on to studying other options. In other words just a plain old javaScript object created with the literal syntax, and just start appending methods and properties to it.

For starters with this kind of approach to modules design you might start out with an object that has an x and y property, and then have a single method that does something to those properties such as move it by a set of given delta values for example.

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

This way everything is packed into a single global variable, and can be accessed from outside the the module via that single global variable. This approach works okay in some cases assuming that it is okay that everything can be accessed from outside the module, or in other words that everything is public. 

There are some additional issues with the specific example that I have given here when it comes to management of state. However maybe that is something that I should get into at a later point in this post. The main thing to keep in mind here is that this is one way to go about making something that can be though of as a module of sorts, however of course it does not stop here lets look at some more basic javaScript modules patterns then.

## 1.2 - JavaScript Module by Closure

An [IIFE (immediately invoked function expression) or self executing function](/2020/02/04/js-iife/) expression can be used as a way to encapsulate variables into a function level local variable scope. From within this local function level scope, variables can be declared that will not end up becoming global variables when declared with the var keyword when it comes to old es5 spec style javaScript or the more modern let and const keywords when it comes to more modern javaScript specs. So there should not be any fear of polluting the global name space, or running into problems with name space collisions when it comes to declaring lots of variables inside the body of one of these closures.

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

There are also ways of creating an API that can be accessed from outside the module as well by assigning such an API to at least one global variable. A global can be declared from outside the function expression, or the global object can be passed as an argument to the IIFE which is another option that I see in the wild a lot. In other cases the expression can just be used to accomplish some things without polluting the global name space at all when it comes to simple projects in which everything needs to be packed into one of these. However maybe getting into all of that is a matter for another post, or at least another section in this one.

In any case the main thing to keep in mind here is that the two general ways that I go about making javaScript modules in a tired yet true way boil down to two general ways of going about making a module. One way is to just have everything in a javaScript object literal, and the other is to use a function to wrap everything up inside a closure, and only make thing public that need to be public if anything at all. So now that we have that out of the way lets look at some more examples where I take a look at some additional things that come up when making javaScript modules.

### 2 - IIFE javaScript Module with Object API;

A public API can be returned in the form of an object literal when using an IIFE and a single global variable to create a module. This object literal can be the actual thing that is returned to a global variable, or it can be a variable that contains such an object that was declared elsewhere in the body of the function expression, a pattern that I tend to prefer these days.

So for a basic example of this say I have a global variable called mod, and I am using an IIFE to create a module. In the body of the IIFE I am using the return keyword to return an object literal that will function as the public API for the module in the form of a collection of methods attached as properties for the module. These public methods have access to everything that is inside the IIFE and for this example I have a point state object that can be mutated with the public methods.

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

I do not think making modules where I have a state object inside the body of the IIFE is a good idea, and often prefer to make modules where a public method is used to create such a state object, and have this state object be one of the arguments that is passed when using one of the public methods. However that is another matter, the general idea that I had in mind for this section is there. Many of the vanilla javaScript modules that I make are still not always to dissimilar to this general idea of having an IIFE and then a public API of some kind or another returned to a single global variable.

## 3 - javaScript module with function API

A function can also be what is returned as well in place of just a plain old javaScript object. This allows for creating a custom API that works with an argument that is given when calling this main javaScript module. 

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

In javaScript a function is also a kind of object so it is possible to make a module where there is a function that can be called via the global variable, as well as a bunch of static methods attached to the function just like that of using a plain javaScript object. So if done right, nothing is lost by going in this direction in place of just an object literal as the global API.

## 4 - Pull out state, and try to make things more functional programing like

So I have covered a lot of the basics when it comes to javaScript module design, so lets start to scratch the surface on some things that are maybe just a little not so basic. In many of my examples in this post so far I was working with a state object that is part of the module itself. I do not think that this is always such a bad idea for some code here and there maybe with code that is of an actual main state object in a project for example. However I have fond that kind of module design is something that should be minimized, if not avoided completely.

lets take yet another look at making a very simple point module, this time I am not doing anything that has to do with having the a state object in the module itself, but something that is to be passed as an argument to every public method. This way I am taking the state object out of the module, and making it so that the state object is something that is create and stored in some code section that is outside of the module.

In addition to pulling the state object out of the module, I am now also using a move method that is more in line with the rules of what is often called a pure function. I will not be getting into functional programing in detail here as that is a subject for a whole other post of course. However I have found that going in the direction of functional programing helps to keep things better organized, and easier to follow and debug.

```js
var pointMod = (function () {
 
    var pointDefaults = {
        x: 0,
        y: 0
    };
 
    var create = function (x, y) {
        return {
            x: x === undefined ? pointDefaults.x : x,
            y: y === undefined ? pointDefaults.y : y
        };
    };
 
    // plain object api
    return {
        // make create public
        create: create,
        // move a point
        move: function (point, dx, dy) {
            var newPoint = create(point.x, point.y);
            newPoint.x += dx;
            newPoint.y += dy;
            return newPoint;
        },
        // print a point
        print: function (point) {
            console.log('(' + point.x + ',' + point.y + ')')
        }
    };
}
    ());
 
// use example
var a = pointMod.create();
 
var b = pointMod.move(a, 10, 35);
 
pointMod.print(a);
pointMod.print(b);
// (0,0)
// (10, 35)
```

## 5 - Using and making modules in nodejs

I have [wrote a post on the subject of modules in node](/2020/06/30/nodejs-module/), however I think that I should at least have a section on the topic here also. The tired yet true way of loading in modules it to use require to do so, but in more modern versions of node the import keyword can be used also. There are a number of useful built in modules to work with which you should take the time to get solid with before learning how to make your own modules. In this section I will then be going over a few quick examples of some built in modules in nodejs, and then be getting into at least one example of making them.

### 5.1 - The path module

A very useful module to start out with in nodejs might be the [path module](/2017/12/27/nodejs-paths). This module is packed with useful method that help with resolving absolute paths to resources on a local file system. It will not load those resources as that is the job of another built in module, however if I want to parse an absolute path to a file with a base path and a relative path from the base path this module is what I would want to use.

In nodejs there is also the [process object that will contain the cwd method](/2021/03/17/nodejs-process-cwd/) which will return the current working directly. There are also a number of [special global variables](/2018/02/10/nodejs-globals/) such as the \_\_dirname variable that is the path to the current file. So in this example I am loading in the path module, and using the path join method to get an absolute path relative to the cwd, as well as the same path as the file.

```js
// loading in the path module
let path = require('path');
console.log(process.cwd()); // current working dir
console.log(__dirname);     // dir that this file is in
// using the path join method
console.log( path.join(process.cwd(), 'lib/foo.js') );
console.log( path.join(__dirname, 'lib/foo.js') );
```

This module and the use of the join method will come up in additional examples in this section, so I wanted to get this one out of the way first. When it comes to getting the path to a module that I have sored relative to another script in the same folder it is a good idea to use the \_\_dirname global with a relative path to the module and call the path join method to create an absolute path to the module. More on this when I get to the example where I am making my own nodjes module.

### 5.2 - The fs module

Another built in module to start looking into right away would be the [file system module](/2018/02/08/nodejs-filesystem/). The path module is what I want to use in order to create an absolute path to something. However in order to read, write, or create that something I will need the file system module. In this example I am loading in the file system module, and the path module.


```js
let fs = require('fs'),
path = require('path');
// using path and js modules
let uri = path.join(__dirname, 'fs.js');
fs.readFile(uri, 'utf8', (e, txt) => {
    if (e) {
        console.warn(e.messgae);
    } else {
        console.log(txt);
    }
});
```

## 5.3 - Making modules in nodejs

```js
// private helper method
let parseAxis = (a) => {
    return a === undefined || typeof a != 'number' || String(a) === 'NaN' ? 0 : a;
};
 
// a Main public method
let Point = (x, y) => {
    return {
        x: parseAxis(x),
        y: parseAxis(y)
    };
};
 
// an additional static public method
Point.distance = (pt1, pt2) => {
    return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
};
 
module.exports = Point;
```

```js
let path = require('path');
let point = require(path.join(__dirname, './points.js'));
 
let a = point(45, 15),
b = point(0, 0),
d = Math.floor(point.distance(a, b));
 
console.log(d); // 47
```

## 6 - Conclusion

So this post just scratched the surface when it comes to writing javaScript modules in a client side javaScript environment that will work in a wide range of clients in a tired yet true way. I have my way that I like to write modules when it comes to things like canvas examples where I am writing the code from the ground up, and I want the project to work via the file protocol. However do not thing of this as the end all post on javaScript module design, there are many other ways to go about writing them of course that I did not get to here, and the way I would writing them can change dramatically depending on the environment, how far back I want to go with browser support, and what kind of libraries or frameworks I might be using.