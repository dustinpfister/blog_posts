---
title: Errors in python
date: 2021-01-14 13:46:00
tags: [python]
categories: python
layout: post
id: 781
updated: 2021-01-14 13:51:07
version: 1.1
---

One of the basic things that I still need to read up on a bit more with python is how to handle Errors. The process of doing so is a little differeent from what I am used to in a javaScript enviorment. However it would seem that it is only so different, just like with javaScript there is a kind of try catch statement.

<!-- more -->


## 1 - Basic try example

```python
try:
    x = 5 + 'a'
except SyntaxError:
    print('looks like we have a Syntax Error.')
except TypeError:
    print('That is a type Error');
 
# That is a type Error
```

## 2 - div by zero example

```python
def div(n=1, d=1):
    try:
        return n / d
    except ZeroDivisionError:
        return 0.0
    except TypeError:
        return 0.0
    
print( div() )             # 1.0
print( div(5, 0) )         # 0.0
print( div('foo', None) )  # 0.0
```