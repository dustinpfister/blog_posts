---
title: The super simple http client for making requests in node.js called simply request
date: 2017-05-23 12:17:00
tags: [js,node.js]
layout: post
categories: node.js
id: 23
updated: 2018-08-15 13:24:02
version: 1.15
---

In many [node.js](/2018/02/06/nodejs-http/) projects it is necessary to grab resources that may exist on some kind of external source. In general often you may just need to get what is there, just a simple get request, and thats it. It would also be nice to use some kind of package that helps to make it stupid easy, for this there is a popular npm package simply called [request](https://www.npmjs.com/package/request). request is one of many http clients that are available for a node.js environment, another popular such package would be [axios](/2018/01/10/nodejs-axios/). There is also not bothering with any npm package at all, and using a built in nopde.js module like that of [http](/2018/02/06/nodejs-http/). However for the sake of this post I will be keeping the focus on request.

<!-- more -->

## 1 - what to know about, before continuing with request

This is an advanced post javaScript, node.js, and the module know as request which is an http client for scripting http requests in such an environment. I will not be getting into the very basics of javaScript, and node.js this post is only relevant  with respect to scripting http with the request module. Many developers these days thing it terms of doing everything from the ground up with just node.js itself, if you are that kind of person then stick with built in modules like the [http module](https://nodejs.org/api/http.html). If you find the built in modules a bit lacking then there is of course making yet another such client yourself, or researching whats out there to help save time. If so then this post, and others like it may be a bit helpful.

### 1.1 - Using the NPM package request

Using the npm package request is a simple as with any other npm package, just install with the install command giving the save flag if you want it added to a projects package.json file.

```
$ mkdir test_request
$ cd test_request
$ npm init
$ npm install request --save
```

## 2 - Some very basic GET request examples

Say you just want to make a get request for something on the open Internet, like just the html of a page like www.google.com for example. In this section I will be covering thisn very basic use case example using request, and how it compares when using the http module.

### 2.1 - Just giving the url, and a callback

Here is a quick demo as to how to go about making that simple get to google with request, by just giving the url, and a callback as the second argument.

```js
let request = require('request');
 
request('http://www.google.com', function (err, res, body) {
 
    if(err){
 
        console.log(err)
 
    }else{
 
        console.log(body);
 
    }
 
});
```

The callback follows the usual deal that is expected with most callbacks in node.js where the first argument is an error if an error occurs. Then the second argument is a response object, and the third argument is the body of the request. For most requests there will be no need to parse the body manually, request will do that for you.

### 2.1 - Using the built in node.js http module.

For the sake of comparison here is how you would go about making a method that will work in a similar fashion to this, just using the built in http module.

```js
let http = require('http');
 
let request = (url, cb) => {
 
    if (!url) {
        return
    };
 
    cb = cb || function () {};
 
    // the body of the request
    let body = Buffer.alloc(0);
 
    let req = http.request(
 
        // options
        {
            host: url,
            method: 'GET',
            path: '/'
 
        },
 
        // callback
        (res) => {
 
            res.on('data', function (chunk) {
 
                // concat the current chunk, with body to
                // build the body
                body = Buffer.concat([body, chunk]);
 
            });
 
            res.on('end', function () {
 
                // we should have the finished body
                // call the callback passing the
                // values for, err,req,and body
                // parsing body to a string
                cb(null, req, body.toString());
 
            });
 
        });
 
    req.on('error', (err) => {
        cb(err, req, body);
    })
 
    req.end();
 
};
 
// get requests can be as simple as this
request('www.google.com', function (err, res, body) {
 
    if (err) {
 
        // if error, log it
        console.log(err);
 
    } else {
 
        // log body
        console.log(body);
 
    }
 
});
```

This method will still not work as well as what I can just quickly install using request, I could do a better job handling different protocols other than just http for example, notice that I do not give the http when giving a url, it will cause an error if I do. I could resolve that, but you get the idea, these things can eat up time. If I have all the time in the world maybe I would make my own http client, but why bother with that when there are so many other there all ready that work just fine to help put this to rest, and move on to more pressing matters.

When you compare the two it is easy to see why the request npm package helps to make grabbing at resources a little easer. As I see it, I do not think that it can be much more easy then the basic ger request example with request. At a minimum I would need to give a url, and a callback that has access to what is spit back at me when making the call, and thats it. I do not have to spend a good hour, or longer working out all the kinks that I run into when just using http.request in the node.js http module.

## 3 - Head requests

Head requests are a way to just grab some meta data information about a url, without downloading the actual content that may exist at the url. In some cases head requests com in handy as a way to reduce the amount of bandwidth use if I am working on some kind of project that involves a lot of requests, such as a web crawler. In this section I will be should some quick examples of using request to make head requests.

### 3.1 - With request.head

Say I just want to know the content-type header of a given url without downloading the whole page, I can just use request.head in the same way as I would request.get, or just the main request method that is exported when just giving a string as the first argument.

```js
let request = require('request');

// head requests can be as simple as this
request.head('http://www.google.com', function (err, req) {
 
    if (err) {
 
        console.log(err);
 
    } else {
 
        console.log(req.headers['content-type']); // text/html; charset=ISO-8859-1
 
    }
 
});
```

There is a body variable that is given as the third argument, but it will always be an empty string, as it should with head requests.

### 3.2 - With the main method giving an options object with the method property set to head

Like many of these use agents there is a method for each [http request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) that can be used, or I can just use the main function that is exported with an object that has a property for the http method that can be used to set the desired http method such as get,post,head, and so forth.

In this example I am doing just that calling the main method that is returned, and setting the http request method property to head, along with a custom user agent header, and a base url, allowing me to use the uri property as an end point from that base url.

```js
let request = require('request'),
url = require('url');

// head requests can be as simple as this
request(
 
    // options
    {
        method: 'head',
        baseUrl: 'https://api.github.com/repos/dustinpfister/',
        uri: '/test_request',
        headers: {
            'User-Agent': 'request'
        }
    },
 
    // call back
    function (err, req, body) {
 
    if (err) {
 
        console.log(err);
 
    } else {
 
        console.log(req.headers['content-type']); // application/json; charset=utf-8
 
    }
 
});
```

So request is very much like many of these other popular http clients, that all seem to follow this convention to one extent or another. Allowing for easy basic use, but also allowing for more advanced use as well when called for.

## 4 - Streams

So request has out of the box support for callback methods, and one other option which is streams. Streams are great when dealing with very large files, or any kind of live data stream.

## 4.1 - Using stream.Transform object mode to log out "War and peace" to the console.

So for a fun example of using streams with request, I thought about making something that logs out the text of the book "war and peace" that is a book that is well know for it's very high word count of over five hundred thousand words. In this example I will be using the transform method of the node.js built in stream module.

```js
let request = require('request'),
stream = require('stream');
 
// requesting "War, and peace" (it's over 500,000 words)
request('http://www.textfiles.com/etext/FICTION/war_peace_text')
 
.pipe(new stream.Transform({
 
        objectMode: true,
        transform: function (a, en, cb) {
 
            // log each chunk as it comes in
            console.log(a.toString());
 
            cb();
 
        }
 
    }))
 
.on('error', function (err) {
 
    console.log(err);
 
});
```

Streaming is useful if I am ever dealing with a very large file, such as this. instead of having to wait for the whole thing to download, I can start logging it to the console as it comes in.

## 5 - Like promises?

So one nice think about the http client axios, is that it has promise support out of the box. Nothing against axios, that is a great client as well, but this post is on request. So out of the box there is no promise support. However there are additional packages that can be used to quickly add promise support using either native promises using [request-promise-native](request-promise-native), [bluebird](https://www.npmjs.com/package/bluebird)  using [request-promise](https://www.npmjs.com/package/request-promise), or another one using any-promise called [request-promise-any](https://www.npmjs.com/package/request-promise-any)

## 6 - Conclusion

request is a descent http client, the out of box promises support might not be there, but with some projects I can do without it. Also When it comes to adding promise support I have more than one option to choose from which is nice. This rases all kinds of questions such as how does bluefish compare to just using native promises? So much to write about, and so little time. If you like this post be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).