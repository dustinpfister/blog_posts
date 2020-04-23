---
title: Array fill native and not in javaScript
date: 2020-04-23 15:26:00
tags: [js]
layout: post
categories: js
id: 650
updated: 2020-04-23 15:30:31
version: 1.0
---

These days there is not a native [array fill prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill), and unless you care a great deal about backward compatibility the native array fill method works just fine. Unless you do want to use a pony fill method of area fill because you want to make sure what you are making will work on a wider range of platforms then you might want to use something else. Also sometimes filling an array with something might mean something other than just filling it with the same value for each index. So lets look at some examples of filling an array with data.

<!-- more -->
