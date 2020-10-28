---
title: Linux base32 encoding and decoding on the command line
date: 2020-10-28 14:42:00
tags: [linux]
layout: post
categories: linux
id: 731
updated: 2020-10-28 16:09:00
version: 1.2
---

The the usr bin folder on most Linux systems there should be a base32 and base64 commands that can be used to do quick, simple base32 and 64 encodings and decodings in the command line. The commands can be fed some input via the standard input when it cokes to piping in what I want to encode to base32, the result is then a base32 encoding of what I piped in when it is not used with any options. Speaking of options what if I have some base32 or 64 code and I want to decoded it back, for this there is the -d option that will decode base32 or 64 into its original form.

So in todays Linux post I will be checking out the base32 command as well as the base64 command for doing this sort of thing on the command line in a Linux operating system environment. I will of course also be touching base on a few other things when it comes to using these commands to create a collection of files such as piping, redirection, and other commands that can come into play with this. 

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

## 3 - Conclusion, and creating a bunch of files

It would have been nice to work out some examples that have to do with creating a collection of base64 files from a source folder and then back again but I ran into a problem. I was able to figure out this much when it comes to using the Linu find command to get a list of files and then use the exec option of find to create base 64 files.

```
$ find -type f -name '*.md' -exec bash -c 'base64 {} > {}.b64' ';'
```

This will result in a bunch of files with the b64 externtion appedned on the end and the conetnt of each being base64 encoded. However the problem then is how do I go about creating a collection of files where each file is then just the original extension. I got as far as becoming aware of cerrtin other commands such as cut, but gave up after a while.