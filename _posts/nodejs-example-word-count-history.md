---
title: Word Count History nodejs example
date: 2020-10-22 15:46:00
tags: [node.js]
layout: post
categories: node.js
id: 727
updated: 2021-03-16 15:51:12
version: 1.16
---

This [nodejs example](/2021/03/16/nodejs-example/) is a project that I wanted to start a long time ago, but kept putting off. It is a script that will use a git log command to get a list of commit hash ids from the latest commit on master. Once it has a list of commit hash ids it will use a git checkout command to switch to the oldest commit in the list. From there is will loop up back to the newest commit in the list again.

The full idea that I had for this example is to have a script that will create a word count history for my blog post collection. It is just one little idea that I think might help me to stay the course when it comes to working on this blog posts and javaScript examples. In other words the general idea is to have a tool that will help me to track productivity by tracking how much writing I am doing every day, and having a script that will create word count totals per day or commit. However as of this writing I have not got this far with the script, and depending if I get some more time to work on it I might not finish.

<!-- more -->

## 1 - The git lib of the nodejs example

I have a single module for this nodejs example thus far that has a whole bunch of methods to help me work with a git folder. I have a method that will just check if a given folder is a git folder, and return a resolve or rejected promise depending on that. I have another method that will create a list of commits from the current commit back a number of commits, and other such methods. So in this section I will be going over this module, and how it helps with this word count history nodejs example.

### 1.1 - the start of the module, and the folder check method

So at the top of the module I am referencing in the [exec child process modules method](/2020/10/21/nodejs-child-process-exec/). If you are not familiar with this method as well as other alternatives such as spawn I recommend reading up on them. The methods can be used to call extremal commands on the operating system such as, but certainly not limited to git.

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
```

In any case this method makes use of the git status command to just find out if the given folder is a git folder or not, and that is it.

### 1.2 - The get commit list method

Here I have a method that will create a list of commit objects, where each commit property of a commit object is the hash id of a given commit. In addition a commit object will have at least a few more properties maybe, but for now the only one I am pretty sure I am going to want to have is date. 

This method makes use of the [git log](/2019/05/29/git-log/) command that would be what is used to create a list of commits manually in the command line. I am also making use of the format option of that command to get a clean output that is just the commit hash ids and dates.

```js
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
```

### 1.3 - the to Commit method

The to commit method that I worked out for this module can be used to set the commit of a git folder by giving the hash id for the commit, or something like master. This method makes use of the git checkout command that would be used to set the current commit of a git folder manually.

```js
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

So now that I have my git module worked out I can now use it in the main index.js file for this nodejs example. Here I am using the folder check method of the git module to check if I am event working in a git folder to begin with, after, that I make sure that the current commit is the latest commit on the master branch. I then use the git commit list method to get an array of objects for each commit going back a set number of commits to the latest commit on master.

Once I have my Commit Object list I can the use the commit hash id of each object to go back to the point that is a set number of commits back, check something out, and then move up to the latest commit. For now I am just reading the contents of the folder at each point, but the idea is to create a word count history for each markdown file in the folder.

I ran into a snag when it comes to working with the commit list and a promise chain. There is the [promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method in native javaScript, but the problem I was running into had to do with the asynchronous nature of the method. I need a way to go about running threw an array of promises in sequence, and there is no native method that I know of to do that. I was considering making bluebird part of the stack for this project, along with maybe a few more packages because bluebird has a method called [Promise.each](http://bluebirdjs.com/docs/api/promise.each.html) that seems to be what I have in mind. In any case I work out a crude yet effect way to just get this done.

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

## 3 - Conclusion

I have not yet finished this canvas example so there is more work that I need to put into this one before I can really conclude how things went for this example. So far it is working as expected though, I have found that it might be best to try to break a project like this down into many small fine grain minor release rather than trying to get the whole thing done within a few hours or so.

This is the first time I have made a nodejs project like this in which I am using the child process module to call git a whole bunch of times to change what the current commit is of a got folder. For now it is not doing much, but the basic core idea of what I wanted is working at least for what it is worth.