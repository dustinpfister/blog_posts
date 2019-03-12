---
title: javaScript null
date: 2019-03-11 19:47:00
tags: [js]
layout: post
categories: js
id: 399
updated: 2019-03-11 20:01:42
version: 1.3
---

So [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) is one of many possible values that a variable can be at any given time in javaScript. It would seem that null is more or less the same as undefined, but this is not the case. In this post I will be writing around some of the things to know about the javaScript null value.

<!-- more -->

## 1 - javaScript null basics

The null value is one of javaScripts primitive values, that represents the absence of any object value. There is some confusion surrounding null and a similar primitive value known as undefined.

## 2 - null must be assigned.

One major difference to undefined is that the null value must be assigned to a variable or object property. By default the undefined value is what the value of an variable that is declared by has not been assigned anything. Same is true of object properties, and what is returned by a function, in any case the null value must be assigned.