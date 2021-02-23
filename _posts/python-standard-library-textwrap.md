---
title: The textwrap standard library in python
date: 2021-02-23 13:28:00
tags: [python]
categories: python
layout: post
id: 809
updated: 2021-02-23 14:02:13
version: 1.7
---

I think that I am going to want to write at least a few more posts on the collection of standard librires that are built into python itself so I do not waste time working out my own solutions for things that can be set and done in a flash with some feature that is built into python itself. One thing that I need to do now and then is break a string into a collection of lists where each element in the list is a substring of the original source text that is no more than a certian set charicter length long. In other words I often need a way to wrap text which is a common feature in most text editors, or any project that might involve a fair amount of text that needs to be displayed. I often work out my own quick solutions for this, but there is a built in [librray called textwrap](https://docs.python.org/3.7/library/textwrap.html) for this one that helps to make get this part of programing out of the way yet even fatser.

So in this post I will be going over a few quick examples of the textwrap standard library in python, just for the sake of going over some of the basic features. In the process of doing so I might touch base on some other realted topics that have to do with lists, strings, and other libries that can eb used to create quick simple python projects.

<!-- more -->

## 1 - Some basic textwrap examples

In this section I will just be quickly going over some very basic examples of some of the functions that are given in the textwrap library. There are a few methods to choose from, but the main function of interest here is the wrap method.

At this time I think I should also point out that the examples here as well as all of the python source code examples of my posts here can be found at my [examples-python github](https://github.com/dustinpfister/examples-python/tree/master/for-post/python-standard-library-textwrap) reposatiry. I think I should also make it clear that this is not a getting started post on python and I assume that you have at least some basic working knowage of how to create, save, and run simple python source code examples.

### 1.1 - The wrap method

First and formost I think that I should start with the wrap method as this is the one that I would likly use the most often in actual projects. This methods will take a source string of lengthly text as the first argument, and then I can set a max charicter width as a keyed argument. The returned result is a list of strings where each string in the list is from the given source string and is no longer than the set width that I have given.

Once I have the return list I can then do whatever it is that I want or need to do with the list of strings inclduing using it in a for loop to go over each line for example.

```python
import textwrap
 
str = 'this is some text that I want to wrap to a list of lines'
 
lines = textwrap.wrap(str, width=20)
 
print(type(lines).__name__) # list
 
for item in lines:
    print(item)
# 'this is some text'
# 'that I want to wrap'
# 'to a list of lines'
```

So then becuase the returned result is a list I can then use any list method that I want with it also. So then by making use of this wrap method along with all the methods that come with the built in list and string data types I can prefrom just about everything that I want to do when it comes to wrapping text. Still there are some additional methods in the library that also will prefrom those simple tasks so i should quikcly go over some additional examples of those methods while I am at it.

### 1.2 - The fill method

The fill method will take a source string and a width argument just like the waro method. However the main difference with this metyod is that the returned result is another string rather than a list of lines where a line break is placed at each point in the returned string where a line would end.

This method might prove to be helpful in situations in which I might need to use it, however even then I might not. using the wrap method along with some string methods like the join method gives be a greater deal of flexability when it comes to setting what the line break chariter is. With the fill method a Linux friendly line feed pattren is used, but by using wrap with the string join method I can use the windows friendly chariage retrun line feed pattern.

```python
import textwrap
 
str = 'So say I have a string like this the contains some text about something.'
 
filled = textwrap.fill(str, width=20)
 
print(type(filled).__name__) # 'str'
print(filled)
# So say I have a
# string like this the
# contains some text
# about something.
 
# ANother way to do this would be something liek this
filled = "\n".join( textwrap.wrap(str, width=20) )
print(filled)
# So say I have a
# string like this the
# contains some text
# about something.
 
## which allows for me to change what the break string is
filled = ";\r\n".join( textwrap.wrap(str, width=20) )
print(filled)
# So say I have a;
# string like this the;
# contains some text;
# about something
```

### 1.3 - The shorten method

```python
import textwrap
 
str = 'use shorten to make some text fit a set width'
 
short = textwrap.shorten(str, width=20, placeholder='...')
 
print(type(short).__name__) # 'str'
print(short) # use shorten to...
```