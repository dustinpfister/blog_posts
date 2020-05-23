---
title: Getting the home directory in nodejs
date: 2020-05-20 18:16:00
tags: [node.js]
layout: post
categories: node.js
id: 659
updated: 2020-05-23 18:53:24
version: 1.5
---

The [home directory](https://en.wikipedia.org/wiki/Home_directory) or user folder in an operating system is a folder for the current user. This folder is then a good place to park any kind of user specific settings or data when making a nodejs application. So then there should be some kind of standard way of getting a path to this folder in a way that will work across different operating systems. With that said there is in the nodejs built in [os module](https://nodejs.org/docs/latest/api/os.html), to which there is a method called [homedir](https://nodejs.org/docs/latest/api/os.html#os_os_homedir).

<!-- more -->

## 1 - Basic nodejs os home dir example

A basic example of the node os module homedir method would be to just require in the os module, and then call the homedir method of that module. The string value that is returned is then the home or user folder path for the current user that ran the script.

```js
let os = require('os'),
 
dir_home = os.homedir();
 
console.log(dir_home);
// C:\Users\[username] in Windows
// /home/[username] in Linux
```

So the os module homedir method can be used in conjunction with other modules and methods for things like checking to see if there is a config file for the current user in the home path, and if not create it.

## 2 - basic count file example

```js
let os = require('os'),
path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
dir_home = os.homedir();
 
// get user count file
let getUserCount = () => {
    let path_count = path.join(dir_home, '.count.json');
    return readFile(path_count)
    .then((data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            return {
                count: 0
            }
        }
    })
    .catch((e) => {
        return {
            count: 0
        }
    });
};
 
let putUserCount = (obj) => {
    let path_count = path.join(dir_home, '.count.json');
    return writeFile(path_count, JSON.stringify(obj));
};
 
getUserCount()
.then((obj) => {
    console.log(obj.count);
    obj.count += 1;
    return putUserCount(obj);
});
```