---
title: Linux awk command for text processing
date: 2021-07-02 08:43:00
tags: [linux]
layout: post
categories: linux
id: 902
updated: 2021-07-02 10:02:14
version: 1.2
---

The Linux awk command is another command like that of grep as it would seem that it is mainly used for text pattern matching tasks. However it would also seem that awk is more or less a full programing language also, although I can not say that this is a language that is widely uses these days. The pattern matching and replacement tasks that are typically done with awk can also be done with other Linux commands such as grep, and also such tasks and much more can be done with more modern scripting languages such as nodejs, and python. Still I thought that I would take a moment to come up with a few hello world type examples of awk, and write a quick post on this subject, as well as maybe a few more examples that have to do with pattern matching, and working with text in general in a Linux system.

<!-- more -->

# Basic Linux awk command

```
$ echo -en "text output \nsample text \n" | awk '{print $1}'
```

## 2 - Match static pattern

```
$ echo -en "text output \nsample text \n" | awk '/output/ {print}'
```

## 3 - Match only digits of each line

```
$ echo -en "abc hhh\n123 fgh\nxdf\nzxy 456" | awk 'match($0,/[0-9]+/) {print substr($0,RSTART,RLENGTH)}'
```

