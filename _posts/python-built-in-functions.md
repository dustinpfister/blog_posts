---
title: Built in Python functions 
date: 2020-12-15 11:16:00
tags: [python]
categories: python
layout: post
id: 762
updated: 2021-01-21 12:39:54
version: 1.30
---

I have [started to learn python](https://docs.python.org/3/tutorial/), and one of the first things that I have become aware of when doing so is like many other programing environments there are a number of [built in functions](https://docs.python.org/3.7/library/functions.html). It is always a good idea to take a moment to look over what there is to work with when it comes to built in functions before getting into user space modules, and python is no exception to this. If I need a function that does something the first collection of functions that I should look at are these built in functions, then what there is to work with when it comes to standard libraries, then user space libraries, and then if all else fails look into what I need to do in order to come up with my own solution.

This post will then be a general overview of all of the built in functions to work with in python. I might not get to covering all of them, but I will at least mention the ones that strike me as the most important thus far when it comes to getting started with python at least.

<!-- more -->

## 1 - abs - The built in python method for Absolute Value

One method that every programing language should have built in might very well be an absolute value method. Maybe this kind of method can be pulled away into a Math module, but even then it should be part of a standard Math module. In python there is such a standard module, but when it comes to absolute value that is one of the built in functions in python for better or worse.

### 1.1 - Basic example of abs

A basic example of the abs method would be to just call it and pass a number value that is negative, the returned result should be the positive counter part of that number.

```python
print( abs(-5) ) # 5
print( abs(-5.0) ) # 5.0
```

That is the basic idea of absolute value, pass a number that may be negative, but in any case return a positive number. However in order to truly understand and absolute absolute value maybe at least a few more examples are in order.

### 1.2 - A Bias percent method abs example

When making games and various features of games such as an experience point system, animations and so forth I often find myself making what I would call a percent method. Maybe that is not always such a good name for such a method, but to expand on what I mean by that it is a method where I have a function a numerator and a denominator and what is returned is a value between and including 0 and 1.

One such percent method that I have made in the past is a bias method that might look something like this.

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

The all function can be used to test if all the elements in a list are true. If an element is not a boolean value then whatever the truth value of the element is will be used. For example if I have an array of all positive numbers then that list will result in a true value being returned when I pass that list to the all method. Then it would also go without saying that if I pass an array that has even just one number that is zero or lower that will result in a false value being returned by the all method.

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

The ascii function is a way to go about creating a string value of an object. There are actually a few options when it comes to built in functions that convert an object value to a string value. The other built in functions of interest are the repr, and str functions that do more os less the same thing only with a few note worth differences.

With the ascii method the onw thing that stands out from the other options is that it will escape non ascii characters. So as the name suggests it will turn a non ascii friendly string into one that is composed of just ascii range characters.

```python
a = [1,2,3]
 
s = ascii(a) + "foo"
print(type(a)) # <class 'list'>
print(type(s)) # <class 'str'>
```

### 4.1 - Compared to other functions ( str and repr )

The ascii function is helpful for converting not just objects but also string values to ascii friendly strings. So in general it is a good way to go about making sure the the returned string value will not have any characters that go outside of the ascii code point range. Anything that goes above it will be replaced with an escape code sequence.

```python
a = [1,2,3]
s = '\u00f0';
 
print( ascii(s) ) # '\xf0'
print( str(s) ) # ð
print( repr(s) ) # 'ð'
```

## 5 - bytearray

The bytearray will return an array of byte values.

```python
a = bytearray([255, 128])
 
print(a[0]) # 255
print(a) # bytearray(b'\xff\x80')
print(type(a)) # <class 'bytearray'>
```

## 6 - bool

The bool method is the way to go about creating a boolean value in python. I Just have to call the boolen function, and pass a value to which I want the equivalent boolean value. For example if I pass the int 0 I would expect for that to result in a false boolen value, and if I pass the int 1 I would expect a true boolean value.

```python
print( bool(0) ) # False
print( bool(1) ) # True
```

### 6.1 - Expressions can work out to booleans also

The bool function can be used to convert a value to a boolean data type, but a boolean data type can also be the result of an expression.

```python
print( bool(0) ) # False
print( bool(1) ) # True
 
print( 1>1 ) # False
print( 2>1 ) # True
```

So the bool function just needs to be used with variables and values and not so much expressions as long as the expression always evalutaes to a boolean to begin with.

## 7 - len - Find out how many items are in an object such as a list

Often I might want to know how many items there are in an object such as a list. For this common task there is the len method that is fairly simple to use. I Just call the len function and pass the object to which I want to know the number of items. In this section I will be going over a few quick examples of the len function.

### 7.1 - Basic example of len

Say I have a simple list and I just want to know how many items are in the list. I can just call the len method and pass the list, the returned result will then be the number of items in the list

```python
l=[1,2,3,4]
 
print( len(l) ) # 4
```

### 7.2 - A while loop example of len

One typical use case of the len function would be to use it to set a starting index value for a while loop. Here I have a basic while loop example in which I am starting the index value for a list by setting it to the length of the list with the len function. I can then just subtract inside the body of the while loop before referencing elements in the list. The result is an effect where I am looping backwards threw a list

```python
l=['a','b','c','d']
i= len(l)
 
while i > 0:
  i = i - 1
  print(i, l[i])
```

## 8 - map - The map function

The map function will return a new iterator that is the action of applying a function to each element in an iteratable. In other words I can pass a function for the first parameter of map, and something like a list as the section argument. The function that I pass to map will be called for each element in the list, and the return value iof the function passed will be the new value for an element.

```python
a=[0,1,2,3,4]
def pow2(n):
    return pow(2, n)
b = list( map(pow2, a) )
print(b) # [1, 2, 4, 8, 16]
```

## 9 - open - Read, write, and create files.

The open function can be used as a quick and simple way to read, write to and create files. There are other options for this that might be e better choice when it comes to doing something a little advanced. But generaly I think it is a good idea to start with the most basic solution first, and only make things more complacted if doing so is truly called for. With that said the open built in function seems to work find with most typucal file io related tasks.

### 9.1 - read a file

```python
f=open('./hello.txt', 'r')
s=f.read()
print(s) # 'Hello World'
print(type(s).__name__) # 'str'
```

## 10 - print - Printing something out to the standard output

When it comes to starting even the most basic of python examples, often it is needed to have a way to print something out to the standard output. One way to go about doing so is with the print built in function, which would be the python equivalent to something like console.log in javaScript.

### 10.1 - Basic print example

A basic example of the print built in function would be to just call it and pass it a value that you would like to print out to the standard output.

```python
# can pass a string value to print
print('Hello World') # 'Hello World'
 
# can pass other data types to print
# such as an init
print( 5 ) # 5
```

### 10.2 - Change what the end of line is

By default the print built in method will add an end of line after each call of the print method in the form of a single line feed character. In some projects I might want to change what this is, such as a more windows friendly end of line string, or even nothing actually. To change what each line ends with I just need to use the end parameter when calling the print function. When doing so I can make what the end of line string is to anything that I want including an empty string.

```
mess='Hello'
 
# by default print will append a new line after each call
i=0
while i < 5:
  print(mess);
  i = i + 1;
print('')
# end can be used to change that
i=0
while i < 5:
  print(mess, end="");
  i = i + 1;
print('')
 
#Hello
#Hello
#Hello
#Hello
#Hello
#
#HelloHelloHelloHelloHello
#
```

## 11 - range

The range method is a way to quickly create a range of numbers. This function is then very useful for quickly creating say a simple list of numbers in order. A range is lot a list mind you, but it can be easily turned into a list, and more often then not it can be used in place of a list.

### 11.1 - Basic range example

For a basic example of the range function there is just calling the function and passing a starting value as the first argument, followed by another value that will be the end value.

```python
r = range(0,10)
print( type (r) ) # <class 'range'>
```

### 11.2 - To list example

One great thing about a range is that I can quickly turn it into a list by just passing the range to the list function. Also on top of setting a starting and ending value I can also give a step rate as a third argument to the range function.

```python
r = range(5, 25, 5)
l = list((r))
print( l ) # [5, 10, 15, 20]
```

### 11.3 - for loop range example

A range can often prove to be useful when it comes to working out something with a for loop. The range function can be used to quickly create a range of numbers to which I can then run over with a for loop and use with some additional logic to create a desired list of values.

```python
import math
base=2
nums=[]
for e in range(0,10):
  nums.append(int(math.pow(base, e)))
print(nums)
# [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
```

## 12 - super - call a method of a parent class

The super built in function can be used to call a method of a parent class of the same name. For example say I want to call the init method of a parent class rather than of the current class, they way to do so would be to use the supper function.

```python
class Box():
    def __init__(self, x=0, y=0, w=32, h=32):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h
    
class Ship(Box):
    def __init__(self, heading=90, x=0, y=0, w=32, h=32):
        super().__init__(x, y, w, h)
        self.heading = heading
    
s=Ship(180);
print(s.area()) # 1024
 
print(s.__dict__)
# {'x': 0, 'y': 0, 'w': 32, 'h': 32, 'heading': 180}
```

## 13 - type - To check out what the current data type of a value is

The python language has a few data types built into python itself. There is not just one but several data types for numbers, and then a whole bunch of different object types, and some additional other data types like strings and booleans. On top of that yet even more data types can be added into the mix when it comes to libraries, so then there should be a way to always know what kind of type one is dealing with when it comes to working with all the different kinds of primitives and objects in python itself as well as all the various additional libraries. So then there is then the type function that is often useful to get the type of a value so that I know what I am dealing with.

```python
print( type(1) )         # <class 'int'>
print( type(1.5) )       # <class 'float'>
print( type([1,2,3]) )   # <class 'list'>
print( type({1,2,3}) )   # <class 'set'>
```

## 14 - Conclusion

That is all for built in functions for now, if I get around to editing this post I will see about expanding some of these sections with even more examples of built in python functions. As of this writing I am still fairly new to using python, so I will want to gain some more experience working out some real python examples in order to gain a better sense of what built in functions are used the most often. Once I have a better sense of what I am using the most I can then add more examples of the built in functions that are the most important.
