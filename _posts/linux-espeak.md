---
title: Linux espeak command for creating a voice
date: 2021-02-08 16:57:00
tags: [linux]
layout: post
categories: linux
id: 798
updated: 2021-02-08 17:19:39
version: 1.6
---

The [linux espeak](https://linux.die.net/man/1/espeak) command is how one can go about synthesizing speech in a linux system. The command might come out of the box with most systems, however with some it might need to be installed first, but often shows up in most package managers when that is the case. There are a few options when it comes to controling the pitch and speed of the voice. 

Content can be piped into it from the standard inputm, so it can be used as an endpoint for a chain of commands to have the output spoken rather than spit out to the console. There is also a file option for the command, but as with any other linux command another command can be used to read a file and then pipe the text to espeak.

<!-- more -->

## 1 - Install and basic example

The espeak command might be there to begin with, so one way to find out if that is the case is to just try a basic example of espeak like this.

```
$ espeak "this is just a test of the espeak"
```

If all goes well fine, otherwise it would have to be installed first.

```
$ sudo apt-get install espeak
```

## 2 - Pitch and speed options

The default speed is 160 in words per second, that might prove to be a bit to fast for some people so the -s option can be used as a way to slow that down a little to something like 90 maybe. There is also the -p option that can be used to adjust the pitch of the voice on a 0 to 99 scale.

```
$ espeak -s 90 -p 80 "this is just a test of the espeak"
```

## 3 - Reading a file and piping to the standard input of espeak

If you are not up to speed with piping then now might be a good time to learn a thing or two about it now. In this section I will be going over a few examples of using piping as a way to pipe the output of commands as the input for espeak.

## 3.1 - reading a file by piping it in with cat

```
$ cat README.md | espeak -s 90 -p 80
```

## 3.2 - Fun with date and bash parameter expansion

```
$ echo "today is $(date +%A)" | espeak
```

## 4 - Bash script example

Like any other command in linux espeak can be used in bash scripts.

```
#!/bin/bash
 
today=$(date +"%A")
case $today in
  "Monday")
    echo "It is ${today}, oh boy." | espeak -p 20 -s 40
    ;;
  "Friday")
    echo "Today is ${today}, Hell Yeah!" | espeak -p 80 -s 100
    ;;
  *)
    echo "Today is ${today}" | espeak -p 50 -s 80
    ;;
esac
```

```
$ chmod 755 today.sh
$ ./today.sh
```

## 5 - Conclusion

