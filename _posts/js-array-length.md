---
title: Array length in javaScript
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2018-12-14 22:09:35
version: 1.0
---

The length of an Array in javaScript often refers to the count of elements in the array from zero to the highest index value. So then For the most part the length property in an array is pretty straight forward, however there are a few situations that migtn cause a degree of confusion so a quick post may be called for . The length differs from the size of an array which may refer to the amount of data that an array might take up in memory. 

<!-- more -->


## 2 - Negative index values, and Object keys

```js
var a = ['a','b','c'];
 
a[-1] = '!';
 
a['foo'] = 'bar';
 
console.log(a.length); // 3
console.log(Object.keys(a).length); // 5
```

