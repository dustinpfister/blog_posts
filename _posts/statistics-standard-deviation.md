---
title: Finding Standard Deviation in javaScript
date: 2018-02-20 13:05:00
tags: [js,statistics]
layout: post
categories: statistics
id: 155
updated: 2021-03-05 09:14:18
version: 1.5
---

In [Statistics](https://en.wikipedia.org/wiki/Statistics) it seems like [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) is something that comes up often. In Statistics standard deviation is a way to go abound mesuring the variation or dispersion of a collection of values when it comes to some data. For example take the set of numbers \[50,51\], and compare them to \[49, 89\]. It would go without saying that the numbers \[50,51\] are closer togeather than \[49, 89\], but how should one go about mesuring that? Standard deviation is one way to go about doing just this, but there are of course many ways of going about doing so, and even when it comes to Standard deviation it would seem that it is not so Standard actually as it would apear that there is more than one standard for Standard deviation actually.

JavaScript might not be the ideal language for this sort of thing compared to some other programing languages, for example in python there is a built in standard library that contains a [statistics library with several standard deviation](/2021/02/26/python-standard-library-statistics/) methods. However if I just research what the proper expressions are, it is not too time consuming to come up with my own simple copy and paste methods for many statistics related tasks in a javaScript environment. While I am at it I might get around to working out some additional related code examples when it comes to just working various things out with a set of numbers. I think in order to really undertsand what is going on with this I should work out some kind of visual thing becuase that just  seems to be the best way that learn about these things speaking from my experence.

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

This is just one of several kinds of standard deviation though, in the python statistics standard library this seems to be referred to as the [sample standard deviation](https://docs.python.org/3.7/library/statistics.html#statistics.stdev) which is just the square root of the sample variance.

## 3 - Conclusion

That is it for now when it comes to standard deviation in a javaScript environment, in time I might get around to editing this post to expand it with additional methods for getting standard deviation and variance. However what I think I need to do first and formost is start working on one or two projects where I am actually using these methods in the project.
