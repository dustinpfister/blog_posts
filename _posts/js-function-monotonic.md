---
title: Writing monotonic functions in JavaScript
date: 2021-07-26 09:14:00
tags: [js]
layout: post
categories: js
id: 918
updated: 2021-07-27 12:06:58
version: 1.1
---

I have been learning more about writing [functions in javascript](/2019/12/26/js-function/) as of late, not so much when it comes to what the options are when it comes to functions themselves in javaScript, but different styles of functions that have more to do with math in general. That is that I have a fairly solid grasp on what a function expression is compared to a function declaration, and why arrow functions are not a drop in replacement for all kinds of functions in source code. I also know a thing or two about the function prototype object and how to use methods in the function prototype like call or apply to get a function of one prototype to work with an object of another prototype. However this post is not on any of that, it is on the topic of what a [monotonic function](https://en.wikipedia.org/wiki/Monotonic_function) is compared to other kinds of functions that are not monotonic.

<!-- more -->
