---
title: Control Operators in bash
date: 2021-10-15 12:24:00
tags: [linux]
layout: post
categories: linux
id: 933
updated: 2021-10-15 15:30:11
version: 1.12
---

It would seem that I have not got around to writing a post on [control operators in bash](https://opensource.com/article/18/11/control-operators-bash-shell), so today I will be writing a thing or two about this little aspect of [bash scripts](/2020/11/27/linux-bash-script/), and working with in a Command Line Interface in Linux. Control operators are just one of many little details that one will need to learn a thing or two about in order to become more professional with bash, and operating system automation tasks in Linux systems by way of bash scripts. 

There are three general things to be aware of when it comes to this, one is to end a command, and start a new one which can be done with a semicolon \(\;\). Another thing to be aware of is to use \(&&\) as a way to run another command after a command, but only if the first one ends with a status code of zero. There is then using the \(\|\|\) control operator if I want to run another command, but only if the command before it failed or for one reason or another exited with a non zero exit code status.

<!-- more -->

## 1 - Basics of Control Operators in Bash

In this section I will be starting out with just a few simple and safe examples that can be used in the command line interface right away just to get an idea of what the deal is with control operators. I assume that you have at least a little experience when it comes to working within the Command Line Interface of a Linux system. If not you might want to start out with some basic commonly used commands such as [echo](/2019/08/15/linux-echo/) and [test](/2021/10/08/linux-test/), at lest those are some main commands of interest that I will be using in these examples.

### 1.1 - Semicolon \(\;\)

The Semicolon Control Operator is what to use in order to end one command, and start another in a single line. For example there is using the test command to check if a file exists or not, and then using the echo command to print the value of the [\$\? special parameter](/2020/12/08/linux-bash-script-parameters-special/) which should be the exit code status of the last command in this case the test for a file.

So if I want to test if a foo.txt file is in my home folder or not I can do something like this:

```
$ test -e ~/foo.txt; echo $?
```

The test command will check if the file is there or not, if it is it will exit with a status of 0, if not the status will be 1. However the test command alone will not print anything to the standard output of the console. So if I just want to confirm that this is working in the command line in a single line, after test I can place a semicolon, and then use echo to print the value of the \$\? spacial parameter to the standard output of the console.

### 1.2 - And \(&&\)

Another control operator of interest would be the \&\& operator that will call the next command after the first command, but only if the exit code status of the first command is 0. Say I want to write a line of code to put in a bash file that will test for the existence of a Documents folder, and if it is there, and only if it is there list the contents of the folder using the [Linux ls](/2020/10/14/linux-ls/) command.

```
$ test -e ~/Documents && ls -l
```

### 1.3 - Or \(\|\|\)

The \|\| operator is then similar to \&\& only the next command will only fire if the first command DOES NOT END with a 0 exit status code. So once again say I test for the presence of a foo.txt file, then use the \|\| operator, and then test again for a bashrc file in the home folder. After that I then use the semicolon and echo the exit status code. If the situation is that I do not have a foo.txt file there, but I do have a bashrc file, that will result in an exit code status of 1, which will then result in the next firing which will exit with a 0 status. So then in other words the final result will only be an exit status of 1 if I not not have ether of the files in the home folder.

```
test -e ~/foo.txt || test -e ~/.bashrc; echo $?
```

## 2 - Conclusion

The use of control operators is then yet another aspect of bash that one should know a thing or two about when it comes to writing bash scripts then. Often there is using the semicolon operator in order to write a string of code in a single line rather than making use of end of line charterers in a script. These operators also go hand in hand with knowing a think or two about exit status codes, with various Linux commands such as test, and also why they are important when it comes to writing scripts. For example there is using the Linux exit command to set what the exit status should be for a bash script, and there is also knowing a thing or two about how to set exit status codes when writing a program in a language such as python, javaScript, and C.

