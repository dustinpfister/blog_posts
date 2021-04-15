---
title: The javaScript Date Constructor.
date: 2019-02-14 09:33:00
tags: [js]
layout: post
categories: js
id: 380
updated: 2021-04-15 14:35:24
version: 1.16
---

The [javaScript Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) constructor can be used to create Date objects that represent a single moment, or time stamp at a point in the past, the current time, or the future. SO then the Date constructor is the first go to method for working with time in a javaScript programing environment.

The Date object is an example of a [constructor function](/2019/02/27/js-javascript-constructor/) meaning that it is a function that can be used to create a class of an object that has prototype object methods that can be called off of an instance of the Class object. When it comes to date objects as one would expect there are a whole bunch of methods that have to do with getting the number of seconds, minutes, and hours many many other such values from such a class object.

In javaScript date objects use [Unix time](https://en.wikipedia.org/wiki/Unix_time), A system of time based on a number of seconds passed a fixed point in the past. In this post I will be covering some of the basics of javaScript Dates as well as maybe some more advanced related topics as well centered around time. 


<!-- more -->

## 1 - javaScript Date

To create a javaScript Date object all that needs to happen is to call the Date constructor with the new keyword to gain an instance of Date. Once that is done the result that will be returned will be an object that is an instance of the Date class and as such there will be a whole bunch of date prototype methods that can be used with that date instance object. Many of these methods have to do with getting a certain kind of value from the date instance, such as the day of the month it works out to, many others have to do with formating and so forth.


```js
let d = new Date(2019,1,14);
console.log(typeof d); // 'object'
console.log(d.constructor.name); // 'Date'
console.log(d.toDateString()); // 'Thu Feb 14 2019'
```

When calling the Date constructor it is possible to supply one or more arguments to the constructor that can be used to set the point in time in which the date object represents. When supplying two or more arguments like in the example above the first argument is a full year, and the second argument is a zero relative month of that year, followed by the day of the month and so forth. However there are many other options as well to set a date, more on that later.

## 2 - Creating a javaScript Date from a number or millisecond time stamp

When creating a Date object with a single argument if the single argument is a number that argument is treated as a number of milliseconds that has passed sense the first of January 1970, as the nature of unix time is based off that date in time. This is useful for creating new date objects from a number value that is the result of operations that resolve to such a value which can come up from time to time. The value must be a number data type though rather than a string, as that will be recognized as a year.

### 2.1 - Setting a value of zero

When setting a value of zero the values that are received when using a Date prototype method such as todateString might not end up being what is expected. This is because of time zones, for example I am dealing with Eastern Standard Time where I live so there is a three hundred minute offset. So there is the get time method, but then there is also the get time zone offset method as well that can be use as a way to adjust for these inconstancies.

```js
let z = new Date(0);
console.log( z.toDateString() ); // Wed Dec 31 1969
console.log( z.getTime()); // 0
console.log( z.getTimezoneOffset()); // 300
```

## 3 - Creating a javaScript Date from a string, or two or more values

So if the first value given to the date constructor is a string that can be treaded as a year rather than a ms time stamp. Also there is creating a javaScript Date from two or more arguments. In this section I will be going over some of the other options when it comes to creating a javaScript date from a value or set of values other hen that of a number that is a number of milliseconds past January 1 1970 as I did in the previous section.

### 3.1 - Using a dateString rather than a number

It is not a good idea to just pass a string as the first argument and expect it to work on all platforms. There are many different formats both standard and not so standard, and not a platforms will support all formats. So in some cases it will work as expected on one platform, but not on another.

So it is generally a good idea to parse a date string manually and feed the date constructor a number as the first argument or use two or more arguments.

```js
// date created with the number 2019
let d1 = new Date(2019),
// date created with the string '2019'
d2 = new Date('2019');
console.log(d1.toDateString()); // Wed Dec 31 1969
console.log(d2.toDateString()); // Mon Dec 31 2018
```

### 3.2 - Two or more arguments

When setting from two or more arguments the first argument is the full year followed by the zero relative month of the year and then so on all the way to milliseconds.
```js
let d = new Date(2009,1,13,18,31,30);
 
console.log(d.getTime()); // 1234567890000
 
let t = new Date(2009,1,13,18,31,30,321);
 
console.log(t.getTime()); // // 1234567890321
```

## 4 - Getting the number of days in a month with javaScript Date

So there are native javaScript Date prototype methods for getting the current day of the month, but no native method for getting the number of days in a month the value of which world range from 28 to 31 depending on what month it is and if it is leap year. There is however a cleaver trick that can be used to get the last date of the month which would also be the number of days in that month. To do so when creating a date instance just give zero as the day of the month.

```js
console.log( new Date(2019,7,0).getDate()); // 31
```

## 5 - Conclusion

JavaScript Date objects are a bit of a large topic actually and in this post I have not covered every little detail about them. There are many methods to look at in the Date prototype object that are useful for getting all kinds of information of a certain date object instance. However there is also every little thing that might come up when it comes to working with date objects in javaScript also. So in time I might write more posts on those little issues as they come up from time to time, write a new post on it, and see about editing this post to cover that and link to it as needed.