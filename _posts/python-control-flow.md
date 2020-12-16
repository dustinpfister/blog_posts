---
title: Control flow in Python 
date: 2020-12-16 12:46:00
tags: [python]
categories: python
layout: post
id: 763
updated: 2020-12-16 17:12:13
version: 1.18
---

This week I have started [learning python](https://docs.python.org/3/tutorial/) just for the sake of picking up another programing language other than javaScript that I have been working with for years. I do very much still like javaScript a lot, and thing that it is a great starting language for people who have zero experence programing, I just think that it is time to finnaly start trying out something else.

Anyway one big part of larning a new language is to learn what there is to work with when it comes to [control flow](https://en.wikipedia.org/wiki/Control_flow). That is how to go about writing basic elements of code such as if statements, while loops, and other elements of a langaue that control the flow of a program. In python there are a number of features that are not all that different from what I am all ready familiur with in javaScript, there are of course if statements, while loops, and functions. So in this post I will be taking a look at these various control flow options.

This post on [control flow in python](https://docs.python.org/3/tutorial/controlflow.html) will be fairly basic as control flow is a basic aspect of laerning a langaue. However it is still never the less somethiong that I need to learn all over again even though I have years of programiong experence with control flow in javaScript. Also in order to really understand how to work with control flow statements in python I am also going to need to at least learn a little when it comes to other related topics like boolean values, and expressions.

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

Expressions are a topic that desirve a whole other post, and maybe even several posts actaully. Expressions can be very simple, however they can also get pretty complex. However for the sake of this post on just control flow in python it might be called for to just stick to some basic expressions.

Some basic expressions might just involve comparing two values to see if one is greater than another, the other way around, or if they are equal to each other. In any case the expressions will evaluate to a true, or false boolean value, and this is how expressions relate to the topic of a bool value that I touched base on.

Here are some basic examples of python expressions to start off with when it comes to what I think is a good starting point for if statemenets.
 
```python
x = 5
y = 10
 
a = x < y
print( a, type(a).__name__ ) # True bool
 
b = x > y
print( b, type(b).__name__ ) # False bool
 
c = x == y
print( c, type(c).__name__ ) # False bool
```

So now that we have a basic idea of what a boolean value is and what an expression is we can now move on to some basic exmaples of if statements in python.

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

Another major part of control flow in a langauge is loops. There are several kinds of loops that come to mind when it comes to lanagues, however in this section I will be going over while loops in python. These work just like if statements, only they will keep runing what is in the block of code following the while statement until the expression is given will evaluate to a false value.

### 2.1 - Basic while loop example

The basic idea of a while loop is then just like an if statement, only I start off by typeing while rather than if, however that is the only diferenec in terms of the syntax. It is imporatnt to do somethiong in the block of code that will potentialy chnage the value of the expression from false to true, if not then I might end up having an infinate loop.

So a basic example of a while loop might be to set a variable to a starting value such as zero, and then compare the value to another value in the expression. Inside the block of code I would then just need to step the value in a way in which the expression will end up being true at some point.

```python
i=0
while i < 10:
  print(i)
  i = i + 1
```

### 2.2 - Looping backward to 0 (flase)

In the first section on if statements I mentioned that the numberical value of zero will evalute to a false boolean value when such a value is convered to a boolean type. This fact can be used to ones advantage when it comes to working out an expression for a while loop. 

For example the expression for a while loop can just be a variable that holds an integer value, and inside the body of the while loop I am subtraction from that interger value by one. If the starting value of the variable is greater than zero, then one will keep getting subtracted from the variable until the value of zero is reached which evaluates to false, and thus the loop will stop.

```python
i=9
l=[]
while i:
  l.append(i)
  i = i - 1
print(l) # [9, 8, 7, 6, 5, 4, 3, 2, 1]
```

## 3 - for loops

Another kind of loop to work with in python is a for loop. Although it is possible to work with lists, with while loops it might be easier to just use a for loop. So far it would seem that a for loop might be a better option when it comes to working with lists, and sequences. So becuase this is a post on control flow in python I should go over some examples of for loops also, so lets look at a few examples.

### 3.1 - Basic for loop example

So here is a basic for loop example where I am just looping over a list.

```python
nums = [3.5, 2, 3.5]
for n in nums:
  print(int(n * 2), end='') # 747
```

### 3.2 - The range built in function

I should at least mention the range built in function when it comes to for loops.

```python
for x in range(0,10):
  print(x, end='-')
```

## 4 - Functions

It might be a gray area if a function is really a part of control flow or not, however in any case I should take a moment to write about a few quick function examples at least.

### 4.1 - A Basic function example

A function starts of with the def keyword followed by the name of the function. After the name of the function I then have a set of parenetetes in which I can have some parameters for the function. Then just liek if statementsm and loops I end the line with a colon, and define the body of code for the function my indenting each line afterwards. Inside the body of the function I can have an opion retrun value for the function, for this I just need to type return followed by the value that I want the return value of the function to be.

```python
def foo(x):
    return x < 10
 
print(foo(5)); # True
print(foo(11)); # false
```

## 5 - break continue

There is also the break and continue keywords that can be used in conjunction with loops.

```python
def stronly(l):
  i=len(l)
  result=[]
  while i > 0 :
    i = i - 1;
    if(ascii(type(l[i])) != '<class \'str\'>'):
        continue
    result.append(l[i])
  return result

l=[1, 'one', 2, 'two', 3.5, 4, 'three', []]  
print( stronly(l) ) # ['three', 'two', 'one']
```

## 6 - Conclusion

Great so not I have the basics and beyond worked out when it comes to control flow, however I still have a lot more to learn about when it comes to python. This might be a borning part of learning a new langaue, however I am all ready starting to scratch the surface when it comes to more intersting aspects of programing with python. When I work out more examples I will of course come back around to this post and see about expanding what I have wrote here farther as needed.
