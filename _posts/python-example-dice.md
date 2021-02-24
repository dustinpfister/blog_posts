---
title: Python Basic Dice example
date: 2021-02-24 12:44:00
tags: [python]
categories: python
layout: post
id: 810
updated: 2021-02-24 13:44:12
version: 1.3
---

I would like to start off a few posts on some basic, and maybe a few not so basic python applaction examples. Just for the sake of learning how to progress beyond just picking up the basics when it comes to the langue itself, and the standard libries. After all the long term plan of picking up a langue should be to create some actual projects of one kind or another.

I think at least a few posts should be on very basic single file programes that just do one little thing. This is becuase I would like to have a few very simple getting started type posts where the goal is to make something that is a finished product rather than just soemthing that helps with one little problem. However I also think that often that should be the goal anyway when it comes to making a python applaction. Often I might think of an applaction as just one product, but often one product can be just a whole bunch of products that work togetaher.

So to start off this collection of python example posts I think I will start off with a simple dice applaction. That is just a way to spit out one or more numbers to the standard output between and including 1 and 6. However there is still more to it than just that even when it comes to such a simple getting started project. I would like to be able to use the script as bolth a module that I can use in other pythin scripts, and stand alone project by itself. There are also at least a few additional options that I can add to the project such as being able to set the number of sides for a set of dice, or just one dice in a set of dice. There is also being able to have control over how the output is formated, such has having some kind of plain text format, or spit out some JSON. So maybe this example will not be so basic, but still I will try to keep from going to nuts with this one becuase I would like to make this one of my getting startd with python type posts.

<!-- more -->


## 1 - The /lib/dice.py module

```python
import random;
 
def roll_die():
    return random.randint(1, 6)
 
def roll_set(count=2):
    set=[]
    i=0
    while i < count:
        set.append(roll_die())
        i = i + 1;
    return set
```

## 2 - The main index.py file

I make this example two files, and I could have made those two files in the same folder. However I am thinking ahead and it is possible that I might want to add additional files. So I would like to keep things in folders as a way to keep things a little neat. So I have mu dice.py module in a lib folder, however that makes things a little complacted when it comes to importing the module.

```python
import os,sys,inspect
dir_current = os.getcwd()
dir_script = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
# insert lib folder
sys.path.insert(0, dir_script + '/lib')
import dice
# using dice lib
set=dice.roll_set(count=4)
print(set)
```