---
title: The lodash keys method and native javaScript
date: 2019-05-14 14:08:00
tags: [lodash]
layout: post
categories: lodash
id: 446
updated: 2019-05-14 16:26:33
version: 1.3
---

The [lodash keys](https://lodash.com/docs/4.17.11#keys) method in lodash can be used to get an array of public key names of an object. There is also the native Object.keys method as well that has been introduced as well, so this makes the lodash \_.keys method one of many methods in lodash where it mostly just comes down to a question of browser support.

<!-- more -->

## 1 - lodash keys and Object.keys example

The lodash keys method works by just simply passing an object as the first argument, and an array of public key names is returned by the method. The native Object.keys method works in the same manner as well.

```js
let _ = require('lodash');
 
let obj = {
    foo: 'bar',
    n: 42
};
 
// lodash _.keys can be used to get the keys
// for each key of an object
console.log(_.keys(obj) ); // ['foo', n]
 
// there is also the native Object.keys
// that does the same thing
console.log( Object.keys(obj) ); // ['foo', n]
 
// There is the lodash _.values, and Native Object.values
// that can be used to get object value of the keys as well
console.log(_.values(obj)); // [ 'bar', 42 ]
console.log(Object.values(obj)); // [ 'bar', 42 ]
```

So because there is a native method for getting public key names of an Object, what bother with lodash? Well first off this is just one method, and there are many lodash methods where there is no native counter part at all. Also there are many lodash methods where the lodash method works a little differently, or brings a little something more to the table.

The lodash keys method might not be the best example of the worth of lodash these days, but there is something to say about browser support with the Object.keys method. The native Object.keys method is still fairly new in light of the history of web development, and it is also true that the method is not supported at all when it comes to Internet Explorer. So it still makes sense to use the lodash keys method as a way to bring better browser support. If you do not want to use lodash, it is still wise to use a polyfill for this one.