---
title: Chaining functions in javaScript with lodash or not
date: 2018-11-11 08:41:00
tags: [js,lodash]
layout: post
categories: lodash
id: 3328
updated: 2020-07-02 15:44:35
version: 1.12
---

So when working out a javaScript project it may often be a good idea to chain functions together so that what is returned by one method becomes what another method acts on. In native javaScript this is not so hard, when calling one prototype method of one instance of something, what is returned can also have any of its prototype methods called and so forth. 

However in [lodash](https://lodash.com/) there is the [\_.chain](https://lodash.com/docs/4.17.15#chain) method that can be used to create what are called explicit method chain sequences. In addition there is also as the main \_() function that when called can be used to create implicit method chain sequences that work in a similar fashion to what you may all ready be familiar with when it comes to chaining vanilla js native methods. 

Although this is a lodash post I will be covering chaining with, and without lodash in this post in an effort to cover chaining in general.

<!-- more -->

## 1 - What to know

Chaining methods is useful for taking a whole bunch of different steps and combine them into a single line of code. There is both explicit, and implicit chaining of functions in lodash. In addition there is also the nature of how native javaScript methods chain as well which is similar to implicit chaining as well, but does not behave the same way as implicit chaining in lodash. In any case I will be covering how chaining works in general as I often do that with my posts on lodash.

## 2 - Explicit Chaining with \_.chain

When passing a value to \_.chain the returned result is a wrapped value ready for explicit chaining. Functions that return arrays, collections, functions, and values of any kind can then be chained together. However once done in order to unwrap the chain the \_.value method must be called.

```js
let arr = _.chain([1, 2, 3, 4])
    .map((n) => {
        return Math.pow(2, n);
    })
    .filter((n) => {
        return n % 8 === 0;
    })
    .sum();
 
// we have an wrapped object
// and not a final value
console.log(arr); // { Object }
 
// I must call value() to get what I want
console.log(arr.value()); // 24
```

This type of chaining is not consistent with the kind of chaining that you might be familiar with when deal with plain vanilla javaScript.

## 3 - Implicit Chaining with the main lodash method \_()

Many of the methods in lodash are properties of the \_ variable that is added to the global name space when using lodash. However the \_ variable is a function rather than just a plain old object, and as such it can be called and passed a value. When using the main lodash method in place of \_.chain that is what is called Implicit chaining. It is more is less the same as the explicit chaining only using a method like \_.sum will result in unwrapping the wrapped value, so the \_.value method does not need to be used in such a case.

```js
let arr = _([1, 2, 3, 4])
    .map((n) => {
        return Math.pow(2, n);
    })
    .filter((n) => {
        return n % 8 === 0;
    })
    .sum();

console.log(arr); // 24
```

### 4.1 - Chaining with Native array methods

When working with an native array methods as long as what is returned is also an array then I can continuing calling additional array methods on the array. If I am not using lodash then I am limited to what there is to work with in the Array prototype, as well as the prototypes of other built in classes depending on what is returned. 

For example there is no native equivalent of \_.sum, however it is not to hard to quickly sum an array using the native Array.reduce method.

```js
let arr = [1, 2, 3, 4]
.map((n) => {
    return Math.pow(2, n);
})
.filter((n) => {
    return n % 8 === 0;
})
.reduce((acc, n) => {
    return acc + n
});
 
console.log(arr);
```

5 - Conclusion

So chaining with lodash, is a little more compacted compared with what most of us might be used to with native javaScript where we are always just dealing with unwrapped objects.