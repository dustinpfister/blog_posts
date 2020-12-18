---
title: The Math Standard Library in Python 
date: 2020-12-18 10:32:00
tags: [python]
categories: python
layout: post
id: 765
updated: 2020-12-18 13:38:59
version: 1.11
---

Time to wrap up this first week of [learning python](https://docs.python.org/3/tutorial/) on my own, today I think I will be taking a look at one of the many standard librarys to work with in python starting with the [math library](https://docs.python.org/3.7/library/math.html).

In javaScript there is the built in Math object that contains all kinds of useful properties and methods that help with working out all kinds of Math expressions. So when it comes to Python there should be another such Object, or built in module at least to work with and it would seem that there is. However things are a little broken up with some things, for example when it comes to absolute value there is a built in absolute value method in python itself, and there is another such method in the math module. Also when it comes to generating random numbers there is no such method to be found in the standard math module, instead there is yet another module called random that contains such a method. So depeding on what I need to do, it would be best to look at what there is to work with on built in functions first. Then if I might look at the math module, but even then there is more than one math module.

Anyway in todays post I am going to be looking at some of the methods that there are to work with whe it comes to the standard built in math libray in python. I will also be taking a look at some other features of python itself, and other librarys to work with in order to trutly get up and runinf with some math in python.

<!-- more -->

## 1 - The Math Standard Library in Python

So this is mainly a post on the Standard Math Library in python, so of course I will be staring off with a few examples that make use of this Lubrary. However I will not be covering every little method and property in this section for several reasons. One reason would be that there is all ready comprehensive documnetaion on the math librray at the python.org website that will go over everything. The other reason why is that there are only a few methods that are trult needed here as there are other basic math methods that are some of the python built in functions. Also the main math module does not have everything outside of the built in functions.

So in this section I will be going over some of the methods that I will likley be using in real projects now and then

### 1.1 - Math.e

The math.e property of the math librray stores [Euler's number](https://en.wikipedia.org/wiki/E_%28mathematical_constant%29). This is a property that I find myself using now and then when it comes to working out some expressions that have to do with logarithms, as this math.e constant is the base of the natural logarithm.

```python
import math
 
print(math.e)         # 2.718281828459045
 
n = math.pow(2, 52)
e = math.pow( 1 + 1 / n, n)
print(e)              # 2.718281828459045
print( math.e == e )  # true
```

### 1.2 - Math.log

Another useful method that I might use now and then from the main libray is the math.log method. This is a useful method for working out any kind of expresion that works with logarithms. This maty.log method can take two argumnets the first of which is the number that I want a logarithm for and the second is a base argument. The default base for the math.log method is math.e, or Euler's constant if you prefer.

```python
import math
 
a = math.log(2)
b = math.log(2, math.e)
 
print(a)      # 0.6931471805599453
print(a == b) # True
```

## 2 - Python Built in Math functions

So now that I have covered some basic examples of the Math library maybe now I should review some of the [built in functions in python](/2020/12/15/python-built-in-functions/). Not all of them of course, but certainly all the ones that have to do with Math. In the math librray theer is for example a method that can eb used to get the absolute value of a number, and also another method to get a power. However when it comes to just working with the built in methods for python alone there is an absolute value method, and power method also. There are also a great deal of other basic math methods in the collection of python built in functions, so in this section I will be going over these.

### 1.1 - The abs built in function

There is an absolute value method in the math library, but why bother with that when there is an absolute value method that can just be used in python itself.

```python
print( abs(-5) ) # 5
```

### 1.2 - hex

If I need to convert an integer value to a hex value then there is the hex function.

```python
print( hex(16) )  # 0x10
print( hex(32) )  # 0x20
print( hex(48) )  # 0x30
print( hex(64) )  # 0x40
 
print( hex(255) ) # 0xff
```

### 1.3 - min and max

If I want to get the lowest or highest number in a list of numbers there is the max and min functions.

```python
n=[1, -8, 32, 0, 1024, -3]
 
print( max(n) ) # 1024
print( min(n) ) # -8
```

### 1.4 - oct

There is the oct function that is just like hex only it will return a number as an octal rather than hex.

```python
print( oct(8) )  # 0o10
print( oct(16) ) # 0o20
print( oct(24) ) # 0o30
print( oct(32) ) # 0o40
print( oct(40) ) # 0o50
 
print( oct(64) ) # 0o100
```

### 1.5 - pow

There is of course a math.pow function in the math librray, however there is also just uisng the pow built in function.

```python
n = pow(2,10)
 
print(n) # 1024
```

### 1.6 - round

There might be more than one round function in the math library, such as floor and ceil. However if I just need a basic round function then there is the round function in python by itself.

```python
pi=3.14159
print( round(pi) ) # 3
print( round(pi, 3) ) # 3.142
 
pi = pi * -1
print( round(pi) ) # -3
print( round(pi, 3) ) # -3.142
```

### 1.7 - sum

When it comes to built in functions in python there is also the sum function.

```python
nums=[1,2,3,4,5,5,10]
 
print( sum(nums) ) # 30
```


## 3 - Other Math modules in python

So I have went over some of the basics of the math library, and also some of the python built in functions that have to do with math. However there is still a great deal missing when it comes to even just basic math methods. For example coming from a javaScript background there is the Math.random method that will return a random number between 0 and 1. No such method is there as one of the built in functions, and in addition there is not a random number method in the standard math librray also. There is however a random method in yet another standard library called random. So with that said in this section I will be going over some examples that have to do with other standard librrays that have to do with math that will help to compleate the set of basic functions to work with when it comes to creating some expressions in python.


## 4 - Conclusion

Well that is it for now when it comes to the math standard library in python, along with some additional stuff that has to do with other related modules and features of python. I think the next step from here is to just start working out some real examples that have to do with math in order to really get the hang of how to work with the math library. For example in another project that I have been working on latley I have been working out a new experence point system that makes use of methods that use Math.log.
