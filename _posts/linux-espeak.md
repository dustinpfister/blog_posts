---
title: Linux espeak command for creating a voice
date: 2021-02-08 16:57:00
tags: [linux]
layout: post
categories: linux
id: 798
updated: 2021-02-08 17:06:41
version: 1.2
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
