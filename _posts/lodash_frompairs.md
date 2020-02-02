---
title: lodash from pairs method and vanilla javaScript options
date: 2020-02-02 11:14:00
tags: [js,lodash]
layout: post
categories: lodash
id: 603
updated: 2020-02-02 11:29:20
version: 1.2
---

In lodash there is the from pairs array method that can create a new object where each key is the value of the first element of a nested array in an array of arrays, and the value is the second element in that nested array. It is the inversion of the lodash to pairs method that does the opposite of this. Although that might sound like a mouthful if you take a moment to look at some quick code examples you will find that this is not something that is all that hard. In addition this is one of many lodash method where doing the same with plain old vanilla javaScript is pretty quick and easy. So lets look at some code examples for the lodash from pairs method as well as some plain old vanilla javaScript code examples that do the same thing.

<!-- more -->

## 1 - lodash \_.fromPairs method basic example

So lets say you have an array, and each element in that array is another array. In addition each nested array has a first element that you want to be a key value, and a second element that you want to be a value of that key value in a new object. The lodash from pairs method can be used to do just that.

just call the lodash from pairs method and pass the array of arrays to it. The result that is returned will be the object that you want where each key name is the first element of a nested array, and each value is then then second.

```js
let arr = [['x', 1],['y', 2], ['z', 3]];
 
console.log( _.fromPairs(arr) );
// { x: 1, y: 2, z: 3 }
```

Thats it, that is what the lodash from pairs method does. However there is also having a method that does the opposite of this that will create such an array of array from an object. Also it is not so hard to just do this with plain old javaScript in a number of ways, so lets look at some more related coded examples with and without the use of lodash.

## 2 - lodash \_.toPairs to do the opposite

```js
let arr = [['x', 1],['y', 2], ['z', 3]];
 
let obj =  _.fromPairs(arr);
 
console.log(obj);
// { x: 1, y: 2, z: 3 }
 
let arr2 = _.toPairs(obj);
console.log(arr2);
// [['x', 1],['y', 2], ['z', 3]]
```

## 3 - vanilla javaScript alternative with a while loop

```js
var fromPairs = function (arr) {
    let i = 0,
    len = arr.length,
    pair,
    obj = {};
    while (i < len) {
        pair = arr[i];
        obj[pair[0]] = pair[1];
        i += 1;
    }
    return obj;
};
 
let arr = [['x', 1], ['y', 2], ['z', 3]];
 
console.log(fromPairs(arr));
// { x: 1, y: 2, z: 3 }
```