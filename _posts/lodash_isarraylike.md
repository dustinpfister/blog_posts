---
title: The lodash is array like method, and array like objects in general
date: 2020-08-01 16:56:00
tags: [lodash]
layout: post
categories: lodash
id: 690
updated: 2020-08-01 17:54:52
version: 1.5
---

In javaScript it is possible to have objects that look a lot like arrays, but they are not arrays. That is an object with numbers rather than named key names, and a length property that is the highest index value of this set of number key names. Such objects are often regarded as array like objects, and although they are not arrays, than can often still be treated as array when it comes to just getting around the few subtle issues that might creep up with them.

So With all of that said in this post on [lodash](https://lodash.com/) I will be going over the [lodash \_.isarray](https://lodash.com/docs/4.17.15#isArrayLike) like method than can be used as one way to know if you are working with an array, or at least an array like object. I will also be going over how to go about finding out if you are dealing with one of these kinds of object when it comes to just working with native javaScript by itself.

<!-- more -->

# 1 - Basic example of lodash \_.isarraylike

So the lodash \_.isarraylike method works by checking if what is given is an object that is not a function, and that the object has a length property. It also checks if that length property is a number that is an integer, and that it has a value that is higher than zero and the same or lower than that of MAX_SAFE_INTEGER.

So say I have just a plain old Object created with the Object literal syntax and then have just a few number properties and a length property, the length property is a number, and is also not a fraction. If I pass this kind of object to the lodash is array like method it should return a true value.

```js
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
 
console.log( _.isArrayLike(obj) ); // true
```

## 2 - is array like

So it is worth noting that an actually array will also return true for the lodash is array like method. So the lodash is array like method is nt a good choice if you want to test if an object is array like and not an array. However it is not to hard to do just a little more additional testing to get around that.

```js
let _ = require('lodash');

let obj = {
    length: 0
},
arr = [];
 
console.log(_.isArray(obj)); // false
console.log(_.isArray(arr)); // true
 
console.log(_.isArrayLike(obj)); // true
console.log(_.isArrayLike(arr)); // true

//
let isArrayLikeAndNotArray = (obj) => {
    return _.isArrayLike(arr) && !_.isArray(obj);
};
 
console.log(  isArrayLikeAndNotArray(obj) ); // true
console.log(  isArrayLikeAndNotArray(arr) ); // false
```

## 3 - Vanilla javaScript isArrayLike method

So the process of making a vanilla javaScript is array like method can prove to be a little involved. The one I put together here makes use of the typeof operator, along with the use of the identity operator to test if a length property is a number of not. I am also making use of the [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger) method to test of the number value of a length property is an integer or not.

```js
Number.isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};
 
let isArrayLike = function (a) {
    // is it an object
    if (typeof a != 'object' || a === null) {
        return false;
    }
    // is length a number? is it an Integer?
    // is it greater than 0 and less then or equal to MAX_SAFE_INTEGER
    if (typeof a.length === 'number') {
        if (Number.isInteger(a.length) && a.length > 0 && a.length <= Number.MAX_SAFE_INTEGER) {
            // then it is array like
            return true;
        }
    }
    // if we get here it is not array like
    return false;
};
 
let obj = {
    //0: 1,
    //1: 2,
    //2: 3,
    length: 3
};
 
console.log(isArrayLike('obj')); // false
console.log(isArrayLike(null)); // false
console.log(isArrayLike({})); // false
console.log(isArrayLike(obj)); // true
```

SO there might be a number of other ways to test out if a value is array like or not that might work in most situations. Still it would seem that this is one of several methods in lodash where a native solution would still be a little time consuming to work out and test.