---
title: The lodash is empty object method for finding out if an object is empty or not
date: 2019-09-01 17:23:00
tags: [lodash]
layout: post
categories: lodash
id: 529
updated: 2019-09-07 09:43:43
version: 1.3
---

In lodash there is the \_.isEmpty method than can be used to find if a collection object is empty or not. This is not to be confused with other possible values that might be considered empty such as null, a false boolean value or so forth. There are also a number of ways to go about doing the same when it comes to working with just plain old native javaScript in addition to using the lodash is empty method. 

<!-- more -->

## 1 - Lodash is empty basic example

So the lodash \_.isEmpty method can be used to check if an object collection is empty or not. If the collection is just an object with one or more public key value pairs then it is not empty, the same is true with arrays when they have one ore more indexed values.

```js
// Is empty can be used with Object Collections
console.log( _.isEmpty({}) ); // true
console.log( _.isEmpty({x:42}) ); // false
 
// and Array Object Collections
console.log( _.isEmpty([]) ); // true
console.log( _.isEmpty([12,42,87]) ); // false
```