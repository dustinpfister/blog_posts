---
title: hapi js and etags
date: 2019-06-27 12:45:00
tags: [hapi]
layout: post
categories: hapi
id: 493
updated: 2019-06-30 20:19:30
version: 1.7
---

This will be a quick post on [etags](https://en.wikipedia.org/wiki/HTTP_ETag), and the [entity](https://hapijs.com/api#-hentityoptions) response toolkit method in hapi 17.x. This might be the first of a few posts on hapi, and web cache, but there is all ready some great content out there on the subject with the official [hapi docs](https://hapijs.com/tutorials/caching?lang=en_US#overview), which also links to a resource [at developers.google.com](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) when it comes to etags and more. Still I thought I would work out some of my own examples when it comes to this. Etags are a way to go about taging a response with a unique value that can be used as a way for a browser to know if it still has an up to date version of the content or not, and thus can still continue to use the cached resource rather than downloading the resource yet again.

<!-- more -->

## 1 - Basic etag example in hapi 17.x

So an etag is a way of setting a token for a request for a resource and it is a way of letting the browser know if the resource has changed or not. It can then be a hash of the state of the content itself, or some other string value of sorts that is updated not and then whenever a newer version of the content is available.

```js
let Hapi = require('@hapi/hapi');
let init = async() => {
 
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
 
    // etag based on the time the server started
    let startTime = new Date(),
    etag = startTime.getTime();
 
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            h.entity({
                etag: etag
            });
            return {
                mess: 'date should only change each time the sever starts',
                date: new Date()
            };
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```

## 2 - updating an etag

When an etag is updated the browser will download the new content.

```js
let Hapi = require('@hapi/hapi'),
fs = require('fs'),
readdir = require('util').promisify(fs.readdir),
dir_folders = process.argv[2] || process.cwd(),
delay = process.argv[3] || 10000;
let init = async() => {
 
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
 
    // gen etag
    let genEtag = (function () {
        let c = 0;
        return () => {
            let startTime = new Date();
            c += 1;
            c %= 100;
            return startTime.getTime() + ':' + c;
        };
    }
        ());
 
    // first etag
    let etag_server = genEtag();
    // update etag each delay
    setInterval(() => {
        etag_server = genEtag();
    }, delay);
 
    // set up the route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
 
            // using etag_server for each request
            h.entity({
                etag: etag_server
            });
 
            // get client etag
            let etag_client = request.headers['if-none-match'];
            etag_client = etag_client === undefined ? 0 : etag_client.replace(/"/g, '');
 
            // send response based on client etag
            // compared to server etag
            if (etag_client === etag_server) {
                console.log('request for fresh resource');
                return {};
            } else {
                console.log('old cached copy getting the new stuff...');
                return readdir(dir_folders).then((contents) => {
                    return {
                        date: new Date(),
                        etag_server: etag_server,
                        contents: contents
                    }
                })
            }

        }
    });
 
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```