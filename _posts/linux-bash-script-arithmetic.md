---
title: Arithmetic in Linux Bash scripts
date: 2020-12-03 13:45:00
tags: [linux]
layout: post
categories: linux
id: 754
updated: 2020-12-03 17:37:02
version: 1.10
---

When it comes to [Arithmetic](https://ryanstutorials.net/bash-scripting-tutorial/bash-arithmetic.php) in [bash scripts](/2020/11/27/bash-scripts/) it would seem that doing some basic operations can be done, however when it comes to doing anything a little advanced it might be best to wrap another programing environment.

For the most part I would say that I do not need to do any advanced programing with bash scripts when it comes to working out some kind of complicated expression. The use case for bash scripts is that it just needs to work okay as a glue of sorts between applications, and to serve as a way to make it so I do not have to type a long string of commands in every time. So far I can not say that I need to do much beyond just simple addition and subtraction actually, and if I ever end up in a situation in which I need to do something a little advanced, it might be best to do that in another language such as javaScript, or python.

Still some basic Arithmetic is possible with bash alone, and in this post I will be going over some basic examples of how to preform some basic addition, and subtraction operations. I could get into some more complex expressions, but doing so often might require wrapping a more advanced programing environment and when doing that it might be best to just work out what I need to do as a program written in that environment.

<!-- more -->

## 1 - Bash script Arithmetic basics

There are two ways that I find myself going about doing basic arithmetic in bash, one of which is the use of Arithmetic expansion. This I have found is the most robust form of doing basic math operations in bash, however there are a few other ways to create basic expressions.

In this section I will just be going over some very basic examples of arithmetic using the various methods of doing so that I am familiar with.

### 1.1 - Arithmetic Expansion

Arithmetic Expansion is thus far the way that I often go about creating basic expressions in bash. There are several forms of what us referred to as parameter expansion in the bash man page. It is a good idea to become familiar with the various other forms of expansion that are there to work with, but that might be a matter for another post.

This kind of expansion works by typing a dollar sign followed by two sets of parentheses. Inside this set of double parentheses I write the expression that I want to have evaluated to a result. The result I can then save to a variable to be used with a command like echo.

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

Another way to create basic expressions would be to use the let command. This might be a cleaner way of going about creating expressions as I do like the readability of this better.

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

There might be a few other commands and tricks when it comes to basic expressions using just bash. However there are limits to what can be done when it comes to working something out that is a little advanced. When it comes to working out a complex expression there is a certain line where once crossed the only way to get it done is to just switch to another language that is a little more capable.

## 2 - Doing some advanced expressions by piping javaScript code to node

Bash has its limits when it comes to working out expressions. If I do need to do anything that is a little complex bash will just not cut it. However when it comes to bash scripts I do have a whole world of Linux commands to work with, and one such command is of course nodejs.

It would be best to make a completely separate program all together in javaScript when it comes to using node as a way to do some real expressions. However there are a few command line options with node that can be used to just evaluate a little javaScript by way of command arguments. In addition another option is to pipe in some javaScript code.

### 2.1 - basic bash script that pipes a javaScript expression into node

One option is to have a very simple line of javaScript where I am just injecting a javaScript expression into a single call of console.log. If you are not familiar with node, and javaScript console.log is a way to spit something out to the standard output with a line break attached to the end.

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

Thankfully there is not much need to do any complicated math when it comes to bash scripts. If I ever do get into a situation in which I need to work something out that is a little involves then I might need to ditch bash all together and just work in javaScript completely to work out the code.

## 3 - Conclusion

When working out bash scripts thus far the math involved is typically not that advanced. The bash arithmetic expansion syntax works okay when it comes to things like stepping a variable in a loop, and other basic tasks that is called for in a bash script.

When it comes to doing some serious math it might be best to switch to another language. Maybe high level languages such as javaScript allow for piping some code in and have it run and spit out a result. However in the long run when it comes to getting into some advanced bash is just not the language to do it in. The main use case of bash scrips is to call and use applications, pipe the standard output of one to another, call a program a whole bunch of times for each file in a folder and so forth. I can not say that bash is a great language for writing applications though.
