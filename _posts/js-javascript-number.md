---
title: javaScript numbers the basics and more.
date: 2019-01-24 15:47:00
tags: [js]
layout: post
categories: js
id: 363
updated: 2019-02-07 13:48:40
version: 1.9
---

In [javaScript Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) are a central part of just about any project, so doing just about anything interesting with javaScript will require at least some basic understanding of how numbers are handled in a javaScript programing environment. Working with numbers in javaScript might be a little easier compared to other environments as there is only one Number data type, still there are a lot of little quirks to look out for so lets get at it.

<!-- more -->

## 1 - javaScript Numbers are only one data type IEEE_754

In javaScript, traditionally at least all Numbers are 64 bit double precision [IEEE_754](https://en.wikipedia.org/wiki/IEEE_754-1985) floating point numbers. If you would like to dive into the subject of IEEE 754 to gain a better understanding of the data type by all means do so, but getting into the depth of that is not necessarily required as long as you are aware that there are some limitations with that data type. There are new standards such as [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), as well as other libraries that can be used to address those limitations. However for the most plain old javaScript Numbers work just fine, and in this post I will be writing mainly about this.

## 2 - javaScript Numbers and max safe integer.

With with the javaScript Number Object there is a built in constant called Number.MAX_SAFE_INTEGER. This number is the highest value that a developer can work with until they run into a weird problem when making certain comparisons. For example consider the following:

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
 
let n = Number.MAX_SAFE_INTEGER + 1;
 
console.log(n === n + 1); // true (but should be false)
 
```

When making an equal comparison between n and n + 1 the returned value should be false. However When I go beyond the Max Safe integer this is no longer the case. The reason why has to do with the limitations of IEE_754. For many projects I am not working with numbers this large, but when I do I will want to use a library that represents numbers as strings, or make use of the new bigInt standard to help get around this.

## 3 - Converting Numbers to Strings in javaScript

The process of converting a number to a string is fairly easy, there is of course the String method that can be used. However in javaScript conversion to a string can also occur when just adding a number to a string as well. Often I see that method used as a way to do so by just adding an empty string to a number.

```js
let n = 42;
 
console.log(typeof n); // number
 
console.log(typeof String(n)); // string
console.log(typeof (n + '')); // string
console.log(typeof n.toString(16)); // string
```

This works because in javaScript the addition operator is not just used to add Numbers but also to concatenate strings together as well. So when a number and string are added together that results in string concatenation rather than addition and the result is a string not a number. I will get into this sort of thing more so in the expressions section of this post.

### 3.1 - Number.toString in detail

One more thing about the Number.toString prototype method, there is an option to give a base as the first argument to this method. So if you are looking for a quick way to get a string representation of a number in binary for example the number to can be given to the toSting method sense binary is a base two system.

```js
console.log( (42).toString(2) ); // '101010'
``` 

## 4 - javaScript number literals

There are a number of ways to create a javaScript number by way of a Number Literal rather than the result of an expression or any other means. The most common way would be in plain old decimal form, however there are base16, and base8 options as well. There are also exponents, and other options that can be considered a kind of literal as well.

```js
// decimal integer and floating points
console.log( 42 ); // 42
console.log(42.1234); // 42.1234
 
// hex (base16) numbers 
console.log( 0x2a); // 42
 
// octal (base8) numbers 
console.log(052); // 42
console.log(0o52); // 42
 
// exponents
console.log(2e3); // 2000
console.log(2e-1); // 0.2
 
// NaN and infinity literals
console.log(NaN);
console.log(Infinity);
```

## 5 - Numbers as the result of an expression

When creating an expression of one or more operations a Number can often be the result of that expression. In some cases however it can some times evaluate to something else such as a string depending on the data type of the value. For example if an operator such as the multiplication operator is used with a Number and a string the string will be converted to a number, and the result will be a number. However if addition is used with two strings then the result will be string concatenation, and not addition. 

```js
console.log(typeof (2 * '5')); // number
console.log(typeof (7 / '13')); // number
 
console.log(typeof (5 + 10) ); // number
console.log(typeof ('7' + '13')); // string
```