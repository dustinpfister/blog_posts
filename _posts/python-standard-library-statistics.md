---
title: The statistics standard library in Python
date: 2021-02-26 12:42:00
tags: [python]
categories: python
layout: post
id: 812
updated: 2021-02-26 15:42:28
version: 1.15
---

A major part of python programing has to do with statistics, or at least it would seem that is the area of python where the language is used the most. So of course there is a [built in library that has to do with statistics](https://docs.python.org/3.7/library/statistics.html) that has all the usual methods that I would expect in such a library that have to do with the basic stuff at least when it comes to an arithmetic average, median, and mode of a set of numbers. I use the term arithmetic average to refer to what many may regard as the normal average where the sum of numbers is divided over the number of numbers because there is more than one average method in this library.

<!-- more -->

## 1 - Mean

In the statistics library there is not one but several functions for getting a mean or average as it is often called. The mean method will give what is called an arithmetic mean, but there is also a harmonic mean in addition to this. When it comes to the three Pythagorean means there is also a geometric mean, in this post I was using python 3.7 and in that version of python there is no geometric mean so I had to come up with one. In late versions of the python the statistics library does also have this type of mean also.

### 1.1 - Mean or arithmetic average

A basic [arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean), or average if you prefer is what many of us become aware of in school, and it is also the typical average that I often use in various projects. Just add up all the numbers in a collection of numbers into a sum, and divide that sum over the number of numbers. In the python statistics library the mean method is this kind of average.

```python
import statistics as stat

print( int( (100 + 50) / 2 ) ) # 75
print( stat.mean([100, 50]) )  # 75
```

### 1.2 - harmonic mean

A [harmonic mean](https://en.wikipedia.org/wiki/Harmonic_mean) differs a little from an arithmetic mean. 

```python
import statistics as stat
 
a = 100
b = 50
 
print( (a + b) / 2  ) # 75.0
print( 2 / ( 1/a + 1/b ) ) # 66.66666666666667
 
print( stat.mean([a, b]) )  # 75
print( stat.harmonic_mean([a, b]) )  # 66.66666666666667
```

### 1.3 - Geometric mean

When it comes to a geometric mean one will need to be added as the function is not part of the statistics library for python versions 3.7 and lower. However in late versions of python it is indeed there and as such coming up with something like this is not needed.

```python
# nth root
def nroot(num, degree=2):
    return pow(num, 1 / degree)
# product
def prod(data):
    pro=data[0]
    i=1
    while i < len(data):
        pro = pro * data[i]
        i = i + 1
    return pro
# geometric mean
def geometric_mean(data):
    return nroot(prod(data), len(data))
 
print( geometric_mean([4, 9]) )  # 6.0
print( geometric_mean([14, 32]) )  # 21.166010488516726
```

## 2 - median

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

## 3 - Standard deviation and variance

The subject of [standard deviation](/2018/02/20/statistics-standard-deviation/) will come up now and then when dealing with a set of numbers which is a way of going about measure the variance between a set of numbers. For example the numbers 50, 51, and 49 are all pretty near each other while the numbers 100, 10, and 45 not so much. So it would make sense to have methods that can be used to gauge this kind of magnitude. In the python statistics library there are a few methods that can be used to get this kind of value such like that of an average.

### 3.1 - The variance and pvariance functions

There is a population variance function, that differs from the regular sample variance function.

```python
import statistics as stat
 
data1 = [50, 51, 60, 40, 47]
data2 = [50, 90, 10, 30, 75]
 
print( stat.pvariance(data1) ) # 41.839999999999996
print( stat.pvariance(data2) ) # 844
 
print( stat.variance(data1) ) # 52.3
print( stat.variance(data2) ) # 1055
```

### 3.2 - Sample and population Standard deviation

There are two froms of Standard deviation which include population and sample forms.

```python
import statistics as stat
import math
 
data1=[100,50,75]
 
print( stat.stdev(data1) )   # 25
# it is the sqrt of the sample variance
print( math.sqrt(stat.variance(data1)) ) # 25
 
print( stat.pstdev(data1) )  # 20.412414523193153
```

## 5 - Conclusion

So the statistics library in python is a great starting point when it comes to getting into statistics, but it is by no means everything that I might want to work with when it comes to getting into work with statistics. I am a very visual person actually, and I also like javaScript and canvas as a way to go about visualizing data. In python there is the [tkinter library](/2021/01/15/python-standard-library-tkinter/) that I have been meaning to sink some more time into when it comes to working out a way to display things in a visual way in a python environment rather than the front end javaScript environment that I am accustomed to.

There is also the question of how to go about getting data, in the first place, and how to go about storing that data. Again in javaScript there is the JSON format which is a standard way of going about sending data from one point to another over a network, and it is also often used as a way to store such data. However of course there are many other ways of going about doing so in a python world.
