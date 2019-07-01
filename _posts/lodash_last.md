---
title: lodash last method and other ways to get the last element in an array in javaScript
date: 2019-07-01 13:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 495
updated: 2019-07-01 13:32:43
version: 1.2
---

The [lodash last](https://lodash.com/docs/4.17.11#last) method is an array method that can be used to get the last element in an array. This method will not mutate the array that is given, so this makes the lodash last method a fairly simple example of a functional programing style pure function. The act of getting the last element in an array is a fairly simple task as well though, so the lodash last method is not a great example of why javaScript developers should bother with lodash. Still in this post I will be taking a look at the \_.last method in lodash as well as a whole bunch of other options when it comes to getting the last element in an array as with lodash, as well as plain old vanilla javaScript by itself as well.

<!-- more -->


## 1 - lodash last


```js
let arr = [1, 2, 3, 4],
last = _.last(arr);
// this will give the last argument
// and will leave the array unchanged
console.log(last); // 4
console.log(arr); // [1,2,3,4]

```

## 2 - lodash remove

```js
let arr = [1, 2, 3, 4],
last = _.remove(arr, (el,i)=>{
    return i === arr.length -1
})
// lodash remove could be used as well
// for getting the last element. However it will
// also mutate the array, and is a complex 
// solution for a fairly simple task
console.log(last); // 4
console.log(arr); // [1,2,3,4]
```

## 3 - Vanilla javaScript alternatives to lodash last

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