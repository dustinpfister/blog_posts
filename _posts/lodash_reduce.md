---
title: The lodash _.reduce method and Array.reduce.
date: 2018-07-25 09:36:00
tags: [js,lodash]
layout: post
categories: lodash
id: 242
updated: 2018-07-25 11:02:35
version: 1.0
---

For todays post on [lodash](https://lodash.com/) I thought I should write a post on the [\_.reduce](https://lodash.com/docs/4.17.10#reduce) collection method, and also of course the corresponding Array.reduce method in core javaScript itself. The Array.reduce method works just fine, however if you are using lodash in a project the \_.reduce method is a little more robust, as it is one of the many lodash collection methods with baked in shorthands as well. In any case the two solutions work very similar, and this post should help gain some insight as to why reduce is useful in some situations that call for it.

<!-- more -->

## 1 - Before continuing

This is a post on the \_.reduce method in lodash a javaScript framework that has many useful methods for working with objects, and arrays. Much of the functionality in lodash is now more often then not baked into javaScript itself these days, but not always, and some times the native solutions do not work the same, and with less features. In any case this is not a getting started post on javaScript in general, and I assume that you have at least some background with javaScript.