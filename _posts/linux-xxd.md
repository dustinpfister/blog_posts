---
title: The Linux xxd command for dumping hex to the standard output rather than text
date: 2021-11-19 11:31:00
tags: [linux]
layout: post
categories: linux
id: 940
updated: 2021-11-19 12:18:08
version: 1.8
---

When starring to get familiar with the various commands that there are to work with in a typical Linux environment one such command is the [Linux cat](/2020/11/11/linux-cat/) command. What is great about this command is that it can be used to quickly read a file and dump that text to the standard output. With that said the text from the file can also be [piped to other various useful commands](/2020/10/09/linux-pipe/) such as the [Linux grep](/2020/09/14/linux-grep/) command just to name one such option. In addition to being able to read a file, text can also be piped into the cat command rather an a file. For these reasons the Linux cat command is often used when working out all kinds of various things in bash directly in a terminal window, and also when writing bash scripts.

So then at some point a thought might occur that is along the lines of "Say this cat command is great, but if only there was a command that did more or less the same thing, only it dumped HEX to the standard output, or whatever I am piping to, rather than plain text". For example I want to know what the hex values are for some byte values, and this text might include all kids of command characters that I do not want to dump to a console as text. Well it would seem that such a command does often exist in Linux systems and it would seem that this command is the [Linux xxd](https://linux.die.net/man/1/xxd) command.

So then in this post I will be taking a quick look at this Liunx xxd command, and also while I am at it I will be also demonstrating a few quick simple examples of other Linux and bash related features in the process of doing so.

<!-- more -->

## 1 - Basics of the Linux xxd command

In this section I will be going over a few quick examples of the Linux xxd command that can be done in the console real quick just for the sake of getting a feel for how this command works. There is always looking into the man page when it comes to learning about all the various options that there are to work with, but for now many of these basic examples just use the -p option. The -p option is a shorthand for --postscript, which is a kind of continuous hex dump style which in order words can be called just plain hex style or format. The default output style is not like this, and in most use case examples of this command I would want this post script style for the output rather than the more descriptive default style.

### 1.1 - Linux xxd and echo commands with piping

To start off this set of examples here is something that can be done in the command line right now that will not create a file or do anything weird. With that said there is using the Linux echo command to just quickly create some standard output by way of a string that is given by way of an argument. When calling the [Linux echo](/2019/08/15/linux-echo/) command I can give the -n option which will make it so that the echo command will not append a new line character after generating some standard output in the form of a string. I am then piping this standard output created with echo into the standard input of the xxd command which I am using the the postscript option. The end result is then the hex form of the text that I have given to echo.

For example if one takes a moment to look at an [ASCII table](https://www.asciitable.com/) they will find that the hex for the letter 'A' is '41'. So then is the letter 'A' is what I give for echo and then pipe that to xxd the result should be '41', and sure enough that is what happens.

```
$ echo -n "A" | xxd -p
41
```

So then great the Linux xxd command can be used to generate hex from a text source that is piped into it from another command. However it is also possible to read and create files with xxd alone, as well as do something like with this example only pipe and redirect to create what I want. This example alone should be enough actually when it comes to working with everything there is to work with in Linux, but never the less I should take a moment to cover at least a few more examples.


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

