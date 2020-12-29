---
title: Modules in Python
date: 2020-12-29 14:14:00
tags: [python]
categories: python
layout: post
id: 770
updated: 2020-12-29 16:19:02
version: 1.10
---

In the past few weeks I have been making an effort to start learning python, and as such I should start getting into how to go about making some kind of real project with python at some point. So far I have been just toyinh around with small snippits of code, and working out the very basic of python programing. However when it comes to the idea of getting into making something real I am going to want to knwo how to go about [making modules in python](https://docs.python.org/3.7/tutorial/modules.html). That is how to go about taking code and breaking it down into sepearte files to which I can then import into another file that will be the main python file or scirpt file that will be started with the python binary one way or another.

So in this post I will be going over the basics and more when it comes to modules and scripts in python as I have come to know it thus far. Such as the difrenec between a script and a module, how to go about using a module from a script file, and how to go about creating a module of my own.

<!-- more -->

## 1 - Basic script example

The first kind of module that comes to mind might not really be a module as it would seem that it is actually refered to offten as a script actually. However I think that it is something that I should start off with at least when it comes to the topic of modules. After all when it comes to using modules there is still going to need to be some kind of main file that is called to start a main programe of some kind. This main file might not really be a module, but it is of cource a way to go about uisng a module.

### 1.1 - Basic hello world script

The basic idea of a script is to just save some python code as a file with a py file name extension. That way I do not have to keep typing the same python code over and over again I can just call the file each time. When doing so it might make sense to place a shebang at the top of the file when it comes to this kind of file that will be called directly with the python binary.

So say I have a hello.py file like this:

```python
#!/usr/bin/python3
def HelloWorld():
    print('Hello World');
HelloWorld()
```

I can call it with python like this:

```
$ python3 basic.py
Hello World
```

Or I can make the file exacutabaule and call it directly thanks to the shebang

```
$ chmod 755 basic.py
./basic.py
Hello World
```

So that is the basic idea when it comes to a script.

## 2 - Creating my own module

Now that I have covered the basic of makign what a script file is often called, it is time to create some basic modules of my own. In this section I will be quickly going over a few basic examples of making my own modules in python. These modules will be files that just define some functions that can then be used in a script file. I will be strting out with some very basic examples, and the maybe move into something that might start to be the very beginings of an actualy project of some kind, however that might still be a bit of a streatch to call it that.

### 2.1 - Basic hello world module example

So for this example I have a hello.py file like this:

```python
def HelloWorld():
    print('Hello World');
```

This file just creates one function called hello world and that is it. I am not calling the funciton here, or doing anything more beyond just defining this one simple function. So this hello.py file will be the module, and I will now need a script to make use of this module.

With that I then have a script\_hello.py file like this:

```python
#!/usr/bin/python3
 
# import my hello.py module
import hello
 
# I can now call my hello world function
# from this script file
hello.HelloWorld();
```

This is then a simpkle script file that will be called with python and will make use of my hello.py module.

```
$ python3 script_hello.py
Hello World
```

Okat greate so now I have the very basic idea of how to go about making a python module. So now that I have that out of the way i can start working on something that is a little more advanced.

### 2.2 - Basic display object module example

One thing that will come up often when making some kind of game for example will be to have a way to create some kind of display object. In other words and object that has properties that hold a current position, along with width and height properties that repersent some kind of object that will move around in a game world. So manye I shoul;d take a moment to work out a very simp,e example of that kind of modules as a way to attemot creating some kind of real modules example.

```python
# create a basic display object
def createBasic(x=0, y=0, w=32, h=32):
    disp={'x':x,'y':y,'w':w,'h':h}
    return disp
# create an enemy display object
def createEnemy(x=0,y=0,w=32,h=32,hpMax=100,attack=1):
    disp=createBasic(x, y, w, h)
    disp['hpMax']=hpMax
    disp['hp']=hpMax
    disp['attack']=attack
    return disp
# create a pool of display objects
def createPool(count=5, create=createBasic, x=0, y=0):
    i=0
    obj=[]
    while i < count:
        obj.append(create(x,y,32,32))
        i = i + 1
    return {'obj': obj}
```

So I can the use my display object module in a script like this.

```python
#!/usr/bin/python3
import disp
 
# I can create a single display object like this
x=disp.createBasic(5,7)
print(x) # {'x': 5, 'y': 7, 'w': 32, 'h': 32}
 
# I can create a pool of display objects like this
b=disp.createPool(3, x=50, y=25, create=disp.createEnemy)
obj = b['obj']
print(len(obj)) # 3
print(obj[2])   # {'x': 50, 'y': 25, 'w': 32, 'h': 32, 'hpMax': 100, 'hp': 100, 'attack': 1}
```

Seems to work okay so far, but I would have to add and chnage a lot to make this something that will actually work as a real python example of some kind. Still this might be a good start when it comes to making this kind of module.

## 3 - Conclusion

That will eb it for now when it comes to modules in python. There is a great deal more to write about on this topic of course, but I am still new to python myself when it comes to this topioc so I need to spend a little more time working on some actaul code examples when it comes to things like packages. There are also some additiotnal standards and best practaces that I did not get to when it comes to makig modules, however again I think that should all be part of a future packages section in this post when  and if I get around to editing this post a little next time.
