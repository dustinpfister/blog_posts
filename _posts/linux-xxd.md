---
title: The Linux xxd command for dumping hex to the standard output rather than text
date: 2021-11-19 11:31:00
tags: [linux]
layout: post
categories: linux
id: 940
updated: 2021-11-19 12:04:12
version: 1.5
---

When starring to get familiar with the various commands that there are to work with in a typical Linux environment one such command is the [Linux cat](/2020/11/11/linux-cat/) command. What is great about this command is that it can be used to quickly read a file and dump that text to the standard output. With that said the text from the file can also be [piped to other various useful commands](/2020/10/09/linux-pipe/) such as the [Linux grep](/2020/09/14/linux-grep/) command just to name one such option. In addition to being able to read a file, text can also be piped into the cat command rather an a file. For these reasons the Linux cat command is often used when working out all kinds of various things in bash directly in a terminal window, and also when writing bash scripts.

So then at some point a thought might occur that is along the lines of "Say this cat command is great, but if only there was a command that did more or less the same thing, only it dumped HEX to the standard output, or whatever I am piping to, rather than plain text". For example I want to know what the hex values are for some byte values, and this text might include all kids of command characters that I do not want to dump to a console as text. Well it would seem that such a command does often exist in Linux systems and it would seem that this command is the [Linux xxd](https://linux.die.net/man/1/xxd) command.

So then in this post I will be taking a quick look at this Liunx xxd command, and also while I am at it I will be also demonstrating a few quick simple examples of other Linux and bash related features in the process of doing so.

<!-- more -->

## 1 - Basics of the Linux xxd command

In this section I will be going over a few quick examples of the Linux xxd command that can be done in the console real quick just for the sake of getting a feel for how this command works. There is always looking into the man page when it comes to learning about all the various options that there are to work with, but for now many of these basic examples just use the -p option.

### 1.1 - Linux xxd and echo commands with piping

```
$ echo -n "A" | xxd -p
41
```

### 1.2 - Linux redirection and xxd

```
$ echo "Hello World" > ~/foo.txt
$ xxd -p ~/foo.txt
48656c6c6f20576f726c640a
```

### 1.3 - Creating an out file

```
$ echo "Hello World" > ~/foo.txt
$ xxd -p ~/foo.txt ~/foo.hex.txt
$ cat ~/foo.txt ~/foo.hex.txt
Hello World
48656c6c6f20576f726c640a
```

### 1.4 Using Linux cat and xxd

```
$ echo "Hello World" > ~/foo.txt
$ echo "Bar and foo" > ~/bar.txt
$ echo "I want a zoo" > ~/zoo.txt
$ cat ~/foo.txt ~/bar.txt ~/zoo.tzt | xxd -p > ~/fbz.hex.txt
$ cat ~/fbz.hex.txt
48656c6c6f20576f726c640a42617220616e6420666f6f0a
```

## 2 - Conclusion

