---
title: Modules in Python
date: 2020-12-29 14:14:00
tags: [python]
categories: python
layout: post
id: 770
updated: 2020-12-29 14:25:47
version: 1.2
---

In the past few weeks I have been making an effor to start learning python, and as such I should start getting into how to star making some kind of real project with python at some point. With that said I should start to learn the basics of how to go about creating modules with python. So in this post I will be going over the basics and more when it comes to modules, and packages in python as I have come to know it thus far.

<!-- more -->

## 1 - Basic script example

The first kind of module that comes to mind might not really be a module as it would seem that it is actually refered to offten as a script actually. However I think that it is something that I should start off with at least when it comes to the topic of modules. After all when it comes to using modules there is still going to need to be some kind of main file that is called to start a main programe of some kind. This main file might not really be a module, but it is of cource a way to go about uisng a module.

```python
#!/usr/bin/python3
def HelloWorld():
    print('Hello World');
HelloWorld()
```

```
$ python basic.py
Hello World
```

```
$ chmod 755 basic.py
./basic.py
Hello World
```