---
title: String Match prototype method in javaScript
date: 2019-04-06 16:30:00
tags: [js]
layout: post
categories: js
id: 412
updated: 2019-04-10 16:40:31
version: 1.3
---

The [String Match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) method in javaScript can be used in combination with a regular expression to find detailed information about the first pattern match in a string, or an array of results depending on the group flag of the regular expression used. It is a great method that come sin handy, but it might not always be the best option when it comes to pattern matching tasks with javaScript and regular expressions. Never the less this will be a quick post on the String.match method in javaScript, with some examples.

<!-- more -->

## 1 - String Match Basics

To know how to use the String.Match method to a fair amount of proficiency it is required to have at least some understanding of how to go about working with regular expressions. I will not be getting into regular expressions in depth in this post as I have written a post on that subject in general.

```js
let patt = /dat_\d+.json/ig,
str = 'Here is one file called dat_2017.json, and another called dat_2018.json',
m = str.match(patt);
console.log(m);
// [ 'dat_2017.json', 'dat_2018.json' ]
```

## 2 - Using exec to do a String Match

```js
let patt = /dat_\d+.json/ig,
str = 'Here is one file called dat_2017.json, and another called dat_2018.json';

console.log(patt.exec(str)); // ['dat_2017.json...'
console.log(patt.exec(str)); // ['dat_2018.json...'
console.log(patt.exec(str)); // null
console.log(patt.exec(str)); // ['dat_2017.json...'
```
