---
title: Sort lines of text in Linux with the sort command
date: 2021-03-09 11:15:00
tags: [linux,js]
layout: post
categories: linux
id: 819
updated: 2021-03-09 11:56:19
version: 1.7
---

The [Linux sort](https://man7.org/linux/man-pages/man1/sort.1.html) command is a way to go about sorting lines of text by some kind of index value that is in each line. For example say I am using the Linux ps command to get a long list for each process running on a system, and I want that list sorted by how much memory each process is using, the Linux sort command can help me with that kind of task.

So to use the Linux sort command first I need some output that I can pipe into the Linux sort command. This output can be from a command like the ps command, ls command, and so forth. In addition it can also be some text in a file that I can open with something like the cat command and pipe to the Linux sort command. In any case the text does need to be in a Linux friendly format where each field is separated by a space, and each line is terminated with a line feed. Most Linux commands do this to begin with, however in some cases the output might have to be formated for sort first.

<!-- more -->

## 1 - Basic Linux sort examples using the Echo Command

I will be starting out with some basic examples of the Linux sort command using the Linux Echo command, and also some basic piping. If you are not familiar with the Linux echo command it is a basic command tool for just creating some standard output from the command line that I can then pipe to the standard input of another command, such as the Linux sort command.

The Linux echo command is one of the first commands that a new Linux user should be aware of when it comes to learning a thing or two about bash, along with commands such as cd, ls, and so forth. I Will not be getting into the echo command in detail here as I have wrote a post on it. You should also know a thing or two about piping in Linux also, which is another topic that Linux users should get up to speed right away if they have not done so all ready.

So then if you have a basic working knowledge of echo and piping the focus here will be more so on the sort command then. Echo is just a good command for generating some basic test output to pipe to the sort command.

### 1.1 - Just using sort by itself

If I want to i can just use the Linux sort command by itself without any options. doing so will work just fine actually if it just so happens that it is the first field of each line that I want to sort by. With the Linux echo command I can create some standard output that is just a bunch of lines of numbers each of which end with a line feed by using the -e option and the /\n syntax to create the line feeds. If I then pipe this standard output to the Linux sort command the result will be those lines of numbers sorted by the value of each number.

```
$ echo -e "2 \n7 \n8 \n3 \n5 \n9 \n1 \n6 \n0 \n4" | sort
0
1
2
3
4
5
6
7
8
9
```

So then there you have the basic idea of the Linux sort command for what it is worth. However there is a bit more to cover when it comes to lines of output where there is another field or key of interest that I want to sort by, there is also how to go about sorting by names rather than numbers, how to go about reversion the order of the sort, and so on. So maybe at least a few more basic examples that make use of the echo command are called for.

### 1.2 - Using the key option

So then say that I have some output where there is more than one field or key per line separated by whitespace for each key. By default the sort command will sort by the first key in such lines, but what if i want to sort by another key? For this there is the -k option of sort. I just type the option followed by a number from 1 upwared where 1 is the first key, 2 is the second key, and so forth.

```
$ echo -e "0 42 \n1 17 \n2 9 \n3 100" | sort -k 2
```

## 2 - ps command example

```
$ ps -e -o pcpu,pid,comm | sort -k 1
```

## 3 - Conclusion

The sort command then is one of several commands that I can think of that are often used together with other commands when piping things together. There is using a command like ps. or ls to end up with a long list of something and then piping it to grep to filter things down into a sorter list. However there is then piping the output once again to something that I can use to sort the results, and for that there is the sort command that seems to worm well for what I would often use if for when it comes to working out bash scripts and so forth.
