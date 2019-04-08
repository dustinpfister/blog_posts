---
title: String Replace prototype method in javaScript
date: 2019-04-08 15:03:00
tags: [js]
layout: post
categories: js
id: 413
updated: 2019-04-08 14:41:52
version: 1.3
---

The [String Replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) String prototype method in javaScript comes in handy when it comes to most text search and replace tasks involving regular expressions.


<!-- more -->

## 1 - String Replace method basics

In order to use the the String.replace string prototype object it is important to have a fairly solid grasp on regular expressions. I will be covering some examples of them here in this post of course, but I will not be getting into regular expressions in detail here, as I have a [post where I have done so when it comes to regex](/2019/03/20/js-regex/).

The basic idea of String.replace is to come up with a regular expression that will match the one or more patterns that I want to replace with something else, and use that pattern as the first argument for String.replace. The second argument then is the string to replace all matches for the pattern in the string to which the prototype method is being called off of.

```js
let str = 'It is a bad day to do bad things for bad people',
result = str.replace(/bad/g, 'good');
 
console.log(result);
// 'It is a good day to do good things for good people'
```