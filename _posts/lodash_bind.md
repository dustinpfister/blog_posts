---
title: The lodash _.bind method use examples.
date: 2018-10-15 16:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 305
updated: 2018-10-15 18:14:48
version: 1.6
---

For today I thought I would write a post on [\_.bind](https://lodash.com/docs/4.17.10#bind) in [lodash](https://lodash.com/), and also the concept of binding in general, by also covering the native [Function.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) as well. In this post I will be mainly writing about bind in an environment where lodash is part of the stack, and as such \_.bind is available. However I will also link to other relavent content that I have written in the past that elaborates on this more.

<!-- more -->

## 1 - what to know

If you are not familiar with \_.bind, or Function.bind, it is a way to go about creating a new javaScript function with another JavaScript function, but with the value of the this keyword set to a given object. So bind is closely tied with the this keyword in javaScript, and is a way to make methods work with any object that they can potential work with. A while back I wrote a post about the [native call, apply, and bind](/2017/09/21/js-call-apply-and-bind/) methods that might also be of interest. Also if you are new to javaScript, and still do not know much about the [this keyword](/2017/04/14/js-this-keyword/) you will want to have a grasp on that as well.

## 2 - Basic example of \_.bind

```js
let obj = {
    x: 0,
    y: 0,
    dx: 5,
    dy: 7
};
 
var step = function () {
    this.x += this.dx;
    this.y += this.dy;
};
 
// create an obj.step with _.bind
obj.step = _.bind(step, obj);
 
// I can now call step, and this will refer to obj
obj.step();
 
console.log(obj.x, obj.y); // 5,7
```

### 2.1 - Using Function.prototype.bind

```js
// create an obj.step with Function.prototype.bind
obj.step = step.bind(obj);
 
// I can now call step, and this will refer to obj
obj.step();
 
console.log(obj.x, obj.y); // 5,7
```

## 3 - Using bind to use prototype methods on objects that do not share the prototype.

```js
let _ = require('lodash');
 
let obj = {
    0: 'hi',
    1: 'how',
    2: 'are',
    3: 'you',
    4: 'doing',
    5: 'today',
    length: 6
};
 
obj.slice =  _.bind(Array.prototype.slice, obj)
 
console.log(obj.slice(1, 4)); // [ 'how', 'are', 'you' ]
```