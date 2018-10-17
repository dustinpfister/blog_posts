---
title: Reversing an Array in javaScript with lodash _.reverse, and alternatives
date: 2018-10-17 12:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 306
updated: 2018-10-17 12:45:06
version: 1.2
---

For todays [lodash](https://lodash.com/) post I have come around to taking a moment to write a quick post about \_.reverse. Lodash is a great project, but many of the methods are pretty much just reverences to native methods, and \_.reverse is an example of one of these. Also the native array method on which \_.reverse is based has excellent backward compatibility, as the method will work on browsers as old as IE 5.5. So then \_.reverse is not one of those lodash methods that help support a case that lodash acts as a safety net of sorts when it comes to the question of supporting older browsers. Never the less in this post I will be writing about \_.reverse and the native Array.reverse methods as a means to reverse the order of an array in javaScript, and also cover some related topics as well.

<!-- more -->

## 1 - What to know

This is a post on the \_.reverse method in lodash that can be used to reverse the order of an array in javaScript, as well as other related topics. This is not a getting started post with lodash, or javaScript in general, and I assume that you have at least some background with these topics.

## 2 - Basic example of \_.reverse and Array.reverse

```js
let arr = [1,2,3,4];
let arr2 = _.reverse(arr);

console.log(arr); // [ 4, 3, 2, 1 ]
console.log(arr2); // [ 4, 3, 2, 1 ]
```

```js
let arr = [1,2,3,4];
 
let arr2 = arr.reverse();
 
console.log(arr); // [ 4, 3, 2, 1 ]
console.log(arr2); // [ 4, 3, 2, 1 ]
```

## 3 - Using _.clone to clone the array before reversing

```js
let arr = [1,2,3,4];
let arr2 = _.reverse(_.clone(arr));
 
console.log(arr); // [ 1, 2, 3, 4 ]
console.log(arr2); // [ 4, 3, 2, 1 ]
```

## 4 - Making a reverse method

```js
let reverse = function (arr) {
    let newArr = [],
    i = arr.length;
    while (i--) {
        newArr.push(arr[i]);
    }
    return newArr;
};
 
console.log(reverse([1,2,3,4])); // [4,3,2,1]
```

## 5 - Conclusion
