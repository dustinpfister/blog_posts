---
title: Working with request headers in express.js
date: 2018-05-29 15:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 197
updated: 2018-05-29 14:24:55
version: 1.1
---

When reviving an http request from a client, that request will contain all kinds of headers that tell the server useful information about the request. In this post I will be quickly covering some examples of how to work with request headers in express.js.

<!-- more -->

## Different request headers for different request methods

Request headers depend on the method of the request such as GET, and POST. A POST request header for example will contain a content-type header to tell the server the type of content that it is being given in the body of the request. However a GET request would not contain such a header, because it is just simply requesting whatever there is at a given location. Also It goes without saying that response headers differ slightly from request headers.

## Basic example

There is the req.get method that can be used to get a header to which you know the name off. If you do not know the name there is also the req.headers array that will store everything of interest when it comes to the request headers.

Here is an example of a router that can be added into a express.js demo with app.use, say you save it in a folder at /routes/headers.js:

```js
let express = require('express'),
 
// the router
router = module.exports = express.Router();
 
// add body path
router.get('/', function (req, res) {
 
    res.json({
 
        headers: req.headers,
        userAgent: req.get('user-agent')
 
    });
 
});
```

And then use it in a main app.js file like this:

```js
let express = require('express'),
app = express();
 
app.use(/headers,require('./routes/headers'));
 
app.listen(8080);
```

If you then start app.js in the command line with node and go to localhost:8080/headers in the browser you might see something like this.

```js
{
    "headers": {
        "host": "localhost:8080",
        "connection": "keep-alive",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        "cookie": "_ga=GA1.1.1007487929.1483993436",
        "if-none-match": "W/\"271-4KyvCN/691Au0a0WB+wTlzE/aF0\""
    },
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
}
```
