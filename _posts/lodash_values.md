---
title: The lodash values method and native javaScript
date: 2019-05-13 14:08:00
tags: [lodash]
layout: post
categories: lodash
id: 444
updated: 2019-05-13 14:22:18
version: 1.1
---

The lodash values method is one of many methods in lodash where there is a native counterpart. However sometimes browser support for a native method only goes back so far, also sometimes a native method does not always work as expected, or it could use one little additional feature. The lodash values object method might be one such method that supports a case that lodash is not dead just yet. The reason being that the native Object.values method is still fairly new, and as such there is limited browser support for older browsers. 

<!-- more -->

## 1 - lodash values basic example

```js
let obj = {
    foo: 'bar',
    n: 42
};
 
// lodash _.values can be used to get the values
// for each key of an object
console.log(_.values(obj) ); // [ 'bar', 42 ]
 
// there is also the native Object.values
// that does the same thing
console.log( Object.values(obj) ); // [ 'bar', 42 ]
 
// There is the lodash _.keys, and Native Object.keys
// that can be used to get object key names as well
console.log(_.keys(obj)); // ['foo', n]
console.log(Object.keys(obj)); // ['foo', n]
```