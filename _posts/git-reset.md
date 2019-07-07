---
title: Git reset command basic examples and more
date: 2019-07-02 21:08:00
tags: [git,node.js]
layout: post
categories: git
id: 497
updated: 2019-07-07 12:53:59
version: 1.3
---

The [git reset](https://git-scm.com/docs/git-reset) command can be used to undo the last comment in a git folder, and much more than just that. When called with no additional arguments it can be used as a way to unstage what has been staged for committing using the git add command. However with additional arguments it can be used as a way to make is called a soft reset, as well as also a hard reset. This is a command that I do find myself using now and then, so it is worth taking a moment to write a quick post on it.

<!-- more -->

## 2 - Creating an undo last comment command with nodejs

I just need to add the following to the package.json file of the project.

```js
"bin": {
    "g-undo": "./index.js"
}
```

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