---
title: The lodash values method and native javaScript
date: 2019-05-13 14:08:00
tags: [lodash]
layout: post
categories: lodash
id: 444
updated: 2021-12-04 19:45:57
version: 1.11
---

The [lodash values](https://lodash.com/docs/4.17.11#values) method is one of many methods in lodash where there is a native counterpart. However sometimes browser support for a native method only goes back so far, also sometimes a native method does not always work as expected, or it could use one more additional feature that is just not there. However the lodash values object method might not be the best example of the kind of method in lodash that brings something more to the table, as the lodash values method does more or less the same thing as the Object values method. However when it comes to going way back the native Object.values method is still fairly new, and as such the use of the Object values native method will result in code breaking in certain older browsers. 

Still in nay case this will be a post on the lodash values method as well as the native javaScript counter part that is the Object.values static object method. There is also the lodash keys method as well as the the native Object.keys method that will return an array of public key names rather than values for a given object. Regardless if you use lodash or just native javaScript this is a method that any javaScript developer should be familiar with, alone with the Object keys method also. So lets take a look at some examples of the lodash values method.

<!-- more -->

## 1 - The basics of the lodash values method and other lodash methods

In this section I will be starting out with a few basic examples of the lodash values method as well as other lodash methods such as the keys method. In a later section in this post I will be getting into the various native methods that there are to work with also, as well as how to go about poly filling the method and go about using alternatives that will work on very old web browsers.

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


### 1.2 - The lodash keys method

The lodash keys method is just like that of the object values method but it will return an array of key names rather than that of values.

```js
let obj = {
    foo: 'bar',
    n: 42
};
// There is the lodash _.keys that can be used 
// to get object key names
console.log(_.keys(obj)); // ['foo', 'n']
```

## 2 - Vanilla javaScript ways of getting arrays of object values

Lodash methods work fine for various tasks, but there is also just working with native javaScript by itself. In this section I will be going over the various ways of getting the values of an object with just javaScript by itself.

### 2.1 - Object.values and Object.keys

So then there is now the native Object.values method that was introduced in recent years, this method works in the same way as lodash values but it might not be there in some older environments. As such this is one such method that helps to support a case that lodash is not a dead library just yet depending on your sites bowser user agent stats.


```js
let obj = {
    foo: 'bar',
    n: 42
};
// there is also the native Object.values
// that does the same thing as lodash values
// there is also an Object.keys
console.log( Object.values(obj) ); // [ 'bar', 42 ]
console.log(Object.keys(obj)); // ['foo', 'n']
```

## 3 - Conclusion

There are then a number of ways to go about getting an array of object values, not just with lodash, but also with native javaScript by itself. If you do not care about supporting old web browsers then just directly using Object.values, and other modern native javaScript methods is fine. However if you still do care at least a little you might want to use lodash. However even then there is also looking into what the browser support is for the version of lodash that is being used, often it will still only go back so far. So then in you really want to make sure you are writing code that will almost always work you might want to stick to using one of the other vanilla javaScript methods for dong this sort of thing such as a for in loop.

