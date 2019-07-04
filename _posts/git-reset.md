---
title: Git reset command basic examples and more
date: 2019-07-02 21:08:00
tags: [git,node.js]
layout: post
categories: git
id: 497
updated: 2019-07-04 16:28:16
version: 1.1
---

The git reset command can be used to undo the last comment in a git folder, and much more than just that. In this post I will be going over some example of the git reset command.

<!-- more -->

## 2 - Creating an undo last comment command with nodejs

```js
#!/usr/bin/env node
let spawn = require('child_process').spawn,
path = require('path');
// reset commands for git
let gitArgumnets = {
    status: ['status'],
    keepChanges: ['reset', '--soft', 'HEAD~1'],
    unstage: ['reset']
};
// custom log function
let log = function (data, type) {
    data = data === undefined ? '' : data;
    type = type === undefined ? 'data' : type;
    var color = '\u001b[37m';
    if (type === 'info') {
        color = '\u001b[32m';
    }
    if (type === 'error') {
        color = '\u001b[31m';
    }
    console.log(color + data + '\u001b[37m');
};
// launch a git command
let Git = (dir, argu) => {
    argu = argu === undefined ? gitArgumnets.status : argu;
    return new Promise((resolve, reject) => {
        let stat = spawn('git', argu, {
                cwd: dir
            });
        stat.stdout.on('data', function (data) {
            log(data.toString(), 'data');
        });
        stat.stderr.on('data', function (data) {
            reject(data.toString());
        });
        stat.on('close', (code) => {
            log('command over...', 'info');
            resolve();
        });
    });
};
// start process
let dir = path.resolve(process.argv[2] || process.cwd());
Git(dir, gitArgumnets.status)
.then((data) => {
    //console.log(data);
    log('okay looks like we have a git', 'info');
    log('doing a soft reset...', 'info');
    return Git(dir, gitArgumnets.keepChanges);
})
.then((data) => {
    log('soft reset went well, lets unstage as well...', 'info');
    return Git(dir, gitArgumnets.unstage);
}).then(() => {
    log('all done', 'info');
})
.catch ((data) => {
    log(data, 'error');
});
```