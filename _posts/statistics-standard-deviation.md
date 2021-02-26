---
title: Finding Standard Deviation in javaScript
date: 2018-02-20 13:05:00
tags: [js,statistics]
layout: post
categories: statistics
id: 155
updated: 2021-02-26 14:39:15
version: 1.2
---

In [Statistics](https://en.wikipedia.org/wiki/Statistics) it seems like [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) is something that comes up often. So why not just go ahead and cover this one when it comes to launching my new series of posts on working with statistics in javaScript.

JavaScript might not be the ideal lanague for this sort of thing compared to some other programing lanagues, for example in python there is a built in standard library that contains a [statistics library with several standard deviation](/2021/02/26/python-standard-library-statistics/) methods. However if I just research what the propper expressions are, it is not too time consuming to come up with my own simple copy and paste methods for many statistcs related tasks in a javaScript enviorment.

<!-- more -->

## 1 - The Arithmetic mean

In order to find out what the standard deviation of a data set is, I first must know the arithmetic mean of the data set. Arithmetic mean is just a more formal way of referring to an average, when you really get into statistics you will find that there is more than one mean, so it is important to know which mean we are talking about.

```js
// Arithmetic mean
let getMean = function (data) {
    return data.reduce(function (a, b) {
        return Number(a) + Number(b);
    }) / data.length;
};
```

So yes I just need some kind of method to add up all the numbers in a data set, and then divide by the number of numbers in the set to get a mean.
 
## 2 - The standard deviation method
 
Once I have my mean method I can use that to create a standard deviation method. The process involves adding up a sum, the values of which are the square of the difference when subtracting a number in the set by the mean. Once I have this sum I just need to divide the sum by the number of numbers in the set minus one, and get the square root of that result.

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

This is just one of several kinds of standard deviation though, in the python statistics stndard library this seems to be refered to as the [sample standard deviation](https://docs.python.org/3.7/library/statistics.html#statistics.stdev) which is just the square root of the sample variance.
