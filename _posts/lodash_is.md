---
title: lodash is a bunch of things
date: 2019-07-23 11:48:00
tags: [lodash]
layout: post
categories: lodash
id: 507
updated: 2020-07-23 13:33:07
version: 1.9
---

[Lodash is](https://lodash.com/docs/4.17.14) a javaScript utility library based off another similar library known as underscore. There are [many posts that have been written on what lodash is on the open web](https://medium.com/front-end-weekly/introduction-to-lodash-71dbee093b49), and new posts continue to be written on the topic of course, so I thought I would take a moment to write my take on what lodash is. 

There are actually a number of ways one could go about defining what lodash is aside from just a javaScript utility library. In this post I will be writing about some definitions when it comes to describing what lodash is, as there is more than one way to describe what lodash is to begin with before even getting started with lodash, functional programing, and so forth.

<!-- more -->

## 1 - lodash is a utility library

One way to go about describing what lodash is would be to say that it is a utility library. However calling it just that by itself is very vague, as a utility library can be a great many different things that provides all kinds of different sets of functionality.
Maybe one way to go about defining what a utility library is would be to say that it is a collection of methods on top of what is provided nativity. In addition this collection of methods brings something more to the table, functions in a different way compared to what is available natively, or just helps to ensure what should be there is in fact there.

For example say I find that a native method does not work the way that I want it to, I am now in a situation in which I have to write my own version of a native method. I then find myself writing that method over and over again each time I need it in a project, so then it makes sense to make that method part of my own utility library that I can link to each time I start a new project. However why bother even making my own utility library, it if just so happens that one all ready exists that has that method along with a whole bunch more.

```js
// a NaN value
let n = NaN;
 
// the native isNaN does not work as
// expected
console.log(isNaN(n)); // true
console.log(isNaN(undefined)); // true
 
// So I make my own that does work as expected
let myIsNaN = (a) => {
    if (typeof a != 'number') {
        return false;
    }
    return a + '' === 'NaN';
};
console.log(myIsNaN(n)); // true
console.log(myIsNaN(undefined)); // false
 
// If I want to I can start making methods
// like this as part of my own utility library
let foo = {};
foo.isNaN = (a) => {
    if (typeof a != 'number') {
        return false;
    }
    return a + '' === 'NaN';
};
console.log(foo.isNaN(n)); // true
console.log(foo.isNaN(undefined)); // false
 
// but why bother writing my own utility library
// if one like lodash is all ready out there?
console.log(_.isNaN(n)); // true
console.log(_.isNaN(undefined)); // false
```

## 2 - lodash is a functional programing library

Saying that lodash is a functional programing library is another way one could go about defining what lodash is. However it might still require a little elaboration beyond just saying that. Functional programing is a style of programing in which a functions output is the result of only its arguments. The same arguments will aways result in the same result being returned in so called pure functions that follow this functional programing rule. This is in contrast to imperative programming in which something weird involving application state, the scope chain or a class instance could result in a different result being returned even when called with the same arguments.

### 2.1 - Mutation of arguments

A big part of functional programing is having methods that do not mutate arguments. If you write a methods that takes an object as an argument what is returned is a new object that is created from that object, rather than mutating the given object. A good example of this would be the \_.slice method and the native Array.prototype.slice method.

The \_.slice method accepts an array as the first argument followed by starting and ending array index values that are to be used to create a new array from that given array.

```js
let arr = [1,2,3,4];
let arr2 = _.slice(arr, 1, 3);
 
// returns a new array
console.log(arr2); // [2,3]
 
// does not mutate the old array
console.log(arr); // [1,2,3,4]
```

Sure there is also the native slice array method that works more or less the same way, but then there are methods like splice that do not.

```js
let arr = [1,2,3,4];
// In native javaScript there is also
// Array.prototype.slice that is functional
let arr2 = arr.slice(1, 3);
console.log(arr2); // [2,3]
console.log(arr); // [1,2,3,4]
 
// but then there are methods like splice
// that are not functional as it mutates the
// given array
let arr3 = arr.splice(1,2);
console.log(arr3); // [2,3]
console.log(arr); // [1,4]
```

So by using lodash it forces me to think in a more functional rather than imperative way about my code when it comes to how functions should be designed.

## 3 - Lodash is dead

These days much of the functionality in lodash is baked into native javaScript itself, but it is still not a dead library just yet. Even if you exclusively use native javaScript methods in place of a lodash equivalents, often there was a time in the past that the native method was not there. Depending on the environment you are developing for you might still want to use lodash as a safety net of sorts, the alternative would be to use polyfills when and where needed. Also even if you do kick lodash to the curb, lodash is still a framework worth studying if you feel compelled to do so. Not just because that it helps to force a functional programing style, but for other redeeming qualities with respect to how it is designed. Everything is very fine grain, that is broken down into small manageable pieces of code that can then be built into a complex build.