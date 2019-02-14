---
title: javaScript Date.
date: 2019-02-14 09:33:00
tags: [js]
layout: post
categories: js
id: 380
updated: 2019-02-14 11:57:03
version: 1.1
---

The javaScript Date constructor can be used to create Date objects that represent a single moment in time. In javaScript date objects use [Unix time](https://en.wikipedia.org/wiki/Unix_time), A system of time based on a number of seconds passed a fixed point in the past. In this post I will be covering some of the basics of javaScript Dates as well as maybe some more advanced related topics as well centered around time. 


<!-- more -->

## 1 - javaScript Date

To create a javaScript Date object all that needs to happen is to call the Date constructor with the new keyword to gain an instance of Date. What will be returned as a result of this will be an object that is an instance of the Date constructor, and as such there is a great number of prototype methods that can be used with the instance of date.

```js
let d = new Date(2019,1,14);
console.log(typeof d); // 'object'
console.log(d.constructor.name); // 'Date'
console.log(d.toDateString()); // 'Thu Feb 14 2019'
```

When calling the Date constructor it is possible to supply one or more arguments to the constructor that can be used to set the point in time in which the date object represents. When supplying two or more arguments like in the example above the first argument is a full year, and the second argument is a zero relative month of that year, followed by the day of the month and so forth. However there are many other options as well to set a date, more on that later.