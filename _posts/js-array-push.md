---
title: JS Array push and other ways of adding elements to an array
date: 2020-06-17 17:33:00
tags: [js]
layout: post
categories: js
id: 668
updated: 2021-09-29 13:47:08
version: 1.22
---

So in javaScript there is the [array push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) prototype method that is typically what is used as a way to push new elements to the end of a [javaScript array](/2018/12/10/js-array/).

There are many other ways of going about adding elements to an array also though, such as just using the object bracket syntax, as well as a range of other methods. So I thought I would write a quick post on this when it comes to the basics of adding elements to an array in javaScript.

<!-- more -->

## 1 - The array push method

So the array push method will add a new element to the end of the array to which it is called off of, and it will also return the length of the new array. So if I just create a new array with say the array bracket syntax, I can then  just call push off of that array instance and pass a new element value that is to be added to the end of the array.

```js
var arr = [16, 32];
arr.push(64)
 
console.log(arr.join('-')); // '16-32-64'
```

### 1.2 - Push many at once

So if I would like to push more than one element at a time I can do so by just passing more than one argument. In other words the first argument will be added to the end of the array, and then the second will be added after the first argument and so forth. So then the array push method could then be used in conjunction with the Function apply prototype method as a crude yet effective are to concatenate arrays also.

```js
var arr = [16, 32];
arr.push(64, 128, 256)
 
console.log(arr.join('-')); // '16-32-64-128-256'
 
var b = [1, 2, 3];
[].push.apply(b, [4, 5, 6]);
 
console.log(b.join('-')); // '1-2-3-4-5-6'
```

Of course when it comes to concatenating arrays there is the array concat method that might be a more appropriate choice, more on that method later in  this post, but I thought I would just point out why the function apply prototype method is useful. If you are not familiar with [apply, as well as call and bind then you should take a moment to read up](/2017/09/21/js-call-apply-and-bind/) on those function prototype methods. The methods allow for me to change what the value of the [this keyword](/2017/04/14/js-this-keyword/) is for prototype methods including array prototype methods like that of array push.

### 1.3 - Returns the length of the array

I did mention this, but I would say that it is worth na sub section in this post, that is the fact that the array push method will return the new length of the array. So this might come in handy when using the length property that is returned as a way o know if it is time to break out of a loop or not.

```js
var arr = [],
obj;
while (arr.push({}) < 10) {
    obj = arr[arr.length - 1];
    obj.n = 0;
}
arr.pop();
 
console.log(arr);
```

## 2 - The unshift method

So you might think that because there is a method that can be used to add elements to the end of an array, there should be a method that can be used to push elements to the beginning of the array also. Well you would be right about that because that is what the [array unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method is for. It works more or less the same way as array push, but the order of the arguments is inverted. In other words the last argument that you give will be added to the beginning of the array, and then each argument back to the first one will be added behind that one, and so forth.

```js
var arr = [16, 32];
arr.unshift(1, 2, 3, 4, 8)
 
console.log(arr.join('-')); // '1-2-4-8-16-32-64'
```

## 3 - Using the array concat method

So there are other ways to go about adding array elements such as just using the array bracket syntax, or doing something with the [array concat method](/2020/07/13/js-array-concat/) as a way to create a new array and then save that to a variable for example. This array concat method is then great when I have two or more arrays and I want to just join them together at some point.


### 3.1 - Basic array concat example

So then for a basic example of array concat say I have a simple array of values that are 4, 5, and 6. I then just want to join an additional array of values of 1, 2, and 3 at the beginning of the array, and another array of values at the end of the array. The array concat method can be done to do just this by calling the concat method off of the array that I want to be at the begging of the new array, and then just pass the arrays as arguments.

```js
var array = [4,5,6];
 
array[array.length] = 7;
array = [3].concat(array);
 
console.log(array.join('-')); // 3-4-5-6-7
```

### 3.2 - The concat method will flatten arrays that are given, but only by one level

The concat method will flatten an array of values given to it, but only by one level. What I mean by this is that if I just give primitive values at arguments to array concat they will just be added on as new elements, if I give an array of elements that will result in the same effect. However if I give an array of arrays any and all nested arrays after one level will be arrays rather that primitives. If you are still confused by what I am saying take a look at this code example.

```js
var array = [1, 2, 3];
array = array.concat([4, 5, [6, 7]]);
console.log(array); // [ 1, 2, 3, 4, 5, [ 6, 7 ] ]
```

## 4 - Array splice method can also be used to mutate in place, and inject at any index

Yet another option for injecting new elements to the end of an array would be the array splice method. This method will mutate an array in place, and is also often used to remove one or more elements at a given element index. However when it comes to removing elements one does have the option of setting zero for the value, on top of that the splice method can also be used to inject new elements as this element index location.

### 4.1 - Array splice basic example

So then the basic idea here is to call the array slice method off of an array that I want to inject elements into. I then given the element index location of the array where I want to inject, and then I give a value of zero for the amount of elements to remove at that location. I can then inject one or more elements at that index by way of one or more additional arguments after that.

```js
var array = [1, 3];
array.splice(1, 0, 2);
console.log(array.join('-')); // 1-2-3
```

### 4.2 - An insert at method along with push and unshift methods

It is then possible to create an insert at method by using the array splice method along with the apply function prototype method, and the array concat method. This insert at method can take the array I want to insert elements into as the first argument, and then an index as to where to insert at, followed by an array of values to insert there. I can then create a new array and call the splice method off of that new array with the function apply prototype method. Sense I am calling apply off of the splice function I can given the array argument as the value of this for apply and then I need to given an array of arguments. For this I can create an array where the first element will be the index to insert at, followed by the number of elements to remove which is zero. After that I can call the array concat method of this array of arguments and pass the array of values to insert.

```js
var array = [4, 5, 6];
 
var insertAt = function (array, index, what) {
    [].splice.apply(array, [index, 0].concat(what));
};
// push
var push = function (array, what) {
    insertAt(array, array.length, what);
};
// unshift
var unshift = function (array, what) {
    insertAt(array, 0, what);
};
 
push(array, [7, 8, 9]);
unshift(array, [1, 2, 3]);
 
console.log(array); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## 5 - Conclusion

So the array push method is often what is used to add elements to a new array, but it is not the only way to go about doing so. There is the unshift method that can also be used when it comes to adding new elements to the begging of an array, and then there are a whole bunch of other ways of getting elements in and out of any index value.