---
title: Dictionaries in Python
date: 2020-12-31 13:41:00
tags: [python]
categories: python
layout: post
id: 772
updated: 2020-12-31 14:01:50
version: 1.3
---

In an effert to continue learning the basic of python it was only a matter of time until I got around to writing a post on dictionaries. In python a dictionary is one of several built in data types on top of other options like integers, strings and lists, so they are there to work with right away with the python lanague itself. A dicitionary is somewhat simular to a list in some ways, but with a few very imporant diferences. First off unlike a list, a dictionary is a way to create a named collection of values rather than a numbered one. The other imporatant diference is that I can not just loop over a dicitionary, at least not a dictionary value by itself anyway.

In this post I will be going over some of the basics of dictionary values in python, how to go about creating them, and looping over the contents of them.

<!-- more -->

## 1 - The basic of dictionaries in python

In this section I will be going over just the very basic of dictionaries for starters. There are a number of ways to go about creating them to begin with, and on top of that I think there are a few more things that should be covered in a basic getting staretd section such as this. A dictionary works a little diferent from what you might be familiey with in other programing enviormentbs. For example in javaScript if I try to get a property of an object to which there is not key then that does not typically result in an error, but a value of undefined. In python however this will cuase an error, so even when it comes to the basics of this kind of data type there is a need to quikcly go over some simple examples first.

### 1.1 - Creating a dictionary with the bracket syntax

One way to go about creating adictionary is to use the bracket syntax, when doing so it is also possible to set some starting values for the dictionary also.

```python
d={'a': 0, 'b': 1}
 
print(type(d).__name__) # dict
print(d['a']) # 0
```

### 1.2 -

```python
d=dict([('a', 0)])
d['b']=1
 
print(type(d).__name__) # dict
print(d['a']) # 0
print(d['b']) # 1
```

### 1.3 - 

```python
# a blank dict
d={}

# keys can be added like this
d['a'] = 1
 
# The get method of a dict is what can be used
# to get any key in an Error Free way
print( d.get('a', 0) ) # 1
print( d.get('b', 0) ) # 0
print( d.get('b') )    # None
 
# just getting a key that is not there
# without uisng get will cause an Error
print( d['b']) # Error
```

### 1.4 - 

```python
a={'a': 0, 'b': 1}
b=list(a)
c=list(a.values())
 
print(type(b).__name__) # list
print(b) # ['a', 'b']
print(c) # [0, 1]
```
