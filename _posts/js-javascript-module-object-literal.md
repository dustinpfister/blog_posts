---
title: The javaScript module object literal pattern
date: 2020-08-27 14:46:00
tags: [js]
layout: post
categories: js
id: 697
updated: 2021-09-01 15:24:02
version: 1.23
---

So there are many patterns and standards when it comes to [javaScript modules](/2019/03/12/js-javascript-module/) these days. Just when it comes to making them the tired yet true way in a es5 spec javaScript kind of way things can quickly spiral down in to a major rabbit hole when it comes to the various patterns, and standards with old school style javaScript. Then there is of course the new ways to go about making [javaScript modules in modern javaScript specs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) when it comes to using import and export.

However if you are new to javaScript module design, you have to start somewhere, and maybe a good starting point would be to just start playing around with plain old [object literals](https://www.dyn-web.com/tutorials/object-literal/) as a [javaScript module pattern](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s02.html) in client side javaScript. This might not be the best way to go about making modules in javaScript, but it sure is a good first step in the right direction if you are not sure where to start. Also in some cases the pattern will still work okay in some situations in which I am making a client side module in which it is okay to make everything public. Also I can still wrap things up into [an IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) when it comes to making a single property value for a public key of the main object literal that will compose such a module.

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
var pointMod = {
    x: 0,
    y: 0,
    move: function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};
 
pointMod.move(5, 7);
pointMod.move(0, 3);
 
console.log(point.x, point.y);
// 5 10
```

So now I have the same code, working more or less the same way, but in an object literal module form. 

## 2 - Making a module more in line with functional programing using the object literal module pattern

I will not be getting into function programing an pure functions in detail here as that would be off topic. However I would say that taking code in a more functional direction is generally a good idea. It will result in code that is easier to follow and debug. In addition I have found that I do not like the idea of having a state object located in a module itself, but as an object that is outside of the module, and just use the module to create new state objects rather than directly mutating them.

The basic point module that I made in the last section could be changed up just a little to create something that does more or less the same thing, but in a way in which it is more functional. The first thing to do is to pull the x and y variables that store the current state of something out of the module, and instead just have a method that will create a state object with those properties. I would then make the point object an argument that is passed to my move method rather than mutating these values that are part of the module itself. The next thing to do is to make the move method a pure function by making it so that it will return a new point object rather than directly mutating the source object that I pass to it as an argument.

```js
var pointMod = {
    // no state object in the module, but a method to create
    create: function (x, y) {
        return {
            x: x,
            y: y
        };
    },
    move: function (point, dx, dy) {
        // create a new Point
        var newPoint = this.create(point.x, point.y);
        // mutate the new point, and not the source point
        newPoint.x += dx;
        newPoint.y += dy;
        // return the newPoint without mutating the given source point
        return newPoint;
    }
};
 
var a = pointMod.create(0, 0);
var b = pointMod.move(a, 5, 7);
b = pointMod.move(b, 0, 3);
 
console.log(a.x, a.y);
console.log(b.x, b.y);
// 5 10
```

So then this would be a better example of how I would make a javaScript module with the object literal pattern these days. I do not always follow a functional way of programing though, but generally I try to keep things going in that direction. As a project grows in size it just becomes more and more important to do so.

## 3 - Appending methods to an object literal rather than just doing everything when creating it in the first place

One more thing abut the object literal pattern is that sooner or later I find myself pulling methods out of the object literal that is used to create the object in the first place, and instead append methods to the object after it is created. So far there are not many reasons to do this, but as the module continues to grow, and if it does transition into another pattern I have found that doing this becomes more important.

```js
// starting out with an object literal, and some hard coded defaults
var pointMod = {
    xDefault: 0,
    yDefault: 0
};
// no state object in the module, but a method to create
pointMod.create = function (x, y) {
    return {
        x: x === undefined ? pointMod.xDefault : x,
        y: y === undefined ? pointMod.yDefault : y
    };
};
// move a point
pointMod.move = function (point, dx, dy) {
    // create a new Point
    var newPoint = this.create(point.x, point.y);
    // mutate the new point, and not the source point
    newPoint.x += dx;
    newPoint.y += dy;
    // return the newPoint without mutating the given source point
    return newPoint;
};
// distance
pointMod.distance = function (pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
};
 
var origin = pointMod.create(),
a = pointMod.move(origin, 10, 5),
b = pointMod.move(origin, 25, 17),
d = pointMod.distance(a, b);
console.log(d.toFixed(2)); // '19.21'
```

## 4 - Using An IIFE for object properties

Some may argue that the main reason why not to use the object literal pattern is because everything will be public. As a result if one is in a situation in which there will be many private helper functions, and built in defaults that should not be public, one just has to make all of these things public. As such the result will be a polluted public API, with many methods, objects, and other features that should be private from the end user of the module. 

However there are a number of ways of making some things private, without diverting from the pattern that much. For example I can [use an IIFE](/2020/02/04/js-iife/) when defining what a method should be for a public key of the object literal. Another option would be having a block of code that is an IIFE, and I pass the object literal as an argument to that IIFE, inside the body of the IIFE I can then have a whole bunch of private stuff.

### 4.1 - Basic IIFE example for a single method

I place of just having a [function expression](/2019/01/27/js-function-expression/) as the value to be assigned to a key of an object literal I have have a self executing function expression or IIFE and it will then be the return value of this IIFE that will be the value for the pubic key of the object literal. It is then the return value that will be a function expression, and this inner function expression will then have access to private stuff in the body of the IIFE that can not be access form outside of the IIFE.

One example of this would be a log once method in which I can have a private count variable inside the body of an IIFE, and then an inner function expression that is returned that looks at this private count variable to see of it should log a given message or not. In the evnt that the count variable is below a max count argument that default to one the given message will just log once. I count then have some additional arguments, including one to just reset the count, but not set it to any value I want.

```js
var utils = {};
 
utils.logOnce = (function () {
    var count = 0;
    return function (mess, maxCount, resetCount) {
        maxCount = maxCount === undefined ? 1 : maxCount;
        resetCount = resetCount === undefined ? false : resetCount;
        if (resetCount) {
            count = 0;
        }
        if (count < maxCount) {
            console.log(mess);
            count += 1;
        }
    };
}
    ());
 
var i = 0;
while (i < 15) {
    utils.logOnce('hello ' + i, 1, i >= 9 && i <= 11);
    i += 1;
}
/*
hello 0
hello 9
hello 10
hello 11
*/
```

### 4.2 - Passing the object literal as an argument to an IIFE, and appending to it

Another option is to have the object literal be a value that is passed to an IIFE as an argument for the IIFE. I can then appedn to the object literal with just what it is that I want to be pubic, while keeping everything else private.

```js
var utils = {};
 
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
 
// append box methods
(function (api) {
    // private create helper
    var createDefaultDataObject = function () {
        return {
            hp: {
                current: 10,
                max: 10
            }
        };
    };
    // create
    api.boxCreate = function (opt) {
        opt = opt || {};
        var box = {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
            data: opt.data || createDefaultDataObject()
        };
        return box;
    };
    // overlap check
    api.boxOverlap = function (bx1, bx2) {
        return utils.boundingBox(bx1.x, bx1.y, bx1.w, bx1.h, bx2.x, bx2.y, bx2.w, bx2.h);
    };
}(utils));
 
// working good
var a = utils.boxCreate();
var b = utils.boxCreate({x: 5});
console.log(utils.boxOverlap(a, b)); // true
b.y = 64;
console.log(utils.boxOverlap(a, b)); // false
```

## 5 - Breaking the object literal pattern

As a module continues to grow I might want to break the object literal pattern at some point. One reason why might be because I just want to have a main function that I call off of the main global of the module. If so it is not to hard to transition into that if I follow the object literal pattern a certain way where I am appending to the object. In that case I just need to make the object literal a function in place of just a plain old object, and preserve the properties of the old object pattern.

```js
// starting out with an function expression which is also a kind of object in javaScript
var pointMod = function (x, y) {
    return {
        x: x === undefined ? pointMod.xDefault : x,
        y: y === undefined ? pointMod.yDefault : y
    };
};
// so we can append static methods to it
pointMod.xDefault = 0;
pointMod.yDefault = 0;
// move a point
pointMod.move = function (point, dx, dy) {
    // create a new Point
    var newPoint = pointMod(point.x, point.y);
    // mutate the new point, and not the source point
    newPoint.x += dx;
    newPoint.y += dy;
    // return the newPoint without mutating the given source point
    return newPoint;
};
// distance
pointMod.distance = function (pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
};
// so we can not create points like this
var origin = pointMod();
// and my methods still work fine
console.log(pointMod.move(origin,5,10)); // { x: 5, y: 10 }
```

Another reason why I would want to break the pattern is to have some helper methods or additional objects or values of one kind or another private from the public API. One of the drawbacks of using the object literal pattern is that everything has to be public, and in some cases this is not always such a great thing. One way to help make a few things private would be the have a Immediately Invoked Function Expression or IIFE and then have the public API returned inside the body of this IIFE.

```js
var pointMod = (function () {
    // private hard coded defaults
    var hard = {
        xDefault: 0,
        yDefault: 0,
        angleScale: 360
    };
    // starting out with an function expression which is also a kind of object in javaScript
    var API = function (x, y) {
        return {
            x: x === undefined ? hard.xDefault : x,
            y: y === undefined ? hard.yDefault : y
        };
    };
    // move a point
    API.move = function (point, dx, dy) {
        // create a new Point
        var newPoint = API(point.x, point.y);
        // mutate the new point, and not the source point
        newPoint.x += dx;
        newPoint.y += dy;
        // return the newPoint without mutating the given source point
        return newPoint;
    };
    // private helper for new move method
    var angleToRadian = function (angle, scale) {
        return Math.PI * 2 * (angle / scale);
    };
    // new move method
    API.moveByAngleAndDist = function (point, angle, dist, scale) {
        scale = scale == undefined ? hard.angleScale : scale;
        dist = dist === undefined ? 1 : dist;
        angle = angle === undefined ? 0 : angle;
        // create a new Point
        var newPoint = API(point.x, point.y),
        radian = angleToRadian(angle, scale);
        newPoint.x += Math.cos(radian) * dist;
        newPoint.y += Math.sin(radian) * dist;
        return newPoint;
    };
    // distance
    API.distance = function (pointA, pointB) {
        return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
    };
    // return the public API
    return API;
}
    ());
 
var a = pointMod(10, 10);
a = pointMod.moveByAngleAndDist(a, 90, 10);
 
console.log(a);
// { x: 10, y: 20 }
```

This kind of module pattern is often what I end up with when I keep working on a module for a while and keep anding things on. Sooner or later I want to write at least a few private internal helper methods that I do not need or what to be part of the public API. making use of an IIFE or some other module patter is just what ends up needed to happen often sooner or later. Still I would say that an object literal is a good starting point, and as things move forward it is not always to hard to transition into something else as log as I keep things structured in a certain way.

## 6 - Conclusion

So that is it for now when it comes to the object literal module pattern. The pattern is a great starting point when it comes to starting out with a module, but I do not have to work so much about having to start all over if I want to transition into another pattern. There is of course a whole lot more to write about when it comes to modules and javaScript of course. This post was meant to just be a starting point of sorts when it comes to making them in a client side javaScript environment. In a nodejs environment a whole other  pattern needs to be observed when it comes to making modules in that environment, and also there are many other pattens and more modern ways of making modules in a client side environment.