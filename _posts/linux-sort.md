---
title: Sort lines of text in Linux with the sort command
date: 2021-03-09 11:15:00
tags: [linux,js]
layout: post
categories: linux
id: 819
updated: 2021-03-09 11:31:51
version: 1.2
---

The Linux sort command is a way to go about sorting lines of text by some kind of index value that is in each line. For example say i am using the Linux ps command to get a long list for each process running on a system, and I want that list sorted by how much memory each process is using, the Linux sort command can help me with that kind of task.



<!-- more -->

## 1 - Basic Linux sort examples using the Echo Command

I will be starting out with some basic examples of the Linux sort command using the Linux Echo command, and also some basic piping. If you are not familiar with the Linux echo command it is a basic command tool for just creating some standard output from the command line that I can then pipe to the standard input of another command, such as the Linux sort command.

The Linuc echo command is one of the first commands that a new Linux user should be aware of when it comes to learning a thing or two about bash, along with commands such as cd, ls, and so forth. I Will not be getting into the echo command in detail here as I have wrote a post on it. You should also know a thing or two about piping in Linux also, which is another topic that Linux users should get up to speed right away if they have not done so all ready.

So then if you have a basic working knowledge of echo and piping the focus here will be more so on the sort command then. Echo is just a good command for generating some basic test output to pipe to the sort command.

### 1.1 - Just using sort by itself

```
$ echo -e "2 \n7 \n8 \n3 \n5 \n9 \n1 \n6 \n0 \n4" | sort
```

### 1.2 - Using the key option

```
$ echo -e "0 42 \n1 17 \n2 9 \n3 100" | sort -k 2
```

## 2 - ps command example

```
$ ps -e -o pcpu,pid,comm | sort -k 1
```

## 3 - Conclusion

The sort command then is one of several commands that I can think of that are often used together with other commands when piping things together. There is using a command like ps. or ls to end up with a long list of something and then piping it to grep to filter things down into a sorter list. However there is then piping the output once again to something that I can use to sort the results, and for that there is the sort command that seems to worm well for what I would often use if for when it comes to working out bash scripts and so forth.
