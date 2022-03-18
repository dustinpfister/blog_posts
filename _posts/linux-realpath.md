---
title: Resolve to an absolute path with the Linux realpath command as well as a few others
date: 2022-03-18 11:42:00
tags: [linux]
layout: post
categories: linux
id: 969
updated: 2022-03-18 12:02:03
version: 1.3
---

When writing a [bash script](/2020/11/27/linux-bash-script/) or two I will often want to resolve a relative path to an absolute one. For this kind of task there is using the Linux dirname command to get a folder from a path that might contain a file in the path string, but the resulting path might end up being a relative path rather than and absolute one, so then there is piping that result to an additional command called the [Linux realpath command](https://linux.die.net/man/1/realpath). 

In some cases I might also want to get the filename also when working with paths and for that sort of thing there is the [basename command](/2021/07/07/linux-basename/). However in this post I will mainly be focusing on the use of the realpath command and the dirname command to resolve a relative path to not just resolve an absolute path but also to get a folder name rather than a path that induces a filename. This is a typical thing that I am going to want to do when writing bash scripts as there might be additional scripts and other assets in the folder in which the script is being called that I will want to run or use in some way, and I want to be able to get paths to those resources in a way in which the script will still work if the containing folder is move somewhere else.


<!-- more -->

## 1 - Basic realpath example

```
$ cd ~
$ realpath ./.bashrc
/home/pi/.bashrc
```

## 2 - bash script example

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

## 3 - Get path to script with dirname, xargs, and realpath

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

