---
title: Express redirect response object method
date: 2019-04-26 14:34:00
tags: [express,node.js]
layout: post
categories: express
id: 426
updated: 2021-03-24 16:11:38
version: 1.9
---

An [express redirect](https://expressjs.com/en/api.html#res.redirect) is one of several options when it comes to responding to an incoming http request when working out one or more middleware functions for a path, or pattern. Often a response will involve just sending some json, text, or html, but in some cases a redirect to another path might be called for as a way to respond to a request. For example maybe I have a path that will serve a 404 response page, a user can go directly to such a path, but more often that not they will get there because the resource they where looking for was not there, and I can send them there by way of a res.redirect call in a middleware function that they will only get to if that is the case.

In express redirects can be done with the res.redirect response method, for the most part just the url of the resource to redirect to is all that needs to be passed, but some times it is not that simple when it comes to the response status codes. So in this post I will be writing about all things express redirect related that I come across that are note worthy.

<!-- more -->

## 1 - Express redirect basic example

So for a basic express redirect all I need to do is just pass the response that I want to redirect to as the first argument to the res.redirect method when calling it in a middleware function. In this example I am using the res.redirect method to redirect all get requests to the root path that are not the root path to begin with.

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => {
    res.send('you can not escape me');
});
 
app.get('*', (req, res) => res.redirect('/'));
 
app.listen(8080);
```

This will work find assuming that a 302 http status code redirect will work okay. In most applications including very basic ones such as this a 302 redirect will work just fine, but in some cases you might want to set different one, so there can some times be more to this than just setting the location of the resource.

## 2 - Express redirect and 3xx http status codes

When it comes to http status codes [3xx codes are of interest](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) when it comes to express redirects. By default the status code that is set by res.redirect is 302, to set some other response code that code can be given as the first argument, and then the resource as the second argument like so.

```js
app.get('/old/path/to-a-file.html', (req, res) => {
    res.redirect(301, '/new/path/to-a-file.html');
});
```

## 3 - Conclusion

The res.redirect method is one way to go about ending a request, although it technically does not end it actually, just passes it along to another path. However when it comes to other options for ending a request there is the res.end method, along with other methods like res.send, and res.sendFile.

So there are some basics of express redirects, hope you found this post helpful when it comes to this little aspect of nodejs development using expressjs as a server side framework. For more on express you might want to check out my [main post on express](/2018/06/12/express/) in that post I branch off into all kinds of little topics that have to do with express and nodejs.