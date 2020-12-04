---
title: Parameter Expansion in Linux Bash scripts
date: 2020-12-04 11:39:00
tags: [linux]
layout: post
categories: linux
id: 755
updated: 2020-12-04 16:13:31
version: 1.13
---

One core feature of Bash that I have been using all the time when writing [bash scripts](/2020/11/27/bash-scripts/) thus far is [Parameter Expansion](https://wiki.bash-hackers.org/syntax/pe). There are several forms of Parameter expansion but they all have to do with how to go about creating values for variables and strings to be used with commands. There is the basic braces expansion that is used as a way to separate a variable name from the rest of a string value, as well as preform something know as variable indirection more on that later.

There are also several other forms of parameter expansion, each of which might deserve there own post actually. However I often have a central post on topics such as this where I at least cover the basics of each, so this will be that kind of post when it comes to the various forms of parameter expansion in bash.

<!-- more -->

## 1 - Braces and basic Parameter Expansion

To start off with I think the first form of Parameter expansion I should cover is basic braces expansion. This is the process of using the dollar symbol followed by a variable name that is enclosed in braces, or curly brackets if you prefer. Just this kind of paramater expansion alone is maybe not so basic actually as there are several uses for it. However all uses have to do with accessing the values of variables, and all kinds of variables supported in bash including Arrays. So there should be at least a few examples of this kind of paramater expansion to start off with.

### 1.1 - Basic Braces example of Parameter Expansion in a bash script

A Basic example of why braces are useful in bash would be to try to include the value of a variable in a new string value. When doing so how to you go about setting where the variable name ends, and the rest of the string begins? The answer to that is to make use of braces which is one from of what is called parameter expansion in bash.


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

### 1.2 - Using a variable value as a variable name with Braces

Another important thing to cover when it comes to basic parameter expansion with braces is variable indirection. This is a way to make it so that the value of a variable is what is used for the name of a variable. A basic example of this one be that I have two variable one named a and the other b, I then have another variable that stores the name of one of these variables. The use of braces parameter expansion that starts off with an exclamation point can be used as a way to have it so the value of the current var variable is used as a reference to another variable rather than the name of the variable.

```bash
#!/bin/bash
 
a="5"
b="10"
currentVar="a"
 
echo ${!currentVar} # 5
 
currentVar="b"
 
echo ${!currentVar} # 10
```

This will come up now and then so it is a good one to keep in mind.

### 1.3 - Arrays and braces

The braces syntax is what will also need to be used in order to get a certain indexed element in an array, or the array as a whole. In bash there are a few ways to create an array, but in any case onced one has an array the braces form of parameter expansion can be used as a way to get an index value by just intrducing a set of square brackets after the varibel name inside the set of braces.

The index of the desired element can then be given to get the value of that element, in addition the at symbol can be given in the square brackets as a way to get the array as a whole.

```bash
#!/bin/bash
 
a=()
a[0]="one"
a[1]="two"
a[2]="three"
 
echo "${a} + ${a[1]} = ${a[2]}" # "one + two = three"
echo "${a[@]}" # "one two tree"
```

## 2 - Command substitution

So say you want the standard output of a command to be the value for a variable. The way to go about doing just that would be to use command substitution which is another form of parameter expansion. This kind of parameter expansion is similar to that of the braces expansion only parentheses are used rather than braces.

It should go without saying that this is a pretty central part of writing bash scripts. So at least a few examples might be called for when it comes to this subject.

### 2.1 - Basic Command substitution example

Here I have a basic example of Command substitution where I am using the result of the who am I command to set the value of a user name variable. The standard output of the command can be saved to a variable with command substitution and then that result can be used with another command such as the echo command.

```bash
#!/bin/bash
 
userName=$( whoami )
 
echo "The current user is \"${userName}\""
```

## 3 - Arithmetic Expansion

There is then Arithmetic Expansion that is similar to that of command substitution in terms of the syntax. In fact it is almost the same syntax the only note worth difference is that I just need to double up the parentheses. Inside this set of double parentheses I can so some basic arithmetic when it comes to things like stepping a counter variable.

There are limits when it comes to the kind of math that can be done with bash, however when it comes to the typical kinds of tasks required for bash scripts Arithmetic Expansion works well enough. If I need to do something a little advanced then I would want to write the expression in another language though.

### 3.1 - Add to a variable

So say I just want to step the value of a number in a variable. What I can do is set the value of a variable to a certain starting value, and then just add the variable to the amount that I want to add to it.

```bash
#!/bin/bash
 
a="1"
a=$(( a + 5 ))
 
echo $a #6
```

## 4 - Conclusion

Having a solid grasp on parameter expansion is pretty important when it comes to making even basic bash scripts. Much of what a bash script does is to work with Linux commands, and as such there needs to be a way to save the result of a Linux command as a value for a variable as is the case with command substitution. There is also working with the result of a command once it has been set to a variable, as such many of the other aspects of Parameter expansion will come into play.
