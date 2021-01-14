---
title: Errors in python
date: 2021-01-14 13:46:00
tags: [python]
categories: python
layout: post
id: 781
updated: 2021-01-14 14:26:36
version: 1.4
---

One of the basic things that I still need to read up on a bit more with python is how to handle Errors. The process of doing so is a little differeent from what I am used to in a javaScript enviorment. However it would seem that it is only so different, just like with javaScript there is a kind of try catch statement. There are also ways of throwing a user defines exception of course, so everything that I am used to doing with errors in javaScript can more or less be done in python also.

So in this post I will be going over the very basics of errors inclduing ways to go about causing them, how to handle them, and how to throw, or raise them if you prefer. After the basics I think it might be a good idea to work out a few quikc use case examples as to how Error handing is useful when making certian kinds of functions, and projects. This is an imporant part of knowing how to programe with python, and any lanague for that matter actually so lets take a quick look at some examples of Errors in python.

<!-- more -->


## 1 - Basic Error handing example with try

To handel erros in python I just need to use the try keyword.

```python
try:
    x = 5 + 'a'
except SyntaxError:
    print('looks like we have a Syntax Error.')
except TypeError:
    print('That is a type Error');
 
# That is a type Error
```

## 2 - div by zero example

So how about a basic division by zero example.

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

## 3 - javaScript style adding example

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
