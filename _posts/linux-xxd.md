---
title: The Linux xxd command for dumping hex to the standard output rather than text
date: 2021-11-17 14:18:00
tags: [linux]
layout: post
categories: linux
id: 940
updated: 2021-11-19 11:27:52
version: 1.0
---

When starring to get familiar with the various commands that there are to work with in a typical Linux environment one such command is the Linux cat command. What is great about this command is that it can be used to quickly read a file and dump that text to the standard output. With that said the text from the file can also be piped to other various useful commands such as the Linux grep command just to name one such option. In addition to being able to read a file, text can also be piped into the cat command rather an a file. For these reasons the Linux cat command is often used when working out all kinds of various things in bash directly in a terminal window, and also when writing bash scripts.

So then at some point a thought might occur that is along the lines of "Say this cat command is great, but if only there was a command that did more or less the same thing, only it dumped HEX to the standard output, or whatever I am piping to, rather than plain text". For example I want to know what the hex values are for some byte values, and this text might include all kids of command characters that I do not want to dump to a console as text. Well it would seem that such a command does often exist in Linux systems and it would seem that this command is the [Linux xxd](https://linux.die.net/man/1/xxd) command.

<!-- more -->

