---
title: BigInt basics in javaScript for numbers beyond max safe int
date: 2019-09-06 15:46:00
tags: [js]
layout: post
categories: js
id: 531
updated: 2019-09-06 14:53:50
version: 1.1
---

So the regular number type in javaScript has some limitations when it comes to working with very large numbers beyond that of the max safe integer. In the past a library would have to be used that involves representing a number with a string if a project requires working with large numbers and preserving number precision. However in modern browsers and node 10.4.x + there is now the BigInt Object that now provides that kind of functionality in native javaScript by itself. As of this writing the [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object is still not well supported so you might still want to use a library for that reason, but in time such libraries will no longer needed for this because of this native support.

<!-- more -->
