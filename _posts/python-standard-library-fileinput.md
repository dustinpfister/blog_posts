---
title: The fileinput Standard Library in Python 
date: 2020-12-22 12:55:00
tags: [python]
categories: python
layout: post
id: 767
updated: 2020-12-22 13:16:54
version: 1.2
---

When learning a new programing language such as Python one thing that comes to mind that I like to learn about right away os how to go about reading from the standard input. When it comes to Python there is the [fileinput library](https://docs.python.org/3.7/library/fileinput.html) that can be used to read from the standard input, but can also be used as a way to read a collection of files also. There is one main function of interest in this libray when it comes to reading standard input and that would be the input method, by default it will read from the standard input if no file list is given.

There are some additional features of the fileinput library also though, on top of reading from the standard input the fileinput library can be used as a way to read a collection of files. Also there are some realted topics that come to mind when using the fileinput library such as piping in a posix system, the open built in function when it comes to reading just one file, and also the subprocess library when it comes to getting a collection of file names. So in this post I will of course be going over a basic example of reading from the standard input with the fileinput library, but will also be going over some more examples that touch base on other related python topics.

<!-- more -->
