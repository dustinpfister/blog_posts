---
title: Linux awk command for text processing
date: 2021-07-02 08:43:00
tags: [linux]
layout: post
categories: linux
id: 902
updated: 2021-07-02 10:27:09
version: 1.9
---

The [Linux awk](https://en.wikipedia.org/wiki/AWK) command is another command like that of grep as it would seem that it is mainly used for text pattern matching tasks. However it would also seem that awk is more or less a full programing language also, although I can not say that this is a language that is widely uses these days. The pattern matching and replacement tasks that are typically done with awk can also be done with other Linux commands such as grep, and also such tasks and much more can be done with more modern scripting languages such as nodejs, and python. Still I thought that I would take a moment to come up with a few hello world type examples of awk, and write a quick post on this subject, as well as maybe a few more examples that have to do with pattern matching, and working with text in general in a Linux system.

<!-- more -->

# 1 - Basic Linux awk command

For a basic example of the awk command I will be using the [Linux echo](/2019/08/15/linux-echo/) command as a way to create some standard output to which I can then pipe into the standard input of awk. This text that I am piping into awk is two lines, and I am just using awk to print the first word of each line.

```
$ echo -en "text output \nsample text \n" | awk '{print $1}'
text
sample
```

## 2 - Match static pattern

Typically what I would want to do with awk is to filter out all lines except lines that contain some kind of pattern. In this example I am looking for a fixed static text pattern.

```
$ echo -en "text output \nsample text \n" | awk '/output/ {print}'
text output
```

## 3 - Match only digits of each line

So I covered an example where I am printing lines that contain a given pattern, but what if I just want to have the text of the match rather than the full line.

```
$ echo -en "abc hhh\n123 fgh\nxdf\nzxy 456" | awk 'match($0,/[0-9]+/) {print substr($0,RSTART,RLENGTH)}'
123
456
```

## 4 - Conclusion

I am not sure if I really want to get into learning awk in detail when it comes to every little function, and feature of the language though. Although it is true that awk is there to work with in just about any Linux system, typically I can install and work with a more modern scripting language such as javaScript, or Python, and the kind of tasks that I would typically do with awk can of course be done with those languages.
