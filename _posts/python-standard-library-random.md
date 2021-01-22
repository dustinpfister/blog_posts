---
title: Random Numbers in Python
date: 2021-01-22 15:30:00
tags: [python]
categories: python
layout: post
id: 787
updated: 2021-01-22 16:11:01
version: 1.8
---

There should be a built in way to create random numbers in python, and there is at least one way by making use of the [random standard library](https://docs.python.org/3.7/library/random.html). There are some projects where I might want to plug in a random number for an expression, or as an argument to a function. The random standard library has not just one, but a few methods to help make quick work with most typical use case examples for random numbers.

In this post I will be going over a few quick examples of the basic methods to get up and running quickly with random numbers in python. There will be just a few quick basic examples of the random method that will return a value between 0 and 1, and a few other range methods that help save me a little time when making my own solutions.

<!-- more -->

## 1 - Some Basic random library examples

In this section I will be going over just a few very basic examples of the random library that will make use of just one function in the library which is the random method. This random method is about the same as the Math.random method that I am used to in javaScript. I just call the method, and the result is a random number between 0 and 1. It is then just a question of what I do with that number when it comes to using it as part of an expression, and using it to create random values to plug into a function.

### 1.1 - The random method

So lets start out with a very simple example of the random built in library. If I import random I can then use a bunch of methods off of the random module such as the random method.

```python
import random
 
r=random.random()
print(r)
```

### 1.2 - Using the value in an expression

So now that I have the very basic general idea out of the way when it comes to the random methods lets move on to some more examples in which I am doing something with that value. A majoy part of programing is working out expressions that will create values. These expressions can be composed of a few varaibles and some times it might be nice to pass in a random number as part of the expression.

Say for example that I want to get a random position between between max values for x and y. One way is to woek out just some simple expressions to do so where there will be a value between 0 and 1 that can be thought of as a percent value of sorts. In the event that this percent value is zero then the result will be the min value that I want, if it is one then the result will be the max value. In such a case I can plug in a random number for this percent value to get a random point between these min and max values.

```python
import random
 
x_min = 50
x_max = 100
y_min = 225
y_max = 250
 
x = x_min + ( x_max - x_min ) * random.random()
y = y_min + ( y_max - y_min ) * random.random()
 
print(x, y)
```

This example is actually a little over kill as there are range method in the random library that can be used to get the same result, but you get the basic idea. These random numbers can be used in an expression.

### 1.2 - using the value as an argument to a function

Maybe it is not always such a good idea to just go ahead an place random values into an expression. Generaly I like to make expressions as a return value for function. I can then plug in static values for the function, or I can plug in a random number.

```python
import random
 
def getValue(minval=0, maxval=10, per=0):
    return minval + ( maxval - minval ) * per
 
print( getValue(0, 359, 0) )
print( getValue(0, 359, 1) )
print( getValue(0, 359, random.random()) )
```

## 2 - Getting a random range

There are a number of functions for getting a range between a min and max value.

### 2.1 - random int range

The randint method will give be a random integer value between and including a given min and max value. So for example say I want ramdom integer values that are consistant with the values of a dice, I can pass 1 for the min value, and 6 for the max value.

```python
import random
 
r=random.randint(1, 6)
print(r)
```

### 2.2 - random float range

```python
import random
 
r=random.randint(1, 6)
print(r)
```

