---
title: The OS library in Python
date: 2021-01-06 13:26:00
tags: [python]
categories: python
layout: post
id: 776
updated: 2021-07-09 12:49:50
version: 1.24
---

The [os standard library](https://docs.python.org/3/library/os.html) in python is a library that contains some operating system dependent functionality. There are a few other libraries that come to mind that can also be used as a way to make use of operating system dependent features. For example the subprocess library can be used to call a command on the host operating system, but before doing so it helps to know what operating system you are working with first. So the os standard library is a good staring point when it comes to checking out what kind of system my code might be running on top of.

On top of basic functions and properties to find out what kind of operating system python is running on there are also a number of functions and methods that have to do with paths, and basic file io. The file io features are not a replacement for the open built in function which is what I would be more interested in using for most basic examples and projects anyway. If for some reason I want or need to do file io by way of getting a file descriptor first, and then passing that file descriptor to a function to open a file object, and more with file io in a more professional way, then the file io methods in the os library can be used to do that kind of file io.

<!-- more -->

## 1 - Some core features of interest in the os module

There are a great number of functions in the os library, but there are only really a few that are often actually used in a project. In this section I will just be going over some of the basic features of the module that I actually find myself using in code projects so far. If you want to know everything there is always the official documentation on the os library that covers every little function in the library.

### 1.1 - Get the current working dir, and change the current working dir

Two useful methods in the os library are the os.getcwd function, and the os.chdir function. These basic functions can be used to get, and change the current working directory.

```python
import os
 
os.chdir('/home') 
print(os.getcwd()) # '/home'
 
os.chdir('..')
print(os.getcwd()) # '/'
```

### 1.2 - The name property and uname function

One basic feature of the os library should of course be a feature to help get an idea of what operating system I might be dealing with to begin with. For this there is the name property, this might not be the best way to go about getting a detailed idea of what kind of system there is to work with, but it sure is a good starting point at least. The main problem with the name property is that there are only three possible values for the name property which are posix, nt, and java. This might not give all the information that one might need, but generally there are only two kinds of systems that people use which are a late version of Windows \( all of which are NT based these days as the old 9.x platforms are long dead \) or some kind of posix system usually Apple Darwin AKA Mac OS, or in some cases some kind of Linux system such as Raspberry PI OS, Fedora, ect.

If more detailed information is needed such as the version of the system, or a more specific name of the OS, there is also the os.uname method. This would seem to work more or less the same way as the [Linux uname](/2021/07/08/linux-uname/) command when is one way to go about getting detailed info of a Linux system, and I assume most other posix systems.

```python
import os
 
print(os.name) # posix, nt, or java
 
# the uname method can be used to get a
# better idea of the kind of system that is being used
# with things like kernal name, kernal version, and
# system arch.
uname=os.uname()
l=list(uname)
print( l[0] ) # Linux
print( l[2] ) # 5.4.79-v7+
print( l[4] ) # armv7l
```

### 1.3 - Get env

Another thing about an operating system environment that comes to mind is being able to get at any environment variables that there might be to work with. When deploying an application for example a password to a database might only be accessible by way of an environment variable when running a script. So there should be a way in a programing environment to get such a variable, so in the os library here there is the get env method that can be used to get the status of such variables.

```python
import os
 
print(os.getenv("SHELL")) # '/bin/bash' (or whatever shell might be used)
 
# will return None of the env is not there
print(os.getenv("NOT_HERE"))  # None
```

### 1.4 - Get the current process id

I will not be going over all of these little methods, but I thin one more that I should mention is the method that can be used to get the current process id.

```python
import os
 
print(os.getpid()) # 7659
```

There are a number of other functions in the os library that have to do with getting information about the current running process, and also how to go about stopping the current process. However the os library might not always be the best option for killing the current process. There is also the sys library that should also be check out when it comes to killing the current process.

However if I really want to kill the current process with the os library alone it might be best to use the os.kill function and in order to use that I need a process id to give it first. So then this function can be used to give me the process id to give the such a function.

## 2 - The open built in function, os.open, and os.fdopen

When it comes to opening a file and reading and writing the contents it might be best to just use the open built in function. This function makes opening, reading, writing, and creating files easy. The open built in function will wrap a file descriptor, and it will also directly return a file object that can be used to quickly and easily read and edit a file.

However in some cases I might need to do something involving opening just a file descriptor first, and then passing that file descriptor to another function that will return a file object. In any case in this section I will be quickly going over the open built in function, as well as some of the other functions in the os library that have to do with opening a file.

### 2.1 - The open built in function

The open built in function is one way to go about quickly and easily opening a file, and start writing to it.

```python
f=open('foo.txt', 'w')
 
f.write('hello world');
 
print(f.fileno()) # the file no
 
f.close()
```

### 2.2 - os.open, and os.fdopen

In the os library there is the os.open function that WILL NOT return a file object like the built in open function.

```python
import os
 
fd=os.open('foo.txt', os.O_RDWR|os.O_CREAT)
f=os.fdopen(fd, 'w+')
 
f.write('Okay now');
 
print(fd) # the file no
print(f) # the file object
 
f.close()
```

## 3 - Replacing the current process with a new program

There are also a number of functions in the os library that can be used to start a new program, and replace the current process id with that program.

```python
import os
os.chdir('/home/pi')
os.execlp('ls', '*')
```

The os library is not the begging and end of this sort of thing with python though. When it comes to running other scripts and commands from a python script there is also the subprocess module.

## 4 - Get path of current script example

One use case example that I have found thus far where I need to use the os library is to get the path of a current script. The solution that I have found that works best thus far seems to be one that involves using the os library in addition to the sys and inspect libraries to do so.

```python
import os,sys,inspect
dir_current = os.getcwd()
dir_script = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
dir_parent = os.path.dirname(dir_script)
 
# insert dir_parent
sys.path.insert(0, dir_parent)
 
print(dir_current)
print(dir_script)
print(dir_parent)
```

When I start working on some real python projects it would seem that this is some code that I will have to have at the top of each of my files in order to get all the dirs that I typically want.

In nodejs there is the \_\_dirname variable that I can use to quickly get the path of the current file, thus far it would seem there there is no special variable in python, at least there is no such variable thatI know off. In the event that I find such a variable hopefully I will remember to edit this post. For now it would seem that this is what I need to do in order to get the all the usual directories that I need to know when working on a real project of some kind.

## 5 - conclusion

That is it for now when it comes to the os library in python. As of this writing I am still fairly new to python so I will need to work out at least a few real examples when it comes to python to really get an idea of what is important when it comes to using the os library to get something done. So far there seems to be mainly the functions that are used to get and set the current working directory, as well as to work with paths. 
