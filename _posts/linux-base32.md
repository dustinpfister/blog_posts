---
title: Linux base32 encoding and decoding on the command line
date: 2020-10-28 14:42:00
tags: [linux]
layout: post
categories: linux
id: 731
updated: 2020-10-28 14:57:05
version: 1.0
---

The the usr bin folder on most Linux systems there should be a base32 and base64 commands that can be used to do quick, simple base32 and 64 encodings and decodings in the command line. The commands can be fed some input via the standard input when it cokes to piping in what I want to encode to base32, the result is then a base32 encoding of what I piped in when it is not used with any options. Speaking of options what if I have some base32 or 64 code and I want to decoded it back, for this there is the -d option that will decode base32 or 64 into its original form.

So in todays Linux post I will be checking out the base32 command as well as the base64 command for doing this sort of thing on the command line in a Linux operatins system enviorment. I will of cousre also be touching base on a few other things whne it comes to using these commands to create a collection of files such as piping, redirection, and other commands that can come into play with this. 

<!-- more -->

## 1 - A basic base32 example with echo and piping

So for starters there is using the Linux echo command to just create some standard output, and then pipe that output to the base32 command.

```
$ echo 'this is some text I want to encode' | base32
ORUGS4ZANFZSA43PNVSSA5DFPB2CASJAO5QW45BAORXSAZLOMNXWIZIK
```

## 2 - Uisng the wc command to get the size in bytes of output

Another useful command that comes up often actually is the Linux wc command. The Linux wc command is used to get a word count of text, but it can also be used to count lines, and in this case the size of text in bytes.

```
$ echo 'this is some text I want to encode' | wc -c
35
$ echo 'this is some text I want to encode' | base32 | wc -c
57
$ echo 'this is some text I want to encode' | base64 | wc -c
49
```