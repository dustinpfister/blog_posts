---
title: The lodash _.round method compared to Math.round, and formating fun.
date: 2018-08-03 12:47:00
tags: [js,lodash]
layout: post
categories: lodash
id: 246
updated: 2022-01-23 14:28:59
version: 1.19
---

So today for yet another of my posts on [lodash](https://lodash.com/) and corresponding topics I have come around to writing a quick post on the [\_.round](https://lodash.com/docs/4.17.10#round) method that can be used in a similar way to that of [Math.round](/2020/06/15/js-math-round/) in native javaScript. The lodash round method works more or less the same way, but with just one little additional feature that I just which the native methods had but does not that has to do with precession. Also in this post I will be writing about some related topics that have to do with formating numbers, something that comes up all the time when I am making a javaScript project.

<!-- more -->

## 1 - what to know before hand

This is a post on the lodash method \_.round that can be used to round numbers in the same way as that of Math.round in native javaScript, but can also be used to round to a given precision as well. In this post I also expand into, and touch base on other relevant topics as well with respect to padding, and formating of numbers. This is not a getting started post on lodash, or javaScript in general and I assume you have at least a little background in these subjects.

So in core javaScript there is of course [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round), as well as other options like [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), and [Math.ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil). These methods work just fine, but they only take one argument, which is naturally the number that you want to round. If you want to round to a certain precision, you will need to find a copy, and past solution. However if it just so happens that lodash is part of your stack, then there is no need, as you have a more robust rounding method at the ready that can receive a precision as the second argument.

### 1.1 - Just simple rounding, with \_.round, and Math.round.

If you just want to round a number then \_.round is no different then Math.round in that regard, and there is not much of a difference.

```js
// so _.round works just fine for just rounding a number...
console.log(_.round(Math.PI)); // 3
 
// But so does Math.round.
console.log(Math.round(Math.PI)); // 3
```

Rounding works following the convention that a fraction of one half or higher is rounded up to the next whole number, and any fraction lower is rounded down. If you want to always round down no matter what there is \_.floor, and \_.ceil, as wel as the corresponding Math.floor, and Math.ceil as well.

### 1.2 - Rounding too a certain precision

The one feature that makes \_.round, a little more robust is there a second argument can be given to set the precision of the number.

```js
// however _.round can make use of a precision argument
console.log(_.round(Math.PI,2)); // 3.14
 
// where is Math.round out of the box does not
console.log(Math.round(Math.PI,2)); // 3
```

This is useful when it comes rounding a number that has to do with money to just two decimals. However when it comes to formating a number for presentation to the user it will not do everything when it comes formating numbers. To help with this there are padding methods like [\_.padStart](/2018/08/03/lodash_padding/).

## 2 - format money \_.round example

For this example I will be making a simple method that formats a plain javaScript number into a string that is both rounded, and padded using lodash methods. There are also native methods that have to do with padding, and all kinds of other little native javaScript tricks for padding also that work well. I will not be getting into padding in depth in this post, but I have [wrote a post on padding in lodash](/2018/08/03/lodash_padding/), and I also cover vanilla javaScript solutions for padding there also.

```js
let _ = require('lodash');
 
let money = 86.5733333333; // must be formated as '$0086.57'
 
let formatMoney = function (money) {
 
    // round with precision of 2, and split ( 1.23 becomes [1,23] )
    let sp = _.split(_.round(money, 2), '.');
 
    // push a 0 element for cents if there is only a dollar element
    // ( [7] becomes [ 7, 0] )
    if (sp.length === 1) {sp.push(0);}
 
    // lodash has methods for clamping and padding
    // [-12,0] becomes [0,0]
    // and ( [7,0] becomes ['0007','00'])
    sp[0] =  _.clamp(sp[0], 0,9999);
    sp[0] = _.padStart(sp[0], 4, '0');
    sp[1] = _.padEnd(sp[1], 2, '0');
 
    // join array elements together with a '.' between them
    // and format the final string
    // ['1234','12'] becomes '$1234.12'
    return '$' + _.join(sp, '.');
 
};
 
console.log(formatMoney(money)); // '$0086.57'
console.log(formatMoney(0)); // $0000.00
console.log(formatMoney(7)); // $0007.00
console.log(formatMoney(.1)); // $0000.10
console.log(formatMoney(99000)); // $9999.00
console.log(formatMoney(-12)); // $0000.00
```

## 3 - Vanilla javaScript solutions

So when it comes to using lodash just for this method alone that makes using the full lodash library kind of silly. It might be possible to just install the lodash round method alone as one way of going about addressing that. However it should not be to hard to work out or find some kind of user space solution for this sort of thing when it comes to roi8nding numbers. There are of course the Math methods that I have mentioned that should work just fine in most cases. Also it is not so hard to create a simple expression to address the lack of the precision argument in these methods.

### 3.1 - The Math round method

First off there is the round method of the Math object of course that will round a number to a whole number. This will work in the usual way where one half or higher will round up, while anything below one half will round down.

```js
console.log( Math.round( 3.1 ) ); // 3
console.log( Math.round( 3.5 ) ); // 4
console.log( Math.round( 3.9 ) ); // 4
```

### 3.2 - Math ceil, and Math.floor

In some cases I might want to always round up, or always round down, for this there is Math.ceil and Math.floor.

```js
console.log( Math.ceil( 3.1 ) ); // 4
console.log( Math.ceil( 3.5 ) ); // 4
console.log( Math.ceil( 3.9 ) ); // 4
 
console.log( Math.floor( 3.1 ) ); // 3
console.log( Math.floor( 3.5 ) ); // 3
console.log( Math.floor( 3.9 ) ); // 3
```

### 3.3 - Using the toFixed method of a number with parseFloat

There is also the toFixed method of the number prototype that will return a string form of a number to a given number of fixed decimal points. This string result can then be feed back to a method like parseFloat to convert it back to a number again.

```js
let round = (n, d) => {
    d = d === undefined ? 2 : d;
    return parseFloat( n.toFixed(d) );
};
 
console.log( round(3.12345678, 4) ); // 3.1235
console.log( round(3.12345678) );    // 3.12
console.log( round(3.12345678, 0) ); // 3
```

Although the toFixed method will work okay in most situations there are some rare, but possible situations in which one might get unexpected results. With that said if this kind of situation does present a problem this will require one to look into yet even more solutions for this kind of thing.

### 3.4  - User space round method

Well after doing some digging I as able to find [this rounding solution](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round$revision/1383484) that seems to work okay, however I have not gone threw every possible number example to see if there is some kind of weir problem with it.


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

## 4 - Conclusion

So lodash methods like \_.round are methods that have at least one little feature that makes it a little more useful then just the plain old native method in core javaScript itself. Still it goes without saying that this method alone is not a good reason to make lodash part of you stack. Hopefully you are making great use of the less redundant methods in lodash like \_.merge, if it is part or your code base.

If you enjoyed this post you might want to check out one of my many [other posts on lodash](/categories/lodash/), or my [main post on lodash in general](/2019/02/15/lodash/).

