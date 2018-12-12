---
title: javaScript Arrays a general overview
date: 2018-12-10 12:13:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 347
updated: 2018-12-12 11:40:44
version: 1.9
---

In [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) Arrays are a special kind of object in which elements exist in an ordered collection where each element has a certain index value. There is a great deal to know about when it comes to arrays in javaScript as well as with objects in general. There are many methods that can be used with arrays that are in the array prototype, as well as with objects in general. Often a javaScript developer will come across objects that are considered array like objects but are not an actual instance of Array, but Array methods can be used with them by using Function.call. So this post will serve as a general overview of Arrays in javaScript.

<!-- more -->

## 1 - What to know

This is a post on javaScript arrays, as such it is important to have at least some background with javaScript. If you are completely new to javaScript it might be a good idea to start with my [getting started with javaScript post](/2018/11/27/js-getting-started/). However if you have at least some background with javaScript, but want to learn more about arrays in general, then this might prove to be a good read.

## 2 - Creating arrays

There is both an array constructor method, and an array literal syntax in javaScript that can be used to create a regular javaScript array. There are also many methods that might return an array as well.

### 2.1 - The array constructor

One way to create an array is to use the Array constructor. I do not recommend the use of, however it does show up in many code examples on the web so it is something that a javaScript developer should be aware of at least.

```js
var arr = new Array()
arr.push(1,2,3,4);

console.log(arr); // 1,2,3,4
```

### 2.2 - The array literal syntax

Anther way to create an array is to use the array literal syntax. This involves the use of square brackets.

```js
var arr = [1,2,3,4];
 
console.log(arr[1]); // 2
```

## 2 - Arrays are Objects

So a javaScript Array is not just an Array, there is more to it then just simply an ordered collection of elements. Many people might treat arrays as something that is completely separate from objects, maybe in some languages that is the case, however in javaScript [Arrays are a kind of object](/2017/05/12/js-arrays-are-objects/). When I create an Array what I am creating is an Object that is made with the Array constructor and as such it has many methods that cab be used via its prototype object.

### 2.1 - Array inherits from object

An instance of an Array in javaScript inherits from Object. What this means is that any and all methods that are in the Object Prototype object can also be used in arrays such as Object.hasOwnProperty. In addition if I add any method to the Object prototype it will also be available with anything that inherits from Object such as with Arrays.

```js
var arr = [1, 2, 3, 4];
 
console.log(arr.hasOwnProperty('0')); // true
console.log(arr.hasOwnProperty('4')); // false
 
Object.prototype.foo = function () {
 
    return 'bar';
 
};
 
console.log(arr.foo()); // 'bar'
```

### 2.2 - Still using an Array as an object

So because Arrays are still objects they can still be used in the same way as I would an object, so if I want to I can just add a method to an array if for some reason I want to do so.

```js
var arr = [17, 40, -15];
 
arr.getAnswer = function () {
    var sum = 0;
    [].forEach.call(this, function (el) {
        if (typeof el === 'number') {
            sum += el;
        }
    });
    return sum;
};
 
console.log(arr.getAnswer()); // 42
```

## 3 - Looping over an array

When working with arrays often oe way or another a developer must loop over all the elements in an array. With javaScript arrays there are a number of ways to do this such as with a loop such as a while or for loop, a method that is called over and over again, or with an array prototype method such as Array.forEach. In this section I will be covering some of these options that a javaScript developer should be familiar with.

### 3.1 - Using a while loop

When using a loop as a means to loop over the elements in a javaScript array I tend to prefer to use a while loop, beucase I have the option to loop over an array like this:.

```js
var arr = [1, 2, 3, 4],
i = arr.length;
 
while(i--){
    arr[i] = Math.pow(2,arr[i]);
}
 
console.log(arr); // [2,4,8,16]
```

This works because a positive number evaluates to true, and a number of zero or lower does not. So I can set a number to the length of an array, and subtract from that number as well in the same location. When the index value reaches a value of zero the loop will end. I have nothing against for loops, and I am not going to say this is the best and only way to loop over an array. However it does has its good points. 