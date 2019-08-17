---
title: Linux ps command and scripting with nodejs
date: 2019-08-16 20:00:00
tags: [linux,js]
layout: post
categories: linux
id: 524
updated: 2019-08-17 09:55:33
version: 1.4
---

So today I am taking a look at the Linux ps command. This command can be used to get a snapshot of all the processes running on Linux at the moment. There are many options for the command that can be used to control selection and formating of the output. In this post I will be going over some typical examples of the linux ps command, and a use case example with nodejs.

<!-- more -->

## 1 - Some basic examples of the linux ps command

So if I just want a list of all processes running at the present moment I will call the ps command with the -e option. If I just give the -e option and nothing else then all processes will be selected and the default formating will be used.

```
$ ps -e
```


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