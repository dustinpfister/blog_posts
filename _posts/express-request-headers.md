---
title: Working with request headers in express.js
date: 2018-05-29 15:00:00
tags: [js,express,node.js]
layout: post
categories: express
id: 197
updated: 2021-03-23 10:51:10
version: 1.8
---

When receiving an http request from a client, that request will contain all kinds of headers that tell the server useful information about the request. The subject of headers in general can eat up a lot of time because there are a lot of them. However there are great resources such as at [Mozilla as usual that outline what all the typical standard headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) are when it comes to http requests. This is however a post on expressjs a tired yet true nodejs framework and how to work with incoming request headers.

So then in this post I will be quickly covering some examples of how to work with request headers in [express.js](https://expressjs.com/) with some help with the [req.get method](http://expressjs.com/en/api.html#req.get) method, and the req.headers array that can be found in a request object.

<!-- more -->

## 1 - What to know

This is a post on working with request headers in express.js a node.js powered framework that is used for making full stack web applications. It is not a getting started post on express.js, node.js, javaScript in general, or any additional aspects of full stack web application development. In this post I am using express 4.x, and yes this is a project where the version matters a whole lot.

## 2 - Different request headers for different request methods

Request headers depend on the method of the request such as GET, and POST. A POST request header for example will contain a content-type header to tell the server the type of content that it is being given in the body of the request. However a GET request would not contain such a header, because it is just simply requesting whatever there is at a given location. Also It goes without saying that response headers differ slightly from request headers.

## 3 - Basic example

There is the req.get method that can be used to get a header to which you know the name off. If you do not know the name there is also the req.headers array that will store everything of interest when it comes to the request headers.

Here is an example of a router that can be added into a express.js demo with app.use, say you save it in a folder at \/routes\/headers.js:

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
 
app.use('/headers',require('./routes/headers'));
 
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

## 4 - Conclusion

I am sorry this is a thin post, I might expand on it more as my collection of content, and demos on express.js grows. In the mean time there is taking the time to look into what all the standard headers are and what they do. Some headers are obvious such as the user agent header that is used to inform a server what kind of client system is being use. So then this information can then be used to redirect a visitor to a download page for a binary that will work for there operating system for example.
