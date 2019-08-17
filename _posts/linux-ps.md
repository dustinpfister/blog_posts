---
title: Linux ps command and scripting with nodejs
date: 2019-08-16 20:00:00
tags: [linux,js]
layout: post
categories: linux
id: 524
updated: 2019-08-17 09:48:09
version: 1.3
---

So today I am taking a look at the Linux ps command. This command can be used to get a snapshot of all the processes running on Linux at the moment. There are many options for the command that can be used to control selection and formating of the output. In this post I will be going over some typical examples of the linux ps command, and a use case example with nodejs.

<!-- more -->

## 1 - Some basic examples of the linux ps command

So if I just want a list of all processes running at the present moment I will call the ps command with the -e option. If I just give the -e option and nothing else then all processes will be selected and the default formating will be used.

```
$ ps -e
```


## 2 - Example 1 of Linux ps and making a custom array of command names and process ids with nodejs

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