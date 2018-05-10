---
title: Getting started with post requests using hapi and node.js
date: 2017-09-30 17:40:30
tags: [js,node.js,hapi]
layout: post
categories: hapi
id: 49
updated: 2018-02-11 10:27:08
version: 1.5
---

Post requests are an important aspect of any kind of full stack application. You have some data on the client, and you need to shoot it over to the back end system. Doing so in hapi is pretty easy, in this post I will be covering a very basic approach that does not even require any kind of client system, apart from just a simple postIt function that will be copied into the console.

<!-- more -->

## The postIT function

If I am just interested in shooting out a simple post request to a back end I am developing there is a need for a simple method that I can just place in the content that gets delivered, or if even that is not going on, copied and pasted into the JavaScript console.

It will likely be a simple method written in vanilla js, because at the earliest stages of development I may not have even decided if I am going to use jquery, or some other deal on the client side. In addition I will want to custom tailer some of the default values of the method so that it works very quickly with just one argument, but can also be used to post in just about any kind of fashion.

As such that method might look something like this.

```js
var postIt = function (argu) {
 
    // the xhr Instance
    var xhr = new XMLHttpRequest();
 
    // if argu is not an object
    if(typeof argu != 'object'){

        // make what is given the data
        // to be sent to the server
        argu = {data: argu};

    }
 
    argu.url = argu.url || window.location.href;
    argu.beforeSend = argu.beforeSend || function(xhr,next){
       next();
    };
    argu.done = argu.done || function (xhr) {
        console.log(xhr);
    };
    argu.fail = argu.fail || function (xhr) {
        console.log(xhr);
    };
 
    xhr.open('post', argu.url);
 
    xhr.onreadystatechange = function () {
 
        if (this.readyState === 4) {
 
            if (this.status === 200) {
 
                argu.done(this);
 
            } else {
 
                argu.fail(this);
 
            }
 
        }
 
    };
 
    argu.beforeSend(xhr, function(){
 
        console.log(typeof argu.data);
        xhr.send(argu.data);
 
    });
 
};
```

Yes I made the data argument the first argument, so that if I do not need to do anything special I can just do this:

```js
postIt('ping');
```

In addition I made it so data can be whatever it is that I pass to postIt, in many cases I may need to stringify something into JSON, but maybe not always, so I leave that up to how I use it.

If need be I can change the url, do something with the xhr object before it is sent, such as adding a header, and add custom done and fail callbacks. Still out of the box I can just chuck something at the server with just one argument, and I like that.

## The backend

Now that I have my simple vanilla js tool for making post requests, it is time to get together the basic back end system to get started with post requests using hapi.

```js
// create a new instance of hapi server
var server = new Hapi.Server();
 
// port 3000, and I will be using localhost
// when running I will connect via http://localhost:3000
server.connection({
    port : 3000,
    host : 'localhost'
});
 
// This is how a post request is handled at root
server.route({
    method : 'POST',
    path : '/',
    handler : function (request, reply) {
 
        reply('Yes this is Mr Horse.');
 
    }
});
 
// start the server
server.start(function () {
 
    console.log('Daa the hapi server is up Ren, should I push the button?: ');
 
});
```

This is the most basic form I can think of when it comes to getting started with post requests in hapi, as such when it is saved as post.js, and started the script in the console with like so :

```
$ node post
```

When I go to http&#58;&#47;&#47;localhost:3000 in the browser I will get an error message, because I have not set any get handler for the root name space yet.

## Making the first post

It's okay for now that I am getting that error, for now I just care about making my first post request with hapi, I will address that and much more in additional future posts. So the first thing to do is open up the javascript console in chrome with a ctrl+shift+j, and copy and past the postIt method into the console.

Once I have the postIt method in the console I can use it to make post request to the backend, and have the results logged in the javaScript console by default bu just simply calling this in the console:

```
> postIt('ping')
```

After doing so I receive the response object in the console, and the expected response 'Yes this is Mr Horse.' is in the response, and responseText properties of the response object.

## Conclusion

I am really liking hapi, it may prove to be a great alternative to express. I will be writing a [few more posts on hapi](/categories/hapi/) for sure, so I have made it another one of my collections.