---
title: node console standard output and more
date: 2019-07-24 21:22:00
tags: [node.js]
layout: post
categories: node.js
id: 508
updated: 2019-07-24 21:36:01
version: 1.2
---

In nodejs there is the console global that works much like the console in web browsers. The [node console](https://nodejs.org/api/console.html) log will print what is passed to it in the standard output with a newline after what is given. There is also the standard error as well that can be logged to with the node console warn method. In this post I will be going over some basics with the console global in nodejs, as well as some other related topics.

<!-- more -->

## 1 - node console basics

```js
// the console.log method ca be called and passed
// a value to be logged to the standard output like this
console.log('hello world');
 
// more than one item can be passed
let a = 'foo', b = 'baz', c = 42;
console.log(a, b, c);
```
