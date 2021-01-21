---
title: The inspect library in Python
date: 2021-01-11 14:13:00
tags: [python]
categories: python
layout: post
id: 778
updated: 2021-01-21 10:49:43
version: 1.19
---

Todays post will be on the [inspect library](https://docs.python.org/3/library/inspect.html) in python that can be used as a way to inspect live objects. Some examples of live objects are modules, classes, methods of classes, stand alone functions. There are also tracebacks, and frame objects that can eb used as a way to examining the state of the python interpreter.

The inspect library is packed with helpful methods for getting the members of a module, and also to find out if something is even a module to begin with. In addition there are many more additional such methods that have to do with extracting source code, and checking the state of frame objects. 

This is a library that seems to show up in a lot of basic python examples for various things, so it makes sense to take a moment to take a deeper look into the module as a whole.

<!-- more -->

## 1 - Type checking with the inspect library, to find out what I am dealing with when it comes to inspecting things

I have wrote a post on built in functions a little while back, and one helpful built in function is the type function. This is a good starting point when it comes to having a tool to know what a given value is. However in order to use it to test if something is a module for example I have to not just use the type function by itself, but rather use the name property in an expression in which I am comparing the name property to the string module. So if I want to know if something is a module or not, I can do an expression with the type function, or I can use an inspect function such as the is module function.

So this section Will be a quick overview of some of these methods of the inspect library, and I guess I can also take a moment to touch base on the type built in function while I am at it.

### 1.1 - The inspect.ismodule method

When it comes to using the inspect module to start inspecting the contents of a module, it is great to have a way to first find out if I am even dealing with a module to begin with. For such a task I can use the is module function of the inspect library to so so. An alternative with python by itself would have to involve the use of the type built in function in a simple expression.

```python
import inspect
print(inspect.ismodule(inspect)); # True
 
# this can slo be done with the type built in
# function with an expression like this:
print( type(inspect).__name__ == 'module' ) # True
```

### 1.1 - The inspect.isfunction method

The inspect modules also has a method that I can use to find out if I am dealing with a function or not. There is a deference between a function and a method when it co,es to a function that is part of a class. Simply put if a function is a part of a class insatnce then it is a method, otherwise it is a stand alone function. So when it comes to working with a class the inspect.isfunction method will return false for functions that are methods of a class, and true if the function is just a function by itself.

```python
import inspect
 
def foo():
    return 'bar'
 
print(inspect.isfunction(foo)) # True
 
print( inspect.isfunction('') ) # False
print( inspect.isfunction(42) ) # False
print( inspect.isfunction([]) ) # False
```

### 1.1 - The inspect.isClass method

There is then a method that I can use to find out if a value is a class or not. I will not be getting into a class in detail here, as doing so might be a bit off topic. However a class is a way to go about creating not just an object, but a kind of class of an object. The class itself can be used to create an object that is an instance of that class, and this instance often has a few methods that are functions tht can be called off of a class instance. However as far as i am concern for this section at least the inspect.isclass method is used to just find out if something is a class or not.

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

### 1.2 - The inspect.ismethod method

There is also a function that can be used to find out if something is a method of a class rather than just a stand alone function. As i have mentioned in the section on the inspect.isclass method there are functions that can be called off of an instance of a class that are called methods. The inspect.ismethod method can be used to find out if a function is a method of a class, while the inspect.isfunction method is there to find out if I am dealing with a stand alone function or not.

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

Lets start off with a simple example of the inspect.getmembers method where I am taking a look at everything there is to work with in the sys module.

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

### 2.3 - Get just the functions in the copy module

When using the get members method of the inspect module I can pass one of the type checking methods of the inspect module as a section argument. The result will be a collection of memebers that are of the type that matches the given type checking method. For example say that I just want the functions in the copy module to which there apear to be only two copy and deep copy. I can pass the copy module as the first argument, and then the inspect.isfunction method as the second argument.

```python
import inspect
import copy as mod
 
m=inspect.getmembers(mod, inspect.isfunction);
for n in m:
    if bool(n[0][0] != '_'):
        print(n[0])
# copy
# deepcopy
```

## 3 - Get The current frame object

One thing I might need to do now and then in python is to get the current call stack frame. So far it seems like this is something that I need to do in order to get a path to the current script that is being called, however I am sure that there are many other examples where I might need to work with frame objects.

### 3.1 - Basic get current frame example

The inspect.currentframe method is one way to go about getting a frame object.

```python
import inspect
f=inspect.currentframe()
print(inspect.isframe(f)) # True
```

## 4 - Get dir of current script example using import, os, and sys

So far the main reason why I might use the inspect library is to help me with getting absolute paths that I might want to insert into the paths list of the sys library. In real examples the inspect library is often not used alone of course, the library goes hand in hand with many other built in librarays such as the os library, and the sys library just to name a rew.

```python
import os,sys,inspect
 
# CURRENT WORKING DIR
# can be obtained with os.getcwd()
dir_current = os.getcwd()
 
# DIR OF THIS SCRIPT
# get current frame object with inspect.current frame,
# the frame object can then be passed to inspect.getFile
# that path can then be passed to os.path.abspath, and os.path.dirname
frame_obj = inspect.currentframe()
path_script = inspect.getfile(frame_obj)
dir_script = os.path.dirname(os.path.abspath(path_script))
 
# DIR OF PARENT FOLDER OF THIS SCRIPT
# once I have the dir to the script I can just pass that to os.path.dirname
# to go down one level
dir_parent = os.path.dirname(dir_script)
 
# INSERT
# the sys.path list is a list of dirs where python
# will look for modules. I can then insert the parent folder
# to make python look there for any additional modules
# I might like to import
sys.path.insert(0, dir_parent)
 
print(dir_current)
print(path_script)
print(dir_script)
print(dir_parent)
```

## 5 - Conclusion

The inspect module strikes me as one of several modules that I am going to want to use when it comes to starting a real python project of some kind. The main reason why is becuase of the feature of getting and using frame objects, at least more son than the type checking features anyway. 

One other core library that I think is important so far is the sys library which contains the path list that I am going to want to work with a little now and then. The sys library can also be used to access positional argumnets that might have been given at the command line when the script was called, however there is another library called argparse that is also part of a core stack of sorts when it comes to parsing command line options.

In one of the examples in this post I also made use of the os library that also contains a buch of helpful methods that have to do with working with paths.
