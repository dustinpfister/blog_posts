---
title: Linux ps command and scripting with nodejs
date: 2019-08-16 20:00:00
tags: [linux,js]
layout: post
categories: linux
id: 524
updated: 2019-08-16 20:07:59
version: 1.2
---

So today I am taking a look at the Linux ps command. This command can be used to get a snapshot of all the processes running on Linux at the moment. There are many options for the command that can be used to control selection and formating of the output. In this post I will be going over some typical examples of the linux ps command, and a use case example with nodejs.

<!-- more -->

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