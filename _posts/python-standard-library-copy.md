---
title: Shallow and deep Copying of objects in Python
date: 2021-01-05 11:15:00
tags: [python]
categories: python
layout: post
id: 775
updated: 2021-01-05 11:58:46
version: 1.3
---

The [copy standard library](https://docs.python.org/3/library/copy.html) in python is yet another standard library in python that might prove to be imporant for most typical projects. I say that speaking from experence in other languages at least, so I should have one way or another to copy objects in python. Copying an object is not always so quick and simple, there is copying just the primative values of an object which will result in a so called shallow copy of an object, and then there is also copying any additional nested objects which would result in a deep clone.

<!-- more -->

## 1 - Shallow copy example

A shallow copy of an object will result in a copy of an object, but only with the top level properties of that object. If there are any additional objects as properties of the objet that is being cloned they will still be refernces to the same object.

```python
import copy
 
a = [1,2,3,4]
b = copy.copy(a);
 
# b is now a copy of a
print(a) # [1, 2, 3, 4]
print(b) # [1, 2, 3, 4]
 
# mutating b will only effect b
b[1]='two'
print(a) # [1, 2, 3, 4]
print(b) # [1, 'two', 3, 4]
```

## 2 - Deep copy example

```python
import copy
 
a = [[0,1,2],[2,4,5],[6,7,8]]
b = copy.deepcopy(a);
 
# b is now a DEEP copy of a
print(a) # [[0, 1, 2], [2, 4, 5], [6, 7, 8]]
print(b) # [[0, 1, 2], [2, 4, 5], [6, 7, 8]]
 
# mutating a nested list in b WILL NOT effect the same
# nested list in a becuase it is a DEEP COPY
b[1][1]='two'
print(a) # [[0, 1, 2], [2, 4, 5], [6, 7, 8]]
print(b) # [[0, 1, 2], [2, 'two', 5], [6, 7, 8]]
```

## 3 - Conclusion

