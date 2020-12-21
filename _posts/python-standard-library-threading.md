---
title: The Threading Standard Library in Python 
date: 2020-12-21 12:49:00
tags: [python]
categories: python
layout: post
id: 766
updated: 2020-12-21 14:14:06
version: 1.1
---

For now I think I should continue [learning python](https://docs.python.org/3/tutorial/) and as such the thought came to mind as to how it is that I can go about making an app loop in python.

<!-- more -->

## 1 - Basic Timer example

```python
import threading
 
def printMess():
  print('delay');
 
print('start');
t = threading.Timer(3, printMess)
t.start()
print('end');
```

## 2 - Basic app loop example

```python
import threading
 
def printMess():
  print('hello');
 
def loop(func, sec):
  def wrapper():
    loop(func, sec)
    func()
  t = threading.Timer(sec, wrapper)
  t.start()
  return t
 
t=loop(printMess, 1)
```