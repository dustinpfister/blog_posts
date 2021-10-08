---
title: The Linux test bash built in command
date: 2021-10-08 11:06:00
tags: [linux]
layout: post
categories: linux
id: 932
updated: 2021-10-08 12:12:50
version: 1.11
---

I have a lot of pots boiling when it comes to things to learn and research more, one of which is to become more competent when it comes to working with a Linux system. A major part of doing so is to learn a hold lot more about bash, and with that that bash built in commands once of which is the [Linux test](https://linux.die.net/man/1/test) bash built in command.

In a previous Linux post on bash scripts I wrote about [special parameters](/2020/12/08/linux-bash-script-parameters/) one of which is the \$\? parameter. This parameter will give the exit status of the last command that was called in the shell. With that said what the test command does is it, well, preforms some kind of test and then will exit with a status code of 0 if all goes well with that test, else it will exit with 1.

The test command by itself will not produce any output to the standard output of the bash console, so often it should be used in conjunction with a other commands and bash features with the special parameter that contains the exit status to produce some kind of output. However often when the test command is used it is when making bash scripts and thus it is just used as a way to make some kind of choice when it comes to doing something or not, as such that is likely why it will not produce any output unless something is done to make it do so.

<!-- more -->

## 1 - Basic examples of Linux test command

To start out with in this section I will be going over a few simple examples of the Linux test command. Sense the command by itself will not produce any output to the standard output, many of these examples will also involve other bash features that might be worth looking into further also.

### 1.1 - Using the echo command with test

To start out with the test command it might be best to just work out a few simple examples in the bash console. For this example I am just using the equal to expression with the test command. When doing so the exit status for the test command will be 0, or 1, but to see the output I will need to use a command link the [Linux echo](/2019/08/15/linux-echo/) command.

```
$ test 5 -eq 5; echo $?
0
$ test 5 -eq 10; echo $?
1
```

### 1.2 - Using and and or in a line

Another option would be to use the and and or [control operators](https://opensource.com/article/18/11/control-operators-bash-shell). In the above example in which I am just using the Linux echo command I am using a semicolon control operator as a way to end the test command, and start a new command that is to just echo out the exit status of the last command which was the test. In this example I am just using the \|\| and \&\& control operators for the sake of or and and operations.

```
MESSTRUE="Yep"
MESSFALSE="Nope"
$ test 100 -gt 99 && echo $MESSTRUE || echo  $MESSFALSE
Yep
$ test 80 -gt 99 && echo $MESSTRUE || echo  $MESSFALSE
Nope
```


### 1.3 - if statement

One major part of getting into writing bash scripts is to make use of the [if statement](/2020/12/02/linux-bash-script-conditional-statements/) that is another way to go about using the test command. Although it might be best to start write files when it comes to this sort of thing, it is also possible to work with them write away by just typing something like this into the bash console.

```
$ if [ 1 -eq 1 ];then echo 'yep'; fi;
```

### 1.4 - redirection

```
$ test 5 -eq 5 && echo "Yep" > foo.txt || echo "Nope" > foo.txt
$ cat foo.txt
Yep
$ rm foo.txt
```

## 2 - Expressions in detail

### 2.1 - equal to

```
$ test 5 -eq 5; echo $?
0
$ test 5 -eq 10; echo $?
1
```

### 2.2 - greater and less than

```
$ test 7 -gt 5; echo $?
0
$ test 5 -gt 5; echo $?
1
$ test 5 -ge 5; echo $?
0
```

```
$ test 5 -lt 7; echo $?
0
$ test 5 -lt 5; echo $?
1
$ test 5 -le 5; echo $?
0
```

### 2.3 - folder

```
$ test -d ~/foo; echo $?
1
$ mkdir ~/foo
$ test -d ~/foo; echo $?
0
$ rmdir ~/foo
```

### 2.4 - symbolic link

```
$ echo "hello world" > foo.txt
$ ln -s foo.txt fooLink
$ test -h foo.txt; echo $?
1
$ test -h fooLink; echo $?
0
$ rm fooLink
$ rm foo.txt
```