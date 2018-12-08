---
title: Array Slice in javaScript and related topics
date: 2018-12-08 11:17:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 346
updated: 2018-12-08 11:53:09
version: 1.2
---

In [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) the Array.slice prototype method comes up a whole lot in many code examples. It works in a very similar fashion to that of Array.splice but with one very important difference, it returns a new Array rather than manipulating the existing one that it is used with. So for todays post on javaScript I will be covering some simple examples of Array.slice, as well as some related topics.

<!-- more -->


## 1 - Array Slice basic examples

For starters lets look at a very basic example of Array.Slice. So when working with an instance javaScript Array the Array.slice prototype method can be used by calling the method off the Array instance, and passing a starting and ending index.

```js
let a1 = [1,2,3,4],
a2 = a1.slice(1,3);
 
// a2 is a new array
// with the starting and ending index values
// from the a1 array
console.log(a2); // [2,3]
 
// and a1 remains unchanged
console.log(a1) // [1,2,3,4]
```

The index values are zero relative, and the elements that will end up in the new array will be from the starting index, and up to but not including the ending index.

### 1.2 - Getting the last element of an array

Negative index values can be given to Array.slice this results in the corresponding index value from the end of the length of an array.

```js
var a1 = [1,2,3,4],
last = a1.slice(-1)[0];
 
console.log(last); // 4
```