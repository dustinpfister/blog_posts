---
title: GCC Linux C compiler and C langaue hello world programs
date: 2020-11-17 09:31:00
tags: [linux]
layout: post
categories: linux
id: 743
updated: 2020-11-17 11:32:39
version: 1.3
---

The Linux gcc command is a C language compliler that is right there to work with if one wants to get into C programing in a linux system. I took a moment to start playing around with it, and just have some fun with a few quick, basic, C language hello world programs.

I am very much a javaScript developer, and as such I have been shying away from C for a long time. There is much about the langauge that strikes me as being very intense and time consuming. In javaScipt I like having things going on like garbage collection, and dynamic typing. Sure javaScript is like riding a bike with training weels, but it is still very much a bike that will take me places. I have this mindset that what matters most in programing are things that are independant of language. Regardless if a programe is written in javaScript, C, or even something like qBasic what does the programe do? Why would I or anyone else want to use it? The anwsers to those questions are what matter first and for most to me.

However getting back to the topic at hand. I want to start experamenting with at least a few languages outside of javaScript, I still like the language a lot, it is still my prefered langauge by far, however I want to expand at least a little way into some other languages. With that said C has been on my scope for a long time, and I thoughjt that it coult not hurtto work out at least a few quick hello world C examples that I would then build using the Linux gcc command. So lets get to it then.

<!-- more -->

## 1 - Linux gcc and C Hello World

In this section I will be going over a very basic Hello world C lanague source code file called hello.c. This source code file is just a very simple typically hello world programe that will just print Hello World to the standard output of the console. I then also worked out a simple bash script that will use gcc to build the hello.c file into a binary called just simply hello. I can then run the binary in the bash shell and get the exspeted result.

When it comes to learning any lanague one has to start somewhere, and this type of programe is just that.

### 1.1 - The hello.c file

Here is the source code that I cam up with by just searching for a simple C langaue hello world program. It makes use of just one library called stdio.h wich provides the printf function along with many other useful basic tools when it comes to working with standard output.

```c
#include <stdio.h>
int main() {
   printf("Hello World\n");
   return 0;
}
```

### 1.2 - The build.sh script

I then made a simple bash script that wjen called should build the hello.c file into a binary called just hello. In linux systems binarys often seem to have no file name extension like that.

```bash
#!/bin/bash
gcc -Wall hello.c -o hello
```

### 1.3 - Building my first C Programe with gcc

So when I run my build.sh script gcc compiles by hello.c into a hello binary. When I call my hello binary i end up getting the exspected result in my console.

```
$ chmod 755 build.sh
./build.sh
./hello
Hello World
$ 
```

Well that was fun actually, it may just be a hello world progarme but it was fun to build a very simple yet functioing C binary. I should take a moment to look into making at least a few more C examples though, maybe sticking to what there is to work with in the stdio.h lib. Maybe even touch base on a few other features of gcc in the process, if I get to it.

## 2 - Printing an init value, and an improved build.sh

### 2.1 - The print_int.c file

```c
#include <stdio.h>
int main() {
   int n = 42;
   printf("%d\n", n);
   return 0;
}
```

### 2.2 - Improved build.sh

```bash
#!/bin/bash
buildName=$( echo $1 | cut -d . -f 1 )
gcc -Wall "$1" -o "$buildName"
```

### 2.3 - Looking good

```
$ chmod 755 build.sh
$ ./build.sh print_init.c
$ ./print_init
$ 42
$
```