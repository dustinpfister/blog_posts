---
title: The cmd standard library in python
date: 2021-02-22 12:57:00
tags: [python]
categories: python
layout: post
id: 808
updated: 2021-02-22 14:45:39
version: 1.4
---

This week I think I will get back into making some simple python examples, and I think many of them should be basic simple command line tools and games. So in order to make such examples I think I should start with at least a few basic examples of the cmd standard library that is built into python. This library can be used to create a simple command line prompt that will allow for me to interact with a python script from the command line.

The basic use case of the cmd library seems to be to create a class that builds on top of the Cmd class that is given by the library. There are a number of methods in this class that can be over writen, or left to there default behaviour. For example there is the empty line method of the cmd class that by default will call the last command called when an empty line command is called. This might be okay in some situations but I like to make it so that the help menu will print when an empty line command is given.

<!-- more -->

## 1 - The cmd librray basics

In this section I will be starting out with just some very simple copy and past one file examples of the cmd library that will help to show the basics of how to go about using this cmd library to create an interactive command line interface for a python script.

### 1.1 - Basic cmd getting started example

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
