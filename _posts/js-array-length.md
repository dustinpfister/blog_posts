---
title: Array length in javaScript
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2018-12-14 22:14:44
version: 1.1
---

Array length in javaScript often refers to the count of elements in the array from zero to the highest index value. So then For the most part the length property in an array is pretty straight forward, however there are a few situations that might cause a degree of confusion so a quick post may be called for . The length differs from the size of an array which may refer to the amount of data that an array might take up in memory. 

<!-- more -->

## 1 - The basics of Array length in javaScript

So in javaScript Arrays are often a find of Object that is created with the Array constructor, or more often the Array literal context. The way that arrays or array like objects are structured is one or more numbered key names with a corresponding length property that is often the element count of this kind of object.

```js
var a = [1,2,3];
console.log(a.length); // 3
```

## 2 - Negative index values, and Object keys

```js
var a = ['a','b','c'];
 
a[-1] = '!';
 
a['foo'] = 'bar';
 
console.log(a.length); // 3
console.log(Object.keys(a).length); // 5
```

