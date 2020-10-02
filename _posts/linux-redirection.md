---
title: Linux redurection of standard output to a file
date: 2020-10-02 13:15:00
tags: [linux]
layout: post
categories: linux
id: 714
updated: 2020-10-02 14:06:22
version: 1.3
---

One thing that comes up for me often when working something out with one or more Linux commands is to have a way to write the standard output of what happens to a file rather than the console window. I guess if I wanted to I could just copy and paste the output to a text editor, but there must be a more professional way to do it in the command line right? When it comes to piping I guess I could pipe the output alone to a text editor, but there is another option called [linux redirection](https://en.wikipedia.org/wiki/Redirection_%28computing%29). So in this post I will be writing a thing or two about redirection in linux and how it can be used with, or as a replacement to a linux pipeline of two or more commands.

<!-- more -->

## 1 - Basic Linux redirection of standard output using echo

So for thi section I will be starting out with redirection and the echo command to just start out with the very basic of what redirection is all about. If you are not familiar with the echo command it is just a way to spit out text that I give via the command line as the output to the standard output of the console. This nature of the linux echo command makes it a good command for working out very basic stuff with commands before moving on to something that actually solves a problem that I am having.

### 1.1 - Using echo to redirect to a file that will be created or written over

So to just simple redirect the text foo for example to a file rather than the standard output I just need to use a greater than symbol once between the command and then a path to the file that I want to create or write over again.

```
$ echo 'foo' > ~/foo.txt
```

So then this is the basic idea of what redirection is I take the standard output and have it stored in a file in my home path rather than the standard output. With something like this if the file is not there it will be created, and if it is there the text foo will replace anything else that might be there.

### 1.1 - appedning to a file

Sometimes I might want to append what is in a file rather than just write over the file. To append I just need to use two greater than symbols rather than just one.

```
$ echo 'foo' >> ~/foo.txt
```

## 2 - Linux grep example using redirection

Here is a real example that involves using linux grep to create a list of blog post id numbers. That is I have a whole bunch of markdown files that have id numbers at the top of each file, and I want a list of file names and id numbers. I use tghe linux grep command to create the list that I want, but now I need a way to save that list to a file rather than just have it in the console window. So one way to go about doing this would be to use linux redirection.

```
$ grep '^id: [0-9]*' *.md > ~/post_id.txt
```