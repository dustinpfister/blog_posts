---
title: Resolve to an absolute path with the Linux realpath command as well as a few others
date: 2022-03-18 11:42:00
tags: [linux]
layout: post
categories: linux
id: 969
updated: 2022-03-18 13:02:07
version: 1.13
---

When writing a [bash script](/2020/11/27/linux-bash-script/) or two I will often want to resolve a relative path to an absolute one. For this kind of task there is using the Linux dirname command to get a folder from a path that might contain a file in the path string, but the resulting path might end up being a relative path rather than and absolute one, so then there is piping that result to an additional command called the [Linux realpath command](https://linux.die.net/man/1/realpath). 

In some cases I might also want to get the filename also when working with paths and for that sort of thing there is the [basename command](/2021/07/07/linux-basename/). However in this post I will mainly be focusing on the use of the realpath command and the dirname command to resolve a relative path to not just resolve an absolute path but also to get a folder name rather than a path that induces a filename. This is a typical thing that I am going to want to do when writing bash scripts as there might be additional scripts and other assets in the folder in which the script is being called that I will want to run or use in some way, and I want to be able to get paths to those resources in a way in which the script will still work if the containing folder is move somewhere else.


<!-- more -->

## 1 - Basic realpath example

The basic idea of the realpath command is that it will just resolve a relative path to a filename to an absolute one that is given as an argument. For example if I use the [cd command](/2021/02/10/linux-cd/) to change to the home folder of the current user, and then give a relative path to the realpath command the result in the standard output will be an absolute path to that relative path.

```
$ cd ~
$ realpath ./.bashrc
/home/pi/.bashrc
```

Simple enough, but what if I just want the folder to that file, or just the filename? Well the realpath command is just one tool in the toolbox of commands such as this, other note worthy commands that are also relevant here are dirname, and basename. There is also knowing how to use many of the other features in bash such as piping and parameter expansion to preform various other tasks that are needed to do what is often needed. So lets look at a few more example of this kind of command, and some bash script examples.

## 2 - bash script example

Now for a simple bash script example that makes use of the various commands to see what happens when I feed each of them the relative path of ".". For path scripts I have found that it might not be required to use a shebang at the top of the file, but I still think it is a good practice to do so in order to make it clear that this is a bash script rather than some other kind of script that might be called directly from the command line.

In this script I am using a form of something called [parameter expansion called command substitution](/2020/12/04/linux-bash-script-parameter-expansion/). This allows for me to capture the standra output of the various commands such as basename, dirname, and realpath and use that output as part of a script value that I then use with the [echo bash command built in](/2019/08/15/linux-echo/).

```
#!/bin/bash
 
# cd to user lib locale
cd /usr/lib/locale;
 
# echo with basename, dirname, and realpath with "."
echo -e "\n";
echo -e "**********";
echo "basename: $( basename . )";    # .
echo "dirname: $( dirname . )";      # .
echo "realpath: $( realpath . )";    # /usr/lib/locale
echo -e "**********\n";
```

If you are new to writing bash scripts, then just save the above bash code as something like s2-bash.sh in your home folder. Then open up a terminal window to the folder that contains the script and use chmod to make the script executable. After that the script ca be called directly without having to call the bash command first.

```
$ chmod 777 s2-bash.sh
./s2-bash.sh
```


## 3 - Get path to script with dirname, xargs, and realpath

Now that I have some basic examples out of the way when it comes to using the realpath command and writing a basic bash script I am now going to want to make at least one if not more basic bash script examples here. With that said when making a bash script I will often want to know what the current working path is, but I might also want to know what the path is that contains the script that is running. Often these two paths might be the same, but in some cases they are not so I need a way to get this value. 

Getting the current working directory is simple enough as I can just use the pwd command, but getting the script path might require a little legwork. When it comes to [positional parameters](/2020/12/10/linux-bash-script-parameters-positional/) the very first positional should be the path to the current script when calling a bash script directly that has been made executable. The path however might be relative though, and on top of that it will contain the file name of the script also. So then I will want to use the dirname command to just get a folder name, and then also use the relpath command if I want an absolute path. 

So for this bash script example I am creating a variable called dir\_script that will be the absolute path to the current script. I am using command substitution to call the dirname command as passing it the value of the first positional argument, then I am [piping that result](/2020/10/09/linux-pipe/) to the [xargs command](/2020/09/26/linux-xargs/) that I am using the realpath so that the piped in result of dirname is used to realpath. The end result is then an absolute path to the folder that contains the script that I can then use as a base path for anything else that I might want from that location, such as additional scripts or other assets related to the use of the bash script.

```
#!/bin/bash

# getting absolute path for the folder that contains this
# script by using dirname with $0 and piping that to xargs
# which in turn is using realpath
dir_script=$(dirname "$0" | xargs realpath)
 
# the path to the script
echo $dir_script
# the raw value of $0
echo $0
```

## 4 - Conclusion

