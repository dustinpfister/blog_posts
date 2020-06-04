---
title: The lodash _.mixin method
date: 2018-01-31 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 336
updated: 2020-06-04 12:08:45
version: 1.7
---

The process of combining objects in lodash can be a little tricky, there are the own properties of an object, it's prototype object, as well as even hidden properties in some cases. Also there is the idea of extending lodash with custom methods that are not a part of lodash as well. The [lodash](https://lodash.com/) [\_.mixin method](https://lodash.com/docs/4.17.4#mixin) can be used to extend lodash, or another object with a source object of methods. It is one of many methods in lodash that can be used to combine objects, in some cases it might be useful so lets take a look at \_.mixin.

<!-- more -->

## 1 - What to know

This is a post on the lodash \_.mixin method and what it can be used for. The \_.mixin method is one of many options in lodash that can be used to combine objects with each other. For some applications it might be better to use [\_.merge](/2017/11/17/lodash_merge/), or [\_.assign](/2018/09/21/lodash_assign/).

## 2 - Using \_.mixin to extend lodash

One of the features of \_.mixin is that it can be used to extend lodash if just a source object is given. This may more may not be a good idea depend on how you look at it. By adding my own custom methods to lodash I am turning lodash into something other than lodash. So it might not be the best move when it comes to readability of code. Many developers may see the underscore and assume that the custom method might be part of the official lodash utility library when it is not. For this reason when I make my own utility libraries I attach everything g to a global variable named something other than underscore Never the less the mixen method can be used to extend lodash.
```js
_.mixin({
 
    foo: function () {
 
        return 'bar';
 
    }
 
});
 
console.log(_.foo() ); // bar
```

## 3 - Using \_.mixin to extend an object

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
