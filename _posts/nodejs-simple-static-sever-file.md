---
title: A simple Node Static file server with just the node.js built in modules.
date: 2017-12-04 17:48:00
tags: [js,node.js]
layout: post
categories: node.js
id: 108
updated: 2021-09-08 14:31:38
version: 1.14
---

When working with many node projects I often run into a situation in which I need to just set up a simple static web sever, often purely for the sake of serving a path over http:// rather than file://. There are many npm packages such as [node-static](https://www.npmjs.com/package/node-static) that can be used to pull this off, but I often find myself just working out a simple solution using the built in http module in node itself. It can be a bit time consuming to do this though, and when it comes to starting a more serious production app it might be better to use a well supported framework such as express to make quick work of this and much more. However in this post I will be using just plain old native javaScript in node.js to create a simple node static file server.


<!-- more -->

## 1 - Node Static Basics

So the general idea of a node static server is that I have some plain old static files in a public folder and I just want to serve them up over the http protocol on my local computer. Maybe what I am working on will be deployed to a site elsewhere at a latter time, or maybe I am just running into some problems that will pop up when doing everything over the file protocol. Whatever the case may be in some situations I might find myself in a situation in which I need to host a folder on the local file system of a computer and it will just need to respond to get requests and that is it.

So I just need a script that I can call from node like this.

```
$ node sever
```

And the script will serve static files that I have in a public folder localed at the current working path where I have the script, or a hard coded default public folder location. I could also install the script globally, but for now I just want to make a script that is closely tied to the project folder. There is looking into what the options are when it comes to popular frameworks, and what features they have to make quick work of this sort of thing and move on with what really matters with your project. However in some situations I might want to have some kind of drop in vanilla javaScript solution and not make use of some kind of user space library or framework.

## 1.1 - Using express static if you do not mind using express

If you do not mind adding express to a projects list of dependencies, of it is is a part of it all ready, this can be done very quickly with the [express static](/2018/05/24/express-static/) built in middle ware. By doing so it will not be a native vanilla  javaScript solution for this, but express is a great project for getting going with a serious back end project. Also when it comes to using express there is a great official middle ware called [serve index](/2021/03/22/express-example-serve-index/) that will go beyond what is built in with additional features that will generate an index for paths to which there is no index html file.

## 2 - New static sever solution example that uses promises

I first wrote this post back in December of 2017, the old script still works okay, but as of this writing I have made at least one new revision of this simple static sever file. The main goal was to just have a more fine grain form of file where I break things down a little more with various helper methods rather than having a file where there are a lot of nested calls of file system methods. So then in this from of the file I am now using promises, making use of the [promsiify method of the built in util module](/2019/06/22/nodejs-util-promisify/) to make sure that the use of a file system method will return a promise on older versions of node where that is not the standard.

```js
/*
 *  server.js
 *
 *   This just provides a simple static server for the project.
 *
 *   ex: $ node server ./ 8080
 *
 */
 
let http = require('http'),
fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
lstat = promisify(fs.lstat),
readFile = promisify(fs.readFile),
readdir = promisify(fs.readdir);
 
// the root folder to serve
let root = process.argv[2] || path.join(__dirname, '../..');
 
// set port with argument or hard coded default
let port = process.argv[3] || 8080; // port 8888 for now
 
// create path info object
let createPathInfoObject = (url) => {
    // remove any extra / ( /foo/bar/  to /foo/bar )
    let urlArr = url.split('');
    if(urlArr[urlArr.length - 1] === '/'){
        urlArr.pop();
        url = urlArr.join('');
    }  
    // starting state
    let pInfo = {
        url : url,
        uri : path.join(root, url),
        encoding: 'utf-8',
        mime: 'text/plain',
        ext: '',
        contents: [],
        html: ''
    };
    //return pInfo;
    return lstat(pInfo.uri)
    .then((stat)=>{
        pInfo.stat = stat;
        if(pInfo.stat.isFile()){
            pInfo.ext = path.extname(pInfo.uri).toLowerCase();
            pInfo.ext = path.extname(pInfo.uri).toLowerCase();
            pInfo.mime = pInfo.ext === '.html' ? 'text/html' : pInfo.mime;
            pInfo.mime = pInfo.ext === '.css' ? 'text/css' : pInfo.mime;
            pInfo.mime = pInfo.ext === '.js' ? 'text/javascript' : pInfo.mime;
             // images
            pInfo.mime = pInfo.ext === '.png' ? 'image/png' : pInfo.mime;
            pInfo.mime = pInfo.ext === '.ico' ? 'image/x-icon' : pInfo.mime;
            // binary encoding if...
            pInfo.encoding = pInfo.ext === '.png' || pInfo.ext === '.ico' ? 'binary' : pInfo.encoding;
            return pInfo;
        }
        if(pInfo.stat.isDirectory()){
            pInfo.ext = '';
            pInfo.mime = 'text/plain';
            pInfo.encoding = 'utf-8';
        }
        return createDirInfo(pInfo);
    });
};
 
// create an html index of a folder
let createHTML = (pInfo) => {
    var html = '<html><head><title>Index of - ' + pInfo.url + '</title>'+
    '<style>body{padding:20px;background:#afafaf;font-family:arial;}div{display: inline-block;padding:10px;}</style>' +
    '</head><body>';
    html += '<h3>Contents of : ' + pInfo.url + '</h3>'
    pInfo.contents.forEach((itemName)=>{
        let itemURL = pInfo.url + '/' + itemName;
        html += '<div> <a href=\"' + itemURL + '\" >' +  itemName + '</a> </div>'
    });
    html += '</body></html>';
    return html;
};
 
// create dir info for a pInfo object
let createDirInfo = (pInfo) => {
    // first check for an index.html
    let uriIndex = path.join( pInfo.uri, 'index.html' );
    return readFile(uriIndex)
    // if all goes file we have an indrex file call createPathInfoObject with new uri
    .then((file)=>{
        pInfo.uri = uriIndex;
        pInfo.ext = '.html';
        pInfo.mime = 'text/html';
        return pInfo;
    })
    // else we do not get contents
    .catch(()=>{
        return readdir(pInfo.uri);
    }).then((contents)=>{
        if(contents && pInfo.ext === ''){
            pInfo.contents = contents;
            pInfo.mime = 'text/html';
            pInfo.html = createHTML(pInfo);
        }
        return pInfo;
    });
};
 
// create server object
let server = http.createServer(function (req, res) {
    // create path info object for req.url
    createPathInfoObject(req.url)
    // if we have a pinfo object without any problems
    .then((pInfo)=>{
        // send content
        res.writeHead(200, {
            'Content-Type': pInfo.mime
        });
        // if we have html send that
        if(pInfo.html != ''){
            res.write(pInfo.html, pInfo.encoding);
            res.end();
        }else{
            // else we are sending a file
            readFile(pInfo.uri, pInfo.encoding).then((file)=>{
                res.write(file, pInfo.encoding);
                res.end();
            }).catch((e)=>{
                // send content
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write(e.message, 'utf8');
                res.end();
            });
        }
    }).catch((e)=>{
        // send content
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message, 'utf8');
        res.end();
    });
});
 
// start server
server.listen(port, function () {
    console.log('hosting a public folder at: ');
    console.log('path: ' + root);
    console.log('port: ' + port);
});
```

## 3 - Old static sever solution

So here is a basic node static file server file that I worked out. Here I just placed this code in a file called server1.js in the root path of the project folder. In the project folder I also have a public folder and in there I have a index html file at the root of the project folder.

I use the file system module of nodejs to check the stats of a file that is being requested. If the file is there then it will be sent to the client, if the file is not there then a 500 status will result and the request will be ended. If the file is there the file system module read file method will be used to read and send the contents of the file.

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

## 4 - Conclusion

Writing these kinds of files now and then is fun. Of course it is not battle tested, but it seems to work fine for me in most cases when it just comes to playing with some kind of javaScript project that needs to be severed up over http.