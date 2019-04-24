---
title: Express Type
date: 2019-04-24 13:53:00
tags: [express,node.js]
layout: post
categories: express
id: 424
updated: 2019-04-24 14:04:44
version: 1.1
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
