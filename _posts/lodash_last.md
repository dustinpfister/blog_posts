---
title: lodash last method and other ways to get the last element in an array in javaScript
date: 2019-07-01 13:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 495
updated: 2019-07-01 13:43:46
version: 1.6
---

The [lodash last](https://lodash.com/docs/4.17.11#last) method is an array method that can be used to get the last element in an array. This method will not mutate the array that is given, so this makes the lodash last method a fairly simple example of a functional programing style pure function. The act of getting the last element in an array is a fairly simple task as well though, so the lodash last method is not a great example of why javaScript developers should bother with lodash. Still in this post I will be taking a look at the \_.last method in lodash as well as a whole bunch of other options when it comes to getting the last element in an array as with lodash, as well as plain old vanilla javaScript by itself as well.

<!-- more -->


## 1 - lodash last

The lodash last method works by just calling the method, and then passing the array to which I want the last element. When doing so it will give the last element in the array without removing it.


```js
let arr = [1, 2, 3, 4],
last = _.last(arr);
// this will give the last argument
// and will leave the array unchanged
console.log(last); // 4
console.log(arr); // [1,2,3,4]
```

Siple enough, but what if I want the last element, and I want it to be removed from the array. Also do I really need lodash to do this? Well there are other ways of getting the last element in the array, and removing it as well, with and without lodash. So lets look at some more examples of how to to get that last element in an array in javaScript.

## 2 - lodash remove

So there is also the lodash \_.remove method that can be used to get the last element of an array. However it is a far more complex solution for something that is fairly simple. The lodash remove method works by passing the array as the first argument and then a function that will be called for each element. In the body of the function that is called I could give an expression that will return true when it is the last index in the array.

```js
let arr = [1, 2, 3, 4],
last = _.remove(arr, (el,i)=>{
    return i === arr.length -1
})
// lodash remove could be used as well
// for getting the last element. However it will
// also mutate the array, and is a complex 
// solution for a fairly simple task
console.log(last[0]); // 4
console.log(arr); // [1,2,3,4]
```

It works sure, but for something so simple it is a bit much. The lodash remove method should be used when there is some far more complex set of criteria that is required when it comes to removing and returning the last element in an array.

## 3 - Vanilla javaScript alternatives to lodash last

So now that we looked at some examples of using lodash as a way of getting and or removing the last element in an array, lets looks at some examples of doing the same thing with just plain old javaScript by itself.

### 3.1 - Just use Array.length -1

```js
let arr = [1, 2, 3, 4],
last = arr[arr.length - 1];
// same effect as with lodash last
console.log(last); // 4
console.log(arr); // [1,2,3,4]
```

### 3.2 - Array.pop to both get an remove

```js
let arr = [1, 2, 3, 4],
last = arr.pop();
// array.pop will give the last element
// but it will also mutate the array
console.log(last); // 4
console.log(arr); // [1,2,3]
```

### 3.3 - Array.splice

```js
let arr = [1, 2, 3, 4],
last = arr.splice(arr.length-1,1);
// array.splice will have the same effect as
// arrar.pop
console.log(last); // 4
console.log(arr); // [1,2,3]
```

### 3.4 - Array.slice

```js
let arr = [1, 2, 3, 4],
last = arr.slice(arr.length-1,arr.length);
// array.slice will work like lodash last
console.log(last); // 4
console.log(arr); // [1,2,3,4]
```