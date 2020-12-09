---
title: Named parameters in Linux Bash scripts
date: 2020-12-09 13:07:00
tags: [linux]
layout: post
categories: linux
id: 758
updated: 2020-12-09 14:21:03
version: 1.2
---

There are basic positional parameters in [bash scripts](/2020/11/27/bash-scripts/) that might be the first way that one learns how to add paramaters to bash scripts. However there should be a way to add [named parameters to a script](https://unix.stackexchange.com/questions/129391/passing-named-arguments-to-shell-scripts) also, and to do so in a way in which it does not take to much time to do so. Often I want to write a bash script that prefroms some kind of task other then that of parsing options.

Well in bash there is a built in command that might prove to be the first solution that comes to midn when it comes to having named paramarters in a script. In this post I will be going over a few examples of that built in command, and also write about other topics that might come up in the process of doing so.

<!-- more -->

## 1 - basic getopts examples

### 1.1 - getopts parameters that exspect an argument

```bash
#!/bin/bash
 
getopts ":f:" opt;
echo $opt
echo $OPTARG
 
if [ $opt = "f" ]; then
  echo "file ${OPTARG} given"
  cat ${OPTARG} | base32
fi
```

## 2 - getopts and a while loop

```bash
#!/bin/bash
 
## defaults
target="./project-folder"
mode="read"
 
while getopts ":t:m:" opt; do
  case $opt in
    t) target="$OPTARG"
    ;;
    m) mode="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done
 
echo " target folder: ${target}"
echo " mode: ${mode}"
```

## 3 - getopts wc script example

```bash
#!/bin/bash

## defaults
source="./text-collection"
mode="cat"
 
while getopts ":s:m:" opt; do
  case $opt in
    s) source="$OPTARG"
    ;;
    m) mode="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done
 
catFiles(){
  echo -n $(eval "ls ${source}/*.txt | xargs cat")
}
 
# mode: 'cat'
# in cat mode just concat the source files and spit out the result
# to the standard output
if [ $mode = "cat" ]; then
   catFiles
   echo ""
fi
 
# mode: 'wc'
# in wc mode give a word count
if [ $mode = "wc" ]; then
   catFiles | wc -w
fi
```

## 4 - Conclusion

That is it for named parameters in bash shell scripts, when it comes to additional resources on bash the best option if of course the [manual page on bash](https://linux.die.net/man/1/bash). The manual is very long, and does not include a lot of examples, which warrents a need for posts like this. Still the man page will cover the topic of named parameters with the getopts built in bash command, and a whole lot more in great detail.