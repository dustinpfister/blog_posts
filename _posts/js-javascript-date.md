---
title: javaScript Date.
date: 2019-02-14 09:33:00
tags: [js]
layout: post
categories: js
id: 380
updated: 2019-02-14 12:20:56
version: 1.3
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

## 2 - javaScript Dates set from millisecond time stamp

When creating a Date object with a single argument if the single argument is a number that argument is treated as a number of milliseconds that has passed sense the first of January 1970, as the nature of unix time is based off that date in time.

### 2.1 - Setting a value of zero

When setting a value of zero the values that are received when using a Date prototype method such as todateString might not end up being what is expected. This is because of time zones, for example I am dealing with Eastern Standard Time where I live so there is a three hundred minute offset.

```js
let z = new Date(0);
console.log( z.toDateString() ); // Wed Dec 31 1969
console.log( z.getTime()); // 0
console.log( z.getTimezoneOffset()); // 300
```