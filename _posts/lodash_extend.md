---
title: The lodash _.extend method for combining objects, and alternatives
date: 2018-10-01 11:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 294
updated: 2018-10-01 12:05:56
version: 1.1
---

When working with many objects there some times comes a need to combine them all together, when doing so things can get a little confusing. There are what is often referred to as the objects own properties, then there are inherited properties. In addition there is also ways of making hidden properties, and also the nature of copying by reference rather than value with objects in javaScript as well. In this post I will be writing about the [lodash](https://lodash.com/) object method known as [\_.extend](https://lodash.com/docs/4.17.10#extend), and how it compares to other methods in lodash, and javaScript by itself. Hopefully this post will help eliminate some confusion that you might have with combining objects in javaScript, or reinforce what you all ready know, so lets get to it.

<!-- more -->

## 1 - what to know
