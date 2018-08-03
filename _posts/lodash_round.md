---
title: The lodash _.round method compared to Math.round, and formating fun.
date: 2018-08-03 12:47:00
tags: [js,lodash]
layout: post
categories: lodash
id: 246
updated: 2018-08-03 15:44:16
version: 1.5
---

So today for yet another on eof my posts on [lodash](https://lodash.com/) and corresponding topics I have come around to writing a quick post on the [\_.round](https://lodash.com/docs/4.17.10#round) method that can be used in a simular way to that of Math.round, bit with just one little additional feature that I just which the native methods had but does not. Also in this post I will be writing about some related topics that have to do with formating numbers, a common use case example that involves rounding.

<!-- more -->

## 1 - what to know before hand

this is a post on the lodash method /_.round that can be used to round numbers in the same way as that of Math.round in native javaScript, but can also be used to round to a given precision as well. In this post I also expand into, and touch base on other relevant topics as well with respect to padding, and formating of numbers. This is not a getting started post on lodash, or javaScript in general and I assume you have at least a little background in these subjects.

## 2 - Some basic examples of _.round, and Math.round.

So in core javaScript there is of course [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round), as well as other options like [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), and [Math.ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil). These methods work just fine, but they only take one argument, which is naturally the number that you want to round. If you want to round to a certain precision, you will need to find a copy, and past solution. However if it just so happens that lodash is part of your stack, then there is no need, as you have a more robust rounding method at the ready that can receive a precision as the second argument.

### 2.1 - Just simple rounding, with \_.round, and Math.round.

If you just want to round a number then \_.round is no different then Math.round in that regard, and there is not much of a difference.

```js
// so _.round works just fine for just rounding a number...
console.log(_.round(Math.PI)); // 3
 
// But so does Math.round.
console.log(Math.round(Math.PI)); // 3
```

Rounding works following the convention that a fraction of one half or higher is rounded up to the next whole number, and any fraction lower is rounded down. If you want to always round down no matter what there is \_.floor, and \_.ceil, as wel as the corresponding Math.floor, and Math.ceil as well.

### 2.2 - Rounding too a certain precision

The one feature that makes \_.round, a little more robust is there a second argument can be given to set the precision of the number.

```js
// however _.round can make use of a precision argument
console.log(_.round(Math.PI,2)); // 3.14
 
// where is Math.round out of the box does not
console.log(Math.round(Math.PI,2)); // 3
```

This is useful when it comes rounding a number that has to do with money to just two decimals. However when it comes to formating a number for presentation to the user it will not do everything when it comes formating numbers. To help with this there are padding methods like [\_.padStart](/2018/08/03/lodash_padding/).