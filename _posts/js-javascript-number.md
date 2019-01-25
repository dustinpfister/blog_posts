---
title: javaScript numbers the basics and more.
date: 2019-01-24 15:47:00
tags: [js]
layout: post
categories: js
id: 363
updated: 2019-01-25 11:05:58
version: 1.3
---



<!-- more -->

In [javaScript Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) are a central part of just about any project, so doing just about anything interesting with javaScript will require at least some basic understanding of how numbers are handled in a javaScript programing environment. Working with numbers in javaScript might be a little easier compared to other environments as there is only one Number data type, still there are a lot of little quirks to look out for so lets get at it.

## 1 - javaScript Numbers are only one data type IEEE_754 (at least traditionally)

In javaScript, traditionally at least all Numbers are 64 bit double precision (IEEE_754)[https://en.wikipedia.org/wiki/IEEE_754-1985] floating point numbers. If you would like to dive into the subject of IEEE 754 to gain a better understanding of the data type by all means do so, but getting into the depth of that is not necessarily required as long as you are aware that there are some limitations with that data type. There are new standards such as [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), as well as other libraries that can be used to address those limitations. However for the most plain old javaScript Numbers work just fine, and in this post I will be writing about things that pertain to the use of them.

## 1 - javaScript Numbers and max safe integer.

With with the javaScript Number Object there is a built in constant called Number.MAX_SAFE_INTEGER. This number is the highest value that a developer can work with until they run into a weird problem when making certain comparisons. For example consider the following:

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
 
var n = Number.MAX_SAFE_INTEGER + 1;
 
console.log(n === n + 1); // true (but should be false)
 
```

When making an equal comparison between n and n + 1 the returned value should be false. However When I go beyond the Max Safe integer this is no longer the case. The reason why has to do with the limitations of IEE_754. For many projects I am not working with numbers this large, but when I do I will want to use a library that represents numbers as strings, or make use of the new bigInt standard to help get around this.