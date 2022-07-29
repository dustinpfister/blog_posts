---
title: A Simple nodejs example of a server that responds to post requests
date: 2021-09-10 12:03:00
tags: [node.js]
layout: post
categories: node.js
id: 928
updated: 2022-07-29 14:00:39
version: 1.38
---

A few years back I made a [simple nodejs script that is a basic drop in script that can be used to start a simple static sever](/2017/12/04/nodejs-simple-static-sever-file/). I come back to the post now and then, and when I do I often edit the source code and the content a little. Anyway it is the kind of script that might not be a good choice to use in production, but when it comes to a simple pet project where I just want to host a public folder over the http protocol it seems to work okay thus far. Anyway the thought occurred that it would be nice to have another similar vanilla javaScript type solution for setting up this kind of script for a project only this time make it a script that is a slightly more advanced and will respond to post requests.

<!-- more -->

## 1 - What to know first before continuing to read this

What I am writing about here is a script that I can run with nodejs by itself without any additional user space packages to set up a simple static sever, and also respond to post requests. This is then not any kind of [getting started type post on nodejs](/2017/04/05/nodejs-helloworld/) so if you are still fairly new with it you might find this post a but to advanced.

In the script I am sticking to built in node modules such as the [http module](/2018/02/06/nodejs-http/), the [file system module](/2018/02/08/nodejs-filesystem/), and the [path module](/2017/12/27/nodejs-paths/) just to name a few. I will not be getting into detail about how to go about suing these modules I have wrote posts on them all ready, and there are many other great resources on the open web that cover how to use these.

### 1.1 - I was using nodejs 10.x when I made this

When I made this script I was using nodejs 10.x which as of this writing is no longer supported. I do get around to editing my posts on nodejs once in a while, and with that said maybe next time I will be using a later version of nodejs. The thin about it though is that I like to make code examples that will still work okay on older versions of nodejs even if they are no longer supported. Often people will install a version of node that is supplied from a public repository in a Linux system, and sadly often these versions are out dated. Still I am currently thinking that I need to raise the bar to as least 12.x at some point soon.

### 1.2 - The source code for this can be found at my github

I am going over all the relevant source code in this post, but the full source code can be found at my [Git hub repository on this script](https://github.com/dustinpfister/nodejs-simple-http-request-get-post-system). So if you see something that you think should change, or for whatever the reason you want to make a pull request that would be the place to do so. Also the repos might hold a later version of the script then what I am writing about here, and also it might be the best way to go about setting up what I have worked out here by just cloning it down, and then running the server.

### 1.3 - Vanilla JavaScript projects are fun, but express is a great framework for this kinds of projects too.

The intention here is not to make areal serious full stack project, but just a simple script that I could use for some projects where what I am really working on is the client system. When it comes to making a serious back end system I do nt think that I would want to do everything from the ground up. With that said it really is a good idea to just go with a popular framework, [such as express](/2018/05/21/express-getting-started/) and well supported middleware projects for it.

## 2 - The server script

Here in this section I will be going over the source code of the main server script that will be called with node directly, or indirectly with some additional script that has some hard coded defaults with the arguments. The script sets up a server using the http create sever method of the built in http module in nodejs. I then have a number of helper functions that will help with the process of handing incoming get requests for static files location sin a public folder than can be set with one of the several arguments that can be passed when calling the script.

The main feature of interest here though compared to the simple static sever script example is that this script will not use the method property of a request object to call a special methods for a certain kind of request. Not just get requests but post requests as well now also. I could add additional support fr the other kinds of requests but I wanted to keep this projects simple, and all in just on file.

There is however the question of how I go about costuming how to go about processing get requests from one project to the next where I might make use of this script. With that said I have a system set up for this where the script will look for an index JavaScript file that should be located in a middleware folder off of the root folder set for the script. If none is found then the script will just use a built in middleware function that does not do anything, and the script is then just a far to complex static sever. More on this middlewre file later in this post when I get to some source code that is a demo of the script.

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

So then now that I have the sever script together it is time to test it out with some additional source code to make use of the script. So with that said I will want to have at least one demo project just for the sake of testing this thing out and to make sure it is working as expected.

So the first and only demo that I made for this script is a very simple system where I am just mutating the values of a json file in the public folder. This demo then consists of a single middle ware file in the middleware folder location that the script looks for that will create, read, and write the map.json file. It also consists with a static website that will be the client system that will interact with this back end script.

### 3.1 - The middleware

Here I have the middleware file for th demo project that should be at the \/middleware\/index.js file off from the root project folder. This file is what I will be using to handle including post requests for the specific demo that is making use of the simple sever script. The way that this is done is by designing by client system to send body objects that contain custom data that will then in return be used in this middle ware file to append results to standard response object.

In this demo the idea is to just create and or mutate a json file in the public folder that contains map data for a simple grid. So the first thing that the script should do is to check if the map json file is there to begin with, in the event that it is not create a new map json file for the public folder. In the event that the map file is there, or after the new map file is created, preform an action on the map based on data from the body object, and then write the new state of the map object to the public folder.

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

When it comes to putting my client system together I want to have a general utilities library that will contains methods that I will be using in my client system. For this demo I have such a library that just contains a crude yet effective http client that I will be using to make the post requests to the server. I often have a secretive file like this where I park various methods that I will be using in one or more additional files across a system. I wrote a[post in which I cover many of the usual suspect type methods](/2021/08/06/js-javascript-example-utils/) that might end up in this kind of library.


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

### 3.3 - The client main JavaScript file

I then have a main javaScript file that will compose most of the JavaScript code that will be the client system for this demo. For this I just have some methods that help with making the proper requests that will work with the middle ware file that I made for the demo. I did not care to get to involve with this demo so for now there are just two helper method one to make a post request, and another to make a get request for the map json file. Each time the page loads I just make a plain old get request for the json file, and draw the state of the map. On top of that I am also adding some events for a button in the html that can be used to set the type index of one of the cells.

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

### 3.4 - The main index.html file at root

Here then is the source code of the main index html file for the root name space of the client system for the demo. Here I am linking to the utils.js file, and well as the main.js file that I coved above. In addition I have just a little but of hard coded html that will serve as the very basic user interface to just mutate the state of this map json file.

```html
<html>
    <head>
        <title>Simple http request get post system</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="banner" >
            <h1 class="banner_text" >Simple http request get post system</h1>
        </div>
        <div class="content">
           <div id="map_disp">Content</div>
           <br>
           Type Index: <input id="input_typeindex" size="2" type="text" value="0"><br>
           pos: <input id="input_x" type="text" size="2" value="0">, <input id="input_y" size="2" type="text" value="0"><br>
           <input id="input_set_typeindex" value="set type index" type="button">
        </div>
        <script src="/js/utils.js"></script>
        <script src="/js/main.js"></script>
    </body>
</html>
```

When I start the main server file, the script finds and uses the middle ware file that I made and starts listening on the host and port number that I set for it. By default this means that I can go to a web browser on the completer that I start the script on and go to localhost:8080 to view the main index that can be used to view and edit the map.js file. In the event that I want to view the index from another computer on the same network I will need to find out what the local ip address is for the system that I started the script on and replace localhost with that ip address.

In any case when this is up and running and I am at the main index of the client system in my web browser I can use the client system to change the state of the map in the public folder. So then the basic idea that I had in mind just for testing this thing out seems to work okay.

## 4 - Conclusion

This turned out to be yet another interesting project where I just wanted to create a simple script that can be used to quickly set up a static sever, but can also be used to respond to post requests. I do not think I will be using this script in its current form for any kind of major project that I would deploy on line though mind you, but it might work okay for certain projects that I intended to use just on a local network.

I made the demo project in the from of the middle ware file and the various files that compose the public folder just for the sake of having something to test out that this system is working okay at least. However I can not say that it composes any kind of real project when it comes to having some kind of real project based off of this. However so far I would say that the question of making a real project with this might just involve making a far more advanced middle ware file, or perhaps a collection of files to compose the back end system. There is developing some kind of crude yet effective authentication system, and doing much more then it comes to public and private assets that will be read and edited for a project.

