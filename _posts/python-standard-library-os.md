---
title: The OS library in Python
date: 2021-01-06 13:26:00
tags: [python]
categories: python
layout: post
id: 776
updated: 2021-01-06 14:48:38
version: 1.2
---

The [os standard library](https://docs.python.org/3/library/os.html) in python is a library that contains some operating system dependent functionality. There are afew other librarys that come to mind that can also be used as a way to make use of opearting system depedant features. For example the subprocess librray can be used to call a command on the host operating system, but before doing so it helps to know what operating system you are working with first. So the os standard library is a good staring point when it comes to checking out what kind of system my code might be running on top of.

<!-- more -->

## 1 - Some core features of interest in the os module

There are a great number of functions in the os library, but there are only really a few that are often actaully used in a project. In this section I will just be going over some of the basic features of the module that I actually find myself using in code projects so far. If you want to know everything there is always the offical documnation on the os librray that covers every little function in the library.

### 1.1 -