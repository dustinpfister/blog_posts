---
title: The lodash _.mixin method
date: 2018-01-31 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 336
updated: 2018-11-25 18:34:21
version: 1.3
---

The [lodash](https://lodash.com/) [\_.mixin method](https://lodash.com/docs/4.17.4#mixin) can be used to extend lodash, or another object with a source object of methods.

<!-- more -->

## 1 - What to know

This is a post on the lodash \_.mixin method and what it can be used for. The \_.mixin method is one of many options in lodash that can be used to combine objects with each other. For some applications it might be better to use \_.merge, or \_.assign.

## 2 - Using \_.mixin to extend lodash

One of the features of \_.mixin is that it can be used to extend lodash if just a source object is given.

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
