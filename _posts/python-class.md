---
title: Classes in Python
date: 2020-12-30 11:33:00
tags: [python]
categories: python
layout: post
id: 771
updated: 2020-12-30 15:11:45
version: 1.12
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

When it comes to a class there is the class itself, and then there is an object that is an instnace of that class. So then when it comes to an instance of a class there are properties of this instance that are what are often called an own property of that instnace. In other words it is a propery that is exclusive to a single instance of a class, rather than a property that is shared accrosss more than one instance of a class.

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

## 2 - Inheritance

Now that I have covered some of the basics when it comes to a class it is time to move on to some more advanced topics when it comes to writing classes. One advanced topic that comes to mind is the subject of Inheritance when it comes to working out a base class and then haveing one or more additional classes that work on top of that base class.

### 2.1 - A Basic Box base Class and a Ship Class on top of it

So one good example of Inheritance might be to work out some kind of base box class. This base box class will create just a simple Box object that has properties like x, y, and just a few additional properties maybe that have to do with the size of a boxed in area. In addition to this the Box class might have some methods to help work with these basic Box Classes such as a distance method that will return the distance between two box objects.

So then say I want to have another Class that has all the properties of a Box Class, but has some additional properteis and methods on top of it that is a kind of Ship Class. That is that this Ship is like a box class, but with a few more properties that have to do with a heading, hit point values, and maybe something like an attack value. When it comes to making a Ship class I can have the Box class be a base clase that the Ship Class inherits from. As such I can then use all the methods of the Box class with ship class insatnces, and aly class level properties that I set in the Box class can function as default values for a Ship class insatnce.

```python
import math
 
class Box():
    x=0
    y=0
    w=32
    h=32
    def __init__(self,x=0,y=0,w=32,h=32):
        self.x=x
        self.y=y
        self.w=w
        self.h=h
    def distance(self, box2):
        if(box2 is None):
            return 0
        a=math.pow(self.x - box2.x, 2)
        b=math.pow(self.y - box2.y, 2)
        return math.sqrt(a+b) 
 
class Ship(Box):
    def __init__(self, hpMax=100, damage=1):
        self.hpMax = hpMax
        self.hp = hpMax
        self.heading = 0
        self.damage = damage
 
a=Ship()
 
print(a.hp) # 100
 
# no properties are set for x,y,w, and h in the Ship Class
# however the Ship Class inherits from Box and as such the
# Class level values of Box are used for these values
print(a.x, a.y)  # 0 0
 
# on top of Box properties functioning as a default for ship values
# I can also use Box functions with a ship class instance
b=Box(25,30)
d=a.distance(b)
print(d) # 39.05124837953327
```

There might be a lot more to add to a Collection of classes like this when it comes to making something that will work well in an actual project, but you should still get the basic idea.

## 3 - Iterators and classes

Many object in python can be looped over with something like a for loop, such as with lists for example. In some situations it might be nice to have that kind of functionaity for a Class. So in this section I will be outlining a few examples of how to go about making such a class.

### 3.1 - Simple Index values example

Lets start out with a simple example that makes use of a numbered index value as a way to loop over some elements of a property of a Class.

```python
class Numbered:
    def __init__(self, data):
        self.data = data
        self.index = 0

    def __iter__(self):
        self.index = 0
        return self

    def __next__(self):
        if self.index == len(self.data):
            raise StopIteration
        d={'value': self.data[self.index], 'index': self.index}
        self.index = self.index + 1
        return d
    
x = Numbered('foo')
 
for prop in x:
    print(prop)
    
```

### 3.2 - Named keys example

Looping over a property of a class that has index rather than named values is one thing. However what if I want to loop over properties of the class insatnce, and even then only certian properties of the class instance and maybe not all of them?

```python
class Foo:
    loopKeys=['a','d']
    def __init__(self, a=1, b=2, c=3, d=4):
        self.a=a
        self.b=b
        self.c=c
        self.d=d
        self.index=0
        
    def __iter__(self):
        self.index=0
        return self
    
    def __next__(self):
        if self.index == len(Foo.loopKeys):
            raise StopIteration
        prop=Foo.loopKeys[self.index]
        self.index = self.index + 1
        return self.__dict__[prop]
 
x=Foo();
for prop in x:
    print(prop)
# 1
# 4
```

## 4 - Conclusion

A Class is then a way to have a way to create an object that is not just an object but a kind of object. When it comes to having more than one kind of object there are properties that might be the same accross more than one instance of a Class, but there are often at least a few properties that need to be indepednant from all others.