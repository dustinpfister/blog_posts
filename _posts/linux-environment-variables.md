---
title: Linux Environment Variables
date: 2020-10-29 13:53:00
tags: [linux]
layout: post
categories: linux
id: 732
updated: 2020-10-29 15:45:05
version: 1.5
---

When taking the time to get a little more into how to work with Linux, and Bash, the topic of [environment variables](https://en.wikipedia.org/wiki/Environment_variable) will come up from time to time. These are bash values that can effect how programs work in Linux. For example there is a $HOME environment variable that is the home path for the current user, many programs will use this value to know where to place a hidden config file for user settings then. There are many other such environment variables, and there are also ways of creating ones own such variables when doing so is called for, often when working out some kind of bash script.

There is knowing how to at [least list, and set environment variables](https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/) for starters. However there is also doing a few simple bash commands, and maybe event go so far as to make a program or two to really know why they are useful.

In this post I will be starting out with the basics when it comes to environment variables in Linux. This is just listing what the current variables are, and setting and deleting such variables. In addition at the end I might get into a few more advanced examples that Might help to get better insight as to how environment variables work, and how they can prove to be useful.

<!-- more -->

## 1 - List current Linux Enviorement Variables

First things first, how does one know what the current state of environment variables are on a system? One such command for getting such a list would be the [Linux printenv](https://man7.org/linux/man-pages/man1/printenv.1.html) command.

```
$ printenv
```

This will spit out all of the current environment variables that there are. Take a moment to look over them and you should see a few of interest such as HOME, PATH, USER, PWD, and SHELL just to name a few. These variables store values that are important as they help to give programs a way to know things like the current user, and where to store files for this user.

## 2 - Printing the value of a Variable

If you know the Environment variable that you want to print that can be passed as an argument to printenv and just the value of that variable will be logged to the standard output.

```
$ printemv HOME
/home/dustin
```

However it might be best to get up to speed with how to go about printing them in string values that can then be passed to any argument such as echo. To do this I just need to use the dollar sign symbol followed by the name of the variable, however if I am going to use it in a string I will want to place curly brackets around the variable name.

```
$ echo $HOME
/home/dustin
$ echo "The Home path is: ${HOME} and all is well"
The Home path is: /home/dustin and all is well
```

## 3 - Now for some bash script examples

So now that I have the basics of environment variables out of the way, maybe I should do something not so basic with them. I have wrote a post on the base32 command, and there is also the base64 command. I wanted to find a way to go about using these commands to encode and decode a collection of mark down files. It looks like in order to do so I will end to make use of environment variables, as well as writing a simple bash shell script file. So this might prove to be a great simple example of how to go about using environment variables.

### 3.1 - My md\_b64\_encode.sh file

So first I have my file that will use the base64 command to encode any markdown files that are found into base64 files.

```bash
#!/bin/bash
for i in $( ls *.md ); do
    file=$i
    fileBaseName=$( echo -n "$file"  | cut -d '.' -f 1 )
    fileEXT=$( echo -n $file | cut -d '.' -f 2 )
    cat $file | base64 > "${fileBaseName}.${fileEXT}.b64"
done
echo 'done'
```

So if I copy and past the following into an editor, and save it as something like md\_b64\_encode.sh I will want to make it executable with chmod.

```
$ chmod +x md_b64_encode.sh
```

Once I make it executable I can call it in bash like this.

```
$ ./md_b64_encode.sh
```

### 3.2 - My md\_b64\_decode.sh file

So then there is making a decode script that is just a little different.

```bash
#!/bin/bash
for i in $( ls *.b64 ); do
    file=$i
    fileBaseName=$( echo -n "$file"  | cut -d '.' -f 1 )
    fileEXT=$( echo -n $file | cut -d '.' -f 2 )
    cat "${file}" | base64 -d > "${fileBaseName}.${fileEXT}"
done
echo 'done'
```

## 4 - Conclusion

So environment variables are useful for telling programs how to work, it is a way to go about setting or changing some basic application settings aside from that of arguments. The thing about arguments is that they are only for the single call of a command, while environment variables will be for all calls of a command that will make use of them. In addition an environment variable will work with any command that will use a given environment variable when arguments are just for a single command.

When writing shell scripts variables are ways of storing values that can then be used as a way to create argument values. Which is of course yet another reason why they are very helpful when it comes to automating work. WHen it comes to my base64 script examples I would have to manually enter the same command over and over gain for each file, but with environment variables and a little bash script magic, I can avoid wasting time doing that.