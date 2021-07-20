---
title: JS Array of method for creating an array from arguments
date: 2020-06-10 13:34:00
tags: [js]
layout: post
categories: js
id: 665
updated: 2021-07-20 13:18:14
version: 1.16
---

So in late specs of javaScript there is a native [Array.of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) static method in the [array object](/2018/12/10/js-array/) that can be used to create an array of elements from arguments that are passed when calling the array of method. 

It would seem that this method was introduced as a way to provide something that is missing when using the [Array constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) directly with one argument. That is calling the main Array constructor method with the [new keyword](/2019/02/08/js-javascript-new/) as a way to create a new instance of an array, rather than using the bracket syntax to do so. When using the Array constructor with new there is using just one optional argument that is a number rather than some other value when doing so this sets a starting length of the array, but not the first value of the array. 

However often new javaScript developers find the use of the Array constructor with one argument a little confusing and assume that a starting value for the first element can be passed to the constructor as the first argument. So then this can cause some confusion with new developers that are not familiar with the fact that a starting value for the first elemnt can not be set that way. So the Array of method is now a way to create a new array by passing some arguments for the starting element values for the array rather than just a starting length, and works as expected when passing just one argument that is a number.

I can not say that I use the Array of method often, as I prefer to use some of the older tired yet true ways of doing the same thing that is just a little more involved. But never the less this post will be on the JS array of meto9d and other ways of creating a new array with a set number of starting values.

<!-- more -->

## 1 - The JS Array Constructor, the deal with the first argument, and the Array.of method

Before the Array of method there where two general ways of going about creating a new Array. One way is to use the array bracket syntax and the other is to use the Array constructor function. The Array constructor function works okay, but there is just one little issue with the first argument. In this section I will be going over what that little issue is and how the array of method can be used as one way to address that issue when it comes to additional ways to create a new array.

### 1.1 - The array constructor and the first argument

When using the Array constructor with the new keyword as a way to create a new array there is a problem when passing one argument that is a number. many developers might thing that by doing so they will end up getting a new array with the first element being the number value that is given as the first, and only argument. However this is n ot the case, instead what happens is one ends up with a new empty array with a length property set to the number that is given as that one and only argument.

```js
let arr = new Array(10);
console.log( arr[0] ); // undefined
console.log( arr.length ); // 10
```

there are ways of using the Array constructor to get the desired result, more on that later. However there is still the question of creating a new array by way of one or more arguments that are numbers and having those numbers always be starting elements rather than a length value if it is just one argument. This is where the array of method might be of use.


### 1.2 - The array of method

So if the array of static method is called and a single argument is given that is a number, then the retured result will be a new array with that number value being the value of the first argument.

```js
let arr = Array.of(10);
 
console.log( arr[0] ); // 10
console.log( arr.length ); // 1
```

So it all has to do with starting a new Array with just a set length property but no starting values really, compared to giving some starting values and letting the number of starting values be what sets the length of the new array. With that said there are a number of other ways to create a new array with some starting values that are not all that much more involved. In addition that are even more options when it comes to methods that create and return new arrays, so lets look at some more quick examples were we are making new arrays with starting values in javaScript.

## 2 - A Closer look at the Array constructor

The tired yet true Array constructor can still be used to create a new array and have just one element that is a number. The only thing to be aware of is what happens wheh it is given just one argument that is a number. If you just know about that and find ways to ajust for it then there is no need to bother with the array of method really.

There are also other ways of creating an array that are tired yet true that do not have this problem going on, but for now lets take a another look at the Array constructor.

### 2.1 - Use an array as the first argument

So if the first argument is number that will be used to set the length of the new array, so one way to get around this is to just make it so the first argument is not a number.

```js
let arr = new Array([10]);
console.log( arr[0] ); // [ 10 ]
console.log( arr.length ); // 1
```

### 2.2 - Using a string of the number

The effect where the first argument is used to set the starting length of the new array is only going to happen if it is a number, but not a string of that number. So if I just pass a string as the first argument rather than a number then that string will be used to set the value of the first argument.

```js
let arr = new Array('10');
console.log( arr[0] ); // '10'
console.log( arr.length ); // 1
console.log( typeof arr[0]); 'string'
```

### 2.3 - Using the Array map method

There is using some kind of method to help address the problem of the number value being in a nested array when using an array to set the value of the first argument. One such method that coes to mind is the array mao method, but theer are a number of other options that would work.

```js
let arr = (new Array([10])).map((n) => n[0]);
console.log(arr[0]); // 10
console.log(arr.length); // 1
```

### 2.4 - Just use more than one argument, and then pop if you just one want element

The issue if a combination of using a number as the first argument, but also only passing one argument. So when  passing two or more arguments for starting values there is no problem. If for some reason you only want one starting value in the array that is a number you could still use this to do that by just popping out the extra element.

```js
let arr = new Array(10,0);
arr.pop(); // pop the extra element
console.log( arr[0] ); // 10
console.log( arr.length ); // 1
```

### 2.5 - Just start with an empty array

yet another options is to just give no arguments at all to start with and just push in the first element after creating an empty array.

```js
let arr = new Array();
arr.push(10);
console.log( arr[0] ); // 10
console.log( arr.length ); // 1
```

## 3 - Just use the bracket syntax

I still thing that the best way to go about creating new arrays is to just use the bracket syntax. If I want an array with a single starting element that is a number then I can just place that number in between an object and closing set of square brackets and move on to far more important things then this.

```js
let arr = [10];
console.log(arr[0]); // 10
console.log(arr.length); // 1
```

## 4 - JS Array from method, and Array like Objects

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

## 5 - JS Array map, and Array methods that return a new Array, rather than mutating one

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

## 6 - Conclusion

So in native javaScript there is now a wide range of ways of how to go about creating a new Array one of which is the new Array of method. This Array of method is one way of creating a new Array with some starting values. However it is just one way of going about doing so, and there are many other such options both new and old to do so also.