---
title: The lodash values method and native javaScript
date: 2019-05-13 14:08:00
tags: [lodash]
layout: post
categories: lodash
id: 444
updated: 2021-12-04 18:38:47
version: 1.7
---

The [lodash values](https://lodash.com/docs/4.17.11#values) method is one of many methods in lodash where there is a native counterpart. However sometimes browser support for a native method only goes back so far, also sometimes a native method does not always work as expected, or it could use one more additional feature that is just not there. However the lodash values object method might not be the best example of the kind of method in lodash that brings something more to the table, as the lodash values method does more or less the same thing as the Object values method. However when it comes to going way back the native Object.values method is still fairly new, and as such the use of the Object values native method will result in code breaking in certain older browsers. 

Still in nay case this will be a post on the lodash values method as well as the native javaScript counter part that is the Object.values static object method. There is also the lodash keys method as well as the the native Object.keys method that will return an array of public key names rather than values for a given object. Regardless if you use lodash or just native javaScript this is a method that any javaScript developer should be familiar with, alone with the Object keys method also. So lets take a look at some examples of the lodash values method.

<!-- more -->

## 1 - The basics of the lodash values method and other lodash methods

### 1.1 - the lodash values method

The lodash values method works by just passing an object to it as the first argument, and then an array of values for each public keys is returned. There is also the lodash keys object method as well that does the same thing but returns the key public key names of the object.

```js
let obj = {
    foo: 'bar',
    n: 42
};
// lodash _.values can be used to get the values
// for each key of an object
console.log(_.values(obj) ); // [ 'bar', 42 ]
```

There is also the native Object.values method that was introduced in recent years, this method works in the same way as lodash values but it might not be there in some older environments. As such this is one such method that helps to support a case that lodash is not a dead library just yet depending on your sites bowser user agent stats.

### 1.2 - The lodash keys method

```js
let obj = {
    foo: 'bar',
    n: 42
};
// There is the lodash _.keys that can be used 
// to get object key names
console.log(_.keys(obj)); // ['foo', 'n']
```

