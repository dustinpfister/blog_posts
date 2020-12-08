---
title: Special parameters in Linux Bash scripts
date: 2020-12-08 12:41:00
tags: [linux]
layout: post
categories: linux
id: 757
updated: 2020-12-08 13:20:44
version: 1.6
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

## 3 - get a count of positional paramaters ( $# )

Another common task in bash scripts is to get a count of the number of positional argumnets that where given when the script is called. The $# paramater will given this numbre of positionakl argumnets minus the one that is the name of the command.

```bash
#!/bin/bash
echo "positionals count: $#"
```

```
$ chmod 755 count.sh
$ ./count.sh foo bar baz
positionals count: 3
```

## 4 - Exit Status ( $? )

Any bash script or comand will typically exit or end at some point. When this happens there is an exit code that is set. An exit code of zero means that all went well and the script, comand, or test went as exspected with a posative result. Any number other than zero for an exit code means that something went wrong, a test has failed, or some kind of error or problem happened. The $? special paramater is one way to get at the status of this code, and is often useful when workiong something out with the test command.



```bash
#!/bin/bash
test 1 -eq 1
echo "status: $?"
test 2 -eq 1
echo "status: $?"
```

## 5 - option flags ( $- )

So then there are the positional parameters of a script, and there are all of these special paramaters, and then there are the parameters that are given when bash is called. In many of these examples thus far I am calling a script directly, but there is also not bothering with that can calling bash in the command line folowed by the name of the script. When I call the bash script this way there are positional argumnets that I can give for the script, but then there are also all the options that I can set when calling bash. The $- special paramater is one way to expand the state of all of options of the bash command when it was called.

```bash
#!/bin/bash
echo "flags: $-"
```


## 6 - process id ( $$ )

```bash
#!/bin/bash
echo "pid: $$"
```

## 7 - background process ( $! )

```bash
#!/bin/bash
echo "pid: $$"
echo "background pid: $!"
```

## 8 - Shell name ( $0 )

```bash
#!/bin/bash
echo "shell name: $0"
```

## 9 - path name ( $_ )

```bash
#!/bin/bash
echo "path: $_"
```