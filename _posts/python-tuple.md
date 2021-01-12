---
title: Tuples in Python
date: 2021-01-12 14:32:00
tags: [python]
categories: python
layout: post
id: 779
updated: 2021-01-12 15:08:19
version: 1.5
---

There are a few built in data types in python, and one such type is a tuple. Like lists a tuple is a kind of sequence type, however one major diference is that a tuple is not mutabule. So once a tuple is created, the only way to mutate values is to create a new tuple. So then a tuple might be a good choice for some kind of data that I want to remain fixed, and then I can create additional tubles, and other sequence types from these tuples.

<!-- more -->

## 1 - create a tuple

To create a tuple I just need to use a parentheses syntax where I place the values that I want in a set of openeing and closing parentheses. Just like with a list where I use a bracket syntax in place of parentheses, values need to be sepearted with commas.

```python
t=(1,2,3,4,5)
print(t[0])   # 1
print(t[2:4]) # (3,4)
```

## 2 - Tuples and Lists

Both lists and tuples are sequence types, and for the most part it would seem that the only real diference is that a tuple can not be changed once it is created. So when it comes to working with data from a tuple there is creating new tuples from a source tuple, and then there is converting a tuple to a list, which is another kind of sequence type where the values can be changed.

## 2.1 - Use the list built in function to convert to list

Tubles can not be mutated, however a list can, so often I might want to convert a tuple to a list so I can then mutate values.

```python
t=(1,2,3,4,5)
l=list(t[2:4])
 
print( type(l).__name__ ) # list
print( l ) # [3, 4]
```

## 2.2 - Chainging a value in a list created from a tuple should not effect the source

```python
t=(1,2,3,4,5)
l=list(t)
 
i=0
while i < len(l):
    l[i] = l[i] * 7
    i = i + 1
 
print(l) # [7, 14, 21, 28, 35]
print(t) # (1, 2, 3, 4, 5)
```