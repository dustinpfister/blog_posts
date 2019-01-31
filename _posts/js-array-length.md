---
title: javaScript Array length
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2019-01-31 13:09:31
version: 1.5
---

[Array length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) in javaScript often refers to the count of elements in the array from zero to the highest index value. So then For the most part the length property in an array is pretty straight forward, however there are a few situations that might cause a degree of confusion so a quick post may be called for . The length differs from the size of an array which may refer to the amount of data that an array might take up in memory. 

<!-- more -->

## 1 - javaScript Array length the basics

So in javaScript Arrays are often a find of Object that is created with the Array constructor, or more often the Array literal context. The way that arrays or array like objects are structured is one or more numbered key names with a corresponding length property that is often the element count of this kind of object.

```js
var a = [1,2,3];
console.log(a.length); // 3
 
var a = Array.from({
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    });
 
console.log(a.length); // 3
```

So for the most part that is all there is to know about array length, however things can get a little confusing when it comes to thinks like negative index values, additional enumerable key values, and undefined index values. 

## 2 - Negative index values

It is possible to set negative index values for an array. When doing so this might result in unexpected length values as negative index values will not be counted. However as long as the index values are enumerable the Object.keys method can be used to get an array of enumerable keys for an object, including possible the negative index values.

```js
var a = ['a','b','c'];
 
a[-1] = '!';
 
console.log(a.length); // 3
console.log(Object.keys(a).length); // 4
```

