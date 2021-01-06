---
title: The OS library in Python
date: 2021-01-06 13:26:00
tags: [python]
categories: python
layout: post
id: 776
updated: 2021-01-06 15:43:08
version: 1.14
---

The [os standard library](https://docs.python.org/3/library/os.html) in python is a library that contains some operating system dependent functionality. There are afew other librarys that come to mind that can also be used as a way to make use of opearting system depedant features. For example the subprocess librray can be used to call a command on the host operating system, but before doing so it helps to know what operating system you are working with first. So the os standard library is a good staring point when it comes to checking out what kind of system my code might be running on top of.

On top of basic functions and properties to find out what kind of opearting system python is running on there are also a number of functions and methods that have to do with paths, and basic file io. The file io features are not a replacement for the open built in function which is what I would be more interested in using for most basic examples and projects anway. If for some reason I want or need to do file io by way of getting a file descriptor first, and then passing that file descriptor to a function to open a file object, and more with file io in a more profesional way, then the file io methods in the os librray can be used to do that kind of file io.

<!-- more -->

## 1 - Some core features of interest in the os module

There are a great number of functions in the os library, but there are only really a few that are often actaully used in a project. In this section I will just be going over some of the basic features of the module that I actually find myself using in code projects so far. If you want to know everything there is always the offical documnation on the os librray that covers every little function in the library.

### 1.1 - Get the current working dir, and change the current working dir

Two useful methods in the os library are the os.getcwd function, and the os.chdir function. These basic functions can be used to get, and change the current working directory.

```python
import os
 
os.chdir('/home') 
print(os.getcwd()) # '/home'
 
os.chdir('..')
print(os.getcwd()) # '/'
```

### 1.2 - The name property and uname function

One basic feature of the os library should of course be a features to help get an idea of what operating system I might be dealing with. For this there is the name property, this might not be the best way to go about getting a detailed idea of what kind of system there is to work with, but it sure is a good starting point at least. There are only three possible values for the name propery which are posix, nt, and java. This might not give all the information that one might need, but generaly there are only two kinds of systems that people use. A late version of windows (nt), or a posix based system of some kind typically MacOS, or Linux (posix).

If more detailed information is needed such as the version of the system there is also the os.uname method.

```python
import os
 
print(os.name) # posix, nt, or java
 
# the uname method can be used to get a
# better idea of the kind of system that is being used
# with things like kernal name, kernal version, and
# system arch.
uname=os.uname()
l=list(uname)
print( l[0] ) # Linux
print( l[2] ) # 5.4.79-v7+
print( l[4] ) # armv7l
```

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

## 3 - Get path of current script example

One use case example that I have found thus far where I need to use the os library is to get the path of a current script. The splution that I have found that works best thus far seems to be one that involves using the os library in addition to the sys and inspect librarys to do so.

```python
import os,sys,inspect
dir_current = os.getcwd()
dir_script = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
dir_parent = os.path.dirname(dir_script)
 
# insert dir_parent
sys.path.insert(0, dir_parent)
 
print(dir_current)
print(dir_script)
print(dir_parent)
```

When I start working on some real python projects it would seem that this is some code that I will have to have at the top of each of my files in order to get all the dirs that I typically want.

In nodejs there is the \_\_dirname variable that I can use to quickly get the path of the current file, thus far it would seem there there is no special varaible in python, at least there is no such variable thatI know off. In the event that I find such a varaible hopefully I will remember to edit this post. For now it would seem that this is what I need to do in order to get the all the ushual directorys that I need to know when working on a real project of some kind.

## 4 - conclusion

That is it for now when it comes to the os library in python. As of this writing I am still fairly new to python so I will need to work out at least a few real examples when it comes to python to really get an idea of what is imporatnt when it comes to using the os librray to get something done. So far there seems to be mainly the functons that are used to get and set the current working directoty, as well as to work with paths. 
