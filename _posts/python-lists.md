---
title: Lists in Python
date: 2020-12-23 11:57:00
tags: [python]
categories: python
layout: post
id: 768
updated: 2020-12-23 12:53:04
version: 1.3
---

In [python Lists](https://docs.python.org/3.7/library/stdtypes.html#lists) are a mutabule kind of sequence data type. These lists might be somewhat simular to Arrays in javaScript, but with at least a few note worthy diferences such as beging a dense rather than sparce kind of array. Lists are not the only option when it comes to arrays in python there is a standard library called array that might prove to be a better option in some cases. However the thing about lists is that it is a type that is built into python itself, and it is just one kind of sever other kinds of sequence types to work with.

In this post I will be going over the basic of lists, how to create them to beging with, how to add and remove elements from them, and also how to sort them. However in the process of doing so I will also be touching base on sequences in general. For example when it comes to built in functions in python there is the list built in function that can be used to create a list, but there is also the range keywod that can eb used as a way to create another kind of sequence that is not mutabule.

<!-- more -->

## 1 - Basics of Lists in python

So first off I guess I should start off with some very basic examples of lists in python. These arejust ways of how to go about creating a list to begin with, and maybe a few other realted topics that help when it comes to learniong how to work with lists and types in general in python.

### 1.1 - Just a simple list of numbers

A list can be just a collection of numbers, such as an integer type. There is the list built in function that can be used to create a list, but there is also a square bracket syntax.

```python
nums = [0,1,2,3,4,5]
print(nums[3])
print(nums)
```

### 1.2 - A list of strings

A list can also be a collection of strings.

```python
strs = ['one', 'two', 'three']
print(strs[1]) # 'two'
print(strs)    # ['one', 'two', 'three']
```

### 1.3 - Nested lists

Lists can also be nested.

```python
grid = [[0,1,2],[3,4,5],[6,7,8]]
print(grid[0])     # [0, 1, 2]
print(grid[0][2])  # 2
print(grid)        # [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
```

## 2 - adding elements to a list

## 3 - removing elements from a list

## 4 - sorting a list