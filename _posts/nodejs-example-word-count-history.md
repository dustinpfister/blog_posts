---
title: The node exec child process method
date: 2020-10-22 15:46:00
tags: [node.js]
layout: post
categories: node.js
id: 727
updated: 2020-10-22 16:02:10
version: 1.5
---

This [nodejs example](https://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js) is a project that I wanted to start a long time ago, but kept putting off. It is a script that will use a git log command to get a list of commit hash ids from the latest commit on master. Once it has a list of commit hash ids it will use a git checkout command to switch to the oldest commit in the list. From there is will loop up back to the newest commit in the list again.

The full idea that I had for this example is to have a script that will create a word count history for my blog post collection. It is just one little idea that I think might help me to stay the course when it comes to working on this blog posts and javaScript examples. In other words the general idea is to have a tool that will help me to track productivity by tracking how much writing I am doing every day, and having a script that will create word count totals per day or commit. However as of this writing I have not got this far with the script, and depending if I get some more time to work on it I might not finish.

<!-- more -->

## 1 - The git lib of the nodejs example

I have a single module for this nodejs example thus far that has a whole bunch of methods to help me work with a git folder. I have a method that will just check if a given folder is a git folder, and return a resolve or rejected promise depending on that. I have another method that will create a list of commits from the current commit back a number of commits, and other such methods. So in this section I will be going over this module, and how it helps with this word count history nodejs example.

```js
let exec = require('child_process').exec;
 
// just check if the given folder is a git folder
exports.folderCheck = (dir) => {
    return new Promise((resolve, reject) => {
        exec('git status', {
            cwd: dir === undefined ? process.cwd() : dir
        }).on('exit', (code) => {
            if (code === 0) {
                resolve('folder is a git folder');
            } else {
                reject('folder is NOT a git folder');
            }
        });
    });
};
 
// Get a list of commit objects for the past few commits in a git folder
// each object should have at least a commit id hash, and a date for the commit
// git log -n 20 --format="%H&%ad;"
exports.commitList = (dir, backCount) => {
    backCount = backCount === undefined ? 5 : backCount;
    return new Promise((resolve, reject) => {
        let list = exec('git log -n ' + backCount + ' --format=\"%H&%ad;\"'),
        out = '';
        list.stdout.on('data', function (data) {
            out += data.replace('\n', '');
        });
        list.on('exit', function () {
            let commits = out.split(';');
            // remove any elements that are new lines
            //commits = commits.filter((str) => {
            //        return str != '\n';
            //    });
            commits = commits.map((str) => {
                    let arr = str.split('&');
                    return {
                        commit: arr[0],
                        date: arr[1]
                    };
                });
            commits = commits.filter((commitObj) => {
                    return commitObj.commit != '\n';
                });
            resolve(commits);
        });
        list.stderr.on('data', function (data) {
            reject(data);
        });
    });
};
 
// switch to the given commit or master (latest) by default
exports.toCommit = (hash, dir) => {
    hash = hash || 'master'
        return new Promise((resolve, reject) => {
            exec('git checkout ' + hash, {
                cwd: dir === undefined ? process.cwd() : dir
            }).on('exit', (code) => {
                if (code === 0) {
                    resolve('now at commit ' + hash);
                } else {
                    reject('error switching commits code: ' + code);
                }
            });
        });
 
};
```
## 2 - The index.js file for the nodejs example

So now that I have my git module worked out I can now use it in the main index.js file for this nodejs example.

```
#!/usr/bin/env node
let git = require('./lib/git.js');
 
// read dir
let fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);
 
git.folderCheck()
.catch((e) => {
    return Promise.reject('not a git folder');
})
.catch((e) => {
    return Promise.reject('can not check git log');
})
// make sure we are at the latest commit on master
.then(() => {
    return git.toCommit('master');
})
// get commit list
.then(() => {
    return git.commitList(process.cwd(), 10);
})
.then((commitList) => {
    let i = commitList.length,
    commitObj;
    console.log(commitList);
    console.log('');
    let loop = (done, error) => {
        i--;
        if (i === -1) {
            done();
        } else {
            commitObj = commitList[i];
            console.log(i, commitObj.commit);
            git.toCommit(commitObj.commit, process.cwd())
            .then(() => {
                return readdir(process.cwd());
            })
            .then((files) => {
                console.log(files);
                loop(done, error);
            })
            .catch((e) => {
                console.log(e);
                error(e);
            })
        }
    };
    return new Promise((resolve, reject) => {
        loop(() => {
            resolve('looks good');
        }, (e) => {
            reject(e);
        })
    });
})
.then(() => {
    console.log('looks good');
    return git.toCommit('master');
})
.catch((e) => {
    console.log(e);
});
```