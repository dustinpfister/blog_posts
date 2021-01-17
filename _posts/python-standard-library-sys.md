---
title: The sys library in Python
date: 2021-01-07 15:52:00
tags: [python]
categories: python
layout: post
id: 777
updated: 2021-01-17 11:47:45
version: 1.13
---

The [sys library](https://docs.python.org/3.7/library/sys.html) in python seems to come up a lot in code examples, so it would make sense to write a post on this library. This librray has a lot of operating system level features to work with, but it is not really a replacement for the os library that also comes up a lot in examples.

One major feature is that this library can be used as a way to get any positional argumnets that might have been passed to the script when it was called in the form of a list. This is one of the first things I like to learn how to do when it comes to learning a new programing lanague, at least when it comes to a lanague and enviorment that can be used to create scripts that can be called in a command line interface. Wehn making such scripts there should be a way to access and positional arguments that may have been passed when the script was called. In nodejs there is the process.argv array, in bash scripts there are special parameters than can be used, and in python the way to do so is with, you guessed in the sys standard librarys argv list.

However there are a number of other features in the sys librray that are also worth looking into with a few quick code examples. I will not be going over every little detail here, however I will of course be covering the most striking features that are worth writing about in detail of course, so lets go over them.

<!-- more -->

## 1 - Using the argv property

The major feature that I think I should get to right away with the sys library is that this library is how I go about getting positional arguments in python. For a very basic example of this say I have a python script called argv.py and at the very top O have the python shebang which is a feature that I often add to any script that I aim to make exacutabule in a posix system. After that I just import the sys librray and then the argv prop of the sys module is where I can get to any positional argumnets that might have been given. The first index of this argv sequence is the name of the binray used, but index value 1 forward are the positional argumnets.

So if I have a script like this:

```python
#!/usr/bin/python3
import sys
print(sys.argv[1].upper())
```

Then I can give it an argument when calling it like this:

```
$ python3 argv.py "Hello World"
HELLO WORLD
```

## 2 - The path property

Another major point of interest in the sys library might be the sys.path property of the library. This property is a list of strings where each string is a path to serach for modules. In some situations it might be nessecery to push some additional path strings into this list if I run into problems loading libraries in a script.

### 2.1 - basic example

It I just want to take a look at the state of the list I can just print it out as I would with any other list.

```python
import sys
print(sys.path)
```

The state of this path can be impacked by a number of factors. First off if there is a PYTHONPATH enviorment variable the list of paths can end up being created from that value. On top of that there should be a hard coded value that pythion will fall back to if there is no PYTHONPATH variable, and the value can varry a little from one interprater to another. Then there is the fact that the list value is not read only, additional paths can be added to it in a script.

### 2.2 - I can append a relative or absolute path to the sys.path list

A relative, or better yet absoulte path, can be appended to the sys.path list. The effect is as i would exspect when I load any additional scripts with import they will load if they are in the folder that I append to the list.

```python
def foo():
    return 'bar'
def bar():
    return 'foo'
```

```python
import sys
sys.path.append('nested');
import bar
print(bar.foo()) # 'bar'
print(bar.bar()) # 'foo'
```

Although a path can be relative, I have found that it is generraly a good idea to try to stick to absolute paths when and where possible. When adding a path like in this example if the current working path is changed then the code will break, making sure that an absolute path is what is used will help keep that from happedning. However doing so will first require getting the current path of the script that is begin called.

## 3 - Exit a script with sys.exit

When working on python scripts, or any kind of script for that matter, I might run into situtsions in which I will need to exit the script. When doing so it is a good idea to set an exit code status. There are a number of ways to do this I have foudnthus far, however I think that maybe just using the sys exit method might work okay in most typically situstions.

```python
import sys
print('one')
sys.exit()
print('two')
 
# one
```

## 4 - Conclusion

The main feature for me so far with the sys library is to have a way to get to arguments that might have been given. This is an important step in being ablle to start to make real projects with python as it is something that I make use of in other languages such as javaScript and bash.
