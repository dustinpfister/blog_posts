---
title: js string index of method and other ways of getting index values in strings
date: 2020-07-09 08:59:00
tags: [js]
layout: post
categories: js
id: 679
updated: 2020-07-09 10:15:55
version: 1.1
---

The javaScript [string index of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method was introduced to javaScript a real long time ago. It is one of these javaScript prototype methods that is very safe to use because it was around almost since the beginning as the method works even in versions of Internet explorer as old as version 3.

The string index of method will give an index value of a character in a string from the right to left that is the beginning of another string that is given as the first argument. In the event that at least one instance of the given string is found it will return an index value, in the event that it is not it will return the number negative one.

So then this string index of method in the string prototype object will work just fine when it comes to using strings rather than regular expressions, and if I am just interested in the first instance of a substring in another string from left to right. However in some situations I might want to get all index values of a fixed string, or even a pattern of sorts. When it comes to this the index of method falls short. To get all index values it would be better to use the [exec method](/2020/07/08/js-regex-exec/) of the [regular expression](/2019/03/20/js-regex/) class rather than string index of method.

So lets look at a few simple examples of the string index method here, and also maybe touch based on some related topics without getting into to much detail.

<!-- more -->
