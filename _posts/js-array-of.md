---
title: JS Array of method for creating an array from arguments
date: 2020-06-10 13:34:00
tags: [js]
layout: post
categories: js
id: 665
updated: 2020-06-11 11:30:12
version: 1.3
---

So in late specs of javaScript there is a native [Array.of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) static method that can be used to create an array of elements from arguments that are passed when calling the array of method. 

It would seem that this method was introduced as a way to provide something that is messing when using the Array constructor directly. That is calling the main Array constructor method with the new keyword as a way to create a new instance of an array rather than using the bracket syntax. When doing so there is just one argument that is passed to the Array constructor if any that is used to set the starting length of the Array, not the value of the first element. This can cause some confusion with new developers that are and familiar with this. So the Array of method is now that are yet another way to create a new array by passing some arguments for the starting element values for the array.

I can not say that I use the Array of method often, as I prefer to use some of the older tired yet true ways of doing the same thing that is just a little more involved. But never the less this post will be on the JS array of meto9d and other ways of creating a new array with a set number of starting values.

<!-- more -->

## 1 - JS Array of method, the Array constructor, and the Array Bracket syntax

Before the Array of method there where two general ways of going about creating a new Array. One way was to use the Array constructor with the new keyword to create a new Array, just like with any other Constructor in javaScript such as that of the Date constructor for example. When using the Array constructor the first argument that is given is the starting length of the Array, not the value of the first element of the Array. So with that said there was the Array bracket context that can be used as another way to create a new Array, and in addition it can also be used to set some starting values for this new Array.

Today though there are a few other options that can be used to create a new Array, one of which is the Array of method. This is a static method of the js built in Array object that does not need to be used with the new keyword. Just call the of method of the Array object and pass values for the new array by way of function call arguments.

So with that said this quick example should help make the situation clear as to what the deal is with the js array of method, compared to the other typical options that are to be found in most javaScript examples that are found in the wild.

```js
let arr = Array.of(10),
arr2 = new Array(10),
arr3 = [10];
 
// first element
console.log(arr[0]); // 10
console.log(arr2[0]); // undefined
console.log(arr3[0]); // 10
 
// lengths
console.log(arr.length); // 1
console.log(arr2.length); // 10
console.log(arr3.length); // 1
```

So it all has to do with starting a new Array with just a set length property but no starting values really, compared to giving some starting values and letting the number of starting values be what sets the length of the new array. With that said there are a number of other ways to create a new array with some starting values that are not all that much more involved. In addition that are even more options when it comes to methods that create and return new arrays, so lets look at some more quick examples were we are making new arrays with starting values in javaScript.

## 2 - JS Array from method, and Array like Objects

So another Static Array method of interest here now it the Array from method. Just like the Array of method it can be used to create a new Array, but it does so by way of creating an array from a source object. When it comes to source Objects many such Objects might be Array like Objects. That is that they are just Plain old objects, or Objects that where crated with a constructor other then that of the Array constructor. As such they do not have Array prototype methods because they are not an instance of the Array constructor. So the Array from method is one way to create a new array by way of passing one of these objects as the first argument.

```js
let obj = {
    0: 10,
    length: 1
};
 
// just a plain old object
console.log(obj.constructor.name); // 'Object'
console.log(obj.map); // undefined
 
// Array.from can be used to turn it into an array
let arr = Array.from(obj);
console.log(obj.constructor.name); // 'Array'
console.log(arr.map); // [Function: map]
console.log(arr.length); // 1
console.log(arr[0]); // 10
```