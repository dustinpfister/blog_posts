---
title: Linux chmod command, file permissions and bash scripts
date: 2020-11-13 11:03:00
tags: [linux]
layout: post
categories: linux
id: 741
updated: 2020-11-13 12:26:26
version: 1.6
---

The [Linux chmod](https://man7.org/linux/man-pages/man1/chmod.1.html) command is the tool that is used to set file acess permissions in a Linux system, along with most other POSIX systems for that matter. The [chmod command](https://www.howtogeek.com/437958/how-to-use-the-chmod-command-on-linux/) can be used with other commands such as ls -l to find out what the current state is with permissions, and do something to chnage that state.

The chmod command also comes into play when it comes to making a bash script, or any script exacute without having to call the command to do so first. When working out a script for automating work there is placing a shebang at the top of the file to let Linux know what binary needs to be used to run the script. However in order to make use of it the script needs to become exacutabule first, and one way to do that is by using the Linux chmod command.

<!-- more -->

## 1 - Uisng the Linux ls -l command to check status of permissions before using chmod

Before uisng the Linux chmod command to change file access permisions it is first nessecry to check the current status of file acces permissions. One simple command for doing to is the Linux ls command with the -l option to print a long from of all and any files found.


Uisng the ls -l option for the current working path

```
$ ls -l .
total 8
-rwxr-xr-x 1 pi pi 43 Nov 13 11:14 basic.js
-rwxr-xr-x 1 pi pi 30 Nov 13 11:11 basic.sh
```

Uisng linux ls -l for a single file

```
$ ls -l basic.sh
-rwxr-xr-x 1 pi pi 30 Nov 13 11:11 basic.sh
```

The thing to look at hear is what is going on with the collection of r, w, and x chars at the begining of each line of the output. The char r stands for read, w is for write, x is for exacute, and - means no permission. There are three sets of these values from, and from right to left the sets of three chars are for the owner of the file, the owner group, and everyone else.

Now that we know how to check file access permissions we can not use chmod to chnage these values.

## 2 - Making a script exacutabule, or not, with +x and -x

One thing that I often find myself doing is using chmod to make a script that I wrote exacutabule. Often a script is very much exacutabule before hand, it is just that I need to call the binary that is used to run it first, and then pass the script I want to run as an argument to that binary. So what I really mean here is to make it so the script can just be run directly by making use of the propper shebang at the top of the script.

A sheband is a line at the very top of a script that serves one simple purpose to inform bash where the binary is to use to run the script. With a nodejs script, a shebang would look something like this:

```js
#!/usr/bin/node
console.log('hello world');
```

Which should be the path for the nodejs binary that is needed to run a script that is written in javaScript. However this shebang is only really needed when it comes to making it so the script can be run dirrectly. I can always just call node in the command line to run the script, but if I want to run the script by itself I need a way to let bash know where the binary is for this script file. So in this section I will be going over the use of the chmod command to make it so a script is exacutabule.

### 1.1 - start with a script

First off I need a script to check permissions for, and set to the propper permisiions. Also the script should have the propper shebang at the top of the file. For this example I will be sticking to bash, and make a simple bash script that just uses echo to print hello world to the standard output.

```bash
#!/bin/bash
echo "hello world"
```

### 1.2 - calling the script with the binary

So now that I have a basic bash script there is the question of how to go about calling it. With that said becuase it is a bash script I can just call the bash command dirrectly and then pass the bash script as an argument to the bash command.

```
$ bash basic.sh
hello world
```

Although this will work it defreats the purpose of adding the shebang at the top of the file. The sheban is there to let Linux know where the binary is to run this script after all. So if I am just dirrectly calling the script with bash what is the point of having the sheband there?

So the shebang is there so I can just go ahead and run the script, but there is a problem when doing so.

```
$ ./basic.sh
bash: ./basic.sh: Permission denied
```

The current user does not have permission to run the script. Assuming that the current user has the authority to chnage the status of the file acess permissions of the script, all that needs to happen is to just chnage the permisions of the script so that it can be exacuted for the current user. This is where the chmod command comes into play, there are a few ways to do about setting the permisions for exacuting a script, not just for the current user, but everyone.

### 1.3 - Checking status of script, and making it exacutabule with chmod +x

So to check the status of basic.sh I just need to use the ls -l command to check the permsiions of the file.

```
$ ls -l basic.sh
-rw-r--r-- 1 pi pi 30 Nov 13 11:11 basic.sh
```

When doing so I can see that the current user has read and write access, but does not have permisions to run the file. To chnage that I just need to use chmod +x.

```
$ chmod +x basic.sh
$ ls -l basic.sh
-rwxr-xr-x 1 pi pi 30 Nov 13 11:11 basic.sh
$ ./basic.sh
hello world
```

This makes it so the script can be run for the current user, but it calso makes it exacutabule for all users in the current group, and everyone for that matter. So then there is the question of how to go about setting the staus of this back, and there is also the custion of how to have more fine grain control over this. So with that said lets look at just a few more chmod examples.

### 1.4 - Make the script NOT exacutabule any more with chmod -x

To set things back to the way they where I just need to use the chmod -x command.

```
$ ls -l basic.sh
-rwxr-xr-x 1 pi pi 30 Nov 13 11:11 basic.sh
$ chmod -x basic.sh
$ ls -l basic.sh
-rw-r--r-- 1 pi pi 30 Nov 13 11:11 basic.sh
$ ./basic.sh
bash: ./basic.sh: Permission denied
```

Simple enouigh, we are now back to where we were. However what if I just want to make it so the current use can srun the script, but not any other user, except for root or course. Well octal modes do help to give better control over this, and all other values for that matter.

### 1.5 - Using ocal modes to set just the values that are wanted

Although the +x, and -x options for Linux chmod are convenient, they are no substatue for the fine grain control over file access permisions that is gained by using octal modes. An octal mode is just simply a set of three octal digits for each group to which file access permissions apply, the owner, the owners group, and everyone. An ocal digit of 7 will mean to read, write, and exacute. So if I want the owner of the file to have all permissions, then I will want to start off the set of digits with 7. After that I will want to set lower values for all other groups, such as 4 which would be read only.

```
$ chmod 744 basic.sh
$ ls -l basic.sh
-rwxr--r-- 1 pi pi 30 Nov 13 11:11 basic.sh
```