---
title: JavaScript forEach with arrays and objects in general
date: 2019-02-16 10:39:00
tags: [js]
layout: post
categories: js
id: 384
updated: 2019-02-16 17:20:03
version: 1.12
---

In javaScript there is the [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method that is often used as a quick way to go about looping over the contents of an array. However there are other Array methods that do the same thing but might be a better choice depending on what you want to do with an Array like Array.map, and Array.filter. Then there are other objects in javaScript that are structured like arrays, but are not arrays. In addition there are also plain old objects that are named collections of key value pairs rather than indexed by numbers. As such this post will be on Array.forEach, but also the many other options in native javaScript  and libraries like [lodash](/2019/02/15/lodash/).

<!-- more -->

## 1 - javaScript forEach

The Array.forEach method in native javaScript is one of many ways to loop over the contents of a collection in javaScript. However the Array.forEach method is only useful for looping over the contents of an Array, it can also in some cases be used to loop over the contents of an array like object, but it might not always be the best solution when it comes to looping over named collections when it comes to clever ways to get it to work with such collections. In any case there are other ways of doing this that involve the use of a library like javaScript as well as other native solutions.

## 2 - javaScript forEach basic examples

So a basic example of Array.forEach might look something like this.

```js
let arr = [1, 2, 3],
sum = 0;
arr.forEach((n) => {
    sum += n;
});
console.log(sum); // 6
```

In real projects want might need to happen for each element in an array might end up being far more complex than just adding up each number in the array. There might come a time where I might not want to start at index 0 each time, or I might want to do something with each array index and so forth. So lets look as some more basic examples that are written differently, but do more or less the same thing for now before moving on to so more advanced examples.

### 2.1 - ECMA rev5 compliant

As time goes by it is becoming less, and less of an issue to worry about code breaking on clients when delivering modern javaScript exclusively. Still depending on your websites analytics with browser versions, it might still be better to stick to the tired yet true way of doing things with client side javaScript.

```js
var arr = [1, 2, 3],
sum = 0;
arr.forEach(function(n){
    sum += n;
});
console.log(sum); // 6
```

Sticking to an older javaScript spec will help to assure that what it is that you are making will work on a larger range of clients.

### 2.2 - Array.reduce

When it comes to doing anything that might involve a sum of any kind, it might be better to use Array.reduce in place of Array.forEach. 


```js
let arr = [1, 2, 3],
sum = arr.reduce((s,r)=>{return s+r;});
console.log(sum); // 6

```

This is one of many other Array prototype methods that work in a very similar way to that of Array.forEach, but behave a little differently. For one thing the Array.reduce method does not start looping at index 0, but rather index 1. the reason why is that the first element at index 0 is the initial value of an accumulator argument that is the first argument that is given to the function that is passed to Array.reduce. So in this example the value of s starts out as 1 and the value of r is 2, then on the next call the value of s is 3 and the value of r is 3 making the final value that is reduced to 6;

### 2.3 - Array.map

Another way to loop over elements in an array is to use Array.map. This method works more or less the same way as Array.forEach but with one significant difference. That difference is that whatever is returned will become that element in the array, or at least a copy of it that can then be reassigned to the variable that is.

```js
var arr = [1, 2, 3],
sum = 0;
 
arr = arr.map((n)=>{sum+=n;return Math.pow(2,n);});
 
console.log(sum); // 6
console.log(arr); // [2,4,8]
```

### 2.4 - While loops

Another way would be to use a while loop.

```js
var arr = [1, 2, 3],
sum = 0,
i = 0,
len = arr.length;
 
while (i < len) {
    sum += arr[i];
    i += 1;
}
console.log(sum); // 6
```

More than one way to skin a cat when it comes to while loops, and loops in general.

```js
var arr = [1, 2, 3],
sum = 0,
i = arr.length;
while (i--) {
    sum += arr[i];
}
console.log(sum); // 6
```

Loops are often more flexible then Array methods, for one think I can use the break and continue keywords as ways of breaking out of a loop when a condition is met, or spiking over values and additional blocks of logic along with it. A such when it comes to getting into things that involve a lot of heavy lifting they may prove to be a more efficient solution. However when it comes to simple things like this it does not make much difference.

## 3 - ForEach and Array like Objects

So in javaScript Arrays are a kind of object, but the typical situation is that an Array is a special kind of object that is formated in a way in which there are numbered key values with corresponding values. In addition to this there is a length property that reflects the number of these key value pairs, and there are a number of useful methods accessible via the Array prototype object. So an Array is not just an Object, it is an Object that is formated a certain way and is an instance of the Array constructor.

However often in javaScirpt I come across Objects that are formatted like an Array, but they are an instance of another kind of constructor. Sometimes the values of these objects might be read only, but even then it is possible to get a method like Array.froEach to work with these it just requires some trickery with Function.call, or Array.from.

An Example of an Array like object might look like this

```js
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// so this is just a plain object so it does not
// have the Array.prototype methods
console.log(obj.constructor.name); // 'Object'
console.log(obj.forEach); // undefined
```

So in this section I will be outlining some ways to loop over these kinds of objects.

The Array.from method is one way to go about converting one of these array like objects into an Array. Once that is done it is possible to use some Array prototype methods such as Array.forEach

### 3.1 - Array.from, and Array.forEach

```js
var obj = {0:1, 1:2, 2:3, length: 3};
 
// Using Array.from can help change an array like
// object into an array
var arr = Array.from(obj);
console.log(arr.constructor.name); // 'Array'
 
// Now we have the methods
var sum = 0;
arr.forEach((n)=>{ sum += n; });
console.log(sum); // 6
```

### 3.2 - Function.call, and Array.forEach

Another trick is to leverage the power of Function.call. If you are not familiar with Function.call, Function.apply, and Function.bind it would be a good idea to look into them at some point. If any kind of object has properties that will work with a prototype method of another it can be done with these Function prototype methods.

```js
var obj = {0: 1,1: 2,2: 3,length: 3},
sum = 0;
Array.prototype.forEach.call(obj, (n) => {
    sum += n;
});
console.log(sum); // 6
```

## 4 - Named key Collections

Some times I am dealing with an object that is not an instance of an Array but it is a named collection of sorts. In these situations I need to loop over the contents of a collection of named keys and corresponding values rather than numbered ones.

### 4.1 - Object.values

```js
let obj = {
    foo: 1,
    bar: 2,
    foobar: 3
},
sum = 0;
Object.values(obj).forEach((n) => {
    sum += n;
});
console.log(sum); // 6
```