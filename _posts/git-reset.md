---
title: Git reset command basic examples and more
date: 2019-07-02 21:08:00
tags: [git,node.js]
layout: post
categories: git
id: 497
updated: 2023-02-19 06:28:27
version: 1.12
---

The [git reset](https://git-scm.com/docs/git-reset) command can be used to undo the last comment in a git folder, and much more than just that. When called with no additional arguments it can be used as a way to unstage what has been staged for committing using the git add command. However with additional arguments it can be used as a way to make what is called a soft reset, as well as also a hard reset. This is a command that I do find myself using now and then, so it is worth taking a moment to write a quick post on it.

<!-- more -->

## 1 - Get reset command basic examples

The git reset command can be used as a kind of opposite of git add when staging files to be committed. However it can also be used as a way to reset the head of the git folder as well. When doing this there is what is called a soft reset as well as a hard reset.

### 1.1 - Unstage staged files ( opposite of git add )

So say you added some files to be committed, but then realize that you made a mistake, but did not commit yet. No problem just use the git reset command and give the path that you want to reset, or no path at all if you want to reset everything that was added and start over.

```
$ git add *
$ git reset
```

using the git reset method this way will not result in a loss of changes that where made, it just simply resets what has been added with the got add command. So it can be though of as an opposite of git add when staging files that have been changed.

### 1.2 - Soft reset

If I want to undo the last commit, but keep the changes that have been made I can use the git reset command to do a soft reset like this.

```
$ git reset --soft HEAD~1
```

### 1.3 - Hard reset

Every now and then I just forget to make a commit and I have some minor changes that are keeping me from updating a local git folder when making a git pull request. If the changes are not important and it is okay to loose them I can do a hard reset to move the head to the last commit. Doing so will result in the loss of any changes sense the last commit, but I will then be in a place in which I can then do a git pull, update the git folder to the latest branch and move on.

```
$ git reset --hard
$ git pull
```

## 2 - Creating an undo last comment command with nodejs

So in this section I will be going over a simple script that makes it so I just have to enter a single command into the command line to preform a soft reset. I am sure there are a number of ways to go about doing this, however my preferred programing environment is javaScript so this will be a nodejs project.


So Basically this project just makes it so I can turn this:

```
$ git reset --soft HEAD~1
$ git reset
```

Into just this.

```
$ g-undo
```

There are many reasons why it makes sense to write my own commands. If I find myself doing the same thing over and over again that is a few steps chances are I should make it into a command.

### 2.1 - Making this a global script

I just need to add the following to the package.json file of the project to make it so I can install the project globally and then use it anywhere with the name that I set for it..

```js
"bin": {
    "g-undo": "./index.js"
}
```

### 2.2 - The index.js file


So here I have the index.js file of this project. I am starting off the project with the shebang for nodejs as this will be a global script. In addition I am using the spawn method of the child_process module to launch the git command from within nodejs. The child process module is great as I can use it not just to run git commands, but anything that can be done in the command line of the operating system I am using.

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