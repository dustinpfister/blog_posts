---
title: regex patterns in javaScript
date: 2019-03-20 19:48:00
tags: [js]
layout: post
categories: js
id: 405
updated: 2019-03-21 13:16:06
version: 1.1
---

When working on a javaScript project there might be a need now and then to do some text pattern matching operations. This is true of sure then making some kind of parser, or something to that effect. So in this post I will be covering some basic examples of regular expressions in javaScript that can be used to text search and replace tasks.

<!-- more -->

## 1 - regex

```js
let data = 'regexp is **good** for pattern matching tasks',
change = data.replace(/\*\*good\*\*/, 'great');
console.log(change); // 'regexp is great for pattern matching tasks'

```