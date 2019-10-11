---
title: Fs access nodejs filesystem method for checking file access permissions
date: 2019-09-29 19:31:00
tags: [node.js]
layout: post
categories: node.js
id: 539
updated: 2019-10-11 15:43:25
version: 1.5
---

The nodejs [fs access](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback) file system method can be used to check file access permissions in a nodejs environment. The method can accept a mode as one of its arguments that can be used to set the kind of file access permissions that are to be check, and in the event that the check fails for whatever the reason an error object will be given as the first argument of the call back function that is also given as an argument. There is a bit to cover when it comes to the use of the nodejs access file system module method, as well as file access permissions in general, so lets get started.

<!-- more -->

## 1 - nodejs fs access method basic example

The access method can be used by just giving the path to check the file system access followed by the mode that is to be used to set the check to be preformed. Once the check is over the given callback will fire and if an error happens there will be a non null error value for the error argument of the callback.

```js
let fs = require('fs');
 
fs.access('./basic.js', 0o777, function (e) {
 
    if (e) {
        console.log(e.message);
    } else {
        console.log('access is good');
    }
 
});
```

So the fs access method in the nodejs file system module can be used to find out of a file event exists to begin with, and in addition if there is the desired file permissions as well.