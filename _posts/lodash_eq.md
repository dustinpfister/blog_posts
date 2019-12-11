---
title: lodash eq method, Object.is, SameValueZero, equality, and identity
date: 2019-12-04 12:01:00
tags: [lodash]
layout: post
categories: lodash
id: 576
updated: 2019-12-10 19:04:01
version: 1.4
---

So there is the [lodash eq](https://lodash.com/docs/4.17.15#eq) method that is one way of fining out the same value zero result of two values. However what is same value zero, and is it all that hard to get the same result in native javaScript itself these days? Well in ECMA2015 spec javaScript the [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) static method was introduced that does indeed do the same thing. So if this is the only thing that you care about in a project, maybe a simple polyfill will do just fine and you can ditch lodash. Otherwise the lodash \_.eq method can do more or less the same thing if you are still keeping lodash as part of your projects stack. 

Regardless of what you attitude is with lodash these days I will make this post also about same Value Zero in general so that this is not just a post on lodash eq alone.

<!-- more -->

## 1 - lodash eq basic example

So when comparing two values there is the equality operator and then the identity operator.

```js
console.log( NaN == NaN ); // false
console.log( NaN === NaN ); // false
console.log( _.eq(NaN , NaN) ); // true
```

## 2 - Object is and polyfill

The native javaScript equivalent to the lodash eq method is the object is method. The method works in more or less the same way, call the Object is method and pass two values to compare as arguments.

```js

Object.is = Object.is || function (x, y) {
    if (x === y) { 
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
};

console.log( 0 == -0 ); // true
console.log( 0 === -0 ); // true
console.log( Object.is(0 , -0) ); // false
```