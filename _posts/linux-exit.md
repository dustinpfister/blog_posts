---
title: Linux exit bash built in command
date: 2021-03-12 13:56:00
tags: [linux,js]
layout: post
categories: linux
id: 822
updated: 2021-03-12 14:35:52
version: 1.9
---

The [Linux exit](https://man7.org/linux/man-pages/man3/exit.3.html) command is a one of many commands built into the bash command, which at the name sugests is used to exit. The command will come up when it comes to writing bash scripts, and I want to have a way to end the process with a certial exit status code. By default the status code should be zero, but that might change in some situations, so it is generaly always a good idea to give a status code when using it.

There might not be that much to write about when it comes to the eit command, for the most part I just type it in the bash script and give a status code as the first and only argument. However when it comes to status codes maybe there is a bit more to brnach off with when it comes to this topic when it comes to [special parameters](/2020/12/08/linux-bash-script-parameters-special), mainly the \$\? parameter that can be used to obtian the exit code of the lass ended process.

So then in this post I will be going over a few quick basic Linux exit command examples, and then maybe aslo touch base on some basic bash script exampels that make use of the exit command also.

<!-- more -->

## 1 - Linux Exit command basics

In this section I will be going over just some very basic Linux exit command examples, in the process of doing so I will also be going over some other basic features of bash in the process. For example there is the Linux type command that is another bash built in command on top of the Linux exit command that can be used to know that exit is a bash built in command. There is also using bash within bash but passing some arguments to bash to make it run a stirng as some bash code so the exit command can be used in a terminal window without cliosing the window each time it is called which is usful when playing around with a command such as the Linux Exit command.

### 1.2 - Very basic Linux exit example

For a very basic example of the Linux exit command the command can just be called in a terminal window like this.

```
$ exit
```

Doing so will cause the terminal window to close though. This can make it hard to get a sense as to what the exit command does when it comes to status codes. So it is not always a good idea to just work with the exit command dirrectly, unless maybe you do want to just end your terminal window session that way, in which case mission accomplished. Still I think it is called for to go over at least a few more basic examples of the exit command.

### 1.1 - Using bash -ci, and echo $? to see exit status code

To start to get an idea of what the exit command is really for when making bash scripts, and to do so in a terminal window without having it close on you every time, it migth be a good idea to call the bash command itself within the bash prompt, but pass it some options to run a string that contains the Linux exit command. While I am at it I should also touch base on useing the Linux echo command to print the exit status code of the last process by passing the value of the exit code special paramater as the argument for the Linux echo command.

```
$ bash -ci "exit" &> /dev/null; echo $?
0
$ bash -ci "exit 1" &> /dev/null; echo $?
1
```

### 1.3 - The type command

```
$ type -t exit
builtin
```

## 2 - Function Bash script example

```
#!/bin/bash
 
exitWith(){
    code="${1:0}"
    bash -ci "exit ${code}" &> /dev/null
}
 
if [ $1 == "foo" ];then
    exitWith 0
else
    exitWith 1
fi
 
echo $?
```

## 3 - Conclusion

The Linxu exit command is then one of the many bash built in commands that a Linux user should be aware of when it comes to starting to write bash scripts. It is the standard go to command to make it so that a script will exit with a 0, or non zero exit code status.
