---
title: Express Send
date: 2019-04-23 11:37:00
tags: [express,node.js]
layout: post
categories: express
id: 423
updated: 2019-04-23 11:43:49
version: 1.1
---

The express send, or res.send method can be used to send a string or object when it comes to making very simple basic express middleware methods that respond to incoming client requests. It is not always the best tool for the job though and in some situations it should at least be used in conjunction with other express app.methods. So this will be a quick post on the res.send method, and related topics.

<!-- more -->

## 1 - Express send

## 2 - Express send string

```js
let express = require('express'),
app = express();
app.get('/', (req, res) => res.send('foo'));
app.listen(8080);
```

## 3 - Express send Number

```js
let express = require('express'),
app = express();
// a number is seen as a status code, so it needs to be
// converted to a string
app.get('/', (req, res) => res.send(42 + ''));
 
// even if you want to set the status to say 404, you do not want to
// just do it with res.send alone as this is deprecated.
// use res.status, or res.sendStatus
app.get('*', (req, res) => res.status(404).send('file not found'));
 
app.listen(8080);
```

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