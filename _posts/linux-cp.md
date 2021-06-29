---
title: Copying files in Linux with the cp command
date: 2021-06-29 11:46:00
tags: [linux]
layout: post
categories: linux
id: 899
updated: 2021-06-29 12:11:06
version: 1.5
---

The [Linux cp](https://man7.org/linux/man-pages/man1/cp.1.html) command can be used to copy files from one folder to another, and for the most part it is just a question of setting the source path as the first options, and the target name as the second option. However there are a number of things that might come up when copying files in the command line, or when creating a bash script to automate some work. For example one might also need to copy a whole bunch of files in a folder recursively, or create a folder in the event that it is not there to begin with. So it would make sense to look into what the options are with the cp command, and also become aware of other useful options in other commands that can be used such as the mkdir command with the -p option.

<!-- more -->


## 1 - Basic example of the Linux cp command

In order to use the Linux cp command to copy one or more source files I am going to need, well one or more source files. For a quick way to go about creating some source content for the sake of just testing out the Linux cp command I am going to make use of the [Linux echo](/2019/08/15/linux-echo/) command, and [bash redirection](/2020/10/02/linux-redirection/). The echo command is a way to go about creating some standard output from the command line, and redirection is a way to go about saving that standard output to a file. I then have my source file that I can then copy using the Linux cp command.

```
$ echo -n "foobar" > foo.txt
$ cp foo.txt "./foo_copy.txt"
```

## 2 - Use mkdir -p to create a target folder if it is not there to begin with

In some case I might want to [create a nested target folder in the event that it is not there to begin with](https://stackoverflow.com/questions/1529946/linux-copy-and-create-destination-dir-if-it-does-not-exist) when copying some files. It would seem that there is no such option to do so with the cp command. However in just about every Linux system there should be the mkdir command also which can be used with the -p option.

```
$ echo -n "foobar" > foo.txt
$ mkdir -p './copy' && cp foo.txt "./copy/foo_copy.txt"
```

## 3 - Copy files recursively

To copy a whole folder recursively I will just need to use the -r option of the Linux cp command.

```
mkdir -p "./text/foo"
echo -n "foobar" > "./text/foo/foo1.txt"
echo -n "foobar" > "./text/foo/foo2.txt"
echo -n "foobar" > "./text/bar1.txt"
cp -r "text" "text_copy"
```

## 4 - Conclusion

