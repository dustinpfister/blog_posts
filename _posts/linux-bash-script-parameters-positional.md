---
title: Positional Parameters in Linux Bash scripts
date: 2020-12-10 12:25:00
tags: [linux]
layout: post
categories: linux
id: 759
updated: 2020-12-10 15:06:57
version: 1.6
---

This post on [bash scripts](/2020/11/27/linux-bash-scripts/) will quikly cover the topic of positional parameters. When it comes to bash scripts there are actually several sets of parameters to be aware of. There is the set of paramerets that have to do with the bash command itself, there are a number of special paramerets to work with, and then there is the set of parameters for the script that is called with bash. I have wrote a post on bash parameterst in general, however in this post the focus will be just on positioanls alone.

So In this post I will be going over a few quick examples of Linux bash scripts that make use of one or more arguments in the form of positional parameters that are given at the command line, or wherever the script is called.

<!-- more -->

## 1 - The basics of positional parameters

So you want to learn what the deal is with paramerets when writing a bash script. Well you have to start somewhere and maybe a good starting point is to lean how to access and make use of positional argumnets. In this section I will be going over just a few quick examples of positionals.

### 1.1 - Basic bash Positional argumnets example

So a Basic positional argument example bash script might look somethiong like this:

```bash
#!/bin/bash
echo "$0 - $1 - $2"
```

I can then save this as something like basic.sh, and then call it in the command line. When doing so I can pass argumnets to the script.

```
$ chmod 755 basic.sh
$ ./basic.js foo bar
./basic.sh - foo - bar
```

## 2 - Positional argumnets and special arguments

Although this is a post just on positional arguments alone I should take a moment to at least cover a few basic examples on special arguments in bash. There are a few special parameters in bash that can be used to get things like the name of the current script that is beging called, and so forth. However when it comes to positional parameters there are two special parameters that comes to mind that might be the most important. One of which helps with getting a count of how many argumnets where passed when the script is called, and the other is how to get a collection of all the argumnets that where given.

So in this section I will be going over a few quick examples of special parameartes in bash.

### 2.1 - Special arguments for getting all positionals and count of positionals

In this example I will be going over two special argumnets that are the first two that I think are the most imporantant when first starting out with writing basic bash scripts. One is the \$\# special parameter that will give me the total count of positionals that where passed and the other is the \$\@ special parameter that will give me the full collecton of positionals.


So if I have a basic bash script like this:

```
#!/bin/bash
echo "number of arguments: $#"
echo "arguments: $@"
```

it will given me a count of argumnets, and all the arguments

```
$ ./basic.sh foo bar baz
number of arguments: 3
arguments: foo bar baz
```

So then these two values can be used to create basic loops that will loop over all of the positionals and do something for each.

## 3 - Positional Parameters and bash Parameters

```
$ bash -c "./basic.sh 1 2"
./basic.sh - 1 - 2
```

### 3.1 - An all.sh file that will log the state of both positionals and bash parameters

```bash
#!/bin/bash
echo "bash: $-"
echo "positionals: $@"
```


### 3.2 - Just calling a script, and calling bash first


```bash
#!/bin/bash
 
echo ""
 
# just calling the script
./all.sh 1 2
 
echo ""
 
# calling bash first with some options
bash -v all.sh 1 2
```

## 4 - Conclusion
