---
title: The lodash _.filter, and Array.filter methods
date: 2018-05-18 10:50:00
tags: [js,lodash]
layout: post
categories: lodash
id: 190
updated: 2021-12-19 11:19:53
version: 1.30
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

Another kind of collection object that I will run into often is an array like object. What I mean by this is that I am dealing with an object that is formated like that of an array in the sense that it is a collection of key value pairs where each key is a numbed rather than named key, and there is a length property of the object that defines the max size of this collection in terms of elements. However one major difference between one of these array like objects and an array is that it is not an object that is an instance of the built in array class, therefor I can not just use an array prototype method off of such an object. However with the lodash filter method I can just pass this kind of object and I will get the same result as it it where an array.

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

So then the lodash filter method will work out of the box with arrays, and array like objects. However it will also work with the public keys of any object actually. This includes objects that are collections that are composed of named keys rather than numbered ones, and that do not have a length property.

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

So then this is what the deal is with collection methods in lodash, they will not just work with arrays, but any kind of collection object. However it is not always so hard to get array prototype methods to work with objects in general when one knows about various tools to work with in core javaScript.

## 2 - Vanilla javaScript alternatives to lodash filter

The vanilla js [Array.filter method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) can be used in a similar fashion, without the need for lodash, at least it can when dealing with just arrays. When it comes to getting the array filter method to work with collection objects in general, doing so is to that hard if you are familial with the various tools in the toolbox that is native core javaScript. 

The browser support for Array filter is pretty good these days, it's only real old versions of IE that come to mind that present a concern if there is actually a fair amount of visitors that still use those platforms. Also if in a node.js environment there is no need for lodash at all if this just happens to be the only method that you are using as the same can be done with just a little vanilla javaScript code. Also even when it comes to supporting old clients it is often not just something that is done by just using lodash and being done with it. Even then it comes to the safely net aspect of lodash browser support only goes back so far.

In any case in this section I will be going over a number of core javaScript score code examples that have to do with filtering collections using just native javaScript features. Of course this includes the array filter method, but there are other array prototype methods to work with as well when it comes to filtering related tasks. When it comes to getting an array prototype method like the array filter method to work with collections in general there are other javaScript features that I will also be touching base on in this section.

### 2.1 - Array filter with an array

Here I have a basic example of suing the array filter method with just a plain old javaScript array. When it comes to the simple array of numbers example that I started by basic section off for example the same can be done by just calling the filter method off of the instance of an array, and then pass the same function as before.

```js
let a = [4, -1, 7, 7, -3, -5, 1];

let b = a.filter(function(val){
    return val > 0;
});
console.log( b ); // [4, 7, 7, 1]
```

### 2.2 - Array filter with an array like object using the call function prototype method

When it comes to getting the array filter method to work with an array like object the [function prototype methods](/2017/09/21/js-call-apply-and-bind/) are one way to go about doing so. These function prototype methods can be used to redefine what the value of the [this keyword](/2017/04/14/js-this-keyword/) is inside the body of a class prototype method, including built in prototype methods such as the array filter method of the array prototype.

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

When it comes to working with a collection that is composed with named keys there are static methods like [Object.keys and Object.values](/2018/12/15/js-object-keys/) that can be used to create an array of public key names or values of any object. The object keys method will return an array of key names, and the object values method will return an array of values from a given source object. The filter method can then be called off of one of these arrays that are the return values of the Object values, or Object keys methods as it is an instance of an array.

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

It has been a few months sense the last time I wrote a post on [lodash](https://lodash.com/), as I have been trying to find other great things in the javaScript word to write about such as [phaser](/categories/phaser/), and [three.js](/categories/three-js/) which are other great frameworks and libraries to work with when it comes to various javaScript projects. 

However lodash is still very popular, and content on it is very much in demand, so maybe I should get back into it for a while, make some new posts, and improve some old ones while in the process of doing so. There is a great deal more to write bout when it comes to the various lodash methods, and also of course how they compare to when there is to work with when it comes to doing the same things from the ground up using javaScript alone. If you enjoyed this post there is checking out my [main post that I have wrote on lodash](/2019/02/15/lodash) in general, as well as maybe one of my [many other lodash posts](/categories/lodash/) that I have wrote over the years. When it comes to additional posts that I have wrote on various lodash methods that are similar to that of the lodash filter method, my posts on the [lodash remove](/2017/09/19/lodash_remove) method, and [lodash compact](/2018/08/09/lodash_compact/) method come to mind first and foremost.

