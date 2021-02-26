---
title: The statistics standard library in Python
date: 2021-02-26 12:42:00
tags: [python]
categories: python
layout: post
id: 812
updated: 2021-02-26 12:49:48
version: 1.1
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