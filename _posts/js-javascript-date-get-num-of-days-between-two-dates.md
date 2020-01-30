---
title: Getting the number of days between two javaScript dates.
date: 2020-01-30 17:22:00
tags: [js]
layout: post
categories: js
id: 600
updated: 2020-01-30 17:28:34
version: 1.1
---

This will be a quick post on getting the number of days between two javaScript dates. Like most things like this it is important to look at more than one solution, so I will be taking a look at two to say then least. In addition I will break off into some additional examples and related topics that have to do with working with dates in javaScript so things post is not to thin.

<!-- more -->

## 1 - Getting the number of days between two dates, bu just subtracting and dividing

```js
var getDayDiff1 = function (d1, d2) {
    return ((d1 - d2) / 1000 / 60 / 60 / 24);
};
 
var d1 = new Date(2020, 0, 30),
d2 = new Date(2017, 1, 2);

var days = getDayDiff1(d1, d2);
console.log(days); // 1092
```