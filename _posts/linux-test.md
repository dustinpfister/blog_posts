---
title: The Linux test bash built in command
date: 2021-10-08 11:06:00
tags: [linux]
layout: post
categories: linux
id: 932
updated: 2021-10-09 09:32:20
version: 1.20
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

One more way to go about using the test command would be to make use of [redirection](/2020/10/02/linux-redirection/) as a way to write some output to a file.

```
$ test 5 -eq 5 && echo "Yep" > foo.txt || echo "Nope" > foo.txt
$ cat foo.txt
Yep
$ rm foo.txt
```

## 2 - Expressions in detail

Now that I have the very basics of the Linux test command out of the way, In this section I will be going over some of the expressions in greater detail.

### 2.1 - Testing if two values are Equal to each other

In the basic section above I have all ready covered the equal two expression. This is a typical expression that will be used often when writing bash scripts, and in programing in general actually. However in that example I was just using the -eq option which is used to check of two numbers equal each other or not. If you are like me and you are used to how this sort of thing working in javaSscript they you should be wondering about how to go about preforming equality in general when it comes to strings, and other types of values. For this there are other options such as = when it comes to string values rather than numbers.

```
$ test 5 -eq 5; echo $?
0
$ test 5 -eq 10; echo $?
1
```

### 2.2 - Greater and less than expressions

There are then expressions for greater than, less than, greater than or equal to, and less than or equal to. These are typical expressions to use when working out conditional statements, so this will often be used when writing bash scripts that call for the use of them. However there is also just quickly doing a few simple expressions in the bash console just for the sake of confirming how these work.

Greater than examples in the bash console

```
$ test 7 -gt 5; echo $?
0
$ test 5 -gt 5; echo $?
1
$ test 5 -ge 5; echo $?
0
```

Less than examples in the bash console.

```
$ test 5 -lt 7; echo $?
0
$ test 5 -lt 5; echo $?
1
$ test 5 -le 5; echo $?
0
```

### 2.3 - testing for a Folder

The test command can be used to check if a folder is there or not, for this I just need to use the -d option when calling the test command. So then this kind of test can be preformed to test if a folder exists or not, and in the event that it does not the [mkdir command](/2021/06/30/linux-mkdir/) can be used to create it. However when it comes to just making sure that a path of folders exists in the event that it does not, just the mkdir command can be used alone with the -p option. So then this kind of test will typically just be used in bash scripts for the sake of doing something else when testing for the presence of a folder.

```
$ test -d ~/foo; echo $?
1
$ mkdir ~/foo
$ test -d ~/foo; echo $?
0
$ rmdir ~/foo
```

### 2.4 - Symbolic links

The test command can be used to check for [symbolic links](/2021/10/01/linux-ln/), also known as a soft link, by making use of the -h option and then a path to a file to check if it is a symbolic link or not. If you are not yet familiar with symbolic links they are a way of creating a file that is a link to another file or folder. There is much more to read about when it comes to this subject as there is a difference between symbolic links, and hard links. Hard links are another kind of link, but they do not point to a path, rather that actual data of the file in the file system, as such they continue to work even if the source file is deleted.

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

## 3 - Conclusion

So then the Linux test command can preform certain comparisons, and checks on files, and then exit with a 0, or 1 exit status code. This can then be used as a way to make certain kinds of conditional statements in bash scripts when it comes to preforming certain kinds of actions or not.