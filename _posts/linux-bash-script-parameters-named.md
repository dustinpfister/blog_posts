---
title: Named parameters in Linux Bash scripts
date: 2020-12-09 13:07:00
tags: [linux]
layout: post
categories: linux
id: 758
updated: 2022-03-30 15:10:12
version: 1.19
---

There are basic positional parameters in [bash scripts](/2020/11/27/linux-bash-script/) that might be the first way that one learns how to add parameters to bash scripts. However there should be a way to add [named parameters to a script](https://unix.stackexchange.com/questions/129391/passing-named-arguments-to-shell-scripts) also, and to do so in a way in which it does not take to much time to do so. Often I want to write a bash script that preforms some kind of task other then that of parsing options.

Well in bash there is a built in command that might prove to be the first solution that comes to mind when it comes to having named parameters in a script. In this post I will be going over a few examples of that built in command, and also write about other topics that might come up in the process of doing so.

<!-- more -->

## 1 - Basic Named parameter examples using the getopts bash built in command

The bash command comes with a bunch of built in commands to preform a number of tasks. One such built in command is the [getopts command](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-getopts) that can be used to create named parameter options for a bash script. There are limitations with this command such as being limited to single character options for the script. However unless I am making a script that is fairly complex this option for named parameters should work okay in most situations.

### 1.1 - getopts parameters that expect an argument

If I want to add options that will take an argument after it is used then I will want to use a colon in the option string. When doing so there will be the variable that I use with the getopts command that will store the value of the current option that is being parsed as always. On top of the usual variable that will home the named parameter that was used the argument that was passed for the named option will be stored in a variable called OPTARG

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

The getopts can be used in a while loop with a case statement. That is that there can be this while loop where I am looping calling the getopts command each time. On each loop the variable that I set with the getopts command will be updated with the current option name, and the \$OPTARG variable will be updated with the current argument for the current option if it is that kin d of option.

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

## 3 - Simple positional arguments in bash, as well as other languages

Although named arguments might just simply be what needs to happen with a major project of some kind often I can not say that I am working on such projects actually. Many of the scripts that I write regardless if they are written in bash, javaScript, or python are scripts that might only just take one or two arguments and that is all. When it comes to writing these kinds of scripts often I might not even bother with named arguments and in stead just look for one or two positional arguments. With that said in this section I will be going over some quick examples of simple, basic positional arguments not just with bash, but also with other languages such a sjavaScript and python.

### 3.1 - Positional arguments in bash

When it comes to positional arguments in bash I just need to look at \$1 forward for each positional argument to see if there is a value there or not. The first given positional will be at $1, the second will be at $2, and so forth while \$0 will be the name of the script if I am calling the script directly by making it executable.

```bash
#!/bin/bash
 
echo $0
echo $1
echo $2
```

```
$ chmod 777 1-pos.sh
$ ./1-pos.sh foo bar
```

### 3.2 - Positional arguments in javaScript

When it comes to nodejs and javaScript there is the argv property of the process object that will contain an array of positional arguments.

```js
#!/bin/env node
let argv = process.argv;
console.log(argv[0], argv[1], argv[2] || '', argv[3] || '');
```

```
$ chmod 777 2-pos.js
$ ./2-pos.js foo bar
```

### 3.3 - Positional arguments in python

When it comes to doing something with python there is the sys standard library that contains an array that is similar to that of the argv array in the process object in nodejs.

```python
#!/usr/bin/python3
import sys
print(sys.argv[0]);
print(sys.argv[1]);
print(sys.argv[2]);
```

```
$ chmod 777 3-pos.py
$ ./3-pos.py foo bar
```

## 4 - getopts wc script example

Now that I have covered the basics of the getopts bash built in command I should make at least one example that shows that this way of creating named parameters for bash scripts works okay. For this example I put together a simple script that will spit out the total word count for a collection of text files, or just concatenate them all which is the default behavior. This script will of course make use of the getopts bash built in, however I will also be making use of a bunch of other bash script features such as functions, conditional statements, and piping.

So when it comes to writing this kind of script there are a few options that I would like to have for such a script. One option is to be able to given the source folder to look at to find text files. Then it would also be nice to have another options that will set the mode of the script. That is that I would like to have more than one mode where the default mode will just concatenate all the files and spit out the result to the standard output, and the other will return a total word count for the collection of content. So then when it comes to this script I will want to have at least two named options one that might be -s that will be used to set the source folder to look in, and the other would be -m to set the mode.

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

So then this script seems to work as expected then when I just give it a source folder without any additional options it will just concatenate the files into one big body of text. However if I do set the mode to wc then it will give a grand total word count of that large body if text thanks to the Linux wc command.

The Linux wc command is a useful command for a wide range of reasons, as the name suggests it can be used to get a word count for a body of text. However it also has a number of other useful options that can be used to get a line count, or the size of the text in terms of bytes. However getting into the depth of the Linux wc command would be off topic.

## 5 - Conclusion

That is it for named parameters in bash shell scripts, when it comes to additional resources on bash the best option if of course the [manual page on bash](https://linux.die.net/man/1/bash). The manual is very long, and does not include a lot of examples, which warrants a need for posts like this. Still the man page will cover the topic of named parameters with the getopts built in bash command, and a whole lot more in great detail.

When it comes to my content here there is my main post on [bash scripts](/2020/11/27/linux-bash-script/), but there is also my post on [parameters in general in bash](/2020/11/16/linux-bash-script-parameters/) that might be worth checking out.
