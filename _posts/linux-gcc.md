---
title: GCC Linux C compiler and C langaue hello world programs
date: 2020-11-17 09:31:00
tags: [linux]
layout: post
categories: linux
id: 743
updated: 2020-11-17 09:50:50
version: 1.1
---

The Linux gcc command is a C language compliler that is right there to work with if one wants to get into C programing in a linux system. I took a moment to start playing around with it, and just have some fun with a few quick, basic, C language hello world programs.

I am very much a javaScript developer, and as such I have been shying away from C for a long time. There is much about the langauge that strikes me as being very intense and time consuming. In javaScipt I like having things going on like garbage collection, and dynamic typing. Sure javaScript is like riding a bike with training weels, but it is still very much a bike that will take me places. I have this mindset that what matters most in programing are things that are independant of language. Regardless if a programe is written in javaScript, C, or even something like qBasic what does the programe do? Why would I or anyone else want to use it? The anwsers to those questions are what matter first and for most to me.

However getting back to the topic at hand. I want to start experamenting with at least a few languages outside of javaScript, I still like the language a lot, it is still my prefered langauge by far, however I want to expand at least a little way into some other languages. With that said C has been on my scope for a long time, and I thoughjt that it coult not hurtto work out at least a few quick hello world C examples that I would then build using the Linux gcc command. So lets get to it then.

<!-- more -->

## 1 - Linux gcc and C Hello World

### 1.1 - The hello.c file

```c
#include <stdio.h>
int main() {
   printf("Hello World\n");
   return 0;
}
```

### 1.2 - The build.sh script

```bash
#!/bin/bash
gcc -Wall hello.c -o hello
```

### 1.3 - Building my first C Programe with gcc

```
$ chmod 755 build.sh
./build.sh
./hello
Hello World
$ 
```