---
title: Linux basename command to get just the file name of a path
date: 2021-07-07 12:54:00
tags: [linux]
layout: post
categories: linux
id: 905
updated: 2021-07-07 13:22:45
version: 1.8
---

When working out a bash script I might want to get just the base name of a path to a file or folder, one way to do so might be to use the [linux cut](/2020/11/19/linux-cut/) command, but there is also the [linux basename](https://www.geeksforgeeks.org/basename-command-in-linux-with-examples/) command that can be used for this task. The command works by passing a single argument to the command that should be a string value of a path to a file, the result that will be spit out to the standard output will then just be the base name of the path. So then this is a fairly basic command, but when it comes to writing bash scripts, or using it in conjunction with other scripts things might get a little confusing. So I thought I would write a quick post on this command, and also a few other commands that might end up being used in conjunction with it. Also there is making mentioning of some alternatives to using the basename command such as the linux cut command, and tools that there are to work with in programing environments such as the [path module in nodejs](/2017/12/27/nodejs-paths/).


<!-- more -->

## 1 - Basic example of the Linux basename command

To start of with there is just calling the name name and typing in the path to a file as the first and only argument to the command. The result that will be spit out to the standard output of the command line should just then be the base name of the path and nothing more. So if I give an absolute path to a text file, then the result will just be the name of the text file with the file extension.

```
$ basename /foo/bar/baz.txt
baz.txt
```

So that is all fine and good, but when it comes to some kind of real use case example I am going to want to feed the path to the file to the base name command from the output of another command, a shell or environment variable, or some other kind of data from a file or something to that effect. So I think some additional examples are called for here.

## 2 - Piping a url to the basename command with xargs

So now when it comes to getting into using the basename command with other commands this is a good time to write about another very useful command called xargs. Most of the time I can pipe something into a command from the standard output of another command, but it would seem that I can not do that with the basename command.

```
$ echo /foo/bar/baz.txt | xargs basename
baz.txt
```

## 3 - Using the find command with exec option

```
$ find /usr/lib/nodejs -name "*.js" -exec basename {} ';'
```