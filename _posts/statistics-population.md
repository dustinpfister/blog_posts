---
title: Statistical population javaScript examples
date: 2020-04-08 16:25:00
tags: [statistics]
layout: post
categories: statistics
id: 643
updated: 2021-03-06 15:00:50
version: 1.5
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

## 1.2 - Generate a random population, and look at subpopulations

If I make a method that can be used to generate a very large population of numbers between 1 and 6 that might lead to some interesting things when it comes to taking sub populations from that collection. I would assume that at some point the mean of a smaller sub population could be used estimate the mean of the total population with a fair degree of accuracy.

```js
// generate a 'random' population
let genRandomPopulation = (popSize) => {
    popSize = popSize === undefined ? 100 : popSize;
    let pop = [],
    i = popSize;
    while (i--) {
        pop.push(Math.floor(Math.random() * 6) + 1);
    }
    return pop;
};
 
// get the mean of the given population or sample
let getMean = (pop) => {
    return pop.reduce(function (acc, n) {
        return acc + n;
    }) / pop.length;
};
 
let getSample = (pop, si, sampSize) => {
    let len = pop.length;
    sampSize = sampSize === undefined ? len : sampSize;
    si = si === undefined ? len - sampSize : si;
    let ei = si + sampSize;
    return pop.slice(si, ei);
}
 
let pop = genRandomPopulation(100000);
 
console.log(getMean( getSample(pop, 0, 10000) ));
console.log(getMean( getSample(pop, 250, 10000) ));
console.log(getMean( getSample(pop, 3500, 10000) ));
console.log(getMean(pop));
 
/*
Example output
3.5104
3.5109
3.5012
3.49523
*/
```

taking a look at a few sub populations of generated populations of random numbers using the javaScript built in Math.random method it looks like my assumption is not so far off. Some times a smaller population of the whole can be used to get a fair idea of that the situation would be with the whole population. However I would not always assume that would be the case of course, in other examples there might be things going on that could be skewing the results when looking at smaller subsets of a population of data.

## 2 - Conclusion

For the most part when it comes to working with some real data, one example of that would be all the content that I have wrote for this website thus far. I have wrote a few posts that add up things like the site wide total word count, when doing something to that effect that would be an example of working with the full population of data. However I also like to have things broken down my category, and when it comes to that word count total, that would be an example of a sample population.
