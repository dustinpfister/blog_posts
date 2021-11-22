---
title: lodash array methods collection methods and more
date: 2019-02-14 16:41:00
tags: [lodash]
layout: post
categories: lodash
id: 381
updated: 2021-11-22 12:00:10
version: 1.30
---

The [lodash](https://lodash.com/) array methods are methods that can be used to preform common tasks with arrays rather than objects in general when it comes to the many collection method that there are to work with. Many of these methods are baked into core javaScript itself these days, however many are not as well, or the lodash methods have a few more features that set it apart from the native counterpart. In some cases the lodash counter part of an array method is not an array method, but a collection method such is the case with the [lodash for each method](/2017/11/20/lodash_foreach) compared to the native [array for each method](/2019/02/16/js-javascript-foreach/).

So in this post I will be going over some of the lodash array methods that stand out for me. These methods are useful in some cases, also some of them have no native counterpart and can often prove to be a little time consuming time cerate or fine a copy and past vanilla javaScript solution for.


<!-- more -->

## 1 - lodash array methods

In lodash there are a number of methods that are consisted array methods, rather than object methods and collection methods. In javaScript an array is [actually a kind of object](/2017/05/12/js-arrays-are-objects/). That is that an array of javaScript is just a certain kind of object that is formated in a way in which it is a collection of numbered index key and value pairs, along with an [array length](/2018/12/14/js-array-length/) property that reflects the max size of the array, but not the count of the array as arrays are sparse in javaScript. In addition an array in javaScript has some built in prototype methods that are inherited such as Array.forEach. 

Many of the lodash array methods are now part of the native javaScript prototype, but that is not the case with all of them. In addition many of the lodash equivalents of the core javaScript array prototype methods are collection methods that are designed to work with arrays as well as most objects in general on top of that. So this makes the process of covering lodash array methods a little complicated, as there are just plain old lodash array methods, and then there are collection methods that work with objects in general.

So in this section I will be going just over some array methods in lodash, and briefly cover some of the collection methods as well later in this post.

### 1.1 - The \_.chunk lodash array method

The [\_.chunk method](/2017/09/13/lodash-chunk/) is a lodash array method that can be used to break a linear array into an array of arrays of a given length. The need to do this comes up now and then and the chunk method helps to make quick work of this, and allow me to move on with a project rather than writing this usual suspect from scratch.

```js
var _ = require('lodash'),
 
// basic example
arr = ['one', 'two', 'three', 'four', 'five', 'six'];
 
console.log(_.chunk(arr, 2));
// [ [ 'one', 'two' ], [ 'three', 'four' ], [ 'five', 'six' ] ]
```

So it goes without saying that this method works well when it comes to working with [multidimensional arrays in javaScript](/2020/03/31/js-array-multidimensional/). That is that it is useful for creating an array of arrays from an array of a single dimension, this method then goes hand in hand with another kind of method that would do the inversion of this that would flatten such an array of arrays back inti a single array.

It would also seem like there is no native javaScript method to do this sort of thing at least in the array prototype it would seem. So if I need to do this sort of thing outside of lodash I might still need a single vanilla javaScript solution for this sort of thing as part of a custom utility library.

### 1.2 - The \_.compact lodash array method

The [lodash \_.compact](/2018/08/09/lodash_compact/) method can be used to quickly remove false values from an array. It is a quick convenience method for using [\_.filter](/2018/05/18/lodash_filter/) to do the same thing. However the filter method would of course give grater flexibility when it comes to defining what the logic is for removing an element from an array or not. Also the lodash filter method has a native javaScript counter part in the array prototype called [array filter](/2020/10/03/js-array-filter/), but one key difference is that lodash filter is a collection object so it will work with objects in general rather than just arrays.

```js
let arr = [null,1,'foo',NaN,false,'bar',undefined,undefined,42];
 
console.log(_.compact(arr)); // [ 1, 'foo', 'bar', 42 ]
```

The compact method as well as the lodash filter, and native array filter methods will all return a new array rather than mutating an array in place.

### 1.3 - The \_.flatten method

So when it comes to doing the opposite of \_.chunk and quickly turning an array of arrays back into a simple linear array there is the [\_.flatten](/2018/08/12/lodash_flatten/) method as well. There are a few other flatten methods in lodash also such as flatten deep and flatten depth both of which have to do with situations that involve many levels, all of which may or many not need to be flatten down also. When it comes to native javaScript there is now an [array flat](/2021/07/15/js-array-flat/) method also, and it would seem like this native method takes a depth argument also.

```js
let grid = [
   [1,2,3],
   [4,5,6],
   [7,8,9]
];
 
let flat = _.flatten(grid);
 
console.log( flat ); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Although this is a useful method there is a decent native solution for this sort of thing in the the array prototype of core javaScript. Also because this is an array method rather than a collection method it does not work with situations involving named rather than numbers key names.

### 1.4 - The \_.zip method

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