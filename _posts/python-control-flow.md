---
title: Control flow in Python 
date: 2020-12-16 12:46:00
tags: [python]
categories: python
layout: post
id: 763
updated: 2020-12-16 15:19:44
version: 1.4
---

This week I have started [learning python](https://docs.python.org/3/tutorial/) just for the sake of picking another programing language other than javaScript. So one big part of larning a new language is to learn what there is to work with when it comes to [control flow](https://en.wikipedia.org/wiki/Control_flow). That is how to go about writing basic elements of code such as if statements, while loops, and other elements of a langaue that control the flow of a program.

<!-- more -->

## 1 - if statements

First off what it comes to control flow and python is if statements. This is one of the first things I would want to get solid not just with python, but any new langauge. They work more or less like if statements in any other lanague so maybe there is onyl so much to write about them, but never the less in this section I am going to go over everything that I think is important.

I am not sure if it makes sense to start with studying built in functions first, or flow control. In any case when it comes to getting starte with if statements there are a few things that one needs to have at least a basic understanind of first. Such as the fack that the word _if_ in python is a keyword, and that in order to use an if statement you need to given it an _expression_. In addition an expression that is used with an if statement will evaluate to a _boolean_ data type, and that the _bool built in function_ us a way to create a boolean value from another value. I will not be getting intio all of this in detail here, however I do think that I should at least touch base on all of it, before even getting to some basic if statement examples.

So in this section I will be going over some very basics of python, and then a few if statement examples.

### 1.1 - First off a word on Booleans and the Bool built in

The expression that is used with an expression should evaluate to a boolean value. It might be a little off topic to get into booleans and the bool built in function, but it might help to gain a batter understanding of if statements to start with this.

```python
a = bool(1)
print(a, type(a).__name__ ) # True bool
 
c = bool(-1)
print(c, type(c).__name__ ) # True bool
 
d = bool(0)
print(d, type(d).__name__ ) # False bool
```

### 1.2 - A quick word on expressions

```python
```

### 1.3 - Basic if statement example

To write an if statement, I just need to start with the if keyword, followed by an expression, and then finish with a colon. Then in the next line I just need to intendt to start a block of code that will run if the expression evaluates to true.

```python
x = 5
y = 10
if x < 10:
  print('x is less')
print('done')
```

## 2 - While loops

## 3 - for loops

## 4 - break continue