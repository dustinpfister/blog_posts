---
title: JavaScript forEach with arrays and objects in general
date: 2019-02-16 10:39:00
tags: [js]
layout: post
categories: js
id: 384
updated: 2019-02-16 12:40:58
version: 1.4
---

In javaScript there is the [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method that is often used as a quick way to go about looping over the contents of an array. However there are other Array methods that do the same thing but might be a better choice depending on what you want to do with an Array like Array.map, and Array.filter. Then there are other objects in javaScript that are structured like arrays, but are not arrays. In addition there are also plain old objects that are named collections of key value pairs rather than indexed by numbers. As such this post will be on Array.forEach, but also the many other options in native javaScript  and libraries like [lodash](/2019/02/15/lodash/).

<!-- more -->

## 1 - javaScript forEach

The Array.forEach method in native javaScript is one of many ways to loop over the contents of a collection in javaScript. However the Array.forEach method is only useful for looping over the contents of an Array, it can also in some cases be used to loop over the contents of an array like object, but it might not always be the best solution when it comes to looping over named collections when it comes to clever ways to get it to work with such collections. In any case there are other ways of doing this that involve the use of a library like javaScript as well as other native solutions.

## 2 - javaScript forEach basic examples

So a basic example of Array.forEach might look something like this.

```js
let arr = [1, 2, 3],
sum = 0;
arr.forEach((n) => {
    sum += n;
});
console.log(sum); // 6
```

In real projects want might need to happen for each element in an array might end up being far more complex than just adding up each number in the array. There might come a time where I might not want to start at index 0 each time, or I might want to do something with each array index and so forth. So lets look as some more basic examples that are written differently, but do more or less the same thing for now before moving on to so more advanced examples.

## 2.1 - ECMA rev5 compliant

As time goes by it is becoming less, and less of an issue to worry about code breaking on clients when delivering modern javaScript exclusively. Still depending on your websites analytics with browser versions, it might still be better to stick to the tired yet true way of doing things with client side javaScript.

```js
var arr = [1, 2, 3],
sum = 0;
arr.forEach(function(n){
    sum += n;
});
console.log(sum); // 6
```

Sticking to an older javaScript spec will help to assure that what it is that you are making will work on a larger range of clients.

## 2.2 - Array.reduce

When it comes to doing anything that might involve a sum of any kind, it might be better to use Array.reduce in place of Array.forEach. The

```js
let arr = [1, 2, 3],
sum = arr.reduce((s,r)=>{return s+r;});
console.log(sum); // 6

```