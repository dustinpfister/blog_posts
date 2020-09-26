---
title: JS Math round method and precision
date: 2020-06-15 18:37:00
tags: [js]
layout: post
categories: js
id: 666
updated: 2020-09-26 13:25:47
version: 1.9
---

In javaScript there is the Math object and a few of the many methods in this Object have to do with rounding numbers such as [Math ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil), [Math floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), and one additional such option for rounding in the Math Object that is the [Math round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) method. For the most part these methods will work just fine, however there are some situations in which they might fall short for expectations. One situation that comes to mind has to do with precession, which is one of several things that come to mind that might make one want to have a custom user space solution for rounding.

In the utility library lodash there is a [\_.round](/2018/08/03/lodash_round) method that works more or less the same way as the native Math round method, but precession can be set by way of a second argument that is absent from the native Math round method. This lodash method alone is not a great talking point for using the whole utility library though, so it is often desirable to have just a quick, simple copy and past solution for this sort of thing which it comes to working with native javaScript by itself.

So in this post I will be taking a look at the Math.round method, but also additional options, user space alternatives, and any related topics that might come up when it comes to formatting numbers for the sake of presentation.

<!-- more -->

## 1 - Math round, Math ceil, and Math floor

So the native methods for rounding are simple enough to use, if you have been working with javaScript for a fair amount of time chances are you are using them all ready. So with that said there is not much to write about them, just choose one that is the best fit, pass in the number you want to round, and the desired result id returned.

```js
var n = 1.005;
 
console.log( Math.round(n) ); // 1
console.log( Math.ceil(n) ); // 2
console.log( Math.floor(n) ); // 1
```

So one might think that these methods will work just fine for rounding. I can just use one of these methods to round numbers when and where needed and that is it. Well for the most part maybe, but there are some situations where these built in methods are not working as expected, which will result in me looking for other options. There are other javaScript built in options, but often they are not working as expected all the time also, which causes me to look for or make a user space solution for this actually. So lets look at some more examples of rounding numbers in javaScript to get a better idea as to what the state of affairs is with this one.

## 2 - Number tofixed method as one option for precession

So another javaScript built in method that I find myself using to round numbers is the [Number toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) method. This method can be used to round, and it can also be used to format a number as a string to a fixed number of decimal places. Maybe using this is still not such a bad idea when it comes to presenting values that do not have to be super accurate, but it is not such a good idea to use it when it comes to working out logic for expressions and not just because it returns a string. In some cases it would seem that the method will not round the way that it should.

```js
var n = 2.375158,
str = n.toFixed(n, 2);
 
// works as expected for this example
console.log(str); // 2.38
 
// but not always
console.log( (1.005).toFixed(2) ); // 1.00 (expedited 1.01)
 
// also returns a string
console.log(typeof str); // 'string'
```

So when it comes to just simply formatting a string representation of a number for the sake of display in a view maybe this will works okay in most situations. Still for the fact that it returns a string, and also because it does not round right all the time, this causes me to look for yet another solution for rounding. When all else fails look for a user space solution I guess, and if I can find something there is also doing my own thing.

## 3 - Find or make a user space solution

Via some searching on stack overflow I was able to find many user space solutions for rounding numbers in javaScript. Some of them work okay, but often cause similar problems when testing them out with certain values. However I was able to find out [one user space solution](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round$revision/1383484) that seems to work okay that I only slightly modified here.

```js
// (credits to Lam Wei Li)
// https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round$revision/1383484
 
var round = function (number, precision) {
    var shift = function (number, exponent) {
        var numArray = ("" + number).split("e");
        return  + (numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
    };
    precision = precision === undefined ? 0 : precision;
    return shift(Math.round(shift(number, +precision)), -precision);
};
 
console.log( Math.round(1.005) ); // 1
console.log( (1.005).toFixed(2)); // 1.00
console.log( round(1.005, 2) ); // 1.01
```

Looks like I found my copy and past user space solution for rounding rather than bothering with lodash for just that one method. This gives me the functionally that I like in the Number.toFIxed method but without the weird issue that results in wrong rounding.