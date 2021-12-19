---
title: The lodash _.filter, and Array.filter methods
date: 2018-05-18 10:50:00
tags: [js,lodash]
layout: post
categories: lodash
id: 190
updated: 2021-12-19 10:43:50
version: 1.17
---

Looking over what [I have wrote on lodash](/categories/lodash) so far I am surprised that I forgot to write one on the lodash [filter method](https://lodash.com/docs/4.17.10#filter). The filter method both in lodash and in native javaScript comes in handy often as a way to create a new array from and array with many of the elements that I do not want for one reason of another removed. There are many other methods that are like filter in lodash such as [compact](/2018/08/09/lodash_compact/), but these are often just convenience methods for what can be done with filter. So then the lodash filter method gives a great deal of flexibility when it comes to filtering out unwanted elements from an array.

Sense the time that I first wrote this post I also got around to writing a [post on the native array filter method](/2020/10/03/js-array-filter/) also. The main thing about the lodash filter method compared to array filter is that the lodash method is a collection method which means it will work with objects in general, not just arrays. However it it is not to hard to do the same with native javaScript by just being aware of additional tools to work with when it comes to using just native javaScript by itself. There are also a number of other native array prototype methods and other various other methods and javaScritplanagauge features that can be used to do what the lodash filter method does. So in this post I will not just be writing about the lodash filter method, but also what there is to work with when it comes to javaScript by itself when it comes to various filtering related tasks in javaScript.

<!-- more -->

## 1 - Basic examples of \_.filter in lodash

To use the \_.filter methods the first argument that you give it is a collection, such as an array of numbers. The second argument you give is an iteratee method, that can be your own method, or one of the lodash iteratee methods such as \_.matches, also some of those methods are built in. By collection a given object to the lodash filter method does not have to be an array, it can be any kind of collection object such as an array like object, or just a plain object with named rather than numbered keys. This is one of the main reasons why people like to use lodash over native methods as many of these methods do work a little different from native counterparts such as the array filter method that will just work with arrays, at least by itself anyway.

In this section I will be starting out with a few basic examples of the lodash filter method, and leave other topics such as vanilla javaScript alternatives to lodash filter for a later section in this post.

### 1.1 - basic example of lodash filter with an array of numbers

So for a basic example one might have a simple little demo in which I have an array of numbers that are negative and positive. For this example then I use \_.filter to create a new array that is only the positive numbers in that array that are greater than that of zero. So then I just need to call the lodash filter method, pass the array of numbers are the first argument and then the function that I want to call for each element in this array. Inside the body of the function that I give to lodash filter I will [want to return](/2019/03/01/js-javascript-return/) a [Boolean value](/2018/11/28/js-booleans/) that is typically the result of some kind of expression, in this case the result of an expression that will be true of a current value is greater than zero.


```js
// basic example using an array of numbers
let a = [4, -1, 7, 7, -3, -5, 1];
let b = _.filter(a, function(val){
    return val > 0;
});
console.log( b ); // [4, 7, 7, 1]
```

### 1.2 - Array like objects and lodash filter

Another kind of collection object that I will run into often is an array like object. What I mean by this is that I am dealing with an object that is formated like that of an array in the sense that it is a collection of key value pairs where each key is a numbed rather than named key, and there is a length property of the object that defines the max size of this collection in terms of elements.

```js
// basic example using an array of numbers
let a = {
    0: 2, 1: -7, 2: 0, 3: 40,
    length: 4
};
let b = _.filter(a, function(val){
    return val > 0;
});
console.log( b ); // [2, 40]
```

### 1.3 - Objects with named keys and lodash filter

```js
var obj = {
    foo: 'bar',
    bool: false,
    n: 42,
    c: 7
};
// using lodash filter with a plain object with named keys
var numbers = _.filter(obj, function (val, key, obj) {
    return typeof val === 'number';
});
console.log(numbers); // [42,7];
```

## 2 - Vanilla javaScript alternatives to lodash filter

The vanilla js Array.filter method can be used in a similar fashion, without the need for lodash. When it comes to something simple, that can work just fine. Also the browser support for Array.filter is pretty good these days, it's only real old versions of IE that come to mind that present a concern if there is actually a far amount of visitors that still use those platforms. Also if in a node.js environment there is no need for lodash at all if this just happens to be the only method that you are using. 

Yet again maybe not, like many of these methods in lodash there are a few things to them that set them apart. So maybe one can rationalize the use of \_.filter these days even when we often have the native alternative to play with in javaScript itself.

### 2.1 - Array filter with an array


```js
let a = [4, -1, 7, 7, -3, -5, 1];

let b = a.filter(function(val){
    return val > 0;
});
console.log( b ); // [4, 7, 7, 1]
```

### 2.2 - Array filter with an array like object using the call function prototype method

```js
// The function call method can be used to get array filter
// to work with an array like object
let a = {
    0 : 'foo',
    1: 'man',
    2: 7,
    length: 3
};
var numbers = [].filter.call(a, function(val, key, obj){
    return typeof val === 'number';
});
console.log(numbers); // [7]
```

### 2.3 - Using array filter with an object composed of named keys

```js
var a = {
    foo: 'bar',
    bool: false,
    n: 42,
    c: 7
};
// Vanilla js Array.filter will not just work on any object
// at least not by itself
var b = [].filter.call(a, function(val,key,obj){
    return typeof val === 'number';
});
console.log(b); // [];
// However an array of values can be created using something like
// The Object.values method, and then I can just call array filter
// off of that
let c = Object.values(a).filter(function(val,key,obj){
    return typeof val === 'number';
});
console.log(c); // [42, 7]
```

## 4 - Conclusion

It has been a few months sense the last time I wrote a post on [lodash](https://lodash.com/), as I have been trying to find other great things in the javaScript word to write about such as [phaser](/categories/phaser/), and [three.js](/categories/three-js/). However lodash is very popular, and content on it is very much in demand, so maybe I should get back into it for a while, make some new posts, and improve some old ones.
