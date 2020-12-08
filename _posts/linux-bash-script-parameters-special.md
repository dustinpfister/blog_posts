---
title: Special parameters in Linux Bash scripts
date: 2020-12-08 12:41:00
tags: [linux]
layout: post
categories: linux
id: 757
updated: 2020-12-08 13:33:04
version: 1.9
---

So I wrote a [bash scripts](/2020/11/27/bash-scripts/) post on positional parameters which might be the first thing most people will think of when it comes to parameters for a script. However it is important to refer to them as positional parameters rather than just simply parameters because yet there is more than one set of parameters at play when a script is called.

There are of course positional parameters such as $0, $1, $2, and so forth as covered on my post on positional parameters. these parameters refer to the name of the command called followed by each option that is separated by a space. However there is also a number of Special parameters in bash also such as $@ that is a way to quickly expand all of these positional parameters, and $\# that will give a count of these. So if I aim to write an comprehensive collection of posts on the features of bash scripts it is called for to write one on these special parameters. In this post I will be going over these with at least one basic example of each.

<!-- more -->

## 1 - Expand all positional parameters ( $@ )

The first Special parameter that comes to mind is the $\@ parameter that will expand all positional parameters that where given when the script was called.

```bash
#!/bin/bash
echo "positionals: $@"
```

```
$ ./basic_call.sh
positionals: foo bar baz
```

## 2 - Expand all positional parameters with IFS ( $* )

There is another special parameter that can be used to expand all position parameters but will take into account the current value of IFS (The Internal Field Separator). This is a value that can be set in a script that will be used as a standard field separator for things such as this special parameter. Aside from this it works more or less the same way as the $@ parameter

```bash
IFS="-"
echo "positionals: $*"
```

```
$ chmod 755 ifs.sh
$ ./ifs.sh foo bar baz
positionals: foo-bar-ba
```

## 3 - get a count of positional parameters ( $# )

Another common task in bash scripts is to get a count of the number of positional arguments that where given when the script is called. The $# parameter will given this number of positional arguments minus the one that is the name of the command.

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

Any bash script or command will typically exit or end at some point. When this happens there is an exit code that is set. An exit code of zero means that all went well and the script, command, or test went as expected with a positive result. Any number other than zero for an exit code means that something went wrong, a test has failed, or some kind of error or problem happened. The $? special parameter is one way to get at the status of this code, and is often useful when working something out with the test command.



```bash
#!/bin/bash
test 1 -eq 1
echo "status: $?"
test 2 -eq 1
echo "status: $?"
```

## 5 - option flags ( $- )

So then there are the positional parameters of a script, and there are all of these special parameters, and then there are the parameters that are given when bash is called. In many of these examples thus far I am calling a script directly, but there is also not bothering with that can calling bash in the command line followed by the name of the script. When I call the bash script this way there are positional arguments that I can give for the script, but then there are also all the options that I can set when calling bash. The $- special parameter is one way to expand the state of all of options of the bash command when it was called.

```bash
#!/bin/bash
echo "flags: $-"
```


## 6 - process id ( $$ )

The $$ special parameter is how one would go about getting the process id of the current script.

```bash
#!/bin/bash
echo "pid: $$"
```

## 7 - background process ( $! )

A $! special parameter is how one would go about getting the process id of a background process.

```bash
#!/bin/bash
echo "pid: $$"
echo "background pid: $!"
```

## 8 - Shell name ( $0 )

There are two special parameters for getting the path of the current script, however one of them might return a different result in some situations. The $0 parameter might return the name of the current shell in some situations.

```bash
#!/bin/bash
echo "shell name: $0"
```

## 9 - path name ( $_ )

If you just want to get the path to the current script, and only the current script in all situations then it would be best to stick to the $\_ parameter.

```bash
#!/bin/bash
echo "path: $_"
```

## 10 - conclusion

That concludes my general overview of all of the special parameters in bash. Thus far there are only a few of these that I find myself using when working out scripts. Mainly I just want to expand all the positional parameters or get a count of the number of parameters that where given. However it is still a good idea to take a moment to be ware of the full range of sectional parameters that there are to work with in bash.
