---
title: The inspect library in Python
date: 2021-01-11 14:13:00
tags: [python]
categories: python
layout: post
id: 778
updated: 2021-01-21 08:58:53
version: 1.11
---

Todays post will be on the [inspect library](https://docs.python.org/3/library/inspect.html) in python that can be used as a way to inspect live objects. Some examples of live objects are modules, classes, methods of classes, stand alone functions. There are also tracebacks, and frame objects that can eb used as a way to examining the state of the python interpreter.

The inspect library is packed with helpful methods for getting the members of a module, and also to find out if something is even a module to begin with. In addition there are many more additional such methods that have to do with extracting source code, and checking the state of frame objects. 

This is a library that seems to show up in a lot of basic python examples for various things, so it makes sense to take a moment to take a deeper look into the module as a whole.

<!-- more -->

## 1 - Use inspect to find out what I am dealing with when it comes to inspecting something

I have wrote a post on built in functions a little while back, and one helpful built in function is the type function. This is a good starting point when it comes to having a tool to know what a given value is. However in order to use it to test if something is a module for example I have to not just use the type function by itself, but rather use the name property in an expression in which I am comparing the name property to the string module. So if I want to know if something is a module or not, I can do an expression with the type function, or I can use an inspect function such as the is module function.

So this section Will be a quick overview of some of these methods of the inspect library, and I guess I can also take a moment to touch base on the type built in function while I am at it.

### 1.1 - Is module

When it comes to using the inspect module to start inspecting the contents of a module, it is great to have a way to first find out if I am even dealing with a module to begin with. For such a task I can use the is module function of the inspect library to so so. An alternative with python by itself would have to involve the use of the type built in function in a simple expression.

```python
import inspect
print(inspect.ismodule(inspect)); # True
 
# this can slo be done with the type built in
# function with an expression like this:
print( type(inspect).__name__ == 'module' ) # True
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

## 2 - The get members method

The get members method of the inspect module can be used as a way to get all the members of an object, sorted by the name of each. In addition is is possible to pass a predicate function as a second argument that can be used as a way to filter members of the object. So when it comes to learning about a module I can use this method as a way to get all the classes of a module to know what I am dealing with when it comes to the classes that are in a module. So in this section I will be going over the get members method of inspect, and how it can be used as a way to filter over libraries.

### 2.2 - Get all members of the sys module

```python
import inspect
import sys as mod
 
m=inspect.getmembers(mod);
for i in m:
    if i[0].startswith('__') == False:
        # prop name
        print(i[0], ':')
        # prop type
        print(type(i[1]).__name__)
        print('')
```

## 3 - Get current frame

One thing I might need to do now and then in python is to get the current call stack frame. So far it seems like this is something that I need to do in order to get a path to the current script that is being called.

### 3.1 - Basic get current frame example

```python
import inspect
f=inspect.currentframe()
print(inspect.isframe(f)) # True
```
