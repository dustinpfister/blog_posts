---
title: Classes in Python
date: 2020-12-30 11:33:00
tags: [python]
categories: python
layout: post
id: 771
updated: 2020-12-30 12:35:08
version: 1.1
---

I would like to start work on a real python project, and one of many things that I think I should get solid with python before doing so is to learn how to write classes in python. So for todays post I am going to go over some simple class examples that make use of the various features of classes.

<!-- more -->

## 1 - The Basics of Python Clases

In this section I will be starting out with some very basic examples of a class in python. There are just a few things to cover before getting into some more advanced topics around classes such as with inheritence when working with more then one class. The focus here will be just with that fery first MyClass example, and some other topics that I think I should point out in a section such as this for people that are tottaly new to classes in python.

### 1.1 - basic Class example

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

### 1.2 - Create a dictionary from a Class with .__dict__

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