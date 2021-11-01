---
title: Git diff examples
date: 2020-07-07 17:01:00
tags: [git]
layout: post
categories: git
id: 677
updated: 2021-11-01 08:41:54
version: 1.10
---

The [git diff](https://git-scm.com/docs/git-diff) command is useful for finding changes between two commits when using git for source control. there are many options for formatting the output also, so for one example say I am just interesting in getting a list of files that have changed from a given starting and ending commit it, such a task can be completed by using the git diff command with the name only option.

I am also a javaScript developer so this post will also be on a few quick examples that make use of the child process module in core nodejs to make git command calls that help get a list of files that have changed between tow commits in a repository. However I will be going over some examples that can just be used in the command line interface also of course.

<!-- more -->


## 1 - Git log and git diff --name-only for getting a list of files that changed

So one task that comes to mind is that I would like to have a way to just get a list of files that have changed from one commit to the next. I could use the git diff command with the --name-only command, but first I will want two commit ids before hand. So I can also use the [git log](/2019/05/29/git-log/) command to get a list of commit ids for say the last twenty commits of a repository. While I am at it I can also use the format option of the git log command to format the output so that it will just spit out commit id values.

```
$ git log -n 20 --format="%H"
d400b26b1262cc472422daacada58cc223e14f56
60a61eecc71c285e3a45f630d4bf9694b111c723
a7f6a4c4628ac9364959eae2734fb9fe7169e5fc
177fbf686774e33bbd3052b85fee7851a38c91e9
9c50450f33bbc172f534522a2c3ddb0124c75b76
9cba08cdd1e20922246893e7af365e89ec078b71
924406ece0ca6e7700085810a18d4d97d5b198ad
621bb77c7b2dc16b7cc11787a601072e06aa8040
429ae30f656f345d32d23f97ec99c1c6f1c3de66
1c2ace8e3032e13dacffddc0940eaed164da05a4
b00649e701606ad8c300de4f59964f7f4cf95373
ea0999ff3b9048533338ba4ede89da659a9db480
f3afdede77a69b638b39b6d9b0bb2a226568b5e7
75721127f491993a221211ba76e7fad06e6fdc49
dc1f6b48ddbec8fd7dea1d70a43f847f1ab1a5bf
fc891d25b2a11afb415857ad7ec113b150857173
33bdcf1ec5d9cf447ce223847302e6ef44b4c393
890ee71c4723ef55a1e3cd46e4259406d8dd08c8
92da29de41be142e636ecadef6e82ae47b159840
48b3efa92ee8711da5c825e4a3301a39d8b26467
```

Now that I have a list of commit ids going back some twenty commits I can use these to find out what files have changed from the oldest commit up to the latest one.

```
git diff 48b3efa92ee8711da5c825e4a3301a39d8b26467 d400b26b1262cc472422daacada58cc223e14f56 --name-only
_posts/canvas-example.md
_posts/git-diff.md
_posts/js-javascript-scope.md
_posts/js-nth-root.md
_posts/js-string-charat.md
```

Okay great now I have my list of files that have changed between one point in time, and another. I could then use this list of files, and commit ids to do cretin things with some additional scripting. Such as tabulating the total word count for each file in my \_posts folder at the oldest commit by creating a json file for each post in the folder for starters. Then just update the json files for the posts in this list rather than the full collection of some six hundred posts and growing resulting in much faster way of creating a word count increase history. 

## 2 - More on the PRETTY FORMATS for git log, before doing a git diff

Although this is a post on the git diff command I think that I should write at least a little more on what the options are for formatting the output of a git log command, to help with the process of doing a git diff command. The reason why I say that is because say I want to write a script that will log data for changes on a per day bases, back a certain number of commits. 

```
$ git log - n 10 --format = "%H;%cd"
4eb6ad5b99d91f100f56ab4a8a830312bafba73d;Mon Nov 1 07:58:04 2021 -0400 
4d4a1529bd16807786607bd9500b90ad23a1a965;Mon Nov 1 07:47:36 2021 -0400 
066e8e5d49d4f7474f8b5e46d41da13282e169e7;Sun Oct 31 08:24:46 2021 -0400 
dc32083169fe2850975f12817da144c5b3a27397;Sun Oct 31 08:03:50 2021 -0400 
4754d91bb6cd435fc572b198e82e2827d25520a7;Sun Oct 31 08:01:41 2021 -0400 
ef014c926775526c3b023ae3886d3838a4b7cde5;Sun Oct 31 07:56:44 2021 -0400 
d71301a577b1473eaa4034ab62d240bdb13031b7;Sun Oct 31 07:52:56 2021 -0400 
8a68fc77e84b5dd88614ac158ed41edfaf18714a;Sun Oct 31 07:39:52 2021 -0400 
274127a66c9062ca5d06a73f6ffdbb66de1563c1;Sun Oct 31 07:13:20 2021 -0400 
713839e62d2e4cba88bf426852e9fe0d5aab3e5e;Sun Oct 31 07:01:59 2021 -0400
bcb108e2f904760325b24a9e87c848ac91b4ba25;Sun Oct 31 06:59:12 2021 -0400 
d12bfeca231f1a9a3ac31442cc00933b2513f333;Sun Oct 31 06:57:25 2021 -0400 
8d7abf154aec4a0656985718251dc2ea5a8e8a3a;Sun Oct 31 06:36:42 2021 -0400 
f049ab771a307a13779863810899cbfc5a81beb4;Sun Oct 31 06:31:56 2021 -0400 
c85fcda581d08321f5e901b8aae0131093122c68;Sat Oct 30 14:23:54 2021 -0400 
b789759ed599ce0940d805b35c556222ffcf1b6b;Sat Oct 30 13:59:53 2021 -0400 
393fa198fd1348a38f0fb4550755979266699f16;Sat Oct 30 13:56:17 2021 -0400 
ceb5d8eb734724b65d0db52ddb44a76b5b5d1573;Sat Oct 30 13:51:43 2021 -0400 
db423c9e8fe13caa653c713ec89a06e4bbf59bbc;Sat Oct 30 13:48:48 2021 -0400 
872400cc62206da86bb99ad5a9634d92a689273a;Sat Oct 30 13:45:58 2021 -0400
```

I can then use this info to just get the files that where edited on Oct 31 with git diff like this:

```
$ git diff f049ab771a307a13779863810899cbfc5a81beb4 066e8e5d49d4f7474f8b5e46d41da13282e169e7 --name-only
_posts/js-onchange.md
_posts/js-operator-precedence.md
```

The date format that is used for dates with the \%cD format option is RFC2822 style date strings. What is great about this format is not just that it is easy to manually read the output from git log, it is also a format that can be used to pass to the javaScript date constructor.

```js
var d = new Date('Sun Oct 31 06:31:56 2021 -0400');
console.log(d.getFullYear()) // 2021
console.log(d.getMonth() + 1) // 10
console.log(d.getDate()) // 31
```

So then it is possible to write a nodejs script that would use the child process module to do a git log command, then parse the standard output into an array of objects that contain a commit hash id, and date object as properties. This array can then be used as a way to go about making one or more git diff calls to get the differences that have happened on a per day, rather than per commit basis.

## 3 - A nodejs powered project that makes use of git log, and git diff to get a list of files that changed

So now I though I would work out a little javaScript code that is a small collection of nodejs module that make use of git log, and git diff via the spawn child process module method on nodejs. This will just be two modules and an additional script that makes use of these modules. The first module will use git log to get a list of commit ids, and then the second module will use git diff to get a list of file names from that collection of commit ids, as well as a staring and ending index value.

### 3.1 - A git-commit-list module that uses git log

So first I want a module that I can just use to get an array of commit ids for a given current working directly that should be a git folder.

```js
let spawn = require('child_process').spawn;
module.exports = (opt) => {
    opt = opt || {};
    opt.count = opt.count === undefined ? 3 : opt.count;
    let spawn_options = {
        cwd: opt.cwd || process.cwd(),
    },
    git = spawn('git', ['log', '-n ' + opt.count, '--format=%H'], spawn_options);
    buf = Buffer.alloc(0);
    return new Promise((resolve, reject) => {
        git.stdout.on('data', (data) => {
            buf = Buffer.concat([buf, data])
        });
        git.stderr.on('data', (data) => {
            reject(data.toString());
        });
        git.on('close', (code) => {
            let commits = buf.toString().split('\n');
            commits.pop();
            resolve(commits);
        });
    });
};
```

### 3.2 - A git-commit-list-diff module that uses git diff

Now that I have a way to get an array of commit ids, I can then have a module that will take that array of commit ids as an argument. This module will use the git diff command with ids from a commit id lost created with the other module to get a list of files that have changed between a starting and ending index value of ids in the commit id list.

```js
let spawn = require('child_process').spawn;
module.exports = (opt) => {
    opt = opt || {};
 
    if (opt.commits === undefined) {
        return Promise.reject('must give commit list');
    }
    let len = opt.commits.length;
    opt.firstIndex = opt.firstIndex === undefined ? len - 1 : opt.firstIndex;
    opt.lastIndex = opt.lastIndex === undefined ? 0 : opt.lastIndex;
 
    let spawn_options = {
        cwd: opt.cwd || process.cwd(),
    },
    git = spawn('git', ['diff', opt.commits[opt.firstIndex], opt.commits[opt.lastIndex], '--name-only'], spawn_options);
    buf = Buffer.alloc(0);
    return new Promise((resolve, reject) => {
        git.stdout.on('data', (data) => {
            buf = Buffer.concat([buf, data])
        });
        git.stderr.on('data', (data) => {
            reject(data.toString());
        });
        git.on('close', (code) => {
            let out = buf.toString();
            resolve(out);
        });
    });
};
```

### 3.3 - An index.js file that makes use of these modules

So now I just need a main index.js file that will make use of this.

```js
let list = require('./lib/git-commit-list.js'),
diff = require('./lib/git-commit-list-diff'),
path = require('path');
 
list({
    cwd: __dirname,
    count: 5
}).then((commits) => {
    return diff({
        firstIndex: 1,
        lastIndex: 0,
        commits: commits
    });
}).then((out) => {
    console.log(out);
}).catch((e) => {
    console.log(e);
});
```

## 4 - Conclusion

So the git diff command is one of many sub commands of git that will come up when working things out with a git repository. I can use it to just know what has changed in terms of content between the last commit, and the current state of files. Or I can go way back, and get a long list of files that have been altered from one point back in time up to another. I can then of course use the git diff command along with many others such as git log, and additional scripting to accomplish all kinds of tasks such as finding out increases in word count over time if it is a repository that contains markdown files of blog posts for example.