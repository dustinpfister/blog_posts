---
title: The node fork child process method.
date: 2019-08-07 10:45:00
tags: [node.js]
layout: post
categories: node.js
id: 517
updated: 2019-08-07 11:31:50
version: 1.1
---

I have been doing a lot of work revolving the use of the child process module as of late, so I thought I would write some demos about the node fork child process method.

<!-- more -->


## 1 - node fork basic example

```js
let fork = require('child_process').fork;
// call the script from this script
fork(process.argv[2] || './basic-test.js');
```

```js
// the standard out is inherited from the parent process
process.stdout.write('hello node fork!');
```

```js
// and the standard in is inherited from
// the parent process by default also
process.stdin.on('data', (data) => {
    console.log(data.toString('hex'));
});
process.stdin.on('end', (data) => {
    console.log('end of data');
});
```
