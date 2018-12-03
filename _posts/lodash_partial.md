---
title: _.partial for creating a function with from another function with some set arguments
date: 2018-12-02 19:29:00
tags: [js,lodash]
layout: post
categories: lodash
id: 342
updated: 2018-12-02 19:46:27
version: 1.1
---

The [\_.partial](https://lodash.com/docs/4.17.4#partial) method in [lodash](http://lodash.com/) can be used to create a new function from another function and some starting arguments. In other words it can be used to create simplified function that only accepts a few arguments that will be used with some set static values when using another method that accepts more arguments. If you are still confused maybe it would be best to just look at some code examples so lets take a look at \_.partial in lodash, as well as some plain vanilla javaScript code as well.

<!-- more -->
