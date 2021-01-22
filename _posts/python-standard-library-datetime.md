---
title: Date objects in Python
date: 2021-01-21 14:09:00
tags: [python]
categories: python
layout: post
id: 786
updated: 2021-01-22 10:00:44
version: 1.8
---

In javaScript there is a built in Date class, so I would think that there should be something to that effect in python also. Well there is a few built in standard libraries actually it would seem and one such library is the [datetime library](https://docs.python.org/3/library/datetime.html#datetime.date).

<!-- more -->

## 1 - Basics of the datetime library

To start off with I think I should go over just a few very basic getting started examples of the datetime library. There are a number of ways to create an instnace of the main date class in this library so maybe it is a good idea to start there.

### 1.1 - The datetime.now prop and the datetime class

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

### 1.2 - uisng the datetime class dirrectly

The now method of the datetime property of the datetime libraray will return an instance of the datetime class. However it will always return such a class instance for the current time. What if I want another such class instance that is at a point that in time that is before or after the current time? To create such a class instance I am going to want to use the datetime class dirrectly.

```python
import datetime as date
 
d = date.datetime(2020, 4, 6, 10, 5, 0, 123456)
 
print(d) # 2020-04-06 10:05:00.123456
```

### 1.3 - Subtracting two datetime instances and the timedelta class

Just like in javaScript I can subtract two datetime instances to get a time difference, but that difference is not a number index value like with the javaScript Date Class. The result of such an operation in python with datetime instances at least is an instance of a timedelta class.

```python
import datetime as date
 
d1 = date.datetime(1983, 4, 6, 10, 5, 0, 0)
d2 = date.datetime(2010, 8, 22, 10, 5, 0, 0)
 
td = d2 - d1
 
print( type(td).__name__)  # timedelta
print( td.days )           # 10000
```

### 1.4 - The date class

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

## 3 - Conclusion

The datetime class is then the first go to library when it comes to doing things that have to do with time in a python project. However it might not be the end of such tasks also. There are a few other standard libraries that seem to have to do with time, and I have not yet looked into what there might be to work with when it comes to user space projects. However thinging from my experence with javaScript thos far this datetime library all ready seems more than enough to help me with at least most basic tasks that come to mind that have to do with time.
