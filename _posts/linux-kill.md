---
title: Linux kill command
date: 2020-10-12 16:52:00
tags: [linux]
layout: post
categories: linux
id: 721
updated: 2020-10-15 06:29:30
version: 1.7
---

The [Linux kill](https://www.linux.com/training-tutorials/how-kill-process-command-line/) command can be used to kill a process by sending a process kill signal to a process way of a process id. There are a few different kill signals but the default signal of the kill command will work okay for most situations so just a process id is needed with the kill command often.

In addition there are other commands such as killall that can be used to kill all processes by a command name rather than a process id. In any case in order to kill a command I first need to find out what processes are currently running on the computer so there are a few other commands that should at least be touched on briefly such as the Linux ps command that can be used to get a list of processes.

<!-- more -->

## 1 - First a word or two on Linux ps

Before I can use the Linux kill command I first need to know what is running in the first place. I have [wrote a post on the Linux ps command](/2019/08/16/linux-ps/) which is the first command that comes to mind when it comes to taking a look at what is running on the system. It would be best to read over the man page on Linux ps, or at least some half way decent post on the Linux ps command, but maybe it is called for to at least go over some basics of this command here.

To get a list of all processes running at the moment call ps with the -e options

```
$ ps -e
```

It is also possible to select by process command name if you know the name of the command that you want to stop. For example if I want to list all instances of node running on my computer I can call ps with the -C option and then pass node as the command name after that option.

```
$ ps -C node
```

There are many more options to write about when it comes to the ps command, but this is a post on killing a process. If you want to read more on Linux ps there is the post I wrote on that, but the best source would of course be the man page when it comes to every little detail.

## 2 - find and kill a process by name using kill and ps

Say I know the name of the command that I want to kill. For example I know that I have one process that I started using nodejs, and I want to stop it without having to restart. The Linux ps command can be used with the C option to set a command name to look for when selecting processes that are running on the system.

So by using the ps command with the C option and giving node as the command name to look for I should get a list of node processes currently running along with process ids. I can then use the process id with the kill command to kill the process.

```
$ ps -C node
  PID TTY          TIME CMD
 9736 ?        00:02:59 node
kill 9736
```

## 3 - kill all by name

The kill all command can be used to quickly kill a processes by command name rather than process id. I do need to know the name of the command first though so I will still want to use Linux ps or some other command to know what collection of processes by name I want to kill.

Say the chromium-browse web browser is hanging and I want to force kill all instances of that browser. I just need to call the kill all command and pass the command chromium-browse.

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

## 3 - Conclusion

So the Linux kill and Linux killall commands are part of a small collection of commands that I think made up a nice basic set of commands to be aware of when it comes to acquiring a basic understanding of Linux . A process can hang and it will need to be manually killed and restarted so the kill command, and other related commands such as ps, and top come into play when it comes to doing this sort of task.