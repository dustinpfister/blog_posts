---
title: Linux eval bash built in command
date: 2021-02-09 14:10:00
tags: [linux]
layout: post
categories: linux
id: 799
updated: 2021-02-09 18:29:19
version: 1.6
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

### 2.1 - Some examples in a bash script

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