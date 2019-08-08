---
title: The node stream module and making custom readable and writable streams
date: 2019-08-08 10:51:00
tags: [node.js]
layout: post
categories: node.js
id: 518
updated: 2019-08-08 11:25:47
version: 1.1
---

So I have wrote a few posts on streams when it comes to the create read stream and create write stream file system module methods, as well as many other such methods in various native nodejs modules. However I have not wrote much on the node stream module by itself, and how to go about using that module to make my own custom streams. Also it is important to know a thing or two about this module and the nature of streams in general when it comes to working on nodejs projects. So I thought I would put together a piece of content in which I am focusing on the node stream module and custom made streams, rather than something else in nodejs that inherits from the base classes in this module.

<!-- more -->

## 1 - Readable Node Stream example that streams random letters

So there are writable streams and duplex streams that can both read and write, but for starters readable streams might be a good place to begin with streams in nodejs. So I made a quick example that can be used to stream random letters to a writable stream that can console the data. This might not be the most piratical example of a readable stream, but the basic concepts can surly be applied to a stream that might have some kind of piratical application.

```js
let stream = require('stream');

// returns a RandomLetters Readable Stream
exports.RandomLetters = function (opt) {
    opt = opt || {};
    let byteCount = opt.startIndex === undefined ? 0: opt.startIndex,
    totalBytes = opt.totalBytes === undefined ? 1024: opt.totalBytes;
    return new stream.Readable({
        // must have a read method
        read: function () {
            let n = 65 + Math.round(25 * Math.random());
            let buff = Buffer.from(n.toString(16), 'hex');
            if (byteCount < totalBytes) {
                // use the push method to push data to be
                // consumed
                this.push(buff);
            } else {
                // push null when done
                this.push(null);
            }
            byteCount += 1;
        }
    });
};
```