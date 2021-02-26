---
title: The statistics standard library in Python
date: 2021-02-26 12:42:00
tags: [python]
categories: python
layout: post
id: 812
updated: 2021-02-26 14:46:02
version: 1.7
---

A major part of python programing has to do with statistics, or at least it would seem that is the area of python where the lanague is used the most. So of course there is a [built in library that has to do with statistics](https://docs.python.org/3.7/library/statistics.html) that has all the ushual methods that I would exspect in such a librray that have to do with the basic stuff at least when it comes to an arithmetic advrage, median, and mode of a set of numbers. I use the term atithmetic avrage to refer to what many may regard as the normal avrage where the sum of numbers is divided over the number of numbers becuase there is more than one avdrage method in this library.

<!-- more -->

## 1 - Mean or atithmetic avrage

A basic atithmetic avrage is what many of us become aware of in school, and it is also the typical avrgae that I often use in various projects. Just add up all the numbers in a collection of numbers into a sum, and divide that sum over the number of numbers. In the python staticts library the mean method is this kind of avrage.

```python
import statistics as stat

print( int( (100 + 50) / 2 ) ) # 75
print( stat.mean([100, 50]) )  # 75
```

## 2 - harmonic mean

A harmonic mean mean differs a little from an arthmic mean.

```python
import statistics as stat
 
a = 100
b = 50
 
print( (a + b) / 2  ) # 75.0
print( 2 / ( 1/a + 1/b ) ) # 66.66666666666667
 
print( stat.mean([a, b]) )  # 75
print( stat.harmonic_mean([a, b]) )  # 66.66666666666667
```

## 3 - median

There is also getting the median of a set of numbers.

```python
import statistics as stat
 
data = [100, 50, 75, 25, 12.5]
print( stat.median(data) ) # 50
print( stat.mean(data) )   # 52.5
 
data = [100, 50, 75, 25]
print( stat.median(data) ) # 62.5
print( stat.mean(data) )   # 62.5
```

## 4 - Standard deviation and variance

The subject of [standard deviation](/2018/02/20/statistics-standard-deviation/) will come up now and then when dealing with a set of numbers which is a way of going about measure the variance between a set of numbers. For example the numbers 50, 51, and 49 are all pretty near each other while the numbers 100, 10, and 45 not so much. So it would make sense to have methods that can be used to gauge this kind of magnatude. In the python statstics librray there are a few methods that can be used to get this kind of value such like that of an advrage.

### 4.1 - pvariance

```python
import statistics as stat
 
data1 = [50, 51, 60, 40, 47]
data2 = [50, 90, 10, 30, 75]
print( stat.pvariance(data1) ) # 41.839999999999996
print( stat.pvariance(data2) ) # 844
```

## 5 - Conclusion

So the statistcs library in python is a great starting point when it comes to getting into statistics, but it is by no means everythiong that I might want to work with when it comes to getting into work with statisitcs. I am a very visual person actually, and I also like javaScript and canvas as a way to go about vishulaizing data. In python there is the [tkinter librray](/2021/01/15/python-standard-library-tkinter/) that I have been meaning to sink some more time into when it comes to working out a way to display things in a vishual way in a python enviorment rather than the front end javaScript enviorment that I am accustomed to.

There is also the question of how to go about getting data, in the first place, and how to go about storing that data. Again in javaScript there is the JSON format which is a standard way of going about sending data from one point to another over a nestwork, and it is also ofetn used as a way to store such data. However of course there are many other ways of going about doing so in a python world.
