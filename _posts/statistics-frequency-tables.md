---
title: frequency tables in statistics
date: 2020-04-20 15:31:00
tags: [statistics]
layout: post
categories: statistics
id: 648
updated: 2020-04-20 15:34:06
version: 1.0
---

Frequency tables are a way of groping various outcomes in a sample or population in statistics.

<!-- more -->

## 1 - Basic frequency tables example with javaScript

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