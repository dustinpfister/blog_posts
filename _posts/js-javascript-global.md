---
title: JavaScript global variables and the global object
date: 2019-01-31 17:28:00
tags: [js]
layout: post
categories: js
id: 369
updated: 2019-02-01 09:58:42
version: 1.2
---

In javaScript global variables are variables that can be accessed from anywhere within the javaScript application and are therefor at the global name space. In most environments global variables are also part of what is often called the [global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object), in client side javaScfipt this is typically the window object but it can also be other objects as well such as when working with a web worker environment. In this post I will be writing about some things to be aware of when dealing with global variables, as well as the alternative when would be local function level, and not block level scoped variables.

<!-- more -->


## Implicit Globals

It is possible to create what is often called an implicit global, this is something that often happens by accident by forgetting to use a keyword like var or let. Generally implicit globals are something that a javaScript developer would want to avoid doing. I can not think of any use case example in which doing so is called for. I would always want to declare my variables at the top level if for some reason I do want a global variable, or append to the global object by some other means if I want to do so somewhere other than the top level.