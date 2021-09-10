---
title: A Simple nodejs example of a sever that responds to post requests
date: 2021-09-10 12:03:00
tags: [node.js]
layout: post
categories: node.js
id: 928
updated: 2021-09-10 13:12:34
version: 1.6
---

A few years back I made a [simple nodejs script that is a basic drop in script that can be used to start a simple static sever](/2017/12/04/nodejs-simple-static-server-file/). I come back to the post now and then, and when I do I often edit the source code and the content a little. Anyway it is the kind of script that might not be a good choice to use in production, but when it comes to a simple pet project where I just want to host a public folder over the http protocol it seems to work okay thus far. Anyway the thought occurred that it would be nice to have another similar vanilla javaScript type solution for setting up this kind of script for a project only this time make it a script that is a slightly more advanced and will respond to post requests.

<!-- more -->

## 1 - What to know first before continuing to read this

### 1.1 - The source code for this can be found at my github

I am going over all the relevant source code in this post, but the full source code can be found at my [Git hub repository on this script](https://github.com/dustinpfister/nodejs-simple-http-request-get-post-system).

## 2 - The server script

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
os = require('os'),
fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
lstat = promisify(fs.lstat),
readFile = promisify(fs.readFile),
readdir = promisify(fs.readdir);
 
// THE MAX BODY SIZE
let BODY_MAX_SIZE = 1024;
 
// the root folder of the project
let dir_root = process.argv[2] || path.join(__dirname, '../..');
 
// the folder to look for middleware to know what to do for post requests
let dir_middleware = path.join(dir_root, 'middleware');
 
// default middleware that does nothing
let middleware = function(req, res, next){
    next(req, res);
}; 
 
// public folder to serve
let dir_public = process.argv[3] || path.join(__dirname, '../../public');
 
// set port with argument or hard coded default
let port = process.argv[4] || 8080; // port 8888 for now
 
// host defaults to os.networkInterfaces().lo[0].address
let netInter = os.networkInterfaces(), 
host = process.argv[5] || 'localhost';
if(netInter.lo){
    host = process.argv[5] || netInter.lo[0].address || 'localhost';
}
 
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
        uri : path.join(dir_public, url),
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
            pInfo.mime = pInfo.ext === '.json' ? 'application/json' : pInfo.mime;
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
    // if all goes file we have an index file call createPathInfoObject with new uri
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
 
// parse a body for a post request
let parseBody = (req, res, next) => {
    let bodyStr = '';
    req.body = {};
    req.on('data', function (chunk) {
        bodyStr += chunk.toString();
        // do some basic sanitation
        if (bodyStr.length >= BODY_MAX_SIZE) {
            // if body char length is greater than
            // or equal to 200 destroy the connection
            res.connection.destroy();
        }
    });
    // once the body is received
    req.on('end', function () {
        try{
            req.body = JSON.parse(bodyStr);
        }catch(e){
            req.body = bodyStr;
        }
        next(req, res);
    });
};
 
// create server object
let server = http.createServer();
 
let forRequest = {};
 
// for ALL GET requests
forRequest.GET = (req, res) => {
    // create path info object for req.url
    createPathInfoObject(req.url)
    // if we have a pinfo object without any problems
    .then((pInfo)=>{
        // if we have html send that
        if(pInfo.html != ''){
            res.writeHead(200, {
                'Content-Type': pInfo.mime
            });
            res.write(pInfo.html, pInfo.encoding);
            res.end();
        }else{
            // else we are sending a file
            readFile(pInfo.uri, pInfo.encoding).then((file)=>{
                res.writeHead(200, {
                    'Content-Type': pInfo.mime
                });
                res.write(file, pInfo.encoding);
                res.end();
            }).catch((e)=>{
                // send content
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.write(e.message, 'utf8');
                res.end();
            });
        }
    }).catch((e)=>{
        // send content
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message, 'utf8');
        res.end();
    });
};
 
// for any post request
forRequest.POST = (req, res) => {
    // parse the given body
    parseBody(req, res, function(req, res){
        res.resObj = {
           body: req.body,
           mess: ''
        };
        // call middleware
        middleware(req, res, function(res, res){
            // when done send a response
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            // send back this object as a response
            res.write(JSON.stringify(res.resObj), 'utf8');
            res.end();
        });
    });
};
 
// on request
server.on('request', (req, res)=>{
    // call method for request method
    var method = forRequest[req.method];
    if(method){ 
        method.call(this, req, res);
    }else{
        // send content
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.write('unsupported http method ' + req.method, 'utf8');
        res.end();
    }
});
 
// start server
server.listen(port, host, () => {
    console.log('server is up: ');   
    console.log('dir_root: ' + dir_root);
    console.log('dir_public: ' + dir_public);
    console.log('port: ' + port);
    console.log('host: ' + host);
    // try to set up middelware
    try{
        middleware = require( path.join(dir_middleware, 'index.js') );
        console.log('middleware index found.');
    }catch(e){
        console.log('no /middleware/index.js found.');
        console.log(e.message);
    }
});
```

## 3 - The Demo Project

### 3.1 - The middleware

```js
let http = require('http'),
os = require('os'),
fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
lstat = promisify(fs.lstat),
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
readdir = promisify(fs.readdir);
 
// the public folder
let dir_public = path.join(__dirname, '../public'),
// path to the map.json file
uri_map = path.join( dir_public, 'map.json' );
 
// create new map object helper
let createNewMap = () => {
    let map = { cells:[], w: 8, h: 8 };
    let i = 0, cell, len = map.w * map.h;
    while(i < len){
        cell = {
            i : i,
            x: i % map.w,
            y: Math.floor(i / map.w),
            typeIndex: 0
        };
        map.cells.push(cell);
        i += 1;
    }
    // start off map cell 0 with type index 1
    map.cells[0].typeIndex = 1;
    return map;
};
 
let updateMap = (map, body) => {
    if(body.action === 'setCellType'){
        var cellIndex = body.cellIndex,
        typeIndex = body.typeIndex;
        map.cells[cellIndex].typeIndex = typeIndex;
    }
};
 
module.exports = (req, res, next) => {
    // read map
    readFile(uri_map)
    // if all goes well reading map
    .then((mapText)=>{
        let map = {};
        try{
            map = JSON.parse(mapText);
        }catch(e){
            map = {};
        }
        // apply any actions to map
        updateMap(map, req.body);
        // write map
        writeFile(uri_map, JSON.stringify(map), 'utf8')
        .then(()=>{
            res.resObj.map = map;
            next(req, res);
        })
        .catch((e)=>{
            res.resObj.mess = 'error updating map.json: ' + e.message;
            res.resObj.map = map;
            next(req, res);
        });
 
    })
    // error reading map
    .catch((e)=>{
        res.resObj.map = {};
        // write a new map
        var newMap = createNewMap();
        // apply any actions to new map
        updateMap(newMap, req.body);
        // write map
        writeFile(uri_map, JSON.stringify(newMap), 'utf8')
        .then((map)=>{
            res.resObj.map = newMap;
            next(req, res);
        })
        .catch((e)=>{
            res.resObj.mess = 'error making new map.json: ' + e.message;
            res.resObj.map = newMap;
            next(req, res);
        });
    });
};
```

### 3.2 - The utils.js file for the client system

```js
var utils = {};
 
/********* ********** ********** *********/
//  MISCELLANEOUS METHODS
/********* ********** ********** *********/
 
// no operation ref
utils.noop = function () {};
 
/********* ********** ********** *********/
//  HTTP
 /********* ********** ********** *********/
 
// very simple http client
utils.http = function(opt){
    var opt = opt || {};
    // default options
    opt.url = opt.url || '';
    opt.method = opt.method || 'GET';
    opt.async = opt.async === undefined ? true: opt.async;
    opt.body = opt.body === undefined ? null: opt.body;
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    opt.responseType = opt.responseType || '';  // set to 'blob' for png
    // create and set up xhr
    var xhr = new XMLHttpRequest();
    xhr.responseType = opt.responseType;
    xhr.open(opt.method, opt.url, opt.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 400){
                opt.onDone.call(xhr, xhr.response, xhr);
            }else{
                opt.onError.call(xhr, xhr);
            }
        }
    };
    // send
    xhr.send(opt.body);
};
 
// load just a png file, this calls utils.http with proper settings, and the response is an Image
utils.httpPNG = function(opt){
    opt = opt || {};
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    utils.http({
        url: opt.url,
        responseType: 'blob',
        onDone : function(res, xhr){
            var imageURL = window.URL.createObjectURL(res);
            var image = new Image();
            image.src = imageURL;
            // need to do an unload for this
            image.addEventListener('load', function(){
                opt.onDone.call(xhr, image, xhr);
            });
        },
        onError: opt.onError
    });
};
```

### 3.3 - The client main javascript file

```js
var state = {
    map: {}
};
 
var setCellType = function (cellIndex, typeIndex, done) {
    utils.http({
        url: '/',
        method: 'POST',
        body: JSON.stringify({
            mess: 'hello',
            action: 'setCellType',
            cellIndex: cellIndex,
            typeIndex: typeIndex
        }),
        onDone: function (res) {
            done(JSON.parse(res), null);
        },
        onError: function (e) {
            done(null, e);
        }
    });
};
 
// get the current state of the map
var getMap = function (done) {
    utils.http({
        url: '/map.json',
        method: 'GET',
        onDone: function (res) {
            try {
                var obj = JSON.parse(res);
                done(obj, null);
            } catch (e) {
                done(null, e);
            }
        }
    });
};
 
// draw the state of the map
var drawMap = function (map) {
    var el = document.querySelector('#map_disp'),
    html = '<table>',
    cell,
    y = 0,
    x;
    while (y < map.h) {
        x = 0;
        html += '<tr>';
        while (x < map.w) {
            cell = map.cells[y * map.h + x];
            html += '<td>' + cell.typeIndex + '</td>';
            x += 1;
        }
        html += '</tr>';
        y += 1;
    }
    el.innerHTML = html + '</table>';
};
 
// call get map for the first time
getMap(function (map, e) {
    if (e) {
        console.log(e);
    } else {
        console.log('GET map');
        state.map = map;
        drawMap(state.map);
    }
});
 
document.getElementById('input_set_typeindex').addEventListener('click', function () {
    var x = document.getElementById('input_x').value,
    y = document.getElementById('input_y').value,
    cellIndex = parseInt(y) * state.map.w + parseInt(x),
    typeIndex = parseInt(document.getElementById('input_typeindex').value);
    // set cell type
    setCellType(cellIndex, typeIndex, function (res, e) {
        if (e) {
            console.log(e);
        } else {
            state.map = res.map;
            drawMap(state.map);
        }
    });
});
```

## 4 - Conclusion

This turned out to be yet another interesting project where I just wanted to create a simple script that can be used to quickly set up a static sever, but can also be used to respond to post requests. 

I made the demo project in the from of the middle ware file and the various files that compose the public folder just for the sake of having something to test out that this system is working okay at least. However I can not say that it composes any kind of real project when it comes to having some kind of real project based off of this. However so far I would say that the question of making a real project with this might just involve making a far more advanced middle ware file, or perhaps a collection of files to compose the back end system.