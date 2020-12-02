---
title: Conditional Statements in Linux Bash scripts
date: 2020-12-01 10:527:00
tags: [linux]
layout: post
categories: linux
id: 753
updated: 2020-12-02 11:42:32
version: 1.4
---

In [bash scripts](/2020/11/27/bash-scripts/) it is possible to define [conditional statements](https://ryanstutorials.net/bash-scripting-tutorial/bash-if-statements.php), or just simply if statements if you prefer. These statements work more or less the same as in many other langauges, however the syntax is of course a little diferent.

if statements are ways to go about making decisions in bash scripts by having some kind of expression that will result in a true of false value. If the expression is true then additional code in the if statement will run, if not it will not. In addition there is also the option of including and else statement where some code that will only run if an expression evalutes to false. 

There are also case statements that are like what is often refered to as a switch statement in other langaues. These kinds of statements can also be thouht of as a kind of conditional statement in bash scripts.

<!-- more -->

## 1 - Basics of conditional statements in bash scripts

There is starting somewhere when it comes to if statements and bash scripts. This is not really a getting started post on bash scripts, but I think that I will start out this section in a way in which it can function as a getting started post. The very first sub section in this section I will be covering a very basic conditional statement if example that should funcion as a decent starting point even for people with zero experence writing bash scripts.

After that I will be getting into a few other very basic if statement examples for conditionals in bash. If you think that you all ready have a solid grasp on the very basics of if statements in bash, you might choose to skip this section to get to a few more advanced examples later in this post.


### 1.1 - Basic if statement example

First off I am going to start out with a very basic example of a bash script that just contains a single if statement. This if statement uses and expression with the -gt option to test if one variable is greater than another. If so a custom message will echo out to the standard output. In any case the message done will be ehcoed out to the command line.

```bash
#!/bin/bash
 
a="10"
b="5"
if [ $a -gt $b ]; then
    echo "${a} IS greater than ${b}"
fi
echo "done"
```

If I then save this as something like gt.sh and then use chmod to make the file exacutable I can then run it directly without calling bash first.

```
$ chmod 755 gt.sh
$ ./gt.sh
10 IS greater than 5
done
```

So that is the basic idea of an if statement. You start off with the if keyword followed by an expression inclused within square brackets. After that I must have a then keyword at which point I can do whatever it is that I want to do if the expression evalutaes to true. In then just need to close the if statement by inverting the letters in if.

However there is much more to write about, even when it comes to a basic if statement example such as this. the square bracket syntax is a kind of shortcut for the use of the test command. The test command itself desirves a section in this post, and maybe even a whole post by itself actually.

However for now there is just a bit more to write about when it comes to the very basics of if statements, such as the use of the else keyword. So lets look at a few simple examples of an if statement before moveing on to some more advanced topics.

### 1.2 - Else

```bash
#!/bin/bash
 
a="3"
b="5"
if [ $a -gt $b ]; then
  echo "${a} IS greater than ${b}"
else
  echo "${a} IS NOT greater than ${b}"
fi
echo "done"
```

```
$ ./gt-else.sh
3 IS NOT greater than 5
done
```

## 2 - The Test command

```
#!/bin/bash
 
a=$( test;echo $? )
b=$( test 1 -gt 5;echo $? )
c=$( test 10 -gt 5;echo $? )
 
echo "${a} - ${b} - ${c}"
```

## 3 - A Argumnets Defaults Example of an If Statement

```
#!/bin/bash
 
# give a positional argument for first argument,
# and a default value for the second, the function
# will echo back the argument or default value
opt_default(){
  result=$1;
  default=$2;
  if [ -z $result ]; then
    echo -n $default
  else
    echo -n $result
  fi
}
 
a=$( parse_opt $1 0 )
b=$( parse_opt $2 0 )
 
echo $(( $a + $b ))
```