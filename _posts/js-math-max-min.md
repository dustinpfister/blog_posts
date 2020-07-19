---
title: Math max and min methods in javaScript
date: 2020-01-22 20:57:00
tags: [js]
layout: post
categories: js
id: 595
updated: 2020-07-19 08:51:22
version: 1.11
---

In core javaScript there is the [Math max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) and [Math min](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) methods that can be used to find the highest and lowest numbers in a set of numbers. The methods work by passing the set of numbers as arguments, but it is also possible to use an array by making use of the [apply function prototype method](/2017/09/21/js-call-aplly-and-bind/). The apply method can be called off of the Math.max or min method as it is a function prototype method, and then a null value can be given as the first argument, along with the array of numbers, more on that later.

The Math min and max methods can help save me from having to loop over the contents of an array to find the lowest or highest number in a array of numbers. The task of doing this does come up now and then when working out solutions for certain things that require the lowest and highest numbers in a collection of numbers. So lets take a look at some some examples, and a few additional use case examples of Math min and max.

<!-- more -->

## 1 - Math min basic example

The Math min and Math max methods work by passing numbers as arguments to the methods and then the smallest or largest number that is passed is returned by the method. So if i give the Math min method the numbers 3, 0, and -7 as arguments then the number -7 is what will be returned.

```js
var min = Math.min(3, 0, -7);
console.log(min); // -7
```

Although this simple example works out okay for what it is, when it comes to any kind of real code example such code examples will often involve an array of values, and likely never a set of static number literals. So lets look at some more examples of using these methods to get the lowest and highest numbers in a collection of numbers in javaScript.

## 2- Using the apply function prototype method

If you are not familiar with the function apply prototype method yet as well as other such methods such as call and bind, now would be a good time to look into them. I will not be getting into these methods in depth here as I have written a post before hand in which I do so. However here is a simple example if using the apply function prototype method with Math min and max to get the lowest and highest numbers in an array of numbers.

```js

var nums = [7, -4, 0, 8, 12, -2];
 
console.log( Math.min.apply(null, nums) ); // -4
console.log( Math.max.apply(null, nums) ); // 12
```


## 3 - Range, as well as mean, median, sum

So there are many things than can be done with a set of numbers of course. However with the Math min and max methods one of the most common typical use case examples is to get the range of a set of numbers. For convenience in this section I will also be going over some examples of sum, mean, and median in this section also.

### 3.1 - Get the range of a set of numbers

So making a get range method with Math min, and Math max would involve just using the methods along with function apply to get the min and max numbers of a set of numbers. Then I just need to have the function return the max number less the min number.

```js
// range
var getRange = function(nums){
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums);
    return max - min;
};
```

## 3.2 - Median, sum, and mean

So the range of a set of numbers is often just one value of interest along with a bunc of other typical values such as mean, median, and sum.

```js
// median
var getMedian = function (nums) {
    var half = Math.floor(nums.length / 2);
    nums.sort();
    return nums.length % 2 ? nums[half] : (nums[half - 1] + nums[half]) / 2;
};
 
// sum
var getSum = function (nums) {
    var i = nums.length,
    sum = 0;
    while (i--) {
        sum += nums[i];
    }
    return sum;
};
 
// mean
var getMean = function (nums) {
    return getSum(nums) / nums.length;
};
 
// get everything
var getEverything = function (nums) {
    var e = {};
    e.min = Math.min.apply(null, nums);
    e.max = Math.max.apply(null, nums);
    e.range = getRange(nums);
    e.median = getMedian(nums);
    e.sum = getSum(nums);
    e.mean = getMean(nums);
    return e;
};
 
var nums = [1, 2, 4, 7];
 
var e = getEverything(nums);
 
console.log(e.median); // 3
console.log(e.min, e.max); // 1 7
console.log(e.range); // 6
console.log(e.sum); // 14
console.log(e.mean); // 3.5
```


## 4 - Number normalization example of Math.min and Math.max

One use case example of Math.min and Math.max might be to make a method that is used to normalize numbers relative to a range between the min and max number. This sort of thing is often used as a way to normalize points for example so they can then easy be scaled upwards.

```js
var normalizeNums = function (nums) {
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums),
    range = max - min;
    return nums.map(function (n) {
        return n / range;
    });
};
 
var nums = [-37, 5, 42, 30, 43, 120, -40, 160];
console.log( normalizeNums(nums) );
// [ -0.185, 0.025, 0.21, 0.15, 0.215, 0.6, -0.2, 0.8 ]
```
