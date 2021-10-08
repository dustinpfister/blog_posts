---
title: The Linux test bash built in command
date: 2021-10-08 11:06:00
tags: [linux]
layout: post
categories: linux
id: 932
updated: 2021-10-08 11:15:35
version: 1.3
---

I have a lot of pots boiling when it comes to things to learn and research more, one of which is to become more competent when it comes to working with a Linux system. A major part of doing so is to learn a hold lot more about bash, and with that that bash built in commands once of which is the [Linux test](https://linux.die.net/man/1/test) bash built in command.

In a previous Linux post on bash scripts I wrote about [special parameters](/2020/12/08/linux-bash-script-parameters/) one of which is the \$\? parameter. This parameter will give the exit status of the last command that was called in the shell. With that said what the test command does is it, well, preforms some kind of test and then will exit with a status code of 0 if all goes well with that test, else it will exit with 1.

The test command by itself will not produce any output to the standard output of the bash console, so often it should be used in conjunction with a command link the Linux echo command with the special parameter that contains the exit status to produce some kind of output.

<!-- more -->
