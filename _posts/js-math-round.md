---
title: JS Math round method and precision
date: 2020-06-15 18:37:00
tags: [js]
layout: post
categories: js
id: 666
updated: 2021-10-14 14:33:17
version: 1.42
---

In javaScript there is the Math object and a few of the many methods in this Object have to do with rounding numbers such as [Math ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil), [Math floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), and one additional such option for rounding in the Math Object that is the [Math round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) method. For the most part these methods will work just fine, however there are some situations in which they might fall short for expectations. One situation that comes to mind has to do with precession, which is one of several things that come to mind that might make one want to have a custom user space solution for rounding.

In the utility library lodash there is a [\_.round](/2018/08/03/lodash_round) method that works more or less the same way as the native Math round method, but precession can be set by way of a second argument that is absent from the native Math round method. This lodash method alone is not a great talking point for using the whole utility library though, so it is often desirable to have just a quick, simple copy and past solution for this sort of thing which it comes to working with native javaScript by itself.

So in this post I will be taking a look at the Math.round method, but also additional options, user space alternatives, and any related topics that might come up when it comes to formatting numbers for the sake of presentation.

<!-- more -->

## 1 - The basics of rounding with Math round, Math ceil, and Math floor

When it comes to starting out with rounding numbers in javaScript there are of course the methods to work with in the Math object. These methods include the Math.round, Math.ceil, and Math.floor methods that all do the same thing when it comes to rounding a number but will return different results for the same number depending of course on the value. The typical way of thinking about rounding is that if the fraction part of a number is greater than or equal to one half that round up to the next whole number, else round down, in that case the Method to use is the Math.round method. The Math.ceil method is then the method to use when it comes to always rounding up, and the Math.floor method is what to use to always round down.

In this section then I will be going over a few basic example that involve just using the Built in Math methods for rounding numbers. Later in this post I will then be getting into a whole bunch of other native javaScript features that have to do with rounding.

### 1.1 - Just using the methods for starters

Maybe the best way to start out with this is to just call the various methods and pass some number literals to then just for the sake of confirming that they work as advertised. For example If I feed the number 1.005 as the argument for each methods I would expect 1 for Math.round, 2 for Math.ceil, and 1 for Math.floor.

```js
var n = 1.005;
 
console.log( Math.round(n) ); // 1
console.log( Math.ceil(n) ); // 2
console.log( Math.floor(n) ); // 1
```

Okay so far so good, then one might think that these methods will work just fine for rounding, and there is nothing more to be aware of beyond that. I can just use one of these methods to round numbers when and where needed and that is it, no need for a long from blog post for this one then right? 

Well for the most part maybe there is not much to say about these, but there are some situations where these built in methods are not working as expected, which will result in me looking for other options. There are other javaScript built in options, but often they are not working as expected all the time also, which causes me to look for or make a user space solution for this actually. 

However before getting into that maybe it would be best to cover a few more examples of these methods in situations in which they seem to work fine. So lets look at some more examples of rounding numbers in javaScript to get a better idea as to what the state of affairs is with this one.

### 1.2 - Get random bit example using Math.round

In this example I am using the Math.round method to return a 0 or 1 based on rounding the result of a random value using the [Math.random method](/2020/04/21/js-math-random/). The random method will return a number between 0 and 1, and can include 0 but not 1 at least from what I have [read about that](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random). 

So then my random bit method is just a simple one line expression there I am passing the return vaalue of a Math.random call as the value to round for the Math.round method. In the event that the random value is greater than or equal to 0.5 it will return 1, else 0.

```js
// random bit method using Math.round
var randomBit = function () {
    return Math.round(Math.random());
};
// random byte string method
var randomByteStr = function () {
    var i = 8,
    byteArr = [];
    while (i--) {
        byteArr.push(randomBit());
    }
    return byteArr.join('');
};
// demo
console.log( randomByteStr() );
```

### 1.3 - Get price example using Math.ceil

Using Math.ceil is useful for some situations in which I will always want to round up with any fraction value to the next whole number. For this example I made a quick function that will take a cost of something apply a markup to it and then use Math.ceil to round up, rather than down always to the next whole number. After that I just subtract one cent from the value to get a subtest shelf price for some kind of item in a hypothetical store.

```js
var getPrice = function (cost, markup) {
    return Math.ceil(cost * markup) - 0.01;
};
var i = 10,
markup = 1.25;
while (i > 5) {
    var cost = 1 + i;
    console.log(cost, markup, getPrice(cost, markup));
    i--;
}
```

### 1.4 - Get random array element using Math.floor

The Math.floor method is one of the round methods that I seem to use most of the time. One reason why is because it is a good choice when it comes to making a quick method that has to do with getting a random element in an array. The reason why I say that might have to do with the nature of the Math.random method combined with the zero relative index numbers of arrays. As I mentioned in a previous example the return value of a Math.random call will be between 0, and 1, and can potential also include 0, but not 1. So then if I multiply the random value returned by the Math.random method by the [length of an array](/2018/12/14/js-array-length/), and then pass that to the Math.floor method, the end result should always be a random element index that is not outside the length of the array.

```js
var getRandomEl = function (arr) {
    var len = arr.length;
    return arr[Math.floor(Math.random() * len)];
};
var i = 10,
colors = ['red', 'lime', 'cyan'];
while(i--){
    console.log( getRandomEl(colors) );
}
```

If I where to replace the call of Math.floor with Math.round, or Math.ceil the result would be the occasion reference to an element outside the range of the array which will result in an [undefined value](/2019/01/30/js-javascript-undefined/).

### 1.5 - Point from area example using Math.floor

There is also getting a random point in an area that has a width and height that comes to mind when rounding. For this example I made a quick function that will take a width and height value as the first two arguments, and then values between 0 and one for with and height. The returned result is then an object with x and y values that are placed between the width and hight value multiplied by the percent values, and then rounded using the Math.floor method.

```js
// get an point in an area with a width height, and 
// values between 0 and 1.
var getAreaPoint = function (w, h, wPer, hPer) {
    return {
        x: Math.floor(w * wPer),
        y: Math.floor(h * hPer)
    };
};
// random point
var getRandomAreaPoint = function (w, h) {
    return getAreaPoint(w, h, Math.random(), Math.random());
};
// demo
var i = 10;
while(i--){
    console.log( getRandomAreaPoint(10, 10) );
};
```

### 1.6 - Source code examples in this post as well as many others are on github

I have a [repository on Github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-math-round) that contains the source code examples in this post as well as all my other posts on vanilla javaScript. Just like my many other posts on vanilla javaScript the state of this post is still very much a work in progress. With that aid the latest examples and notes for future edits can be found there. If there is something more that you think should be added, and you are on github that would be where to make a pull request. There is also the comments section in the bottom of this post that can be used as a way to bring something up.

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

## 3 - Negative numbers, Math.round, and positive infinity

When it comes to numbers that a greater than zero, numbers that have a fraction of one half on the nose are rounded up. This does not just apply with numbers above zero though. In general all numbers will round up to positive infinity rather than negative infinity.  There is no distinction made for negative numbers with Math.round, but do not just take my worth for it play around with a few simple examples feeding some number literals to confirm it to yourself first hand.

```js
console.log( Math.round(1.4) ); // 1
console.log( Math.round(1.5) ); // 2
console.log( Math.round(1.6) ); // 2
 
console.log( Math.round(-1.4) ); // -1
console.log( Math.round(-1.5) ); // -1
console.log( Math.round(-1.6) ); // -2
```

If for some reason this is a problem I guess this might be another thing that can come up that might require a need for a user space solution for rounding numbers.

### 3.1 - Negative zero

If a number between and including -0.5 and zero is given this can result in negative zero being the return value. This [can present a problem](https://stackoverflow.com/questions/7223359/are-0-and-0-the-same) with using the [Object.is method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is), or any other method that makes use of Object.is or produced the same kind of comparison often called Same Value Zero such as the [\_.eq method](/2019/12/04/lodash_eq/), and many other methods in lodash.

```js
console.log( Math.round(-0.5) ); // -0
 
console.log( Object.is(0, Math.round(-0.5)) ); // false
console.log( Object.is(0, -0) ); // false
console.log( 0 === -0 ); // true
```

### 3.1 - fix

It is not so hard to work out a fix for numbers flowing to positive infinity rather than negative infinity if it is a problem. Addressing the negative zero thing can also be addressed in the process of doing so, and this is then one of the reasons why one might be inclined to make a custom rounding method.

```js
var round = function (n) {
    var int = Math.floor(n),
    diff = Math.abs(n - int);
    // special expression for diff === 0.5
    if (diff === 0.5) {
        return n >= 0 ? Math.round(n) : Math.round(n) - 1;
    }
    // addressing -0
    if (n > -0.5) {
        return 0;
    }
    // just use Math.round otherwise
    return Math.round(n);
};
 
console.log( Math.round(0.5) ); // 1
console.log( round(0.5) ); // 1
 
console.log( Math.round(-0.5) ); // -0
console.log( round(-0.5) ); // -1
 
console.log( Math.round(-0.25) ); // -0
console.log( round(-0.25) ); // 0
```


## 4 - Find or make a user space solution

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

### 4.1 - Making a custom method for handing all things that come to mind with rounding

So then there is using the custom method that I found for rounding with a precision value, but also working in some more stuff that I would like to have working for me each time I round a number. This will then result in a method that does not just round, but also preforms a number of additional things that have to do with formating a number.

```js
var round = (function () {
    // treat negative numbers a different way
    var roundNeg = function (n) {
        var int = Math.floor(n),
        diff = Math.abs(n - int);
        // special expression for diff === 0.5
        if (diff === 0.5) {
            return n >= 0 ? Math.round(n) : Math.round(n) - 1;
        }
        // just use Math.round otherwise
        return Math.round(n);
    };
    // the shift method
    var shift = function (number, exponent) {
        var numArray = ("" + number).split("e");
        return  + (numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
    };
    // precision rounding
    var roundPre = function (number, precision, roundMethod) {
        return shift(roundMethod(shift(number, +precision)), -precision);
    };
    // how to format a number
    var format1 = function (n) {
        return String(n);
    };
    // public method
    return function (n, precision, roundMethod, format) {
        precision = precision === undefined ? 0 : precision;
        roundMethod = roundMethod === undefined ? roundNeg : roundMethod;
        format = format === undefined ? format1 : format;
        var n = roundPre(n, precision, roundMethod);
        return {
            n: n,
            str: format(n),
            valueOf: function () {
                return this.n;
            },
            toString: function () {
                return this.str;
            }
        };
    };
 
}
    ());
 
console.log(round(-1.5) + 0); // -2
console.log(round(-1.5, 0, Math.round) + 0); // -1
 
console.log(round(-2.465, 2) + 0); // -2.47
console.log(round(-2.465, 2, Math.round) + 0); // -2.46
 
console.log(round(-0.25, 0) + 0); // 0
```

## 5 - Rounding with the Internationalization API

Yet another option for rounding would be to use the [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat), main the Number Format method. This can be used to not just round, but also format a string value for the purpose of displaying with respect to the typical formats for money. For example if I have a value that is a number value that is an amount of money, when it comes to displaying that I might want to round, but for a precision value two two decimal places not a whole number. On top of that I might also want to have a comma between each three digits of the whole number part of the value also. I could come up with or fine some kind of user space solution for this, however it would seem that there is a native method that can be used for this in the Internationalization API.

```js
var opt = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,  // default should be 2
    maximumFractionDigits: 4   // default should be 2
};
var formater = new Intl.NumberFormat('en-us', opt);
 
console.log(formater.format(1234.23456));
//$1,234.2346
console.log(formater.format(123));
//$123.000
```

When using the Intl.NumberFormat constructor the first argument that I need to give is a language code, for me this is 'en-us', after that I give an object with a bunch of options for this method. The main value that I will want to set are the style which I would want to set to 'currency' for money, and again for my language code I would want to use 'USD' for the currency. For the most part I would want to use the default settings for the precision, but if I want to adjust that there is the minimum fractiondDigits and maximum fraction digits properties that I can use for that. The return value for calling the constructor is then not a string, but an object that contains a few options for formating, including one that will return a string.

## 6 - Conclusion

So there are a few built in options for rounding in the Math object, and also certain prototype methods in other built in Objects and classes that help with rounding. However sometimes it makes sense to go with a user space solution for rounding, and formatting a number in general for presentation also. However maybe it can be said that these kinds of situations can be avoided when it comes to the issues with rounding negative numbers and so forth. When it comes to the negative zero situation there is just using the older equality and identity operators that will still return what many might see as an expected result for that kind of situation. However there is knowing what the deal is with it when it comes to what is going on, and why negative zero is not really the same thing as positive zero, so then when that is the case that is where things can be a little involved.

