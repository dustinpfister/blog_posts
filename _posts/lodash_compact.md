---
title: removing false values from an array with _.compact.
date: 2017-08-09 13:41:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id:253
updated: 2018-08-09 13:53:56
version: 1.1
---

For today I will be writing another on eof my quick little posts on [lodash](https://lodash.com/), just for the hell of it. My approach with lodash is that when I write a post on a certain lodash method, I am not just writing about lodash, but a certain way to preform a certain task often involving arrays, or array like objects. So under that light I think it is a good idea to write some content on the topic. Anyway todays post will center around the [\_.compact](https://lodash.com/docs/4.17.10#compact) method that can be used to quickly remove false values awway from an array. Covering the method by itself is not that involved, but it can branch off into some additional topics when it comes to doing the same with just plain old vanilla js, the deal with NaN, and there are other relevant lodash methods of interest as well, so lets do this.

<!-- more -->

## 1 - What to know

This is a post centered around the \_.compact method in lodash, a popular javaScript utility library that is packed with useful methods that help with common tasks when working with objects, arrays, functions and so forth in a jaavScript project. It is not a getting started post on lodash, or javaScript in general as that is outside the scope of this post. The \_.compact method can be used to remove elements fro an array that evaluate as false, there are many other ways to do this with lodash, as well as javaScript by itself.

## 2 - Basic example of \_.compact
