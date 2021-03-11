---
title: Case AKA Switch statements in Linux Bash Scripts
date: 2021-03-11 15:07:00
tags: [linux,js]
layout: post
categories: linux
id: 821
updated: 2021-03-11 15:47:32
version: 1.7
---

When it comes to writing bash scripts I might need to write a [case statement](https://linuxize.com/post/bash-case-statement/) or two once in a while. In just about any programing language there are if statements as a way to go about creating a conditional, however there are often switch statements also as another option when it comes to the subject of control flow. In bash script there are of course if statements, but the scripting lanague also supports switchs it is just that they are often called a case instead actually sense that is the built in bash feature that needs to be used to create one.

<!-- more -->

## 1 - Basic case examples

In this section I will be starting out with just some basic case examples. The basic process is to have an optening statement where I am defifnig what the variable is to which I want to define some cases for, then a few cases, and then close the statement by typeing the case keyword backwards.

### 1.1 - Very basic example that makes use of a positional argument

To create a switch in a bash script first I need to type case, followed by a value by which to have case statements for, then the in keyword to finish the line. After that I just need to have at least a few statements for the various cases of values that could happen. To do so I just need to start off with a value followed by a closing parenetese, after that I can do whaever needs to be done for that case and end with two simi colens as a way to termanate a condition. I can use an astrist when it comes to defifing what is often called a default case that will be used if no other case is found for the value.

So here is a basic.sh script example where I am using the first positional argument of the script as something to define a case statement for. WHen calling the script I can pass the value 1 as the first argument that will result in True! being echoed, and any other argumnet will cause the word False to be echoed out to the standard output. This might nto be the best example of a case statement as an if statement would also work well for this kind of thing, but I just want something that is a hello world example of sorts, with that said this should do for that.

```
#!/bin/bash
 
bit=$1
case $bit in
  "1")
    echo "True!" 
    ;;
  *)
    echo "False"
    ;;
esac
```

So then if I save this bash script as something like basic.sh, I can then make is exacutabule and run the script. When doing so it will always return false, unless if I pass the value 1 as the first argument.

```
$ chmod 755 basic.sh
$ ./basic.sh
False
$ ./basic.sh 0
False
$ ./basic.sh 1
True!
```

That might be the basic idea there, but a better example would have more than two case statements, otherwise it might be better to just go with an if statement.

### 1.2 - Uisng the date command

This example makes use of the date command, and parameter expansion as a way to go about getting a value that is outputed from the date command. It is then that value to which I define some cases for. Like many Linux commands the date command allows for some options that will reult in custom output from the command, with the date command I can use this to print what the current dat of the week is, and that in turn can be used as a case value to define some cases for.

```
#!/bin/bash
 
today=$(date +"%A")
case $today in
  "Monday")
    echo "It is ${today}, oh boy." 
    ;;
  "Friday")
    echo "Today is ${today}, Hell Yeah!" 
    ;;
  *)
    echo "Today is ${today}"
    ;;
esac
```

This might not be the most practical example of a case statement, however this is a getting staretd section, and basic examples are often like this.

## 2 - Conclusion

So that will be it for now when it comes to case statements and bash scripts. So far I can not say that I use case statemenets that much. however I think that I shouls also say that I am not writing to many bash scripts just yet. Not becuase I do not want to, or think that bash is not such a great envioprment to work in, but just becuase I have so many other pots boiling at this time. I might get around to expanding this post when and if I write more bash scripts where I need to use a case statement. I ofrten will write a new post on the script when doing so, and I will often link to and edit as well as expand posts like this in the proces of doing so.


