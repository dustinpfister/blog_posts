---
title: The super simple http client for making requests in node.js called simply request
date: 2017-05-23 12:17:00
tags: [js,node.js]
layout: post
categories: node.js
id: 23
updated: 2018-08-15 09:11:37
version: 1.6
---

In many [node.js](/2018/02/06/nodejs-http/) projects it is necessary to grab resources that may exist on some kind of external source. In general often you may just need to get what is there, just a simple get request, and thats it. It would also be nice to use some kind of package that helps to make it stupid easy, for this there is a popular npm package simply called [request](https://www.npmjs.com/package/request). request is one of many http clients that are available for a node.js environment, another popular such package would be [axios](/2018/01/10/nodejs-axios/). There is also not bothering with any npm package at all, and using a built in nopde.js module like that of [http](/2018/02/06/nodejs-http/). However for the sake of this post I will be keeping the focus on request.

<!-- more -->

## 1 - what to know about, before continuing with request

This is an advanced post javaScript, node.js, and the module know as request which is an http client for scripting http requests in such an environment. I will not be getting into the very basics of javaScript, and node.js this post is only relevant  with respect to scripting http with the request module. Many developers these days thing it terms of doing everything from the ground up with just node.js itself, if you are that kind of person then stick with built in modules like the [http module](https://nodejs.org/api/http.html). If you find the built in modules a bit lacking then there is of course making yet another such client yourself, or researching whats out there to help save time. If so then this post, and others like it may be a bit helpful.

### 1.1 - Using the NPM package request

Although this is of course something that can be done within node by itself with the [http](https://nodejs.org/api/http.html) core module. A popular NPM package called request is often used to help make requests a little easier.

So go ahead and install request into a demo project, and give it a try.

```
$ npm install request --save
```

Here is a quick demo as to how to go about making that simple get request.

```js
var request = require('request');
request('http://www.google.com', function (err, res, body) {
 
    if(err){
 
        console.log(err)
 
    }else{
 
        console.log(body);
 
    }
 
});
```

## Using the built in node.js http module.

For comparison here is how you would go about making the same get request using the built in http module in node itself without the addition of the request npm package.

```js
var http = require('http'),
 
req = http.request(

   // options
   {
        host : 'www.google.com',
        method : 'GET',
        path : '/'
 
    }, 
 
    // callback
    function (res) {
 
        res.on('data', function (data) {
 
            var html = data.toString();
 
            // Log The raw HTML
            console.log(html);
 
        });
 
    });
 
req.end();
```

When you compare the two it is easy to see why the request npm package helps to make grabbing at resources a little easer. As i see it, I do not think that it can be much more easy then that. At a minimum I would need to give a url, and a callback that has access to what is spit back at me when making the call.

## Conclusion

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).