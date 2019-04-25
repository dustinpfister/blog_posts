---
title: Express Type
date: 2019-04-24 13:53:00
tags: [express,node.js]
layout: post
categories: express
id: 424
updated: 2019-04-25 09:05:28
version: 1.5
---

The [express type](https://expressjs.com/en/api.html#res.type) response object method can be used to quickly set the Content-Type response header to a desired [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types), and in most cases it will work fine, but it might still be better to use the res.set method as a way to set Content-Type to make sure that the correct mime type is set for the content that is being sent to the browser. Never the less this will be a quick post on the express type convenience method as well as some related topics with Content-Type and response headers.

<!-- more -->

## 1 - Express Type basic example

So the express type response method can be used to quickly set the [Content Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) [response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) using just a simple string that represents a typical file extension , or simple typical name. For example if I want some html that is being sent to render as plain text I can just pass the string 'text', 'txt', or '.txt' to the res.type method.

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => {
    res.type('text');
    console.log(res.get('Content-Type')); // 'text/plain; charset=utf-8'
    res.send('<h1>This should just be plain text so the tags should show in the browser</h1>')
});
 
app.listen(8080);
```

### 1.1 - Express Response Set method can also be used to to do the same thing

The above example of the Express Type method can also be used with the response set method as well. One way or another what needs to happen is to just simply set the Content-Type response header. The Express type response method is just a convenience method to set just the Content-Type header, but only that header. The Response set method can be used to set that header as well as any other header, the only draw back is that you need to know your mime types, and be sure that you are setting the right one.

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => {
    res.set('Content-Type','text/plain');
    console.log(res.get('Content-Type')); // 'text/plain; charset=utf-8'
    res.send('<h1>Some Html again</h1>')

});
 
app.listen(8080);
```

It generally might be better to use the response set method in replace of the type method, it gives a greater deal of control of mime types, and in addition I can use it to set multiple headers at once as well. I will write more about the response set method as a way to set Content-Type in express in a later section in this post.

## 2 - Express Type and express static

```js
let express = require('express'),
app = express();
 
app.use('/js', express.static('public/js', {
        extensions: ['.js'],
        index: false,
        setHeaders: (res, path, stat) => {
            res.type('js');
            console.log(res.get('Content-Type'));
            // application/javascript; charset=utf-8
        }
    }));
 
app.use('/', express.static('public/html', {
        extensions: ['.html'],
        setHeaders: (res, path, stat) => {
            res.type('html');
            console.log(res.get('Content-Type'));
            // text/html; charset=utf-8
        }
    }));
 
app.listen(8080);
```

## 3 - Response Set method as an alternative to The Express Type response method

```js
let express = require('express'),
app = express();
 
let n = 0;
app.get('/', (req, res) => {
    res.set({
        'Content-Type': n === 0 ? 'text/plain' : 'text/html',
        'Cache-Control': 'no-store'
    });
    console.log(res.get('Content-Type'));
    res.send('<h1>just some html</h1>');
    n += 1;
    n %= 2;

});
 
app.listen(8080);
```