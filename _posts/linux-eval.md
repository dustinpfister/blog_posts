---
title: Linux eval bash built in command
date: 2021-02-09 14:10:00
tags: [linux]
layout: post
categories: linux
id: 799
updated: 2021-02-09 19:46:46
version: 1.14
---

The [linux eval](https://www.computerhope.com/unix/bash/eval.htm) command is a bash built in command that will take a string as an argument and evaluate that string as if it was entered into the command line. This is a built in command that I find myself using once in a while when working out a bash script there I need to create a string and then run that string value.

The eval command can be given just one string as an argument or more than one string. In the event that more than one string is given then thouse strings are concatanted togeather and that final string is what is run as a command. There are some other tools that can be used as a way to call a string as a command in bash incluing using the bash command itself with the -c option. Also when working out a bash script some times I can just use a string value by itself without having to bother with any additional command. So lets look at a few examples of the bash eval built in command, as well as soem related exmaples.

<!-- more -->

## 1 - Basic linux eval example

For a basic example of the eval built in just call the eval command, and then pass it a string that contains a command. For example I xcan give it a string of the ls command followed by a glob pattren for something such as selecting just text files..

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

### 2.2 - Some more examples in a bash script

Now for just a few more examples of using a string as a command in a bash script. Depeding on what it is that I am trying to do with a sting value in a bash script I might not always need to bother with eval. In some cases I can just have the string value as a line in the script and that alone will work just fine.

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

Any command in string form can be called with eval, and as such it will generally work well in situstions in which I need to use it in a bash script. There are some additional options when it comes to runnign a string as a command though such as using bash with the -c option which also seems to work fine in most cases.
