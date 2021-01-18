---
title: Strings in python
date: 2021-01-18 15:24:00
tags: [python]
categories: python
layout: post
id: 783
updated: 2021-01-18 15:26:49
version: 1.11
---

One of the many basic data types of a programing lanague is the [string data type](https://en.wikipedia.org/wiki/String_%28computer_science%29), this post will be just a quick overview of [strings in python](https://docs.python.org/3.7/library/string.html). A string can often be considered a sequence of characters, so they are often used as a way to store text values, however they can also often be used to store an array of values like that of a list.

<!-- more -->

## 1 - basics of strings in python

Well I ahve to start somewhere when it comes to learning a thing or two about strings in python. In this section I will just be going over a few quick basic examples of strings. There is just creating a string literal value for starters, but then there are other basic things that I should have solid when it comes to learning about strings in a new lanague such as pythion. One thing that comes to mind with this is concatanation of strings, there is also the qusition of how to go about convertuing a string of a number to an actual number data type, and much more just when it comes to the basics. So lets get this part out of the way so i can move on to the good stuff.

### 1.1 - Basic string literal example

So mayeb one of the first things I should learn when it comes to how to work with strings in a new programing enviorment is to learn how to create just a simple string literal value.

```python
str='hello world'
print( type(str).__name__ ); # 'str'
print( str )                 # 'hello world'
```

### 1.2 - A string can be the result of an expression

On top of just being a simple string literal, a string can also be the result of an expression. When doing so it is called for to make sure that any value that is not a string is converted to a string. If I add a value that is a string, to a value that is not a string, I can end up with a type error.

```python
def iNeedAbout(amount=3.5):
    return 'I need about $' + str(amount)
 
print(iNeedAbout())     # I need about $3.5
print(iNeedAbout(6.66)) # I need about $6.66
```

### 1.3 - Converting a string to an integer value

In javaScript when I add a string of a number such as 5 to a number such as 7 then the result is the string 57 rather than the number 12. If I want the number 12 rather than the string 57 then I will need to prefrom type conversion. In python if I attempt to just add a string and a number value togeather the result will be a type error. So when working out an expression where I might need to convert a string value of a number to an actual number data type then I have to always do type conversion.

One way to do type conversion of a string of a number to an actual number data type would be to use the int built in function.

```python
str='42'
print( type(str).__name__ ) # str
print( str )                # 42
 
n=int(str)
print( type(n).__name__ )   # int
print( n )                  # 42
```

There are other built in functions such as the float function, but the basic idea is more or less the same. In any case to convert a string value to another value it will just require passing the string value to the approprate built in function, or whatever method or function there is to prefrom the type conversion.

### 1.4 - Concat strings

Concating strings can work more or less the same way as I am used to coming from a javaScript background. However I will want to make sure that all the values are converted to strings when just adding them togetaher first. Python will not do type conversion for me like in javaScript, not a big deal I just need to always use the str built in function for any and all values that might not be a string in most cases thus far.

```python
# if two strings I can just add
a = 'hello'
b = 'world'
c = a + ' ' + b
print(c) # hello world
 
# if one value is not a string
# it must be turned into a string first
a = 42
b = 'foo'
try:
    c = a + ' ' + b
except TypeError:
    print('TypeError')
# TypeError
 
c = str(a) + ' ' + b
print(c)
# 42 foo
```

### 1.5 - I can loop over strings in python

A string can be looped over with a for loop in python.

```python
str='12345'
for c in str:
    print( pow(2, int(c)), end=',' )
# 2,4,8,16,32,

```

## 2 - Conclusion


So far I have to say that learning python has been going pretty fast for me at least. However that might largly be becuase I have many years of experence working with javaScript, so much of this is just a quistion of how do I do x in python rather than javaScript. I am glad that I took the time to start learbning another language, doing so has resulted in me having more appreasheation for things that are more or less the same accross lanagues. There are some differences between python and javaScript when it comes to strings, but there is only so much, so this was a bit of a brease.

Well that is it for now when it comes to strings in python. I am still fairly new with python myself as of this wrting so at some point in the future I will have to come back and edit this post as I start to pick pick up more when it comes to strings and python in general actually.
