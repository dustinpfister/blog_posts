---
title: Linux exit bash built in command
date: 2021-03-12 13:56:00
tags: [linux,js]
layout: post
categories: linux
id: 822
updated: 2021-03-12 14:12:05
version: 1.2
---

The [Linux exit](https://man7.org/linux/man-pages/man3/exit.3.html) command is a one of many commands built into the bash command, which at the name sugests is used to exit. The command will come up when it comes to writing bash scripts, and I want to have a way to end the process with a certial exit status code. By default the status code should be zero, but that might change in some situations, so it is generaly always a good idea to give a status code when using it.


<!-- more -->

## 1 - Linux Exit command basics

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

