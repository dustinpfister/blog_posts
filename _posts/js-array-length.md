---
title: javaScript Array length
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2019-02-10 16:03:58
version: 1.9
---

[Array length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) in javaScript often refers to the count of elements in the array from zero to the highest index value. So then For the most part the length property in an array is pretty straight forward, however there are a few situations that might cause a degree of confusion so a quick post may be called for . The length differs from the size of an array which may refer to the amount of data that an array might take up in memory. 

<!-- more -->

## 1 - javaScript array length basics

So the element length of an array can always be obtained by just referencing the length property of an array like so.

```js
var a = [1,2,3];
console.log(a.length); // 3
```

The value that is returned is going to be a number that is typically one larger than the highest index of the array. This is because the array length of an array is one relative while the actual index values are zero relative. For the most part that is all there is to it except for maybe some rare but possible situations in which this is not the case.


## 2 - Array length when making an array from an object

So in javaScript Arrays are created with the Array constructor, or more often the Array literal syntax. The way that arrays or array like objects are structured is one or more numbered key value pares with a corresponding length property that is often the element count of this kind of object.

In other words something like this:

```js
var a = Array.from({
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    });
 
console.log(a.length); // 3
```

Understanding this can help eliminate confusion with some situations in which the length of an array is in fact really not the length of the array. In this section I will cover some more examples like this to help elaborate more with this.

### 2.1 - Just a length property

It is possible to have an array that has a set length, but all of the elements are undefined. This is the case if the array is created from an object that just has a length property. A similar situation can happen if the array is created with the Array constructor syntax and given an argument that will be the length of the array.

```js
var a = Array.from({
        length: 5
    });
 
console.log(a.length); // 5
 
var b = new Array(10);
console.log(b); // 10
```

## 2.2 - Negative index values

It is possible to set negative index values for an array. When doing so this might result in unexpected length values as negative index values will not be counted. 
```js
var a = Array.from({
        0: 2,
        1: 3,
        2: 4,
        length: 3
    });
a[-1] = 1;
 
console.log(a.length); // 3
 
var b = ['a', 'b', 'c'];
 
b[-1] = '!';
 
console.log(b.length); // 3
console.log(Object.keys(b).length); // 4
```

However as long as the index values are enumerable the Object.keys method can be used to get an array of enumerable keys for an object, including possible negative index values. Which would be one way to get the true index value if these negative index values are to be counted.
