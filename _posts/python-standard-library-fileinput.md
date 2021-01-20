---
title: The fileinput Standard Library in Python 
date: 2020-12-22 12:55:00
tags: [python]
categories: python
layout: post
id: 767
updated: 2021-01-20 14:01:47
version: 1.19
---

When learning a new programing language such as Python one thing that comes to mind that I like to learn about right away os how to go about reading from the standard input. When it comes to Python there is the [fileinput library](https://docs.python.org/3.7/library/fileinput.html) that can be used to read from the standard input, but can also be used as a way to read a collection of files also. There is one main function of interest in this library when it comes to reading standard input and that would be the input method, by default it will read from the standard input if no file list is given.

There are some additional features of the fileinput library also though, on top of reading from the standard input the fileinput library can be used as a way to read a collection of files. Also there are some related topics that come to mind when using the fileinput library such as piping in a posix system, the open built in function when it comes to reading just one file, and also the subprocess library when it comes to getting a collection of file names. So in this post I will of course be going over a basic example of reading from the standard input with the fileinput library, but will also be going over some more examples that touch base on other related python topics.

<!-- more -->

## 1 - Basic fileinput examples and the standard input

So first off I think I must go over some very basics when it comes to what the standard input is to begin with. In the process I might also have to at least mention some basic examples of piping also while I am at it, so lets get this out of the way.

I like Linux, and I also like Bash, and one great thing about bash is that I can do this thing called piping. That is that I can take the output of one command and pipe that output as the input of another command. For example I can use a command like cat to read the contents of a file and then pipe the output of that file as the input of another command such as grep where I can look for text patterns. However there is also the echo command that can be used as another way of creating some basic input in the command line, to which I can then pipe to something like grep so maybe I should start off with that.

So The echo command can be used to just echo some text to the standard output of a console like this:

```
$ echo "hello this is SOME text"
hello this is SOME text
```

However what if I just want to get the text that fits a given pattern such as the pattern in the example text that is in all uppercase letters? To do that I can pipe the standard output to the grep command, and give grep a regular expression that will match an all uppercase pattern.

```
$ echo "hello this is SOME text" | grep -Eo '\b[[:upper:]]+\b'
SOME
```

So now that I have that out of the way there is the question of who to go about writing my own commands in python where I can pipe things together like this. When it comes to making something like echo in python that is simple enough as the print built in function is something that one will learn right away when getting started with python. However there is also knowing how to go about reading something that might have been passed by way of the standard input and for that there is the fileinput library.

### 1.1 - Using print to create some standard output

So when it comes to creating standard output in python there is just using the print built in function. There might be a few things to pint out when it comes to using this method, but for the most part I just need to pass it a value and what is passed will become the standard output for a script.

```python
print('1 2 3 4 5 6')
```

So that is more or less the python equivalent of the echo command, however now I should move on to how to go about reading that from a python script when it comes to piping.

### 1.1 - Read the standard input in python with fileinput

To read from the standard input I just need to use the input method of the fileinput library. There are a number of parameters for this method, however if I just want to read from the standard input I can just call the method.

```python
import fileinput
 
for line in fileinput.input():
    print(line)
    pass
```

```
$ echo -n 'foo' | python basic.py
foo
$
```

### 1.2 - methods to work with off of an instnace of input

There are a number of functions that can be called off of an instance of the input method. Some good examples of this would be the filename function, and the is stdin function. When it comes to just reading from the standard input alone the is stdin function is not really needed, however in some situations I might need to find out of that is the case or not.

```python
import fileinput
 
f = fileinput.input();
 
for line in f:
  print(line)
  print(f.filename()) # '<stdin>'
  print(f.isstdin()) # True
```

## 2 - The open built in function

Another function of the input function of the fileinput standard library is to read the contents of a collection of files. The function can also be used to read just one file, however it is always important to look at what there is to work with when it comes to built in functions in python first. One built in function that is of interest when it comes to reading a file is the open function. If I want to open and read the contents of just one file then this function works just fine, and the fileinput library is not really a replacement for this function.

```python
f=open('./hello.txt', 'r')
s=f.read()
print(s) # 'Hello World'
print(type(s).__name__) # 'str'
```

## 3 - Read more then one file

So when it comes to just working with one file there is the open function that will work just fine. However the other feature of the input function is that it is a good choice when it comes to working with a collection of files.

I can set the value of a files parameter of the input function to a list of paths to files. I can then loop over all the lines of all of the files.

```python
import fileinput

fileList=['./files/file-1.txt','./files/file-2.txt','./files/file-3.txt']
files=fileinput.input(files=fileList)
for line in files:
    print(line)
    print(files.filename())
    print(files.isstdin())
    print('')
    pass
 
# $ echo -n 'foo' | python basic.py
# 'foo'
# $
```

## 4 - Basic piping example

So now that I have the very basics of generating standard output, as well as reading standard output in python, I should be able to come up with at least a basic example of why this is very useful.

### 4.1 - The gen nums script

So here I have a basic script that will just spit out a range of numbers.

```python
r=range(0,10)
for n in r:
  print(n, end=' ')
```

### 4.2 - The read nums script

Now I want to write another python example that will do something with the output of the script that generates a range of numbers.

```python
import fileinput
 
f=fileinput.input()
 
def powIt(n):
  if(n == ''):
      return 0
  return pow(2, int(n))
 
for line in f:
  l=list(line.split(' '))
  p=map(powIt, l)
  print(list(p))
```

```
$ python3 nums-gen.py | python3 nums-read.py
[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 0]
```

So this might not be the best example of this, but you should get the basic idea. Often people might aim to make one big program, however it is often a good idea to break that one big program into many small programs.

## 5 - Conclusion

So the fileinput library is the library that I will want to use when it comes to reading the contents of the standard input in a python script. However the function has some other uses on top of just reading the standard input. Another common task that I find myself running into a lot is having to work with a large collection of files. Fort example this post that you are reading right now is just one of many that all exist as markdown files. Often I might want to writing some kind of script that will loop over all of the files and do something like add up a grand total website word count total for example. So on top of just being a library for reading the standard input this is also a good modules for working with a collection of files.
