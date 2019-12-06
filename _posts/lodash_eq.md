---
title: lodash eq method, Object.is, SameValueZero, equality, and identity
date: 2019-12-04 12:01:00
tags: [lodash]
layout: post
categories: lodash
id: 576
updated: 2019-12-05 19:20:42
version: 1.2
---

So there is the [lodash eq](https://lodash.com/docs/4.17.15#eq) method that is one way of fining out the same value zero result of two values. However what is same value zero, and is it all that hard to get the same result in native javaScript itself these days? Well in ECMA2015 spec javaScript the [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) static method was introduced that does indeed do the same thing. So if this is the only thing that you care about in a project, maybe a simple polyfill will do just fine and you can ditch lodash. Otherwise the lodash \_.eq method can do more or less the same thing if you are still keeping lodash as part of your projects stack. 

Regardless of what you attitude is with lodash these days I will make this post also about sameValeZero in general so that this is not just a post on lodash eq alone.
<!-- more -->

## 1 - lodash eq basic example

```js
console.log( NaN == NaN ); // false
console.log( NaN === NaN ); // false
console.log( _.eq(NaN , NaN) ); // true
```