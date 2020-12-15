---
title: Built in Python functions 
date: 2020-12-15 11:16:00
tags: [python]
categories: python
layout: post
id: 762
updated: 2020-12-15 14:18:16
version: 1.11
---

I have [started to learn python](https://docs.python.org/3/tutorial/), and one of the first things that I have become aware of when doing so is like many other programing enviorements there are a number of built in functions. It is always a good idea to take a moment to look over what there is to work with when it comes to built in functions before getting into user space modules, and python is no exception to this. If I need a function that does something the first collecion of functions that I should lookat are these built in functions, then what there is to work with when it comes to standard librarys, then user space libarrys, and then if all else fails look into what I need to do in order to come up with my own solution.

This post will then be a general overview of all of the built in functions to work with in python. I might not get to covering all of them, but I will at least mention the ones that strike me as the most important thus far when it comes to getting started with byton at least.

<!-- more -->

## 1 - abs - The built in python method for Absolute Value

One method that every programing langaue should have built in might very well be an absolute value method. Maybe this find of method fould be pulled away into a Math module, but even then it should be part of a standard Math module. In python there is such a standard module, but when it comes to absolute value that is one of the built in functions in python for better or worse.

### 1.1 - Basic example of abs

A basic example of the abs method would be to just call it and pass a number value that is nagative, the returned result should be the posative counter part of that number.

```python
print( abs(-5) ) # 5
print( abs(-5.0) ) # 5.0
```

That is the basic idea of absolut value, pass a number that may be nagative, but in any case return a posative number. However in order to truly understand and apresheate absolute value maybe at least a few more examples are in order.

### 1.2 - A Bias percent method abs example

When making games and various features of games such as an experence point system, animations and so forth I often find myself making what I would call a percent method. Maybe that is not always such a good name for such a method, but to expand on what I mean by that it is a method where I have a function a Numerator and a denomanator and what is returned is a value between and including 0 and 1.

One such percent method that I have made in the past is a bias method that might look something liek this.

```python
def bias(n, d):
  return 1 - abs( ( n / d ) - 0.5) / 0.5
 
n=0
d=8
nums=[]
while n <= d:
  nums.append( bias(n, d) )
  n = n + 1
print(nums)
# [0.0, 0.25, 0.5, 0.75, 1.0, 0.75, 0.5, 0.25, 0.0]
```

## 2 - all - Testing if all elements in a list are true

The all function can be used to test if all the elements in a list are true. If an element is not a boolean value then whatever the truth value of the element is will be used. For example if I have an array of all posative numbers then that list will result in a true value being returned when I pass that list to the all method. Then it would also go without saying that if I pass an array that has even just one number that is zero or lower that will result in a false value being returned by the all method.

```python
l=[1,2,3]
print( all(l) ) # true
l=[0,2,3]
print( all(l) ) # false
```

## 3 - any - tetsing if at least one element in a list is true

The any method is just like the all method, but this time only one element in the list needs to be true in order for a true value to be returned by the any method. So then the any method will only return false if all of the elements in a list are a false value.

```python
print( any([0,1,0,0]) ) # True
print( any([0,0,0,0]) ) # False
```

## 4 - ascii

The ascii is a way to go about creating a string value of an object.

```python
a = [1,2,3]
 
s = ascii(a) + "foo"
print(type(a)) # <class 'list'>
print(type(s)) # <class 'str'>
```

## 5 - bytearray

return an array of byte values.

```python
a = bytearray([255, 128])
 
print(a[0]) # 255
print(a) # bytearray(b'\xff\x80')
print(type(a)) # <class 'bytearray'>
```

## 6 - bool

The bool method is the way to go about creating a boolean value in python.

```python
print( bool(0) ) # False
print( bool(1) ) # True
```

## 7 - range

The range method is a way to qucikly create a range of numbers.

### 7.1 - Basic range example

For a basic example of the raneg function there is just calling the function and passing a starting value as the first argument, followed by another value that will be the end value.

```python
r = range(0,10)
print( type (r) ) # <class 'range'>
```

### 7.2 - for loop range example

A range can often prove to be useful when it comes to working out something with a for loop.

```python
import math
base=2
nums=[]
for e in range(0,10):
  nums.append(int(math.pow(base, e)))
print(nums)
# [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
```

## 8 - print - Printing something out to the standard output

When it comes to starting even the most basic of python examples, often it is needed to have a way to print something out to the standard output. One way to go about doing so is with the print built in function, which would be the python equavelet to something like console.log in javaScript.

### 8.1 - Basic print example

A basic example of the print buit in function would be to just call it and pass it a value that you would like to print out to the standard output.

```python
# can pass a string value to print
print('Hello World') # 'Hello World'
 
# can pass other data types to print
# such as an init
print( 5 ) # 5
```

## 9 - type - To check out what the current data type of a value is

There is then also the type function that is often useful to get the type of a value.

```python
print( type(1) )         # <class 'int'>
print( type(1.5) )       # <class 'float'>
print( type([1,2,3]) )   # <class 'list'>
print( type({1,2,3}) )   # <class 'set'>
```

## 10 - Conclusion

That is all for built in functions for now, if I get around to editing this post I will see about expanding some of these sections with even more examples of built in python functions. As of this writing I am still fairly new to using python, so I will want to gain some more expernece working out some real python examples in order to gain a better sense of what built in functions are used the most often, and thus desirce some more detailed examples.
