---
title: Named arguments for python scripts uisng the argparse standard librray
date: 2021-01-19 13:06:00
tags: [python]
categories: python
layout: post
id: 784
updated: 2021-01-19 13:26:51
version: 1.3
---

When learning a new langauge that can be used to create scripts that can be called from the command line one of the first things that I like to learn is how to access any positional argumnets that might have been given when the script was called. If I do just want to check positional argumnets then there is just using the sys librarys argv property to do so. However therer should be a way to parse named argumnets with a built in libraray or therer should at least be a decent user space options when it comes to parsing named options.

WHen it comes to option parsers in some programing lanagues I have to look for a user space option, or even go so far as to create and maintain my own options parser. This is, or at least as of this writing was the case when it comes to nodejs, as such I would go with a user space npm package for option parsing such as commander, or yargs. However one nice thing about writing scripts with python is that there is a great built in option parser called [argparse](https://docs.python.org/3.7/library/argparse.html#argparse.ArgumentParser.add_argument).

<!-- more -->

## 1 - Basic getting started example of argparse

The basic flow of argparse is to like always import the librray first. The next step is to create a new instance of the parser by calling the Argument Parser method of the argparse library. Once I have an instance of a parser I can then start adding some argumnets for the parser by calling the add argument method of a parser insatnce. When doing so there are a number of parameterts for the add argumnet method that I will be getting into greater detail later in this post. Once I have one or more arguments for the parser instance I can the call the parse args method of the parser instance, and the returned value of that will be an argumnets object that I can then use in the reast of the code of my script.

```python
import argparse
 
# create a parser
parser = argparse.ArgumentParser(description='Basic argparse example.')
 
# have at least one argument
parser.add_argument('--foo',
                    dest='mode',
                    action='store_true',
                    default=False,
                    help='set foo mode true (default: False)')

# parse the arguments
args = parser.parse_args()
 
# use the arguments
if(args.mode):
    print('FOO MODE!')
else:
    print('bar mode')
```

## 2 - The add argument method in detail

The add argument method of a parser instance is a key part of the process of defineing what the named argumnets for a script should be. At a bare minamume I should at least set a name for an argumnet. However there are a number of other paramaterts for this method that are worth getting into detail with. So in this section I will be quikcly going over some of the parameters of the method that I should be awaer of when using it to define the name options for a script.

### 2.1 - The name argumnet

```python
import argparse
 
parser = argparse.ArgumentParser()
 
parser.add_argument('--foo')
 
# parse the arguments
args = parser.parse_args()
 
print(args.foo);
```

## 3 -

## 4 - Conclusion

This standard librray is a great part of the collection of built in python librrays. In many othre lanagues I have to waste time hunting down a decent option parser, or waste a great deal of time comming up with my own solution for doing so. However with python therer is a great solution for this built into python itself, along with a whole bunch of other fery usfule built in librraies. So far I have not found much or a reason to even start looking into user space packages actually becuase there is just so much to work with when it comes to built in libraries.

