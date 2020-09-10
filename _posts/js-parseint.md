---
title: parseInt and other options for parsing numbers in javaScript
date: 2019-05-15 21:23:00
tags: [js]
layout: post
categories: js
id: 449
updated: 2020-09-10 10:27:35
version: 1.21
---

The [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) is one of several ways to [convert a string to a number as an integer](https://www.geeksforgeeks.org/javascript-parseint-with-examples/) in javaScript. The parseInt method does convert a string or number to an [integer](https://en.wikipedia.org/wiki/Integer), but technically it is still a float as all numbers in [javaScript are double precision floating point numbers](https://en.wikipedia.org/wiki/IEEE_754).

So when using the javaScript parseInt method to produce an integer it is really just a float still technically, but for all practical purposes when it comes to the product in a mathematical sense it is an integer. The parseInt method is often the first go to solution with this, and for the most part it will work just fine. However there are other was to parse a value to an integer, or float in javaScript as well, and there are subtle little edge cases that might come up in certain situations. So lets take a look at paserInt and also the options that come to mind when it comes to parsing values to integers in javaScript.

<!-- more -->

## 1 - parseInt basic examples

So for starters lets just take a look at some basic examples of using parseInt.


### 1.2 - A basic example of parseInt

A very basic example of parseInt might involve just passing a string of a number as the first argument. The returned result will be a number rather than a string. When called parseInt will attempt to parse what is passed to it as a number that will be an integer value. So if for example I pass the string value of 42 the result will be a number with the value of 42 rather than a string of that number.

```js
console.log( parseInt('42') ); // 42
```

### 1.1 - parseInt will just cut a fraction from a number

There is the question of how parseInt will treat a fraction of a number. With that said it would seem that parseInt will just cut the fraction part. If this is a problem then this would then be a reason why one would prefer to use one of the options for rounding numbers in place of using parseInt. In addition there is also the parseFloat method also that will not do that of course.

```js
console.log( parseInt('42.1234') ); // 42
console.log( parseInt('42.9876') ); // 42
```

### 1.3 - using a radix value for the second argument

The parseInt method in native core javaScript works by just passing a string of a number as the first argument, and an optional [radix](https://en.wiktionary.org/wiki/radix) as the second argument. The default as one might expect is base 10 which is the radix system that many people are familiar with.

```js
var str = '101';
console.log( parseInt(str, 2) ); // 5
console.log( parseInt(str, 8) ); // 65
console.log( parseInt(str)); // 101
console.log( parseInt(str, 16) ); // 257
```

### 1.4 - Wrong radix can result in NaN

There are a few reason why one might end up with a NaN value when using parseInt. One such reason why NaN might be the result is when it comes to strings that contain letters that are to be used with a certain radix, NaN can result if the proper radix is not given.

```js
var str = 'a3';
console.log( parseInt(str) ); // NaN
console.log( parseInt(str, 16) ); // 163
```

### 1.5 - a starting char that is not used for number values can result in NaN

Be mindful of any characters  that are not used at all for number values of any radix. If a char that is not part of a number is at then end of a string then the parseInt method will just ignore it, and work with any valid chars from the start of the string up to that index in the string. However if a string begins with a char that is not used even with the property radix for the rest of the values that will result in NaN. The parseInt method will not preform any kind of pattern matching for you, you will need to do that before hand.

```js
// if a non number char is at the end of a string it will just
// be ignored
var str = '10!';
console.log( parseInt(str) ); // 10
console.log( parseInt(str, 16) ); // 16
// if a non number is at the start of a string though it will result in NaN
var str = '!10';
console.log( parseInt(str) ); // NaN
console.log( parseInt(str, 16) ); // NaN

```

## 2 - parseInt converts to String first

The parseInt method might not always return expected results in some situations. For example the parseInt method converts to a string first and if it is a number the goes off into notation, then the letter e char will not be recognized as a number and will parse an int based on what comes before it.

```js
// parseInt may not always work as expected
console.log(parseInt( Math.pow(10,21) ) ); // 1
 
// because it converts to string first
let str = String(Math.pow(10,21));
 
// and it does not consider the letter e to 
// be a number
console.log(str); // 1e+21
console.log(parseInt(str)); // 1
console.log( parseInt('12e45') ); // 12
```

## 3 - The deal with max safe integer

There is also the nature of the max safe integer, when adding anything to that and going beyond the max safe int that too can result in unexpected results as well.

```js
let n = Number.MAX_SAFE_INTEGER;
console.log(n); // 9007199254740991
console.log(parseInt(n + 100)); // 9007199254741092
```

## 4 - parseInt and Number

The [Number function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) can be used to convert a string to a number also. It is a way to explicitly declare the the value that is given to the number function is th be parsed as a number. However it will not parse to an integer, at least not my itself, so it would have to be used in conjunction with an additional method such as the Math.round method.

```js
let str = '42.1234';
// number will parse to float if there
// is a fraction
console.log( Number(str) ); // 42.1234
 
// paser Int will not
console.log( parseInt(str) ); // 42
 
let str2 = '42abc';
// Number will result in NaN
// if there are non number chars
// in the end of a string
console.log( Number(str2) ); // NaN
// parseInt will not
console.log( parseInt(str2) ); // 42
```

## 5 - Multiply by a string of the number 1 and round to parse to an integer

ANother trick that comes to mind is multiply a value by a string of the number one, and then using something like Math.floor, or any other such method to round the result of that. The reason why this works is because of the typeless nature of javaScript. This sort of thing would not work with addition because that is used for both addition and string concatenation. So when it comes to using addition that would help to convert numbers to strings, and I see similar tricks to this being used as a way to parse numbers to strings. However when it comes to an operator such as multiplication that is something that is only a math operation, so the result is a number rather than a string.

```js
var parseToInt = function (a) {
    return Math.floor(a * '1');
};
 
var n = parseToInt('7');
console.log(typeof n); // number
console.log(n); // 7
```

## 6 - Conclusion

So the javaScript parseInt method is one of several methods that can be used to parse a value to a number, there are also many other little ticks that can be used to parse a value to a number also. There is the question of not just parsing to a number, but parsing to an integer rather than a float. The parseInt method can be just that method to do so, but I still find myself using the built in Math object rounding methods combined with other methods to insure a number rather than a string.