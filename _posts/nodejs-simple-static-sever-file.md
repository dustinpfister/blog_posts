---
title: A simple Node Static file server with just the node.js built in modules.
date: 2017-12-04 17:48:00
tags: [js,node.js]
layout: post
categories: node.js
id: 108
updated: 2019-09-08 16:01:05
version: 1.6
---

When working with many node projects I often run into a situation in which I need to just set up a simple static web sever, often purely for the sake of serving a path over http:// rather than file://. There are many npm packages such as [node-static](https://www.npmjs.com/package/node-static) that can be used to pull this off, but I often find myself just working out a simple solution using the built in http module in node itself. It can be a bit time consuming to do this though, and when it comes to starting a more serious production app it might be better to use a well supported framework such as express to make quick work of this and much more. However in this post I will be using just plain old native javaScript in node.js to create a simple node static file server.


<!-- more -->

## 1 - Node Static Basics

So the general idea of a node static server is that I have some plain old static files in a public folder and I just want to server them up over the http protocol on my local computer. Maybe what I am working on will be deployed to a site elsewhere at a latter time, and for whatever the reason I just need to serve it up on my computer via something other than the file protocol.

So I just need a script that I can call from node like this.

```
$ node sever
```

And the script will serve static files that I have in a public folder localed at the current working path where I have the script. I could also install the script globally, but for now I just want to make a script that is closely tiles to the project folder.
## 1.1 - Using express static is you do not might using express

If you do not might adding express to a project folders static this can be done very quickly with the [express static](/2018/05/24/express-static/) method. By doing so it will not be a native javaScript only solution for this, but express is a great project for getting going with a serious back end project. Still this post is about working out a native javaScript solution for this so on with that.

## 2 - Sever.js file solution one

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

## 3 - Conclusion

Writing these kinds of files now and then is fun. Of course it is not battle tested, but it seems to work fine for me in most cases when it just comes to playing with some kind of javaScript project that needs to be severed up over http.