---
title: Array length in javaScript
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2019-04-07 10:11:00
version: 1.17
---

[Array length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) in javaScript often refers to the count of elements in the array from zero to the highest index value. So then For the most part the length property in an array is pretty straight forward, however there are a few situations that might cause a degree of confusion so a quick post may be called for . The length differs from the size of an array which may refer to the amount of data that an array might take up in memory. 

<!-- more -->

## 1 - javaScript array length basics

For the most part array length in javaScript is a fairly simple and straight forward process, all Arrays and Array like objects have a length property. This length property is updated each time one or more elements are added to the array, as well as when they are removed as well when using an array prototype method like Array.pop. However there is a difference between length and what is often called count. More on that later on in this post, but for now lets cover the basics of array length in javaScript.

So the element length of an array can often be obtained by just referencing the length property of an array like so.

```js
var a = [1,2,3];
console.log(a.length); // 3
```

The value that is returned is going to be a number that is typically one larger than the highest index of the array. This is because the array length of an array is one relative while the actual index values are zero relative. For the most part that is all there is to it except for maybe some rare but possible situations in which this is not the case. See the length of an array is not always the length of an array, read on if you want to know why.

## 2 - Setting the length property

It is possible to set the length property of an array. When setting a length that is lower than the current length that will result in what would be expected. Setting a higher length property will result in a situation in which any index values above the previous length will result in being undefined. This might result in unexpected behavior with some array methods like Array.forEach.

```js
var print = function (arr) {
    arr.forEach(function (el, i) {
        console.log(i, ':', el)
    });
    console.log('length: ', arr.length);
    console.log('*****')
};

var a = [1, 2, 3];
print(a);
a.length = 1;
print(a);
a.length = 5;
print(a);
 
/*
0 ':' 1
1 ':' 2
2 ':' 3
length:  3
*****
0 ':' 1
length:  1
*****
0 ':' 1
length:  5
*****
*/
```

## 3 - Array length when making an array from an object

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

## 4 - Just a length property

It is possible to have an array that has a set length, but all of the elements are undefined. This is the case if the array is created from an object that just has a length property. A similar situation can happen if the array is created with the Array constructor syntax and given an argument that will be the length of the array.

```js
var a = Array.from({
        length: 5
    });
 
console.log(a.length); // 5
 
var b = new Array(10);
console.log(b); // 10
```

## 5 - Negative index values

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

## 6 - Ways of getting an actual element count

Say you are dealing with an object that also has some named object keys, and a single index value that is way ahead of the others. As I have covered in the previous section the length property of an array in javaScript is just the highest index value plus one. However there are a number of ways to go about getting the actual count of elements in these situations.

```js
var a = [1,2,3];
a[-1] = 0;
a['foo'] = 'bar';
a[10] = 'baz';
 
// length is just one more that the highest
// index value
console.log(a.length); // 11
 
// get the actual count of elements
console.log(Object.keys(a).length); // 6
console.log(Object.values(a).length); // 6
 
// get a count of all keys, even the length property
console.log(Object.getOwnPropertyNames(a).length); // 7
```

The Object.keys method can be used to get an array of enumerable key names of an object, and the Object.values method can be used to get an array of the corresponding values. Then there is Object.getOwnPropertyNames that can be used to get all of the objects own Property names even ones like length, and any additional key value pairs that are set to be not enumerable.

## 7 - Typed Arrays and length

When working with typed arrays the length property refers to the number of bit sized units the array is. For example if it is a Unit16Array and it has 3 elements the length of it is 3, and the byte length of it is 6.

```js
var a = [255,25,257];
 
var buff = Uint8Array.from(a);
 
console.log(buff); // [255,25,1]
console.log(buff.length); // 3
console.log(buff.byteLength); // 3
 
var buff = Uint16Array.from(a);
 
console.log(buff); // [255,25,257]
console.log(buff.length); // 3
console.log(buff.byteLength); // 6
```

The length of an array generally refers to the number of elements, or the highest index value plus one. It does not always refer to the the size of the array in terms of data.