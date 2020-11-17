---
title: GCC Linux C compiler and C langaue hello world programs
date: 2020-11-17 09:31:00
tags: [linux]
layout: post
categories: linux
id: 743
updated: 2020-11-17 12:15:38
version: 1.7
---

The [Linux gcc](https://linux.die.net/man/1/gcc) command is a C language compliler that is right there to work with if one wants to get into C programing in a linux system. I took a moment to start playing around with it, and just have some fun with a few quick, basic, C language hello world programs.

I am very much a javaScript developer, and as such I have been shying away from C for a long time. There is much about the langauge that strikes me as being very intense and time consuming. In javaScipt I like having things going on like garbage collection, and dynamic typing. Sure javaScript is like riding a bike with training weels, but it is still very much a bike that will take me places. I have this mindset that what matters most in programing are things that are independant of language. Regardless if a programe is written in javaScript, C, or even something like qBasic what does the programe do? Why would I or anyone else want to use it? The anwsers to those questions are what matter first and for most to me.

However getting back to the topic at hand. I want to start experamenting with at least a few languages outside of javaScript, I still like the language a lot, it is still my prefered langauge by far, however I want to expand at least a little way into some other languages. With that said C has been on my scope for a long time, and I thoughjt that it coult not hurtto work out at least a few quick hello world C examples that I would then build using the Linux gcc command. So lets get to it then.

<!-- more -->

## 1 - Linux gcc and C Hello World

In this section I will be going over a very basic Hello world C lanague source code file called hello.c. This source code file is just a very simple typically hello world programe that will just print Hello World to the standard output of the console. I then also worked out a simple bash script that will use gcc to build the hello.c file into a binary called just simply hello. I can then run the binary in the bash shell and get the exspeted result.

When it comes to learning any lanague one has to start somewhere, and this type of programe is just that.

### 1.1 - The hello.c file

Here is the source code that I cam up with by just searching for a simple C langaue hello world program. It makes use of just one library called [stdio.h](https://www.cplusplus.com/reference/cstdio/) wich provides the [printf function](https://www.cplusplus.com/reference/cstdio/printf/) along with many other useful basic tools when it comes to working with standard output.

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

I should take at least one or two more steps beyond just a simple hello world example with this, just printing hello world to the console alone is not a good stoping point for me at least. I may or may not get into writing a collection of posts on C programing, but without even going that far there is the question of what the next step is from hello world. For me it seems like that next step is how to go about printing a number rather than a string to the console.

In javaScript doing so is just as simple as printing a string more or less, javaScript is a typeless langauge after all. However that is not the case with c of course I can not just pass an int for a paramter of a function where a string is what is exspected. 

### 2.1 - The print_int.c file

With C I am dealing with string typing, and with that said I can not just pass a number for an argument where a string is exspected. Still doing so is not at all that much harder, in fact I can use the same printf method to do so by passing the init as a second argument and then using a pattern in the string that I pass as the first.

```c
#include <stdio.h>
int main() {
   int n = 42;
   printf("%d\n", n);
   return 0;
}
```

### 2.2 - Improved build.sh

For this example I made an improved build.sh script that will work not just with this source file, but any file that I want to build with gcc. With this script I am just making it so I can give one argument to the script that is the name of the C source file that I want to build. I am then also using the Linux cut command to just cut the file extenstion off the end of the file name to produce a name for the output file to create with Linux gcc.

```bash
#!/bin/bash
buildName=$( echo $1 | cut -d . -f 1 )
gcc -Wall "$1" -o "$buildName"
```

### 2.3 - Looking good

So this example seems to work as it should for me also.

```
$ chmod 755 build.sh
$ ./build.sh print_init.c
$ ./print_init
$ 42
$
```

So now I have worked out how to just print a string to the console, and now a number. The process is not so hard of course I can just stick to using just this one simple libray that can eb used to just print things out to the standard output. There are a few more basic things that come to midn though that I should get to with this post, so lets look at some of the other methods in this basic c library.

## 3 - Conclusion

So this was fun to take a moment to play around with gcc for a little while. I was wondering to myself how hard could it be to just cereate a few very basic hello world style examples with the C langaue and build them with gcc? As I exspected it was not so hard. The next step from here is to maybe start a collection of a few posts on creating a few simple programes written in C and compiled with gcc. I might get around to doing that at some point, if so I am sure I will end up editing, and expanding this post as needed.