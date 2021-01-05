---
title: Shallow and deep Copying of objects in Python
date: 2021-01-05 11:15:00
tags: [python]
categories: python
layout: post
id: 775
updated: 2021-01-05 11:53:16
version: 1.1
---

The [copy standard library](https://docs.python.org/3/library/copy.html) in python is yet another standard library in python that might prove to be imporant for most typical projects. I say that speaking from experence in other languages at least, so I should have one way or another to copy objects in python. Copying an object is not always so quick and simple, there is copying just the primative values of an object which will result in a so called shallow copy of an object, and then there is also copying any additional nested objects which would result in a deep clone.

<!-- more -->
