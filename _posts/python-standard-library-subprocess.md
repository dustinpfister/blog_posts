---
title: The Subprocess Library in python
date: 2021-01-13 16:24:00
tags: [python]
categories: python
layout: post
id: 780
updated: 2021-01-14 12:06:55
version: 1.1
---

When learning a new programing enviorment one thing that I like to learn how to do is how to go about launching another script, or command complatly in the operating system if I can do so. In nodejs there is the child process module for example that provides methods that can be used to run a command, so there should be such a module in python also then. It would seem that the best option for doing so might be the [subprocess librray](https://docs.python.org/3.7/library/subprocess.html) that contains such methods. There are some other options when it comes to running external commands, butthe other built in options are older solutions that are still there mainly so older code does not break.

For this post then I will be going over some basic examples of the subprocess module then.

<!-- more -->
