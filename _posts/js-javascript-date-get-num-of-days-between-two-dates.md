---
title: Getting the number of days between two javaScript dates.
date: 2020-01-30 17:22:00
tags: [js]
layout: post
categories: js
id: 600
updated: 2020-11-02 13:32:22
version: 1.17
---

This will be a quick post on [getting the number of days](https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/) between two [javaScript dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). This is a task that seems to creep up now and then so I thought I would work out a short post on this one to help remind me that this is not something that is as hard as it might seem.

Like most things like this it is important to look at [more than one solution](https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates), so I will be taking a look at two solutions for this sort of thing. One example is very simple, and another is a little more complex. Some times it is called for to use a more complex example for things, but so far it would seem that the simple solution for this does in fact work okay. The reason why is because as far as I can tell both solutions will yield the same result when tested with a few examples.

<!-- more -->

## 1 - Getting the number of days between two dates, by just subtracting and dividing

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

In my testing with this so far it would seem that this does not result in any weird outcomes that are way off when compared to a more complex solution that I will be getting to next. So when it comes down to it, it would seem that something like this works okay for getting a number of days between two date objects in javaScript.

In this example I am refraining from rounding the result when using the getDayDiff1 method. This is something that I think should be left alone when making a method for creating a number of days between to date objects. In the event that there is a slight discrepancy in time, how that would be handled will depend on the code of the application that uses something like this. In general it might be a good idea to use Math.round, rather than Ceil or floor.

## 2 - An overly complex solution that involves looping, getting the number of days in a month, and does not work so great.

In this section I will be going over a more complicated way of doing the same thing when it comes to getting a number of days between two date objects. This solution involves a trick that can be used to get the number of days in a month, by adding one to the month argument, and setting zero as the day of the month, resulting in getting the last day of the current month. From there the get date method can be used to get the number of days in a month. With this it is just a matter of doing so for all months of interest, tabulating the number of days for each month, and then just adding and subtracting days to adjust with what is going on with the day of the month of the two date objects.

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

This solution seems to work okay for the give example here, but will result in an infinity loop when given other examples. So this solution does not work so great at least in the shape that it is in now. Even if it was to work okay it is still a little overly complicated compared to the first solution. 

However it does make use of a few tricks that might prove to be of value elsewhere. Namely the trick that is used to get the number of days in a give month. Also if a solution like this where working as expected it might help address some additional issues when it comes to making this kind of solution to the problem at hand. Still lets just go with the simpler solution for now, but maybe throw a few more use case examples at it.

## 3 - Setting tie of dates to midnight

One thing that comes to mind when doing this is if I should set the tie of the date objects to a standard time, and then just take into account what day is was. In some situations this might be all that I care about when making working things out with this. That is that I am just interested in the difference in days between two dates in terms of the year, month, and day. It would nit be to hard to adjust the dates, just have a method that will return a new date object that has the same values when it comes to what I care about preserved but with all values that have to do with time of day set to zero.

```js
var setTimeMidnight = function (d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
};
 
var getDayDiff3 = function (d1, d2) {
    // create new dates that do not make use of time
    d1 = setTimeMidnight(d1);
    d2 = setTimeMidnight(d2);
    return ((d2 - d1) / 1000 / 60 / 60 / 24);
};
 
var getDayDiff1 = function (d1, d2) {
    return ((d2 - d1) / 1000 / 60 / 60 / 24);
};
 
var d1 = new Date(2020, 0, 2, 20, 10),
d2 = new Date(2020, 0, 4, 1, 15);
 
// use of the getDayDiff1 method will give a fraction
console.log( getDayDiff1(d1, d2).toFixed(2) ); // '1.21'
 
// I can then get different results depending on how I round
console.log( Math.floor(getDayDiff1(d1, d2)) ); // 1
console.log( Math.round(getDayDiff1(d1, d2)) ); // 1
console.log( Math.ceil(getDayDiff1(d1, d2)) ); // 2
 
// with getDayDiff 3 I am setting time of dates to midnight
// in other words just cutting the time off, and setting to a
// uniform time for each date.
console.log( getDayDiff3(d1, d2) ); // 2
```

## 4 - Conclusion

Although both solutions result in the same desired value, the solution that involves looping is of course way less efficient that goes without saying. Of course I would prefer to use solutions that do not involve looping at all if doing so if possible generally. 

However I have not battle tested both of these solutions, and sometimes a more complex solution is just what is required in order to get the values that I want each time. It is generally a good idea to look into more than one way to go about doing something and not just copy and past anything that will seem to work okay. However so far when it comes to this one the simple solution seems to work just fine.