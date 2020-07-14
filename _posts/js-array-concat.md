---
title: The array concat method and some other ways of adding two arrays together
date: 2020-07-13 14:11:00
tags: [js]
layout: post
categories: js
id: 681
updated: 2020-07-14 12:37:45
version: 1.5
---

So there is adding two strings or numbers together with the addition operator in javaScript, but then there is adding two or more objects together including arrays. In the array prototype object there is the [array concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method that can be used to create a new array that is the concatenation of two or more arrays, or values. This is then one way to go about adding two or more arrays together. There are then also ways of going about doing the same thing, such as converting and array to a string and then back again using something like the string split method. So lets look at some examples of array concatenation with the array concat method, as well as other ways to go about getting a similar effect.

<!-- more -->

## 1 - basic array concat example

So the basic idea of the concat method is that I just call it off of an instance of a javaScript array, and then pass one or more arrays that I want to concatenate with the array that I call the method off of. A new array will be returned by the array concat method, and none of the source arrays including the array that the method is called off of will be mutated.

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = a.concat(b);
 
console.log(a, b, c);
// [ 1, 2, 3 ] [ 4, 5, 6 ] [ 1, 2, 3, 4, 5, 6 ]
```

## 2 - Can pass arrays, and just values as arguments

SO the array concat method can be used to concatenate two or more arrays, but values can also be added via arguments also. So then this concat method also works as an alternative to the array push method then also.

```js
var a = [1, 2, 3],
b = a.concat(4, 5, '6', null, false, {}, [7, 8], [9, 10, 11], [12]);
 
console.log(b);
// [ 1, 2, 3, 4, 5, '6', null, false, {}, 7, 8, 9, 10, 11, 12 ]
```

## 3 - Using array like objects and array concat

So with many array prototype methods it is possible to use the Function call prototype method to get an array method to work with array like objects. However when using the array concat method on an array like object with function call I end up getting a result that might not end up being expected. So when working with array like objects, it might be better to use the array from static method to convert an array like object to an array, and then use concat off of the resulting array.

```js
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
 
var a = Array.prototype.concat.call(obj, 4, 5, [6, 7]),
b = Array.from(obj).concat(4, 5, [6, 7]);
 
console.log(a);
// [ { '0': 1, '1': 2, '2': 3, length: 3 }, 4, 5, 6, 7 ]
console.log(b);
// [ 1, 2, 3, 4, 5, 6, 7 ]
```

## 4 - The addition operator, strings, and the string split method

So one might think that the addition operator can just be used to add to arrays together. The funny thing about it is that in some cases you actually can if we are talking about an array of primitive values at least maybe. When adding two arrays together by default the value of methods will return a string value of the array. So by adding a comma between the two arrays you might end up with a formatted string that can then be split back into an array.

In other words something like this:

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = a + b;
 
console.log(c, c.constructor.name);
// 1,2,34,5,6 String
 
var d = String(a + ',' + b).split(',');
console.log(d, d.constructor.name);
// [ '1', '2', '3', '4', '5', '6' ] 'Array'
```

I can not recommend that doing this is a good practice, but in some cases it seems to work okay, so I guess it is worth writing about at least. It is also worth mentioning the nature of valueOf and ToString methods of objects, and why they come in handy in some situations. When working with the addition of objects a toString method defines logic that will be used to create a string primitive value of the object, and the valueOf method can be used to define what a number primitive value is for the object. However maybe getting into the depth of that is a matter for other blog posts.

## 5 - using array.push and Function.apply to concatenate arrays

Another way to concatenate arrays would be to use the array push method with the apply function prototype method. the thing about the push method is that it can be used to add one or more elements to an array, but only by way of one element at a time, or more than one but by way of two or more arguments when calling array push. So the apply function method can be called off of the push method, and the array that you to concatenate to can be passed as the first argument followed by the other array that you want at the end of the one given the first argument to apply.

```js
var a = [1, 2, 3],
b = [4, 5, 6],
c = [];
 
[].push.apply(c, a);
[].push.apply(c, b);
 
console.log(a);
// [ 1, 2, 3 ]
console.log(b);
// [ 4, 5, 6 ]
console.log(c);
//[ 1, 2, 3, 4, 5, 6 ] 
```

Apply, call and bind are worth writing more about, but I will not be getting into detail with those methods here. I have [wrote a post on these methods before hand anyway](/2017/09/21/js-call-apply-and-bind/) a long time ago, so there is just reading over that post if you want my take on these methods. Yes they come in handy a lot when working with javaScript code, so you should take a moment to read up on them more if you have not done so all ready.