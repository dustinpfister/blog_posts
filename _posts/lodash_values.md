---
title: The lodash values method and native javaScript
date: 2019-05-13 14:08:00
tags: [lodash]
layout: post
categories: lodash
id: 444
updated: 2020-06-02 11:23:02
version: 1.6
---

The [lodash values](https://lodash.com/docs/4.17.11#values) method is one of many methods in lodash where there is a native counterpart. However sometimes browser support for a native method only goes back so far, also sometimes a native method does not always work as expected, or it could use one little additional feature. However the lodash values object method might be one such method that supports a case that lodash is not dead just yet. The reason is that the native Object.values method is still fairly new, and as such there is limited browser support for older browsers. However it still goes back far enough for the most part these days.

Still in nay case this will be a post on the lodash values method as well as the native javaScript counter part that is the Object.values static object method. Regardless if you use lodash or just native javaScript this is a method that any javaScript developer should be familiar with, alone with the Object keys method also. So lets take a look at some examples of the lodash values method.

<!-- more -->

## 1 - lodash values basic example

The lodash values method works by just passing an object to it as the first argument, and then an array of values for each public keys is returned. There is also the lodash keys object method as well that does the same thing but returns the key public key names of the object.

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

There is also the native Object.values method that was introduced in recent years, this method works in the same way as lodash values but it might not be there in some older environments. As such this is one such method that helps to support a case that lodash is not a dead library just yet depending on your sites bowser user agent stats.