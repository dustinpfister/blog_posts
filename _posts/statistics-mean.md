---
title: More than one mean however for the most part there is just one
date: 2018-02-19 18:40:00
tags: [js,statistics]
layout: post
categories: statistics
id: 154
updated: 2021-03-01 18:24:28
version: 1.7
---

I am always looking for new things to learn, and write about, in the process of doing so I have decided to write a few posts on statistics. From what I have gathered data science is getting pretty hot these days, and companies can not seem to find enough people, so I started looking into what I need to know to start going in that direction. Turns out there is a lot to know in order to hack it as a data scientist, a whole lot of heavy math is involved, but I am down for giving it a try at least.

This is what has lead me to reading a whole bunch of Wikipedia articles the relate to the subject of statistics, one of which is the article on what a [mean](https://en.wikipedia.org/wiki/Mean). A mean is more or less another word for an average and for most of us we know that an average is just the sum of a set of numbers divided by the number of numbers. So one would think that this topic id fairly simple, and as such I can just get back up to something that I learned in grade school and move on. However it turns out that doing so is not that simple, the kind of average that I described just now is called an Arithmetic mean, and there are at least two other kinds of means that I am aware of these far.  So even when it comes to a mean it turns out that there is more than one, and as such this subject can get a little involved.

So in this post I will just be outlining the various kinds of means that I will end up running into if I start teaching myself more about statistics.

<!-- more -->

## 1 - Arithmetic mean

So it turns out that what it is that I have always considered the one and only mean is actually more accurately called the [Arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean). This is of course what you get when you add up a bunch of numbers, and divide by the number of numbers.

```js
let data = [1,2,3,4];
 
let mean = data.reduce(function(acc,n){
 
   return acc + n;
 
}) / data.length;
 
console.log(mean); // 2.5
```

This is still what is used most often, and is in fact generally what a mean is, however there is also geometric mean as well.

## 2 - Geometric mean

There is adding up all the numbers in a data set, and then there is multiplying all of them, which of course can result in a munch larger number compared to the sum that is a result of finding an arithmetic mean called a product. This product is then not divided, but [nRoot](https://en.wikipedia.org/wiki/Nth_root) is used instead to find a geometric mean.

```js
let data = [1,2,3,4];
 
let mean = Math.pow(data.reduce(function(acc,n){
 
   return acc * n;
 
}),1 / data.length);
 
console.log(mean); // 2.21336
```

## Conclusion

There is also [Harmonic mean](https://en.wikipedia.org/wiki/Harmonic_mean), but I have not looked into that one just yet. It would also be nice to create at least a few examples that make use of the various kinds of means in order to gain a better understanding of what situations call for what kinds of means.

As much as I love javaScript when it really comes to getting into statistics and data science python is the language that is typically used, more so than R at least these days. When it comes to using python as a way to start to learn about statistics there is a built in [standard library in python that has to do with statistics that includes methods for the various types of means](/2021/02/26/python-standard-library-statistics/).