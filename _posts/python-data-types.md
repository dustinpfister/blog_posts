---
title: Data Types in Python
date: 2020-12-28 14:02:00
tags: [python]
categories: python
layout: post
id: 769
updated: 2020-12-28 16:19:44
version: 1.1
---

Wehn learing a new programing lanague one of the first basic things to understand is to find out what the deal is with data types in the language. Some languages have strict typing where each variable must be set to a certian type, and can not just be changed to something else. Other lanagues have dynamic typing where a varaible can be any given type and any given moment. Some lanagues have many different data types for numbers that have to do with how many bytes are used to store the value, if it is signed or unsigned, if it is an integer or float value, and so forth. Other lanagues simplify this by just going with one data type for all numners.

So when it comes to python it would seem that there is dynamic typing, and there are many data types for numbers. In addition there are many other additional built in types when it comes to objects. In this post I will be going over the basics of data types in python as I have come to understand it thus far.

<!-- more -->

## 1 - Integers

An integer is one of several datatypes that are used to store numbers in python. An integer is a whole number that does not have any any decimal value to it. However it is very easy to just add a fraction to an integer, and the retruned result of doing so will be a float data type value. So right off the bat it would seem that python is not a language that uses strict typeing, as a variable can just chance from one type to another.

```python
# can start with an int just like this
x = 1
print(x, type(x)) # 1 <class 'int'>
# adding two int values will result in an int
x = 5 + 1
print(x, type(x)) # 6 <class 'int'>
 
# adding a fraction will result in a switch to float
x += 2.5;
print(x, type(x)) # 8.5 <class 'float'>
 
# the int built in function can be used to create
# an int value from a float
x = int(x);
print(x, type(x)) # 8 <class 'int'>
```