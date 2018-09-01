---
title: Setting default values with lodash
date: 2018-09-01 17:19:00
tags: [js,lodash]
layout: post
categories: lodash
id: 275
updated: 2018-09-01 17:25:08
version: 1.0
---

So when it comes to making helper methods, or constructor objects that are a little complex with javaScript there will be a need ro pass many properties to these kinds of functions. Some of the properties might be mandatory, other might be optional. In any case There might be a need to set some default values for these properties. In [lodash](https://lodash.com/) there is a quick convenience method that can be used to handle this process which is of couse the [\_.defaults](https://lodash.com/docs/4.17.10#defaults) object method in lodash. In this post I will be showing some quick use case examples of \_.defaults, as well as some vanilla js alternatives.

<!-- more -->

## 1 - What to know before hand.
