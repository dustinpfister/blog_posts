---
title: The lodash clamp number method and adding a wrap number method
date: 2021-12-17 12:56:00
tags: [lodash]
layout: post
categories: lodash
id: 945
updated: 2021-12-17 14:57:34
version: 1.12
---

In [lodash there is a clamp number method](https://lodash.com/docs/4.17.15#clamp) that can be use to return a number value that is based off of a given number that is to be clamped between a lower and upper bound. However it would seem that there is not a wrap number method which is also to be found in libraries and frameworks that provide such a method. If I want a wrap number method in lodash then I will need to add one to lodash by way of a mixin using the [lodash mixin](/2018/01/31/lodash_mixin/) method.

I have found that these two methods that is clamp number and wrap number are two major methods that should be part of just about any general utilities library. So in this post I will be writing about the clamp method in lodash, but also how to go about adding the wrap number method that should be there along with it. There are also maybe a few things more to wrote about beyond just that such as the topic of other libraries and frameworks that given these kinds of methods, and also the subject of making vanilla javaScript alternatives to these kinds of methods that in some situations seems necessary. 

<!-- more -->


## 1 - The Basics of clapping and wrapping numbers in lodash

In this section I will be starting out with just a few basic examples of clamping and wrapping numbers in lodash. When it comes to clamping a number there is the lodash clamp method, but wrapping a number is something that seems that it must be added to lodash. In any case I will be going over some quick simple examples of both of these kinds of methods in lodash as well as other various lodash features and methods.

### 1.1 - The lodash get method

First off say that you are using a method like the [lodash get method](/2018/09/24/lodash_get) as a way to get an element in an array and for a default value to be returned in the event that an element is empty or I give an out of range index value. 

```js
// using the get get method
var arr = [1, 2, 3];
console.log( _.get(arr, -1, 0) ); // 0
console.log( _.get(arr, 2, 0) );  // 3
console.log( _.get(arr, 3, 0) );  // 0
```

This method works fine as long as I am okay with the default value being what I pass when calling the lodash get method. In many situations I might not want to have a value that I pass, but for the method to check if a given index value is out of rage of the array or not, and if so give the closest element that is in range. Also there is the idea of having a kind if wrap method that will wrap around to the begging or end of the array and give whatever element is a result of that when giving an out of range index value.

### 1.2 - The lodash clamp method

So then when it comes to clamping an index value I can just use the lodash clamp method. This method works by giving a number and then a min and max number to clamp that number to, the returned number is then the number that was given or a number that has been clamped to the range of the number goes out or range.

```js
// custom get method using lodash get and clamp
var get = function(arr, i, def){
    return _.get(arr, _.clamp(i, 0, arr.length - 1), def);
};
// using the get method
var arr = [1, 2, 3];
console.log( get(arr, -1, 0) ); // 1
console.log( get(arr, 2, 0) );  // 3
console.log( get(arr, 3, 0) );  // 3
// using just clamp directly
console.log( _.clamp(-1, 0, 5) ); // 0
console.log( _.clamp(7, 0, 5) );  // 5
```

### 1.3 - adding a wrapNumber method

If I want a wrap number method it would seem that I will have to add one to lodash. This one that I have added into lodash by way of the lodash mixin method was based off of the source code of the phaser game framework. The [phaser game framework features both a wrap and clamp method](/2018/07/22/phaser-math-wrap-and-clamp/) in the math object of the framework.

Anyway once I add the wrap number method to lodash it will take the same arguments as the lodash clamp method only as the name suggests it will wrap around like the odometer in a car and give an index value from the upper bounds backward or vis versa.

```js
// using lodash mixin to add a lodash wrap number
_.mixin({'wrapNumber': function(n, min, max){
    var r = max - min;
    return (min + ((((n - min) % r) + r) % r));
}});
// get method using custom wrap method
var get = function( arr, i, def ){
    return _.get( arr, _.wrapNumber( i, 0, arr.length ), def );
};
// using the get method
var arr = [1, 2, 3];
console.log( get(arr, -1, 0) ); // 3
console.log( get(arr, 2, 0) );  // 3
console.log( get(arr, 3, 0) );  // 1
// can use the wrap number method directly
console.log( _.wrapNumber(-1, 0, 10) ); // 9
console.log( _.wrapNumber(10, 0, 10) ); // 0
console.log( _.wrapNumber(-6, -5, 5) ); // 4
console.log( _.wrapNumber(5, -5, 5) ); // -5
```


## 2 - Conclusion

So then that will be it for now when it comes to the subject of clamping and wrapping numbers in lodash at least for now until the next time I get around to doing a little editing of this post. If you are looking for event more reading on lodash there is my [main post on lodash](/2019/02/15/lodash/) that I have put a fair about of time into, and get around to editing fairly often.

Although lodash has a lot of useful methods it seems like many of them are methods that I never use, also I have to say that there are methods that I use all the time that I think should be part of it but of course they are not such as with the wrap number method. This is why I sometimes thing that it might be best to make my [own utilities library from the ground up actually](/2021/08/06/js-javascript-example-utils/).

