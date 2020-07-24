---
title: lodash every collection method and vanilla js alternative
date: 2019-08-01 10:18:00
tags: [lodash]
layout: post
categories: lodash
id: 513
updated: 2020-07-24 06:27:40
version: 1.11
---

The [lodash every](https://lodash.com/docs/4.17.15#every) collection method can be used to test if each key value in a collection meets a condition that is defined in the body of a function that is passed as one of the arguments. So it can for example be used to test if all elements in an array are a number, if all elements in an array are objects of a certain constructor, and so forth. 

In native javaScript there is the [array every prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) method, and it would seem that this native method has decent browser support. It is an array method rather than a collection method as is the case with lodash every, but will work just as well when it comes to arrays.

In this post I will be quickly going over the lodash every method as well as the native Array.every method and other native javaScript ways of testing if all values in an object will satisfy a given condition.


<!-- more -->

## 1 - lodash every Basic example

So I often start of a post by quickly getting into a basic example of what it is that I am writing about in the post. So for this post on the lodash every method here is a simple example where I just have two arrays. One of which is all numbers, and the other of which contains one string.

I then have a function that can be used with the lodash \_.every method that will return true of a given element in an array or key name in an object is a number. When I call the lodash every method I pass an array as the first argument and give the method that checks for a number as the second argument.


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

So because the lodash every method is a collection method that means that it can be used on plain old objects that are a collection of sorts. Say I have an object with a bunch of public keys, and I want to make sure that each key meets a certain set of criteria. For example I want each property to be an object, and I want each of those objects to have a property of a certain name, and for that property to be of a specific type and value. There are many ways of going about doing that, but if lodash is there it can be quickly done with the lodash every method.

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

### 3.1 - The Array.every method will work okay with Arrays and array like objects with Function.call

So the native Array.every method will work just fine in most cases, assuming that all the clients that you want to support have it for starters. Also assuming that you will always want to use the Array.every method with well Arrays, in the event that you are dealing with a collection that is an object you will not be able to use it and get expected results. That is unless it is an Array like object that is formated like an Array with a length property and numbered key names, in which case it will work okay with Function.call.

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

This is typically of course of many of the native Array methods, they will work okay in most situations. However because they are very much array methods rather than collection methods they will not work in some situations involving plain old objects that are being used as a kind of named array.

### 3.2 - Making my own every method with Object.values

So then there is the idea of making my own vanilla js version of the lodash every method. Doing so is not to hard and there are a wide range of ways that I can think of to go about doing it involving loops and other native methods. I will not be going through the process of finding every which way to do this of course, but for this example I will be using the Object.values static Object method.

```js

// An every method could be written like this
// with Object.values
let every = (obj, forEach) => {
    let i = 0,
    values = Object.values(obj),
    len = values.length;
    while (i < len) {
        if (!forEach(values[i])) {
            return false;
        }
        i += 1;
    }
    return true;
};
// lets put it to the test
let arr1 = [1, 2, 3, 4],
arr2 = [1, 2, 'c', 4],
obj1 = {
    foo: 5,
    bar: 7
},
obj2 = {
    foo: 'string',
    bar: null
},
tester = (el) => {
    return typeof el === 'number';
};
// works as exspected
console.log( every(arr1, tester) ); // true
console.log( every(arr2, tester) ); // false
console.log( every(obj1, tester) ); // true
console.log( every(obj2, tester) ); // false
```

So the nice thing about this is that it works just like the lodash every method in the sense that it works okay with arrays, and objects in general. Even if they are not formated like and array, and are thus array like objects. Most browsers support the Object.values method okay, but this example might still break on some older clients, so lets see about another example.

### 3.3 - Using a for in loop

A for in loop could be used to make an every method that will work on a wide range of clients.

```js
var every = function (obj, forEach) {
    for (var prop in obj) {
        if (!forEach(obj[prop])) {
            return false;
        }
    }
    return true;
};
```