---
title: parseInt and other options for parsing numbers in javaScript
date: 2019-05-15 21:23:00
tags: [js]
layout: post
categories: js
id: 449
updated: 2019-05-15 21:30:32
version: 1.1
---

In javaScript [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) is one of several ways to convert a string to a number. parseInt does convert a string or number to an integer, but technically it is still a float as all numbers in javaScript a double precision floating point numbers. So it is really just a float with the fraction part removed. There are other was to parse to an integer, or float in javaScript as well so lets take a look at the options.

<!-- more -->

