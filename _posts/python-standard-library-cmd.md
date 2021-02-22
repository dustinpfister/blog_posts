---
title: The cmd standard library in python
date: 2021-02-22 12:57:00
tags: [python]
categories: python
layout: post
id: 808
updated: 2021-02-22 14:56:41
version: 1.5
---

This week I think I will get back into making some simple python examples, and I think many of them should be basic simple command line tools and games. So in order to make such examples I think I should start with at least a few basic examples of the [cmd standard library](https://docs.python.org/3.7/library/cmd.html) that is built into python. This library can be used to create a simple command line prompt that will allow for me to interact with a python script from the command line.

The basic use case of the cmd library seems to be to create a class that builds on top of the Cmd class that is given by the library. There are a number of methods in this class that can be over writen, or left to there default behaviour. For example there is the empty line method of the cmd class that by default will call the last command called when an empty line command is called. This might be okay in some situations but I like to make it so that the help menu will print when an empty line command is given.

<!-- more -->

## 1 - The cmd librray basics

In this section I will be starting out with just some very simple copy and past one file examples of the cmd library that will help to show the basics of how to go about using this cmd library to create an interactive command line interface for a python script.

### 1.1 - Basic cmd getting started example

So this will be just a very basic getting started example of the cmd library in python. The first thing I would want to do is import the cmd library then I can use the Cmd class as a way to build a new class that will built on top of the Cmd Class. I will not be getting into the details of how to create and work with classes here, but if you want you can check out my [post on python classes](/2020/12/30/python-class/) as a way to get up to speed with them if you have not done so before hand.

```python
import cmd
 
class BasicApp(cmd.Cmd):
    "Basic Cmd App Example"
    i=0
    def do_thing(self, line):
        "step the i prop by 1"
        self.i = self.i + 1
        print('i =', self.i)
 
if __name__ == '__main__':
    BasicApp().cmdloop()
```

To add a command for the Basic App class I just need to define a method that starts with do, then an underscore, and then the name of the command to enter when in the command prompt. I then just need to create an instance of the class that I create on top of the Cmd class and call the cmdloop method of the class.

If I save the amove python example as something like basic.py, then I can call the script from the command line with python. When I do so I will drop into a command prompt and I can then use the command that I have define to prefrom an action.

```
$ python3 basic.py
(Cmd) thing
i = 1
(Cmd) 
```

Not much to write about with this one buit that is often what the deal is whn it comes to basic examples. Right off the bat you should get the basic idea though. However there is a great deal more to cover when it comes to using this library such as defining what to do when an empty line command is given, how to define some kind of default action when an uknown command is given and so forth. So with that said we should take a moment to work out at least a few more basic examples before starting to work on something real.

### 1.2 - onecmd

```python
import cmd
 
class BasicApp(cmd.Cmd):
    "Basic Cmd App Example"
    i=0
    def do_set(self, line):
        "set i to line"
        self.i = int(line)
        print('i =', self.i)
    def do_step(self, line):
        "step the i prop by 1"
        self.i = self.i + 1
        print('i =', self.i)
 
if __name__ == '__main__':
    app=BasicApp()
    app.onecmd('set 9')
    #app.onecmd('step')
    app.cmdloop()
```

### 1.3 - emptyline

```python
import cmd
 
class BasicApp(cmd.Cmd):
    "Basic Cmd App Example"
    i=0
    def do_thing(self, line):
        "step the i prop by 1"
        self.i = self.i + 1
        print('i =', self.i)
    def emptyline(self):
        "what to do for an empty line"
        self.onecmd('help')
 
if __name__ == '__main__':
    BasicApp().cmdloop()
```

### 1.4 - default

```python
import cmd
 
class BasicApp(cmd.Cmd):
    "Basic Cmd App Example"
    i=0
    def do_set(self, line):
        "set i to line"
        self.i = int(line)
        print('i =', self.i)
    def do_step(self, line):
        "step the i prop by 1"
        self.i = self.i + 1
        print('i =', self.i)
    def default(self, line):
        print('command ' + str(line) + ' not known')
        print('use a command in help')
        self.onecmd('help')
    def emptyline(self):
        print('no command given, must give a command')
        self.onecmd('help')
 
if __name__ == '__main__':
    app=BasicApp()
    app.cmdloop()
```

## 2 - Conclusion

So the cmd library is great for just quikly setting up a basic command line interface for a project that will allow for me to interact with a script from the command line. However this is just one option when it comes to working out things that have to do with using a script from the command line. There is also having a way to parse options when a script is called for the first time with the python binary, and there is also how to work with the standard input when it comes to things like pipping. However many command line tools have a way to drop into some kind of interactive shell from the comamnd line, and when it comes to doing that at least the cmd librray works great to do just that.
