---
title: JS Array push and other ways of adding elements to an array
date: 2020-06-17 17:33:00
tags: [js]
layout: post
categories: js
id: 668
updated: 2021-04-15 13:26:20
version: 1.11
---

So in javaScript there is the [array push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) prototype method that is typically what is used as a way to push new elements to the end of a [javaScript array](/2018/12/10/js-array/).

There are many other ways of going about adding elements to an array also though, shuch as just using the object bracket syntax, as well as a range of other methods. So I thought I would write a quick post on this when it comes to the basics of adding elements to an array in javaScript.

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

Of course when it comes to concatenating arrays there is the array concat method that might be a more appropriate choice, but I thought I would just point out why the function apply prototype method is useful. If you are not familiar with [apply, as well as call and bind then you should take a moment to read up on that](/2017/09/21/js-call-apply-and-bind/).

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

## 3 - Other ways to add array elements

So there are other ways to go about adding array elements such as just using the array bracket syntax, or doing something with the array concat method as a way to create a new array and then save that to a variable for example.

```js
var array = [4,5,6];
 
array[array.length] = 7;
array = [3].concat(array);
 
console.log(array.join('-')); // 3-4-5-6-7
```

There are other ways to go about adding elements in place that come to mind such as using the array splice method. That is one way to go about both adding in new elements as well as removing them from any index value in place. There is then also using the array slice method as a way to take a section from a source array without mutating it, the that slice of a source array can be added into another array with concat or splice.

## 4 - Conclusion

So the array push method is often what is used to add elements to a new array, but it is not the only way to go about doing so. There is the unshift method that can also be used when it comes to adding new elements to the begging of an array, and then there are a whole buch of other ways of getting elements in and out of any index value.