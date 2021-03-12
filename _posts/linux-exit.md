---
title: Linux exit bash built in command
date: 2021-03-12 13:56:00
tags: [linux,js]
layout: post
categories: linux
id: 822
updated: 2021-03-12 14:25:57
version: 1.5
---

The [Linux exit](https://man7.org/linux/man-pages/man3/exit.3.html) command is a one of many commands built into the bash command, which at the name sugests is used to exit. The command will come up when it comes to writing bash scripts, and I want to have a way to end the process with a certial exit status code. By default the status code should be zero, but that might change in some situations, so it is generaly always a good idea to give a status code when using it.

There might not be that much to write about when it comes to the eit command, for the most part I just type it in the bash script and give a status code as the first and only argument. However when it comes to status codes maybe there is a bit more to brnach off with when it comes to this topic when it comes to [special parameters](/2020/12/08/linux-bash-script-parameters-special), mainly the \$\? parameter that can be used to obtian the exit code of the lass ended process.

So then in this post I will be going over a few quick basic Linux exit command examples, and then maybe aslo touch base on some basic bash script exampels that make use of the exit command also.

<!-- more -->

## 1 - Linux Exit command basics

In this section I will be going over just some very basic Linux exit command examples, in the process of doing so I will also be going over some other basic features of bash in the process. For example there is the Linux type command that is another bash built in command on top of the Linux exit command that can be used to know that exit is a bash built in command. There is also using bash within bash but passing some arguments to bash to make it run a stirng as some bash code so the exit command can be used in a terminal window without cliosing the window each time it is called which is usful when playing around with a command such as the Linux Exit command.

### 1.2 - Very basic Linux exit example

```
$ exit
```

### 1.1 - Using bash -ci, and echo $? to see exit status code

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

