---
title: Errors in python
date: 2021-01-14 13:46:00
tags: [python]
categories: python
layout: post
id: 781
updated: 2021-01-20 13:43:21
version: 1.17
---

One of the basic things that I still need to read up on a bit more with python is how to [handle Errors](https://docs.python.org/3.7/tutorial/errors.html). The process of doing so is a little different from what I am used to in a javaScript environment, but not by much at least when it comes to the try catch statement. With the try catch statement there I can place some code that might cause an error into the body of a try block, and then if something goes wrong, code in an attached catch block will fire. In this catch block I can access an error object that will contained detailed information about the error that happened.

Just like with javaScript there is a kind of try catch statement in python, however it might be better to call it a try except statement. The try except statement is a little different, but it is more or less the same thing. I can place some code in the ty block, and of something goes wrong code in the except block will fire.

There is maybe a bot more to error handing then just understanding some basic examples of a try block, so in this post I will be going over everything that has come up so far when it comes to errors in python. This will include ways to go about causing them, how to handle them, and how to throw user defined errors, any any other little related things that might pop up in the process. After the basics I think it might be a good idea to work out a few quick use case examples that make use of Error handing when making certain kinds of functions, and basic projects. This is an important part of knowing how to program with python, and any language for that matter actually so lets take a quick look at some examples of Errors in python.

<!-- more -->


## 1 - Basic Error handing example with the try statement

To handle errors in python I just need to use the try statement. This works more or less the same way as what I am used to with the try catch statement in javaScript, just with a slightly different syntax as one should expect of course. Just start off with try, and then in the following block do whatever the code might be that can potentially cause an error. After they try block I can then have one or more except blocks that I can use to define additional code to run in the event that an error happed.

```python
try:
    x = 5 + 'a'
except SyntaxError:
    print('looks like we have a Syntax Error.')
except TypeError:
    print('That is a type Error');
 
# That is a type Error
```

## 2 - Types of exceptions

There are a great number of built in types of exceptions, for a full list it might be best to check out the [official python doc on built in exceptions](https://docs.python.org/3.7/library/exceptions.html#Exception). However that doc might not do the best job when it comes to showing a few examples of the various types of exceptions. In this section I will be going over a few examples of some of the types of exceptions that I have run into so far when it comes to working out simple python code examples.

### 2.1 - KeyError

When it comes to working with dictionary values it is possible to end up with a Key Error when trying to get a key that is not in the dictionary value. When working with a dictionary value in python a key value should not be confused with an attribute, those are two different things when it comes to this kind of data structure value.

```python
d = {'foo': 42}
try:
    a = d['bar']
except KeyError:
    print('KeyError')
```

### 2.2 - AttributeError

When working with a dictionary value for the first time things might not work they way one might expect coming from other programing languages. When setting key values for a dictionary these key values are not to be confused with attributes which are a little different from keys actually. If I set a key value and attempt to get at it by way of an attribute rather than key value then I will end up with an attribute error.

```python
# a key is not the same thing as an attribute
# if I try to get an attribute that is not an attribute
# but a key value then that will result in an AttributeError
d = {'foo': 42}
try:
    a = d.foo
except AttributeError:
    print('AttributeError')
# output:
# AttributeError
 
# to get a key value one way is to use
# this kind of syntax. However if the value
# is not there it will result in a KeyError
print( d['foo'] )
# output:
# foo
try:
    print( d['bar'] )
except KeyError:
    print('KeyError')
# output:
# KeyError
 
## it might be nest to use the get method
print( d.get('foo', 0) )
print( d.get('bar', 0) )
# output:
# 42
# 0
```

### 2.3 - Name Error

A Name Error is when I attempt to get a global, or local variable that is not there.

```python
try:
    print(a)
except NameError:
    print('NameError')
# output:
# NameError
```

### 2.4 - Syntax Error

Another typical error that I run into now and then is when I mess up with some of the actually syntax of python itself. This kind of exception can not be cached with a try except block unless the python code is evaluated with a call to the eval built in function, or some other such option.

```python
try:
    b = eval('5 ; 3')
except SyntaxError:
    print('SyntaxError')
# output:
# SyntaxError
```

## 3 - div by zero example

So how about a basic division by zero example, say I have a function that takes to arguments and uses those values in a division operation. When doing so it is possible to pass a value of zero for the denominator which will result in a zero division error. When some functions it will be necessary to define a custom value that will be returned when this kind of error happens.

```python
def div(n=1, d=1):
    try:
        return n / d
    except ZeroDivisionError:
        return 0.0
    except TypeError:
        return 0.0
    
print( div() )             # 1.0
print( div(5, 0) )         # 0.0
print( div('foo', None) )  # 0.0
```

## 4 - javaScript style adding example

In python if I just add a string of a number to a number value such as an int, then such an action will return in a TypeError. I come from a javaScript background, and in that language such expressions work without such an error. I can not say that I miss that when it comes to working out expressions in python. Also come to think of it often I do make sure that I am doing type conversion in javaScript and not depending on javaScript to always do that for me.

Still when it comes to working out some quick Error handling examples I think one of many good examples might be to quickly come up with a javaScript style add function. I can then pass the function to values, if both values are numbers then no problem, the returned result is just the sum of the two values. However if there is a type error, then I try converting any string values to numbers, if there is then a value error when doing that, then I convert both values to strings and return the concatenated string value of the two values.

```python
def jsAdd(a=0, b=0):
    try:
        # try just adding first
        return a + b
    except TypeError:
        # TypeError? try converting
        try:
            if type(a).__name__ == 'str':
                a=int(a)
            if type(b).__name__ == 'str':
                b=int(b)
            return a + b
        except ValueError:
            # ValueError? then just convert bolth
            # values to strings and concat
            return str(a) + str(b)

print( jsAdd(1, 2) )      # 3
print( jsAdd(5, 7) )      # 12
print( jsAdd('foo', 800) )  # 'foo800'
```

## 5 - Conclusion

This is an important step when it comes to learning all the basics of a language that I intend to use to start creating and using some real projects with. There are all kinds of things that can go wrong when it comes to using an application and being able to work out additional code to help handle those kinds of situations is helpful for making a robust project.