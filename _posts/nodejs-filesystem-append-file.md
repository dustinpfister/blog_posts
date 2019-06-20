---
title: node append file fs method
date: 2019-06-20 09:04:00
tags: [node.js]
layout: post
categories: node.js
id: 483
updated: 2019-06-20 10:40:01
version: 1.3
---

In nodejs projects file system management comes up a lot, and so does the act of [appending a file](https://nodejs.org/docs/latest-v8.x/api/fs.html#fs_fs_appendfile_file_data_options_callback) that all ready exists rather than completely rewriting a file all together. The node append file fs module method is a file system method that can be used to quickly finish most tasks that have to do with creating a file if it does not exist, or just simply appending to the end of it if it does. A task that is common of most log files that have to do with just simply spitting out a recode or what is going on with something.

<!-- more -->

## 1 - node append file method basic example

```js
var fs = require('fs'),
os = require('os'),
d = new Date(),
text = 'run on ' + d + os.EOL;
fs.appendFile('./test.txt', text, function (e) {
    if (e) {
        console.log(e.message);
    } else {
        console.log('text.txt updated');
        console.log(text);
        console.log('');
    }
});
```
