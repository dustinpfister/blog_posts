---
title: javaScript Arrays a general overview
date: 2018-12-10 12:13:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 347
updated: 2018-12-13 14:38:54
version: 1.19
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

## 3 - Arrays are Objects

So a javaScript Array is not just an Array, there is more to it then just simply an ordered collection of elements. Many people might treat arrays as something that is completely separate from objects, maybe in some languages that is the case, however in javaScript [Arrays are a kind of object](/2017/05/12/js-arrays-are-objects/). When I create an Array what I am creating is an Object that is made with the Array constructor and as such it has many methods that cab be used via its prototype object.

### 3.1 - Array inherits from object

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

### 3.2 - Still using an Array as an object

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

I am not saying doing so is a best practice it is just that in javaScript Arrays are a kind of object, and also plain old objects in general can also be thought of as an array of sorts as well. The core deference is that when working with an Array I am working with an object where the key values are indexed numbers rather than property names.

## 4 - Array like objects

Often when working with javaScript you might come across what is often referred to as "array like objects". Arrays themselves are objects as well, so to help clarify this better array like objects are objects that are structured like an array, but are not created with the Array constructor or literal syntax. As such they might be structured like an array, but may not have the various array methods available in the objects prototype.

If you are still confused maybe it is best to just play around with some code examples. Examples of Array like objects in javaScript are the arguments object in the body of a function, and html node lists. It is also possible to create array like objects from scratch. In addition although array methods like Array.splice may not be available it is still possible to use them with array like objects by making use of Function.call.

### 4.1 - The arguments object

An example of an Array like object would be the arguments object of function. Whenever a function is called, inside the body of a function there is an arguments object that contains the given arguments to the function. This is useful for defining different logic that is to be used depending on the number of arguments that are given to the function. However for the sake of the content of this post, and this section what is of interest here is the way that the object is structured.

```js
var func = function(a,b){
 
   // the arguments object is structured like an array
   console.log(arguments[0]); // 5
   console.log(arguments.length); // 2
 
   // However the constructor is Object, not Array
   // so it is an "array like object"
   console.log(arguments.constructor.name); // Object
   
   return a + b; // 10
 
};
func(5,5);
```

So because the argument objects constructor is Object and not Array it is just a plain old Object, and as such it does not have Array prototype methods available to it. However it is still very mush structured like an Array so it can be considered an Array like Object.

### 4.2 - HTMLCollections

So html collections are another common example of an Array like object when it comes to client side javaScript. When a method like getElementsByTagName is used to get all elements in an html document of a certain tag name, what is returned is not an instance of Array, but HTMLCollection.

```js
var nodeList = document.getElementsByTagName('div');
 
console.log(nodeList[0]); // (first div)
console.log(nodeList.length); // (number of divs)
 
console.log(nodeList.constructor.name); // HTMLCollection
```

Just like with the arguments object in a function these objects are structured just like an Array, but because they are not an instance of Array they do not have Array prototype methods like Array.forEach or Array.filter

### 4.3 - Using Array prototype methods with an Array like object

If an Object that is not an instance of Array is still structured just like an Array where the keys are index values, and there is a single length property that is the number of elements. Then it is possible to still get Array prototype methods to work just fine with these by making use of Function.call.

```js
Array.prototype.forEach.call(nodeList, function(div){
 
    console.log(div)
 
});
```

There is also Function.apply, and Function.bind to be aware of as well I have [written a post](/2017/09/21/js-call-apply-and-bind/) in which I get into this in further detail as well.

## 5 - Looping over an Array

When working with arrays often one way or another a developer must loop over all the elements in an array. With javaScript arrays there are a number of ways to do this such as with a loop such as a while or for loop, a method that is called over and over again, or with an array prototype method such as Array.forEach. In this section I will be covering some of these options that a javaScript developer should be familiar with.

### 5.1 - Using a while loop

When using a loop as a means to loop over the elements in a javaScript array I tend to prefer to use a while loop, because I have the option to loop over an array like this:.

```js
var arr = [1, 2, 3, 4],
i = arr.length;
 
while(i--){
    arr[i] = Math.pow(2,arr[i]);
}
 
console.log(arr); // [2,4,8,16]
```

This works because a positive number evaluates to true, and a number of zero or lower does not. So I can set a number to the length of an array, and subtract from that number as well in the same location. When the index value reaches a value of zero the loop will end. I have nothing against for loops, and I am not going to say this is the best and only way to loop over an array. However it does has its good points.

### 5.2 - Array.forEach

Another common way to loop over the contents of an Array in javaScript is to use the Array.forEach method. This is one of the many Array prototype methods that can be called off an instance of Array to preform tasks such as this. When using Array.forEach a function is passed as the first argument, this function will be called for each element in the Array and the current element and index will be passed as arguments to this function.

```js
var arr = [1, 2, 3, 4];
 
arr.forEach(function (n, i) {
    console.log(i, n);
});
```

## 6 - Pushing and shifting an array

## 7 - Filtering an Array

One of the most important tasks to preform with arrays is to filter them. One of the many Array prototype methods is Array.filter than can help with filtering tasks. The Array.filter method creates a new array rather than mutating the Array that it is call off of making Array.filter a functional programming friendly method. There are other ways of filtering as well of course, so in this section I will be coving a few examples that involve filtering.

## 7.1 - Using Array.filter

```js
var arr = [2, 3, 16, 7, 9, 128];
var pow2 = arr.filter(function (n) {
    return String(Math.log(n) / Math.log(2)).indexOf('.') == -1;
});
 
console.log(arr); // [2,3,16,7,9,128]
console.log(pow2); // [2,16,128]
```