---
title: lodash every collection method and vanilla js alternative
date: 2019-08-01 10:18:00
tags: [lodash]
layout: post
categories: lodash
id: 513
updated: 2019-08-01 13:37:34
version: 1.4
---

The lodash every collection method can be used to test if each key value in a collection meets a condition that is defined in the body of a function that is passed as one of the arguments. So it can for example be used to test if all elements in an array are a number. In this post I will be quickly going over the lodash every method as well as the native Array.every method and other native javaScript ways of testing if all values in an object meet a given condition.


<!-- more -->

## 1 - lodash every Basic example

So I often start of a post by quickly getting into a basic example of what it is that I am writing about in the post. So for this post on the lodash every method here is a simple example where I just have two arrays. One of which is all numbers, and the other of which contains one string.

I then have a function that can be used with the lodash \_.every method that will return true of a given element in an array or kety value in an object is a number. When I call the lodash every method I pass an array as the first argument and give the method that checks for a number as the second argument.


```js
let _ = require('lodash');
// two arrays one has nothing but numbers
// the other has a single element that is
// a string.
let arr1 = [1, 2, 3, 4],
arr2 = [1, 2, 'c', 4],
// a method that can be used to test
// if all elements are a number
tester = (el) => {
    return typeof el === 'number';
};
// using the tester method with _.every
console.log(_.every(arr1, tester)); // true
console.log(_.every(arr2, tester)); // false
```

## 2 - The \_.every method can be used on plain old objects

So because the lodash every method is a collection method that means that it can be used on plain old objects that are a collection of sorts. Say I have an object with a bunch of public keys, and I want to make sure that each key meets a certain set of criteria. For example I want each propert to be an object, and I want each of those objects to have a property of a certain name, and for that property to be of a specific type and vaue. There are many ways of going about doing that, but if lodash is there it can be quickly done with the lodash every method.

```js
let _ = require('lodash');
// a plan old object that is
// a collection of sorts
let items = {
    apple: {
        cost: 2
    },
    raspberry: {
        cost: 5
    },
    blackberry: {
        cost: 4
    }
};
// a method to check each key in the object
let hasCost = function (item) {
    // is item an object?
    if (typeof item === 'object') {
        // false if null
        if (item === null) {
            return false;
        }
        // Some rules for a cost property
        if (typeof item.cost === 'number' && item.cost >= 0) {
            return true;
        }
    }
    // if we get here yeah false
    return false;
};
 
// Evey can be used to check that every item
// meets the given set of conditions
console.log(_.every(items, hasCost)); // true
items.newProduct = null;
console.log(_.every(items, hasCost)); // false
```

## 3 - Vanilla js alternatives to lodash every

So now that we know the basic deal about that lodash every method, maybe we should now look at some plain old vanilla javaScript alternatives to using the lodash every method. After all there is now a native Array.every method that can be used to replace it, and this can be chalked up as yet another reason as to not bother with lodash anymore right? Well yes and no, lets look at the reasons why, and also some additional ways of going about checking all keys in an object for some kind of condition.

### 3.1 - The Array.every method will work okay with Ararys and array like objects with Function.call

```js
let items = {
    apple: {cost: 2},
    raspberry: {cost: 5},
    blackberry: {cost: 4}
};
let hasCost = (item) => {
    if (typeof item === 'object') {
        if (item === null) {return false;}
        if (typeof item.cost === 'number' && item.cost >= 0) {
            return true;
        }
    }
    return false;
};
// does not seem to work as expected with my items
// object
console.log([].every.call(items, hasCost)); // true
items.fooberry = null;
console.log([].every.call(items, hasCost)); // true
 
let arrLike = {
    0 : 7,
    1 : 8,
    2 : 'nope',
    length: 3
},
tester = (el) => {
    return typeof el === 'number';
};
 
console.log([].every.call(arrLike, tester)); // false
arrLike[2] = 9;
console.log([].every.call(arrLike, tester)); // true
```