---
title: Shallow and deep Copying of objects in Python
date: 2021-01-05 11:15:00
tags: [python]
categories: python
layout: post
id: 775
updated: 2021-01-05 13:11:04
version: 1.14
---

The [copy standard library](https://docs.python.org/3/library/copy.html) in python is yet another standard library in python that might prove to be imporant for most typical projects. I say that speaking from experence in other languages at least, often I am in a situation in which I want to have an indepedant copy of an object. That is having a complate copy s source object that I can then mutate, without effecting the source object. So I should have one way or another to copy objects in python, and one good option seems to be the copy built in standard library. 

When it comes to making a copy of a string or number value there is no big fuess when it comes to copying thiose kinds of values. An indepedant value can be created with just and assignment operator, as such some might exspect that the same can be done with objects. However in python, and many otherlnagaues such as javaScript for that matter, this is not the case. The assignment operator will just create another reference or binding if you prefer to the same object in memory. To make a true copy of an object there is a need for spechial functions that will create and return a true indepedant copy of an object then.

Copying an object is not always so quick and simple, there is copying just the primative values of an object which will result in a so called shallow copy of an object, and then there is also copying any additional nested objects which would result in a deep clone.

<!-- more -->

## 1 - Shallow copy example

A shallow copy of an object will result in a copy of an object, but only with the top level properties of that object. If there are any additional objects as properties of the objet that is being cloned they will still be refernces to the same object. Still this kind of copy will work fine in most situations.

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

There are other ways to create a shallow copy of a simple object such as this list though, for example I can just pass the list as an argument to the built in list function to create a new list with the same values. For the most part I really need a function to help with deep cloning of objects.

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

## 3 - Alteratives to the copy lib

The copy library gives just two functions that seem to work okay for what they are worth. However for the most part I might not always need to even bother with the copy library really. There are many other ways to do about creating copies of object with python itself. Also in some situstions I might need to work out my own solutions for copying an object becuase things can get a little complcated with them sometimes. So in this section I will be going over a few quick examples of python code that serve as alteratives to using the copy library.

### 3.1 - Just using the list built in function to create a shallow copy of a list

The list built in function can be passed a source list as an argument, and it will return a new list from that source. If the source object is just a simple list of primatives then this way of creating a shallow clone will work just fine.

```python
# A source object (a)
a = [1,2,3,4,5]
 
# using the list built in function to create a shallow clone (b)
b = list(a);
 
# Mutating (b)
i=0
while i < len(b):
    n = b[i]
    b[i] = pow(2, n)
    i = i + 1
 
# mutation of shallow copy (b) did not effect its source object (a)
print(b) # [2, 4, 8, 16, 32]
print(a) # [1, 2, 3, 4, 5]
```

So then when it comes to lists at least this is just as good as using the shallow copy method of the copy library. However what about nested lists? I have to use the deep copy method then right? Well yeah, but maybe not if I do not really want ot need to. Lets look at some more lateratives of copying objects here.

### 3.2 - Useing the map and list built in functions to deep copy nested lists one additional level

The map built in function is another useful built in function to be aware of if not all ready. With this map function I can make a deep clone of nested lists pretty easily, as long as it is just one additional level at least. It will return a map object, but this map object can then also be passed to the list built in function to create a list from the map object. The result is a deep clone of the list of lists, I can not mutate any element and property of them assumething that things do not go and even deeper level.

```python
# a source object (a) with nested objects
a = [[1,2,3],[4,5,6]]
 
# using list and map to create a deep clone (b),
# at one level of source object (a)
def func(el):
    return list(el)
b = list(map(func, a))
 
# mutating (b) bolth at the top level
# and one additional level
b.append([7,8,9])
b[1][0] = 0
b[1][1] = 0
b[1][2] = 0
 
# mutation of (b) did not effect source object (a)
print(b) # [[1, 2, 3], [0, 0, 0], [7, 8, 9]]
print(a) # [[1, 2, 3], [4, 5, 6]]
```


## 4 - Conclusion

So that is it for now when it comes to copying objects in python, I just wanted to take a look at this one and work out a few examples. Although the simple methods in the copy library will work fine in many situations, in other situstions I might need to work out my own code for copying an object. Say I have an object in which there are some properties in which I want to have deep cloned, and others that need to be referenced. In such a situation I might need to work out my own copy method for that kind of object that will copy the object the way that I want it to be copied.

There are many things to keep in mind when making copies of objects, and it pays to be aware of them, this is very true then I am working out my own methods to copy and object. For example some objects might have recursive refernces, the copy library helps address this, but if I am not carfule when makign my own solution I could end up getting stuck in an endless loop if I do not check for that.

