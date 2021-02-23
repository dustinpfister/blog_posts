---
title: The textwrap standard library in python
date: 2021-02-23 13:28:00
tags: [python]
categories: python
layout: post
id: 809
updated: 2021-02-23 13:33:25
version: 1.0
---

I think that I am going to want to write at least a few more posts on the collection of standard librires that are built into python itself so I do not waste time working out my own solutions for things that can be set and done in a flash with some feature that is built into python itself. One thing that I need to do now and then is break a string into a collection of lists where each element in the list is a substring of the original source text that is no more than a certian set charicter length long. In other words I often need a way to wrap text which is a common feature in most text editors, or any project that might involve a fair amount of text that needs to be displayed. I often work out my own quick solutions for this, but there is a built in [librray called textwrap](https://docs.python.org/3.7/library/textwrap.html) for this one that helps to make get this part of programing out of the way yet even fatser.

<!-- more -->
