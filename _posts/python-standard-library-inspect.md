---
title: The inspect library in Python
date: 2021-01-11 14:13:00
tags: [python]
categories: python
layout: post
id: 778
updated: 2021-01-11 15:47:11
version: 1.5
---

Todays post will be on the [inspect library](https://docs.python.org/3/library/inspect.html) in python that can be used as a way to inspect objects. So the library is packed with helpful methods for getting the members of a module, and also to find out if something is even a module to begin with.

<!-- more -->

## 1 - Use inspect to find out what I am dealing with when it comes to inspecting something

I have wrote a post on built in functions a little while back, and one helpful built in function is the type function. This is a good starting point when it comes to having a tool to know what a given value is.

### 1.1 - Is module

When it comes to using the inspect module to start inspecting the contents of a module, it is great to have a way to first find out if I am even dealing with a module to begin with.

```python
import inspect
print(inspect.ismodule(inspect)); # True
```

### 1.1 - Is function

The inspect modules also have a method that I can use to find out if I am dealing with a function or not. There is a deference between a function and a method, so when it comes to working with a class the is function method will return false for functions that are methods of a class.

```python
import inspect
 
def foo():
    return 'bar'
 
print(inspect.isfunction(foo)) # True
 
print( inspect.isfunction('') ) # False
print( inspect.isfunction(42) ) # False
print( inspect.isfunction([]) ) # False
```

### 1.1 - Is Class

There is then a method that I can use to find out if a value is a class.

```python
import inspect
 
class P(object):
    """Definition for P class."""
 
    def __init__(self, b, e):
        self.b = b
        self.e = e
 
    def get_p(self):
        return pow(self.b, self.e)
 
a=P(2, 4)
print(a.get_p()) # 16
print(inspect.isclass(P)) # True
print(inspect.isclass(a)) # False
```

### 1.2 - Is method

There is also a function that can eb used to find out if something is a method of a class rather than a stand alone function.

```python
import inspect
 
class P(object):
    def __init__(self, n):
        self.n = n
    def get_n(self):
        return self.n
 
a=P(2)
# when working with a class I want to use
# is method over is function
print(inspect.isfunction(a.get_n)) # false
print(inspect.ismethod(a.get_n))   # True
```

