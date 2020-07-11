---
title: lodash over
date: 2019-04-02 09:22:00
tags: [js,lodash]
layout: post
categories: lodash
id: 410
updated: 2020-07-11 10:21:54
version: 1.12
---

In this post I will be taking a look at the [lodash \_.over](https://lodash.com/docs/4.17.11#over) method. This method can be used to create a function that calls one or more [iteratee functions](https://en.wikipedia.org/wiki/Iteratee#:~:text=In%20functional%20programming%2C%20an%20iteratee,in%20a%20purely%20functional%20fashion.) with all the arguments that are given to it via the function that is created with the lodash over method. The result that is returned is an array of values for each iteratee function that was passed when creating the method that was made with lodash over. 

So in other words if you have two or more methods that all accept the same arguments in the same order the lodash over method can be used to create a single method that will create an array of values where each value is the result of each of these methods. So then it might prove useful in some situations so lets take a quick look at a few examples of this lodash over method.

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

## 3 - Vanilla js alternative to lodash \_.over

So often it is not to hard to achieve a similar result with native javaScript in place of many lodash methods. Sometimes there is a direct native alternative to a lodash method, but other times there is not, or there is but it works a little differently. In any case if you are the kind of developer that has decided to kick lodash to the curb it is true that it is not to hard to do the same thing that the lodash \_.over method does with plain old native javaScript by itself.

### 3.1 - Making an over function

It is possible to install just a single lodash method by itself, often it seems like there is just that one method here or there when it comes to using lodash these days in conjunction with what is available natively. However it is also of course possible to write, or just copy and paste something like this:

```js
let over = function (funcs) {
    return function () {
        let result = [];
        funcs.forEach((func) => {
            result.push(func.apply(null, arguments));
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

The over method that I slapped together here is a good example of the power of closure. It is a method that returns a method that acts on something that is within another function level variable scope that is created when I call the over method and pass the methods I want it to use. It is also a good example of the Function.apply method as well that comes in handy often as well. If you are not up to speed with Function.call, apply, and bind be sure to [check out my post on that](/2017/09/21/js-call-apply-and-bind/), and write some examples, I find myself using them all the time.

