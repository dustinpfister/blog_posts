---
title: Making a simple static sever file with just node.js built in modules.
date: 2017-12-04 17:48:00
tags: [js,node.js]
layout: post
categories: node.js
id: 108
updated: 2019-09-08 15:43:14
version: 1.3
---

When working with many node projects I often run into a situation in which I need to just set up a simple static web sever, often purely for the sake of serving a path over http:// rather than file://. There are many npm packages to pull this off, but I often fined myself, just working out a simple solution using the built in http module in node itself. It can be a bit time consuming to do this though, and when it comes to starting a more serious production app it might be better to use a framework to make quick work of this. However in this post I will be using just plain old native javaScript in nodejs to create a simple nodejs static file server.


<!-- more -->

As such I have been making files now and then that serve as a simple solution that can be dropped into a project path and then called from the cli with node like this:

```
$ node sever
```

As such I thought I would write a quick post on one of the latest solutions I have written for doing this:

## 1 - Sever.js file solution one

```js
/*
 *  server.js
 *
 *   This just provides a simple static server for the project.
 *
 */

let http = require('http'),
fs = require('fs'),
path = require('path'),

// set root with first argument, or assume a public folder in the current
// working dir
root = path.resolve(process.argv[2] || path.join(process.cwd(), './public')),

// set port with second argument, or 8888
port = process.argv[3] || 8888; // port 8888 for now

// create and start the server
let server = http.createServer(function (req, res) {
    // get the path
    let p = path.join(root, req.url);
    // get stats of that path
    fs.lstat(p, function (e, stat) {
        // if error end
        if (e) {
            res.writeHead(500);
            res.write(JSON.stringify(e));
            res.end();
        }
        // if stats check it out
        if (stat) {
            // if it is not a file append index.html to path, and try that
            if (!stat.isFile()) {
                p = path.join(p, 'index.html');
            }
            // default encoding to utf-8, and get file extension
            let encoding = 'utf-8';
            let ext = path.extname(p).toLowerCase();
            // binary encoding if...
            encoding = ext === '.png' ? 'binary' : encoding;
            // try to read the path
            fs.readFile(p, encoding, function (e, file) {
                // if error end
                if (e) {
                    res.writeHead(500);
                    res.write(JSON.stringify(e));
                    res.end();
                }
                // if file, send it out
                if (file) {
                    // default mime to text/plain
                    let mime = 'text/plain';
                    // text
                    mime = ext === '.html' ? 'text/html' : mime;
                    mime = ext === '.css' ? 'text/css' : mime;
                    mime = ext === '.js' ? 'text/javascript' : mime;
                    // images
                    mime = ext === '.png' ? 'image/png' : mime;
                    res.writeHead(200, {
                        'Content-Type': mime
                    });
                    res.write(file, encoding);
                    res.end();
                }
            });
        }
    });
});
 
// start server
server.listen(port, function () {
    console.log('hosting a public folder at: ');
    console.log('path: ' + root);
    console.log('port: ' + port);
});
```

So of course this solution just handles GET requests which works fine in most situations. In the event that a path is given such as '/' then '/index.html' is assumed. In addition in the event of any kind of error the request is just ended, and I do not serve any kind of 404 page.

## 2 - Conclusion

Writing these kinds of files now and then is fun. Of course it is not battle tested, but it seems to work fine for me in most cases when it just comes to playing with some kind of javaScript project that needs to be severed up over http.