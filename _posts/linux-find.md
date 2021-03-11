---
title: Linux find command
date: 2020-09-23 15:23:00
tags: [linux]
layout: post
categories: linux
id: 710
updated: 2021-03-11 15:53:50
version: 1.10
---

The [Linux find](https://en.wikipedia.org/wiki/Find_%28Unix%29) command can be used to find one or more files from a starting point in a file system. The starting point can be the current working directory for example, or any other path that one has permission to access for that matter. The command will loop over all folders recursively until it is done searching for files, and will output the paths to files that it finds in the standard output that match the given serach pattern to look for.

Where the Linux grep command is used to look for patterns in content, the Linux find command is used to look for patterns in file names. So the command can be used by itself if I just want to find one or more files that fit a given pattern, or with grep via piping to find files and on top of that look farther into the content of each file.

So in this post I will be looking at a few examples of how to get going with the Linux find command.

<!-- more -->

## 1 - Find a file by name from the current users home path

So to find one or more files with a set file name I just need to type find followed by a [Tilde](https://en.wikipedia.org/wiki/Tilde#Computing) symbol which is used to refer to the current users home folder. I can then use the name option followed by the name of the file that I want to look for in all paths from the home folder as a start point.

So in mu home folder I have a copy of my canvas examples repository, in there I have a few different renditions of a pool.js file, and the Linux find command was able to get absolute paths to all of them.

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

One feature that I know I would want when it comes to a command such as Linux find is to control the depth at which to look for a file recursively. That is that I might want find to only look in the starting path for a file, or maybe I will want for find to look in nested folders, but only go so many more levels, not all the way. For this there is the max depth option, just add that as one of the options when calling Linux find and pass a number from zero up to the max number of levels to go recursively to look for files.

```
$ find ./canvas-examples -maxdepth 1 -name README.md
./canvas-examples/README.md
$ find ./canvas-examples -maxdepth 3 -name README.md
./canvas-examples/README.md
./canvas-examples/forpost/canvas-example-clock-basic/README.md
./canvas-examples/forpost/canvas-example-game-kaboom-clone/README.md
./canvas-examples/forpost/canvas-example-a-planet-of-mine-clone/README.md
```

## 3 - Search for folder names rather than files

To search for file names rather than file names just use the type option with the name option. The value to use for the type option will be d for directories. The type option can be used to restrict for other types such as regular files with a f, and symbolic lines by passing an l for the type option. For a full list, as well as many other options you would want to check the man page, but those three values for the type option are the ones that I find myself using most often.

```
$ find . -type d -name pkg
./test_vjs/for_post/js-javascript-example-grid-game-unit-movement/pkg
./canvas-examples/forpost/canvas-example-hyper-casual-to-the-black/pkg
./canvas-examples/forpost/canvas-example-game-crosshairs/pkg
./canvas-examples/forpost/canvas-example-object-pool/pkg
./canvas-examples/forpost/canvas-example-kill-box/pkg
./canvas-examples/forpost/canvas-example-game-monster-smash/pkg
```

## 4 - Using the exec option to call a command and feed URIs to the command via arguments

So the exec option is what I would want to use when it comes to feeding the URIs that are found to some other command. Most commands expect content from the standard input rather the one or more URIs, so this option is very important when it comes to passing URIS of files that are found to some other kind of command to preform some kind of action with that file.

Here I am looking for javaScript files from the current working path to a max depth of to folders from that starting point. I am only interested in files and not folder names thus I am using the type option with the f value for regular files. I am then using the name option to look for files that end with the .js file extension. So then find is finding all javaScript files from the current working directory to a set max depth.

```
$ find . -maxdepth 2 -type f -name '*.js' -exec cat {} ';'
```

I am then using the exec option to use cat to read the contents of all files and spit the content out into the standard output. That content can then be piped to something else but all ready you get the idea as to why the exec option is useful. The URIS can be used with something like chown to change who owns all the javaScript files found, or it coyld be used with something like rm as a way to delete them for example.

## 5 - Using xargs and pipping to feed URIs to another command

You might be wondering if it is possible to still use pipping as a way to use the standard output of find as the arguments for another command rather than this other commands standard input. Well there is and one such command that can be used to do so would be [xargs](/2020/09/26/linux-xargs/)

```
$ find . -type f -name '*.js' | xargs -l bash -c 'cat $0'
```

## 6 - conclusion

So there are many more things to cover when it comes to the Linux find command. I did not cover everything that can be done with just the find command alone, let alone what can be done when it comes to working with additional commands via pipping and the exec option. I think that I have covered many of the typical things that come to mind at least.