---
title: Nodejs write file method basics and more
date: 2020-05-12 17:09:00
tags: [node.js]
layout: post
categories: node.js
id: 657
updated: 2021-10-05 12:40:55
version: 1.11
---

The nodejs [read file file system method](https://nodejs.org/en/knowledge/file-system/how-to-read-files-in-nodejs/) is a method in node build in [file system module](/2018/02/08/nodejs-filesystem/). This method might work just fine when I just want to read a file in full, and not do anything fancy with streaming or reading by way of a buffer. In most cases this method will work fine if I just simple want to read a small file, however it is not a golden hammer for all situations in which I need to read data from the local file system. Never the less it would seem that I never got around to writing a post on this method, so lets get this one out of the way.

<!-- more -->

## 1 - Some basic examples of the nodejs read file method

In this section I will be starting out with some very basic examples of the read file method. I also use this kind of section to bring up other things that should be known before continuing to read the rest of the post. One thing I often bring up is that this is not a [getting started type post with nodejs](/2017/04/05/nodejs-helloworld/), or [javaScript in general](/2018/11/27/js-getting-started/), so I assume you have at least some background with this topics.

### 1.1 - The source code examples here are up on guthub

As I come around to editing my old nodejs posts, I have made it a habit to make sure I always link to any github project in which I have the source code for the examples that I am writing about in the post. With that said the source code examples here can be found in my [core nodejs demos github repository](https://github.com/dustinpfister/node-js-core-examples/tree/master/for_post/nodejs-filesystem-read-file).

### 1.2 - very basic hello world style example of fs.readFile

First off with examples here I have a very basic example of the read file method where I am using the read file method to read the source code file itself. With that said I named this script basic.js and when I call node and pass the basic.js name of the file the result will be the source code of the file itself spit out to the standard output of the console.

```js
let fs = require('fs');
fs.readFile('./basic.js', (err, data) => {
    console.log(Buffer.isBuffer(data)); // true
    console.log(typeof data); // 'object'
    console.log(data.toString()); // [text of this code]
});
```

If I do not give an encoding when calling the read file method, the result that will be returned is a buffer for the data. This is because the default encoding for the read file method is binary. So then when it comes to reading text files there is the option of giving an encoding value when calling the method, or using the to string method of the buffer instance like I did in this example.

### 1.3 - Setting the encoding

Often I am working with text files rather than some kind of binary data. Although I can always just call the to string method of a buffer, often I give the utf8 encoding in order to read text files.

```js
let fs = require('fs');
fs.readFile('./basic.js', 'utf8', (err, data) => {
    console.log(Buffer.isBuffer(data)); // false
    console.log(typeof data); // string
});
```

### 1.4 - Error handing

The first argument of the callback function used with the read file method is for any errors that might happen when reading a file. If all goes well the value of this error argument is null when resolves to a false value. However when something does go bad there are a few things that can happen when reading files. The most typical errors though would be not file access permissions, and the file not being there.

```js
let fs = require('fs'),
uri_conf = './conf.json';
 
let step = (obj) => {
    obj.count += 1;
    console.log('count is now: ' + obj.count);
    fs.writeFile(uri_conf, JSON.stringify(obj), (e) => {
        if (e) {
            console.log(e.message)
        } else {
            console.log('updated conf.json');
        }
    })
};
 
fs.readFile(uri_conf, 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('NO conf.json FILE, making a new one!');
            let newObj = {
                count: 0
            };
            fs.writeFile(uri_conf, JSON.stringify(newObj), (e) => {
                if (!e) {
                    step(newObj);
                }
            })
        }
    } else {
        try {
            step(JSON.parse(data));
        } catch (e) {
            console.warn(e.message);
        }
    }
});
```

## 2 - Conclusion

That will be it for now when it comes to the read file method of the file system module in nodejs. For now I just wanted to cover the basics of the method at least, however I do have plans to further expand this post when I get some more time to do so.

