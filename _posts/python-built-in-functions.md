---
title: Built in Python functions 
date: 2020-12-15 11:16:00
tags: [python]
categories: python
layout: post
id: 762
updated: 2020-12-15 12:13:11
version: 1.5
---

I have [started to learn python](https://docs.python.org/3/tutorial/), and one of the first things that I have become aware of when doing so is like many other programing enviorements there are a number of built in functions. It is always a good idea to take a moment to look over what there is to work with when it comes to built in functions before getting into user space modules, and python is no exception to this. If I need a function that does something the first collecion of functions that I should lookat are these built in functions, then what there is to work with when it comes to standard librarys, then user space libarrys, and then if all else fails look into what I need to do in order to come up with my own solution.

This post will then be a general overview of all of the built in functions to work with in python. I might not get to covering all of them, but I will at least mention the ones that strike me as the most important thus far when it comes to getting started with byton at least.

<!-- more -->

## 1 - abs - The built in python method for Absolute Value

One method that every programing langaue should have built in might very well be an absolute value method. Maybe this find of method fould be pulled away into a Math module, but even then it should be part of a standard Math module. In python there is such a standard module, but when it comes to absolute value that is one of the built in functions in python for better or worse.

### 1.1 - Basic example of abs

A basic example of the abs method would be to just call it and pass a number value that is nagative, the returned result should be the posative counter part of that number.

```python
print( abs(-5) ) # 5
print( abs(-5.0) ) # 5.0
```

That is the basic idea of absolut value, pass a number that may be nagative, but in any case return a posative number. However in order to truly understand and apresheate absolute value maybe at least a few more examples are in order.

### 1.2 - A Bias percent method abs example

When making games and various features of games such as an experence point system, animations and so forth I often find myself making what I would call a percent method. Maybe that is not always such a good name for such a method, but to expand on what I mean by that it is a method where I have a function a Numerator and a denomanator and what is returned is a value between and including 0 and 1.

One such percent method that I have made in the past is a bias method that might look something liek this.

```python
def bias(n, d):
  return 1 - abs( ( n / d ) - 0.5) / 0.5
 
n=0
d=8
nums=[]
while n <= d:
  nums.append( bias(n, d) )
  n = n + 1
print(nums)
# [0.0, 0.25, 0.5, 0.75, 1.0, 0.75, 0.5, 0.25, 0.0]
```

## 2 - all - Testing if all elements in a list are true

The all function can be used to test if all the elements in a list are true.

### 2.1 - Basic all example

```python
l=[1,2,3]
print( all(l) ) # true
l=[0,2,3]
print( all(l) ) # false
```
