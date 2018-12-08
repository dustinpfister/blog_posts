---
title: Array Slice in javaScript and related topics
date: 2018-12-08 11:17:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 346
updated: 2018-12-08 11:31:22
version: 1.0
---

In [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) the Array.slice prototype method comes up a whole lot in many code examples. It works in a very similar fashion to that of Array.splice but with one very important difference, it returns a new Array rather than manipulating the existing one that it is used with. So for todays post on javaScript I will be covering some simple examples of Array.slice, as well as some related topics.

<!-- more -->


## 1 - Array Slice basic examples

```js
var a1 = [1,2,3,4],
a2 = a1.slice(1,3);
 
// a2 is a new array
// with the starting and ending index values
// from the a1 array
console.log(a2); // [2,3]
 
// and a1 remains unchanged
console.log(a1) // [1,2,3,4]
```