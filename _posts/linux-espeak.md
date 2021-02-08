---
title: Linux espeak command for creating a voice
date: 2021-02-08 16:57:00
tags: [linux]
layout: post
categories: linux
id: 798
updated: 2021-02-08 17:03:17
version: 1.1
---

The [linux espeak](https://linux.die.net/man/1/espeak) command is how one can go about synthesizing speech in a linux system. The command might come out of the box with most systems, however with some it might need to be installed first, but often shows up in most package managers when that is the case. There are a few options when it comes to controling the pitch and speed of the voice. 

Content can be piped into it from the standard inputm, so it can be used as an endpoint for a chain of commands to have the output spoken rather than spit out to the console. There is also a file option for the command, but as with any other linux command another command can be used to read a file and then pipe the text to espeak.

<!-- more -->
