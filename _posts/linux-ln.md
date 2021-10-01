---
title: The Linux ln command for creating soft and hard links to files and folders
date: 2021-10-01 06:37:00
tags: [linux]
layout: post
categories: linux
id: 931
updated: 2021-10-01 11:13:57
version: 1.4
---

In todays post on Linux commands I will be going over a few quick examples of the Linux ln command that is used to create soft and hard links to files and folders in a Linux system.

<!-- more -->

## 1 - Soft or Symbolic links using the Linux ln command

Although the default is hard links actually it might be a good idea to start out with soft links. The main difference between soft links and hard links is that a soft link will just store a location to a file, and not a link to the actual data. So then when a source file is deleted that will in turn effect the soft link as the resource is no longer there. More on this when it comes to getting into hard links but for now lets just start out with this simple kind of link.

### 1.1 - basic soft link example

First off here is a basic example of making a soft link to a text file. I start out by using the cd command to change the current working folder to the home folder of the current user as that is one place where it is okay to create temporary files for any user. Anyway the next step might be to create some kind of simple test file to just serve as a resource to create a soft link to, in this case I am using the linux echo command combined with redirection to quickly create such a file from the command line.

Now that I am in a place to create resources and links, and I have something to link to, I can now go ahead and create a link. So now I call the ln command and make sure to pass the -s option to indicated that I want to make a soft link to a file. The next position parameter to give is the path to the resource that I want to link to in this case the foo.txt file that is in the same location as this link I am making. After that I given a name for the symbolic or soft link if you prefer in this case I went with fooLink.

```
$ cd ~
$ echo "hello world" > foo.txt
$ ln -s foo.txt fooLink
$ cat fooLink
hello world
$ rm fooLink
$ rm foo.txt
```

### 1.2 - list

```
#/bin/bash
 
echo "hello world" > foo.txt
ln -s foo.txt fooLink
ls -la | grep "\->"
# lrwxrwxrwx 1 pi pi    7 Sep 25 10:50 fooLink -> foo.txt
 
# clean up
rm fooLink
rm foo.txt
 
```

### 1.3 - test

```
#/bin/bash

echo "hello world" > foo.txt
ln -s foo.txt fooLink
 
test -h foo.txt; echo $?
#1
test -h fooLink; echo $?
#0
 
# clean up
rm fooLink
rm foo.txt
```

## 2 - Hard Links using Linux ln

### 2.1

```
#/bin/bash
 
echo "hello world" > foo.txt
ln foo.txt fooLink
rm foo.txt
cat fooLink
#hello world
 
# clean up
rm fooLink
```

## 3 - The force option

### 3.1 -

```
#/bin/bash
 
echo "hello world" > foo.txt
echo "hello other World" > foo2.txt
 
ln -s foo.txt fooLink
cat fooLink
#hello world
ln -sf foo2.txt fooLink
cat fooLink
 
# clean up
rm fooLink
rm foo.txt
rm foo2.txt
```

## 4 - Conclusion

