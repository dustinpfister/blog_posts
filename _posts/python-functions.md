---
title: Functions in Python 
date: 2020-12-17 12:34:00
tags: [python]
categories: python
layout: post
id: 764
updated: 2020-12-17 13:13:06
version: 1.3
---

I am still in the process of [learning python](https://docs.python.org/3/tutorial/), and one imporant aspect of learniong python, or any langauge for that matter, is to know how to define functions. Coming from a javaScript background I have a lot of concerns, such as if python supports high order functions or not \( the anwser is yes \). Still I need to start somewhere, snd that means just staring out with some basic python function examples, and then move on more complex topics such as high order functions.

<!-- more -->

## 1 - Basic Python function examples

First things first lets start out slow and just get a very basic function example up and running. To create a function in python I just need to start out with the def keyword, followed by a name for the function. After the name of the function I am then going to want an opening and closing set of parentesese in which I can place one or more parameters for the function, and then I end the line with a colon. After the line in which I use the def keyword that is termanated with a colon I am then going to want to indent for each additional line afterwards when it comes to defining the block of code for the function.

```python
def hello(name):
    print('Hello ' + name)
 
hello('Sam') # 'Hello Sam'
hello('Paul') # 'Hello Paul'
```

## 2 - Setting a return value

When it comes to defining the block of code for a function I can use the retrun keyword to set a return value for the function.

```python
def hello(name):
    return 'Hello ' + name
 
print( hello('Sam') )
print( hello('Paul') )
```

## 3 - Function parameters

## 4 - default arguments for function parameters

## 5 - passing a function as a parameter

## 6 - scrope

## 7 - conclusion