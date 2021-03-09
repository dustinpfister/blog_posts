---
title: Sort lines of text in Linux with the sort command
date: 2021-03-09 11:15:00
tags: [linux,js]
layout: post
categories: linux
id: 819
updated: 2021-03-09 11:24:53
version: 1.1
---

The Linux sort command is a way to go about sorting lines of text by some kind of index value that is in each line. For example say i am using the Linux ps command to get a long list for each process running on a system, and I want that list sorted by how much memory each process is using, the Linux sort command can help me with that kind of task.

<!-- more -->

## 1 - Basic Linux sort examples using the Echo Command

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
