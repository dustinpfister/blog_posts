---
title: Linux Build Bash Script JavaScript Style
date: 2020-11-11 16:50:00
tags: [linux]
layout: post
categories: linux
id: 739
updated: 2020-11-11 17:42:03
version: 1.3
---

The [Linux cat](https://en.wikipedia.org/wiki/Cat_%28Unix%29) command is a way to concatanate two or more files into a single body that is then outputed to the standard output. In the event that no files are given then the standard input is what is used in place of a file. The cat command is also often used as a command for just opemning up a file and displaying the content of that file in the standard outout. The cat command like all other Linux commands can then also be used in conjunction with a whole host of other commands via pipeing. A single file can also be created from a whole bunch of other files also, by making use of redirection or piping to a programe that will act as a way to save the result to a file.

Like many otherLiunux command such as echo this is one of several basic commands that come up when it comes to getting a better understanding of how to work in a Linux amd bash enviorment. So it make sense to create a quick post on this command with a few examples of why it is thta this command is so usful in manly little cases.

<!-- more -->

## 1 - Basic Linux Cat example

To work out just some basic examples of Linux cat, and some other basic Linux features in the process maybe it would be best to start with a test folder at the home path. So I used the change director command to go to the home folder, and used mkdir to create a test folder called foo. In then chnaged the current working directory to foo, in this folder I am just using redirection and the echo command as a way to quickly create some test files in the command line.

The cat command can then be used as a way to concatanate files into a single output in the standard output of the console.

```
$ cd ~
$ mkdir foo
$ cd foo
$ echo -n "this is a file" > file1.txt
$ echo ", and this is another file" > file2.txt
$ cat file1.txt file2.txt
this is a file, and this is another file
```

## 2 - Of course redirection can be used to create a new file that is a concatanation of others

In the basic example I breefly covered redirection as a way to create files, by redirecting the output of the echo comamnd to a file. The same feature can also be used with cat as a way to create a new file that is a concatanation of two or more files.

```
$ echo -n "foo" > file1.txt
$ echo "bar" > file2.txt
$ cat file1.txt file2.txt > file3.txt
$ cat file3.txt
foobar
```

## 3 - A dash can be used as a way to set where the standard input should go along with files

So the cat command works by passing one or more file names as arguments, and the files will be concatanaded in the order in which they are recived. However the cat command can also be used with the standard output. If not file names are given then the cat comamnd will read from the standard input, but the standard input can also be used in combination of file name arguments also. When using a mix of argumnets and standard input a dash can be placed in the arguments as a way to set where it is that the standard input should go when concatanating.

```
$ echo -n "foo" > file1.txt
$ echo "bar" | cat file1.txt -
foobar
```