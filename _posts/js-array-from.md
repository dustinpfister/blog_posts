---
title: The Array from static method and other ways of creating an array from something else
date: 2020-01-27 17:03:00
tags: [js]
layout: post
categories: js
id: 597
updated: 2021-04-13 11:27:03
version: 1.17
---

If I want to create an array from something other than an array, such as a string, or an object of a constructor other than that of Array there are a number of ways of doing so. For example when it comes to having a string of a bunch of numbers with each number separated by a comma I can use the String.split prototype method to create an array of substrings where each substring is one of the numbers. However in this post I am mainly going to be writing about the [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) static method that will work okay with array like objects, however it will not always work out so great in other situations sometimes. 

The array from method might work okay with array like objects, but even then it might not always work out the way I want it to deeding on what I am trying to do. For example when it comes to [making a copy of an array](/2020/09/03/js-array-copy/), the array from method might work okay when it comes to making a shallow copy of an array, but not a deep one.

There are of course other options here and there without having to write some sort of method by hand, which I should always go for first an foremost as I hate waisting time making my own methods for simple tasks like this. So in this post I will be looking at the array from static method as well as a number of other options for creating an array from something other than an array in javaScript.

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

So then that is it when it comes to array from however there are some draw backs with this though. For example if the aim is to use the array from method to make a copy of an array this method will only preform a shallow copy of it. Another draw back is that this method will only work with arrays, array like objects, and iterable objects, so it will not work with strings. So lets look at some additional options for creating an array from something other than an array.

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

Both plain old objects and arrays are objects in javaScript, typically the problem is that I am dealing with a situation in which an object is a collection of named public keys rather than numbered ones, and the object is not an instance of an Array. So this Object.values method is one way to take an object that is not an array and create and return an array where each element is a value of the object that I passed it. This proves to be a bot more flexible compared to array from, because I do not need to have a length property set to the object that I pass it. For this reason alone I find myself using this method more often than not compared to array from actually, in fact I would say that I am always using it over array from so I thought I would mention it here.

## 3 - Other ways to create an array from something else

In this section I will be looking at some additional options for creating an array from an object or string. there are tones of ways of doing so, so this is not at all in any way a complete list. The array from static method was introduced in ES2015 spec javaScript, so if that is an issue and you want to better browser support you will need to polyfill, or use another option. There are many other reasons why one of the options in this section might work out better also, so lets dive in.

### 3.1 - String split

The string split method comes in handy if there is a static separator between each item in a string that I want to become an element in an array. To use this method I just call the split string prototype method off of the string, and then pass what the separator is for each element as the first and only argument for the string split method. The returned result is then an array with each value as an element in the resulting array, however there might be just one thing to be aware of after that which is that they will all be string values. This can easily resolved though by just doing something to make sure the desired type is returned by running over the elements with the array map method for example.

```js
var str = '1-3-5-7-9';
 
var powStr = str.split('-').map(function (n) {
        return Math.pow(n, 2);
    }).join(';');
 
console.log(powStr);
// 1;9;25;49;81
```

### 3.2 - String match

The string match method is yet another option for creating a new array from a string, assuming that you have some knowledge of how to work with regular expressions. If not then they are with out question a topic to get into at some point sooner or later as they are a great way to preform all kinds of complex pattern matching tasks that might come up now and then.

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