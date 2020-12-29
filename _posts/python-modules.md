---
title: Modules in Python
date: 2020-12-29 14:14:00
tags: [python]
categories: python
layout: post
id: 770
updated: 2020-12-29 14:52:57
version: 1.8
---

In the past few weeks I have been making an effort to start learning python, and as such I should start getting into how to go about making some kind of real project with python at some point. So far I have been just toyinh around with small snippits of code, and working out the very basic of python programing. However when it comes to the idea of getting into making something real I am going to want to knwo how to go about making modules. That is how to go about taking code and breaking it down into sepearte files to which I can then import into another file that will be the main python file or scirpt file that will be started with the python binary one way or another.

So in this post I will be going over the basics and more when it comes to modules and scripts in python as I have come to know it thus far. Such as the difrenec between a script and a module, how to go about using a module from a script file, and how to go about creating a module of my own.

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

Now that I have covered the basic of makign what a script file is often called, it is time to create some basic modules of my own. In this section I will be quickly going over a few basic examples of making my own modules in python. These modules will be files that just define some functions that can then be used in a script file. I will be strting out with some very basic examples, and the maybe move into something that might start to be the very beginings of an actualy project of some kind, however that might still be a bit of a streatch to call it that.

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

## 3 - Conclusion

That will eb it for now when it comes to modules in python. There is a great deal more to write about on this topic of course, but I am still new to python myself when it comes to this topioc so I need to spend a little more time working on some actaul code examples when it comes to things like packages. There are also some additiotnal standards and best practaces that I did not get to when it comes to makig modules, however again I think that should all be part of a future packages section in this post when  and if I get around to editing this post a little next time.
