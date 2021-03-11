---
title: Case AKA Switch statements in Linux Bash Scripts
date: 2021-03-11 15:07:00
tags: [linux,js]
layout: post
categories: linux
id: 821
updated: 2021-03-11 15:22:30
version: 1.2
---

When it comes to writing bash scripts I might need to write a [case statement](https://linuxize.com/post/bash-case-statement/) or two once in a while. In just about any programing language there are if statements as a way to go about creating a conditional, however there are often switch statements also as another option when it comes to the subject of control flow. In bash script there are of course if statements, but the scripting lanague also supports switchs it is just that they are often called a case instead actually sense that is the built in bash feature that needs to be used to create one.

<!-- more -->

## 1 - Basic case example

To create a switch in a bash script first I need to type case, followed by a value by which to have case statements for, then the in keyword to finish the line. After that I just need to have at least a few statements for the various cases of values that could happen. To do so I just need to start off with a value followed by a closing parenetese, after that I can do whaever needs to be done for that case and end with two simi colens as a way to termanate a condition.

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
