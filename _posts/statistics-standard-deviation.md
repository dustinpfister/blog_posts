---
title: Finding Standard Deviation in javaScript
date: 2018-02-20 13:05:00
tags: [js,statistics]
layout: post
categories: statistics
id: 155
updated: 2018-02-20 13:08:10
version: 1.1
---

In [Statistics](https://en.wikipedia.org/wiki/Statistics) it seems like standard deviation is something that comes up often. So why not just go ahead and cover this one when it comes to launching my new [series of posts]() on working with statistics in javaScript.

<!-- more -->

## The Arithmetic mean

In oder to find out what the standard deviation of a data set is, I first must know the arithmetic mean of the data set. Arithmetic mean is just a more formal way of referring to an average, when you really get into statistics you will find that there is more than one mean, so it is important to know which mean we are talking about.

```js
// Arithmetic mean
let getMean = function (data) {
    return data.reduce(function (a, b) {
        return Number(a) + Number(b);
    }) / data.length;
};
```

So yes I just need some kind of method to add up all the numbers in a data set, and then divide by the number of numbers in the set to get a mean.
 
## The standard deviation method
 
Once I have my mean method I can use that in my standard deviation method. The process involves adding up a sum, the values of which are the square of the difference when subtracting a number in the set by the mean. Once I have this sum I just need to divide the sum by the number of numbers in the set minus one, and get the square root of that result.

Did you get all that? Well in ether case this seems to work okay for me:
 
```js
// Standard deviation
let getSD = function (data) {
    let m = getMean(data);
    return Math.sqrt(data.reduce(function (sq, n) {
            return sq + Math.pow(n - m, 2);
        }, 0) / (data.length - 1));
};
```

