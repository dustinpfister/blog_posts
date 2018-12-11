---
title: javaScript Arrays a general overview
date: 2018-12-10 12:13:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 347
updated: 2018-12-11 09:23:19
version: 1.2
---

In [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) Arrays are a special kind of object in which elements exist in an ordered collection where each element has a certain index value. There is a great deal to know about when it comes to arrays in javaScript as well as with objects in general. There are many methods that can be used with arrays that are in the array prototype, as well as with objects in general. Often a javaScript developer will come across objects that are considered array like objects but are not an actual instance of Array, but Array methods can be used with them by using Function.call. So this post will serve as a general overview of Arrays in javaScript.

<!-- more -->


## 2 - Arrays are Objects

Many people might treat arrays as something that is completely separate from objects, maybe in some languages that is the case, however in javaScript Arrays are a kind of object. When I create an Array what I am creating is an Object that is made with the Array constructor and as such it has many methods that cab be used via its prototype object.

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