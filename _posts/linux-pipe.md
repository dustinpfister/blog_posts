---
title: Linux pipe redirection of standard output
date: 2020-10-09 12:427:00
tags: [linux]
layout: post
categories: linux
id: 720
updated: 2020-10-09 15:37:57
version: 1.3
---

A [Linux pipe](http://www.linfo.org/pipe.html) is a form of redirection of output of one command to the input of one or more additional commands. This allows for breaking something down into a bunch of steps where one programe dows just one thing and then the output of that command is then passed on to another command that accepts that result as input to which it then uses to preform yet another result.

There is also [linux redirection](/2020/10/02/linux-redirection/) that is simular to a linux pipe, but works a little diferently. With Linux pipes two commands can run in parallel with each other, and data is trasnferd in a per buffer basis. With Linux redirection one command must compleate, before the next can start.


<!-- more -->

## 1 - Using cat to pipe a list of file names to xargs and then cat again

So say I have a text file called file\_list.txt that is a list of file names like this that are also in the same working directory

```
file1.txt file2.txt
```

file1.txt just contains the text _foo_

```
foo
```

file2.txt just contains the text _bar_ plus a like break at the end

```
bar
 
```

I can then use the cat command to read the file_list.txt file and then pipe that text to the linux xargs command, with that the file names are then used as arguments for the cat command again. As a result the text of file1.txt and file2.txt are concatanted into a single stream in the order in which the files are in the file\_list.txt file. 

```
$ cat file_list.txt | xargs cat | tee >(cat >build.txt)
foobar
```

The result of the xargs cat command can then be piped yet again to the Linux tee command where I can then use redirection to write the ending result to a single output file as well as continue things on to the standard output as ushual.

So the result off all of this is the text of file1.txt and file2.txt combinded togeather as one and spit out to the console as well as the build.txt file. This might just be a silly string value, but in a real example not so diferent from this could be a build of many source code files into a single package file. I could pipe things threw some additional commands that might compact the source code into a minified rather than devlopment form.