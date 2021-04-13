---
title: The Array from static method and other ways of creating an array from something else
date: 2020-01-27 17:03:00
tags: [js]
layout: post
categories: js
id: 597
updated: 2021-04-13 11:04:35
version: 1.10
---

If I want to create an array from something other than an array, such as a string, or an object of a constructor other than that of Array there are a number of ways of doing so. For example when it comes to having a string of a bunch of numbers with each number separated by a comma I can use the String.split prototype method to create an array of substrings where each substring is one of the numbers.

There is of course the [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) static method that will work okay with array like objects, however it will not always work out so great in other situations sometimes. There are of course other options here and there without having to write some sort of method by hand, which I should always go for first an foremost as i hate waisting time making my own methods for simple tasks like this. For example in the string prototype there is the split prototype method that more often then not works great for creating an array from a string.

So in this post I will be looking at the array from static method as well as a number of other options for creating an array from something other than an array in javaScript.

<!-- more -->

## 1 - Array from basic example

The array from static method can be called off of the Array global, and then an array like object can be passed as the first argument. As long as the object is formated like an array it should work okay, and what will be returned is an array with all the prototype methods of an array like the array map method. 

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

### 1.1 - Additional arguments for Array.from

There are two additional arguments that can be passed to the array from method. One of which is a map method that will be called for each element in the new array, and the other is to set the value of the this keyword in the map method.

```js
var obj = {
    0: 2,
    1: 4,
    2: 6,
    length: 3
};
var mapper = function (el, key) {
    return key + '_' + el + '_' + this.x;
};
var arr = Array.from(obj, mapper, {x: 42});
console.log(arr);
// [ '0_2_42', '1_4_42', '2_6_42' ]
```

## 2 - Creating an array from and object of named key value pairs with Object value

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

In this section I will be looking at some additional options for creating an array from an object or string. there are tones of ways of doing so, so this is not at all in any way a complete list. The array from static method was introduced in ES2015 spec javaScript, so if that is an issue and you want to better browser support you will need to polyfill, or use another option. There are many other reasons why one of the options in this section might work out better also, so lets dive in.

### 3.1 - String split

The string split method comes in handy if there is a static separator between each item in a string that i want to become an element in an array.

```js
var str = '1-3-5-7-9';
 
var powStr = str.split('-').map(function (n) {
        return Math.pow(n, 2);
    }).join(';');
 
console.log(powStr);
// 1;9;25;49;81
```

### 3.2 - String match

The string match method is yet another option for creating a new array from a string, assuming that you have some knowledge of how to work with regular expressions.

```js
var str = '1-3-5-7-9';
 
powStr = str.match(/\d/g).map(function (n) {
        return Math.pow(n, 2)
    }).join(';');
 
console.log(powStr);
// 1;9;25;49;81
```

### 3.3 - Object values, and Object keys

So in an above section I covered the Object values static method that can create an array from an object with named key names, but what if I want an array of key names rather than values. This is where the Object keys static method can come into play.

```js
var obj = {
    baz: '3',
    foo: '1',
    bar: '2'
};
 
console.log( Object.keys(obj) );
// ['baz','foo','bar']
 
console.log( Object.values(obj) );
// ['3', '2', '1']
```

## 4 - Conclusion

Well there is the low down on the array from static method, as well as a whole bunch of other options for creating an array from something else in javaScript other than an array. There is much more to cover when it comes to doing this sort of thing though, for example the array from method creates a shallow clone of an array, but what if I want a deep clone?

In any case hopeful you found this post somewhat useful when it comes to creating arrays form other values in javaScript.