---
title: Linux eval bash built in command
date: 2021-02-09 14:10:00
tags: [linux]
layout: post
categories: linux
id: 799
updated: 2021-02-09 19:36:40
version: 1.9
---

The [linux eval](https://www.computerhope.com/unix/bash/eval.htm) command is a bash built in command that will take a string as an argument and evaluate that string as if it was entered into the command line. This is a built in command that I find myself using once in a while when working out a bash script there I need to create a string and then run that string value.

The eval command can be given just one string as an argument or more than one string. In the event that more than one string is given then thouse strings are concatanted togeather and that final string is what is run as a command.

<!-- more -->

## 1 - Basic linux eval example

For a basic example of the eval built in just call the eval command, and then pass it a string that contains a command.

```
$ eval "ls *.txt"
```

Another way to do the same thing would be to call bash with the -c option.

```
$ bash -c "ls *.txt"
```

## 2 - Bash script examples

I often find msyelf using eval when working out bash scripts, mainly with certain tasks that have to do with command substatution. In some cases I might want to create a command string and then run that command string. Some times I can get what I want to work without having to bother with eval, or somethign else to that effect. Still there are some situstions in which I just have to use eval to do what i want to do with a string value in a bash script. So in this sectiojn I will be going over a few quick examples that ahve to do with simple bash script s and the eval built in command.

### 2.1 - Command substatution and eval

The main thing about the eval built in command and bash scripts seems to have to do with command substattion. Say that I am in a sitaution in which I want to set the value of a variable with a string. If I use the echo command and a string with the variable name in a commabnd subsiation then the result will be that bash trys to call the string as a command name. However one way to fix this would be the use the resulting string value as an argument to eval, when i do this I get an exspected result.

```
#!/bin/bash
 
$(echo 'foo=foobar')
echo $foo
# ./sub.sh: line 3: foo=foobar: command not found
#
 
eval $(echo 'foo=foobar')
echo $foo
# foobar
```

### 2.2 - Some examples in a bash script

```
#!/bin/bash
 
com='ls'
 
# this will cause an error
"${com} *.sh"
 
# this will work
eval "${com} *.sh"
 
# so will this
comStr="${com} *.sh"
$comStr
 
# and bash -c
bash -c "${com} *.sh"
```

## 2 - Conclusion

Any command in string form can be called with eval.