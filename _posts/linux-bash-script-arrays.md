---
title: Arrays in Linux Bash scripts
date: 2020-12-07 13:16:00
tags: [linux]
layout: post
categories: linux
id: 756
updated: 2020-12-07 13:47:00
version: 1.3
---

Arrays in [bash scripts](/2020/11/27/bash-scripts/) can be indexed or associative. There is a simple syntax that can be used to create indexed arrays with ease, and the declare bash built in command that can be used to create associative arrays.

There is not just the question of how to go about creating an array in bash, but there is also how to go about looping over them, and prefrom all kinds of various tasks that one might be familout with in other lanagues. Keep in mind that there is much that is lacking when it comes to things like class methods for example. However the basic functionalituy that one might exspect in a langaue such as bash is very much there.

<!-- more -->

## 1 - Create Indexed Arrays

There are several ways to create indexed arrays where each element of the array has a numbered rather than named key value. In this section I will just be quckly going over a few ways to go abotu creating these kinds of arrays in bash. In the process of doing so I will also be touching base on basic curly bracket paramater expansion which is the way that one will want to go about accessing elememt values of an array once one is created.

### 1.1 - bracket syntax

One pretty simple way to go about creating a basic indexed array is to just use a bracket syntax with the variable name.

```bash
#!/bin/bash

# One way to create an array is to just use a square 
# bracket syntax like this:
arr[0]="one"

# additional elements can be added by just changing
# the index value
arr[1]="two"
arr[2]="three"

# curly bracket parameter expansion is your friend
# when it comes to accessing values
echo $arr # "one"
echo ${arr[1]} # "two"
echo ${arr[@]} # "one two three"
```

### 1.2 - expression syntax

Expressions are another way to create indexed Arrays.

```bash
#!/bin/bash
 
# another way is to create an expression
# like this:
arr=("one" "two" "three")
 
echo $arr # "one"
echo ${arr[1]} # "two"
echo ${arr[@]} # "one two three"
```

## 2 - Create associative Arrays

To create an associative array the declare bash built in command can be used with the -A option to do so. Once that is done the process of adding elements is the same as indexed ones, only I just give a named key value rather than a numbered one.

```bash
#!/bin/bash
 
# must use declare with the -A option
# to create an Associative array
declare -A arr
arr["one"]="1"
arr["two"]="2"
 
echo ${arr[@]} "2 1"
```

## 3 - Conclusion

Of course the best source on Arrays in bash, and using bash in general might be to check out the [man page on bash](https://linux.die.net/man/1/bash). Of course the man page is one real long sucker and it can take a while to read through the whole thing, but if you really want to learn bash that will be the man source.

There are a number of other [posts on Arrays in bash](https://opensource.com/article/18/5/you-dont-know-bash-intro-bash-arrays) on the open internet of course also where the topic is just on arrays alone though. Also it is ture that a man page does not always do the best job of convarying something, and it can never hurt to have more actaul examples of a certian something with bash.