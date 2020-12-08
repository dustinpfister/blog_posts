---
title: Special parameters in Linux Bash scripts
date: 2020-12-08 12:41:00
tags: [linux]
layout: post
categories: linux
id: 757
updated: 2020-12-08 13:01:20
version: 1.1
---

So I wrote a [bash scripts](/2020/11/27/bash-scripts/) post on positional paramaters which might be the first thing most people will think of when it comes to paramaters for a script. However it is imporant to refer to them as positional paramaters rather than just simply paramaters becuase yet there is more than one set of paramaters at play when a script is called.

There are of course posiitonal paramaters such as $0, $1, $2, and so forth as covered on my post on positional paramaters. these paramters refer to the name of the command called followed by each option that is sepearted by a space. However there is also a number of Special parameters in bash also such as $@ that is a way to quickly expand all of these positional paramaters, and $# that will give a count of these. So if I aim to write an comperhesive collection of posts on the features of bash scripts it is called for to write one on these speshal paramaters. In this post I will be going over these with at least one basic example of each.

<!-- more -->

## 1 - Expand all positional paramaters ( $@ )

The first Special parameter that comes to mind is the $@ paramter that will expand all positional paramaters that where given when the script was called.

```bash
#!/bin/bash
echo "positionals: $@"
```

```
$ ./basic_call.sh
positionals: foo bar baz
```

## 2 - Expand all positional paramaters with IFS ( $* )

There is another special paramater that can be used to expand all position paramaters but will take into account the current value of IFS (The Internal Field Separator). This is a value that can be set in a script that will be used as a standard feild separator for things such as this special paramater. Aslide from this it works more or less the same way as the $@ paramater

```bash
IFS="-"
echo "positionals: $*"
```

```
$ chmod 755 ifs.sh
$ ./ifs.sh foo bar baz
positionals: foo-bar-ba
```
