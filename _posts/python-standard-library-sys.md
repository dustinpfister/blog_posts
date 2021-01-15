---
title: The sys library in Python
date: 2021-01-07 15:52:00
tags: [python]
categories: python
layout: post
id: 777
updated: 2021-01-15 14:20:03
version: 1.6
---

The [sys library](https://docs.python.org/3.7/library/sys.html) in python seems to come up a lot in code examples, so it would make sense to write on post on this library. One major feature is that this library can be used as a way to get any positional argumnets that might have been passed to the script when it was called. However there are a number of other features in the librray that are also worth looking into with a few quick code examples.

<!-- more -->

## 1 - Using the argv

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

```python
```

## 3 - Conclusion

The main feature for me so far with the sys library is to have a way to get to arguments that might have been given. This is an impoarnt step in being ablle to start to make real projects with python as it is something that I make use of in other languages such as javaScript and bash.
