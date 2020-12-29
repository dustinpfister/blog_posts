---
title: Data Types in Python
date: 2020-12-28 14:02:00
tags: [python]
categories: python
layout: post
id: 769
updated: 2020-12-29 16:58:38
version: 1.17
---

When learning a new programing language one of the first basic things to understand is to find out what the deal is with [data types](https://www.tutorialsteacher.com/python/python-data-types) in the language. Some languages have strict typing where each variable must be set to a certain type, and can not just be changed to something else. Other languages have dynamic typing where a variable can be any given type and any given moment. Some languages have many different data types for numbers that have to do with how many bytes are used to store the value, if it is signed or unsigned, if it is an integer or float value, and so forth. Other languages simplify this by just going with one data type for all numbers.

So when it comes to python it would seem that there is dynamic typing, and there are many data types for numbers. In addition there are many other additional built in types when it comes to objects. In this post I will be going over the basics of data types in python as I have come to understand it thus far.

<!-- more -->

## Checking the type of a value

So before I get into the various data types in python, maybe it is a good idea to start off with how to go about checking the type of a value to begin with. For this task there is the type built in function, this function is yet another one of the many built in functions in python such as print. Passing a value to type will return a type object, this object has a name property that can be used as a way to get the name of the data type.

```python
a='hello'
b=42
 
# type will give a type object
print( type(a) ) # <class 'str'>
 
# if for some reason I just want the name of the type
# I can use the .__name__ property
print( type(a).__name__ ) # str
```

So the type function is a great tool to start to learn about what the deal is with data types python. Just start playing around with expressions and various code examples to start to become aware of what there is to work with. To help with this lets start to look at some examples of the various built in types.

## 1 - Integer number values

An integer is one of several data types that are used to store numbers in python. An integer is a whole number that does not have any any decimal value to it. However it is very easy to just add a fraction to an integer, and the returned result of doing so will be a float data type value. So right off the bat it would seem that python is not a language that uses strict typing, as a variable can just chance from one type to another.

```python
# can start with an int just like this
x = 1
print(x, type(x)) # 1 <class 'int'>
# adding two int values will result in an int
x = 5 + 1
print(x, type(x)) # 6 <class 'int'>
 
# adding a fraction will result in a switch to float
x += 2.5;
print(x, type(x)) # 8.5 <class 'float'>
 
# the int built in function can be used to create
# an int value from a float
x = int(x);
print(x, type(x)) # 8 <class 'int'>
```

## 2 - Float number values

Of course there is a float data type in python that can also be used as another option for representing a number on top of just ints. Making a float is as simple as just adding a decimal when creating such a value from a number literal. However there can also end up being the result of an expression where a decimal is added to an integer value.

```python
x = 1.25
x = x + 0.25
print(x, type(x)) # 1.5 <class 'float'>
```

## 3 - Complex Numbers

There is a complex Number data type in python also to work with. I do not have much experience with these types of numbers so far, but it is never the less yet another built in data type for numbers in python. These kinds of numbers are compose of a real and imaginary number, and they can be created with a special syntax, or the complex built in function.

```python
c = 1.5+2j
print(c, type(c)) # (3+6j) <class 'complex'>
print(c.real) # 1.5
print(c.imag) # 2.0
```

I wish I could write more about these, however so far I can not say that I use them. If I get around to working on some kind of project where I need to use complex numbers maybe then I can come back around and edit this section.

## 4 - Strings

Just about any programing language has string values as a data type and python is no exception. A string value can be created with single or double quotes just like in other high level languages like javaScript. At the time of this writing I am not sure if there is much of a difference between the two thus far.

```python
str = 'Hello World'
print(str, type(str)) # Hello World <class 'str'>
```

## 5 - Lists

Lists are a kind of mutable sequence type. They are kind of like Arrays in javaScript, but not really as there are some slight differences such as the fact that a List is a dense rather than sparse array if you can get away with calling it one. The elements in a list can be just about anything, including additional lists.

### 5.1 - Basic list example

To create a list I can use a the list built in function, or a square bracket syntax like this.

```python
l = [1, 'two', 3]
print(l, type(l)) # [1, 'two', 3] <class 'list'>
```

### 5.2 - Add to list example

When working with lists for the first time you might run into errors when it comes to trying to add elements to them by using the bracket syntax after the list has been created like in javaScript. This will not work becuase lists in python are dense rather than sparse collections. Elements can be added after the list is creade though by just making use of the append function of a list.

```python
l=list();
l.append('foo')
print(l) # ['foo']
```

## 6 - Sets

Python also provides a set data type, this is a way to create a set of numbers. This differs a little form other options for creating a set of numbers with lists as numbers of the same value will not be duplicated.

```python
s = {1,0,0,0,1,1,0,1,0}
print(s, type(s)) # {0, 1} <class 'set'>
```

## 7 - Conclusion

So there are a number of built in data types in python, but there is also a great deal more that can be added by way of the various standard libraries. There are additional modules for dates, arrays, and many other additional types that might prove to be a better choice for certain projects. In this post I was just mainly interesting in covering the built in types only, and there is all ready a great deal of ground to cover when it comes to just working with what there is to work with right out of the gate with python.

