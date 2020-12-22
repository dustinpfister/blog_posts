---
title: The fileinput Standard Library in Python 
date: 2020-12-22 12:55:00
tags: [python]
categories: python
layout: post
id: 767
updated: 2020-12-22 14:00:18
version: 1.5
---

When learning a new programing language such as Python one thing that comes to mind that I like to learn about right away os how to go about reading from the standard input. When it comes to Python there is the [fileinput library](https://docs.python.org/3.7/library/fileinput.html) that can be used to read from the standard input, but can also be used as a way to read a collection of files also. There is one main function of interest in this libray when it comes to reading standard input and that would be the input method, by default it will read from the standard input if no file list is given.

There are some additional features of the fileinput library also though, on top of reading from the standard input the fileinput library can be used as a way to read a collection of files. Also there are some realted topics that come to mind when using the fileinput library such as piping in a posix system, the open built in function when it comes to reading just one file, and also the subprocess library when it comes to getting a collection of file names. So in this post I will of course be going over a basic example of reading from the standard input with the fileinput library, but will also be going over some more examples that touch base on other related python topics.

<!-- more -->

## 1 - Basic fileinput examples and the standard input

So first off I think I must go over some very basics when it comes to what the standard input is to begin with. In the process I might also have to at least mention some basic examples of piping also while I am at it, so lets get this out of the way.

I like Linux, and I also like Bash, and one great thing about bash is that I can do this thing called piping. That is that I can take the output of one command and pipe that output as the input of another command. For examle I can use a command like cat to read the contents of a file and then pipe the output of that file as the input of another command such as grep where I can look for text patterns. However there is also the echo command that can be used as another way of creating some basic input in the command line, to which I can then pipe to something like grep so maybe I should start off with that.

So The echo command can be used to just echo some text to the stndard output of a console liek this:

```
$ echo "hello this is SOME text"
hello this is SOME text
```

However what if I just want to get the text that fits a given pattern such as the pattern in the example text that is in all uppercase letters? To do that I can pipe the standard output to the grep command, and give grep a regular expression that will match an all uppercase pattern.

```
$ echo "hello this is SOME text" | grep -Eo '\b[[:upper:]]+\b'
SOME
```

So now that I have that out of the way there is the question of who to go about writitng my own commands in python where I can pipe things togethaer like this. When it comes to making something like echo in python that is simple enough as the print built in function is something that one will learn right away when getting started with python. However there is also knowing how to go about reading something that might have been passed by way of the standard input and for that theer is the fileinput library.

### 1.1 - Read the standard input in python with fileinput

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

### 1.2 - the is stdin method

```python
import fileinput
 
f = fileinput.input();
 
for line in f:
  print(line)
  print(f.filename()) # '<stdin>'
  print(f.isstdin()) # True
```

## 2 - The open built in function

```python
f=open('./hello.txt', 'r')
s=f.read()
print(s) # 'Hello World'
print(type(s).__name__) # 'str'
```

## 3 - Read more then one file

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

## 4 - Conclusion

