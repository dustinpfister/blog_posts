---
title: JavaScript forEach with arrays and objects in general
date: 2019-02-16 10:39:00
tags: [js]
layout: post
categories: js
id: 384
updated: 2019-02-16 12:30:43
version: 1.3
---

In javaScript there is the [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method that is often used as a quick way to go about looping over the contents of an array. However there are other Array methods that do the same thing but might be a better choice depending on what you want to do with an Array like Array.map, and Array.filter. Then there are other objects in javaScript that are structured like arrays, but are not arrays. In addition there are also plain old objects that are named collections of key value pairs rather than indexed by numbers. As such this post will be on Array.forEach, but also the many other options in native javaScript  and libraries like [lodash](/2019/02/15/lodash/).

<!-- more -->

## 1 - javaScript forEach

The Array.forEach method in native javaScript is one of many ways to loop over the contents of a collection in javaScript. However the Array.forEach method is only useful for looping over the contents of an Array, it can also in some cases be used to loop over the contents of an array like object, but it might not always be the best solution when it comes to looping over named collections when it comes to clever ways to get it to work with such collections. In any case there are other ways of doing this that involve the use of a library like javaScript as well as other native solutions.

## 2 - Array.forEach basic example

So a basic example of Array.forEach might look something like this.

```js
let arr = [1, 2, 3],
sum = 0;
arr.forEach((n) => {
    sum += n;
});
console.log(sum); // 6
```


## 3 - Alternative basic Array.forEach examples 

So there are a number of different ways that the basic Array.forEach example could be written. In this section I will be going over many different options for this.

### 3.1 - ECMA rev5 compliant

As time goes by it is becoming less, and less of an issue to worry about code breaking on clients when delivering modern javaScript exclusively. Still depending on your websites analytics with browser versions, it might still be better to stick to the tired yet true way of doing things with client side javaScript.

```js
var arr = [1, 2, 3],
sum = 0;
arr.forEach(function(n){
    sum += n;
});
console.log(sum); // 6
```
