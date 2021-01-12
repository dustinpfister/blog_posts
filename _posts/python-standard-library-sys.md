---
title: The sys library in Python
date: 2021-01-07 15:52:00
tags: [python]
categories: python
layout: post
id: 777
updated: 2021-01-12 16:36:06
version: 1.1
---

The sys librray in python seems to come up a lot in code examples, so it would make sense to write on post on this library. One major feature is that this library can be used as a way to get any positional argumnets that might have been passed to the script when it was called. However there are a number of other features in the librray that are also worth looking into with a few quick code examples.

<!-- more -->

## 1 - Using the argv

```python
#!/usr/bin/python3
import sys
print(sys.argv[1].upper())
```

```
$ python3 argv.py "Hello World"
HELLO WORLD
```