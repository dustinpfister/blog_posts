---
title: The lodash _.mixin method
date: 2018-01-31 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 336
updated: 2021-12-06 14:21:57
version: 1.16
---

The process of combining objects in lodash, or in javaSript in general actually can prove be a little tricky. There are the own properties of an object, it's prototype object including any inherited objects, as well as even hidden properties in some cases that can be added by way of the [Object.definePropery method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty). 

When it comes to using lodash there is the idea of extending lodash with custom methods that are not a part of lodash out of the box. The [lodash](https://lodash.com/) [\_.mixin method](https://lodash.com/docs/4.17.15#mixin) can be used to extend lodash when one wants to do this sort of thing, however it can also be used with another object also. So the lodash mixin method can be called with just one argument, and in that case the first argument should be an object of methods that are to be added to lodash. When used to two or more arguments the first argument becomes a target object other than lodash to extent with methods. It is one of many methods in lodash that can be used to combine objects, in some cases it might be useful so lets take a look at \_.mixin.

<!-- more -->

## What to know

This is a post on the lodash \_.mixin method and what it can be used for when working on a javaScript project of one kind or another if lodash is part of the set of javaScript libraries to work with in the project. The \_.mixin method is one of many options in lodash that can be used to combine objects with each other. For some applications it might be better to use [\_.merge](/2017/11/17/lodash_merge/), or [\_.assign](/2018/09/21/lodash_assign/) which are other typical methods that would be used for these kinds of tasks.

## 1 - Using \_.mixin to extend lodash

One of the features of \_.mixin is that it can be used to extend lodash if just a source object is given. This may more may not be a good idea depend on how you look at it. By adding my own custom methods to lodash I am turning lodash into something other than lodash. So it might not be the best move when it comes to readability of code. Many developers may see the underscore and assume that the custom method might be part of the official lodash utility library when it is not. For this reason when I make my own utility libraries I attach everything g to a global variable named something other than underscore Never the less the mixen method can be used to extend lodash.
```js
_.mixin({
 
    foo: function () {
 
        return 'bar';
 
    }
 
});
 
console.log(_.foo() ); // bar
```

## 2 - Using \_.mixin to extend an object

Say you have an object that has some properties and another object of methods that will work with those properties. If two arguments are given to \_.mixin the first argument id expected to be a detestation object, and the second should be the source object that has the methods that are to be used with that object.

```js
// just some properties
let props = {
    x: 100,
    y: 100
},
 
// some methods that will work with such properties
methods = {
    atan: function (string) {
        return Math.atan2(this.y, this.x) / Math.PI * 180;
    },
    dist: function (x, y) {
        return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    },
    setByAD: function (a, d, cx, cy) {
        cx = cx === undefined ? 0 : cx;
        cy = cy === undefined ? 0 : cy;
        a = Math.PI / 180 * a;
        this.x = Math.cos(a) * d + cx;
        this.y = Math.sin(a) * d + cy;
        return this;
    }
};
 
let obj = _.mixin(props, methods);
 
// atan, and distance relative to 0,0
console.log(obj.atan()); // 45
console.log(obj.dist(0, 0)); // 141.42...
 
// set by angle and distance
obj.setByAD(45, 100);
 
console.log(_.round(obj.dist(0, 0))); // 100
```

## 3 - Vanilla javaScript and doing similar things to that of the lodash mixin method

With all of my posts on lodash I typically like to have a section in which I do some similar things to the lodash method of interest in the post with just javaScript by itself. When it comes to doing what the lodash mixin method does with just core javaScript by itself there are a number of javaScript features that are of interest. For one thing there is the [Object keys](/2018/12/15/js-object-keys/) static method that will give me an array of public key names in an object. I can then loop over this array of public key names and use them to also the the values for each key and value of source object. I can then use the [type of operator](/2019/02/15/js-javascript-typeof/) to check if a given key and value pair in a source object is a [function](/2019/12/26/js-function/) or not, and if it is I can then assign this function to a target object. When doing so there is assigning the function as an own property of the object, assigning it to the prototype object of the object, or doing both.

### 3.1 - Just adding functions to an object

For this example I made a vanilla javaScript mix in method that will just add given source functions to a target function by making them the own properties of the target object. What this means is that I am creating references to the functions as properties of the actually target object itself rather than adding them to the prototype object.

```js
// mix in method
var mixin = function (obj, source) {
    Object.keys(source).forEach(function (key) {
        var value = source[key];
        // if source value is a function
        if (typeof value === 'function') {
            // assign to source object
            obj[key] = value;
        }
    });
};
// DEMO
// source object as a collection of utils
var utils = {};
utils.atan = function (string) {
    return Math.atan2(this.y, this.x) / Math.PI * 180;
};
utils.dist = function (x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
};
// point object
let pt = {
    x: 0,
    y: 0
};
mixin(pt, utils);
console.log(pt.dist(10, 5).toFixed(2)); // 11/18
```

### 3.2 - Appending the prototype object of a function

In this example I made another vanilla javaScriot mix in method that will append to the prototype object of a given target object, but only if that object is a function. Else of the target object is not a function it will just make the source methods own properties of the target object which is the same as before.

```js
// mix in method
var mixin = function (obj, source) {
    Object.keys(source).forEach(function (key) {
        var value = source[key];
        // if source value is a function
        if (typeof value === 'function') {
            // if target object is a function, assign to prototype object
            if (typeof obj === 'function') {
                obj.prototype[key] = value;
            } else {
                // else make it an own property
                obj[key] = value;
            }
        }
    });
};
// DEMO
// constructor
var Point = function (x, y) {
    this.x = x;
    this.y = y;
};
// prototype
Point.prototype.atan = function () {
    return Math.atan2(this.y, this.x) / Math.PI * 180;
};
// source object as a collection of utils
var utils = {};
utils.dist = function (x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
};
// calling mixin and adding utils to the Point class
mixin(Point, utils);
// creating a Point instance and using the methods
var pt = new Point(0, 5);
console.log(pt.atan().toFixed(2)); // 90.00
console.log(pt.dist(10, 5).toFixed(2)); // 10.00
```

## 4 - Conclusion

That is it for now when it comes to the lodash mixin method, at least until I come around to editing and expanding this post a little next time, which might be a while. In the mean time if you enjoyed reading this post and thing that you have gained something of value from reading it you might want to check out my [main post on lodash](/2019/02/15/lodash/), as well as maybe one of my [many other posts on lodash](/categories/lodash/) that also touch base on many native javaScript features also.

