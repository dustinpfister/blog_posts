---
title: lodash replace
date: 2019-04-01 19:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 409
updated: 2019-04-05 11:55:54
version: 1.2
---

The [lodash \_.replace](https://lodash.com/docs/4.17.11#replace) method can be used to quickly replace instances of a text pattern in a string with another pattern. However it might be best to just know how to use regular expressions to do the same with the String.replace method in native javaScript by itself. So in this post I will be writing bout some quick examples on this subject that comes up a lot when working out a javaScript project.

<!-- more -->

## 1 - lodash replace basic example

```js
let _ = require('lodash');
 
let str = _.replace('Hello Mr Early Cuyler','Early Cuyler','Dan Halen');
 
console.log(str); // 'Hello Mr Dan Halen'
```

## 2 - Using regex to replace all instances of a text pattern


```js
let strP = '<p>this is an element</p>';
 
let strS = _.replace(strP,/p>/g,'span>');
 
console.log(strS); '<span>this is an element</span>'
```