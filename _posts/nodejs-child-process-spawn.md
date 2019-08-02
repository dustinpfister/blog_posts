---
title: The node spawn child process method in action
date: 2019-08-02 14:22:00
tags: [node.js]
layout: post
categories: node.js
id: 514
updated: 2019-08-02 14:28:37
version: 1.2
---

I find myself using the [node spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) child process module method often, but still have not mastered all the little aspects of this method as well as the child process module in general. So one way to go about getting more proficient on the subject would be to write a whole bunch of little demos on the node span method and write a post on them.

<!-- more -->

## 1 - lets start out with the node spawn method with a basic example

So lets start out with the node spawn method by quickly getting together a basic example that I often start a post like this with.

```js
// using spawn
let spawn = require('child_process').spawn,
 
// spawn test.js
script = spawn('node', ['basic_test.js']);
 
// what to do for the standard output for
// test.js launched via the node spawn
// child process method
script.stdout.on('data', function(data){
    console.log(data.toString()); // 'this is a test'
});
```