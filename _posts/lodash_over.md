---
title: lodash over
date: 2019-04-02 09:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 410
updated: 2019-04-04 10:59:59
version: 1.8
---

In this post I will be taking a look at the [lodash \_.over](https://lodash.com/docs/4.17.11#over) method. This method can be used to create a function that calls an iteratee function with all the arguments that are given to it returns the result. It might prove useful in some situations so lets take a quick look.

<!-- more -->

## 1 - lodash over

The idea here is that if I have more than one method that has uniform arguments, and I want a method that will return and array of results for all of them, then the \_.over method can be used to do just that. I just call the \_.over method and pass in an array of the methods that I want to be used.

```js
let _ = require('lodash');
 
let a = (x, y) => {
    return x + y;
},
b = (x, y) => {
    return x * y;
}
 
let c = _.over([a, b])
 
console.log( c(10,2) ); // [12,20]
```

In the above example I have two methods that accept an x and y variable in the same order, one just adds and the other just multiplies them. Passing references to each of these methods in an array to the \_.over method results in a new method that when used will return an array of results for each method.


## 2 - The arguments object, closure, and Pow N example

When it comes to making a method for \_.over the arguments object might be of interest, as well as closures. I will not be getting into the nature of the arguments object in detail as I have all ready [wrote a post on it](/2019/01/21/js-javascript-arguments-object/), same is true of [closures](/2019/02/22/js-javascript-closure/). I will mention that the arguments object is useful when you want to design a method that will accept a variable number of arguments.

```js
let powN = function (n) {
    return function () {
        let nums = [],
        len = arguments.length,
        i = 0;
        while (i < len) {
            nums.push(Math.pow(n, arguments[i]))
            i += 1;
        }
        return nums;
    };
};
 
let pow2n4 = _.over([powN(2),powN(3)]);
 
console.log(pow2n4(2, 4));
// [ [ 4, 16 ], [ 9, 81 ] ] 
```

## 3 - Vanilla js alternatives to lodash \_.over

```js
let over = function (funcs) {
    return function () {
        let result = [];
        funcs.forEach((func) => {
            result.push(func.apply(null, Array.from(arguments)));
        });
        return result;
    }
};
 
let a = (x, y) => {
    return x + y;
},
b = (x, y) => {
    return x * y;
},
c = over([a,b]);
 
console.log( c(10,2) ); // [12,20]
```