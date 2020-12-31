---
title: Dictionaries in Python
date: 2020-12-31 13:41:00
tags: [python]
categories: python
layout: post
id: 772
updated: 2020-12-31 13:54:10
version: 1.1
---

In an effert to continue learning the basic of python it was only a matter of time until I got around to writing a post on dictionaries. In python a dictionary is one of several built in data types on top of other options like integers, strings and lists, so they are there to work with right away with the python lanague itself. A dicitionary is somewhat simular to a list in some ways, but with a few very imporant diferences. First off unlike a list, a dictionary is a way to create a named collection of values rather than a numbered one. The other imporatant diference is that I can not just loop over a dicitionary, at least not a dictionary value by itself anyway.

In this post I will be going over some of the basics of dictionary values in python, how to go about creating them, and looping over the contents of them.

<!-- more -->

## 1 - The basic of dictionaries in python

### 1.1 - 

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
