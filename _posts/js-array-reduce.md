---
title: Array Reduce method in native javaScript
date: 2021-07-13 13:32:00
tags: [js]
layout: post
categories: js
id: 909
updated: 2021-07-13 13:52:45
version: 1.6
---

This week I am expanding on [javaScript arrays](/2018/12/10/js-array/) a little, and native JavaScript in general a bit, and have found that I have not yet wrote a post on the native [Array reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method. I have got around to writing a post on the [lodash reduce](/2018/07/25/lodash_reduce/) method when I was writing a little content on that library, but I find myself using lodash less and less these days. So I think it is called for now to write at least one [post on the array reduce method](https://dmitripavlutin.com/javascript-array-reduce/) in native core javaScript, and touch base on all kinds of little subjects that might come up as I work out a few basic examples and beyond.

<!-- more -->


## 1 - The basics of array reduce in javaScript

So to start off with in this section I will be going over some very simple examples of the array reduce method.

### 1.1 - Simple sum example

One typical use case of the array reduce method is to create some kind of sum with an array of numbers.

```js
let nums = [10, 5, 5, 4];
let sum = nums.reduce(function (acc, n) {
        return acc + n;
    });
console.log(sum); // 24
```

### 1.2 - An array of strings

If I have an array of strings I could use the array reduce method as a way to create a single string from the array of strings, but in many typical use case examples I might want to go with using the [array join](/2020/03/09/js-array-join/) method in place of doing so. That is that maybe there are some situations in which I would want to use reduce, but if I just want to have a fixed separator or not between each substring and that is it the array join method will work just fine.

```js
let strs = ['foo', 'man', 'chew'];
 
// so reduce can be used to join an array of strings
let reducer = (acc, str, i, arr) => {
    let term = i === arr.length - 1 ? '' : '-';
    return acc + str + term;
};
let s = strs.reduce(reducer, '');
console.log( s ); // 'foo-man-chew'
 
// however there is the array join method that can be used
console.log( strs.join('-') ); // 'foo-man-chew'
```

### 1.3 - An array of objects

There is also working with an array of objects, and wanting to create some kind of reduced value from one or more properties.

```js
let objs = [
    { a: 5},
    { a: 2},
    { a: 3}
];
 
let reducer = (acc, n) => {
    return acc + n.a;
};
 
let n = objs.reduce(reducer, 0);
 
console.log(n);
```

## 2 - Setting the start value for acc

## 3 - The reducer function

## 4 - Some use case examples

## 5 - Conclusion

