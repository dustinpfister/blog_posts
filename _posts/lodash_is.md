---
title: lodash is a bunch of things
date: 2019-07-23 11:48:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 507
updated: 2019-07-23 15:24:49
version: 1.3
---

[Lodash is](https://lodash.com/docs/4.17.14) a javaScript utility library based of another similar library known as underscore. In this post I will be writing about what lodash is, as there is more than one way to describe what lodash is to begin with.

<!-- more -->

## 1 - lodash is a utility library

One way to go about describing what lodash is would be to say that it is a utility library. However calling it just that by itself is very vague, as a utility library can be a great many different things that provides all kinds of different sets of functionality.

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