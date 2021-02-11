---
title: Find if a command is there with the type builtin command in Linux
date: 2021-02-11 12:22:00
tags: [linux]
layout: post
categories: linux
id: 801
updated: 2021-02-11 15:15:05
version: 1.8
---

The [linux type](https://linuxize.com/post/linux-type-command/) command is one of many commands that are built into bash itself, this built in command can be used to find the type of a given command name. When working in the command line interface of a terminal there are a number of differet types of commands. Some commands are actaul files in the form of binaries, or scripts that can be run with another command declared with a shebang. Other commands are not files but functions declared in the body of a bash script. There are a number of commands built into bash itself, inclduing as I have mentioned the type command itself. In bash there are also a number of keywords that are reserved. Also there might be a number of commands that are not even any of these, but an aliaes for a command that may have been set in a bashrc file.

So the type built in command can be used as a way to find out what the type is of a command. In the event that it is an actaul files it can be used as a way to find out where that files is. In additin the type command is also usful to find out of a command is taken or not at all which is usful when it comes to coming up with a name for a command.

<!-- more -->

## 1 - Basic example of the type builtin command

First off a basic type built in example where I am just passing the name of a command as the one and only positional argument. When doing so the type built will tell me what kind of type the command is of found. In the even that I give a command name that is not found then the command will end with a non zero exit status code.

```
$ type cd;echo $?
cd is a shell builtin
0
$ type foo;echo $?
bash: type: foo: not found
1
```

## 2 - The t option

The t option of the type command will return a string value of the type of the command or nothing in the event that the command is not found. The possible values for a command type are function, keyword, builtin, file, and alias. In this section I will be going over some examples of the -t option of the type built in that will be bash script examples.

If you have no experence on writing bash scripts then general process is to just have commands in a file and then call that fine with bash, or make the file exacutabule with the chmod command. I will not be getting into bash scripts in detail here, but the first example should still be simple enough to get started with.

### 2.1 - Basic t option example

First off just a basic example of the t option where I am giving a command name I know is not there, and another that is a basic command that is a another bash built in. So I made a bash script file with a text editor and called it basic.sh. In this basic.sh file I start off with the bash shebang as I would for any script that I want to make exacutabule.

I then just call the type command with the t option and then the name of a command, but I do so in string form, and then pass that string as an argument tio the bash command with the -c and -i bash command options.

```
#!/bin/bash
bash -ci "type -t cd"
bash -ci "type -t foo"
```

```
$ chmod 755 basic.sh
$ ./basic.sh
builtin
```

### 2.2 - All type values

Now for a bash script example that will result in string values for all the types.

```
#!/bin/bash
 
# a function
func(){
  echo 'foo'
}
 
a='foo'
 
type -t func
# function
 
type -t if
type -t case
type -t while
# keyword
 
type -t pwd
type -t cd
type -t echo
# builtin
 
type -t bash
type -t ls
type -t node
type -t wc
# file
 
bash -ci "type -t ll"
# alias
```

### 2.3 - Using redirection and echo to get a 0 or 1 value if a command is there or not

It is possible to use redirection to redirect the output of a command for bolth the standard output and standard error to dev null. This is basicly just a fancy way to throw away any output from the result of a command such as the type command where I am testing if a command is there or not.

```
#!/bin/bash
# using bash with the -c and -i options
# with type using the -t option and redirecting
# the output to /dev/null. However echoing the value
# of $? to get a 0 (command found) or 1 (command not found)
 
bash -ci "type -t ls" &> /dev/null; echo $?
bash -ci "type -t pwd" &> /dev/null; echo $?
# 0
 
bash -ci "type -t foo" &> /dev/null; echo $?
bash -ci "type -t nope" &> /dev/null; echo $?
# 1
```

## 3 - Conclusion

The type built in command is usfule for fidning out if a command name is being used on the system or not. It is also a good way to fine out if a given command name is indeed an actual command as a file in one of the os folders like the bin folder, or something else.
