---
title: The lodash is empty object method for finding out if an object is empty or not
date: 2019-09-01 17:23:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 529
updated: 2019-09-03 19:03:16
version: 1.1
---

In lodash there is the \_.isEmpty method than can be used to find if an object is empty or not. There are also a number of ways to go about doing the same when it comes to working with just plain old native javaScript also. 

<!-- more -->

## 1 - Lodash is empty basic example

```js
let _ = require('lodash');
 
let obj = {},
obj2 = {x:42};
 
console.log( _.isEmpty(obj) ); // true
console.log( _.isEmpty(obj2) ); // false
```