---
title: The lodash is empty object method for finding out if an object is empty or not
date: 2019-09-01 17:23:00
tags: [lodash]
layout: post
categories: lodash
id: 529
updated: 2019-09-07 09:38:36
version: 1.2
---

In lodash there is the \_.isEmpty method than can be used to find if a collection object is empty or not. This is not to be confused with other possible values that might be considered empty such as null, a false boolean value or so forth. There are also a number of ways to go about doing the same when it comes to working with just plain old native javaScript in addition to using the lodash is empty method. 

<!-- more -->

## 1 - Lodash is empty basic example

```js
let _ = require('lodash');
 
let obj = {},
obj2 = {x:42};
 
console.log( _.isEmpty(obj) ); // true
console.log( _.isEmpty(obj2) ); // false
```