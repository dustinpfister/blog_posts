---
title: Shallow and deep Copying of objects in Python
date: 2021-01-05 11:15:00
tags: [python]
categories: python
layout: post
id: 775
updated: 2021-01-05 12:44:43
version: 1.7
---

The [copy standard library](https://docs.python.org/3/library/copy.html) in python is yet another standard library in python that might prove to be imporant for most typical projects. I say that speaking from experence in other languages at least, often I am in a situation in which I want to have an indepedant copy of an object. That is having a complate copy s source object that I can then mutate, without effecting the source object. So I should have one way or another to copy objects in python, and one good option seems to be the copy built in standard library. 

When it comes to making a copy of a string or number value there is no big fuess when it comes to copying thiose kinds of values. An indepedant value can be created with just and assignment operator, as such some might exspect that the same can be done with objects. However in python, and many otherlnagaues such as javaScript for that matter, this is not the case. The assignment operator will just create another reference or binding if you prefer to the same object in memory. To make a true copy of an object there is a need for spechial functions that will create and return a true indepedant copy of an object then.

Copying an object is not always so quick and simple, there is copying just the primative values of an object which will result in a so called shallow copy of an object, and then there is also copying any additional nested objects which would result in a deep clone.

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

In situations is which I have nested objects, and I want the nested objects to be copied and not just the base object, then I will want a deep clone of the object.

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

One draw back of the deep copy method is that there does not appear to be an argument to set the level at which the deep cloning is to be prefromed. However I can not say that this will present a problem when it comes to most typical use cases, when I want to copy and object I often want to copy all levels, or just the first one.

## 3 - Conclusion

So that is it for now when it comes to copying objects in python, I just wanted to take a look at this one and work out a few examples.
