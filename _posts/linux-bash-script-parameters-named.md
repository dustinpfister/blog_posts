---
title: Named parameters in Linux Bash scripts
date: 2020-12-09 13:07:00
tags: [linux]
layout: post
categories: linux
id: 758
updated: 2020-12-09 14:56:59
version: 1.6
---

There are basic positional parameters in [bash scripts](/2020/11/27/bash-scripts/) that might be the first way that one learns how to add parameters to bash scripts. However there should be a way to add [named parameters to a script](https://unix.stackexchange.com/questions/129391/passing-named-arguments-to-shell-scripts) also, and to do so in a way in which it does not take to much time to do so. Often I want to write a bash script that preforms some kind of task other then that of parsing options.

Well in bash there is a built in command that might prove to be the first solution that comes to mind when it comes to having named parameters in a script. In this post I will be going over a few examples of that built in command, and also write about other topics that might come up in the process of doing so.

<!-- more -->

## 1 - Basic Named parameter examples using the getopts bash built in command

The bash command comes with a bunch of built in commands to preform a number of tasks. One such built in command is the [getopts command](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-getopts) that can be used to create named parameter options for a bash script. There are limitations with this command such as being limited to single character options for the script. However unless I am making a script that is fairly complex this option for named parameters should work okay in most situations.

### 1.1 - getopts parameters that expect an argument

If I want to add options that will take an argument after it is used then I will want to use a colon in the option string.

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

The getopts can be used in a while loop with a case statement. That is that there can be this while loop where I am looping calling the getopts command each time. On each loop the variable that I set with the getopts command will be updated with the current option name, and the /$OPTARG variable will be updated with the current argument for the current option if it is that kin d of option.

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

Now that I have covered the basics of the getopts bash built in command I should make at least one example that shows that this way of creating named parameters for bash scripts works okay. For this example I put together a simple script that will spit out the total word count for a collection of text files, or just concatenate them all which is the default behavior.

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

## 4 - Conclusion

That is it for named parameters in bash shell scripts, when it comes to additional resources on bash the best option if of course the [manual page on bash](https://linux.die.net/man/1/bash). The manual is very long, and does not include a lot of examples, which warrants a need for posts like this. Still the man page will cover the topic of named parameters with the getopts built in bash command, and a whole lot more in great detail.