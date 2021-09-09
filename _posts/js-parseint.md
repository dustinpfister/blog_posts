---
title: parseInt and other options for parsing numbers in javaScript
date: 2019-05-15 21:23:00
tags: [js]
layout: post
categories: js
id: 449
updated: 2021-09-09 13:20:18
version: 1.42
---

The [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) function is one of several ways to [convert a string to a number](https://www.geeksforgeeks.org/javascript-parseint-with-examples/) in javaScript. The parseInt method does convert a string or number to an [integer](https://en.wikipedia.org/wiki/Integer), but technically it is still a float as all numbers in [javaScript are double precision floating point numbers](https://en.wikipedia.org/wiki/IEEE_754).

So when using the javaScript parseInt method to produce an integer it is really just a float still technically, but for all practical purposes when it comes to the product in a mathematical sense it is an integer. The parseInt method is often the first go to solution with this, and for the most part it will work just fine. However there are other was to parse a value to an integer, or float in javaScript as well, and there are subtle little edge cases that might come up in certain situations. Some of the other options to consider are the parseFloat method that will do more or less the same as parseInt only the return value will be a float, and there is also using the Number function to convert a string to a number also. So lets take a look at paserInt and also the options that come to mind when it comes to parsing values to integers in javaScript.

<!-- more -->

## 1 - parseInt basic examples

I assume that you have at least some background when it comes to the subject of [getting started with javaScript](/2018/11/27/js-getting-started/). There are a number of ways to get started if you have not done so all ready and even if you have there are other ways to go about playing around with the basics other than the way that you might be familiar with thus far. When it comes to playing around with simple expressions often I can get away with just [opening up the javaScript console in chrome](/2019/07/29/js-getting-started-javascript-console/) as a way to do so for example.

Before I get into other ways to go about creating a integer value from a string in javaScript other then parseInt it would be a good idea to first cover the basics of parseInt, and how it works with a range of various examples of string values that might potential be passed to parseInt in a project. So for starters lets just take a look at some basic examples of using just the parseInt function only.

### 1.2 - A basic example of parseInt

A very basic example of parseInt might involve just passing a string of a number as the first argument when calling the parseInt function. The returned result will be a number rather than a string and if all goes well the value of the number will be the same of that of the string value. When called parseInt will attempt to parse what is passed to it as a number that will be an integer value, so I do not need to bother with rounding the result, more on rounding a little later So if for example I pass the string value of 42 the result will be a number with the value of 42 rather than a string of that number, also if I give a string value like 42.125 the result will again be f2

```js
console.log( parseInt('42') ); // 42
```

### 1.1 - parseInt will just cut a fraction from a number

There is the question of how parseInt will treat a fraction of a number, when it comes to the subject of rounding, or just cutting the fraction part of a number. With that said it would seem that parseInt will just cut the fraction part from the number value. If this is a problem then this would then be a reason why one would prefer to use one of the options for rounding numbers in place of using parseInt. Such as using the parseFloat method and then the [Math.ceil, Math.round, or Math.floor methods](/2020/06/15/js-math-round/).

```js
console.log( parseInt('42.1234') ); // 42
console.log( parseInt('42.9876') ); // 42
```

### 1.3 - using a radix value for the second argument

The parseInt method in native core javaScript works by just passing a string of a number as the first argument, and an optional [radix](https://en.wiktionary.org/wiki/radix) as the second argument. The default as one might expect is base 10 which is the radix system that many people are familiar with. The radix value applies to the given string value not the resulting return value, the return value will always be base 10.

```js
var str = '101';
console.log( parseInt(str, 2) ); // 5
console.log( parseInt(str, 8) ); // 65
console.log( parseInt(str)); // 101
console.log( parseInt(str, 16) ); // 257
```

### 1.4 - Wrong radix can result in NaN

There are a few reason why one might end up [with a NaN value](/2017/09/23/js-nan/) when using parseInt. One such reason why NaN might be the result is when it comes to strings that contain letters that are to be used with a certain radix, NaN can result if the proper radix is not given. For example say I have a string that contains a number but the radix is not 10, but 16, in other words a hex number. If I just pass the hex string to parseInt the result will be NaN because the default radix of 10 is what was used. If I pass the hex string as the first argument, and then set the proper radix of 16 as the second argument, then the desired number value will be returned.

```js
var str = 'a3';
console.log( parseInt(str) ); // NaN
console.log( parseInt(str, 16) ); // 163
```

### 1.5 - A starting char that is not used for number values can result in NaN

Be mindful of any characters that are not used at all for number values of any radix. If a char that is not part of a number is at then end of a string then the parseInt method will just ignore it, and work with any valid chars from the start of the string up to that index in the string. However if a string begins with a char that is not used even with the property radix for the rest of the values that will result in NaN. The parseInt method will not preform any [kind of text pattern matching](/2019/03/20/js-regex/) for you, you will need to do that before hand when it comes to extracting the desired input value for the parseInt function.

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

## 2 - Some things to look out for when using parseInt

Now that I have covered the basics of the parseInt method maybe now it is called for to take a deeper look at some of the things to be aware of when using the parseInt method. Although the parseInt method will work just fine in most cases, if a source string goes into notation that will result in NaN. Another thing to be mindful with parseInt, as well as javaScript numbers in general is what the deal is with max safe integer. So in this section I will be going over some weird things that might pop up when using parseInt, after this I can get to some alternatives to the parseInt method.

### 2.1 - parseInt converts to String first

The parseInt method might not always return expected results in some situations. One such situation is how parseInt will work when given a string of a javaScript number that makes use of notation with the letter e in it. For example the parseInt method converts to a string first and if it is a number then goes off into notation, then the letter e char will not be recognized as a number and will parse an int based on what comes before it.

```js
// parseInt may not always work as expected
console.log(parseInt( Math.pow(10,21) ) ); // 1
 
// because it converts to string first
let str = String(Math.pow(10,21));
 
// and it does not consider the letter e to 
// be a number with a base 10 radix
console.log(str); // 1e+21
console.log(parseInt(str)); // 1
console.log( parseInt('12e45') ); // 12
```

So then this is one of the little things about parseInt that a javaScript developer should be ware of when making use of it when working with numbers that will go off into notation.

### 2.2 - The deal with max safe integer

There is also the nature of the max safe integer, when adding anything to that and going beyond the max safe int that too can result in unexpected results as well with parseInt. I Covered the basic idea of what m[ax safe integer is on my post that has to do with JavaScript numbers in general](/2019/01/24/js-javascript-number/) that gets into this in detail.

```js
let n = Number.MAX_SAFE_INTEGER;
console.log(n); // 9007199254740991
console.log(parseInt(n + 100)); // 9007199254741092
```

If you need to work with very large numbers, and retain precision not only should you forget about using parseInt, you should forget about using javaScript numbers all together. There are libraries, and also some native stuff in the works to allow for a whole other way of preforming high precision math. However getting into that in detail would be off topic here.

## 3 - Alternatives to the parseInt method

The parseInt function will work just fine in most cases, however thus far I can not say that I use it often. I am not saying that using the parseInt method is bad practice it is just that there are alternatives that also work well. Also in some cases the alternatives will work better in some of those cases where the parseInt method will fall short, such as with using numbers that go into notation. Also I often like having a higher degree of control when it comes to how to handle the fraction part of a source string or number.

### 3.1 - The Number function

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

### 3.2 - Multiply by a string of the number 1 and round to parse to an integer

ANother trick that comes to mind is multiply a value by a string of the number one, and then using something like Math.floor, or any other such method to round the result of that. The reason why this works is because of the typeless nature of javaScript. This sort of thing would not work with addition because that is used for both addition and string concatenation. So when it comes to using addition that would help to convert numbers to strings, and I see similar tricks to this being used as a way to parse numbers to strings. However when it comes to an operator such as multiplication that is something that is only a math operation, so the result is a number rather than a string.

```js
var parseToInt = function (a) {
    return Math.floor(a * '1');
};
 
var n = parseToInt('7');
console.log(typeof n); // number
console.log(n); // 7
```

### 3.3 - The valueOf method of an Object

When it comes to making any kind of object by way of creating a constructor function, or just a plain object literal I can define what a valueOf method should be for this kind of object. The return value of a valueOf method should be whatever the primitive value of the object should be. So then in the body of this valueOf method I can make it so that the primitive value that is returned is a number, and by any means make sure that the number is an integer.

```js
let obj = {
    str: '42.1234',
    valueOf: function () {
        return Math.floor( Number(this.str) );
    }
};
 
console.log( Number(obj) );  // 42
console.log( obj.valueOf() ); // 42
console.log( obj * 1 ); // 42
```

## 4 - Conclusion

So the javaScript parseInt method is one of several methods that can be used to parse a value to a number, there are also many other little ticks that can be used to parse a value to a number also. There is still the question of not just parsing to a number, but parsing to an integer rather than a float, and for that the parseInt method works just fine in most cases. 

The parseInt method can be used to get an int value, but I still find myself using the Number function along with the built in Math object rounding methods combined with other methods to insure a number rather than a string. In many cases this just allows for a better degree of control of the outcome of a number. For example I get to chose what method I will use to round a number rather than just having the fraction value cut off. I can get the same effect by using the Math.floor method if I want, but in some cases I might want to use one of the other rounding methods.

