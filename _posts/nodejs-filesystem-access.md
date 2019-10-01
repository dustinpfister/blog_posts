---
title: Fs access nodejs filesystem method for checking file access permissions
date: 2019-09-29 19:31:00
tags: [node.js]
layout: post
categories: node.js
id: 539
updated: 2019-10-01 13:14:23
version: 1.2
---

The nodejs access file system method can be used to check file access permissions in a nodejs environment. The method can accept a mode as one of its arguments that can be used to set the kind of file access permissions that are to be check, and in the event that the check fails for whatever the reason an error object will be given as the first argument of the call back function that is also given as an argument. There is a bit to cover when it comes to the use of the nodejs access file system module method, as well as file access permissions in general, so lets get started.

<!-- more -->

## 1 - nodejs fs access method basic example

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