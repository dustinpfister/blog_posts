---
title: Linux redurection of standard output to a file
date: 2020-10-02 13:15:00
tags: [linux]
layout: post
categories: linux
id: 714
updated: 2020-10-02 13:48:14
version: 1.1
---

One thing that comes up for me often when working something out with one or more Linux commands is to have a way to write the standard output of what happens to a file rather than the console window. I guess if I wanted to I could just copy and paste the output to a text editor, but there must be a more profesional way to do it in the command line right? When it comes to piping I guess I could pipe the output alone to a text editor, but there is another option called [linux redirection](https://en.wikipedia.org/wiki/Redirection_%28computing%29). So in this post I will be writing a thing or two about redirection in linux and how it can be used with, or as a replacement to a linux pipeline of two or more commands.

<!-- more -->

## 2 - Linux grep example

Here is a real example that involves using grep to create a list of blog post id numbers.

```
$ grep '^id: [0-9]*' *.md > ~/post_id.txt
```