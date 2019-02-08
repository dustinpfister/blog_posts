---
title: javaScript Strings must know methods and more.
date: 2019-01-25 12:44:00
tags: [js]
layout: post
categories: js
id: 364
updated: 2019-02-08 18:13:25
version: 1.2
---

A [javaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) is one of the primitive values that there are to work with when making a project with javaScript. A string is a collection of characters that compose a text pattern, and as such can serve a number of functions beyond just simply displaying text. In this post I will be covering some of the must know String prototype methods, as well as some general quirks to look out for when working with a String in javaScript.

<!-- more -->


## 1 - JavaScript string basics - creating strings

The basics of strings in JavaScript might include how to go about creating, and displaying Strings. There are a number of ways to create a string in javaScript the most basic and common way, and then there are some not so basic and common ways as well. In this section I will be going over the different ways I know how to go about creating a string with javaScript.

## 1.1 - Creating a string with quotes

The most common and basic way to go about creating a string in javaScript would be to use quotes.

```js
let str = 'foobar';
 
console.log(typeof str); // string
console.log(str.constructor.name); // String
console.log(str); // 'foobar'
```