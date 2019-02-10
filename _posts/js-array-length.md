---
title: javaScript Array length
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2019-02-10 15:46:12
version: 1.6
---

[Array length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) in javaScript often refers to the count of elements in the array from zero to the highest index value. So then For the most part the length property in an array is pretty straight forward, however there are a few situations that might cause a degree of confusion so a quick post may be called for . The length differs from the size of an array which may refer to the amount of data that an array might take up in memory. 

<!-- more -->

## 1 - javaScript array length basics

So the element length of an array can always be obtained by just referencing the length property of an array like so.

```js
var a = [1,2,3];
console.log(a.length); // 3
```

The value that is returned is going to be a number that is typically one larger than the highest index of the array. This is because the array length of an array is one relative while the actual index values are zero relative. For the most part that is all there is to it except for maybe some rare but possible situations in which this is not the case.


## 2 - Array length When making an array from an object

So in javaScript Arrays are often a find of Object that is created with the Array constructor, or more often the Array literal context. The way that arrays or array like objects are structured is one or more numbered key names with a corresponding length property that is often the element count of this kind of object.

```js
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

It is possible to set negative index values for an array. When doing so this might result in unexpected length values as negative index values will not be counted. However as long as the index values are enumerable the Object.keys method can be used to get an array of enumerable keys for an object, including possible negative index values.

```js
var a = ['a','b','c'];
 
a[-1] = '!';
 
console.log(a.length); // 3
console.log(Object.keys(a).length); // 4
```

