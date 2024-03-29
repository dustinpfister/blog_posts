---
title: JavaScript async await
date: 2019-06-25 13:23:00
tags: [js]
layout: post
categories: js
id: 490
updated: 2021-11-20 08:51:22
version: 1.40
---

A [js async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function can be used as a way to define a special kind of asynchronous function. These async functions can be used in conjunction with the await keyword to help with the process of writing asynchronous code easier in javaScript as of late specs of javaScript as of ECMAScript 2017.

These kinds of [async functions still operate in the main event loop](https://stackoverflow.com/questions/46004290/will-async-await-block-a-thread-node-js), so they still can not be used as a way to achieve what is often called true threading with javaScript, at least not by themselves. So then js async is not a replacement for [Webworker in client side javaScript](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), or something like the [cluster module](/2018/01/18/nodejs-cluster/), or [child process module](/2018/02/04/nodejs-child-process/) in nodejs. If you want to get closer to true threading you would want to look into those options and not just use asnyc functions alone. Still in some situations the async keyword can be useful so lets look at some code examples of this in use.

<!-- more -->

## 1 - js async basics

In this section I will be going over just a few very basic examples that involve the use of promises and the async keyword as a way to create functions, as well as other related topics when it comes to the very basics of this sort of thing. The main thing to keep in mind where is that the use of these async functions are just another way to operate in a single event loop, so if you are thinking that this is something that is far beyond using something [like setTimeout](/2018/12/06/js-settimeout/) that is not really the case actually. The reason why is because that setTiemout and async functions are still working within a single event loop. So if you are thinking that async functions are another kind of web worker, or spawn method call in nodejs, that is not how to think about it. However async functions are another tool along side features like setTimeout, [requestAnimaitonFrame](/2018/03/13/js-request-animation-frame/), and the Promise constructor.

It should go without saying then that this is not a [getting started type post with javaScript](/2018/11/27/js-getting-started/), or [functions in general in javaScript](/2019/12/26/js-function/). However if you have at least some background with the very basics of getting started with javaScipt, in this section I will be sticking to a few simple examples that might hopefully show what async functions are, and also in the process hopefully also what they are not. After that I will be getting to some additional stuff that has to do with really getting into how to go about doing async type tasks with javaScipt that have to do with creating a whole other event loop.

### 1.1 - The source code here is on github

This post like many others is still a kind of work in progress, as such it is only a matter of time until I get around to editing the content here once again, as long as I am able to do so. With that said I have the collection of source code that I am writing about in this post up on my [test vjs Github respiratory](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-async-await), along with all the other source code examples for all my other posts on native javaScript features. So then the latest work that I have done with these examples will be there, that is also where one would want to make a pull request. However there is also the comments section at the end of this post that can also be used to bring something up.

### 1.2 - Hello world async function

To start off with maybe it would be best to compare what the return values are for a async function compared to say a [function expression](/2019/01/27/js-function-expression/). When I have a function expression that returns a string, the return value is, well a string no surprise there. However the same will not always be true for an async function as when I call such a function the return value right away is not a string, but an object. That is because an async function will always return a promise, even if the return value is not one the return value will be wrapped in a promise object.

```js
var helloWorld = function () {
    return 'Hello World';
};
var helloWorldAsync =  async function () {
    return 'Hello World';
};
 
console.log(typeof helloWorld());      // 'string'
console.log(typeof helloWorldAsync()); // 'object'
```

### 1.3 - Hello world promise function

So then there is having a similar result to a sync function by just getting into the habit of creating functions that return a promise. One way to go about returning a promise inside the body of a function would be to use the [Promise Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise).

```js
var helloWorld = function () {
    return 'Hello World';
};
var helloWorldPromise = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('Hello World');
        }, 3000)
    })
};
 
console.log(typeof helloWorld()); // 'string'
console.log(typeof helloWorldPromise()); // 'object'
```

### 1.4 - using then off of a promise object

The main thing about promise objects is not to just assign the promise object to a variable, but to call the then function off of the promise object and do what needs to be done with the result insdie the body of this then function call.

```js
let foo = (delay) => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, delay);
    });
};
 
let bar = function () {
    console.log('start');
    return foo(3000).then(() => {
        console.log('end');
    });
};
 
bar();
```

### 1.5 - The same example with js async

The async keyword can be used in combination with a function such as an arrow function to declare an async function. Inside the body of the async function the await keyword can be used as a way to pause the execution of the rest of the logic in the function until a function that was called with await is completed. The function that is called with await should be a function that will return a promise or another function created with the async keyword.

A basic example of an async function in javaScript might then look like this then:

```js
let foo = async (delay) => {
    let st = new Date(),
    now = st,
    t = 0;
    while(t < delay){
        now = new Date();
        t = now - st;
    }
    return 1;
};
 
let bar = async ()=> {
    console.log('start');
    await foo(3000);
    console.log('end');
};
 
bar();
```

The foo function returns a promise that resolves after a delay. When used inside the body of the func async function that execution of code is paused, and thus the string end is not logged to the console until the delay has completed. So this can be thought of as a cleaner style compared to just using promises.


### 1.6 - Async functions will still hold up the event loop

So an async function that has some code in it that might hold up the event loop will do so just like that of any other function in javaScript. This is because just like any other function in javaScript, we are still dealing with a single event loop when it comes to just using a kind of function alone. That is unless we take advantage of something that allows for us to create an additional event loop completely what is going on in an async function can still hold up the rest of a script. However do not just take my word for it run a few simple source code examples to see for yourself.

For example take into account the following:

```js
// async function that does something heavy
let heavyAsync = async function () {
    var i = Math.floor(Math.pow(10, 9.25)),
    st = new Date();
    while (i--) {}
    var secs = (new Date() - st) / 1000;
    console.log('');
    console.log('heavy time: ', secs.toFixed(2));
    console.log('');
};
// loop
let i = 0,
lt = new Date();
let loop = function () {
    setTimeout(loop, 250);
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
    if (i % 10 === 5) {
        heavyAsync();
    }
    console.log('tick' + i, ' time: ' + secs.toFixed(2));
    i += 1;
};

loop();
```

In this example when the heavyAsync function is called it still ends up delaying the whole application. This is because I am still just working with a single event loop. So then in order to truly get around this limitation I will need to do something more beyond just using async and promises that will help me to spin up more than one event loop to work with, and pass data to and from this other event loop. 

## 2 - The Async and await keywords are then NOT a replacement for WebWorker

An async function still operates in the main javaScript event loop, so it is not a way to go about accomplishing what is often called true threading in javaScript. However there are ways of doing that these days with javaScript, just not with async await, at least not by itself anyway. When it comes to client side javaScript the feature of interest to look into would be web workers, this is a way to go about creating an instance of an object that can be used to, and receive results back from a script that is running in a whole other event loop completely.

### 2.1 - I will need a way to host what I am working on by way of http rather than file

The thing about getting into web workers is that they are of of many things that will not work when it comes to opening up an html file [by way of the file protocol](/2020/09/21/js-getting-started-file-protocol/). So then if you are still developing that way this is one of many things that will come up where you have to loosen security settings with your browser, or better yet just find a way to host what you are working on by way of the http protocol by setting up a basic web static web sever. I have [wrote another post on a simple script that can be used with node in the from of a single stand alone file](/2017/12/04/nodejs-simple-static-sever-file), however there is also learning how to do things like this by using a popular framework like express in nodejs.

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
let root = process.argv[2] || path.join(__dirname, './');
 
// set port with argument or hard coded default
let port = process.argv[3] || 8080; // port 8080 for now
 
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

### 2.2 - A basic example of a web worker

So now that I have a way to host an html file and some javaScript code by way of the http protocol rather that the file protocol I can now get into working out a simple hello world style web worker example.

I will want a ww-basic.js file that looks like this:

```js
onmessage = function(e) {
  postMessage(e.data[0] + 'bar');
};
```

This script when used as the source code file for a web worker will respond to a message from the main event loop by just appending what is passed to it to the string bar, and send that back as a message. Nothing special but this is a basic example of this that I am starting out where here in the section after all. So now that I have a script that I want to use for a web worker I will now want at least one html file, and a little additional javaScript code that will make use of this file.

```html
<html>
    <head>
        <title>web worker example</title>
    </head>
    <body>
        <textarea id="out" cols="60" rows="15"></textarea>
        <script>
var out = document.getElementById('out'),
workerBasic;
// feature test
if (window.Worker) {
    workerBasic = new Worker('ww-basic.js');
    workerBasic.onmessage = function(e) {
       out.value += e.data + '\n';
       console.log('Message received from worker');
    };
    workerBasic.postMessage(['foo']);
}else{
    out.value += 'Web Woker is not supported.\n'
}
        </script>
    </body>
</html>
```

When I go to this file in the web browser what I end up with is the string foo bar in the text area element. So then that seems to work okay as a basic example of a web worker at least when it comes to just getting started with this sort of thing. However maybe I should get around to making at least one more example of this to help really address what the deal is with this sort of thing and how it can help to really run code that will not bog down the rest of what is going on in the main event loop.

## 3 - In nodejs the child_process module can help to spin up more than one event loop

In nodejs there is the child_process built in module, and in this module there are methods like the exec method, and the spawn method that can be used to start a whole other process on the operating system on which node is running. This can be used to launch something from the command line such as a script that contains a shebang and made executable with the chmod command in Linux systems, an alias, or a binary, including node itself. 

When doing so it results in an additional, independent process on the operating system. Thus it is a way to do something involving more than one event loop with javaScript, thus it is a kind of so called true threading that differs from what is typical when it comes to async functions, setTiemout, and so forth by itself. There is also the cluster module that is also worth checking out, but what is great about child process is that it can be used to run any kind of executable thing from the command line, not just javaScript.

```js
let heavyAsync = async function () {
    var i = Math.pow(10, 9),
    st = new Date();
    while (i--) {}
    console.log('heavy time: ', new Date() - st);
};
heavyAsync();

```

```js
let spawn = require('child_process').spawn;
let startHeavy = () => {
    let heavy = spawn('node', ['heavy.js']);
    heavy.stdout.on('data', function (data) {
        console.log(data.toString());
    });
};
let i = 0, st;
let loop = function () {
    setTimeout(loop, 250);
    st = new Date();
    if (i % 10 === 5) {
        startHeavy();
    }
    console.log('tick' + i, ' time: ' + (new Date() - st));
    i += 1;
};
 
loop();
```
So then this example, unlike the first one that just makes use of async await, does not hold up the main javaScript event loop.

## 3 - Conclusion

So then an async function is just a function that will always return a function, and inside the body of the function the await keyword can be used as a way to pause and wait for a result rather than moving on. I can not say that I use these kinds of functions that often actually as there are many ways of having a similar situation with things other than using async functions. There is having functions that return a function, and then there is also just doing things that involve old javaScriot style call back functions.

There are other late javaScript features that ate of greater interest to me, mainly web workers as that is a way to spin up a whole other event loop completely. Inside the score code of a file that I am using for a web worker, I could use async functions, but there are also many other options when it comes to delaying the calling of a function, or doing some kind of task that will finish at a later time.

