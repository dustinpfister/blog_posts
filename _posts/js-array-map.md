---
title: JS Array map method examples
date: 2020-06-16 15:24:00
tags: [js]
layout: post
categories: js
id: 667
updated: 2020-06-17 09:43:48
version: 1.3
---

It is a common task in javaScript projects to need to loop over the full contents of an array, and create some sort of product for each element in that array. There are methods like the Array foreach method that can be used to do this sort of thing, along with other features in javaScript such as just doing such things with loops and the array bracket syntax. However there is an array prototype method that each javaScript developer should be aware of called [array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

I have wrote a post a long while back on the [lodash map method](/2018/02/02/lodash_map/) that works more or less the same way as array map only it will work on most objects in general rather than just arrays. That of course is yet another option to be aware of if you are working on a project where lodash is part of the stack. However in this post I will be focusing more so on the native array map prototype method, as well as little tips and tricks that have to do with getting array map to work with objects in general as well as other native javaScriot examples for doing the same thing without array map.

<!-- more -->

## 1 - Array map basic example

The basic idea of the array map method is to call the map prototype method off of an instance of an array, and then pass a function as the first argument to the method. This method that is passed to array map will then be used to return a new value for every element in the array that it was called off of. The value for each element is passed as an argument for the method that is passed when calling array map, so the current value for each element can be used in the expressions and statements that are used to furnish a new value for each element in the array. Also it is important to note that it is indeed a new array that is returned, and the array that array map is called off of is not mutated in place. Many array prototype methods will mutate in place such as array sort, but this is not the case with array map, and certain other array prototype methods.

If you are still a little confused then maybe it would be best to just start working out a few simple examples. One good starting point would be just having a simple array of number primitives and then use array map to create a new array of powers using the numbers in the array as exponent value for the Math pow method.

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