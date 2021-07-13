---
title: Array Reduce method in native javaScript
date: 2021-07-13 13:32:00
tags: [js]
layout: post
categories: js
id: 909
updated: 2021-07-13 14:00:38
version: 1.8
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

## 2 - Setting the start value for the accumulator

In this section I will be foucs on the toping of setting a start value for the accumulator value or not. Be default if not starting value is given for the accumulator the first element in the array will be used for such a value,  as such the starting element index for the reducer will not be the first element, but the second one. As such this can case some problems if one does not knwo how to adjust for it. Typically type checking is used in the body of the reducer, or another way is to just set a starting value and then all the elements will be called with the reducer function.

### 2.2 - Setting an accumulator start value and not

```js
let objs = [
    { clicks: 15},
    { clicks: 10},
    { clicks: 25}
];
 
// one way is to do type checking
let a = objs.reduce(function (acc, rec) {
    acc = typeof acc === 'object' ? acc.clicks : acc;
    return acc + rec.clicks;
});
 
// the other way is to set a custom starting value for acc
let b = objs.reduce(function (acc, rec) {
    return acc + rec.clicks;
}, 0);
 
console.log(a); // 50
console.log(b); // 50
```

### 2.1 - index values

```js
let objs = [{
        clicks: 15
    }, {
        clicks: 10
    }, {
        clicks: 25
    }
];
 
let a = objs.reduce(function (acc, rec, index) {
        acc = typeof acc === 'object' ? acc.clicks : acc;
        console.log(index); // 1 2
        return acc + rec.clicks;
    });
 
let b = objs.reduce(function (acc, rec, index) {
        console.log(index); // 0 1 2
        return acc + rec.clicks;
    }, 0);
 
console.log(a); // 50
console.log(b); // 50
```

## 3 - The reducer function

```js
let reducer = (acc, el, index, array) => {
    console.log(acc, el, index, array);
    return acc + el;
};
 
let arr = [7, 8, 9, 10]
 
let n = arr.reduce(reducer, 0);
//0 7 0 [ 7, 8, 9, 10 ]
//7 8 1 [ 7, 8, 9, 10 ]
//15 9 2 [ 7, 8, 9, 10 ]
//24 10 3 [ 7, 8, 9, 10 ]
```

## 4 - Some use case examples

### 4.1 - create a mean

```js
let getArthMean = (nums) => {
    return nums.reduce((acc, n) => {
        return acc + n;
    }, 0) / nums.length;
};
let nums = [10, 5, 7, 10, 10, 8];
console.log(getArthMean(nums).toFixed(2)); // '8.33'
```

### 4.2 - Add up array of object props helper

```js
let sumObjects = (objs, prop) => {
    prop = prop === undefined ? 'clicks' : prop;
    return objs.reduce(function (acc, rec) {
        acc = typeof acc === 'object' ? acc[prop] : acc;
        return acc + rec[prop];
    });
};
 
let objs = [
    { clicks: 15, money: 0.75 },
    { clicks: 10, money: 1.50 },
    { clicks: 25, money: 3.35 }
];
 
console.log(sumObjects(objs));          // 24
console.log(sumObjects(objs, 'money')); // 5.6
```

## 5 - Conclusion

