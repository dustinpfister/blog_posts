---
title: Express Send
date: 2019-04-23 11:37:00
tags: [express,node.js]
layout: post
categories: express
id: 423
updated: 2019-04-23 12:01:24
version: 1.4
---

The express send, or res.send method can be used to send a string or object when it comes to making very simple basic express middleware methods that respond to incoming client requests. It is not always the best tool for the job though and in some situations it should at least be used in conjunction with other express app.methods. So this will be a quick post on the res.send method, and related topics.

<!-- more -->

## 1 - Express send, and what to know

This is a post on the node.js framework express, and the use of the res.send method when authoring express middleware. I will not be getting into detail about node.js, express, express middleware, and javaScript in general in this post. However if you might not know everything surrounding the use of the res.send method in express this post might be of some value to you.

## 2 - Express send string

For the most part the res.send method is used to just send a simple string message when it comes to very simple, basic express.js examples. However it is not such a bad choice when it comes to making a far more advanced project with express as well. It is just that there are of course alternatives. For example if I am doing something with ejs templates I would often use res.render in conjunction with an ejs template file, and an object that contains data that will be used in that template.

However if I do just simply want to send a plain text string as a response to a request then of course the res.send method gets the job done just fine.

```js
let express = require('express'),
app = express();
app.get('/', (req, res) => res.send('foo'));
app.listen(8080);
```

There is often more to a response then just the content that is sent though. In some cases I might want to set a status header before hand, and also the question of sending objects and files as well. In some cases the res.send method can still be used, just not by itself. In other cases another method should really be used over res.send as well, so lets continue with some more examples.

## 3 - Express send Number

If the data tyoe that is being sent is a number rather than a string that will end up being considered a status code by res.send. Using res.send in this matter is not a good idea. In the 4.x version that I was using for this post a message was spit out in the console informing me that using res.send in this matter is depreciated, and that res.sendStatus should be used in place of that.

The res.sendStatus method will work fine for this, but another option would be to use the res.status method in conjunction with res.send, or better yet res.render when it comes to making more interesting and useful status pages for things like 404, 403, and so forth. 

```js
let express = require('express'),
app = express();
// a number is seen as a status code, so it needs to be
// converted to a string
app.get('/', (req, res) => res.send(42 + ''));
 
// even if you want to set the status to say 404, you do not want to
// just do it with res.send alone as this is depreciated.
// use res.status, or res.sendStatus
app.get('*', (req, res) => res.status(404).send('file not found'));
 
app.listen(8080);
```

If I do just want to send a number as the content then that should be converted to a string like in the above example.

## 4 - Express send Object

```js
let express = require('express'),
app = express();
// sending an object will result in sending json
app.get('/', (req, res) => res.send({
        a: req.headers['user-agent'],
        p: req.path,
        t: Date.now()
    }));
 
app.listen(8080);
```