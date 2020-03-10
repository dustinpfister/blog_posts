---
title: The js array join method
date: 2020-03-09 20:53:00
tags: [js,corejs]
layout: post
categories: js
id: 623
updated: 2020-03-09 20:56:30
version: 1.1
---

The array join prototype method can be used to join all elements of an array into a string with a string that is to be used between each element.

<!-- more -->

## 1 - basic js array join method example

```js
var arr = [3,9,2020],
str = arr.join('/');
 
console.log(str); '3/9/2020'
```