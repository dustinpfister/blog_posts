---
title: Lists in Python
date: 2020-12-23 11:57:00
tags: [python]
categories: python
layout: post
id: 768
updated: 2020-12-23 13:05:46
version: 1.5
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

So there is creating a list, and when doing so it is possible to define some starting elements for a list also. However what if I want to add elements to a list that has been created to begin with. Or maybe just chnage the value of a given element that is in the range of the list.

### 2.1 - The append method

The apppend method of a list is one way to go about adding an element to the end of a list.

```python
a=[]
a.append('foo')
print(a)
```

### 2.2 - Change the value of an element

There is using append to add and element to then end, and each time it is called the length of the list will increase. However what if I just want to add an element that is in range of the length of the list? For that there is just using square bracket notation and using assignment to just set a new value of an element index.

```python
a=list(range(0,2))
a[0]='foo'
a[1]='bar'
print(a)
```

Here in this example I am using ther range function to create a range that is another kind of sequence type in python.

## 3 - removing elements from a list

So there is adding elememnts to a list that might increase the range of a list, but then there is also removing elements from a list.

### 3.1 - del

The del keyword is one way to go about removing an element from a list

```python
a=list(range(0,2))
print(a) # [0,1]
del a[0]
print(a) # [1]
```

### 3.2 - clear

The clear funciton will clear out all elements from a list.

```python
a=list(range(0,4))
print(a) # [0, 1, 2, 3]
a.clear()
print(a) # [1
```

## 4 - the len function and lists

```python
a=[1,2,3,4]
print(len(a)) # 4
```

## 5 - loops and lists

## 6 - sorting a list

```python
```

## 7 - map

```python
def power(n):
  return pow(2, n)
 
a=[0,1,2,3,4,5]
b=map(power, a)
c=list(b)
 
# the use of map will create a map type
print(type(b).__name__) # map
# the list function can turn it back into a list
print(c) # [1, 2, 4, 8, 16, 32]
# none of this will mutate the source list
print(a) # [0, 1, 2, 3, 4, 5]
```

## 8 - range

## 9 - conclusion

