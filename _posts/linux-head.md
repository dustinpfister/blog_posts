---
title: The Linux head command
date: 2021-03-10 12:07:00
tags: [linux,js]
layout: post
categories: linux
id: 820
updated: 2021-03-10 12:52:54
version: 1.4
---

The [Linux head](https://man7.org/linux/man-pages/man1/head.1.html) command is a way to just print the first few lines of some output rather than the whole thing. In addition there is also the tail command that can be used as a way to print just the last few lines of some output. In some situations this is just what I would want to do with soem command output rather than make use of some other options, such as the less command, or redirection of output to a file that I can then option with a text editor like nano.

<!-- more -->

## 1 - Linux head basic examples

In this section I will be starting out with just some basic examples of the head command, and some related commands, and bash features such as piping, and the echo built in command. There are two general ways of going about using the head command, one is to get the first few lines of output, and the other is to get the first few bytes of output.

The echo built in command is just a way to go about creating some standard output, for the sake of just getting to know how to use the head command this command will work for the ake of just creating some dummy test output. In some real use case examples the output that I am piping into the Linux Head command might come from some other command such as the Linux ps command, or any number of other commands.

In these examples I am also making use of pipping as a way to pipe the standard output of the echo command into the standard input of the head command. I will not be getting into pipping and redirection in detail here, but if you are not up to speed with this part of working with bash I sugrest to read up on this, and many other basic bash features.

### 1.1 - First few lines of standard output with the Linux Head -n option

First off lets start off with a basic example of the Linux echo command to create some test output that is a bunch of lines o text. Many Linux commands produce output in the form of some text that is then termnated with a line feed charicter, which composes a line of output. The echo command can be used to reproduce this with an argument in string form. The -e option can be used to evaluate the string and convert instances of the pattern \\n to a line feed chariacter.

So then something liek this:

```
$ echo -e "one\ntwo\nthree"
one
two
three
```

Will give me a few lines of some simple test output. I can then pipe this to the standard input of th head command and use the -n option of the head command to set the number of lines that I want from the top.

```
$ echo -e "one\ntwo\nthree" | head -n 1
one
```

So then that is the basic idea of the head command, it will give me a number of lines from the top. However it can also give me a set number of bytes also when using another option.

### 1.2 - First few bytes of standard output with the Linux Head -c option

```
$ echo "12345678" | head -c 1; echo ""
1
```
