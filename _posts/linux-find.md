---
title: Linux find command
date: 2020-09-23 15:23:00
tags: [linux]
layout: post
categories: linux
id: 710
updated: 2020-09-23 15:30:19
version: 1.1
---

The [linux find](https://en.wikipedia.org/wiki/Find_(Unix)#From_the_current_working_directory) command can be used to find a file from a starting mount point that can be the current working directory, or any other path that one has permission to access.

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