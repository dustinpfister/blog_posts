---
title: javaScript Strings must know methods and more.
date: 2019-01-25 12:44:00
tags: [js]
layout: post
categories: js
id: 364
updated: 2019-02-08 18:28:49
version: 1.5
---

A [javaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) is one of the primitive values that there are to work with when making a project with javaScript. A string is a collection of characters that compose a text pattern, and as such can serve a number of functions beyond just simply displaying text. In this post I will be covering some of the must know String prototype methods, as well as some general quirks to look out for when working with a String in javaScript.

<!-- more -->


## 1 - JavaScript string basics - creating strings

The basics of strings in JavaScript might include how to go about creating, and displaying Strings. There are a number of ways to create a string in javaScript the most basic and common way, and then there are some not so basic and common ways as well. In this section I will be going over the different ways I know how to go about creating a string with javaScript.

### 1.1 - Creating a string with quotes

The most common and basic way to go about creating a string in javaScript would be to use quotes.

```js
let str = 'foobar';
 
console.log(typeof str); // string
console.log(str.constructor.name); // String
console.log(str); // 'foobar'
```

### 1.2 - backticks

There are also backticks that can be used as well. These can be used in the same way as quotes, but also allow for things like function calls.

```js
let getN = () => {
    return 17;
};
let str = `n=${getN()}`;
 
console.log(str); // 'n=17'
```

### 1.3 - The result of an expression

Strings can often end up being the result of an expression with one or more operators. This can sometimes be an unintended result when respecting a number. When adding two strings together the result is another string, and when adding a string and a number together the result is also a string. Sometimes a method or property will supply a string where a number might be expected resulting in string concatenation where addition was expected. 

```js
let str = 7 + '2';
console.log(str); // '72'
 
let n = 7 + Number('2');
console.log(n); // 9
```