---
title: Getting the number of days between two javaScript dates.
date: 2020-01-30 17:22:00
tags: [js]
layout: post
categories: js
id: 600
updated: 2020-01-30 17:44:23
version: 1.4
---

This will be a quick post on getting the number of days between two javaScript dates. Like most things like this it is important to look at more than one solution, so I will be taking a look at two to say then least. In addition I will break off into some additional examples and related topics that have to do with working with dates in javaScript so things post is not to thin.

<!-- more -->

## 1 - Getting the number of days between two dates, bu just subtracting and dividing

A simple way to go about getting this done right away would involve just subtracting an older date from a newer date. After doing this I will end up with a number of milliseconds between the two dates. From there it is just a matter of dividing by one thousand to get seconds, and then sixty to get minutes, sixty again to get hours, and then twenty four to get days.

```js
var getDayDiff1 = function (d1, d2) {
    return ((d1 - d2) / 1000 / 60 / 60 / 24);
};
 
var d1 = new Date(2020, 0, 30),
d2 = new Date(2017, 1, 2);

var days = getDayDiff1(d1, d2);
console.log(days); // 1092
```

## 2 - An overly complex solution that involves looping, and getting the number of days in a month

In this section I will be going over a more complicated way of doing the same thing. This solution involves a trick that can be used to get the number of days in a month, by adding one to the month argument, and setting zero as the day of the month, resulting in getting the last day of the current month. From there the get date method can be used to get the number of days in a month. With this it is just a matter of doing so for all months of interest, tabulating the number of days for each month, and then just adding and subtracting days to adjust with what is going on with the day of the month of the two date objects.

```js
var getDaysInMonth = function (y, m) {
    var d = new Date(y, m);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};
 
var getDayDiff2 = function (d1, d2) {
    var y = d2.getFullYear(),
    m = d2.getMonth(),
    d = d2.getDate(),
    days = getDaysInMonth(y, m);
    do {
        m = Number(m) + 1;
        if (m >= 12) {
            m = 0;
            y = Number(y) + 1;
        }
        days += getDaysInMonth(y, m);
    } while ((y + '.' + m != d1.getFullYear() + '.' + d1.getMonth()));
    return days - d2.getDate() - (getDaysInMonth(d1.getFullYear(), d1.getMonth()) - d1.getDate());
};
 
var d1 = new Date(2020, 0, 13),
d2 = new Date(2017, 1, 2);
 
var days = getDayDiff2(d1, d2);
console.log(days); // 1092
```