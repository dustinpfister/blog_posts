---
title: Linux find command
date: 2020-09-23 15:23:00
tags: [linux]
layout: post
categories: linux
id: 710
updated: 2020-09-24 09:06:36
version: 1.2
---

The [linux find](https://en.wikipedia.org/wiki/Find_%28Unix%29) command can be used to find one or more files from a starting mount point. The starting mount point can be the current working directory, or any other path that one has permission to access. The command will loop over all folders recursivly untill it is done searhing for files and will output the paths to fines that it finds in the standard output.

Where the linux grep command is used to look for patterns in content, the linux find command is used to look for patterns in file names. So the command can be used by itself if I just want to find one or more files that fit a given pattern, or with grep via piping to find files and on top of that look farther into the content of each file.

So in this post I will be looking at a few examples of how to get going with the Linux find command.

<!-- more -->

## 1 - Find a file by name from the current users home path

```
$ find ~ -name 'pool.js'
/home/pi/Documents/github_dustinpfister/canvas-examples/prototypes/canvas-example-waterfall/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-hyper-casual-to-the-black/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-game-crosshairs/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-object-pool/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-kill-box/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-star/lib/pool.js
```