---
title: The Array from static method and other ways of creating an array from something else
date: 2020-01-27 17:03:00
tags: [js]
layout: post
categories: js
id: 597
updated: 2020-01-27 17:21:23
version: 1.2
---

If I want to create an array from something other than an array, such as a string, or an object of a constructor other than that of Array there are a number of ways of doing so. There is of course the Array.from static method that will work okay with array like objects, however it will not always work out so great in other situation. 
So in this post I will be looking at the array from static method as well as a number of other options for creating an array from something other than an array in javaScript.

<!-- more -->

## 1 - Array from basic example

The array from static method can be called off of the Array global, and then an array like object can be passed as the first argument. As long as the object is formated like an array it should work okay and what will be returned is an array with all the prototype methods of an array like array map. 

```js
var arr = Array.from({
        0: 2,
        1: 4,
        2: 6,
        length: 3
    });
 
var str = arr.map(function (n) {
        return Math.pow(2, n);
    }).join(';');
 
console.log( str );
// 4;16;64
```

There are some draw backs with this though so lets look at some additional options for creating an array from something other than an array.

## 2 - creating an array from and object of named key value pairs with Object value

The Object value static method will return an array of values for the object that is passed to it. So it is another way of creating an array from an object. What is great about this is that it will create arrays just fine with objects that have named key values without a length property.

```js
// object with named keys
var obj = {
    baz: '3',
    foo: '1',
    bar: '2'
};
 
// array from will result in an emty array
var arr = Array.from(obj);
console.log(arr); // []
 
// Object.values will return an array of values though
arr = Object.values(obj);
console.log(arr); // [3,2,1]
 
// the values will not be sorted though
// some something like array sort can be used
// to sort the array
arr.sort();
console.log(arr); // [1,2,3]
```

## 3 - Other ways to create an array from somthing else

### 3.1 - String split

```js
var str = '1-3-5-7-9';
 
var powStr = str.split('-').map(function (n) {
        return Math.pow(n, 2);
    }).join(';');
 
console.log(powStr);
// 1;9;25;49;81
```

### 3.2 - String match

```js
var str = '1-3-5-7-9';
 
powStr = str.match(/\d/g).map(function (n) {
        return Math.pow(n, 2)
    }).join(';');
 
console.log(powStr);
// 1;9;25;49;81
```