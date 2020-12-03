---
title: Arithmetic in Linux Bash scripts
date: 2020-12-03 13:45:00
tags: [linux]
layout: post
categories: linux
id: 754
updated: 2020-12-03 16:32:35
version: 1.2
---

When it comes to [Atithmetic](https://ryanstutorials.net/bash-scripting-tutorial/bash-arithmetic.php) in [bash scripts](/2020/11/27/bash-scripts/) it would seem that doing some basic opeartions can be done, however when it comes to doing anything a little advanced it might be best to wrap another programing enviorment.

For the most part I would say that I do not need to do any advanced porgraming with bash scripts when it comes to working out some kind of complacted expression. The use case for bash scripts is that it just needs to work okay as a glue of sorts between applactions, and to erve as a way to make it so i do not have to type a long string of commands in every time. So far I can not say that I need to do much beyond just simple addition and subtraction actually, and if I ever end up in a situstion in which I need to do something a little advanced, it might be best to do that in another langaue such as javaScript, or python.

Still some basic Atithmetic is possible with bash alone, and in this post I will be going over some basic examples of how to prefrom some basic addition, and subtraction operations. I could get into some more complex expressions, but doing so often might require wrapping a more advenced programing enviorment and when doing that it might be best to just work out what I need to do as a programe written in that enviorment.

<!-- more -->

## 1 - Bash script Arithmetric basics

### 1.1 - Arithmetric Expansion

```bash
#!/bin/bash
n="5";
n=$(( n + 1 ))
 
echo $n
```

```
$ chmod 755 arith_exp.sh
./arith_exp.sh
6
```

### 1.2 - The let command

```bash
#!/bin/bash
 
let "a = 1 + 1"
 
let "b = 1 + 5 * 2"
 
let "c = ( 1 + 5 ) * 2"
 
let "sum = a + b + c"
 
echo " $a $b $c $sum "
```

```
$ chmod 755 let.sh
$ ./let.sh
 2 11 12 25
```
