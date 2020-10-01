---
title: The lodash _.pad, _.padStart, and _.padEnd methods for padding strings in javaScript.
date: 2018-08-03 15:20:00
tags: [js,lodash]
layout: post
categories: lodash
id: 247
updated: 2020-10-01 11:11:54
version: 1.17
---

So today I will be putting together another quick post on [lodash](https://lodash.com/) and corresponding vanilla js alternatives when it comes to the process of quickly padding strings. With lodash there is [\_.pad](https://lodash.com/docs/4.17.10#pad), [\_.padStart](https://lodash.com/docs/4.17.10#padStart), and [\_.padEnd](https://lodash.com/docs/4.17.10#padEnd) that can be used to make quick work of this with lodash, if lodash is part of the stack, but I will be looking at some other options as well when it comes to native javaScript. In late javaScript specs there are padding methods baked into core javaScript now, and if you want better backward support there are some concise tricks for this of course. So lets get to it.

<!-- more -->

## 1 - what to know before hand

This is a post on the lodash padding methods \_.pad, \_.pasStart, and \_.padEnd, as well as string padding in general with vanilla js alternatives when working with javaScript by itself. It is not a getting started post on lodash, and javaScript in general, so I assume you have at least some background with this. It is also worth mentioning that in this post I am using lodash 14.17.10.

## 2 - Some padding examples using lodash methods

The padding methods work by just simply giving a string or number that I want to pad with some kind of string pattern, typically a zero or space. The only other issue of concern is where the padding should be done. Should the padding be done at the beginning, or end of a string, or split between the begging and end? Some padding solutions allow for a third option to set this, but with lodash there are three separate padding methods for each of these.

### 2.1 - Account number example

Say you have unformatted account numbers that must be formatted in a way that if the number is less then ten, then zeros must be appended to the beginning of the number to make it ten numbers. For this I would want to use the \_.padStart method compared to the others.

```js
let an = 1503345;
 
console.log(_.pad(an,10,'0'));      // 0150334500
console.log(_.padEnd(an,10,'0'));   // 1503345000
console.log(_.padStart(an,10,'0')); // 0001503345
```

### 2.2 - A format money example

Another common use of padding is to format a value that has to do with money. Say I have a variable that represents a sum of money, and I want to display this sum of money in a way in which it is always a certain standard string size. This could be for some kind of game, or something to that effect where the sum of money can be between $0000.00, and $9999.99.

```js
let format = (m) => {
    // round, and clamp the number. Then split and find dollars and cents
    let sp = _.split(_.round(_.clamp(m, 0, 9999.99), 2), '.'),
    dollars = _.padStart(sp[0], 4, '0'),
    cents = _.padEnd(sp[1] || 0, 2, '0');
 
    return '$' + dollars + '.' + cents;
 
};
 
console.log( format(Infinity) ); // $9999.99
console.log( format(.005) ); // $0000.01
console.log( format(1234.56) ); // $1234.56
console.log( format(0) ); // $0000.00
```

## 3 - Vanilla js alternatives to the lodash padding methods

So if you are not the kind of person who likes lodash, or you like to always start with javaScript itself first as I suppose one should, it is true that there are some native staring padding methods in late specs of javaScript these days. So this makes the lodash methods \_.padStart, and \_.padEnd yet another example of one of those lodash methods that may only be needed as a kind of safety net when it comes to older browsers. If you only care about supporting late browsers using the native methods should work just fine, and it is not two hard to just throw in a pollyfill if need be.

### 3.1 - String.padStart, and String.padEnd.

So there are now pad methods that are very similar to the lodash \_.padStart, and \_.padEnd methods in the String prototype of late specs of core javaScript itself.

```js
let an = 1503345;
 
console.log( String(an).padStart(10,0) ); // '0001503345'
console.log( String(an).padEnd(10,0) ); // '1503345000'
```

these seem to work just the same as the lodash equivalents.

### 3.2 - making or finding a stand alone method

When I look at my site stats it would appear that there is not much concern with my browser stats at least. However if I am in a situation in which I am getting a fair amount of traffic from people that are using older browsers this is a method where a poly fill may be needed. I often start out my making or finding a stand alone method that can be used with [call](/2017/09/21/js-call-apply-and-bind/). By making it the kind of method that can be used with call on a String that helps to make it so it is ready to be monkey patched into the string prototype if need be.

```js
let an = 1503345;
 
var padStart = function (len, filler) {
 
    var fill = '', toFill = 0;
 
    len = len || 0;
    filler = String(filler === undefined ? ' ' : filler);
    toFill = len - String(this).length;
 
    if (toFill > 0) {
 
        fill = Array.apply(null, Array(toFill)).map(String.prototype.valueOf, filler).join('');
 
    }
 
    return fill + this;
 
};
 
console.log(padStart.call(String(an),10, 0)); // '0001503345'
```

This is a polly fill that I came up with but there are many others out there as well, as long as the method does what it needs to do without any major issues. In here I am using a crude yet effective vanilla js solution for \_.fill as well, if interested you might want to check out my [post on \_.fill](/2017/09/26/lodash_fill/) as well.

### 3.3 - Making a stand alone method work as a polly fill

This is why it is nice to work inside the context of a framework where all these things have been figured out before hand so I can just get going with a project, and not get caught up in these rabbit holes. Because My solution make use of Array.map, I might want to also provide a pollyfill for that as well, depending of course on how far back I want to go with backward comparability.

So to assure that both Array.map, and Array.padStart are in the Array, and String prototypes I would want to feature test for both of them, using the native solution if there, and if not monkey patch them in.

```js
// map pollyfill
Array.prototype.map = Array.prototype.map || function (callback /*, thisArg*/) {
    var T,A,k,O,len,kValue,mappedValue;
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    O = Object(this);
    len = O.length >>> 0;
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
        T = arguments[1];
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
        if (k in O) {
            kValue = O[k];
            mappedValue = callback.call(T, kValue, k, O);
            A[k] = mappedValue;
        }
        k++;
    }
    return A;
};
 
// monkey patch it with the pollyfill
String.prototype.padStart = String.prototype.padStart || function (len, filler) {
 
    var fill = '',
    toFill = 0;
 
    len = len || 0;
    filler = String(filler === undefined ? ' ' : filler);
    toFill = len - String(this).length;
 
    if (toFill > 0) {
 
        fill = Array.apply(null, Array(toFill)).map(String.prototype.valueOf, filler).join('');
 
    }
 
    return fill + this;
 
};
```

This is why devs like lodash, you just need to know how far backward compatibility goes with the version of lodash that you are using, and if what it supports works fine for you, then you can just get going with development, and be done with this. Here I am using the pollyfill for map that can be found on the [Mozilla page of Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill), and you might also want to check out my post on the lodash 

### 3.4 - The String.prorotype.slice with additional string trick

A nice concise solution that will work okay on most platforms might involve just the use of the String slice prototype method called off of a string that is the concatenation of a string of chars that consists of the padding char that is also the max length of a resulting string. Just give the slice method a negative index value that is also the max number of chars in the resulting string. In the event that the value is just one char, then it will take two of the padding chars along with that one char when slicing from the right of the concatenated string.

```js
var nums = [1, 12, 7, 113];
var padded = nums.map(function (n) {
        return String('000' + n).slice(-3);
    });
console.log(padded);
// [ '001', '012', '007', '113' ]
```

## 4 - Conclusion

So the lodash pad methods \_.pad, \_.padStart, and \_.padEnd are great methods for padding a string or number value into a nicely formated string. there are native solutions for this as well, but in any case always be aware of browser supper as always. If you liked this post you might want to check out my many other posts on lodash, and if you would like to add something feel free to let me know in the comments. Thank you for reading.