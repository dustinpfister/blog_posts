---
title: Named arguments for python scripts uisng the argparse standard librray
date: 2021-01-19 13:06:00
tags: [python]
categories: python
layout: post
id: 784
updated: 2021-01-19 15:38:17
version: 1.10
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

The first argument that is given when calling the add argument method of a parser instance will be that is used in the command line to set the argument. The value will also be used for a default value for a destanation of the argument object if another value is not given with the dest property. More than one positional argument can be given when setting a name for the argument.

```python
import argparse
 
parser = argparse.ArgumentParser()
 
parser.add_argument('--foo')
 
# parse the arguments
args = parser.parse_args()
 
print(args.foo);
```

### 2.2 - The action parameter

There are a number of additional parameters for the add argument method that are worth mentioning beyond just setting the name of the option. The action parameter is one such parameter that is worth mentioning, this is what can be used to define several types of actions when it comes to how options should be treated. What I mean by that is that there are options where it just sets a boolen value from false to true, or the other way around, and then there are options that can be used to set some kind of value. The action parameter is how to go about setting what kind of option it is when it comes to these things.

The default action is store, so there is not much need to bother setting that kind iof action, unless for some reason I want to make sure that it is clear that is the kind of action it should be. This kind of action will just store any given value after the option is used as a value for the property in the args object.

```python
import argparse
 
parser = argparse.ArgumentParser()
 
# default action is 'store' whioch will just store any given value for
# the argument. If no default is set then the default value for the
# argument will be None. The default dist for the argument will be the name
# of the argument
 
parser.add_argument('--foo')
 
# here is anoher argument, with values set to what the defaults are
parser.add_argument('--bar',
                    action='store',
                    default=None,
                    dest='bar')
 
args = parser.parse_args()
print(args.foo);
print(args.bar);
```

There are a number of other actions other that the default sore action, I will be getting to those later in this post.

### 2.3 - Have two or more arguments for an option

The nargs parameter of add argumnets is what I will want to use if for example I want to set two or more values for an option. What I mean by this is that when using an option there is often an option that does not take any values, it just sets a boolean true or false, there is also the kind of option that takes just one value, but the nargs parameter can be used to set a number of arguments for an option.

For example say I want to have an add option that will take two number values after the option.

```python
import argparse
parser = argparse.ArgumentParser()
 
parser.add_argument('--add', nargs=2)
 
args = parser.parse_args()
print(args.add);
```

## 3 - Actions in detail

Now that I have a basic example out of the way, and I went over the various parameters for the add argumnet method, I think I should take a moment to get into actions a little deeper. In many of the examples thus far I have just been using the default action which is a store action. However there are a number of other options when it comes to actions. There are two boolean actions, one for setting up an argumnet that will be set to true when used, and the other as you might have goesed is to set something false. There are afew other options that might be a good choice over the default store action in some cases, so lets take a look at the options are when it comes to actions.

### 3.2 - Store Ture and False values for simple boolean options with store_true, and store_false actions

The kind of option that is just a flag that sets a boolean value to true is pretty typically when working out a script for something. Setting the action to store\_true will set up and option that will be true when the flag is given in the command line.

```python
import argparse
 
# create a parser
parser = argparse.ArgumentParser(description='Basic argparse boolean example.')
 
# a bool argument can be created by using the 'store_true', or 'store_false' value for
# the action argument of the add_argument method. If for example the 'store_true' action
# is used, then it would make sense to set the default argument to False
parser.add_argument('--foo',
                    dest='foomode',
                    action='store_true',
                    default=False,
                    help='set foomode true (default: False)')
 
# parse the arguments
args = parser.parse_args()
# use the arguments
if(args.foomode):
    print('FOO MODE!')
else:
    print('bar mode')
```

### 3.3 - Store const

So what if I want an option that is like a boolean option, but in place of a true or flase value there is a number value, or some other constant value that will be used with some code. In other words say I want a value that is a scale value that can be set to 360 with a degree flag, or left to a default value that is 6.28. For these kinds of options there is the store\_const action that can be used to set a const value when the flag is set. The default parameter can be used to set a default value for this in the event that the flag is not given.

```python
import argparse
 
parser = argparse.ArgumentParser(description='Basic argparse boolean example.')
 
# sore_const action
parser.add_argument('--degree', '-d',
                    action='store_const',
                    dest='scale',
                    const=360.00,
                    default=6.28,
                    help='set scale to 360')
 
parser.add_argument('--angle', '-a',
                    dest='angle',
                    action='store',
                    default=0,
                    help='an angle value')
 
args = parser.parse_args()
per = float(args.angle) / args.scale;
print('per=' + str(per), 'scale=' + str(args.scale), 'angle=' + str(args.angle))
```

## 4 - Conclusion

This standard librray is a great part of the collection of built in python librrays. In many othre lanagues I have to waste time hunting down a decent option parser, or waste a great deal of time comming up with my own solution for doing so. However with python therer is a great solution for this built into python itself, along with a whole bunch of other fery usfule built in librraies. So far I have not found much or a reason to even start looking into user space packages actually becuase there is just so much to work with when it comes to built in libraries.

