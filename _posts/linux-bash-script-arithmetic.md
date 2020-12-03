---
title: Arithmetic in Linux Bash scripts
date: 2020-12-03 13:45:00
tags: [linux]
layout: post
categories: linux
id: 754
updated: 2020-12-03 17:16:04
version: 1.6
---

When it comes to [Atithmetic](https://ryanstutorials.net/bash-scripting-tutorial/bash-arithmetic.php) in [bash scripts](/2020/11/27/bash-scripts/) it would seem that doing some basic opeartions can be done, however when it comes to doing anything a little advanced it might be best to wrap another programing enviorment.

For the most part I would say that I do not need to do any advanced porgraming with bash scripts when it comes to working out some kind of complacted expression. The use case for bash scripts is that it just needs to work okay as a glue of sorts between applactions, and to erve as a way to make it so i do not have to type a long string of commands in every time. So far I can not say that I need to do much beyond just simple addition and subtraction actually, and if I ever end up in a situstion in which I need to do something a little advanced, it might be best to do that in another langaue such as javaScript, or python.

Still some basic Atithmetic is possible with bash alone, and in this post I will be going over some basic examples of how to prefrom some basic addition, and subtraction operations. I could get into some more complex expressions, but doing so often might require wrapping a more advenced programing enviorment and when doing that it might be best to just work out what I need to do as a programe written in that enviorment.

<!-- more -->

## 1 - Bash script Arithmetric basics

There are two ways that I find myself going about doing basic arithmetric in bash, one of which is the use of Arithmetric expansion. This I have found is the most robust form of doing basic math operations in bash, however there are a few other ways to create basic expressions.

In this section I will just be going over some very basic examples of arithmetric using the various methods of doing so that I am familour with.

### 1.1 - Arithmetric Expansion

Arithmetric Expansion is thus far the way that I often go about creating basic expressions in bash. There are several froms of what us refered to as paramater expansion in the bash man page. It is a good idea to become familout with the various other froms of expansion that are there to work with, but that might be a metter for another post.

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

Another way to create basic expressions would be to use the let command.

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

## 2 - Doing some advanced expressions by piping javaScript code to node

Bash has its limits when it comes to working out expressions. If I do need to do anything that is a little complex bash will just not cut it. However when it comes to bash scripts I do have a whole world of Linux commands to work with, and one such command is of course nodejs.

It would be best to make a compleatly seperate programe all togerther in javaScript when it comes to usign node as a way to do some real espressions. However there are a few command line options with node that can be used to just evaluate a little javaScript by way of command argumnets. In addition another option is to pipe in some javaScript code.

### 2.1 - basic bash script that pipes an expression into node

One option is to have a very simple line of javaScript where I am just injecting a javaScript expression into a single call of console.log. If you are not familour with node, and javaScript console.log is a way to spit something out to the standard output with a line break attached to the end.

So I could just create a simple bash function that will create a line of javaScript using console.log with a javaScript expression given as an argument injecting in as what will be log out to the standard output.

```bash
#!/bin/bash
 
eval(){
  js="console.log(${1})"
  echo $( echo -en $js | node )
}
 
eval "5+5" # 10
eval "\"5\"+5" # '55'
eval "(Math.cos(Math.PI/180*45)*100).toFixed(2)" # 70.71
```

So then this is one way to go about doing some fairly complex expressions if I can just work out what the javaScritp code should be. However there is one draw back and that is that the results will happen real slow this way.

Thankfully there is not much need to do any complacted math when it comes to bash scripts. If I ever do get into a sitsution in which I need to work soemthing out that is a little involves then I might need to ditch bash all otherger and just work in javaScript compleatly to work out the code.

## 3 - Conclusion

When working out bash scripts thus far the math involved is typically not that advanced. The bash atirthmtic expansion syntax works okay when it comes to things like steping a variabe in a loop, and other basic tasks that is called for in a bash script.
