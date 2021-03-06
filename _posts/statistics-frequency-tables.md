---
title: frequency tables in statistics
date: 2020-04-20 15:31:00
tags: [statistics]
layout: post
categories: statistics
id: 648
updated: 2021-03-06 15:09:23
version: 1.6
---

[Frequency tables](https://en.wikipedia.org/wiki/Frequency_distribution) are a way of groping various outcomes in a sample or population in statistics. That is when running threw a population, or a sample of a population of data there are going to be instances in that sample that meet a cretin criteria, and thus can be grouped in that criteria. Say for example you have a collection of grades for each student in a class, there is groping them by a letter grade, or by a number range. In any case the result is a table where all the students fall into each group, and there is a count for each group, such a table can often be called a frequency table.

There are many other ways of breaking down a large population of data down into smaller groups depending of course on the nature of the data. However a table is often a good way to go about displaying the data in general, in this post I will just be focusing in the concept of a frequency table though when it comes to just having two columns, one for some kind of thing to count, and the other for that count. When it comes to doing so, the data can then be used to find other things of interest such as percentages for each item that is being counted.

<!-- more -->

## 1 - Basic frequency tables example with javaScript

For  basic example of a frequency table there is some javaScript that has to do with a simple grades in a class example. For the sake of keeping this basic the population is just an array of letter grades, rather than objects with more detailed information for each test. To create a frequency table for this array of letter grades I just need to run threw the population and create a count for each letter grade.

```js
var makeFreqTable = function (grades) {
    var table = {};
    grades.forEach(function (grade) {
        table[grade] = table[grade] === undefined ? 1 : table[grade] += 1;
    });
    // return array of stat objects with grade
    // and count properties, and sort by count
    return Object.keys(table).map(function (key) {
        return {
            grade: key,
            count: table[key]
        }
    }).sort(function (a, b) {
        if (a.count > b.count) {
            return -1;
        }
        if (a.count < b.count) {
            return 1;
        }
        return 0;
    });
};
 
var grades = ['c', 'a', 'f', 'f', 'b', 'c', 'f', 'a', 'f', 'd'];
var table = makeFreqTable(grades);
 
console.log(table);
// [ { grade: 'f', count: 4 },
//   { grade: 'c', count: 2 },
//   { grade: 'a', count: 2 },
//   { grade: 'b', count: 1 },
//   { grade: 'd', count: 1 } ] 
```

The frequency table can the be used to figure all kinds of useful values about the outcome of this hypothetical test. For example I can run over the frequency table and create a new value for each group that is the count over the total number of students to get percentage value for each group.

## 2 - Conclusion

So that is it for now when it comes to frequency tables, I am sure that I will get around to creating additional examples that make use of this, and things like this in the future. tables in general are a great way to go about mapping out data, but often I think that it is best to create graphs, and scatter plots that make use of canvas elements and user interaction as a way to really get a solid idea of what is going on with some data.

When it comes to getting back into this topic of statistics it would seem that for now I am more interested in just creating all kind of examples of stochastic systems. Much of what I am learning with that can be applied to my canvas examples that I like to work on the best. Subject such as frequency tables I am sure are an example of something that will come up now and then, but for now I am most interested in what can be used in the process of creating some kind of actual product.

