---
title: regular expressions in Python
date: 2021-01-20 15:06:00
tags: [python]
categories: python
layout: post
id: 785
updated: 2021-01-20 16:37:29
version: 1.10
---

When working with source code and text in general there are times where i will want to know if a substring is in a string or not. Other times I will want to know a bit more then just if there is a substring, but one or more substrings. Also I might want to know even more about the state of a substring such as the starting and ending index values for each match. Also there might be times now and then where I am not looking for a fixed, static substring, but a pattern that might have some degree of variation, but follows a kind of reason.

There are a number of options when it comes to looking for a substring in a string. If I just want to know if there is a given fixed substring in a string or not there are some simple basic options to do that and just move on. However when it comes to doing something more advanced for situations in which doing so is called for, such as creating a lanaguge tokenizer, then I might need to get into using regular expressions.

<!-- more -->

## 1 - Basic Python pattern matching examples

To start off with maybe I should go over some simple options for basic pattern matching before getting into the regular expression standard library in detail at least. I will be going over a basic example of the search method in this section, but I will also be going over some other options that might be a better choice when it comes to simple tasks. Getting into regular expressions can prove to be a bit of a pain, in some situstions it is a pain that must be endured. However if I just want to know if a string contains a fixed substring value or not, there are easier ways of doing so.

So in this section I will be getting to a basic example of the regular expression library, but first lets take a look at some simple examples first.

### 1.1 - The in operator

First off there is the in operator that is a quick and easy way to just find out of a substring is in a string. I just start off an expression with the substring to look for, then the in operator, and then the string that I want to look in. If the substring is in the string that I am looking into then the expression will evaluate to true, if not then false.

```python
a='so abc is easy as abc'
b='things are not always so easy'
 
print( 'abc' in a ) # True
print( 'abc' in b ) # False
```

### 1.2 - The string index method

There are a number of methods that I can call off of a string instance, one of which is the index method. WHen calling this index method of a string I can pass a substring to look for, and if it is found then the starting index of the substring will be returned. However there seems to be a majot draw back when the substring is not found which is that it will result in a value error.

```python
a='so abc is easy as abc'
b='things are not always so easy'
 
print( a.index('abc') )
# 3
 
try:
    print( b.index('abc') )
except ValueError:
    print('abc not found');
# 'abc not found'
```

### 1.3 - A while loop and a function

Yet another options might be to just start working something out in the body of a function and using a while loop to look for a substring. This allows for the potential to not just find out of there is a match or not, but also that start and ending index values.

```python
a='so abc is easy as abc'
b='things are not always so easy'
 
def find_string(string, sub_string):
    i=0
    sl = len(string)
    subl = len(sub_string)
    m=[]
    while i <= sl - subl:
        text=string[i: i + subl]
        if(text == sub_string):
            m.append({
                "start": i,
                "end": i + subl,
                "text": text
            })
        i = i + 1
    return m
        
print( find_string(a, 'abc') )
# [{'start': 3, 'end': 6, 'text': 'abc'}, {'start': 18, 'end': 21, 'text': 'abc'}]
 
print( find_string(b, 'abc') )
# []
```

I could of course add all kinds of other features in order to make a solution that will work just the way that I want to when it comes to just getting into the thick of this sort of thing. However doing so might be overkill actually, and I might just be wasting time making something that has all ready been worked out before. Why make my own solution for fidning a substring when there is the regular expression librray that will work not just with substrings, but also all kinds of pattrens that will match patterns where there is a degree of variartion. With that said lets look at just one more example of fidning a substring in a string using a regular expression.

### 1.4 - Use a regular expression with the re standard library

The serach method of the regular expression library will also give me the start and end index values of the first match.

```python
import re
 
a='so abc is easy as abc'
b='things are not always so easy'
 
m = re.search('abc', a)
 
# the start and end index of the first group
print(m.start(0)) # 3
print(m.end(0)) # 6
 
# the text of the first group
print(m.group(0)) # abc
 
m = re.search('abc', b)
print(m)
# None
```

However this is just a simple example of a pattern, and I am just using the serach method. There are many other methiods to work with, including one that will create an object that I can use with a loop, to loop over all instances of a substring, getting the starting and ending index values for each match just like with my function example. On top of that I can use all kinds of pattrens, inclduing ondex that will not just match a single fixed sttatic pattern. So lets take a deeper look at theis regular expression librray to see what can be done with regular expressions in python.

## 2 - The regular expression library methods

So now that I have the basics of pattern matching out of the way, now it is time to start getting into some not so basic pattern matching with the regular expression library. In this section I will be going over some of the methods to choose from starting with the bext option so far as I see it. I will not be getting into how to go about writing patterns in detail just yet, but I will be using a pattern that will match any sequence of numbers rather than just a fixed substring value like in the basic section.

### 2.1 - The finditer method to get at everything

So there are a number of methods to choose from, but I think that I will start with the best one first. The re.finditer method is the method in the regular expression standard librray that I would want to use to get all the instances of a match in a string. This method will return an iterator object to which I can then use in a for loop. Inside the body of the for loop I can then get ann the starting and ending index values along with the value of each match in the string that fits the pattern.

```python
import re
a = 'I would say that 654 is also like 123 in some ways'
m = re.finditer('\d+', a);
for i in m:
    print(i.group(0), end=',')
    print(i.start(0), end=',')
    print(i.end(0))
# 654,17,20
# 123,34,37
```


## 3 - Conclusion

So regular expressions can be used to get at all the index and text values in a string that follow a kind of pattern. There is a whole range of use case examples that come to mind where I would want to use regular edpressions such as creating some kind of script that will act as a parser of some kind of lanague, such as a mark down parser for example.
