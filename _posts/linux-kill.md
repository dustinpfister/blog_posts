---
title: Linux kill command
date: 2020-10-12 16:52:00
tags: [linux]
layout: post
categories: linux
id: 721
updated: 2020-10-13 16:04:39
version: 1.1
---

The [Linux kill](https://www.linux.com/training-tutorials/how-kill-process-command-line/) command can be used to kill a process by way of a process id. In addition there are other commands such as killall that can be used to kill all processes by a command name rather than a process id. In any case in order to kill a commnd I first needto find out what processes are currently running on the computer so there are a few other comands that should at least be touched on breefly such as the Linux ps command that can be used to get a list of processes.

<!-- more -->

## 1 - kill all by name

The kill all command can be used to quickly and esiliy kill a processes by command name rather than process id.

```
$ ps -C 'chromium-browse'
  PID TTY          TIME CMD
17058 ?        00:00:04 chromium-browse
17079 ?        00:00:00 chromium-browse
17081 ?        00:00:00 chromium-browse
17106 ?        00:00:01 chromium-browse
17108 ?        00:00:00 chromium-browse
17185 ?        00:00:02 chromium-browse
17196 ?        00:00:02 chromium-browse
$ killall 'chromium-browse'
```