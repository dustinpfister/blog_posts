---
title: Arrays in Linux Bash scripts
date: 2020-12-07 13:16:00
tags: [linux]
layout: post
categories: linux
id: 756
updated: 2020-12-07 13:25:26
version: 1.1
---

Arrays in [bash scripts](/2020/11/27/bash-scripts/) can be indexed or associative. There is a simple syntax that can be used to create indexed arrays with ease, and the declare bash built in command that can be used to create associative arrays.

There is not just the question of how to go about creating an array in bash, but there is also how to go about looping over them, and prefrom all kinds of various tasks that one might be familout with in other lanagues. Keep in mind that there is much that is lacking when it comes to things like class methods for example. However the basic functionalituy that one might exspect in a langaue such as bash is very much there.

<!-- more -->

## 1 - Create Indexed Arrays


### 1.1 - bracket syntax

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

```bash
#!/bin/bash

# must use declare with the -A option
# to create an Associative array
declare -A arr
arr["one"]="1"
arr["two"]="2"
 
echo ${arr[@]} "2 1"
```
