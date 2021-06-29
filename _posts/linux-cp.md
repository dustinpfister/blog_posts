---
title: Copying files in Linux with the cp command
date: 2021-06-29 11:46:00
tags: [linux]
layout: post
categories: linux
id: 899
updated: 2021-06-29 12:00:51
version: 1.1
---

The [Linux cp](https://man7.org/linux/man-pages/man1/cp.1.html) command can be used to copy files from one folder to another, and for the most part it is just a question of setting the source path as the first options, and the target name as the second option. However there are a number of things that might come up when copying files in the command line, or when creating a bash script to automate some work. For example one might also need to copy a whole bunch of files in a folder recursively, or create a folder in the event that it is not there to begin with. So it would make sense to look into what the options are with the cp command, and also become aware of other useful options in other commands that can be used such as the mkdir command with the -p option.

<!-- more -->


## 1 - Basic example of the Linux cp command

```
$ echo -n "foobar" > foo.txt
$ cp foo.txt "./foo_copy.txt"
```

## 2 - Use mkdir -p to create a target folder if it is not there to begin with

```
$ echo -n "foobar" > foo.txt
$ mkdir -p './copy' && cp foo.txt "./copy/foo_copy.txt"
```

## 3 - Copy files recursivly

```
mkdir -p "./text/foo"
echo -n "foobar" > "./text/foo/foo1.txt"
echo -n "foobar" > "./text/foo/foo2.txt"
echo -n "foobar" > "./text/bar1.txt"
cp -r "text" "text_copy"
```

## 4 - Conclusion

