---
title: lodash array methods collection methods and more
date: 2019-02-14 16:41:00
tags: [lodash]
layout: post
categories: lodash
id: 381
updated: 2019-08-01 21:10:55
version: 1.16
---

The [lodash](https://lodash.com/) array methods are methods that can be used to preform common tasks with arrays. Many of these methods are baked into core javaScript itself these days, however many are not as well. So in this post I will be going over some of the lodash array methods that stand out for me. These methods are useful in some cases, and they are also as of this writing not part of the core javaScript array prototype.


<!-- more -->

## 1 - lodash array methods

In lodash there are a number of methods that are consisted array methods, rather than object methods and collection methods. In javaScript an array is actually a kind of object, it is just a certain kind of object that is formated in a way in which it is a collection of numbered index and value key pairs, along with a length property that reflects the count of those key value pairs. In addition an array in javaScript has some built in prototype methods that are inherited such as Array.forEach. 

Many of the lodash array methods are now part of the native javaScript prototype, but that is not the case with all of them. In addition many of the lodash equivalents of the core javaScript array prototype methods are collection methods that are designed to work with arrays as well as most objects in general on top of that. So this makes the process of covering lodash array methods a little complicated, as there are just plain old lodash array methods, and then there are collection methods that work with objects in general.

So in this section I will be going just over some array methods in lodash, and briefly cover some of the collection methods as well later in this post.

### 1.1 - The \_.chunk method

The [\_.chunk method](/2017/09/13/lodash-chunk/) is a lodash array method that can be used to break a linear array into an array of arrays of a given length. The need to do this comes up now and then and the chunk method helps to make quick work of this, and allow me to move on with a project rather than writing this usual suspect from scratch.

```js
var _ = require('lodash'),
 
// basic example
arr = ['one', 'two', 'three', 'four', 'five', 'six'];
 
console.log(_.chunk(arr, 2));
// [ [ 'one', 'two' ], [ 'three', 'four' ], [ 'five', 'six' ] ]
```

### 1.2 - The \_.flatten method

So when it comes to doing the opposite of \_.chunk and quickly turning an array of arrays back into a simple linear array there is the [\_.flatten](/2018/08/12/lodash_flatten/) method as well.

```js
let grid = [
   [1,2,3],
   [4,5,6],
   [7,8,9]
];
 
let flat = _.flatten(grid);
 
console.log( flat ); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### 1.3 - The \_.zip method

The [zip method](/2018/02/01/lodash_zip/) takes two or more arrays and zips theme together.

```js
var x = [10,20,30],
y = [8,16,32],
 
matrix = _.zip(x,y,[5,5,5],[3,3,3]);
 
_.each(matrix, function(pt){
 
    console.log(pt);
    // [10,8,5,3]
    // [20,16,5,3]
    // [30,32,5,3]
 
});
```

## 2 - lodash collections methods that also work with arrays, and also collection objects in general

So as I mentioned in the previous section, there are lodash array methods and then there are also lodash collection methods that work with objects in general. In native javaScript there are array prototype methods like Array.map, array.filter, and so forth. These methods in lodash are not just array methods, but collection methods that work with just about any kind of key value pair, not just numbered index keys and values that are an instance of Array.

### 2.1 - Lodash find

The lodash fine collection method can be used to find a single value in an array of values. It can also be used to find an Object in an array of objects also. The lodash find method is useful for fining a single value in an array, but it is not the same thing as sorting, filtering, reducing, or mapping. In some cases I might want to find the top five of something for example, so for that I would want to sort and slice.

```js
var arr = ['a',1,'b','c'];
 
var n = arr.find(function(el){
 
   return typeof el === 'number';
 
});
 
console.log(n); // 1
```

### 2.2 - lodash map method can be used map values to an array

The lodash map method is another method in lodash where the native counterpart Array.map only works with arrays. The lodash map method can map values to an array or any collection object with the value that is returned by the function that it is given.

```js
var arr = [1,2,3,4,5];
arr = _.map(arr, function(el){
    return el * 10;
});
console.log(arr);
// [10,20,30,40,50]
```

### 2.3 - Lodash filter

So there is the lodash filter collection method that can be though of as a kind of lodash equivalent to Array.filter in native javaScript.

```js
// basic example
console.log(
 
    _.filter([4,-1,7,7,-3,-5,1], function(val){
 
        return val > 0;
 
    })
 
); // [4, 7, 7, 1]
```

## 3 - Conclusion

Many of the lodash Array methods help to quickly complete common tasks that are not always in the native javaScript Array prototype object. In addition many of the lodash equivalents to Array prototype methods are not array methods but collection methods such as is the case with methods like \_.map.

If you enjoyed this post you might want to check out my main post on [lodash](/2019/02/15/lodash/) in general.