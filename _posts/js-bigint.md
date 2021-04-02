---
title: BigInt basics in javaScript for numbers beyond max safe int
date: 2019-09-06 15:46:00
tags: [js]
layout: post
categories: js
id: 531
updated: 2021-04-02 08:22:40
version: 1.9
---

So the regular number type in javaScript has some limitations when it comes to working with very large numbers beyond that of the [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). Beyond that when it comes to adding a low number such as one to a number at, and beyond max safe integer you might end up with the same number as the result of the expression. So then it goes without saying that after that range, certain operations can not be preformed without a loss of precision, thus the name Max Safe Integer.

To get around this limitation with javaScript numbers in the past, a library would have to be used that involves representing a number with a string, and then have custom method that is part of this library for preforming operations with these types of objects was a way to work with big numbers in a project. For a long time the use of an external library was required when it comes to working with large numbers beyond max safe integer, and preserving high precision when preforming operations. These modules still work just fine, and often might still prove to be a better choice over a native solution, but as of late yes there is a native solution for this now.

So with that said in modern browsers, and node 10.4.x+ there is now the BigInt Object that now provides high precision math functionality in native javaScript by itself without the introduction of an external module. As of this writing the [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object is still not well supported so you might still want to use a library for that reason, but in time such libraries will no longer be needed for this because of this native support. So lets look at a few quick examples of the native bigInt object and what is has to provided in platforms that support it.

<!-- more -->

## 1 - JavaScript BigInt Numbers might not be the best option for now at least

As of this writing BigInts are still a fairly new addition to native javaScript. If the nature of the project consists of front end code BigInts might not be the best option because of poor browser support. In addition if it is a nodejs project then it might still not be a good idea to use BigInts unless you are confident that the project will always be used in later versions of node that are version 10.4.x or later. Even if you go with BigInt there are still some drawbacks that might not make a library solution outdated just yet, BigInt numbers can not be used with native javaScript Math Object methods such as Math.pow for example.

## 2 - BigInt basics creating theme

So If you are confident that the use of native javaScript BigInt numbers will work for your project rather than a library in user space then getting started with them is fairly simple. The BigInt Object can be used as a way to create an instance of BigInt from a number or a string of a number. Also there are a number of operators that can be used with BigInts just like plain old javaScript numbers.

```js
// create BigInts from a Number
var n = BigInt(37),
// from a string of a number
x = BigInt('130000'),
// by appending an n to the end of a number literal
y = 4500n,
// by writing an expression using BigInts
z = n + x * y;

console.log(z.toString());
// '585000037'
```


## 3 - BigInts in javaScript are a new type

So a BigInt in javaScript is a whole new data type all together so they are not Numbers, strings, or just a certain class of Object. When using the [typeof operator](/2019/02/15/js-javascript-typeof/) the type of a BigInt will not be the same as that of a plain old javaScript Number. This can present a problem as you can not just use a BigInt with any native or user space method that expects a javaScript number rather than a BigInt.

```js
var bigN = BigInt(42),
n = 42;
 
// BigInts are a type of there own
console.log(typeof bigN);
// bigint
 
// Plain old javaScript Numbers are a type of their own also
console.log(typeof n);
// number
```

## 4 - Equality and BigInt

So when it comes to equality and other types things are as a javaScript developer would expect when using the identity and equality operators. When using identity a BigInt will not equal a number or string of the same value because they are different types. However when using the loose typing equality operator a bog int will equal and equivalent number or string value.

```js
var bigN = BigInt(42);
 
console.log(bigN === 42); // false
console.log(bigN == 42); // true
console.log(bigN == '42'); // true
```

## 5 - Conclusion

So the BigInt type is a great addition to native javaScript, but I would say that it is not yet a replacement for library solutions as there are many features missing that are present in [library solutions](/2017/05/29/nodejs-big-integer/) for [big numbers](http://www.thealmightyguru.com/Pointless/BigNumbers.html) in javaScript.