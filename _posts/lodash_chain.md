---
title: Chaining functions in javaScript with lodash or not
date: 2018-11-11 08:41:00
tags: [lodash]
layout: post
categories: lodash
id: 328
updated: 2021-12-31 09:18:23
version: 1.22
---

So when working out a javaScript project it may often be a good idea to [chain functions together](https://stackoverflow.com/questions/35590543/how-do-you-chain-functions-using-lodash) so that what is returned by one method becomes an argument value for another, and so on until some kind of desired end result is obtained. 

In native javaScript this is not so hard, when calling one prototype method of one instance of something, what is returned can also have any of its prototype methods called and so forth. 

In [lodash](https://lodash.com/) there is the [\_.chain](https://lodash.com/docs/4.17.15#chain) method that can be used to create what are called explicit method chain sequences. In addition there is also the main function of lodash, that when called can be used to create implicit method chain sequences that work in a similar fashion to what you may all ready be familiar with when it comes to chaining vanilla js native methods. There is yet even another option that can be deployed as a way to create a chain of sorts that is the [lodash flow method](/2018/11/19/lodash_flow/) that works by passing an array of functions to use. It may be [best actually to use a function such as flow](https://medium.com/bootstart/why-using-chain-is-a-mistake-9bc1f80d51ba) over that of the lodash chain method for various reasons that one will get into when making custom lodash builds.

Although this is a lodash post I will be covering chaining with, and without lodash in this post in an effort to cover chaining in general.

<!-- more -->

## 1 - lodash chain basics, and what to know  first

Chaining methods is useful for taking a whole bunch of different steps and combine them into a single line of code that returns a single final result. In lodash there is both explicit, and implicit chaining of functions rather than just what you might be ware of when it comes to native javaScript by itself. With that said in addition there is also the nature of how native javaScript methods chain as well which is similar to implicit chaining, but does not behave the same way as implicit chaining in lodash actually. In any case I will be covering how chaining works in general as I often do that with my posts on lodash.

### 1.1 - Explicit Chaining with \_.chain

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

### 1.2 - Implicit Chaining with the main lodash method \_()

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

## 2 - Chaining with Native array methods

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

## 3 - Conclusion

So chaining with lodash, is a little more complicated compared with what most of us might be used to with native javaScript where we are always just dealing with something that would be like unwrapped objects only in lodash speak. That is that calling a native javaScript prototype method will return some kind of value that in turn is of a given constructor function to which there are then prototype methods that can be called off of that value and so forth.



