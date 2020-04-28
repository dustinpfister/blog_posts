---
title: frequency tables in statistics
date: 2020-04-20 15:31:00
tags: [statistics]
layout: post
categories: statistics
id: 648
updated: 2020-04-27 21:13:26
version: 1.3
---

[Frequency tables](https://en.wikipedia.org/wiki/Frequency_distribution) are a way of groping various outcomes in a sample or population in statistics. That is when running threw a population, or a sample of a population of data there are going to be instances in that sample that meet a cretin criteria, and thus can be grouped in that criteria. Say for example you have a collection of grades for each student in a class, there is groping them by a letter grade, or by a number range. In any case the result is a table where all the students fall into each group, and there is a count for each group, such a table can oftetn be called a frequency table.

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