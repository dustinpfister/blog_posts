---
title: Linux find command
date: 2020-09-23 15:23:00
tags: [linux]
layout: post
categories: linux
id: 710
updated: 2020-09-26 16:59:52
version: 1.4
---

The [linux find](https://en.wikipedia.org/wiki/Find_%28Unix%29) command can be used to find one or more files from a starting mount point. The starting mount point can be the current working directory, or any other path that one has permission to access. The command will loop over all folders recursivly untill it is done searhing for files and will output the paths to fines that it finds in the standard output.

Where the linux grep command is used to look for patterns in content, the linux find command is used to look for patterns in file names. So the command can be used by itself if I just want to find one or more files that fit a given pattern, or with grep via piping to find files and on top of that look farther into the content of each file.

So in this post I will be looking at a few examples of how to get going with the Linux find command.

<!-- more -->

## 1 - Find a file by name from the current users home path

So to find one or more files with a set file name I just need to type find followed by a [Tilde](https://en.wikipedia.org/wiki/Tilde#Computing) symbol which is used to refer to the current users home folder. I can then use the name otpion followed by the name of the file that I want to look for in all paths from the home folder as a start point.

So in mu home folder I have a copy of my canvas examples reposatory, in there I have a few diferent rendetions of a pool.js file, and the linux find command was able to get absolute paths to all of them.

```
$ find ~ -name 'pool.js'
/home/pi/Documents/github_dustinpfister/canvas-examples/prototypes/canvas-example-waterfall/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-hyper-casual-to-the-black/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-game-crosshairs/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-object-pool/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-kill-box/lib/pool.js
/home/pi/Documents/github_dustinpfister/canvas-examples/forpost/canvas-example-star/lib/pool.js
```

## 2 - Control Depth

One feature that I know I would want when it comes to a command such as linux find is to control the depth at whcih to look for a file recursivly. That is that I might want find to only look in the starting path for a file, or maybe I will want for find to look in nested folders, but only go so many more levels, not all the way. For this there is the max depth option, just add that as one of the options when calling Linux find and pass a number from zero up to the max number of levels to go recursivly to look for files.

```
$ find ./canvas-examples -maxdepth 1 -name README.md
./canvas-examples/README.md
$ find ./canvas-examples -maxdepth 3 -name README.md
./canvas-examples/README.md
./canvas-examples/forpost/canvas-example-clock-basic/README.md
./canvas-examples/forpost/canvas-example-game-kaboom-clone/README.md
./canvas-examples/forpost/canvas-example-a-planet-of-mine-clone/README.md
```