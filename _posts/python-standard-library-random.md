---
title: Random Numbers in Python
date: 2021-01-22 15:30:00
tags: [python]
categories: python
layout: post
id: 787
updated: 2021-01-24 14:58:36
version: 1.15
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

So now that I have the very basic general idea out of the way when it comes to the random methods lets move on to some more examples in which I am doing something with that value. A major part of programing is working out expressions that will create values. These expressions can be composed of a few variables and some times it might be nice to pass in a random number as part of the expression.

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

Maybe it is not always such a good idea to just go ahead an place random values into an expression. Generally I like to make expressions as a return value for function. I can then plug in static values for the function, or I can plug in a random number.

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

The randint method will give be a random integer value between and including a given min and max value. So for example say I want ramdom integer values that are consistent with the values of a dice, I can pass 1 for the min value, and 6 for the max value.

```python
import random
 
r=random.randint(1, 6)
print(r)
```

### 2.2 - random float range

The uniform method is what I can use to get a random number between a min and max value that is a float rather than int value.

```python
import random
 
r=random.uniform(0, 6.28)
print(r)
```

## 3 - Using the math library with the random library

The random library might rarly be used on its own, there are coming up with some basic examples of what can be done with random numbers, but in order to do anything that is truly interetsing I am going to want to make use of some additional libraries, or write a whole lot of my own code.

When it comes to other librrays that come to mind to use with the random librray one that comes to mind is the math librray. There are a few built in functions for doing some basic math operations such as the pow built in function, but in order to do anything really cool I am going to want at least a few basic math functions to work with. So in this section I will be going over some simple examples that make use of random numbers, and the math library.

### 3.1 - Having some fun with cos and sin

The Math.cos, and Math.sin functions of the math library are two math functions that I find mysefl playing around with a lot. these methods are great for getting a point along the circumfrence of a circle when I know a center point, distance from that center point, and an angle. With that set of known values I can create a function where I pass those values to get a point that lays on a circle. It is not so hard to create such a function, and once I have that function to work with I can have fun using the randomn library to get random points that lay around the circumfrence of a circle, or any place relative to a given circle.

```python
import random
import math
 
def echo(n):
    return n
 
def getPointFromCenter(cx=0, cy=0, degree=0, dist=0, roundFunc=echo):
    radian = math.pi / 180 * degree
    return {
        'x': roundFunc( cx + math.cos(radian) * dist ),
        'y': roundFunc( cy + math.sin(radian) * dist )
    }
 
# get random points that are on a ray
def getRandomPointAlongRay(cx=50, cy=50, degree=90, dist_min=25, dist_max=50, roundFunc=echo):
    return getPointFromCenter(cx, cy, degree, random.uniform(dist_min, dist_max), roundFunc)
 
print( getRandomPointAlongRay(100, 250, 180, 25, 100, round) )
```

### 3.2 - Random numbers and atan2

There are many must know methods in the math library when it comes to having fun with random numbers and actaully using those random numbers to position things. The math.cos and math.sin methods are great for positioning an object in a random location relative to a center point, but what about getting an angle from a point to another point, and also the other way around. Another must know math method I think is the atan2 method which is relavent to this kind of task.

```python
import random
import math
 
def echo(n):
    return n
 
def angleToFrom(toX, toY, fromX, fromY, invert=False, degrees=True):
    angle = math.atan2(toY - fromY, toX - fromX)
    if(invert):
        angle += math.pi
    if(degrees):
        return math.degrees(angle) % 360
    return angle % (math.tau)
 
# seems to work
print( angleToFrom(0, 0, 100, 0) )   # 180.0
print( angleToFrom(0, 0, -100, 0) )  # 0.0
print( angleToFrom(0, 0,  0, 100) )  # 270.0
print( angleToFrom(0, 0,  0, -100) ) # 90.0
print( angleToFrom(0, 0,  -100, 0, degrees=False, invert=True) ) # 3.141592653589793
 
def createBlock():
    x = -100 + random.random() * 200;
    y = -100 + random.random() * 200;
    a = angleToFrom(0, 0, x, y)
    return {'x': x, 'y': y, 'a': a}
 
block = createBlock()
 
print(block)
```

## 4 - Conclusion

The random library is then the standard go to library to do anything that I want to do with random numbers. For the most part I often use random numbers when it comes to creating various kinds of game projects, and when making games I prefer to do so in a javaScript enviorment. Still it is nice to learn how to do all the various things that I like to do in javaScript with python, and knaowing how to come up with random numbers sur is one such thing that comes to mind with that.
