---
title: regular expressions in Python
date: 2021-01-20 15:06:00
tags: [python]
categories: python
layout: post
id: 785
updated: 2021-01-20 15:21:00
version: 1.2
---

When working with source code and text in general there are times where i will want to know if a substring is in a string or not. Other times I will want to know a bit more then just if there is a substring, but one or more substrings. Also I might want to know even more about the state of a substring such as the starting and ending index values for each match. Also there might be times now and then where I am not looking for a fixed, static substring, but a pattern that might have some degree of variation, but follows a kind of reason.

There are a number of options when it comes to looking for a substring in a string. If I just want to know if there is a given fixed substring in a string or not there are some simple basic options to do that and just move on. However when it comes to doing something more advanced for situations in which doing so is called for, such as creating a lanaguge tokenizer, then I might need to get into using regular expressions.

<!-- more -->

## 1 - Basic Python pattern matching examples

To start off with maybe I should go over some simple options for basic pattern matching before getting into the regular expression standard library in detail at least. I will be going over a basic example of the search method in this section, but I will also be going over some other options that might be a better choice when it comes to simple tasks. Getting into regular expressions can prove to be a bit of a pain, in some situstions it is a pain that must be endured. However if I just want to know if a string contains a fixed substring value or not, there are easier ways of doing so.

So in this section I will be getting to a basic example of the regular expression library, but first lets take a look at some simple examples first.

### 1.1 - The in operator

```python
a='so abc is easy as abc'
b='things are not always so easy'
 
print( 'abc' in a ) # True
print( 'abc' in b ) # False
```

### 1.2 - The string index method

```python
a='so abc is easy as abc'
b='things are not always so easy'
 
print( a.index('abc') )
# 3
 
try:
    print( b.index('abc') )
except ValueError:
    print('abc not found');
# 'abc not found'
```

### 1.3 - A while loop and a function

```python
a='so abc is easy as abc'
b='things are not always so easy'
 
def find_string(string, sub_string):
    i=0
    sl = len(string)
    subl = len(sub_string)
    m=[]
    while i <= sl - subl:
        text=string[i: i + subl]
        if(text == sub_string):
            m.append({
                "start": i,
                "end": i + subl,
                "text": text
            })
        i = i + 1
    return m
        
print( find_string(a, 'abc') )
# [{'start': 3, 'end': 6, 'text': 'abc'}, {'start': 18, 'end': 21, 'text': 'abc'}]
 
print( find_string(b, 'abc') )
# []
```

### 1.4 - Use a regular expression with the re standard library

```python
import re
 
a='so abc is easy as abc'
b='things are not always so easy'
 
m = re.search('abc', a)
 
# the start and end index of the first group
print(m.start(0)) # 3
print(m.end(0)) # 6
 
# the text of the first group
print(m.group(0)) # abc
 
m = re.search('abc', b)
print(m)
# None
```