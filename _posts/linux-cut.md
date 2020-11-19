---
title: The Linux Cut command for cutting a string in bash
date: 2020-11-19 12:19:00
tags: [linux]
layout: post
categories: linux
id: 745
updated: 2020-11-19 12:36:28
version: 1.1
---

The [Linux cut](https://linuxize.com/post/linux-cut-command/) command is the standard tool for cutting a string into one or more sub strings. The first and for most way of using cut as I see it at least is by feild and delimiter, that is using a delimiter like a line break or a space as a way to split a string into feilds, and then using a feild index to get the sub string value that I want.

There are a few other options with The Linux cut command, but I will just be sticking to a few basic examples that actaully come into play when writing bash scripts.

<!-- more -->

## 1 - Cutting by delimiter and feild

I am going to start off with Linux cut examples that have to do with using the delimiter option \( -d \) to set a char that is to be used to break a string down into feilds. Once a delimiter is given the the feild option \( -f \) can be used to set what the feild index is that I want.

### 1.1 - Basic example of using delimiter and feild options with Linux Cut

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 3
3c
```

### 1.2 - More than one index can be given

```
$ echo "[1a,2b,3c,4d,5e,6f,7g,8h,9i]" | cut -d , -f 8,2,6
2b,6f,8h
```

### 1.3 - Be sure to use quotes when needed

```
$ echo "this is some text to cut for example" | cut -d " " -f 6
cut
```