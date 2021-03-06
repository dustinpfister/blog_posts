---
title: Linux Bash builtin command(s)
date: 2021-02-12 13:58:00
tags: [linux]
layout: post
categories: linux
id: 802
updated: 2021-02-15 17:13:41
version: 1.14
---

In Linux bash defines a number of built in commands, there is also the [builtin command](https://www.geeksforgeeks.org/builtin-command-in-linux-with-examples/) itself which is also a built in command of bash. This builtin command is useful for creating functions in bash scripts that have the same name as a built in command. However there is also the question of what the built in commands are and how to go about confirming if a command is built in or not. So in this post I will be going over some basic examples of the builtin command, but I will also be doing a general overview of all the built in commands in bash.

<!-- more -->

## 1 - The bash builtin command and bash built in command basics

In this section I will be going over a simple example of the builtin bash built in command, but I will also be touching base on the basics of built i commands in general. The bash builtin command is a way to call a bash built in command in the body of a function that has the same name as the built in command. However this post is not just on this command, but built in commands in general. So in this section I will be touching base on another bash built in command called type that can be used to find out if a command is a built in command or not.

### 1.1 - Know if you are dealing with a built in command

To know if a given command is a built in command or not it might be best to look over the bash man page of the version of bash that is being used. However in any case there should be a way to confirm first hand if a command name is a bash built in, or a command that is an actual file in one of the folders where commands are such as the bin folder. For this there is another bash built in called type that will tell be if a command is a built in command, or a file command.

So if I use the type command and pass the -t option for it that will cause the type command to give me a string value that is the type of the given command name. An example of a bash built in command is the cd or change directory command, so if I give this to type I get the expected result which is builtin.

```
$ type -t cd
builtin
```

If I give a command that is not a bash built in command such as the mkdir command that is a file command that is in the bin folder then I get the string value file.

```
$ type -t mkdir
file
```

There is a lot more to say about the type command, but I will not be getting into detail about it here as I have [wrote a post on type](/2021/02/11/linux-type/) all ready. However I just wanted to cover the basic idea of what a built in command is, and how to find out if a given command is indeed a built in command or not.


### 1.2 - basic builtin command example

So one of the main use case examples of the builtin command is to use it to call a builtin command inside the body of a function that has the same name as the built in command. For example I can have an exit function that calls the exit built in command in the body of the exit function. When I go to call the exit function I am calling the function and not the command, but I can still use the actual command in the body of the function by using the builtin command.

```
#!/bin/bash
# exit function that calls exit builtin
exit(){
   code=${1:-1}
   echo "exiting with code $code"
   builtin exit ${code}
}
exit
```

```
$ chmod 755 exitfunc.sh
$ ./exitfunc.sh
exiting with code 1
```

Although I can do this with the built in command I think I would still prefer to call my functions something that does not get me into this situation to begin with when writing bash scripts.

## 2 - Some bash built in commands

So now that I have the basics of bash built in commands covered, and also a basic example of the builtin command out of the way. With that all set and done maybe now I should go over some quick examples of built in bash commands and link to additional posts where I get into the commands in detail.

### [2.1 - The cd built in command](/2021/02/10/linux-cd)

The cd command is used to change the current working directory. It is one of the first basic commands that I learned how to use way back when I was starting to teach myself how to work with a bash command prompt. There is knowing the current folder, and then there is changing the current folder, and when it comes to changing the current folder that is where cd comes into play. In my post on the cd command I get into a bunch of little ins and outs that a new Linux user should be aware of when starting to learn this basic set of commands.

### [2.2 - The echo command](/2019/08/15/linux-echo/)

The echo command is a way to go about echoing some text that is given as an argument to the standard output. This is another basic command that will pop up a lot in bash examples. If I just want to echo a value to the standard output this is the command to use, but there are a few other little things about it. For example there is the escape option and also a way to make it so it will one append a line breal at the end.

### [2.3 - The eval command](/2021/02/09/linux-eval/)

Eval is a way to evaluate a string value as a bash command. There are some other ways to go about dong the same thing though such as calling the bash command itself and using the -c option with bash as a way to run a string that is a bash command.

### [2.4 - type command](/2021/02/11/linux-type/)

The type command as I have covered above is how to find out if a command is a built in command or not. However it does also have additional uses. In the event that is is a file command it can be used to find out the location of that file command. In addition there are a number of other types such as function, and keyword.

## 3 - Conclusion

So there is a bunch of commands that are built into bash itself, and then there is also a builtin command that is itself a built in command of bash. The type command which is also a bash built in command can be used as a way to find out if any given command is a built in command or not. There are also a number of other commands that are in fact built into bash itself such as cd, exit, and eval just to name a few.
