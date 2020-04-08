---
title: Statistical population javaScript examples
date: 2020-04-08 16:25:00
tags: [statistics]
layout: post
categories: statistics
id: 643
updated: 2020-04-08 16:49:48
version: 1.2
---

A [Statistical population](https://en.wikipedia.org/wiki/Statistical_population) is not always what the name might suggest. A Statistical population could be census data, however it could also be just about any collection of standard data in general actually. Much of what is done in statistics involves at least some kind of collection of data, in some kind of standard from. Things are then drawn from that population of data than can then be used to make sense of it.

For example say you have a population of data that is a collection of objects, and each object represents certain properties of a Blog post on a website. The properties might be the total word count of the post, the subject, how much traffic it received, and how much money it made over a certain uniform time period. There would then be all kinds of additional code that can be used to pull samples from that collection of objects, and generate other populations of objects that might contain the average amount of money made per word per post collection for example. The results can then be presented in the from of graphs, sorted indexes, and any other means to help paint a picture of what is working, and what is not. Knowledge of the results can then be used to make informed derisions when it comes to what to write about next, and what content might need additional attention when  it comes to editing and promotion.

<!-- more -->

## 1 - The very basics of Statistical population and javaScript

To get started with something that is very simple, a population does not need to be a lengthly database that has to do with blog post metrics, or any kind of complicated real world problem. it could just be a collection of numbers that have to do with instances of the roll of a single six sided die.

```js
let getMean = (data) => {
    return data.reduce(function (acc, n) {
        return acc + n;
    }) / data.length;
};
 
let pop = [3,6,2,5,2,6,6,5,4,6];
let mean = getMean(pop);
 
console.log(mean); // 4.5

```

here I have a very basic example of what might be considered a population that is just an array of numbers ranging from 1 to 6. I then just use a simple get mean method to get an average of the total population. However a thought has just occurred, what if I had a really large population of say one hundred thousand or more numbers between 1 and 6? There would be getting the mean of the whole population, but there would also be getting the mean of a smaller sub population or sample of the large collection. If so would a small sub population be helpful when trying to estimate the average of the whole population?