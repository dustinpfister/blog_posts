---
title: Linux ls command and listing contents of folders
date: 2020-10-14 12:56:00
tags: [linux]
layout: post
categories: linux
id: 723
updated: 2020-10-14 13:55:44
version: 1.2
---

The [Linux ls](https://www.thegeekdiary.com/basic-ls-command-examples-in-linux/) command is one of the first commands that a Linux user should be aware of when it comes to working in the command line. There is just knowing how to change the current working path, know what the current working path is, and also listing what is in a given path. So when it comes to listing what is in a given folder that is where the Linux ls comand will come into play.

There is much more to the Linux ls command beyond just listing what folders and files are in a given path location. There is listing hidden folders and files, and not doing so, there is listing file access permisions for a file, and there is not doing so. So there is not just typing the Linux ls command in and that is that, there are a few options that one should know about wheh it comes to Linux ls.

Also there is of course the limits of the linux ls command, it is not like Linux ls is the only option when it comes to getting lists of files in one or more paths. Theer are other commands such as the Linux find method, and also uisng Linux ls with other commands such as cat and grep to do a better job of finding what one might be looking for in a file system. SO lets get stared with the basics, and not so basics when it comes to using the Linux ls command.

<!-- more -->

## 1 - Get started with Linux ls

So for this example I will not just be covering a basic example of the Linux ls command, but a whole bunch of other basic commands that come up all the time when using bash. Here I am starting out by using the mkdir command to create a new folder called foo in the home path of the current user. I then use the cd command to make the current working path this folder that I just made. In this foo folder I am using the echo command and redirection to create a new file with the text _hello world_ with a file name called _hello.txt_.

I can not use the Linux ls command to list the contents of this folder by just calling the command without any additional argumnets if I just want to confirm that I have a single file in this foo folder called hello.txt, and sure enough I do. I can not use a command such as cat to print out the contents of this file that I just made and sure enough it is what I have cerated using the Linux echo command.

```
$ mkdir ~/foo
$ cd ~/foo
$ echo "hello world" > hello.txt
$ ls
hello.txt
$ cat hello.txt
hello world
```

So now we have the basic idea of the Linux ls command worked out. I have a folder with just a single file in it called hello.txt and when I use the Linux ls command I get that file listed in the standard output. However what about hidden files? Also is it not true that there is this thing called file access permisions? What about creating a list of files and then piping that to another command? Well with that all saidn maybe it is called for to look at least a few more examples of Linux ls.

## 2 - Show Hidden files

So it is possible to have hiddne files and folders inn a path, these folder and files names begin with a period. So if I use my echo and redirection trick to create anorther file but with a starting period in the file name such a file will be hidden. So if I just use the Linux ls command without any options of any kind the file will not show up.

```
$ echo "I hide things" > .hide.txt
$ ls
hello.txt
```

The hidden file that I just made will not show up. That is to be exspeced sense it is indeed a hidden file after all. STill there should be ways of listing everything that is in a folder. So lets look at some options for listing hidden files and folders.

### 2.1 - The list all option

So there is the list all option for the ls command that will list all contents for a folder, even folders such as dot and buibble dot that just mean the curremt folder, and up one folder.

```
$ ls -a
.  ..  hello.txt  .hide.txt
```

So this is a good option to be aware of, and I generaly always use it with the ls command to make sure that I am seeing everything there is in a folder. However what if I just want to list hidden files? Well regular expressions come to mind so lets look at least one more example on listing hidden files and folders with the Linux ls command.

### 2.2 - Use regular expressions

Another option for listing hidden files and folders in a path would be to get into using regular expressions. Learning a thing or two about regular expressions is not just a good idea for uisng the Linux ls command too, as all kinds of commands in Linux such as find and grep just to name a few also can make use of regularexpressions.

```
$ ls .[^.]*
.hide.txt
```
