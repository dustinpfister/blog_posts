---
title: Parameters in Linux Bash Scripts
date: 2020-11-16 13:06:00
tags: [linux]
layout: post
categories: linux
id: 742
updated: 2020-11-16 14:09:02
version: 1.2
---

When writing a bash script in Linux there might come a time where I might want to pass one or more argumnets for some parameteres for a script. There is knowing how to access argumnets for a call of a script, and there is also knowing how to find out how many argumnets where given. There is also doing something for all argumnets that are given like how the Linux cat command works when giving file names as arguments. So In this post I will be going over a few quick examples of Linux bash Scripts that make use of one or more arguments that are given at the command line, or whereever the script is called.

<!-- more -->

## 1 - Basic Linux Bash Script with a Single Parameter

To start off with how about just a simple bash script that takes just one argument. A sort of Bash Script Paramater Hello world for what it is worth. With that said there are a few Variables to work with inside a bash script that are references to each argument that is passed when the script is called. They all start off with the dollar sign symbol for starters followed by a number from zero upwards. Zero will be a refernce to the command or script that is called, and then one forwards will be all the argumnets for the call of the script.

So then Say I just want to make a sumple hello world example of paramaters in bash scripts. I would start off with the bash shebang as always for a script. Followed by just using the echo command to echo out hello followed by whatever is passed as the first arguemnt by way of using $1.

So Something like this:

```
#!/bin/bash
echo "Hello $1"
```

That I would then save as something like basic.sh, after that I just need to make it exacutabule, and then call it passing what I want as the first argument.

```
$ chmod 755 basic.sh
$ ./basic.sh "World"
Hello World
```

So then there is a basic hello world example of a paramater in bash. However there are at least a few more things to cover beyond this when it comes to fiding out how many arguments are passed. There are a few other related topics that might come up when it comes to this also, so lets look at a few more examples of paramaters in bash scripts then.

## 2 - Get a count of the number of arguments given

```
#!/bin/bash
echo "num of arguments: ${#}"
```

```
$ chmod 755 count.sh
$ ./count.sh a b c d e f
num of arguments: 6
```

## 3 - Sum example using variable indirection ${!varname}

```
#!/bin/bash
i=1
sum=0
while [ $i -le ${#} ]
do
  n=${!i}
  sum=$(( $sum + $n))
  i=$(( $i + 1 ))
done
echo "$sum"
```

```
chmod 755 sum.sh
$ ./sum.sh 10 5 7
22
```
