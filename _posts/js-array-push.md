---
title: JS Array push and other ways of adding elements to an array
date: 2020-06-17 17:33:00
tags: [js]
layout: post
categories: js
id: 668
updated: 2020-06-17 16:55:39
version: 1.3
---

So in javaScript there is the [array push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) prototype method that is typically what is used as a way to push elements to the end of an array. There are many other ways of going about adding elements to an array also though, so I thought I would write a quick post on this when it comes to the basics of adding elements to an array in javaScript.

<!-- more -->

## 1 - The array push method

So the array push method will add a new element to the end of the array to which it is called off of, and it will also return the length of the new array. So if I just create a new array with say the array bracket syntax, I can then  just call push off of that array instance and pass a new element value that is to be added to the end of the array.

```js
var arr = [16, 32];
arr.push(64)
 
console.log(arr.join('-')); // '16-32-64'
```

### 1.2 - Push many at once

```js
var arr = [16, 32];
arr.push(64, 128, 256)
 
console.log(arr.join('-')); // '16-32-64-128-256'
```

### 1.3 - Returns the length of the array

```js
var arr = [],
obj;
while (arr.push({}) < 10) {
    obj = arr[arr.length - 1];
    obj.n = 0;
}
arr.pop();
 
console.log(arr);
```
