---
title: Using fetch to script http
date: 2018-03-27 17:08:00
tags: [js]
layout: post
categories: js
id: 165
updated: 2021-11-01 14:18:34
version: 1.30
---

In late specs of client side javaScript there is the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) method that is a way of making http requests in browser that is introduced in the [whatwg living standard](https://fetch.spec.whatwg.org/) . It is like the tired yet true [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) method, but may prove to be a little easier to use, and returns a promise out of the box. However one draw back might be browser support for older platforms, depending on the situation with that the fetch method might have to be polyfilled, and is thus not necessary a native replacement for user space http clients like [axios](https://github.com/axios/axios).

So then the js fetch method makes use of promises, and provides an updated [response api](https://developer.mozilla.org/en-US/docs/Web/API/Response) for better handling common tasks like parsing json to a workable object which is a nice feature. So in many respects it is a little more user friendly compared to the tired yet true XMLHttpRequest method that would need to be used with much additional javaScript code around it to end up with similar functionality. It might still be a smarter play to go with a user space option that makes use of XMLhttpRequest to provide the same functionality still tough, at least that is what I would do more often then not.

So the fetch native client side javaScript method is like a browser built in modern http client. However because fetch is still a new feature relative to XMLhttprequest at least, it might be to soon to regard it as a replacement for a user space http client. However the fetch method can be added to older platforms by making use of a [polyfill](https://github.com/github/fetch) for the fetch method. Still in my projects in generally prefer to use a user space http client, or the tired yet true XMLHttprequest method.

In any case the fetch method is still without question a feature in modern browsers that is worth a moment of my time to write at least one post on the subject. I have done so all ready with [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/), and [axios](/2018/01/10/nodejs-axios/) after all.

<!-- more -->

## 1 - Fetch api basics

In this section I will be going over just one example of the fetch api when it comes to just making a simple get request. When it comes to the various other kinds of requests such as post requests one will need some kind of back end system to post to, so that will be something that I will be getting to in later sections of this post.

Although I do make an effort to keep these examples fairly basic I assume that you have at least some background when it comes to the very basics of [getting started with javaScript](/2018/11/27/js-getting-started/). It might also be a good idea to [read up more on promises in javaScript](/2021/10/22/js-promise/) in general.

### - The source code examples in this post are on Github

The source code examples in this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-fetch) in Github. This repository also contains all the source code examples for my many other [posts on various vanilla javaScript topics](/categories/js/) beyond just that of the fetch API. If you must make a pull request for one of the source code examples you see here that would be where to do it. There is also the comments section at the bottom of this post that can be used to bring something up. I do get around to editing my content now and then but I have a lot of posts boiling so my response might be slow.

### 1.1 - Simple get request example of fetch

For starters I think an example that is just a basic get request would be in order, as that is often the case with these kinds of posts. Say that I want to preform a get request to just get the html text of a given page at a certain location on the open web, for argument sake how about just the text of this very blog post? In that case fetch just needs to be given one argument which is the URL of the resource that I want to fetch. This is a whole world more simple compared to using XMLHttpRequest that often proves to be a bit of a pain by comparison.

```html
<html>
    <head>
        <title>js fetch</title>
    </head>
    <body>
        <textarea id = "out" cols="100" rows="15"></textarea>
        <script>
let out = document.getElementById('out');
fetch('https://dustinpfister.github.io/2018/03/27/js-fetch/')
.then(response => {
    return response.text();
}).then((text) => {
    out.value = text;
}).catch((e)=>{
    out.value = e.message;
});
        </script>
    </body>
</html>
```

So when calling fetch and giving the URL of this page as the first argument what is returned is a promise. I will not be getting into detail about promises here, but the typical basic use of them involves attaching then and catch calls that will fire depending on the outcome of the request.

If all goes well in the body of the next then call I will have access to a [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response). This response object will not have the text of the page at the ready necessary, but there is a method of the response object to get just that tough. In this case I am not getting JSON, but html that can be thought of as just plain text content, so calling the text method of the response API will give me what I would want from the response object in this case. In the event that there is some kind of error the catch call will fire, and in the body of that method I can potentially handle the error.

So maybe this is not the most compelling example of the js fetch method, but you should get the basic idea at least. It is a more modern, and easier way to go about making http get requests compared to XMLHttpRequest, and in modern browsers it is there to work with without any additional javaScript code being made part of the projects dependences.

## 2 - Making a Post request with fetch

The fetch method just like XMLHttpRequest can of course be used to preform other types of requests other than get requests. There are a few of them to mention, but in general there are GET requests, and POST requests. A Get requests for the most part is to just get a resource at a given URL, while a POST requests is to upstream a body of content to a back end system.

In any case to preform a POST request I can do more or less the same thing as with a GET request, only I need to provide an options object with at least a few properties. In this options object I am going to want to set the method of the requests to POST, and I am also going to want to given a body that is to be uploaded to the server. Often when it comes to these kind of requests it is called for to provide at least a few headers also, such as Content-Type in this case I will be sending json to my sever script. Speaking of a sever script yes I will of course need some kind of back end system to post to. SO in this section I will be going over a simple project example that will contain a sever script that will respond to both get and post requests as well as some html that will preform a post request to this sever script.

This section will then not just involve client side javaScript but also a little code that will be used with nodejs to run a simple web sever. If you are new to nodejs you might want to start out with some kind of [getting started type post with nodejs](/2017/04/05/nodejs-helloworld). Even if you have some experience working with nodejs it would not hurt to look into the [http module](/2018/02/06/nodejs-http/) a bit more when it comes to working with http requests on the sever side of things. ALhough I do like to stick with vanilla javaScript for my various posts on the subject of native browser features like the feth api, it might be best to also look into how to get started with a decent sever side framework with this [sort of thing such as with express](/2019/04/17/express-post/).

### 2.1 - The index.html file in the public folder

In my project folder for this example I have a public folder and in this public folder I just have a single html file. This html file has a text area that will sever as a place to inject some text that is a response from the sever script. Inside the body of a script tag I get a reference to this text area element, and preform a post request using the fetch api.

```html
<html>
    <head>
        <title>js fetch</title>
    </head>
    <body>
        <textarea id = "out" cols="100" rows="15"></textarea>
        <script>
let out = document.getElementById('out');
fetch('http://localhost:8080/data', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
     action: 'add',
     a: 5,
     b: 6
  })
})
.then(response => response.json())
.then((obj) => {
   out.value += 'action: ' + obj.body.action + ', result: ' + obj.result;
})
.catch((error) => {
  console.log('Error:', error);
});
        </script>
    </body>
</html>
```

### 2.2 - The sever script

Now for the sever side script for this example that will respond to both get requests as well as post requests. I have everything here in a single file, and there is actually a lot to cover with it when it comes to the many nodejs request that I am making use of beyond just that of the http module. For example I am using the [promisify method of the nodejs built in util module](/2019/06/22/nodejs-util-promisify/) to create file system methods that will return a promise using methods from the [file system module](/2018/02/08/nodejs-filesystem/). When it comes to the code that I am using to respond to get requests, including get requests for the index html file that will sever as my client system for this example I based all of that off of the state of the source code for another project that aims to be just a very [basic static web site sever example](/2017/12/04/nodejs-simple-static-server-file/).

I could go on and on about all the various details about this script, but the main part that is of interest for this example at least is the code that has to do with responding to post requests. The METHODS.POST method is then the method of interest with posts requests then, and it is in this function that I am parsing the incoming body from the client system, parsing the string as JSON, and using values in the body to create and respond with a request.

```js
let http = require('http'),
fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
lstat = promisify(fs.lstat),
readFile = promisify(fs.readFile),
readdir = promisify(fs.readdir);
 
// create server
let server = http.createServer();
 
// set port with argument or hard coded default
let port = process.argv[2] || 8080; // port 8080 for now
 
// the root folder to serve
let root = process.argv[3] || path.join(__dirname, 'public');
 
// For HTTP method
let METHODS = {};
 
/********* POST *********/
 
METHODS.POST = function (req, res) {
    let body = '';
    req.on('data', function (chunk) {
        body += chunk.toString();
        // do some basic sanitation
        if (body.length >= 200) {
            // if body char length is greater than
            // or equal to 200 destroy the connection
            res.connection.destroy();
        }
    });
    // once the body is received
    req.on('end', function () {
        res.writeHead(200, {
            'Content-Type': 'text/json'
        });
        if (body) {
            let bodyObj = JSON.parse(body);
            let obj = {
                body: bodyObj
            };
            if (bodyObj.action === 'add') {
                obj.result = bodyObj.a + bodyObj.b;
            }
            res.write(JSON.stringify(obj), 'utf8');
        } else {
            res.write('{}', 'utf8');
        }
        res.end();
    });
};
 
/********* GET *********/
 
// create path info object
let createPathInfoObject = (url) => {
    // remove any extra / ( /foo/bar/  to /foo/bar )
    let urlArr = url.split('');
    if (urlArr[urlArr.length - 1] === '/') {
        urlArr.pop();
        url = urlArr.join('');
    }
    // starting state
    let pInfo = {
        url: url,
        uri: path.join(root, url),
        encoding: 'utf-8',
        mime: 'text/plain',
        ext: '',
        contents: [],
        html: ''
    };
    //return pInfo;
    return lstat(pInfo.uri)
    .then((stat) => {
        pInfo.stat = stat;
        if (pInfo.stat.isFile()) {
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
        if (pInfo.stat.isDirectory()) {
            pInfo.ext = '';
            pInfo.mime = 'text/plain';
            pInfo.encoding = 'utf-8';
        }
        return createDirInfo(pInfo);
    });
};
 
// create an html index of a folder
let createHTML = (pInfo) => {
    var html = '<html><head><title>Index of - ' + pInfo.url + '</title>' +
        '<style>body{padding:20px;background:#afafaf;font-family:arial;}div{display: inline-block;padding:10px;}</style>' +
        '</head><body>';
    html += '<h3>Contents of : ' + pInfo.url + '</h3>'
    pInfo.contents.forEach((itemName) => {
        let itemURL = pInfo.url + '/' + itemName;
        html += '<div> <a href=\"' + itemURL + '\" >' + itemName + '</a> </div>'
    });
    html += '</body></html>';
    return html;
};
 
// create dir info for a pInfo object
let createDirInfo = (pInfo) => {
    // first check for an index.html
    let uriIndex = path.join(pInfo.uri, 'index.html');
    return readFile(uriIndex)
    // if all goes file we have an indrex file call createPathInfoObject with new uri
    .then((file) => {
        pInfo.uri = uriIndex;
        pInfo.ext = '.html';
        pInfo.mime = 'text/html';
        return pInfo;
    })
    // else we do not get contents
    .catch(() => {
        return readdir(pInfo.uri);
    }).then((contents) => {
        if (contents && pInfo.ext === '') {
            pInfo.contents = contents;
            pInfo.mime = 'text/html';
            pInfo.html = createHTML(pInfo);
        }
        return pInfo;
    });
};
 
METHODS.GET = function (req, res) {
    // create path info object for req.url
    createPathInfoObject(req.url)
    // if we have a pinfo object without any problems
    .then((pInfo) => {
        // send content
        res.writeHead(200, {
            'Content-Type': pInfo.mime
        });
        // if we have html send that
        if (pInfo.html != '') {
            res.write(pInfo.html, pInfo.encoding);
            res.end();
        } else {
            // else we are sending a file
            readFile(pInfo.uri, pInfo.encoding).then((file) => {
                res.write(file, pInfo.encoding);
                res.end();
            }).catch((e) => {
                // send content
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write(e.message, 'utf8');
                res.end();
            });
        }
    }).catch((e) => {
        // send content
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message, 'utf8');
        res.end();
    });
};
 
/********* ON REQUEST *********/
 
// for a request
server.on('request', function (req, res) {
    // if we have a method for the request method such as GET or POST call it
    var method = METHODS[req.method];
    if (method) {
        method(req, res);
    } else {
        // else we can not do anything.
        res.end('not a post');
    }
});
 
/********* LISTEN *********/
 
server.listen(port, () => {
 
    console.log('sever is up on port: ' + port);
 
});
```

## 3 - Using a fetch pollyFill

If you are concerned about support for older browsers, then a polyfill for fetch will have to be used, or just do things the old fashion way with XMLHttpRequst as any polyfill will likely use just that. A popular polyfill for fetch can be found on github here at [github](https://github.com/github/fetch).

Another option would be to just not use fetch at all and chose or make an http client, which is what I would often do rather than using fetch when it comes to working on an actual project where I will need to script http requests.

## 4 - Conclusion

So fetch is a new standard for preforming http requests that can be used in modern browsers, and maybe it is a little easier to use compared to the traditional XMLHttpRequest method. Still when it comes to worrying about browser support I still know that I will get my code to work on a wider range of clients by using the tried yet true XMlHttprequest over fetch. For this reason I often choose to go with XMLHttprequest over fetch when making my own http client, something that I find myself doing now and then when it comes to vanilla JavaScript projects. If you would like my take on [XMLHttpRequest I of course wrote a post on that one for what it is worth](/2018/03/28/js-xmlhttprequest/).

In addition I would not say that fetch is a replacement for various user space http clients that wrap XMlhttprequest rather then that of fetch. If a client is designed right there is a potential to get a best of both world situation between browser support and supporting later features like promises.
