---
title: Math max and min methods in javaScript
date: 2020-01-22 20:57:00
tags: [js]
layout: post
categories: js
id: 595
updated: 2020-07-19 09:59:55
version: 1.16
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

So making a get range method with Math min, and Math max would involve just using the methods along with function apply to get the min and max numbers of a set of numbers. Then I just need to have the function return the max number less the min number. The returned result of the method would then be the range.

```js
// range
var getRange = function (nums) {
    var min = Math.min.apply(null, nums),
    max = Math.max.apply(null, nums);
    return max - min;
};
var arr = [-5, 10, 8, 3, 0];
console.log(getRange(arr)); // 15
```

Getting the range of a set of numbers if often just one step in getting some other value. For example say that I want an array of numbers between the range of 320, based off of values of an array of numbers that are of a lower or higher range. I can use the range to loop over the source array of numbers and divide each value by the range of the source array, then multiply by 320 to get those values.

## 3.2 - Median, sum, and mean

So the range of a set of numbers is often just one value of interest along with a bunch of other typical values such as mean, median, and sum. There is having just one of these methods in a stand alone state of sorts, and then there is making what might be the beginnings of a utility library of sorts. For now lets just start out with some stand alone methods for all of these. I can then have a single method that will return an object that will give me everything there is that I would want with an array of numbers ore or less when it comes to just these few things at least.

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

There is more than one way to go about making a sum method, in this example I used a while loop to just loop over and add up the numbers. Other solutions might involve the use of the array reduce method, however getting into that might be off topic here. The thing about this is that I have a method that will give me all the basics when it comes to things of interest with a set of numbers, but not everything. 

One additional thing is to have a normalized set of numbers for the array of numbers, so lets look at an example of that. In addition it might be nice to get into some actual examples that make use of all of this to do something interesting, so lets start getting into the good stuff with this.


## 4 - Number normalization example of Math.min and Math.max

One use case example of Math.min and Math.max might be to make a method that is used to normalize numbers relative to a range between the min and max number. This sort of thing is often used as a way to normalize points for example so they can then easy be scaled up by just multiplying the normalized value by a scale.

This can be done by using the Math.min method to get the lowest number, then Math.Max to get the highest, and with that the range of course. Once I have the range I can then use the array map method to map over the array of numbers and create and return a new array where each value is divided over the range.

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

## 5 - Working with an array of Objects

So now that we have figures out how to go about normalizing a set of numbers, lets see about working with an array of objects Say I have an array of points in the form of an array of objects where each object has an x and y property. I want to get the lowest and highest values for each axis in the set of points. For this one again the array map method can come in handy for getting all values of interest with that.

```js
// get an array of numbers from a set of objects
var getAxisValues = function (points, axis) {
    axis = axis === undefined ? 'x' : axis;
    return points.map(function (obj) {
        return obj[axis];
    });
};
 
// get low or high
var getLorHofAxis = function (points, axis, minMax) {
    axis = axis === undefined ? 'x' : axis;
    minMax = minMax === undefined ? 'min' : minMax;
    return Math[minMax].apply(null, getAxisValues(points, axis));
};
 
var points = [{x: 20, y: 35},{x: -15, y: 83},{x: 7, y: 0}],
xLow = getLorHofAxis(points),
yHi = getLorHofAxis(points, 'y', 'max');
console.log(xLow); // -15
console.log(yHi); // 83
```

## 6 - Conclusion

So the Math.min and Math.max methods re nice little methods for getting the lowest and highest value of two or more numbers. They have to be given via arguments when calling it, but apply can be sued as a way to just go ahead and use an array of numbers. There are all kinds of other values that come to mind that can then be obtained when you have both the lowest and highest numbers such as a range, or a mean.