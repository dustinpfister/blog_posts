---
title: Linux chmod command, file permissions and bash scripts
date: 2020-11-13 11:03:00
tags: [linux]
layout: post
categories: linux
id: 741
updated: 2020-11-13 11:41:42
version: 1.2
---

The [Linux chmod](https://man7.org/linux/man-pages/man1/chmod.1.html) command is the tool that is used to set file acess permissions in a Linux system, along with most other POSIX systems for that matter. The [chmod command](https://www.howtogeek.com/437958/how-to-use-the-chmod-command-on-linux/) can be used with other commands such as ls -l to find out what the current state is with permissions, and do something to chnage that state.

The chmod command also comes into play when it comes to making a bash script, or any script exacute without having to call the command to do so first. When working out a script for automating work there is placing a shebang at the top of the file to let Linux know what binary needs to be used to run the script. However in order to make use of it the script needs to become exacutabule first, and one way to do that is by using the Linux chmod command.

<!-- more -->

## 1 - Making a script exacutabule, or not, with +x and -x

### 1.1 - start with a script

```bash
#!/bin/bash
echo "hello world"
```

### 1.2 - calling the script with the binary

```
$ bash basic.sh
hello world
```

```
$ ./basic.sh
bash: ./basic.sh: Permission denied
```

### 1.3 - Checking status of script, and making it exacutabule with chmod +x

```
$ ls -l basic.sh
-rw-r--r-- 1 pi pi 30 Nov 13 11:11 basic.sh
```

```
$ chmod +x basic.sh
$ ls -l basic.sh
-rwxr-xr-x 1 pi pi 30 Nov 13 11:11 basic.sh
$ ./basic.sh
hello world
```

### 1.4 - Make the script NOT exacutabule any more with chmod -x

```
$ ls -l basic.sh
-rwxr-xr-x 1 pi pi 30 Nov 13 11:11 basic.sh
$ chmod -x basic.sh
$ ls -l basic.sh
-rw-r--r-- 1 pi pi 30 Nov 13 11:11 basic.sh
$ ./basic.sh
bash: ./basic.sh: Permission denied
```