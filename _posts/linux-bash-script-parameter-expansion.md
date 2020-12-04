---
title: Parameter Expansion in Linux Bash scripts
date: 2020-12-04 11:39:00
tags: [linux]
layout: post
categories: linux
id: 755
updated: 2020-12-04 15:40:55
version: 1.4
---

One core feature of Bash that I have been using all the time when writing [bash scripts](/2020/11/27/bash-scripts/) thus far is Parameter Expansion. There are several forms of Parameter expansion but they all have to do with how to go about creating values for variables and strings to be used with commands. There is the basic braces expansion that is used as a way to separate a variable name from the rest of a string value, as well as preform something know as variable indirection more on that later.

There are also several other forms of parameter expansion, each of which might deserve there own post actually. However I often have a central post on topics such as this where I at least cover the basics of each, so this will be that kind of post when it comes to the various forms of parameter expansion in bash.

<!-- more -->

## 1 - Braces and basic Parameter Expansion

To start off with I think the first form of Parameter expansion I should cover is basic braces expansion. This is the process of using the dollar symbol followed by a variable name that is enclosed in braces, or curly brackets if you prefer.

### 1.1 - Basic Braces example of Parameter Expansion in a bash script

A Basic example of why braces are useful in bash would be to try to include the value of a variable in a new string value. When doing so how to you go about setting where the variable name ends, and the rest of the string begins? The awnser to that is to make use of braces which is one from of what is called parameter expansion in bash.


```bash
#!/bin/bash
 
pre="prefix_"
 
# the value can be used just like this
echo $pre
 
# however doing this will result in an attempt to access
# a variable '$pretext' which will not result in the desired outcome
echo "$pretext"
 
# So basic braces parameter expansion can be used to use the value of
# '$pre' with the text 'text'
echo "${pre}text"
```

```
$ chmod 755 braces.sh
$ ./braces.sh
prefix_

prefix_text
```

### 1.2 - Uisng a variable value as a variable name with Braces

Another important thing to cover when it comes to basic parameter expansion with braces is variable indirection.

```
#!/bin/bash
 
a="5"
b="10"
currentVar="a"
 
echo ${!currentVar}
 
currentVar="b"
 
echo ${!currentVar}
```

## 2 - Command substitution

So say you want the standard output of a command to be the value for a variable. The way to go about doing just that would be to use command substitution which is another form of parameter expansion.

### 2.1 - Basic Command substitution example

Here I have a basic example of Command substitution where I am using the result of the who am I command to set the value of a user name variable.

```bash
#!/bin/bash
 
userName=$( whoami )
 
echo "The current user is \"${userName}\""
```

## 3 - Arithmetic Expansion

There is then Arithmetic Expansion that is similar to that of command substitution in terms of the syntax.

### 3.1 - Add to a variable

So say I just want to step the value of a number variable.

```bash
#!/bin/bash
 
a="1"
a=$(( a + 5 ))
 
echo $a #6
```

## 4 - Conclusion

Having a solid grasp on parameter expansion is pretty important when it comes to making even basic bash scripts. Much of what a bash script does is to work with Linux commands, and as such there needs to be a way to save the result of a Linux command as a value for a variable as is the case with command substitution. There is also working with the result of a command once it has been set to a variable, as such many of the other aspects of Parameter expansion will come into play.
