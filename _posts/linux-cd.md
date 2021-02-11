---
title: Linux change directory bash built in command
date: 2021-02-10 16:24:00
tags: [linux]
layout: post
categories: linux
id: 800
updated: 2021-02-11 12:00:10
version: 1.13
---

The [linux cd](https://www.tecmint.com/cd-command-in-linux/) command is what is used to change the current working directory when working in a terminal. The cd command is one of several bash built in commands that are actauly part of bash itself, and becuase bash is a major part of just about every linux os, as well as posix system in general, it is one of many commands that should be presant on just about any posix or unix like system that uses bash as the default shell.

To know the current working directory there is also the pwd command, which is yet another bash built in commnad. In this post I should also work with that command in a few exmples also. After all in order to know where you want to go it is also good to know where you are now, and also it is a good idea to have a way to confirm that you are indeed where you want to be.

The cd command is one of the first commands to become aware of when learning bash for the first time, and it is pretty easy to use, however there are still a few things to cover when it comes to using it. For example there is how to go about changing to a folder that has spaces in the name, and also how to quikly jump the the home folder of the current user. Still this should prove to be a fairly quick basic post though.

<!-- more -->

## 1 - Basic linux cd, and other basic command example

The cd command is a fairly simple command to learn how to use just type the command, and then an absolute or relative path to change the current working directory to. However there are al east a few other commands that I should at least cover to a certian degree in a basic getting started type section. For example there is also the pwd command that will show what the current working directory is, and the ls command that will list the contents of the current working folder. So in this section I wuill be going over some simple getting started examples of the cd command, but also some other closly related commands in the process of doing so.

### 1.1 - The cd and pwd commands

The linux cd command works by just typeing cd follwed by a path that I want to chnage two. There is giving and asbolute path by starting with a forward slash or using a relative path. More opn relative and absolute paths later, but for now there is just doing something like going to the etc folder, and knowing that the current working folder is the etc folder by typing pwd.

```
$ cd /etc
$ pwd
/etc
```

So there is the cd command for chanding to a folder, and there is the pwd command for knwoing what the current folder is.

### 1.2 - The cd and ls commands

So there is knowing how to change the current working directory, and then there is knowing how to find out what the current working directory is. I will not be getting into detail with every little detail with every little bash built in command, as well as the typical set of other commands in most posix systems such as Linux and Apple Darwin. However I think I should at least cover one simple little example of the ls command.

For example say I change the current working folder to the bin folder off of the root namespace.

```
$ cd /bin
$ ls -l b*
 -rwxr-xr-x 1 root root 925124 Apr 18  2019 bash
 -rwxr-xr-x 3 root root  26100 Jul 10  2019 bunzip2
 -rwxr-xr-x 1 root root 743212 Apr  1  2019 busybox
 -rwxr-xr-x 3 root root  26100 Jul 10  2019 bzcat
 lrwxrwxrwx 1 root root      6 Jul 10  2019 bzcmp -> bzdiff
 -rwxr-xr-x 1 root root   2227 Jul 10  2019 bzdiff
 lrwxrwxrwx 1 root root      6 Jul 10  2019 bzegrep -> bzgrep
 -rwxr-xr-x 1 root root   4877 Jun 24  2019 bzexe
 lrwxrwxrwx 1 root root      6 Jul 10  2019 bzfgrep -> bzgrep
 -rwxr-xr-x 1 root root   3641 Jul 10  2019 bzgrep
 -rwxr-xr-x 3 root root  26100 Jul 10  2019 bzip2
 -rwxr-xr-x 1 root root   9632 Jul 10  2019 bzip2recover
 lrwxrwxrwx 1 root root      6 Jul 10  2019 bzless -> bzmore
 -rwxr-xr-x 1 root root   1297 Jul 10  2019 bzmore
```

## 2 - Some additional examples

One might think that there is not much to write about when it comes to the cd command. For the most part that is true, just type the command and pass a single argument that is the folder that you want to change to. How much more can there be to it then that? Well there are a few little things here and there actually, so lets get to them.

### 2.1 - Folders with spaces in the name

One thing that I had to learn that comes up once in a while is how to go about changing to a folder that has spaces in the name. This can prove to be a problem becuase without knowing how it will result in passing more than one positional argument to cd. This can easily be fixed though by using quotes.

```
$ mkdir "./foo folder/"
$ cd "./foo folder/"
```

### 2.2 - switch the the parent folder

If I want to switch the the parent folder that is just one level below the current folder than I can just use two dots for the argument.

```
$ cd /usr/local
$ cd ..
$ pwd
/usr
```

### 2.3 - Absolute and relative paths

It is a good idea to know the diference between absolute and realtive paths

```
$ cd /home/pi
$ cd ..
$ cd pi
```

## 3 - The Linux cd command is a bash built in

As I have mentioned the cd command is a bash built in command. This can be confrimed with another usleful built in command called type.

```
$ type cd
cd is a shell builtin
```

## 4 - Conclusion

The linux cd command is one of many commands that are [built into the bash command](http://manpages.ubuntu.com/manpages/bionic/man7/bash-builtins.7.html). There are many other basic built in commands that a new linux user should be aware of, in this post I also covered the pwd command which is yet another bash built in command. Other bash built in commands that will come up often are echo, and test just to name a few. Many of these built in commands are also basic tools that are used to create bash scripts.
