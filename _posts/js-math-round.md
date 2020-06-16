---
title: JS Math round method and precision
date: 2020-06-15 18:37:00
tags: [js]
layout: post
categories: js
id: 666
updated: 2020-06-16 12:51:23
version: 1.2
---

In javaScript there is the Math object and some of the many methods in this Object have to do with rounding numbers. One such option is the [Math round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) method, however there are a few other options such as [Math ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil), and [Math floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor). For the most part these methods will work just fine, however there are some situations in which they might fall short. One situation that comes to mind has to do with precession.

In the utility library lodash there is a [\_.round](/2018/08/03/lodash_round) method that works more or less the same way as the native Math round method, but precession can be set by way of a second argument that is absent from the native Math round method. This lodash method alone is not a great talking point for using the whole utility library though, so it is often desirable to have just a quick, simple copy and past solution for this sort of thing.

<!-- more -->

## 1 - Math round, Math ceil, and Math floor

```js
var n = 1.005;
 
console.log( Math.round(n) ); // 1
console.log( Math.ceil(n) ); // 2
console.log( Math.floor(n) ); // 1
```