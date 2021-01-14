---
title: The Subprocess Library in python
date: 2021-01-13 16:24:00
tags: [python]
categories: python
layout: post
id: 780
updated: 2021-01-14 13:26:41
version: 1.7
---

When learning a new programing enviorment one thing that I like to learn how to do is how to go about launching another script, or command complatly in the operating system if I can do so. In nodejs there is the child process module for example that provides methods that can be used to run a command, so there should be such a module in python also then. It would seem that the best option for doing so might be the [subprocess librray](https://docs.python.org/3.7/library/subprocess.html) that contains such methods. There are some other options when it comes to running external commands, butthe other built in options are older solutions that are still there mainly so older code does not break.

For this post then I will be going over some basic examples of the subprocess module then.

<!-- more -->

## 1 - The run method

The run method of the subprocess library should be the first go to option for most situstions in which I want to run an external command. It will not work great for all use case examples though, for that there is the Popen method that I will be getting to in a later section.

For any external command that should not take long the run method should work okay, however one thing that I have noticed is that the use of this command will pause exacutition of additional python code once I call the run method. So if I need to do seomthing that might take a real long time, and I want the rest of the script to continue, then I might want to use pOpen in place of run. However the run command is still a good starting point, and it should generally be used first before moving on to Popen when needed.

There are a few argumnets that I should get to when it comes to using run, so I will want to get to at least a few examples here, so lets get to it.

### 1.1 - Simple no capture example

If I just simply want to run a command, and I do not want or need to capture the output of the command, then I can just call the run command and pass one argument that is a list of positional arguments including the name of the command. For example if I want to call the linux ls command, for the current working folder, and in long list format, then I can pass a list with the first element being a string of the ls command, and then the second element can be the -l option.

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

The other main method of the subprocess librray is the Popen method. This is the method that I will want to use when the run method falls short for one reason or another. So far it would seem that that main reason why I would want to use Popen is to make sure that some lengthly process that I want to run will not end up stalling the rest of my python code. So in this section I will be going over a run example, and then a Popen example that does more or less the same thing.

### 2.1 - A run example

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

The subprocess librrays is then one of the first go to librrays when it comes to running an external command in a python enviorment. There are some other options, but I am not sure if I should even mention them here. From what I have gathered this is the library that should be used first and formost.