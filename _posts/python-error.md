---
title: Errors in python
date: 2021-01-14 13:46:00
tags: [python]
categories: python
layout: post
id: 781
updated: 2021-01-19 11:20:22
version: 1.11
---

One of the basic things that I still need to read up on a bit more with python is how to [handle Errors](https://docs.python.org/3.7/tutorial/errors.html). The process of doing so is a little differeent from what I am used to in a javaScript enviornment, but not by much at least when it comes to the try catch statement. With the try catch statement there I can place some code that might cause an error into the body of a try block, and then if something goes wrong, code in an attached catch block will fire. In this catch block I canaccess an error object that will contained detailed information about the error that happended.

Just like with javaScript there is a kind of try catch statement in python, however it might be better to call it a try except statement. The try except statement is a little diferent, but it is more or less the same thing. I can place some code in the ty block, and of something goes wrong code in the except block will fire.

There is maybe a bot more to error handing then just understanding some basic examples of a try block, so in this post I will be going over everything that has come up so far when it comes to errors in python. This will include ways to go about causing them, how to handle them, and how to throw user defined errors, any any other little related things that might pop up in the process. After the basics I think it might be a good idea to work out a few quick use case examples that make use of Error handing when making certian kinds of functions, and basic projects. This is an imporant part of knowing how to programe with python, and any lanague for that matter actually so lets take a quick look at some examples of Errors in python.

<!-- more -->


## 1 - Basic Error handing example with the try statement

To handle errors in python I just need to use the try statement. This works more or less the same way as what I am used to with the try ctach statement in javaScript, just with a slighlty different syntax as one should exspect of course. Just start off with try, and then in the following block do whatever the code might be that can potentialy cause an error. After they try block I can then have one or more except blocks that I can use to define additional code to run in the event that an error happend

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

When it comes to working with dictionary values it is possible to end up with a Key Error when trying to get a key that is not in the dictionary value. When working with a dictionaty value in python a key value should not be confused with an attrabute, those are two differnt things when it comes to this kind of data structore value.

```python
d = {'foo': 42}
try:
    a = d['bar']
except KeyError:
    print('KeyError')
```

### 2.2 - AttributeError

When working with a dictioney value for the first time things might not work they way one might exspect coming from other programing lanagues. When setting key values for a dictionary these key values are not to be confusted with attrabutes. If I set a key value and attempt to get at it by way of an attrabute rather than key value then I will end up with an attribute error.

```python
d = {'foo': 42}
try:
    a = d.bar
except AttributeError:
    print('AttributeError')
# output:
# AttributeError
```

## 3 - div by zero example

So how about a basic division by zero example, say I have a function that takes to arguments and uses those values in a division operation. When doing so it is possible to pass a value of zero for the denomanator which will result in a zero division error. When some functions it will be nessecry to define a custom value that will be returned when this kind of error happens.

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

In python if I just add a string of a number to a number value such as an int, then such an action will return in a TypeError. I come from a javaScript background, and in that lanagaue such expressions work without such an error. I can not say that I miss that when it comes to working out exporessions in python. Also come to think of it often I do make sure that I am doing type conversion in javaScript and not depeding on javaScript to always do that for me.

Still when it comes to working out some quick Error handling examples I think one of many good examples might be to quickly come up with a javaScript style add function. I can bass thr function to values, if both values are numbers then no problem the returned result is just the sum of the two values. However if there is a type error, then I try converting any string values to numbers, if there is then a value error when doing that, then I convert bolth values to strings and return the concatanated string value of the two values.

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

This is an imporant step when it comes to learning all the basics of a lanague that I intend to use to start creating and using some real projects with. There are all kinds of things that can go wrong when it comes to using an applaction and being able to work out additional code to help handle those kinds of situations is helpful for making a robust project.