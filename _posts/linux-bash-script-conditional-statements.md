---
title: Conditional Statements in Linux Bash scripts
date: 2020-12-01 10:527:00
tags: [linux]
layout: post
categories: linux
id: 753
updated: 2020-12-02 11:14:00
version: 1.2
---

In [bash scripts](/2020/11/27/bash-scripts/) it is possible to define [conditional statements](https://ryanstutorials.net/bash-scripting-tutorial/bash-if-statements.php), or just simply if statements if you prefer. These statements work more or less the same as in many other langauges, however the syntax is of course a little diferent.

if statements are ways to go about making decisions in bash scripts by having some kind of expression that will result in a true of false value. If the expression is true then additional code in the if statement will run, if not it will not. In addition there is also the option of including and else statement where some code that will only run if an expression evalutes to false. 

There are also case statements that are like what is often refered to as a switch statement in other langaues. These kinds of statements can also be thouht of as a kind of conditional statement in bash scripts.

<!-- more -->

## 1 - Basics of conditional statements in bash scripts

There is starting somewhere when it comes to if statements and bash scripts. This is not really a getting started post on bash scripts, but I think that I will start out this section in a way in which it can function as a getting started post. The very first sub section in this section I will be covering a very basic conditional statement if example that should funcion as a decent starting point even for people with zero experence writing bash scripts.

After that I will be getting into a few other very basic if statement examples for conditionals in bash. If you think that you all ready have a solid grasp on the very basics of if statements in bash, you might choose to skip this section to get to a few more advanced examples later in this post.


### 1.1 - Basic if statement example

```
#!/bin/bash
 
a="10"
b="5"
if [ $a -gt $b ]; then
    echo "${a} is greater than ${b}"
fi
echo "done"
```

```
$ chmod 755 gt.sh
$ ./gt.sh
10 is greater than 5
done
```