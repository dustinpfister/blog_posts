---
title: Linux aplay command and ALSA
date: 2023-06-15 12:37:00
tags: [linux]
layout: post
categories: linux
id: 1052
updated: 2023-06-15 16:27:18
version: 1.1
---

The [Linux aplay](https://linux.die.net/man/1/aplay) command of [ALSA](https://en.wikipedia.org/wiki/Advanced_Linux_Sound_Architecture) is pretty cool as it can be used as a tool to play any kind of raw data as sound. This data can be piped into the standard input of the aplay command, or a file can be passed as a positional argument. Any kind of data can be used as sample data, but to really start using aplay by one way or another it would be best to fine ways to generate sample data.

<!-- more -->

## Pipe in random data by using cat

```
$ cat /dev/random | aplay -d 3
Playing raw data 'stdin' : Unsigned 8 bit, Rate 8000 Hz, Mono
```