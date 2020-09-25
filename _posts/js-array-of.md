---
title: JS Array of method for creating an array from arguments
date: 2020-06-10 13:34:00
tags: [js]
layout: post
categories: js
id: 665
updated: 2020-09-25 09:42:44
version: 1.6
---

So in late specs of javaScript there is a native [Array.of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) static method that can be used to create an array of elements from arguments that are passed when calling the array of method. 

It would seem that this method was introduced as a way to provide something that is missing when using the [Array constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) directly with one argument. That is calling the main Array constructor method with the [new keyword](/2019/02/08/js-javascript-new/) as a way to create a new instance of an array, rather than using the bracket syntax to do so. When using the Array constructor with new there is using just one optional argument that is a number rather than some other value when doing so this sets a starting length of the array, but not the first value of the array. 

However often new javaScript developers find the use of the Array constructor with one argument a little confusing and assume that a starting value for the first element can be passed to the constructor as the first argument. So then this can cause some confusion with new developers that are not familiar with the fact that a starting value for the first elemnt can not be set that way. So the Array of method is now a way to create a new array by passing some arguments for the starting element values for the array rather than just a starting length, and works as expected when passing just one argument that is a number.

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

## 3 - JS Array map, and Array methods that return a new Array, rather than mutating one

Ask yourself this when creating a new array \"What is the goal here?\". Often the goal with all of this is to just simple create a new array, rather than mutating an array that all ready exists. In that situation using a method like Array of, or the bracket syntax will do just that. However there are many methods in the Array prototype that will return a new Array rather than  mutating an array in place. One such method is the Array map method.

```js
let nums = [1, 2, 3],
pows = nums.map((n) => {
        return Math.pow(2, n);
    });
 
console.log(pows); // [2,4,8];
// does not mutate the source array
console.log(nums); // [1,2,3]
```

## 4 - Conclusion

So in ntaive javaScript there is now a wide range of ways of how to go about creating a new Array one of which is the new Array of method. This Array of method is one way of creating a new Array with some starting values. However it is just one way of going about doing so, and there are many other such options both new and old to do so also.