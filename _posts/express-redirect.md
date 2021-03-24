---
title: Express redirect
date: 2019-04-26 14:34:00
tags: [express,node.js]
layout: post
categories: express
id: 426
updated: 2021-03-24 16:03:30
version: 1.6
---

An [express redirect](https://expressjs.com/en/api.html#res.redirect) is one of several options when it comes to responding to an incoming http request. Often a response will involve just sending some json, text, or html, but in some cases a redirect to another path might be called for as a way to respond to a request.

In express redirects can be done with the res.redirect response method, for the most part just the url of the resource to redirect to is all that needs to be passed, but some times it is not that simple when it comes to the response status codes. So in this post I will be writing about all things express redirect related that I come across that are note worthy.

<!-- more -->

## 1 - Express redirect basic example

So for a basic express redirect all I need to do is just pas the response that I want to redirect to as the first argument to the res.redirect method.

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

When it comes to http sttaus codes [3xx codes are of interest](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) when it comes to express redirects. By default the status code that is set by res.redirect is 302, to set some other response code that code can be given as the first argument, and then the resource as the second argument like so.

```js
app.get('/old/path/to-a-file.html', (req, res) => {
    res.redirect(301, '/new/path/to-a-file.html');
});
```

## 3 - Conclusion

So there are some basics of express redirects, hope you found this post helpful when it comes to this little aspect of nodejs development using expressjs as a server side framework. 

The res.redirect method is one way to go about ending a request, although it technically does not end it actually, just passes it along to another path. However when it comes to other options for ending a request there is the res.end method, along with other methods like res.send, and res.sendFile.

For more on express you might want to check out my [main post on express](/2018/06/12/express/).