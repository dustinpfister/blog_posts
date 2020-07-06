---
title: String charAt, the bracket syntax, and char code at in javaScript
date: 2020-07-06 13:36:00
tags: [js]
layout: post
categories: js
id: 676
updated: 2020-07-06 13:45:03
version: 1.2
---

In javaScript there is the [charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) string prototype method that can be used as a way to get a single character in a javaScrit string. There is also just using the bracket syntax as a way to get a single char, the same way that old would get an element in an array, or a public named object key value in any javaScript object for that matter. There is also the [char code at](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt) method that is also in the javaScript string prototype object that does more or less the same thing as charAt only it will give a number value for the char rather than a string of the char.

<!-- more -->

## 1 - basic charAt method example compared to the bracket syntax

One thing about just using the bracket syntax to get a char in a string in javaScript is that it will return undefined if there is no char at that index. That is that if an index value is given that is outside the range of the string length the value that is returned is the undefined value rather than something like and empty strung. This however is not the case with the charAt prototype method, which will return an empty string in those kinds of situations.

```js
var str = 'abc';
 
// bracket syntax and charAt
console.log(str[2], str.charAt(2)); 'c' 'c'
console.log(str[10], str.charAt(10)); undefined ''
```