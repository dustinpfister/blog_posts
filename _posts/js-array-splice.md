---
title: The array splice method for removing an injecting elements in an array
date: 2021-07-20 12:33:00
tags: [js]
layout: post
categories: js
id: 914
updated: 2021-07-20 12:45:06
version: 1.4
---

When it comes to writing about javaScript by itself I have not got around o writing a post on the [array splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method yet, which is something that I should have got out of the way a long time ago. The array splice method is often confused with the [array slice](/2018/12/08/js-array-slice/) method, that is some what similar, but they work in very different ways. The array slice method will return a new array from a source array from a given starting and ending index value without mutating the source array from which it is called. The splice method will remove one or more elements from a starting index, and it can also be used to inject elements at that index location while I am at it. Unlike the slice method the splice method will mutate the array in place, but one thing that is similar might be the return value of the splice method as that will be a new array of the elements that are in a given index range.

<!-- more -->


## 1 - The basics of the array splice method

In this section I will just be going over a few quick examples of the js array splice method, and maybe a few other native javaScript features. The goal here is to just get a good grasp on all the features of the array splice method when it comes to removing and injecting elements into an array with the method.

### 1.1 - Just remove some elements from an array

```js
var a = [1, 2, 4, 5];
a.splice(1, 2);
console.log(a); // [1, 5]
```

### 1.2 - The return value

```js
var a = [1, 2, 4, 5];
var b = a.splice(1, 2);
console.log(b);
console.log(a); // [1, 5]
```

### 1.3 - remove and inject

```js
var a = [1, 2, 4, 5];
a.splice(1, 2, 'c', 'd');
console.log(a); // [ 1, 'c', 'd', 5 ]
 
// having an array as an element to inject will result in 
// the array being injected as an element
a.splice(2, 1, ['e, f, g'] );
console.log(a);
// [ 1, 'c', [ 'e, f, g' ], 5 ]
 
// The function apply method and array concat method can be used
// to inject an array of elements as single elements in the array
[].splice.apply(a, [2, 1].concat(['e', 'f', 'g']));
console.log(a);
// [ 1, 'c', 'e', 'f', 'g', 5 ]
```

### 1.4 - Remove zero elements and just inject

```js
var a = [1, 2, 4, 5];
// first augment is an array index location
// second argument is the number of elements I want
// to remove, and the third argument is what I want to inject
a.splice(2, 0, 3);
console.log(a); // [1, 2, 3, 4, 5]
```