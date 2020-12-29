---
title: Modules in Python
date: 2020-12-29 14:14:00
tags: [python]
categories: python
layout: post
id: 770
updated: 2020-12-29 14:39:25
version: 1.4
---

In the past few weeks I have been making an effor to start learning python, and as such I should start getting into how to star making some kind of real project with python at some point. With that said I should start to learn the basics of how to go about creating modules with python. So in this post I will be going over the basics and more when it comes to modules, and packages in python as I have come to know it thus far.

<!-- more -->

## 1 - Basic script example

The first kind of module that comes to mind might not really be a module as it would seem that it is actually refered to offten as a script actually. However I think that it is something that I should start off with at least when it comes to the topic of modules. After all when it comes to using modules there is still going to need to be some kind of main file that is called to start a main programe of some kind. This main file might not really be a module, but it is of cource a way to go about uisng a module.

### 1.1 - Basic hello world script

The basic idea of a script is to just save some python code as a file with a py file name extension. That way I do not have to keep typing the same python code over and over again I can just call the file each time. When doing so it might make sense to place a shebang at the top of the file when it comes to this kind of file that will be called directly with the python binary.

So say I have a hello.py file like this:

```python
#!/usr/bin/python3
def HelloWorld():
    print('Hello World');
HelloWorld()
```

I can call it with python like this:

```
$ python3 basic.py
Hello World
```

Or I can make the file exacutabaule and call it directly thanks to the shebang

```
$ chmod 755 basic.py
./basic.py
Hello World
```

So that is the basic idea when it comes to a script.

## 2 - Creating my own module

### 2.1 - Basic hello world module example

So for this example I have a hello.py file like this:

```python
def HelloWorld():
    print('Hello World');
```

This file just creates one function called hello world and that is it. I am not calling the funciton here, or doing anything more beyond just defining this one simple function. So this hello.py file will be the module, and I will now need a script to make use of this module.

With that I then have a script\_hello.py file like this:

```python
#!/usr/bin/python3
 
# import my hello.py module
import hello
 
# I can now call my hello world function
# from this script file
hello.HelloWorld();
```

This is then a simpkle script file that will be called with python and will make use of my hello.py module.

```
$ python3 script_hello.py
Hello World
```