---
title: The Subprocess Library in python
date: 2021-01-13 16:24:00
tags: [python]
categories: python
layout: post
id: 780
updated: 2021-01-20 14:11:05
version: 1.14
---

When learning a new programing environment one thing that I like to learn how to do is how to go about launching another script, or command completely in the operating system if I can do so. In just about any language where I am writing a script, or source code that will be compiled into a binary that will be called in the command line, there should be a way to call any and all other commands.

In nodejs there is the child process module for example that provides methods that can be used to run a command, so there should be such a module in python also then. It would seem that the best option for doing so might be the [subprocess library](https://docs.python.org/3.7/library/subprocess.html) that contains such methods. There are some other options when it comes to running external commands, but the other built in options are older solutions that are still there mainly so older code does not break.

For this post then I will be going over some basic examples of the subprocess module when it comes to running external commands in python.

<!-- more -->

## 1 - The run method

The run method of the subprocess library should be the first go to option for most situations in which I want to run an external command. It will not work great for all use case examples though, for that there is the Popen method that I will be getting to in a later section.

For any external command that should not take long the run method should work okay, however one thing that I have noticed is that the use of this command will pause execution of additional python code once I call the run method. So if I need to do something that might take a real long time, and I want the rest of the script to continue, then I might want to use pOpen in place of run. However the run command is still a good starting point, and it should generally be used first before moving on to Popen when needed.

There are a few arguments that I should get to when it comes to using run, so I will want to get to at least a few examples here, so lets get to it.

### 1.1 - Simple no capture example

If I just simply want to run a command, and I do not want or need to capture the output of the command, then I can just call the run command and pass one argument that is a list of positional arguments including the name of the command. For example if I want to call the Linux ls command, for the current working folder, and in long list format, then I can pass a list with the first element being a string of the ls command, and then the second element can be the -l option.

```python
import subprocess
# to just run a command, but not capture output
subprocess.run(['ls', '-l'])
```

So this will work if I just simple want to run a command. However I should go over at least some of the options here. So lets look at at least a few more additional example beyond just a simple hello world style example of the subprocess run method.


### 1.2 - capture example 

If I want to capture the output of the external command then I will want to set the capture output argument to true. When I do so the returned value will contain a stdout value that will be the output of the command.

```python
import subprocess
# set capture_output to True to capture output
r=subprocess.run(['ls', '-l'], capture_output=True)
print(r.stdout)
```

## 2 - Async running of code, run, and a basic Popen example

The other main method of the subprocess library is the Popen method. This is the method that I will want to use when the run method falls short for one reason or another. So far it would seem that that main reason why I would want to use Popen is to make sure that some lengthly process that I want to run will not end up stalling the rest of my python code. So in this section I will be going over a run example, and then a Popen example that does more or less the same thing.

### 2.1 - A run example that helps to show what the problem is

First off another example of the run method. With this one I am using the Linux find command to find all javaScript files from the root namespace forward. This is a task that can end up taking some time, so often it will end up taking a few seconds. To make matters worse it would seem that any python code that I have after I call the run method will not run until the subprocess started with run completes. In some cases this might be what I want to happen actually, if additional code depends on the outcome of the process. However if that is not the case, or I want something to continue after starting the process this will present a problem then.

```python
import subprocess
 
print('foo');
def findFromFolder(f='/home', t=0.5):
    r=None
    try:
        r=subprocess.run(['find', '.',  '-name', '*.js'], cwd=f, timeout=t, capture_output=True)
    except (subprocess.TimeoutExpired):
        r='time out'
    return r
 
a=findFromFolder('/', 3)
print('bar');
 
if(type(a).__name__ == 'str'):
    print('mess:', a)
elif(type(a).__name__ == 'CompletedProcess'):
   print(a.stdout)
else:
   print(a)
```

### 2.2 - A Popen example

If I do not want a subprocess to stall the rest of my python code, then I am just going to have to use Popen in place of the run method. When I use Popen in place of run the subprocess will not stall the rest of my python code.

```python
import subprocess
 
print('foo');
def findFromFolder(folder='/home'):
    r=None
    try:
        r=subprocess.Popen(['find', '.', '-name', '*.js'], cwd=folder)
    except (subprocess.TimeoutExpired):
        r='time out'
    return r
 
a=findFromFolder('/')
print('bar');
 
if(type(a).__name__ == 'str'):
    print('mess:', a)
elif(type(a).__name__ == 'CompletedProcess'):
   print(a.stdout)
else:
   print(a)
```

## 3 - Conclusion

The subprocess library is then one of the first go to libraries when it comes to running an external command in a python environment. There are some other options, but I am not sure if I should even mention them here. From what I have gathered this is the library that should be used first and foremost.

It should go without saying that I should always take into account the types of operating systems that I will want my python code to run on. I often use a Linux system of one kind or another, and with that kind of os there are a number of commands that are likely always going to be there across different distros. However there are other Linux commands that I can not expect to be there to work with, and also when it comes to running python code on macOS and of course windows there might be completely different commands to work with.

If I get some more time I would like to expand this post with additional code examples, but as of this writing I am still somewhat new to programing with python. At some point I hope to start a few real examples, and then I am sure I will have some more to write about when it comes to using the subprocess standard library.