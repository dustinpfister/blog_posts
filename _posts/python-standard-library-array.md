---
title: The Array library in Python
date: 2021-01-04 12:58:00
tags: [python]
categories: python
layout: post
id: 774
updated: 2021-01-04 13:05:13
version: 1.1
---

Built into python itself is the list data type, and for most situation this seems to work well as an array in python. However it is not like lists are the only option when it comes to arrays in python, another built in feature is arrays. Arrays might not be there to begin with, but they can quickly be added by way of the array standard library.

<!-- more -->

## 1 - Some basic examples of arrays

### 1.1 - A imple integer example of an array

```python
import array as arr
a=arr.array('i', [1,2,3,4])
print(a[0], type(a)) # 1 <class 'array.array'>
```

### 1.2 - Find the typecode of an array

```python
import array as arr
 
a=arr.array('i', [1,2,3])
b=arr.array('I', [1,2,3])
 
print(a.typecode) # i
print(b.typecode) # I
```

### 1.3 - Show all the type codes for arrays

```python
import array as arr
print(arr.typecodes) # bBuhHiIlLqQfd
```