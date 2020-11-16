---
title: Parameters in Linux Bash Scripts
date: 2020-11-16 13:06:00
tags: [linux]
layout: post
categories: linux
id: 742
updated: 2020-11-16 14:44:30
version: 1.7
---

When writing a [bash script in Linux](https://linux.die.net/man/1/bash) there might come a time where I might want to pass one or more [argumnets for some parameteres for a script](https://www.baeldung.com/linux/use-command-line-arguments-in-bash-script). There is knowing how to access argumnets for a call of a script, and there is also knowing how to find out how many argumnets where given. There is also doing something for all argumnets that are given like how the Linux cat command works when giving file names as arguments. So In this post I will be going over a few quick examples of Linux bash Scripts that make use of one or more arguments that are given at the command line, or whereever the script is called.

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

What if I want to get a count of how many arguments there are when a script is called? For this there is the $# variable which will given the number of argumnets given. This will not count the comamnd or script itself, so if no argumnets are given beyond just calling the script then the value will be zero.

```
#!/bin/bash
echo "num of arguments: ${#}"
```

```
$ chmod 755 count.sh
$ ./count.sh a b c d e f
num of arguments: 6
```

## 3 - Sum example using variable indirection ${!varname} to loop over arguments

When I took a moment to look over the man page on bash, there is a section on _Parameter Expansion_. In this section it explanes something this is called [variable indirection](https://stackoverflow.com/questions/8515411/what-is-indirect-expansion-what-does-var-mean) by making use of an exlamation point inside the body of a pair of currly brackets with the dolar sign symbpol.

In other words this is a way to make the value of a variable be part of the variable name. In other sections in this post I have outlines that the varibles of interest that hold values for argumnets are $0, $1, $2, and so forth. However how do I go about making the value of a varible that is stepped by a rate of one be part of a variable name? The anwser to this problem in bash is variable indirection.

Here I have a sum.sh file that makes use of ${#} to get a count of how many arguments there are. I also have a $i variable that starts at 1 and is steped up by one inside the body of a while loop that will keep going while the value of it is below the number of arguments obtained via ${#}. I am then using the value of $i to resolve to a varible name by making user of ${!i}, the value of which I am storing in $n. I can then tabulate a sum of all the argumnets given by way of adding $sum and $n to $sum which starts at 0.

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

When I test this out it works as exspected, I always get the sum of all the number arguments given.

```
chmod 755 sum.sh
$ ./sum.sh 10 5 7
22
```

## 4 - Another sum example making use of $@ to loop over arguments

Another way to make a script that will loop over all argumnets of a script will be to use $@. This will give an array of the argumnets that can then be used with a for in loop.

```
#!/bin/bash
sum=0
for foo in "$@"
do
  sum=$(( $sum + foo))
done
echo "$sum"
```

```
$ chmod 755 sum_at.sh
$ ./sum_at.sh 5 10
15
```

So then on top of using variable indirection This would prove to be another way to [loop over the argumnets](https://stackoverflow.com/questions/255898/how-to-iterate-over-arguments-in-a-bash-script) that are given when calling a bash script.