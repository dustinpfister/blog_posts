---
title: Array Reduce method in native javaScript
date: 2021-07-13 13:32:00
tags: [js]
layout: post
categories: js
id: 909
updated: 2021-07-13 14:28:06
version: 1.16
---

This week I am expanding on [javaScript arrays](/2018/12/10/js-array/) a little, and native JavaScript in general a bit, and have found that I have not yet wrote a post on the native [Array reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method. I have got around to writing a post on the [lodash reduce](/2018/07/25/lodash_reduce/) method when I was writing a little content on that library, but I find myself using lodash less and less these days. So I think it is called for now to write at least one [post on the array reduce method](https://dmitripavlutin.com/javascript-array-reduce/) in native core javaScript, and touch base on all kinds of little subjects that might come up as I work out a few basic examples and beyond.

<!-- more -->


## 1 - The basics of array reduce in javaScript

So to start off with in this section I will be going over some very simple examples of the array reduce method. Understanding the basic idea of the method is maybe not as simple as what is going on with some other array prototype methods. If you find yourself in a situation in which you are getting a little frustrated with array reduce, it might be called for to take a breath, step back for a moment, and just work out a few simple examples of the method to get a better sense of what the core functionally of the array reduce method is.

### 1.1 - Simple sum example

One typical use case of the array reduce method is to create some kind of sum with an array of numbers. TO do this I can just call the array reduce method off of the array of numbers and pass a single function that will be the so called reduce function. In the body of this reducer function I just need to return the sum of the accumulator argument that is the first argument with the current value which would be the second argument.

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

In this section I will be focus on the toping of setting a start value for the accumulator value or not. Be default if not starting value is given for the accumulator the first element in the array will be used for such a value,  as such the starting element index for the reducer will not be the first element, but the second one. As such this can case some problems if one does not know how to adjust for it. Typically type checking is used in the body of the reducer, or another way is to just set a starting value and then all the elements will be called with the reducer function.

### 2.2 - Setting an accumulator start value and not

In this example I worked out two simple examples of the array reduce method that do the same thing in two slightly different ways. One way is to not give a starting value for the accumulator value, which can present a problem when it comes to reducing an array of objects but I want the final result to be a number or string. One way to address this would be to use the [javaScript type of](/2019/02/15/js-javascript-typeof/) operator to check the type of the accumulator and set it to the desired value in that case. However another way would be to use the second argument of the array reduce method to set a starting value for the accumulator value.

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

One again I am doing more or less the same thing as the first example here the only different is that I am logging the index value in the reducer functions. If I do not give a starting value then the starting index for the reducer function will be 1, because the element of index 0 is used as the starting value. As such it is typically a good index to give some kind of starting value for the array reduce method.

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

There is then taking a closer look at the reducer function that is given when it comes to the full scope of arguments to work with in each call of the render function. The set of arguments will differ a little from other functions that are given to other array prototype methods like array for each and array map. Often the first argument is the current value of the current element, but with array reduce the first argument is the current value of the accumulator value. After that it is then the current element value, followed by the element index, and then a reference to the source array that array reduce is called off of.

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

## 4 - Some use case examples of array reduce

So now that I thing I did an okay job of getting the simple, basic, and boring stuff out of the way I can not start getting into a few use case examples of the array reduce method.

### 4.1 - create a mean

One thing that comes to mind right away is to create a mean from an array of numbers.

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

Often I might want to create a sum from a single property of a standard object to which I have an array of.

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

So then the array reduce method is great for many little situations in which I might want to create a single simple value from an array of values. However there is a great number of other array prototype methods that also come into play, such as the [array for each method](/2019/02/16/js-javascript-foreach/) that is just a more generic way of just looping over all the elements of an array.
