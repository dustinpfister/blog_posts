---
title: Random Numbers in Python
date: 2021-01-22 15:30:00
tags: [python]
categories: python
layout: post
id: 787
updated: 2021-01-22 15:43:02
version: 1.3
---

There should be a built in way to create random numbers in python, and there is at least one way by making use of the [random standard library](https://docs.python.org/3.7/library/random.html). There are some projects where I might want to plug in a random number for an expression, or as an argument to a function. The random standard library has not just one, but a few methods to help make quick work with most typical use case examples for random numbers.

In this post I will be going over a few quick examples of the basic methods to get up and running quickly with random numbers in python. There will be just a few quick basic examples of the random method that will return a value between 0 and 1, and a few other range methods that help save me a little time when making my own solutions.

<!-- more -->

## 1 - Basic random example

So lets start out with a very simple example of the random built in library. If I import random I can then use a bunch of methods off of the random module such as the random method. This random methods is about the same as the Math.random methods that I am used to in javaScript. I just call the method, and the result is a random number between 0 and 1.

```python
import random
 
r=random.random()
print(r)
```

## 2 - Getting a random range

### 2.1 - random int range

```python
import random
 
r=random.randint(1, 6)
print(r)
```

### 2.2 - random float range

```python
import random
 
r=random.randint(1, 6)
print(r)
```

