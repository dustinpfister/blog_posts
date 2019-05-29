---
title: Git log examples and nodejs scripts
date: 2019-05-29 11:18:00
tags: [git,node.js]
layout: post
categories: git
id: 465
updated: 2019-05-29 11:47:07
version: 1.5
---

The git log command can be used to log out a list of comment subject messages, commit hash numbers, and A wide range of other things about each commit in a git folder. It is a useful little command with many format options that can be useful when it comes to writing some kind of script that loops over all commits in a repository. There is just using the command by itself in the command line, and then there is piping it to something else, or better yet making a node.js script that uses it via the spawn method in the child process module. In this post I will be going over some quick examples of doing bolth.

<!-- more -->

## 1 - git log commend line examples

So in the section I will be starting out with some command line examples of the git log command. Because we are just logging information about commits there should not be any risk of messing up a git folder, but do not just take my word for it always take a look at the manual pages of a command that you are not familiar with, and always make sure your data is backed up if you are new to git.

### 1.1 - Basic git log example

So for starters there is just using the git log command in the command line by itself, by just typing git log in the command line you end up with the default result of doing so in a git folder.

```
$ git log
```

This will result in all of the commits being displayed with a default format that includes the command hash number the author of the commit the date of the commit and then then subject message. However there will come a time in which only a certain number of commits should be logged and with a custom format. So that being said there is of course a whole lot of options that can be used to do just that, I am not going to go over all of them of course. However I will be taking a quick look at some of them, including how to make a custom format for the use in a node.js script. However lets look at some more simple command line only examples before getting to that.

### 1.2 - Limiting the number of commits and custom formating

So here I have an example that limits the number of commits to 3 and also makes use of custom formating.

```
$ git log -n 3 --format=(subject)%s(hash)%H 
```

## 2 - Basic git log node.js script that logs subject names

```js
// using spawn in the child process module
let spawn = require('child_process').spawn,
// start get log process
git = spawn('git', ['log', '--format=%s']),
// buffer for data
buf = Buffer.alloc(0);
// concat
git.stdout.on('data', (data) => {
    buf = Buffer.concat([buf, data])
});
// if process error
git.stderr.on('data', (data) => {
    console.log(data.toString());
});
// when process is done
git.on('close', (code) => {
    // convert to string and split based on end of line
    let subjects = buf.toString().split('\n');
    // pop the last empty string element
    subjects.pop();
    // log all subject names
    subjects.forEach((sub) => {
        console.log(sub);
    });
});
```

## 3 - Filtering

```js
let spawn = require('child_process').spawn,
git = spawn('git', ['log', '--format=%s:c-%H']),
buf = Buffer.alloc(0);
git.stdout.on('data', (data) => {
    buf = Buffer.concat([buf, data])
});
git.stderr.on('data', (data) => {
    console.log(data.toString());
});
 
// when process is done
git.on('close', (code) => {
    let subjects = buf.toString().split('\n');
    subjects.pop();
 
    // filter by post_update:id-[id number]:v-[version number]
    subjects = subjects.filter((sub) => {
            return sub.match(/^post_update:/);
        });
 
    // log all subject names
    subjects.forEach((sub) => {
        console.log(sub.split(':'));
    });

});
```