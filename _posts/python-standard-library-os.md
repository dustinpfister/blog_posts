---
title: The OS library in Python
date: 2021-01-06 13:26:00
tags: [python]
categories: python
layout: post
id: 776
updated: 2021-01-06 15:06:17
version: 1.6
---

The [os standard library](https://docs.python.org/3/library/os.html) in python is a library that contains some operating system dependent functionality. There are afew other librarys that come to mind that can also be used as a way to make use of opearting system depedant features. For example the subprocess librray can be used to call a command on the host operating system, but before doing so it helps to know what operating system you are working with first. So the os standard library is a good staring point when it comes to checking out what kind of system my code might be running on top of.

<!-- more -->

## 1 - Some core features of interest in the os module

There are a great number of functions in the os library, but there are only really a few that are often actaully used in a project. In this section I will just be going over some of the basic features of the module that I actually find myself using in code projects so far. If you want to know everything there is always the offical documnation on the os librray that covers every little function in the library.

### 1.1 -

## 2 The open built in function, os.open, and os.fdopen

When it comes to opening a file and reading and writing the contents it might be best to just use the open built in function. This functin makes opening, reading, writing, and creating files easy. The open built in function will wrap a file diesciptor, and it will aslo dirrectly return a file object that can be used to quckly and easily read and edit a file.

However in some cases I might need to do something involving opening just a file descriptor first, and then passing that file descriptor to another function that will return a file object. In any case in this section I will be quickly going over the open built in function, as well as some of the other functions in the os librray that have to do with opening a file.

### 2.1 - The open built in function

The open built in function is one way to go about quickly and easily opening a file, and start writing to it.

```python
f=open('foo.txt', 'w')
 
f.write('hello world');
 
print(f.fileno()) # the file no
 
f.close()
```

### 2.2 - os.open, and os.fdopen

In the os library there is the os.open function that WILL NOT return a file object like the built in open function.

```python
import os
 
fd=os.open('foo.txt', os.O_RDWR|os.O_CREAT)
f=os.fdopen(fd, 'w+')
 
f.write('Okay now');
 
print(fd) # the file no
print(f) # the file object
 
f.close()
```

