---
title: The Threading Standard Library in Python 
date: 2020-12-21 12:49:00
tags: [python]
categories: python
layout: post
id: 766
updated: 2020-12-21 15:07:27
version: 1.7
---

This month I wanted to start [learning python](https://docs.python.org/3/tutorial/), and I have went threw the basics of learning the langaie pretty fast. However now I am starting to scrtach the surface when it comes to the wide range of standard librarys that there are to work with. One library that I think I should at least write a few quick examples with at least would be the [threading library](https://docs.python.org/3.7/library/threading.html).

In javaScript there are methods like setInterval, and setTimeout that can be used as a way to delay the calling of a function. These methods however will not result is a new event loop though, however in client side javaScript there is Webworker, and in node there is the cluster module that can be used as ways to go about creating a whole other event loop to work in. In python there must be ways of doing the same things, that is just delaying the calling of a function in the same thread, and also to create a whole seperate thread. This it would seem is what the threading standard libaray is all about when it comes to doing the same things in a python enviorment.

<!-- more -->

## 1 - Basic Timer example

So there is looking for a python method that is like the setTimeout method in javaScript. After some quick looking around it would seem that the Timer method of the threading standard library is one such method that might be a python version of the setTiemout method. I just need to call the Timer method, and then pass a number of seconds as the first argument, followed by the function that I want to delay as the second argument.

```python
import threading
 
def printMess():
  print('delay');
 
print('start');
t = threading.Timer(3, printMess)
t.start()
print('end');
```

## 2 - Basic app loop example

One way that I might make a basic app loop in javaScript is to call the setTimeout method recursivly inside the body of a function that I might call something like loop. It would seem that I can do the same thing with the threading Timer method.

```python
import threading
 
def printMess():
  print('hello');
 
def loop(func, sec):
  def wrapper():
    loop(func, sec)
    func()
  t = threading.Timer(sec, wrapper)
  t.start()
  return t
 
t=loop(printMess, 1)
```

## 3 - The thread class

Another major function in the threading library might be the Thread class. It would seem that this class can help when it comes to having more than on Thread running at the same time. It is not to hard to confirm this, say I have a function called _heavy_ that just does something that might take a little while, such as prining something to the standard output a thousand times. If I just call this heavy function twice when will happen is that the first set of a thousand print calls will log to the conosle first, and then the second set will start. This is becuase I am calling the heavy function twice in the same thread, so the first call must compleate until the second set can then start.

However if I use the Thread class of the threading library I can call my heavy function in a seperate thread. Then I can call the heavy function again in the main thread. The result is then having both calls happening at the same time.

```python
import threading
 
def heavy(id='none', count=100):
  i=0;
  while i < count:
    print(id, i)
    i = i + 1;
 
heavy('one', 1000)
heavy('two', 1000)
 
x = threading.Thread(target=heavy, args=['three',1000])
x.start()
heavy('four', 1000)
```

So then the Thread Class in the threading module is there to work with if I ever want to do real threading with python.

## 4 - Conclusion

So that is all for my post on the python threading library for now at least. I think that I might need to start thinking in terms of what I might want to do with python in the long term moving forward though. That is that I should start thinking about what I might want to do when it comes to some actual real python examples that might make use of the threading library. In that event I am sure that I will end up coming back to what I have wrote here to expand the content more.

I just wanted to touch base on this libray at least though, as I might sometimes be in a situation in which I might want to have more than one thread running at the same time to help speed up the process of something.