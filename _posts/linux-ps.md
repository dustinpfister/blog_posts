---
title: Linux ps command and scripting with nodejs
date: 2019-08-16 20:00:00
tags: [linux,js]
layout: post
categories: linux
id: 524
updated: 2021-03-09 07:56:14
version: 1.19
---

So today I am taking a look at the [Linux ps](https://www.tecmint.com/ps-command-examples-for-linux-process-monitoring/) command. This command can be used to get a snapshot of all the processes running on Linux at the moment that the command is called. Helpful information about each process running in a selection is included in the output including a process id that can be used with other commands such as the kill command to halt a process.

There are many options for the command that can be used to control selection of which process to print to the standard output, and formating of the output when it comes to what I want to know about processes. In this post I will be going over some typical examples of the Linux ps command, that have to do with selecting all process, processes for a user, and just instances of a single command. I will also be going over some examples that have to do with creating a custom output of the command, and a use case example with nodejs while I am at it.

<!-- more -->

## 1 - Some basic examples of the linux ps command

In this section I will be going over some typical use case examples of the Linux ps command. There are a lot of options and ways of formatting the output, and if you really want to dive deep into it all the best source on that might be the [ps command manual page](https://www.man7.org/linux/man-pages/man1/ps.1.html) as always. However here I thought I would write about the most typical options and formatting tricks that I find myself using thus far.

## 1.1 - See all process ruining on the system

So if I just want a list of all processes running at the present moment I will call the ps command with the -e option. If I just give the -e option and nothing else then all processes will be selected and the default formating will be used for each process in the output.

```
$ ps -e
```

There is piping the output into a command [like grep](/2020/09/14/linux-grep/) to filter things down, however there should be ways of selecting by user, or process game, and so forth with the ps command alone, and of course there are. The man page might be the best source when it comes to getting to know all the process section options, however I think that I should get to some examples that have to do with selecting by user and command name at least.

## 1.2 - See just process for a given user

So there is getting a long list of everything that is running on the computer, but often I might just want to see what is running for just a given username. So if I just want what is running for a username such as pi I just need to use the uppercase U option of Linux ps and pass the username. The result should be a list of processes that are ruining just for that username.

```
$ ps -U pi
```

## 1.3 - Just processes of a given name

Sometimes I will want to select process by a given set command name, for that there is the upper case C option of linux ps. To do so I will need to know the name of the command that I will want to look for to begin with, so I can use some of the other options to get the command name I want first.

```
$ ps -C chromium-browse
19422 ?        00:01:33 chromium-browse
19444 ?        00:00:00 chromium-browse
19446 ?        00:00:00 chromium-browse
19468 ?        00:00:46 chromium-browse
19472 ?        00:00:06 chromium-browse
19632 ?        00:00:13 chromium-browse
20058 ?        00:00:17 chromium-browse
20253 ?        00:00:15 chromium-browse
20431 ?        00:00:10 chromium-browse
```

### 1.4 - Basic Custom output with pid, uname, and comm

Whe it comes to controlling what will be displayed for each process that will should up there is the lowercase o option as well as several other options that mean the same thing. To have full control over the output of ps you will want to read up on the STANDARD FORMAT SPECIFIERS of the Linux ps command, and again it would be best to look at the man pages when it comes to this because there are a lot of them.

```
$ ps -U avahi -o "pid uname comm"
  PID USER     COMMAND
  375 avahi    avahi-daemon
  406 avahi    avahi-daemon
```

### 1.5 - Custom output with memory percentage

Often I might want to know how much memory a process might be easting up, when it comes to knowing what the totals are when it comes to what is going on with ram there is the Linux free command. However that command will just gives totals, it will not should be what is going on at a per process level. However with the ps command I can use the \%mem format specifier to know what is going on. 

```
$ ps -U pi -o %mem,comm
```

This will give memory usage for each process in a query, but it will do so as percentage values. However the percentage values can be compared to values that are obtained from the Linux fee command to get an idea of how much memory it is in bytes.

## 2 - Example 1 of Linux ps and making a custom array of command names and process ids with nodejs

In this example I am using the spawn child process module method in nodejs to call the ps command from within a nodejs script. I am using the -o option to change the formating so that it just displays command names alone and then process ids next. I then used event handlers for the data event of the standard output to build a string, and then then end event of that stream to know that the list is done. Once I have the list I then used Array.filter and Array.map to build an array of arrays where each first element is a process name and each second index is a process id.

```js
let spawn = require('child_process').spawn;
 
let ps = spawn('ps', ['-e','--no-headers', '-o', 'comm,pid']);
 
let text = '';
ps.stdout.on('data', (data) => {
    text += data.toString();
});
 
ps.stdout.on('end', (data) => {
    let commands = text.split(require('os').EOL);
    commands = commands.filter((comm)=>{
        return comm.match(/^n/)
    }).map((comm)=>{
        
        return comm.replace(/ +/, ':|:').split(':|:')
        
    })
    console.log(commands);
    // [ [ 'netns', '30' ], [ 'nfsiod', '47' ], [ 'node', '10018' ] ]
});
```

Not a practical example at least in its current state, but depending on what it is that I am trying to work out with Shell Scripting something like this could turn into something piratical of course. For example say I want to check if a process is not running first, and if not start it. Also say that I want to count the number of instances of that process that are currently running and if necessary call a kill command. In that case something like this would be a good starting point right?

## 3 - Conclusion

So the Linux ps command is the basic tool to use when it comes to checking out what is going on with processes. There are a number of other options that might be worth checking out one of which would be the top command. There are also a number of task manager like applications that can be used to have a graphical front end for must desktop environments, many of which will come with a given desktop environment as such a program is often a standard application of a desktop environment.

