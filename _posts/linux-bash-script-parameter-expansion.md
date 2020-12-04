---
title: Parameter Expansion in Linux Bash scripts
date: 2020-12-04 11:39:00
tags: [linux]
layout: post
categories: linux
id: 755
updated: 2020-12-04 13:36:58
version: 1.1
---

One core feature of Bash that I have been using all the time when writing [bash scripts](/2020/11/27/bash-scripts/) thus far is Parameter Expansion. There are several froms of Paramater expansion but they all have to do with how to go about creating values for variables and strings to be used with commands. There is the basic braces expansion that is used as a way to seperate a variable name from the rest of a string value, as well as prefrom something know as variable indirection more on that later.

There are also several other froms of paramater expansion, each of which might desirve there own post actually. However I often have a centeral post on topics such as this where I at least cover the basics of each, so this will be that kind of post when it comes to the various forms of paramater expansion in bash.

<!-- more -->

## 1 - Braces and basic Parameter Expansion

To start off with I think the first form of Paramater expansion I should cover is basic braces expansion. This is the process of using the dollar symbol followed by a variable name that is inclosed in braces, or curily brackets if you prefer.

### 1.1 - Basic Braces example of Parameter Expansion in a bash script

A Basic example of why braces are usful in bach would be to try to include the value of a varible in a new string value. When doing so how to you go about setting where the variable name ends, and the rest of the string begins? The awnser to that is to make use of braces which is one from of what is called parameter expansion in bash.


```bash
#!/bin/bash
 
pre="prefix_"
 
# the value can be used just like this
echo $pre
 
# however doing this will result in an attempt to acesss
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

Another important thing to cover when it comes to basic paramter expansion with braces is variable indirection.

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

So say you want the standard output of a command to be the value for a variable. The way to go about doing just that would be to use command subsitiution which is another form of paramater expansion.

### 2.1 - Basic Command substitution example

Here I have a basic example of Command substitution where I am using the result of the who am I command to set the value of a username variable.

```bash
#!/bin/bash
 
userName=$( whoami )
 
echo "The current user is \"${userName}\""
```

## 3 - Arithmetric Expansion

There is then Arithmetric Expansion that is simular to that of command subsitution in terms of the syntax.

### 3.1 - Add to a variable

So say I just want to step the value of a number variable.

```bash
#!/bin/bash
 
a="1"
a=$(( a + 5 ))
 
echo $a #6
```

## 4 - Conclusion

having a solid grasp on paramter expansion is pretty imporatant when it comes to making even basic bash scripts.
