---
title: The textwrap standard library in python
date: 2021-02-23 13:28:00
tags: [python]
categories: python
layout: post
id: 809
updated: 2021-02-24 17:48:39
version: 1.12
---

I think that I am going to want to write at least a few more posts on the collection of standard libraries that are built into python itself so I do not waste time working out my own solutions for things that can be set and done in a flash with some feature that is built into python itself. One thing that I need to do now and then is break a string into a collection of lists where each element in the list is a substring of the original source text that is no more than a certain set character length long. In other words I often need a way to wrap text which is a common feature in most text editors, or any project that might involve a fair amount of text that needs to be displayed. I often work out my own quick solutions for this, but there is a built in [library called textwrap](https://docs.python.org/3.7/library/textwrap.html) for this one that helps to make get this part of programing out of the way yet even faster.

So in this post I will be going over a few quick examples of the textwrap standard library in python, just for the sake of going over some of the basic features. In the process of doing so I might touch base on some other related topics that have to do with lists, strings, and other libraries that can be used to create quick simple python projects. There is only so much to write about when it comes to this library by itself but when it comes to using it with other libraries and features of python thats where there is always room for more.

<!-- more -->

## 1 - Some basic textwrap examples

In this section I will just be quickly going over some very basic examples of some of the functions that are given in the textwrap library. There are a few methods to choose from, but the main function of interest here is the wrap method.

At this time I think I should also point out that the examples here as well as all of the python source code examples of my posts here can be found at my [examples-python github](https://github.com/dustinpfister/examples-python/tree/master/for-post/python-standard-library-textwrap) repository. I think I should also make it clear that this is not a getting started post on python and I assume that you have at least some basic working knowage of how to create, save, and run simple python source code examples.

### 1.1 - The wrap method

First and foremost I think that I should start with the wrap method as this is the one that I would likely use the most often in actual projects. This methods will take a source string of lengthly text as the first argument, and then I can set a max character width as a keyed argument. The returned result is a list of strings where each string in the list is from the given source string and is no longer than the set width that I have given.

Once I have the return list I can then do whatever it is that I want or need to do with the list of strings including using it in a for loop to go over each line for example.

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

So then because the returned result is a list I can then use any list method that I want with it also. So then by making use of this wrap method along with all the methods that come with the built in list and string data types I can preform just about everything that I want to do when it comes to wrapping text. Still there are some additional methods in the library that also will preform those simple tasks so i should quickly go over some additional examples of those methods while I am at it.

### 1.2 - The fill method

The fill method will take a source string and a width argument just like the wrap method. However the main difference with this method is that the returned result is another string rather than a list of lines where a line break is placed at each point in the returned string where a line would end.

This method might prove to be helpful in situations in which I might need to use it, however even then I might not. using the wrap method along with some string methods like the join method gives be a greater deal of flexibility when it comes to setting what the line break character is. With the fill method a Linux friendly line feed pattern is used, but by using wrap with the string join method I can use the windows friendly carriage return line feed pattern.

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

Another method to work with in the textwrap library is the shorten method. This will also take a source string, and width arguments just like with wrap and fill. However this method will just return a single string that is caped at the given width argument. In addition I can set a place holder argument when it comes to defining some kind of string pattern that indicates that there is more to what this string is such as the dot dot dot pattern.

```python
import textwrap
 
str = 'use shorten to make some text fit a set width'
 
short = textwrap.shorten(str, width=20, placeholder='...')
 
print(type(short).__name__) # 'str'
print(short) # use shorten to...
```

## 2 - Conclusion

So that is it for now when it comes to the textwrap library in python, when it comes to this one there is only so much to write about. If I get around to writing more examples that make use of it I am sure that I will get around to editing this post to expand the topic a little. There might only be so much to write about when it comes to the library itself, but there are a lot of things that come to mind when it comes to using this library and mainly the wrap method in some actual projects of one kind or another. One idea that comes to mind is haveing a basic little command line interface adventure like game that makes use of just a few lines of text as a way to know where a player unit is. However I am sure that in time I might create a few practical examples of the library also while I am at it.
