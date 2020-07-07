---
title: nth root of a number in javaScript
date: 2020-03-11 15:06:00
tags: [js]
layout: post
categories: js
id: 625
updated: 2020-07-07 08:13:28
version: 1.11
---

Often I end up using [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) in projects whenever I need to get the square root of a number. However what if I want the [nth root](https://en.wikipedia.org/wiki/Nth_root) of a number? Such as the cubed root of a number, or any other degree beyond of that of just the number 2 that is what I am set with when using the Math sqrt method. I can not say that I end up having to use this kind of method that often, but still there does not seem to be a built in mMath object method for it.

Well in this post I will be going over a quick example of how to go about working out a basic nth root method with just plain old javaScript by itself.

<!-- more -->

## 1 - nth root and math pow

One solution is to use the [Math.pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) method to get the nth root of a given root number and degree.

This works by just passing the root number as the base for Math.pow, and then diving 1 by the degree number to get the exponent argument for Math.pow like so.

```js
var nthRoot = function (n, degree) {
    return Math.pow(n, 1 / degree);
};
 
console.log(Math.sqrt(25)); // 5
console.log(nthRoot(25, 2)); // 5
 
var n = nthRoot(25, 3);
console.log(n); // 2.924017738212866
console.log(n * n * n); // 24.999999999999996
n = nthRoot(25, 4);
console.log(n); // 2.23606797749979
console.log(n * n * n * n); // 25.000000000000007
```

## 2 - Conclusion

I can not say that I end up using this often in projects, but it is something that I think about now and then. If I find out some other ways to go about doing that as well as some actual use case example i will be sure to update this post.