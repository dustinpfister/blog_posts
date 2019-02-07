---
title: Javascript == ,===, and more.
date: 2019-02-06 17:47:00
tags: [js]
layout: post
categories: js
id: 372
updated: 2019-02-06 19:48:40
version: 1.1
---

So the javaScipt == operator is used to find equality in expressions, in addition there is also the === operator that is used to find what is called identity as well. This is a subject that comes up often in javaSciprt related discussions so it goes without saying that I should write a post on this one.

<!-- more -->

## 1 - javaScript == can be used to find equality.

The javaScript == operator can be used to find equality between to operands. If the two operands are equal the resulting value will be true otherwise it will result in false.

```js
let str = 7;
console.log( str == 7); // true
```

Simple enough for the most part however there are some things to be ware of, and there is also another operator === known as the identity operator. So be sure to read on if this is a subject that you still find a little confusing.
