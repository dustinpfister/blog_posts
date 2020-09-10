---
title: Keep a process running in linux with NOHUP
date: 2020-09-09 16:40:00
tags: [linux]
layout: post
categories: linux
id: 703
updated: 2020-09-10 13:01:11
version: 1.5
---

These days I have been doing some work on my Raspberry PI 3B+ with a Rasberry PI OS image, and have come accross some situtsions in which I would like to continue having a command run even when I close the terminal window in which I started it. To do so I just need to use [NOHUP](https://en.wikipedia.org/wiki/Nohup) at the end of the command line to do just that, but maybe there are a [few more things to write about](https://opensource.com/article/18/9/linux-commands-process-management) on top of that when it comes to starting and killing processes in a linux operating system enviornment.

<!-- more -->

## 1 - Basic example of linux NOHUP

So the nohup command is how to go about doing a no hang up request for the command, and on top of that I would also use a ampersand symbol at the end of a command to send the process to the background so I can continue using the terminal window. So inother words the command prompt will return after calling the command, and the process will continue to run even if I close the terminal window.

So say I am in a project folder and I have a node.js script called app.js that will start a server. I want the server to start on its own seperate process id, and then return to the command prompt. To do this I just place and ampersand at the end of the line like this.

```
$ nohup node app 8000 &
[1] 20293
```

when doing so I might be given a process id like above, and then return to the command prompt. This might work okay but then there is the question of how to go about stoping the process once it has started. In addition there might be some addition isshues that will come up with this such as the standard output, and standard error output still being spit out into the terminal winodw that I am using. So lets take a look at a few more things to be aware of that typicall surropund the use of a NOHUP request in Linux.

## 2 - The kill command

Once a process is running it will continue to do so untill it will self termanate, or untill a command such as kill is used to stop the process.

```
$ kill 20293
```

## 3 - Keep a process running, and redirrect the output

There is the question of the output from the script as it continue to run. I might not want that being spit out at me when I continue to use the terminal winodw. Also I might not want for it to be lost when and if I choose to clone the terminal window also. So with that said in this section I wil be quickly covering some ways to redirrect the output of a process to a file, and any any other means of doing so.

### 3.1 - redirrect just the standard output to a file

So if I just want to redirrect the standard output to a file that will be overwritten each time, and I do not want to appedn to a file, or care about any other output from the process then I can just use the grater than symbol. It might also be called a closing pointly bracker symbol, anyway just place that after the command followed by a path to the file where the standard output will be written to.

```
$ nohup node app 8000 > ~/log.txt &
```

## 4 - Conclusion

So this is it for now when it comes to keeping a linux process running in the background. To just recap there is the nohup command to rememebr that is the most imporatnt part of the whole process, but the andpersand afer the command is also of imporatnace when it comes to kepping the process running in the background so I can keep using my termainal window.

In addition there are other commands that come to midn such as the ps command and kill command as well as many others but that all might be jts a bit off topic So I will niot be getting into it all in detail here at least.