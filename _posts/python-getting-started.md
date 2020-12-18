---
title: Getting started with Python
date: 2020-12-14 13:07:00
tags: [python]
categories: python
layout: post
id: 761
updated: 2020-12-18 16:12:59
version: 1.18
---

I like javaScript a lot, but I think that I am long overdue for learning at least one or two additional languages beyond just that of javaScript. I have started a collection of posts on bash scripts which I think can be thought of as another kind of language, although bash is only good for a very specific style of programing that has to do with automating work in a POSIX system such as Linux. Speaking of Linux I also wrote a post on gcc, and in that post I put together a few simple C language examples as I think that doing so is called for if I am going to write a post on gcc.

However I think that when it comes to starting another serious collection of content on another language, maybe it would be best to start with [learning the very basics at least of python](https://docs.python.org/3/tutorial/). I have took the time to start another personal collection of source code examples on python, and now I think that I should start writing some content on the subject.

So far there is a great deal that I like about python compared to a javaScript environment. I do like node still very much, but I can all ready see why a lot of people might prefer python when it comes to writing some kind of desktop application, of back end system. When it comes to built in modules there is just so much more to work with compared to node.

I am still pretty new to python, but I have to say that the process of learning it is going fast. Of course I do have a lot of experience with programing, so much of what is going on is just learning how to do things I all ready know how to do just with python rather than javaScript.

So then this post is a getting started post on python, and unlike with javaScript I am now writing about getting started with python from the perspective of someone who is still pretty new to the language. That was not the case when I started writing about javaScript, so in time maybe writing about python will help me in my efforts when it comes to improving my javaScript content. In any case lets start out with the very basics when it comes to getting started with python.

<!-- more -->

## 1 - Getting strated with python, and a python hello world example

So there is a lot to cover before I would even get to a simple hello world python program. For the most part I guess one can just simply install python and getting started with some basic examples. Although there are at least some basic things that should be covered before doing that. For one thing there is more than one major version of the python binary that will be used to run python code. As of this writing python 3 is the latest major release of python, but it is still important to know the minor version of python that is being used. 

Yes I will be getting to a hello world example in this post, but I will also be covering every little thing about the language, and the software that you need installed to even get to that point. Also I think I will touch base on many of the simple things that someone that should know about with python right alway that I see people neglect to mention in other getting started with python type posts.

### 1.1 - Installing Python

First off I think that I should mention that I am using Raspberry PI OS based off of Debian Linux 10 using the Linux 5.4.x kernel. In this distribution of Linux Python 3.7 is installed to begin with, so for this post, and much of the additional posts I will be writing moving forward I will be using this version of Python. It is not the latest version of python though, when I wrote this there is also a Python 3.9.

If you are not using a raspberry PI I strongly encourage that you look into them at least. They are not just for kids, what I like about them is there low cost, and the control that I have when it comes to working with operating system images. However I will not be getting into detail with all of that here, this is a post on Python after all not Raspberry pi and Linux.

Still I think that I should just mention that I am using A Linux system, and I generally prefer using Linux over Windows and MacOS. I will not be getting into installing python on systems that I do not use that much any more, or al all actually. If you are not using what I am using in terms of operating system technology and hardware I assume that you are still smart enough to know how to install the python binaries on your own by some guide outside of this post. Maybe one of the best sources would be the official python wiki that has a [page on installing python](https://wiki.python.org/moin/BeginnersGuide/Download).

### 1.2 - Python hello world file

So now for a very simple python hello world example. The python language has a number of built in functions, one of them is the [print function](https://docs.python.org/3.7/library/functions.html#print). The typical hello world of any language is to just simply print the text _Hello world_ in the standard out put. With that said just a single call of the print function with a string literal of the text passed as the first argument will work as a hello world example.

So if you write something like this in a text editor:

```python
print("Hello World")
```

And then save it as something like hello.py then it can be used in the command line like this:

```
$ python hello.py
Hello World
```

So then that would be one way to go about doing a hello world example of python. However maybe there are a number of other features and options that one should know about. So lets look at just a few more simple examples of python before moving on.

### 1.3 - A word on shebangs

When it comes to writing python scripts python is an example of a high level language such as bash and javaScript. In Linux and other systems that use bash as a shell, it is possible to place what is called a [shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) at the top of a script. This is a way to let bash know where a binary is to run a script that has been made executable.

When it comes to a shebang in python I just need to start off the first line of a script with a number symbol \# followed by an exclamation point. After that I just need to set the location of the python binary that I want to use to run the script, for me the python binaries are in the /use/bin folder.

So if I take the hello world example that I worked out I can add a shebang like this.

```python
#!/usr/bin/python
 
print("hello world")

```

I can then make the script executable with chmod, after that I can run the script directly without calling the python binary first.

```
$ chmod 755 hello.py
$ ./hello.py
hello world
```

This is something that does not just apply to python, but just about any high level language in general actually. When it comes to using javaScript outside of a web browser with node for example I can add a shebang to the top of my javaScript files also. The only difference is that I just need to have it point to the node binary location rather than python.

When it comes to any kind of low level language such as C, the use of a shebang is not required. The reason why is that C is an example of a language in which the source code is compiled into a binary from with a compiler. In which case there is no engine, or interpreter binary that must be called first, the compiled binary itself is what can be called directly. In that case the binary file just needs to be set executable by using chmod to set the permissions to do so for it.

### 1.4 - Indentation

Another thing that I think I should point out with python is indentation in python. In many other languages such as javaScript indention might be used when it comes to making a development form of source code, however when it comes to making that code ready for deployment it often makes sense to create another form of the source code where all the white space is removed. This might make sense when it comes to javaScript code, as finding ways to compact the size of source code files will often help to reduce the size of the files, and thus reduce the amount of bandwidth required to send it out to a client system. However when it comes to python this is not really a concern, in addition the removal of white space can and will actually result in errors.

The thing about python compared to languages such as javaScript is that it is a totally different syntax, javaScript uses a c like syntax that involves sets of curly brackets. This helps maintain the meaning of code when when whitespace characters including spaces, tabs, and returns are removed. However with python whitespace characters are the equivalent of those curly brackets. This is something that I became aware of right away when it comes to just working out some very basic examples involving just a simple if statement.

This WILL cause an error:

```python
x=5
if x > 4:
print('x is > 4') # works
```

This WILL NOT cause an error:

```python
x=5
if x > 4:
  print('x is > 4') # works
```

so returns and white space are important in python as it is a way to define blocks of code. There is not standard as to how many spaces you use to indent, just as long as you use at least one.

## 2 - Variables

So now that I have covered the very basics of getting started with python, maybe it is time to move on to something more beyond just printing hello world in the standard output. There are many different ways that I could go from that very basic starting point when it comes to leaning a new language, but maybe a good choice would be getting into some of the basics when it comes to variables in python. In this section I will not be getting into everything and anything variable related when it comes to variables, however at least some of the basics should be covered when it comes to this getting started post.

### 2.1 - Basic variable example

In javaScript there is var, const, and let that needs to be type first followed by the variable name. However with python there is just simply typing the variable name, then assigning a value to it, and that is it.

```python
x = 5
y = x + 10
print(y)
```

Of course there is a whole lot more to write about when it comes to variables and python. I think that many subjects surrounding variables in python should be pulled into another post. However maybe there are at least a few more things that I should touch base on at least. So lets look at just a few more examples of variables in python.

### 2.2 - The type built in function

This is a getting started python post, so I will not be getting into data types in depth here. However I think that I should at least mention the type built in function. This is how one will go about finding out what kind of data type one is dealing with when creating variables.

```python
a = 5
print( type(a) ) # <class 'int'>
 
b = 5.7
print( type(b) ) # <class 'float'>
 
c = 'string'
print( type(c) ) # <class 'str'>
 
d = ['one', 2, 3, 'four']
print( type(d) ) # <class 'list'>
 
e = bool(0)
print( type(e) ) # <class 'bool'>
```

In javaScript there is just one data type for numbers, however in python there is more than one data type just for numbers. On top of that there are a number of options for data structures just when it comes to what there is to work with in python by itself without adding any additional module. If that is not enough there is a wide range of additional modules that add additional data types that have to do with a wide range of different tasks.

### 2.3 - Like javaScript it would seem that Python is a typeless language

There are a few things held in common with javaScript, they are both high level languages that require and external binary in order to run the code as I have mentioned before hand. However another thing that the hold in common is that they are both examples of typeless languages. This does not mean that python does not have data types, it sure does, however what it does mean is that a variable can be any type at any given moment. This can easily be confirmed with a little python code.

```python
a = 'a is a string'
print(a, type(a)) # a is a string <class 'str'>
a = 42
print(a, type(a)) # 42 <class 'int'>
```

This is something that will cause an error in other languages that have string typing. In those kinds of languages you can not just go from a string to some other data type such as an integer.

## 3 - Comments in python

Another topic that I think I should write about here is how to go about writing comments in python. The good news is that if you know how to create comments in bash then you all ready know how to create them. The bad news is that you have come to like how comments are done in languages such as javaScript there is to true multi-line comment syntax. However [one trick to get a multi line comment like effect in python](https://dbader.org/blog/python-multiline-comment) is to have a multi like string literal. This is not a comment mind you, but it is a string literal that just does not do anything.

```python
#!/usr/bin/python

# Real python comments are like that of bash using the # symbol

# There is no real multi-line comment syntax
# For Python so one way to do it is to just
# use the # symbol over and over again

"""
However another trick is to have a multi-line
String literal or constant if you prefer
This is not a real comment in python it is
very much a string value. However by choosing to
do nothing with it the string value will
work like a multi-line comment
"""
```

## 4 - Functions

If I find myself repating the same block of code over and over again, I might want to take that block of code and pull it into a function, then each time I need to repeat the block of code I can just call the function each time. In this section I will be going over a few quick examples of fucntions in python without getting to deep into evey little detail about them, this is a getting started post on python anyway.

### 4.1 - Basic function example

So lets start out with a very basic example of a function in python. To create a function I first start out with the def keyworld followed by a name for the function. I then need an opening and closing set of parenteseses, and then I just need to end the line with a colon. After that line I just need to indent for each line aftyer that to define what the block of code for the function is.

```python
def foo():
    return 'bar'
 
print( foo() ) # bar
```

In this example I am also using the retrun keyword to define a retur value for the function.

### 4.2 - Parameters for functions

It is possible to define a number of parameters for a function to do so I just need to place each name of a parameter in the set of paremnetetes for the function. I can then use those local parameterst in the logic of the function.

```python
def add(a, b):
    return a + b
 
print( add(1,1) ) # 2
```

### 4.3 - Default Argumnets for function parameters

One great thing about functions in python is that it is real easy to set some default argumnets for parameters. Just use the equal sign to assign default values for each parameter in the set of pareneteses.

```python
def per(a=90, scale=360):
    return a / scale;
 
print( per() ) # 0.25
print( per(180) ) # 0.5
print( per(1.57, 6.28) ) # 0.25
```

## 5 - Conclusion

So that is it for my getting started post on python, as I continue working out additional examples I am sure that I will come around to edit this post and add even more additional sections and examples. I am still fairly new to python myself, so I need to keep working on code examples before I can gain a batter sense of what should and should not be parked in this getting started post.

