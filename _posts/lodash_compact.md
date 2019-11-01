---
title: Removing false values from an array with lodash _.compact and native javaScript.
date: 2018-08-09 13:41:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 254
updated: 2019-11-01 18:39:29
version: 1.12
---

For today I will be writing another one of my quick little posts on [lodash](https://lodash.com/), just for the hell of it. My approach with lodash is that when I write a post on a certain lodash method, I am not just writing about lodash, but a certain way to preform a certain task often involving arrays, or array like objects. So under that light I think it is a good idea to write some content on the topic. Anyway todays post will center around the [\_.compact](https://lodash.com/docs/4.17.10#compact) method that can be used to quickly remove false values away from an array. Covering the method by itself is not that involved, but it can branch off into some additional topics when it comes to doing the same with just plain old vanilla js.

<!-- more -->

## 1 - What to know

This is a post centered around the \_.compact method in lodash, a popular javaScript utility library that is packed with useful methods that help with common tasks when working with objects, arrays, functions and so forth in a jaavScript project. It is not a getting started post on lodash, or javaScript in general as that is outside the scope of this post. The \_.compact method can be used to remove elements fro an array that evaluate as false, there are many other ways to do this with lodash, as well as javaScript by itself.

## 2 - Basic example of removing false values from an array

For a basic example of this say we just have a simple array with some values in it. Some of these values will evaluate to false if you where to convert them to boolean, others will not. Say you want to just remove all the values that will evaluate to false, and keep the ones that do not. there are many ways to go about doing this, but if lodash is part of your projects stack the \_.compact method can be used to make quick work of this. There are of course other methods in lodash, and doing so with plain old vanilla js is not big deal as well, so lets take a look at some examples.

### 2.1 - Using lodash \_.compact

So of course lets start of with using lodash \_.compact method first, doing so is stupid simple just call the method passing the array that you want false values removed, and the desired array will be returned.

```js
let arr = [null,1,'foo',NaN,false,'bar',undefined,undefined,42];
 
console.log(_.compact(arr)); // [ 1, 'foo', 'bar', 42 ]
```

So then it is a very simple method to just go about moving false methods from and array. However sometimes what should count as false, or just simply what should not be part of an array might differ from time to time depending on the situation. SO with that said lets take a look as some other ways of how to go abut compacting an array down with lodash and native javaScript.

### 2.2 - Using Array.forEach

It is not to hard to make a vanilla js solution using Array.forEach, and drop the use of lodash for this kind of task. It is true that all we are doing here is that we are looping over the contents of an array, and applying a condition for each element, if that condition is true, the element is then pushed to a new array.

```js
var arr = [null, 1, 'foo', NaN, false, 'bar', undefined, undefined, 42];

var compact = function (a) {
    var n = [];
    a.forEach(function (el) {
        if (!!el) {n.push(el)}
    });
    return n;
};
 
console.log( compact(arr) ); // [ 1, 'foo', 'bar', 42 ]
```

So the basic idea of compacting an array can be done in a wide range of different ways, event when it comes to just using native javaScript and being done with it.

### 2.3 - Using Array.splice

If I use Array.splice is another option when it comes to writing my own compact method with plain old native javaScript, the method also mutates the array in place, which in some cases might not be desired as it violates the rules of functional programing.

```js
var compact = function (a) {
    var i = a.length;
    while (i--) {
        if (!a[i]) {
            a.splice(i, 1);
        }
    }
    return a;
};
 
console.log(compact(arr)); // [ 1, 'foo', 'bar', 42 ]
console.log(arr); // [ 1, 'foo', 'bar', 42 ]
```

However it is yet another option when it comes to removing false values from an array in javaScript.
