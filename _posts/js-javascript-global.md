---
title: JavaScript global variables and the global object
date: 2019-01-31 17:28:00
tags: [js]
layout: post
categories: js
id: 369
updated: 2019-01-31 17:34:45
version: 1.0
---

In javaScript global variables are variables that can be accessed from anywhere within the javaScript application and are therefor at the global name space. In most environments global variables are also part of what is often called the global object, in client side javaScfipt this is typically the window object but it can also be other objects as well such as when working with a web worker environment. In this post I will be writing about some things to be aware of when dealing with global variables, as well as the alternative when would be local function level, and not block level scoped variables.

<!-- more -->

