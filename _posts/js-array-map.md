---
title: JS Array map method examples
date: 2020-06-16 15:24:00
tags: [js]
layout: post
categories: js
id: 667
updated: 2020-06-16 15:34:01
version: 1.2
---

It is a common task in javaScript projects to need to loop over the full contents of an array, and create some sort of product for each element in that array. There are methods like the Array foreach method that can be used to do this sort of thing, along with other features in javaScript such as just doing such things with loops and the array bracket syntax. However there is an array prototype method that each javaScript developer should be aware of called [array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

I have wrote a post a long while back on the [lodash map method](/2018/02/02/lodash_map/) that works more or less the same way as array map only it will work on most objects in general rather than just arrays. That of course is yet another option to be aware of if you are working on a project where lodash is part of the stack. However in this post I will be focusing more so on the native array map prototype method, as well as little tips and tricks that have to do with getting array map to work with objects in general as well as other native javaScriot examples for doing the same thing without array map.

<!-- more -->

## 1 - Array map basic example

```js
var nums = [1, 2, 3];
 
var pows = nums.map(function (n) {
        return Math.pow(2, n);
    });
 
// creates a new array of pows
console.log(pows); // [2,4,8]
// does not mutate the source array
console.log(nums); // [1,2,3]
```