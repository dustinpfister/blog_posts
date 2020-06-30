---
title: Find the _.size of Arrays and Objects with lodash, and vanilla js
date: 2018-11-04 16:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 321
updated: 2020-06-30 18:45:29
version: 1.14
---

Getting the length of an array is a trivial matter in javaScript, but then there is getting the length of Objects in general that is a little not so trivial some times. In [lodash](https://lodash.com/) there is the [\_.size](https://lodash.com/docs/4.17.10#size) method that is a collection method that will work with both arrays, and objects to return the element length of an array, or the number of enumerable properties of a plain old object of any sort. However doing so is really not all that hard with just plain old javaScirpt by itself also. So in this post I will be quickly covering the \_.size method, but will also be going over vanilla js solutions for doing this as well.

<!-- more -->

## 1 - what to know

This is a post on the \_.size method that can be used to get the element length of an Array, or the key length of a plain old object in the event of the absence of a length property. I am also going over plain old native javaScript alternatives to using the \_.size method as well that include the length property and Object.keys.

### 1.1 - The \_.size method is a collection method

The \_.size method in lodash is one of the many so called collection methods in lodash. What that means is that they work with both arrays, and plain old objects. This differs from what is typically used when it comes to native javaScript alternatives which are often prototype methods of Array or Object. Sometimes it is possible to get an Array method to work with an Object that is not an instance of Array if it just happens to be "array like" by using Function.call, but they are not intended to be used on any Object.

## 2 - examples of \_.size in action

In this section I will be going over some quick simple examples using \_.size that should help show why it might be a useful collection method. The use of \_.size is fairly easy, just pass it an Array or object and it will give the element length or the number of keys. There are some pit falls to be aware of when using \_.size, or when just working with Arrays and objects in general actually so I will be touching base on that as well here. If you are more interested in vanilla js solutions I will be covering that in the next section.

### 2.1 - Using \_.size with an array

When an array is passed to \_.size the element length of that array is returned.

```js
// array element length
let a = [1, 2, 3, 4];
console.log(_.size(a)); // 4
```

### 2.2 - \_.size with an Object that does not have a length property

If a plain object without a length property is given to \_.size the enumerable key length of that object is returned.

```js
// Object key length
let b = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
};
console.log(_.size(b)); // 4
```

## 3 - Vanilla js alternatives to \_.size

Although the \_.size method nice in that it is a robust collection method that will work with both Arrays and objects in general, it is not like just getting this information is all that hard with native javaScrtipt properties and methods. There is of course the the Array.length property, and as of ES5 spec javaScript Object.keys and be used to quickly get an array of key names of an object to which an Array.length value can be obtained. In this section I will be covering the use of these, which is simple enough.

### 3.1 - The Array length Property

So when dealing with an array the element length can easily be obtained with the length property, not much to write about with that.

```js
let a = [1, 2, 3, 4];
console.log(a.length); // 4
```

### 3.2 - Object.keys to get enumerable properties of an Object

In ES5 spec javaScript Object.keys was introduced, unless you care about supporting ancient browsers the method will work just fine.

```js
let b = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
};
console.log(Object.keys(b).length); // 4
```

### 3.3 - Object.getOwnPropertyNames(obj).length for getting the key length of both enumerable and non-enumerable object own properties

So both \_.size, and Object.keys(obj).length only return enumerable keys in an non array like object. If I am dealing with an object that has non-enumerable properties the full key length of the objects own properties can be obtained by using the Object.getOwnPropertyNames static Object method in native javaScript.

```js
let obj = {
    visible: 'I count'
};
 
Object.defineProperty(obj, 'hidden', {
 
    value: 'I do not count',
    writable: false,
 
    // default is false actually
    // just putting this here to be explicit
    enumerable: false
 
});
 
console.log(obj.hidden); // I count
console.log(obj.visible); // I do not count
 
// _.size or Object.keys(obj).length 
// will only return enumerable lengths
console.log(_.size(obj)); // 1
console.log(Object.keys(obj).length); // 1
 
// so there is Object.getOwnPropertyNames()
console.log( Object.getOwnPropertyNames(obj).length ); // 2
```

## 4 - Conclusion

So maybe the \_.size method is not one of the most compelling methods that make using lodash worth the hassle, but there are still methods that are very useful, and are not baked into javaScript itself. Keep in mind that lodash methods can be installed on a per method basis, and when doing so maybe this one is a pass for me at least.