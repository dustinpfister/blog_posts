---
title: Classes in Python
date: 2020-12-30 11:33:00
tags: [python]
categories: python
layout: post
id: 771
updated: 2020-12-30 13:30:39
version: 1.6
---

I would like to start work on a real python project, and one of many things that I think I should get solid with python before doing so is to learn how to write [classes in python](https://docs.python.org/3.7/tutorial/classes.html). So for todays post I am going to go over some simple class examples that make use of the various features of classes.

I was able to get up and running with classes pretty quickly with python, but I think I should mention that I do have years of erperence programing in other lanagues manily javaScript. If you are pretty solid with how classes work in javaScript then you might also find this a quick painless procress also becuase what we are doing here is just learning how to do what we all ready know a slighly diferent way.

However if you have no experence with classes to begin with then I guess I will need to mention some kind of defanation of what a class is. One way of doing so might be to say that a class is an object that is not just an object but a class of an object. There is the class itself that is used to create an instnace of a class, and then there is an object that is a said instnace of the class. There are properties of the Class and then there are properties of just an instance of a class.

<!-- more -->

## 1 - The Basics of Python Clases

In this section I will be starting out with some very basic examples of a class in python. There are just a few things to cover before getting into some more advanced topics around classes such as with inheritence when working with more then one class. The focus here will be just with that fery first MyClass example, and some other topics that I think I should point out in a section such as this for people that are tottaly new to classes in python.

### 1.1 - basic Class example

So now for just a basic Class example to start off with. To crearte a class in python I just need to start off with the class keyword followed by the name that I want for the class, and then a colon. After that I indent in the next lines and start defining what I want the class to be. I can add properties for the class, and I can also define some functions for the class with the def keywrod as alwats when it comes to functions.

However when it comes to adding a function for a class I will want the furst argument for the function to be called self. This argument will be a refernce to the class instance when making a function for the class. In addition I am going to want to have at least one function with a special name called \_\_init\_\_ as you might guess thsi function will be called when cretaing a new instnace of the class.

```python
#!/usr/bin/python3
class MyClass:
    a=40
    c=None
    def __init__(self, b):
        self.b=int(b)
        self.c=self.a + self.b
    def out(self):
        print(self.a, self.b, self.c)
 
x=MyClass(2)
x.out() # 40 2 42
```

So there we have it a basic example of a class in python.

### 1.2 - Create a dictionary from a Class with .__dict__

There mioght be a few ways to go about creating a plain old doctionary object from a class instnace. One of the first things that I have come accross with this is to just use the \_\_dict\_\_ property of a class instnace. This property of a class always holds a dictionary of the own properties of the class instnace as i have often come to know them. That is that it will be a dictionatuy of the properties of self, but not the class itself. So if I want some class properties to be part of the dictiobnary I will need to make sure they are added somehow.

```python
#!/usr/bin/python3
class MyClass:
    a=40
    def __init__(self, b):
        self.b = b
        self.a = MyClass.a
 
# when I create an instnace of a class
# it will be a type of that class
x=MyClass(5)
print(type(x).__name__) # MyClass
 
# if I want a plan dictionary there is the __dict__ property
d = x.__dict__
print(d) # {'b': 5, 'a': 40}
```

### 1.3 - Class properties and Class insatnce properties

When it comes to a class there is the class itself, and then there is an object that is an instnace of that class.

```python
class MyClass:
    a=40
    def __init__(self, b):
        self.b=b
 
# when creating a class instance
# that instnace will have properties for 'a' and 'b'
x=MyClass(2)
print(x.a) # 40
print(x.b) # 2
 
# however only the 'b' propery is an 'own property' of
# the class instance
d=x.__dict__
print(d) # {'b': 2}
```