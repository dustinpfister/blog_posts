---
title: The array find method and alternatives in vanilla javaScript
date: 2021-07-19 11:13:00
tags: [js]
layout: post
categories: js
id: 913
updated: 2021-07-19 15:15:05
version: 1.18
---

A long time ago I wrote a post on the [lodash find](/2017/09/14/lodash-find/) method that is a way to go about finding a single element in an array. Lodash might still not be a dead library just yet, but I have to say that for the most part I am just making use of native javaScript features to do much of what can be done with lodash. One such method that might come to mind is the [native array find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method of the array prototype I native javaScript. In many respects this is just like the lodash fine method. There may be some talking points as to why the native array find method might not be a drop in replacement for the loadash fine method with respect to all use case scenarios. However there are many other native javaScript features that can be used to even over come those other situations in which the lodash fine method will work where the native array find method will not.

There is also not just the question of using the native array find method or the lodash fine method, there are many other lodash method of course, and there are also many tools to work with in core javaScript also. Most of the time I can not say that I use the find methods if any kind to find something actually oddly enough. There is also many other lodash methods such as the lodash filter method, as well as the native array filter method that can also be used to find not just the first element, but all elements that meet a condition. There is also the question of how to go about sorting the results of what I get from filtering an array. So in this post I will be touching base on the array find method, but I will also be looking into what other methods there are to work with when it comes to finding something.

<!-- more -->

## 1 - Basic examples of the array find method

To start out with there is just playing around with a few basic examples of the array find method. So in this section I will just be doing just that with some basic examples that just involve finding the first value in an array from left to right with the array find method. The focus here will just be on the array find method for the most part, and keeping the examples fairly simple. Alter in this post I will be getting into some alternatives array methods and features in javaScript that might prove to also be useful ways to go about finding something in an array.

### 1.1 - Simple array find numbers example

In this example I am using the array find method to just fine the first number in an array that is greater than 2.

```js
// and array of numbers
var a = [1, 2, 3, 4, 5, 6, 7];
 
var b = a.find(function (n) {
        return n > 2;
    });
console.log(b); // 3
```

### 1.2 - The arguments used in the call back function

When writing the call back function that will be passed to the array find method there are a number of arguments that will be available in the body of the call back function. The first argument is the current value of an element in the array, the second is that values index in the array, and the final argument is a reference to the array itself.

```js
// and array of numbers
var a = [1, 2, 3, 4, 0, 0, -4, -2, 0, 2, 4, 6, 8];
 
var result = {
    source: null,
    el: []
};
var b = a.find(function (n, i, arr) {
        result.source = arr;
        if (i >= 5) {
            result.el.push({
                index: i,
                n: n
            });
            return n > 2;
        }
        return false;
    });
console.log(result);
/*
{
    source: [1, 2, 3, 4, 0, 0, -4, -2, 0, 2, 4, 6, 8],
    el: [
        { index: 5, n: 0},
        { index: 6, n: -4},
        { index: 7, n: -2},
        { index: 8, n: 0},
        { index: 9, n: 2},
        { index: 10, n: 4}
    ]
}
 
*/
console.log(b); // 4
```

## 2 - Some alternative methods, and javaScript features, that can be used to help find something

So now that I covered the basics of the array find prototype method it now might be a good idea to look into some alternative ways to go about finding something in an array in native javaScript. The array find method will work okay for what it is intended for, but it does have its limitations. For example some times I might not just want to find the element that will meet a condition from left to right in an array, some times I might want to do the same but from the right to the left. Also often I might not just want to find one element, but all elements that meet a given condition. Also there may be times where I will not just want to get an element, or a collection of elements, but sort an array by way of a condition. That way the first element in the array would be the best fit, followed by the second runner up, and so forth.

### 2.1 - The array filter method

If I want to get not just one element, but all elements that meet a condition I can use the [array filter](/2020/10/03/js-array-filter/) method.

```js
// and array of numbers
var a = [1, 2, 3, 4, 5, 6, 7];
 
var cb = function (n) {
    return n > 2 && n < 6;
};
// find will just give the first result moving from left to right
var b = a.find(cb);
console.log(b); // 3
 
// so filter can be used also
var c = a.filter(cb);
// the first index will hen be the same result
console.log(c[0]); // 3
// however I can also get the full collection of elements that meet
// the conditions of the expresion used in the callback
console.log(c); // [3, 4, 5]
```

### 2.2 - Using array reverse to change the direction from which to find something

Say I want to use the array find method as it will work just fine, but I just want to reverse the order in which the array find method works. For this the array reverse method can reverse the order of all the elements, and then it will get the first element that will meet the condition from what was the end of the array before hand.

```js
var cb = function (n) {
    return n > 2 && n < 6;
};
 
// and array of numbers
var a = [1, 2, 3, 4, 5, 6, 7];
 
// the array reverse method would be one way
var b = a.reverse().find(cb);
console.log(b); // 5
```

### 2.3 - Find the biggest and smallest numbers with Math min and max methods combined Function.apply

The [Math.max and Math.min methods](/2020/01/22/js-math-max-min/) of the Math object can be used as a way to go about finding the largest, or smallest number in an array when using with the [apply function prototype method](/2017/09/21/js-call-apply-and-bind/). To do this I just need to pas something like null as the value for the value of this when calling the apply method off of the Math.max, or Math.min method, and then the array as the second argument for the apply method.

When it comes to finding the smallest value for an array of objects I will want to do something to create an array of numbers that I can then pass to one of these math methods. Doing something with the [array map](/2020/06/16/js-array-map/) method can be done to furnish such an array from an array of objects.

```js
// and array of numbers
var a = [3, 3, 0, 12, 0, -7, 37, 2];
var max = Math.max.apply(null, a),
min = Math.min.apply(null, a);
console.log(max); // 37
console.log(min); // -7
 
// an array of objects
var objs = [
    {x: 0, y: 1},
    {x: 23, y: 3},
    {x: -3, y: 2},
    {x: 7, y: 4}
];
var findMaxMinProp = function(objs, prop, maxMin){
    return Math[maxMin].apply( null, objs.map(function (obj) {
        return obj[prop];
    }));
};
console.log( findMaxMinProp(objs, 'x', 'min') ); // -3
console.log( findMaxMinProp(objs, 'x', 'max') ); // 23
console.log( findMaxMinProp(objs, 'y', 'min') ); // 1
console.log( findMaxMinProp(objs, 'y', 'max') ); // 4
```

### 2.4 - The array sort method to change the order of the whole array where the first element is the best match

```js
var sorter = function (a, b) {
    if (a > b) {
        return -1
    }
    if (a < b) {
        return 1;
    }
    return 0;
};
 
// and array of numbers
var a = [3, 3, 0, 12, 0, -7, 37, 2];
 
// if I want to find the greatest number
var b = a.sort(sorter);
console.log(b[0]); // 37
// sort will also mutate the array in place and make each elements
// be in order based on the conditions in the sorter function
console.log(a); // [ 37, 12, 3, 3, 2, 0, 0, -7 ]
```

## 3 - Conclusion

The array fine method is then one way to go about finding one element in an array that will match a given condition in the from of an expression in a call back function. However there are many other methods and features that can also be used to get the first element, as well as all the elements that meet a condition. There are also ways of going about creating a whole new array from a source array, creating values that will be used as a kind of score, and then sorting the new array by that score or index value.

