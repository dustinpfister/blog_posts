---
title: Functions in Python 
date: 2020-12-17 12:34:00
tags: [python]
categories: python
layout: post
id: 764
updated: 2020-12-18 13:59:12
version: 1.18
---

I am still in the process of [learning python](https://docs.python.org/3/tutorial/), and one imporant aspect of learniong python, or any langauge for that matter, is to know how to define functions. Functions are a great way to go about taking a block of code that I find myself repeating over and over again, and turn it into a function that I can just call each time I need to repeate that block of code. With functions often there is a way to pass a few argumnets that will be used in the body of the function, and there should also be a way to return a value from inside a function also. In python it is possible to do these basic things with functions, but there is also much more to them beyond that of course.

Coming from a javaScript background I have a lot of concerns, such as if python supports high order functions or not \( the anwser is yes \). Still I need to start somewhere, snd that means just staring out with some basic python function examples, and then move on more complex topics such as high order functions. So this will be a basic getting started with functions in python type post, but maybe I will get into some more advanced examples of python functions also in the process.

<!-- more -->

## 1 - The basics of Python functions

First things first lets start out slow and just get a very basic function example up and running. Then lets cover all the other little basics of functions in python when it comes to things like parameters, defining a return value for a function, and setting default argumnets for a functions parameters.

### 1.1 - Basic function example

To create a function in python I just need to start out with the def keyword, followed by a name for the function. After the name of the function I am then going to want an opening and closing set of parentesese in which I can place one or more parameters for the function, and then I end the line with a colon. After the line in which I use the def keyword that is termanated with a colon I am then going to want to indent for each additional line afterwards when it comes to defining the block of code for the function.

So say I just want to start out with a function that when called will just log a message to the standard output. For such a function I can use the print built in function inside the body of the function.

```python
def hello():
    print('Hello')
 
hello() # 'Hello'
hello() # 'Hello'
```

So now each time I call the hello function the string hello will be loged out to the standard output of the console.

### 1.2 - Setting a return value

When it comes to defining the block of code for a function I can use the retrun keyword to set a return value for the function. So when it comes to the basic example of just having a function log a message to the standard output I can have the function return the message rather than just use the print built in function inside the body of the function.

```python
def hello(name):
    return 'Hello ' + name
 
print( hello('Sam') )
print( hello('Paul') )
```

### 1.3 - Function parameters

It is possible to define one or more parameters for a function, to do so I just need to give the names for the parameters in the opening and closing parenteses of the function when defining it with the def keyword. Then when I go to call the function I can pass some argumnets for the parameters that will then be used in the body of the function.

```python
def add(a, b):
    return a + b
 
print( add(1, 1) )
```

### 1.4 - default arguments for function parameters

It is often a good idea to set default arguments for parameters so that if I just call the function without passing any argumnets there are some place holder values that will be used. When defining a python function I can just use the equals sign when defining parameters to assign a default argument for each parameter.

```python
def add(a=0, b=0):
    return a + b
 
print( add() )    # 0
print( add(1) )   # 1
print( add(1,1) ) # 2
```

## 2 - Passing a function as a parameter

I think that an imporant feature of a langaige is that I have the option to pass functions as a value for a paramater. There are just so many things that come up in programing where that kind of feature helps. For example say I am making a function that returns a number between 0 and 1 based off a numberatior and denomator value that are passed as arguments. One way to return such a value is to just divide the numerator over the denomanator, which will given a number that will go up from zero to one in a string line kind of way. That might be okay in many situations, but it might be nice to pass a function as an argument for such a function that will effect the return value in diferent ways.

 Well when it comes to python I am in luck, it would seem that I can pass functions as argumnets for other functions.

```python
def upper(text):  
    return text.upper()  
 
def lower(text):  
    return text.lower()  
 
def greet(mess, process):
    print( process(mess) )
 
greet('hElLo', upper)  
greet('hElLo', lower) 
```

This is just a basic example of what the deal is with passing functions as argumnets, however the basic idea is there. However there is not just thinking in terms of passing functions as argumnets, there is also having functions that return functions.

## 3 - variable scope and functions

Another imporant thing to understand with functions is to know what is going on with variable scope. This is an area in which I am going to have to do some more research and hopfully rememebr to get around to editiing this section when I do so. However it is not to hard to gain at least some sense as to what is going on with variable scope in python by just working out a few quick code examples.

It would seem that I can access a variable outside the scope of a function just fine, but when it comes to setting the value of that variable I end up creating a variable local to the function. Maybe this is actually a good thing when I think about it for a moment.

```python
a=40
def foo():
    print(a)
def bar():
    a=5
    print(a)
foo() # 40
bar() # 5
print(a) # 40
```

## 7 - conclusion

So that is what I have to say when it comes to the basics of functions in python thus far. There might be a great deal more to write about them actually I know, but I am still in the procress of learing opython myself as I am still fairly new to the langaue.

For the most part I have to say things are moving along pretty fast, python is a fairly easy lanague to learn. However it is true that I also have many years of experence with programing before hand when it comes to javaScript. So much of the process of learning python this far has been just re learning how to go about doing many things that I all ready know how to do only with python rather than javaScript.
