---
title: Date objects in Python
date: 2021-01-21 14:09:00
tags: [python]
categories: python
layout: post
id: 786
updated: 2021-01-21 15:31:19
version: 1.5
---

In javaScript there is a built in Date class, so I would think that there should be something to that effect in python also. Well there is a few built in standard libraries actually it would seem and one such library is the [datetime library](https://docs.python.org/3/library/datetime.html#datetime.date).

<!-- more -->

## 1 - Basics of the datetime library

To start off with I think I should go over just a few very basic getting started examples of the datetime library. There are a number of ways to create an instnace of the main date class in this library so maybe it is a good idea to start there.

### 1.1 - The datetime.now prop

The now method of the datetime class is one way to go about geting an instnace of the datetime class of the current date, and time. The datetime class is one of actually several classes rather than just one that I am used to when it comes to working with the native Date class in javaScript.

```python
import datetime as date
 
d = date.datetime.now()
 
print(type(d).__name__)  # datetime
print(d.year)            # 2021
print(d.month)           # 1
print(d.day)             # 21
print(d)                 # 2021-01-21 15:27:49.097128
```

The datetime might be the best class to go with in most cases. Or at least I am saying that becuase I am so accustomed to working with just one class that can be used for date and time rather than having more than one class to work with. However there are a few other classes, methods of those classes, as well as static methods of such classes that I think I should at least touch base on when it comes to a basic example section.

### 1.2 - The date class

The now method will just return an instnace of datetime for the current time, to get a date object of a point in the past I will want to use the main date class to create such a date object.

```python
import datetime as date
 
d = date.date(2020, 1, 1)
 
print( type(d).__name__ ) # date
print(d)                  # 2020-01-01
```

## 2 - A closer look at the date class

Now that I have some basic examples out of the way there is taking a closser look at the darte class. Like many other classes there are many usful methods that can be called off of an instance of a date object.

### 2.1 - year, month, and day props

There are properties for the year, month, and day of a date object.

```python
import datetime as date
 
d = date.date(2020, 4, 6)
print(d.year)  # 2020
print(d.month) # 4
print(d.day)   # 6
print(d)       # 2020-04-06
```

### 2.2 - to a truple

The timetuple method of a date class instance can return a tuple of the properties of a date object. The tuple then can be looped over in a for loop.

```python
import datetime as date
 
d = date.date(2020, 4, 6)
t = d.timetuple()
 
for p in t:
    print(p, end='.')
# 2020.4.6.0.0.0.0.97.-1.
```


